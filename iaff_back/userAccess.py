from flask_login import UserMixin
import pika
from psycopg2 import pool
from dotenv import load_dotenv
import os

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PW = os.getenv("DB_PW")

class User(UserMixin):
    pass

class Access:
    def __init__(self) -> None:
        self.connection_pool = pool.SimpleConnectionPool(1, 10, 
                                                    host=DB_HOST,
                                                    port=DB_PORT,
                                                    database=DB_NAME,
                                                    user=DB_USER,
                                                    password=DB_PW)

    def get_connection(self):
        return self.connection_pool.getconn()

    def release_connection(self, conn):
        self.connection_pool.putconn(conn)

    def createChannel(self):
        connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
        channel = connection.channel()
        channel.queue_declare(queue='user')
        return connection, channel

    @classmethod
    def close_all_connections(cls):
        cls.connection_pool.closeall()


    def getUser(self, email, password):
        conn = self.get_connection()
        try:
            with conn.cursor() as curs:
                curs.execute(
                    """SELECT * 
                    FROM users 
                    WHERE UserEmail = %(UserEmail)s AND UserPass = %(UserPass)s""",
                    {'UserEmail': email, 'UserPass': password}
                )
                result = curs.fetchone()
        finally:
            self.release_connection(conn)
        return result

    def getUserFromID(self, id):
        conn = self.get_connection()
        try:
            with conn.cursor() as curs:
                curs.execute(
                    """SELECT * 
                    FROM users 
                    WHERE UserID = %(UserID)s""",
                    {'UserID': id}
                )
                result = curs.fetchone()
        finally:
            self.release_connection(conn)
        return result

    def getUserName(self, email):
        conn = self.get_connection()
        try:
            with conn.cursor() as curs:
                curs.execute(
                    """SELECT UserName 
                    FROM users 
                    WHERE UserEmail = %(UserEmail)s""",
                    {'UserEmail': email}
                )
                result = curs.fetchone()
        finally:
            self.release_connection(conn)
        return result

    def getFromUser(self, email):
        conn = self.get_connection()
        try:
            with conn.cursor() as curs:
                curs.execute(
                    """SELECT UserID, UserPass 
                    FROM users 
                    WHERE UserEmail = %(UserEmail)s""",
                    {'UserEmail': email}
                )
                result = curs.fetchone()
        finally:
            self.release_connection(conn)
        return result

    def deleteUser(self, email):
        conn = self.get_connection()
        try:
            with conn.cursor() as curs:
                curs.execute(
                    """DELETE FROM users 
                    WHERE UserEmail = %(UserEmail)s""",
                    {'UserEmail': email}
                )
                conn.commit()
        finally:
            self.release_connection(conn)

    def updateUserPassword(self, id, password):
        conn = self.get_connection()
        try:
            with conn.cursor() as curs:
                curs.execute(
                    """UPDATE users 
                    SET UserPass = %(UserPass)s 
                    WHERE UserID = %(UserID)s""",
                    {'UserID': id, 'UserPass': password}
                )
                conn.commit()
        finally:
            self.release_connection(conn)

    def updateUserAccount(self, email, name, id):
        conn = self.get_connection()
        try:
            with conn.cursor() as curs:
                curs.execute(
                    """UPDATE users 
                    SET UserEmail = %(UserEmail)s, UserName = %(UserName)s 
                    WHERE UserID = %(UserID)s""",
                    {'UserEmail': email, 'UserName': name, 'UserID': id}
                )
                conn.commit()
        finally:
            self.release_connection(conn)

    def new_id(self):
        conn = self.get_connection()
        try:
            with conn.cursor() as curs:
                curs.execute("SELECT MAX(UserID) FROM users")
                last_id = curs.fetchone()[0]
                return last_id + 1 if last_id is not None else 1
        finally:
            self.release_connection(conn)

    def signup(self, email, password, name):
        if self.checkExistence(email, False):
            print('User with email:', email, ' already exists')
            return None

        id = self.new_id()
        conn = self.get_connection()
        try:
            with conn.cursor() as curs:
                curs.execute(
                    """INSERT INTO users (UserID, UserEmail, UserPass, UserName) 
                    VALUES (%(UserID)s, %(UserEmail)s, %(UserPass)s, %(UserName)s)""",
                    {'UserID': id, 'UserEmail': email, 'UserPass': password, 'UserName': name}
                )
                conn.commit()
        finally:
            self.release_connection(conn)
        return self.getUser(email, password)

    def checkExistence(self, email, password):
        conn = self.get_connection()
        try:
            with conn.cursor() as curs:
                if password:
                    curs.execute(
                        """SELECT * FROM users 
                        WHERE UserPass = %(UserPass)s""",
                        {'UserPass': password}
                    )
                else:
                    curs.execute(
                        """SELECT * FROM users 
                        WHERE UserEmail = %(UserEmail)s""",
                        {'UserEmail': email}
                    )
                result = curs.fetchone()
                return result is not None
        finally:
            self.release_connection(conn)

    def fin(self):
        self.connection_pool.closeall()

        try:
            self.connection.close()
        except AttributeError:
            pass