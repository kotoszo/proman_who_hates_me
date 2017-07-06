var app = app || {};

app.dom = {
    showBoards: function () {

        $("#cards").hide();

        app.dom.checkBoardTitleInput();

        if ($.isEmptyObject(app.dataHandler.data)) {
            app.dataHandler.createData();
            app.dataHandler.saveBoards();
            noBoards = '<span>No boards</span>';
            $("#boards").append(noBoards);
        }
        else {
            $("#boards").children().remove();

            if (app.dataHandler.data && app.dataHandler.data.length > 0) {
                var asd = app.dataHandler.data;
                $.each(asd, function (index, value) {

                    $('<span />', {
                        'text': value.title,
                        'class': 'board-title',
                        'data-id': value.id,
                        'id': value.id
                    }).appendTo('#boards');

                });

                $("#boards .board-title").each(function () {
                    $(this).wrapAll("<div class='board-col' />");
                });

                $("#boards .board-col").each(function () {
                    $(this).wrapAll("<div class='col-sm-4' />");
                });

                var divsToGroup = $("#boards .col-sm-4");

                for (var i = 0; i < divsToGroup.length; i += 3) {
                    divsToGroup.slice(i, i + 3).wrapAll("<div class='row' />");
                }
            }
        }

        $("#boards .col-sm-4").each(function (index, value) {
            var boardId = $(value).find('span').data('id');
            $(value).on('click', function () {
                app.dom.showCards(boardId);
            });
        });

        $("#boards").show();
    },
    addBoard: function () {
        $("#add-board").click(function () {
            var title = $("#board-title-input").val();
            $.ajax({
                dataType: "json",
                url: '/new-board/' + String(title),
                data: title,
                success: function (response) {
                    if (typeof (app.dataHandler.data) === 'object') {
                        app.dataHandler.data = new Array;
                    }
                    var dataw = app.dataHandler.data;
                    var newTitle = response.title;
                    var newId = response.id;
                    dataw.push({ 'id': newId, 'title': newTitle });
                    app.dom.showBoards();
                    $('#add-board').prop('disabled', true);
                    $("#board-title-input").val('');
                }
            });

        });
    },
    checkBoardTitleInput: function () {
        $("#board-title-input").on('change keyup', function () {
            if ($("#board-title-input").val().length) {
                $('#add-board').prop('disabled', false);
            }
            else {
                $('#add-board').prop('disabled', true);
            }
        });
    },
    errorHandler: function (error) {
        if (error) {
            $("#messages-body").text(error.message);
            $("#messages-body").show();
        }
    },
    showCards: function (boardId) {
        var title = $('#' + boardId).text()

        try {
            var boardToShow = app.dataHandler.getBoard(boardId);
        }
        catch (error) {
            this.errorHandler(error);
        }
    },
    showCards2: function (boardToShow) {
        console.log(boardToShow);

        $("#cards").children().remove();

        $("#cards").append("<h1>" + boardToShow.title + "</h1>");
        $("#cards").append('<div class="row"></div>');

        var lists = [
            {
                id: 'new',
                title: 'New',
                list: 'newList',
                cards: boardToShow.cards.newList
            },
            {
                id: 'in-progress',
                title: 'In Progress',
                list: 'inProgressList',
                cards: boardToShow.cards.inProgressList
            },
            {
                id: 'review',
                title: 'Review',
                list: 'reviewList',
                cards: boardToShow.cards.reviewList
            },
            {
                id: 'done',
                title: 'Done',
                list: 'doneList',
                cards: boardToShow.cards.doneList
            }
        ];
        console.log(lists);

        $.each(lists, function (index, value) {
            $("#cards .row").append('<div class="col-sm-3"></div>');
            $("#cards .col-sm-3:eq(" + index + ")").append('<div class="list" id="' + value.id + '">');
            $("#" + value.id).append('<h2 class="card-header">' + value.title + '</h2>');
            $("#" + value.id).append('<a id="' + value.id + '-list-new-card" href="#">Add new Card</a>');
            $("#" + value.id + "-list-new-card").on('click', function () {
                app.dom.insertNewCard(boardToShow.id, value.id);
            });

            if (value.cards) {
                $.each(value.cards, function (i, v) {
                    $("#" + value.id).append('<div id="edit-div-' + v.id + '" class="card-wrapper"> \
                                                <div class="card-text" id="' + v.id + '">' + v.title + '</div> \
                                                <button data-id="' + v.id + '" data-lists="' + value.list + '" type="button" class="btn btn-primary edit-button">Edit</button> \
                                              </div>');
                });

                $("#" + value.id + " .card-wrapper").each(function () {
                    $(this).wrapAll("<div class='card-col' />");
                });

                $("#cards .edit-button").each(function () {
                    $(this).on('click', function (event) {
                        event.stopImmediatePropagation();
                        var id = $(this).data('id');
                        var title = document.getElementById(id).innerHTML;
                        app.dom.editCard(boardToShow.id, title, $(this).data('lists'), $(this).data('id'));
                    });
                });
            }
        });

        $("#boards").hide();
        $("#create-new-board").hide();
        $("#tour-button").hide();
        $("#cards").show();
    },
    insertNewCard: function (boardId, listName) {
        $("#" + listName + "-list-new-card").hide();
        $("#" + listName + " .card-header").after(' \
            <div class="card-col"> \
                <textarea id="' + listName + '-card-title" col="5" row="2" placeholder="Card Title"></textarea> \
                <button type="button" class="btn btn-success" id="' + listName + '-save-new-card">Save</button> \
            </div> \
        ');

        $("#" + listName + "-save-new-card").on('click', function () {
            var newCardTitle = $("#" + listName + "-card-title").val();
            $.ajax({
                dataType: 'json',
                url: '/new-card/' + boardId + '+' + newCardTitle + '+' + listName,
                success: function (response) {
                    app.dom.showCards(boardId);
                }
            })
        });

    },
    editCard: function (boardId, cardTitle, listName, editId) {
        $("#edit-div-" + editId).replaceWith('<div id="edit-div-' + editId + '" class="card-wrapper"> \
                                                <textarea id="' + editId + '-edited-card-title" col="5" row="2" placeholder="Card Title">' + cardTitle + '</textarea> \
                                                <button type="button" class="btn btn-success" id="' + editId + '-save-edited-card">Save</button> \
                                              </div>');
        $("#" + editId + "-save-edited-card").on('click', function (event) {
            event.stopImmediatePropagation();
            var editedContent = $("#" + editId + "-edited-card-title").val();
            app.dataHandler.updateCard(boardId, editId, editedContent);
        });
    }

}
