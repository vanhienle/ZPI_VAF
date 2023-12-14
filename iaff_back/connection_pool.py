from flask import current_app

def get_db_connection():
    if 'DB_POOL' in current_app.config:
        return current_app.config['DB_POOL'].getconn()
    raise Exception("Database pool is not set in application configuration")

def return_db_connection(conn):
    if 'DB_POOL' in current_app.config:
        current_app.config['DB_POOL'].putconn(conn)
    else:
        raise Exception("Database pool is not set in application configuration")