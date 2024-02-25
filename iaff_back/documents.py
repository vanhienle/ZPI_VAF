import psycopg2
from psycopg2 import pool
from dotenv import load_dotenv
import os

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PW = os.getenv("DB_PW")

class Documents:
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

    def getDocument(self, id):
        conn = self.get_connection()
        try:
            with conn.cursor() as curs:
                curs.execute("SELECT * FROM documents WHERE Id = %(Id)s", {'Id': id})
                result = curs.fetchone()
        finally:
            self.release_connection(conn)
        return result
    
    def getCategories(self):
        conn = self.get_connection()
        try:
            with conn.cursor() as curs:
                curs.execute("SELECT DISTINCT Category FROM documents")
                result = curs.fetchall()
        finally:
            self.release_connection(conn)
        return result

    def getAllByCategory(self, category):
        conn = self.get_connection()
        try:
            with conn.cursor() as curs:
                curs.execute(
                    "SELECT * FROM documents WHERE Category = %(Category)s",
                    {'Category': category}
                )
                result = curs.fetchall()
        finally:
            self.release_connection(conn)
        return result

    def getAllByName(self, name):
        conn = self.get_connection()
        try:
            with conn.cursor() as curs:
                curs.execute(
                    """SELECT * FROM documents 
                    WHERE position(%(Name)s in LOWER(title)) > 0 OR 
                          position(%(Name)s in LOWER(category)) > 0;""",
                    {'Name': name.lower()}
                )
                result = curs.fetchall()
        finally:
            self.release_connection(conn)
        return result

    def addDocument(self, category, title, short, info, age, kids, accom, insure, study, job, live, refugee, other, documenttype, image, links):
        conn = self.get_connection()
        try:
            with conn.cursor() as curs:
                curs.execute(
                    """INSERT INTO documents (category, title, info, age, kids, accom, insure, study, job, live, refugee, other, "documentType", image, short, links) 
                    VALUES (%(Category)s,%(Title)s,%(Info)s,%(Age)s,%(Accom)s,%(Insure)s,%(Study)s,%(Job)s,%(Live)s,%(Refugee)s,%(Other)s,%(DocumentType)s,%(Image)s,%(Short)s,%(Links)s)""",
                    {
                        'Category': category, 'Title': title, 'Short': short,
                        'Info': info, 'Age': age, 'Kids': kids, 'Accom': accom,
                        'Insure': insure, 'Study': study, 'Job': job, 'Live': live,
                        'Refugee': refugee, 'Other': other, 'DocumentType': documenttype,
                        'Image': image, 'Links': links
                    }
                )
                conn.commit()
        except psycopg2.Error as e:
            print(f"Database error: {e}")
            return False
        finally:
            self.release_connection(conn)
        return True

    def getRecommendations(self, id, age, kids, baby, teen, adult, accom, insure, study, job, live, refugee, other, documenttype):
        conn = self.get_connection()
        try:
            with conn.cursor() as curs:
                curs.execute(
                    """SELECT title, short, 
                    (Kids*%(Kids)s+Accom*%(Accom)s+Insure*%(Insure)s+Study*%(Study)s+Job*%(Job)s+Live*%(Live)s+Refugee*%(Refugee)s+Other*%(Other)s) AS score,
                    id, category, image
                    FROM documents 
                    ORDER BY score DESC
                    LIMIT 6""",
                    {
                        'UserID': id, 'Age': age, 'Kids': kids, 'Accom': accom,
                        'Insure': insure, 'Study': study, 'Job': job, 'Live': live,
                        'Refugee': refugee, 'Other': other, 'DocumentType': documenttype
                    }
                )
                results = curs.fetchall()
        finally:
            self.release_connection(conn)
        return results

    @classmethod
    def close_all_connections(cls):
        cls.connection_pool.closeall()