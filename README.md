IAFF / Diploma project — multi-service web app: React frontend, Flask backend, FastAPI assistant service, PostgreSQL DB, optional Nginx+Certbot

Table of Contents
- Architecture
- Services
- How to run
  - Local (development)
  - With Docker Compose
- Environment variables
- API Reference
- Data / schema notes
- Assistant embeddings / index (ingest)
- Developer notes & security recommendations
- Contribution
- Verification
- References & useful files
- License & contact

### Architecture

This repository is a multi-service web application composed of: a React frontend, a Flask backend, a FastAPI-based assistant service, a PostgreSQL database, and optional nginx+certbot reverse-proxy services orchestrated by docker-compose (see `docker-compose.yml`). Services run in separate containers and communicate over the Docker network `localnet`.

Textual diagram (high-level)
- `docker-compose.yml` defines: database (postgres), backend (`./iaff_back` -> 5001), assistant (`./iaff_assistant` -> 8085), frontend (`./iaff_front` -> 3000), nginx, certbot.
- Frontend <-> Backend: frontend calls backend APIs (configured via `REACT_APP_BACK_END_URL`).
- Backend <-> Assistant: backend proxies assistant-related endpoints to the assistant service (see `iaff_back/RestAssistant.py`).
- Backend <-> Database: backend and helpers use hostname `diploma-db` to connect to Postgres initialized from `iaff_back/postgres_dump.sql`.

### Services

#### Backend (Flask)
- Location: `iaff_back/`
- Entrypoint: `iaff_back/app.py` (registers blueprints: `auth.py`, `RestSurvey.py`, `RestDocuments.py`, `RestAssistant.py`).
- Runs on port 5001 (see `docker-compose.yml` and `iaff_back/Dockerfile`).
- Responsibilities: authentication (JWT), documents and surveys endpoints, and proxying assistant requests.

#### Assistant (FastAPI)
- Location: `iaff_assistant/`
- Entrypoint: `iaff_assistant/service.py` with pipelines in `realtime_pipeline.py`, `batch_pipeline.py`, `TranslationAgent.py`, `SpeechRecognitionAgent.py`.
- Runs on port 8085 (see `docker-compose.yml` and `iaff_assistant/Dockerfile`).
- Responsibilities: document embeddings (Chroma), similarity search, translation (OpenAI API), speech transcription (Azure Speech + ffmpeg).

#### Frontend (React)
- Location: `iaff_front/`
- Start locally: `cd iaff_front && npm install && npm start` (see `package.json`).
- Dev server: port 3000. `server.js` can serve a production build.

#### Database (Postgres)
- Service: configured in `docker-compose.yml` as `database` (container_name: `diploma-db`).
- Init: mounts `iaff_back/postgres_dump.sql` into the Postgres init folder to create tables and seed data on first run.

#### Optional proxies: nginx & certbot
- Configured in `docker-compose.yml`. Local nginx config expected under `./data/nginx` and certbot data under `./data/certbot`.

### How to run

Local (development)

- Backend
```
cd iaff_back && python app.py
```
Notes: `app.py` calls `app.run(host='0.0.0.0', port=5001)` when executed directly.

- Assistant
```
cd iaff_assistant && python service.py
```
Notes: `service.py` launches uvicorn and serves FastAPI on port 8085.

- Frontend
```
cd iaff_front && npm install && npm start
```

With Docker Compose

Build and start all services:
```
docker-compose up --build -d
```

Exposed ports (from `docker-compose.yml`):
- 80 -> nginx
- 443 -> nginx
- 3000 -> frontend
- 5001 -> backend
- 8085 -> assistant
- 5432 -> postgres

### Environment variables

Create a `.env` (or use the provided `.env.example`) and set the variables listed below. Files that reference envs are indicated.

- POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB (used in `docker-compose.yml` -> Postgres init)
- OPENAI_API_TYPE, OPENAI_API_VERSION, OPENAI_API_BASE, OPENAI_API_KEY (used in `iaff_assistant/realtime_pipeline.py`, `iaff_assistant/TranslationAgent.py`)
- AZURE_SPEECH_KEY, AZURE_REGION (used in `iaff_assistant/SpeechRecognitionAgent.py`)
- REACT_APP_BACK_END_URL, REACT_APP_GOOGLE_MAPS_API_KEY, REACT_APP_BOOKINGCOM_URL, REACT_APP_BOOKINGCOM_KEY (used across `iaff_front/src/utils` and `iaff_front/src/components/MapConfiguration/MapConfiguration.js`)
- GOOGLE_CSE_ID, GOOGLE_API_KEY (currently present inline in `iaff_assistant/tools/google_search.py` — move to envs)
- FLASK_SECRET_KEY (recommended replacement for hardcoded SECRET_KEY in `iaff_back/app.py`)

See `.env.example` for placeholders and file mapping comments.

### API Reference

Backend (Flask) endpoints - files shown in parentheses

