from flask_login import UserMixin
import pika
import psycopg2

class User(UserMixin):
    pass

class Access:
    def __init__(self) -> None:
        # self.connection, self.channel = self.createChannel()
        self.DBConnection, self.DBCursor = self.createDBCursor()

    def createDBCursor(self):
        conn = psycopg2.connect(host='91.195.53.69',
                                port=5432,
                                database="ClientDatabase",
                                user="postgres",
                                password="!")
        return conn, conn.cursor()


    def createChannel(self):
        connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
        channel = connection.channel()
        channel.queue_declare(queue='user')
        return connection, channel

    def getUser(self, email, password):
        self.DBCursor.execute(
            """SELECT * 
            FROM users 
            WHERE UserEmail = %(UserEmail)s AND UserPass = %(UserPass)s""",
            {'UserEmail': email, 'UserPass': password})
        result = self.DBCursor.fetchone()
        return result


    def getUser(self, email):
        self.DBCursor.execute("""SELECT * FROM users WHERE UserEmail = %(UserEmail)s""", {'UserEmail': email})
        result = self.DBCursor.fetchone()
        return result


    def signin(self, email, password):
        if self.checkExistence(email, False) or self.checkExistence(password, True):
            return False

        self.DBCursor.execute("""INSERT INTO users (UserEmail,UserPass) VALUES (%(UserEmail)s,%(UserPass)s)""",
                              {'UserEmail': email, 'UserPass': password});
        self.DBConnection.commit()
        return True


    def checkExistence(self, email, password):
        if password:
            self.DBCursor.execute("""SELECT * FROM users WHERE UserPass = %(UserPass)s""", {'UserPass': email})
        else:
            self.DBCursor.execute("""SELECT * FROM users WHERE UserEmail = %(UserEmail)s""", {'UserEmail': email})
        result = self.DBCursor.fetchone()
        return not result is None


    def fin(self):
        self.DBConnection.close()
        self.connection.close()