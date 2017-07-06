import db


def insert_board(user_id, title):
    sql = """INSERT INTO boards (user_id, title) VALUES (%s, %s) RETURNING id;"""
    data = (user_id, title)
    db.excute_sql(sql, data)


def insert_cards(board_id, title, state):
    sql = """INSERT INTO cards (board_id, title, state) VALUES (%s, %s, %s) RETURNING id;"""
    data = (board_id, title, state)
    db.excute_sql(sql, data)


def update_cards(card_id, title):
    sql = """UPDATE cards SET title = %s WHERE id = %s RETURNING id;"""
    data = (title, card_id)
    db.excute_sql(sql, data)


def select_boards(user_id):
    sql = """SELECT id, title FROM boards WHERE user_id = %s;"""
    data = (user_id,)
    boards = db.excute_sql(sql, data, is_dict=True)
    return boards


def get_one_board(board_id):
    sql = """SELECT id, title FROM boards WHERE id=%s;"""
    data = (board_id,)
    board = db.excute_sql(sql, data, is_dict=True)
    return board


def select_cards(boardId):
    sql = """SELECT id, title, state FROM cards WHERE board_id = %s;"""
    data = (boardId,)
    cards = db.excute_sql(sql, data, is_dict=True)
    return cards


def id_by_name(board_title):
    sql = """SELECT id FROM boards WHERE title = %s;"""
    data = (board_title,)
    board_title = db.excute_sql(sql, data, method='one')
    return board_title


def select_boards_to_dict(boards):
    board_dict = {}
    for i in boards:
        board_dict.update({i['id']: i['title']})
    return board_dict


def select_cards_to_dict(cards):
    for i in cards:
        print(i)
    cards_list = {}
    newList = []
    inProgressList = []
    reviewList = []
    doneList = []
    for i in cards:
        print(i)
        if i['state'] == 'new':
            newList.append({'id': i['id'], 'title': i['title']})
        elif i['state'] == 'in-progress':
            inProgressList.append({'id': i['id'], 'title': i['title']})
        elif i['state'] == 'review':
            reviewList.append({'id': i['id'], 'title': i['title']})
        elif i['state'] == 'done':
            doneList.append({'id': i['id'], 'title': i['title']})
    cards_list.update({'newList': newList,
                        'inProgressList': inProgressList,
                        'reviewList': reviewList,
                        'doneList': doneList})
    return cards_list


def main():
    print(select_boards(10))

if __name__ == '__main__':
    main()