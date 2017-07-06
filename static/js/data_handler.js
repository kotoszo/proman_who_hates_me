
var app = app || {};

app.dataHandler = {

    data: new Array(),
    getNextBoardId: function () {
        if (this.data && this.data.boardCounter) {
            var nextBoardId = this.data.boardCounter;
            this.data.boardCounter += 1;
            this.saveBoards();
        }
        else {
            var nextBoardId = null;
        }

        return nextBoardId;
    },
    loadBoards: function () {
        $.ajax({
            dataType: 'json',
            url: '/getboards',
            success: function (response) {
                if (typeof (app.dataHandler.data) === 'object') {
                    app.dataHandler.data = new Array();
                }
                for (var i=0; i<response.length; i++) {
                    app.dataHandler.data.push(response[i]);
                }
                app.dom.showBoards();
            }
        });
    },

    saveBoards: function () {
        try {
            localStorage.setItem('data', JSON.stringify(this.data));
        }
        catch (error) {
            app.dom.errorHandler(error);
        }
    },
    getBoard: function (boardId) {
            $.ajax({
                dataType: 'json',
                url: '/getboard/' + boardId,
                success: function (response) {
                    app.dom.showCards2(response);
                }
            });
    },
    createNewBoard: function (boardTitle) {
        if ($.isEmptyObject(this.data)) {
            //this.createData();
            this.saveBoards();
            this.loadBoards();
        }

        var newBoard = {
            id: this.getNextBoardId(),
            title: boardTitle,
            state: 1,
            newList: [],
            inProgressList: [],
            reviewList: [],
            doneList: []
        };

        try {
            this.data.boards.push(newBoard);
        }
        catch (error) {
            app.dom.errorHandler(error);
        }
    },/*
    createData: function () {
        this.data = {
            "boardCounter": 1,
            "cardCounter": 1,
            "boards": []
        }
    },*/
    getNewCardId: function (nameOfTheList) {
        if (this.data && this.data.cardCounter) {
            var newCardId = this.data.cardCounter;
            this.data.cardCounter += 1;
            this.saveBoards();
        }
        else {
            var nextCardId = null;
        }

        return newCardId;
    },
    createNewCard: function (boardId, listId, newCardTitle) {

        var newCard = {
            id: this.getNewCardId(),
            title: newCardTitle,
            order: 1
        };

        $.each(app.dataHandler.data.boards, function (index, value) {
            if (value.id == boardId) {
                try {
                    switch (listId) {
                        case 'new':
                            app.dataHandler.data.boards[index].newList.push(newCard);
                            break;
                        case 'in-progress':
                            app.dataHandler.data.boards[index].inProgressList.push(newCard);
                            break;
                        case 'review':
                            app.dataHandler.data.boards[index].reviewList.push(newCard);
                            break;
                        case 'done':
                            app.dataHandler.data.boards[index].doneList.push(newCard);
                            break;
                    }
                }
                catch (error) {
                    app.dom.errorHandler(error);
                }
            }
        });
    },
    getCardById: function (cardId) {
        if (!$.isEmptyObject(app.dataHandler.data)) {
            $.each(app.dataHandler.data.boards, function (index, value) {
                $.each(value.newList, function () {
                    if (cardId == $(this)[0].id) {
                        cardObj = {
                            card: $(this)[0],
                            list: 'newList'
                        };
                    }
                });
                $.each(value.inProgressList, function () {
                    if (cardId == $(this)[0].id) {
                        cardObj = {
                            card: $(this)[0],
                            list: 'inProgressList'
                        };
                    }
                });
                $.each(value.reviewList, function () {
                    if (cardId == $(this)[0].id) {
                        cardObj = {
                            card: $(this)[0],
                            list: 'reviewList'
                        };
                    }
                });
                $.each(value.doneList, function () {
                    if (cardId == $(this)[0].id) {
                        cardObj = {
                            card: $(this)[0],
                            list: 'doneList'
                        };
                    }
                });
            });
            return cardObj;
        }
    },
    updateCard: function (boardId, editId, editedContent) {
        $.ajax({
            dataType: 'json',
            url: '/updatecard/'+ editId + '+' + editedContent,
            data: editedContent,
            success: function(response) {
                app.dom.showCards(boardId);

            }
        });
    }
}
