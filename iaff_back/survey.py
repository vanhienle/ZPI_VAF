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

class Survey:
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

    def getSurvey(self, id):
        conn = self.get_connection()
        try:
            with conn.cursor() as curs:
                curs.execute(
                    "SELECT * FROM survey WHERE UserId = %(UserId)s",
                    {'UserId': id}
                )
                result = curs.fetchone()
            return result
        finally:
            self.release_connection(conn)

    def addSurvey(self, id, age, kids, baby, teen, adult, accom, insure, study, job, live, refugee, other, documenttype):
        conn = self.get_connection()
        try:
            with conn.cursor() as curs:
                curs.execute(
                    """INSERT INTO survey (UserID, Age, Kids, Baby, Teen, Adult, Accom, Insure, Study, Job, Live, Refugee, Other, DocumentType) 
                    VALUES (%(UserID)s, %(Age)s, %(Kids)s, %(Baby)s, %(Teen)s, %(Adult)s, %(Accom)s, %(Insure)s, %(Study)s, %(Job)s, %(Live)s, %(Refugee)s, %(Other)s, %(DocumentType)s)""",
                    {'UserID': id, 'Age': age, 'Kids': kids, 'Baby': baby, 'Teen': teen, 'Adult': adult, 'Accom': accom, 'Insure': insure, 'Study': study, 'Job': job, 'Live': live, 'Refugee': refugee, 'Other': other, 'DocumentType': documenttype}
                )
                conn.commit()
            return self.getSurvey(id)
        finally:
            self.release_connection(conn)

    def updateSurvey(self, id, age, kids, baby, teen, adult, accom, insure, study, job, live, refugee, other, documenttype):
        conn = self.get_connection()
        try:
            with conn.cursor() as curs:
                curs.execute(
                    """UPDATE survey SET Age=%(Age)s, Kids=%(Kids)s, Baby=%(Baby)s, Teen=%(Teen)s, Adult=%(Adult)s, Accom=%(Accom)s, Insure=%(Insure)s, Study=%(Study)s, Job=%(Job)s, Live=%(Live)s, Refugee=%(Refugee)s, Other=%(Other)s, DocumentType=%(DocumentType)s WHERE UserID=%(UserID)s""",
                    {'UserID': id, 'Age': age, 'Kids': kids, 'Baby': baby, 'Teen': teen, 'Adult': adult, 'Accom': accom, 'Insure': insure, 'Study': study, 'Job': job, 'Live': live, 'Refugee': refugee, 'Other': other, 'DocumentType': documenttype}
                )
                conn.commit()
            return True
        finally:
            self.release_connection(conn)

    @classmethod
    def close_all_connections(cls):
        cls.connection_pool.closeall()
