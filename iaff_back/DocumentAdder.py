import glob
import math
from psycopg2 import pool
import pandas as pd
from io import BytesIO
import base64
from dotenv import load_dotenv
import os

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PW = os.getenv("DB_PW")

class Documents:
    connection_pool = pool.SimpleConnectionPool(1, 10, 
                                                host=DB_HOST,
                                                port=DB_PORT,
                                                database=DB_NAME,
                                                user=DB_USER,
                                                password=DB_PW)

    def get_connection(self):
        return self.connection_pool.getconn()

    def release_connection(self, conn):
        self.connection_pool.putconn(conn)

    def purgeDocument(self):
        conn = self.get_connection()
        try:
            with conn.cursor() as curs:
                curs.execute("DELETE FROM documents")
                conn.commit()
        finally:
            self.release_connection(conn)
        return True

    def addDocument(self, category, title, short, info, age, kids, accom, insure, study, job, live, refugee, other, documenttype, image, links):
        conn = self.get_connection()
        try:
            with conn.cursor() as curs:
                curs.execute(
                    """INSERT INTO documents (category, title, info, age, kids, accom, insure, study, job, live, refugee, other, "documentType", short, links, image) 
                    VALUES (%(Category)s, %(Title)s, %(Info)s, %(Age)s, %(Kids)s, %(Accom)s, %(Insure)s, %(Study)s, %(Job)s, %(Live)s, %(Refugee)s, %(Other)s, %(DocumentType)s, %(Short)s, %(Links)s, %(Image)s)""",
                    {
                        'Category': category, 'Title': title, 'Short': short,
                        'Info': info, 'Age': age, 'Kids': kids, 'Accom': accom,
                        'Insure': insure, 'Study': study, 'Job': job, 'Live': live,
                        'Refugee': refugee, 'Other': other, 'DocumentType': documenttype,
                        'Image': image, 'Links': links
                    }
                )
                conn.commit()
        finally:
            self.release_connection(conn)
        return True

    def updateDocument(self, category, title, short, info, age, kids, accom, insure, study, job, live, refugee, other, documenttype, image, links):
        conn = self.get_connection()
        try:
            with conn.cursor() as curs:
                curs.execute(
                    """UPDATE documents 
                    SET category=%(Category)s, info=%(Info)s, age=%(Age)s, kids=%(Kids)s, accom=%(Accom)s, 
                    insure=%(Insure)s, study=%(Study)s, job=%(Job)s, live=%(Live)s, refugee=%(Refugee)s, 
                    other=%(Other)s, "documentType"=%(DocumentType)s, short=%(Short)s, links=%(Links)s, image=%(Image)s 
                    WHERE title = %(Title)s""",
                    {
                        'Category': category, 'Title': title, 'Short': short,
                        'Info': info, 'Age': age, 'Kids': kids, 'Accom': accom,
                        'Insure': insure, 'Study': study, 'Job': job, 'Live': live,
                        'Refugee': refugee, 'Other': other, 'DocumentType': documenttype,
                        'Image': image, 'Links': links
                    }
                )
                conn.commit()
        finally:
            self.release_connection(conn)
        return True

    @classmethod
    def close_all_connections(cls):
        cls.connection_pool.closeall()


class DocumentAdder:
    def __init__(self, path):
        self.path = path

    def getAllFiles(self):
        files = glob.glob(self.path + '/**/*.xlsx', recursive=True)

        for i in range(len(files)):
            files[i] = files[i].replace('\\', '/')

        return files

    def getImage(self, path):
        with open(path, "rb") as image:
            s = base64.b64encode(image.read())
            a = bytes(s)
            arr = BytesIO(a).read()
        return arr

    def InsertOrUpdateData(self):
        files = self.getAllFiles()
        docs = Documents()
        docs.purgeDocument()
        print("insert: 1")
        print("update: 2")
        inpt = int(input("insert or update data?:"))

        for file in files:
            print(file)
            df = pd.read_excel(file)
            if "category" not in df: continue
            category = df["category"][0].capitalize()
            if "title" not in df: continue
            title = df["title"][0].capitalize()
            if "info" not in df: continue
            info = df["info"][0]
            desc = df["short_description"][0] if "short_description" in df else ""
            age = 24 if "age" not in df or math.isnan(df["age"][0]) else df["age"][0]
            kids = 0 if "kids" not in df or math.isnan(df["kids"][0]) else df["kids"][0]
            accom = 0 if "accom" not in df or math.isnan(df["accom"][0]) else df["accom"][0]
            insure = 0 if "insure" not in df or math.isnan(df["insure"][0]) else df["insure"][0]
            study = 0 if "study" not in df or math.isnan(df["study"][0]) else df["study"][0]
            job = 0 if "job" not in df or math.isnan(df["job"][0]) else df["job"][0]
            live = 0 if "live" not in df or math.isnan(df["live"][0]) else df["live"][0]
            refugee = 0 if "refugee" not in df or math.isnan(df["refugee"][0]) else df["refugee"][0]
            other = 0 if "other" not in df or math.isnan(df["other"][0]) else df["other"][0]
            documentType = None if "documentType" not in df or df["documentType"].isnull else df["documentType"][0]
            image = None if "image" not in df else df["image"][0]
            links = None if "useful_links" not in df else df["useful_links"][0]
            if inpt == 1:
                docs.addDocument(category, title, desc, info, age, kids, accom, insure, study, job, live, refugee,
                                 other, documentType, image, links)
            elif inpt == 2:
                docs.updateDocument(category, title, desc, info, age, kids, accom, insure, study, job, live,
                                    refugee, other, documentType, image, links)


dc = DocumentAdder('./documents')
dc.InsertOrUpdateData()