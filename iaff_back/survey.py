from flask_login import UserMixin
import pika
import psycopg2

class Survey:
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


    def getSurvey(self, id):
        self.DBCursor.execute(
            """SELECT * 
            FROM survey 
            WHERE UserId = %(UserId)s""",
            {'UserId': id})
        result = self.DBCursor.fetchone()
        print('After query=', result)
        return result


    def addSurvey(self, id, age, kids, baby, teen, adult, accom, insure, study, job, live, refugee, other, documenttype):
        print('inside add survey')
        self.DBCursor.execute(
            """INSERT INTO survey (UserID,Age,Kids,Baby,Teen,Adult,Accom,Insure,Study,Job,Live,Refugee,Other,DocumentType) 
            VALUES (%(UserID)s,%(Age)s,%(Kids)s,%(Baby)s,%(Teen)s,%(Adult)s,%(Accom)s,%(Insure)s,%(Study)s,%(Job)s,%(Live)s,%(Refugee)s,%(Other)s,%(DocumentType)s)""",
            {'UserID': id,
             'Age': age,
             'Kids': str(int(kids)),
             'Baby': str(int(baby)),
             'Teen': str(int(teen)),
             'Adult': str(int(adult)),
             'Accom': str(int(accom)),
             'Insure': str(int(insure)),
             'Study': str(int(study)),
             'Job': str(int(job)),
             'Live': str(int(live)),
             'Refugee': str(int(refugee)),
             'Other': str(int(other)),
             'DocumentType': documenttype})
        self.DBConnection.commit()
        return self.getSurvey(id)


    def updateSurvey(self, id, age, kids, baby, teen, adult, accom, insure, study, job, live, refugee, other, documenttype):
        print('inside update survey')
        self.DBCursor.execute(
            """UPDATE survey SET Age=%(Age)s,
            Kids=%(Kids)s,
            Baby=%(Baby)s,
            Teen=%(Teen)s,
            Adult=%(Adult)s,
            Accom=%(Accom)s,
            Insure=%(Insure)s,
            Study=%(Study)s,
            Job=%(Job)s,
            Live=%(Live)s,
            Refugee=%(Refugee)s,
            Other=%(Other)s,
            DocumentType=%(DocumentType)s
            WHERE UserID=%(UserID)s""",
            {'UserID': id,
             'Age': age,
             'Kids': kids,
             'Baby': baby,
             'Teen': teen,
             'Adult': adult,
             'Accom': accom,
             'Insure': insure,
             'Study': study,
             'Job': job,
             'Live': live,
             'Refugee': refugee,
             'Other': other,
             'DocumentType': documenttype})
        self.DBConnection.commit()
        return True


    def fin(self):
        self.DBConnection.close()
        self.connection.close()
