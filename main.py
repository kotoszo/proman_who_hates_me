from flask import Flask, render_template, session, redirect, url_for, escape, request, flash
import users
import json
import data_handler
import os
app = Flask(__name__)

"""
@app.route('/getboard/<boardId>')
def get_board(boardId):
    cards = data_handler.select_cards(boardId)
    schön = data_handler.select_cards_to_dict(cards)
    selected_board = data_handler.get_one_board(boardId)[0]
    return json.dumps({'cards': schön, 'id': selected_board['id'], 'title': selected_board['title']})


@app.route('/updatecard/<card_id>+<card_title>', methods=['GET', 'POST'])
def update_card(card_id, card_title):
    data_handler.update_cards(card_id, card_title)
    return json.dumps({'status': 'ok'})


@app.route('/new-card/<board_id>+<title>+<state>')
def save_card(board_id, title, state):
    data_handler.insert_cards(board_id, title, state)
    return json.dumps({'status': 'ok'})


@app.route('/boards', methods=['GET', 'POST'])
def SZARBASZODTEFASZ():
    if 'username' in session:
        user_status = 'Logged in as %s' % escape(session['username'])
        return render_template('index.html', user_status=user_status)
    else:
        user_status = 'You are not logged in'
        return render_template('login.html', user_status=user_status)


@app.route('/getboards', methods=['GET', 'POST'])
def get_boards():
    username = session['username']
    user_id = users.get_id_by_username(username)['id']
    boards = data_handler.select_boards(user_id)
    return json.dumps(boards)


@app.route('/new-board/<title>', methods=['GET', 'POST'])
def new_board(title):
    username = session['username']
    user_id = users.get_id_by_username(username)['id']
    data_handler.insert_board(user_id, title)
    board_id = data_handler.id_by_name(title)
    return json.dumps({'title': title, 'id': board_id})
"""

@app.route('/')
def index():
    if 'username' not in session:
        return redirect(url_for('login'))
    print('juhuu')
    username = session['username']
    return render_template('login.html', username=username)


@app.route("/registration", methods=["GET", "POST"])
def registration():
    if request.method == "POST":
        usrn = request.form["username"]
        pw = request.form["password"]
        if (usrn == '') or (pw == ''):
            flash('I think you forget something')
            return redirect(url_for('registration'))
        else:
            if users.check_user_and_pass(usrn, pw):
                if users.check_username(usrn):
                    users.save_hashed_pass(usrn, pw)
                    session["username"] = usrn
                    return redirect(url_for("index"))
                    #return render_template('index.html')
                flash("Username is already exists!", "error")
                return redirect(url_for("registration"))
            flash("Password must be at least 5 characters long!", "error")
            return redirect(url_for("registration"))
    return render_template("registration.html")


def login():
    if request.method == 'POST':
        session['username'] = request.form['username']
        return redirect(url_for('index'))
    return '''
        <form method="post">
            <p><input type=text name=username>
            <p><input type=submit value=Login>
        </form>
    '''


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        usrn = request.form["username"]
        pw = request.form["password"]
        if (usrn == '') or (pw == ''):
            flash('I think you forget something')
            return redirect(url_for('login'))
        else:
            if users.check_password(usrn, pw):
                session["username"] = usrn
                return redirect(url_for("index"))
            flash("Invalid username or password!", "error")
            return redirect(url_for("login"))
    return render_template("login.html")


@app.route("/logout")
def logout():
    session.pop("username", None)
    return redirect(url_for("index"))


@app.errorhandler(404)
def error_handler_404(e):
    error_text = e
    error_code = 404
    return render_template('404.html', error_code=error_code, error_text=error_text), 404


# randomize and set the secret key.  keep this really secret:
key = os.urandom(256)

app.secret_key = key


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
