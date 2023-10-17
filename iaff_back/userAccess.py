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
        print('Inside get user: email=', email,' password=',password)
        self.DBCursor.execute(
            """SELECT * 
            FROM users 
            WHERE UserEmail = %(UserEmail)s AND UserPass = %(UserPass)s""",
            {'UserEmail': email, 'UserPass': password})
        result = self.DBCursor.fetchone()
        print('After query=', result)
        return result


    def getFromUser(self, email):
        self.DBCursor.execute("""SELECT UserID,UserPass FROM users WHERE UserEmail = %(UserEmail)s""", {'UserEmail': email})
        result = self.DBCursor.fetchone()
        return result

    def deleteUser(self, email):
        self.DBCursor.execute("""DELETE * FROM users WHERE UserEmail = %(UserEmail)s""", {'UserEmail': email})
        result = self.DBCursor.fetchone()
        return result

    def updateUserPassword(self, email, password):
        self.DBCursor.execute("""UPDATE users SET UserPass = %(UserPass)s WHERE UserEmail = %(UserEmail)s""",
                              {'UserEmail': email, 'UserPass': password})
        result = self.DBCursor.fetchone()
        return result

    def new_id(self):
        query = f"SELECT max(UserID) FROM users"
        self.DBCursor.execute(query)
        last_id = self.DBCursor.fetchone()[0]
        return last_id + 1

    def signup(self, email, password,name):
        if self.checkExistence(email, False):
            print('User with mail: ', email, ' already exists')
            return None

        id = self.new_id()

        self.DBCursor.execute("""INSERT INTO users (UserID,UserEmail,UserPass,UserName) VALUES (%(UserID)s,%(UserEmail)s,%(UserPass)s, %(UserName)s)""",
                              {'UserID': id, 'UserEmail': email, 'UserPass': password, 'UserName': name})
        self.DBConnection.commit()
        return self.getUser(email, password)


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
