from flask import Flask, render_template, session, redirect, url_for, escape, request, flash
import users
import json
import data_handler
app = Flask(__name__)


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
def main():
    if 'username' in session:
        user_status = 'Logged in as %s' % escape(session['username'])
    else:
        user_status = 'You are not logged in'
    return render_template('index.html', user_status=user_status)


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

@app.route('/<something>')
@app.route('/')
def index(something=None):
    if 'username' in session:
        user_status = 'Logged in as %s' % escape(session['username'])
        if something is not None:
            flash('cöh. you sneaki')
            return render_template('index.html', user_status=user_status)
        return render_template('index.html', user_status=user_status)
    else:
        user_status = 'You are not logged in'
        if something is not None:
            flash('cöh. you sneaki')
            return render_template('login.html', user_status=user_status)
    return render_template('login.html', user_status=user_status)


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
                    return redirect(url_for("main"))
                flash("Username is already exists!", "error")
                return redirect(url_for("registration"))
            flash("Password must be at least 5 characters long!", "error")
            return redirect(url_for("registration"))
    return render_template("registration.html")


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
                return redirect(url_for("main"))
            flash("Invalid username or password!", "error")
            return redirect(url_for("login"))
    return render_template("login.html")


@app.route("/logout")
def logout():
    session.pop("username", None)
    return redirect(url_for("index"))

# set the secret key.  keep this really secret:
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