- Authentication (`iaff_back/auth.py`)
  - POST /users/login
    - Body: {"email":"...","password":"..."}
    - Returns: {"token":"..."} (200) or 401
  - POST /users/signup
  - POST /users/is_logged (Headers: token)
  - POST /users/logout (Headers: token)
  - POST /users/get_user_data (Headers: token)
  - PUT /users/change_password (Headers: token, Body: {"password":"...","newpassword":"..."})
  - PUT /users/change_account (Headers: token, Body: {"email":"...","name":"...","password":"..."})

- Documents (`iaff_back/RestDocuments.py`)
  - POST /documents/get_document (Body: {"documentId": <id>})
  - GET /documents/get_categories
  - POST /documents/get_by_category (Body: {"category":"..."})
  - POST /documents/get_by_name (Body: {"name":"..."})
  - POST /documents/get_recommendations (Headers: token)

- Survey (`iaff_back/RestSurvey.py`)
  - POST /survey/is_filled_survey (Headers: token)
  - POST /survey/get_survey (Headers: token)
  - POST /survey/add_survey (Headers: token, Body: survey fields)
  - PUT /survey/update_survey (Headers: token, Body: survey fields)

- Assistant proxy (`iaff_back/RestAssistant.py`)
  - POST /assistant/get_response -> proxied to assistant_service/get_response
  - POST /assistant/translate -> proxied to assistant_service/translate
  - POST /assistant/transcribe -> proxied to assistant_service/transcribe (multipart/form-data: file + lang)

Assistant (FastAPI) endpoints (`iaff_assistant/service.py`)
- POST /assistant_service/get_response (Body: Conversation model)
- POST /assistant_service/translate (Body: {content, target_language})
- POST /assistant_service/transcribe (multipart file + lang)

### Data / schema notes

- DB init script: `iaff_back/postgres_dump.sql` (used to create tables and seed data on first Postgres startup).
- Tables referenced in backend code: `users`, `documents`, `survey`. See `iaff_back/documents.py`, `iaff_back/survey.py`, `iaff_back/userAccess.py` for SQL usage.

### Assistant embeddings / index (ingest)

- The assistant uses a local Chroma vectorstore persisted to `CHROMA_LOCAL = "chroma_db"` (see `iaff_assistant/realtime_pipeline.py` and `batch_pipeline.py`).
- To build/update embeddings: run the batch ingestion script:
```
cd iaff_assistant && python batch_pipeline.py
```
This reads documents from `iaff_assistant/documents/` and writes to the Chroma persistence directory.

### Developer notes & security recommendations

- Hardcoded secrets found:
  - `iaff_back/app.py` sets `app.config['SECRET_KEY']` to a literal string (line ~12). This is used to sign JWT tokens in `iaff_back/auth.py` — move to `FLASK_SECRET_KEY` env var instead.
  - `iaff_assistant/tools/google_search.py` sets `GOOGLE_CSE_ID` and `GOOGLE_API_KEY` inline (lines ~3-4). Move these to environment variables and rotate keys if they are real.

- Recommendations:
  - Move all credentials to environment variables or a secrets manager.
  - Never commit API keys or secret tokens to VCS; replace literals with env lookups.

### Contribution

- Branch naming: `feature/<desc>`, `fix/<desc>`, `docs/<desc>`
- Commit messages: use conventional style, e.g. `feat: ...`, `fix: ...`, `docs: ...`
- PR checklist:
  - Branch is up-to-date with main
  - Tests & lint pass
  - No secrets committed
  - Description and motivation provided

### Verification

Run these checks locally (Docker must be installed):

1) Build & start services:
```
docker-compose build
docker-compose up -d
```

2) Verify containers are running:
```
docker ps
```

3) Check ports are listening (expect 5001, 8085, 3000, 5432):
```
ss -ltn | grep -E "5001|8085|3000|5432"
```

4) Smoke test an endpoint:
```
curl http://localhost:5001/documents/get_categories
# Expected: JSON list of categories (200) if DB populated; if DB empty backend may return 401 / "false".
```

### References & useful files
- `docker-compose.yml`
- `iaff_back/Dockerfile`, `iaff_back/app.py`, `iaff_back/postgres_dump.sql`
- `iaff_assistant/Dockerfile`, `iaff_assistant/service.py`, `iaff_assistant/realtime_pipeline.py`, `iaff_assistant/batch_pipeline.py`
- `iaff_front/Dockerfile`, `iaff_front/package.json`, `iaff_front/server.js`

### Security cleanup note

Remove or rotate credentials found in codebase:
- `iaff_assistant/tools/google_search.py` (lines ~3-4) — remove hardcoded `GOOGLE_API_KEY` and `GOOGLE_CSE_ID`.
- `iaff_back/app.py` (line ~12) — replace hardcoded `SECRET_KEY` with `FLASK_SECRET_KEY` from env.

### License & contact

No license file is included. Add a `LICENSE` file if you intend to open source this project. For questions, open an issue or contact the repository owner.

