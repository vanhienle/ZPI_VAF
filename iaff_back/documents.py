import psycopg2


class Documents:
    def __init__(self) -> None:
        self.DBConnection, self.DBCursor = self.createDBCursor()

    def createDBCursor(self):
        conn = psycopg2.connect(host='diploma-db',
                                port=5432,
                                database="ClientDatabase",
                                user="postgres",
                                password="!")
        return conn, conn.cursor()

    def getDocument(self, id):
        self.DBCursor.execute(
            """SELECT * 
            FROM documents 
            WHERE Id = %(Id)s""",
            {'Id': id})
        result = self.DBCursor.fetchone()
        return result

    def getCategories(self):
        conn, curs = self.createDBCursor()
        curs.execute("""SELECT DISTINCT Category  FROM documents""")
        result = curs.fetchall()
        curs.close()
        conn.close()
        return result

    def getAllByCategory(self, category):
        conn, curs = self.createDBCursor()
        curs.execute(
            """SELECT * 
            FROM documents 
            WHERE Category = %(Category)s""",
            {'Category': category})
        result = curs.fetchall()
        curs.close()
        conn.close()
        return result

    def getAllByName(self, name):
        self.DBCursor.execute(
            """SELECT * 
            FROM documents 
            WHERE position(%(Name)s in LOWER(title))>0 OR position(%(Name)s in LOWER(category))>0;""",
            {'Name': name.lower()})
        return self.DBCursor.fetchall()

    def addDocument(self, category, title, short, info, age, kids, accom, insure, study, job, live, refugee, other,
                    documenttype, image, links):
        self.DBCursor.execute(
            """INSERT INTO documents (category, title, info, age, kids, accom, insure, study, job, live, refugee, other, "documentType", image, short, links) 
            VALUES (%(Category)s,%(Title)s,%(Info)s,%(Age)s,%(Accom)s,%(Insure)s,%(Study)s,%(Job)s,%(Live)s,%(Refugee)s,%(Other)s,%(DocumentType)s,%(Image)s,%(Short)s,%(Links)s)""",
            {'Category': str(int(category)),
             'Title': str(int(title)),
             'Short': str(int(short)),
             'Info': str(int(info)),
             'Age': age,
             'Kids': str(int(kids)),
             'Accom': str(int(accom)),
             'Insure': str(int(insure)),
             'Study': str(int(study)),
             'Job': str(int(job)),
             'Live': str(int(live)),
             'Refugee': str(int(refugee)),
             'Other': str(int(other)),
             'DocumentType': documenttype,
             'Image': str(int(image)),
             'Links': str(int(links))})
        self.DBConnection.commit()
        return True

    def getRecommendations(self, id, age, kids, baby, teen, adult, accom, insure, study, job, live, refugee, other,
                           documenttype):
        conn, curs = self.createDBCursor()
        curs.execute(
            """SELECT title,
            short, 
            (Kids*%(Kids)s+Accom*%(Accom)s+Insure*%(Insure)s+Study*%(Study)s+Job*%(Job)s+Live*%(Live)s+Refugee*%(Refugee)s+Other*%(Other)s) AS score,
            id,
            category,
            image
            FROM documents 
            ORDER BY score DESC
            LIMIT 6
            """,
            {'UserID': id,
             'Age': age,
             'Kids': kids,
             'Accom': accom,
             'Insure': insure,
             'Study': study,
             'Job': job,
             'Live': live,
             'Refugee': refugee,
             'Other': other})
        results = curs.fetchall()
        curs.close()
        conn.close()
        return results

    def fin(self):
        self.DBConnection.close()
