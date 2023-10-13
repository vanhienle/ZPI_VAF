import psycopg2
from flask import Flask, request, jsonify

app = Flask(__name__)

conn = psycopg2.connect(
    host="91.195.53.69",
    port=5432,
    database="ClientDatabase",
    user="postgres",
    password="!"
)

cur = conn.cursor()


def get_last_id(table_name):
    query = f"SELECT max(UserID) FROM {table_name}"

    cur.execute(query)

    last_id = cur.fetchone()[0]

    return last_id


def create_user(email, password):
    check_query = "SELECT COUNT(*) FROM users WHERE UserEmail = %s"

    cur.execute(check_query, (email,))

    email_count = cur.fetchone()[0]

    if email_count > 0:
        return {"message": "Email already exists in the database. Please use a different email."}
    else:
        insert_query = """
            INSERT INTO users (UserID, UserEmail, UserPass)
            VALUES (%s, %s, %s)
            """
        cur.execute(insert_query, (get_last_id("users") + 1, email, password,))
        return {"message": "User registration successful!"}


def delete_user(email):
    check_query = "SELECT COUNT(*) FROM users WHERE UserEmail = %s"

    cur.execute(check_query, (email,))

    email_count = cur.fetchone()[0]

    if email_count == 0:
        return {"message": "There is no such email in the database. Please use a different email."}
    else:
        delete_query = "DELETE FROM users WHERE UserEmail = %s"
        cur.execute(delete_query, (email,))
        return {"message": "User deleted successfully!"}


@app.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    result = create_user(email, password)

    conn.commit()

    cur.close()
    conn.close()

    return jsonify(result)


'''
@app.route('/login', methods=['POST'])
def login_user():
    result = 
    
    conn.commit()

    cur.close()
    conn.close()

    return jsonify(result)
'''


@app.route('/delete', methods=['POST'])
def delete_user():
    data = request.get_json()
    email = data.get('email')

    result = delete_user(email)

    conn.commit()

    cur.close()
    conn.close()

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
