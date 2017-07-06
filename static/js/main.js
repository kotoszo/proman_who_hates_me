
var app = app || {};

app.init = function () {
    app.dataHandler.loadBoards();
    app.dom.addBoard();
    app.dom.checkBoardTitleInput();
}


app.init();