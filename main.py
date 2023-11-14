from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import psycopg2


class ActionRespondFromDatabase(Action):
    def name(self):
        return "respond_from_database"

    def run(self, dispatcher, tracker, domain):
        user_message = tracker.latest_message.get("text")

        conn = psycopg2.connect(
            host='91.195.53.69',
            port=5432,
            database="KnowledgeDatabase",
            user="postgres",
            password="!"
        )

        response = self.query_database(conn, user_message)

        if response:
            dispatcher.utter_message(response)
        else:
            dispatcher.utter_message("I don't have a response for that.")

        conn.close()
        return []

    def query_database(self, conn, user_message):
        tables = {
            "table1": "SELECT response FROM table1 WHERE message = %s",
            "table2": "SELECT response FROM table2 WHERE message = %s",
            "table3": "SELECT response FROM table3 WHERE message = %s",
            "table4": "SELECT response FROM table4 WHERE message = %s",
            "table5": "SELECT response FROM table5 WHERE message = %s",
            "table6": "SELECT response FROM table6 WHERE message = %s",
            "table7": "SELECT response FROM table7 WHERE message = %s",
            "table8": "SELECT response FROM table8 WHERE message = %s",
            "table9": "SELECT response FROM table9 WHERE message = %s",
            "table10": "SELECT response FROM table10 WHERE message = %s",
        }

        for table, query in tables.items():
            cursor = conn.cursor()
            cursor.execute(query, (user_message,))
            result = cursor.fetchone()
            cursor.close()

            if result:
                return result[0]

        return None
