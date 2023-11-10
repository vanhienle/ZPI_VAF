import psycopg2

class Documents:
    def __init__(self) -> None:
        self.DBConnection, self.DBCursor = self.createDBCursor()

    def createDBCursor(self):
        conn = psycopg2.connect(host='91.195.53.69',
                                port=5432,
                                database="ClientDatabase",
                                user="postgres",
                                password="!")
        return conn, conn.cursor()


    def getDocument(self, id):
        print('inside get document')
        self.DBCursor.execute(
            """SELECT * 
            FROM documents 
            WHERE Id = %(Id)s""",
            {'Id': id})
        result = self.DBCursor.fetchone()
        print('After query=', result)
        return result


    def getAllByCategory(self, category):
        print('inside get all by category')
        self.DBCursor.execute(
            """SELECT * 
            FROM documents 
            WHERE Category = %(Category)s""",
            {'Category': category})
        return self.DBCursor.fetchall()


    def getAllByName(self, name):
        print('inside get all by name')
        self.DBCursor.execute(
            """SELECT * 
            FROM documents 
            WHERE position(LOWER(title) in LOWER('%(Name)s'))>0;""",
            {'Name': name})
        return self.DBCursor.fetchall()


    def getRecommendations(self, id, age, kids, baby, teen, adult, accom, insure, study, job, live, refugee, other, documenttype):
        print('inside get recommendations')
        self.DBCursor.execute(
            """SELECT title,
            info, 
            (Kids*%(Kids)s+Accom*%(Accom)s+Insure*%(Insure)s+Study*%(Study)s+Job*%(Job)s+Live*%(Live)s+Refugee*%(Refugee)s+Other*%(Other)s) AS score
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
        results = self.DBCursor.fetchall()
        for res in results:
            print("score: ", res[2],"=>", res[0])
        return results


    def fin(self):
        self.DBConnection.close()
