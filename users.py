from werkzeug import security
import db


def save_hashed_pass(username, password):
    password = security.generate_password_hash(password, method='pbkdf2:sha256', salt_length=8)
    sql = """INSERT INTO users (username, password) VALUES (%s, %s) RETURNING id;"""
    data = (username, password)
    db.excute_sql(sql, data)


def check_user_and_pass(username, password):
    if username and password:
        return True if len(password) > 5 else False
    return False


def check_username(username):
    sql = """SELECT username FROM users;"""
    users = db.excute_sql(sql, method='column')
    return False if username in users else True


def check_password(username, password):
    sql = """SELECT username FROM users;"""
    users = db.excute_sql(sql, method="column")
    for i in users:
        if username in i:
            sql = """SELECT password FROM users WHERE username = %s;"""
            data = (username,)
            hashed_pw = db.excute_sql(sql, data, method='one')
            if security.check_password_hash(hashed_pw, password):
                return True
            return False
    return False


def get_id_by_username(username):
    sql = """SELECT id FROM users WHERE username = %s;"""
    data = (username,)
    result = db.excute_sql(sql, data, method='one', is_dict=True)
    return result