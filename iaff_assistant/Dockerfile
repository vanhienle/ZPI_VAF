FROM python:3.11

WORKDIR /IAFF/app

COPY requirements.txt /IAFF/requirements.txt

RUN pip install --no-cache-dir -r /IAFF/requirements.txt

COPY . /IAFF/app

RUN python batch_pipeline.py

EXPOSE 8085

CMD ["python", "service.py"]