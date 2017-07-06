
hopscotch.registerHelper('fillText', function(textFieldId, textStr) {
    document.querySelector(textFieldId).value = textStr;
});

hopscotch.registerHelper('selectInput', function() {
    $('#board-title-input').addClass('selected');
});

hopscotch.registerHelper('deSelectInput', function() {
    $('#board-title-input').removeClass('selected');
});

hopscotch.registerHelper('enableButton', function() {
    setTimeout(function(){
        $('#add-board').prop('disabled', false);
    }, 2000);
});

hopscotch.registerHelper('disableButton', function() {
    $('#add-board').prop('disabled', true);
});


// Define the tour
var tour = {
    id: "proman-tour",
    onClose: [["fillText", "#board-title-input", ""], "disableButton", "deSelectInput"],
    steps: [
    {
        title: "Welcome to ProMan by tapéta!",
        content: "This page is the next Trello, you can add boards and cards to help yourself get organized.",
        target: "nav",
        placement: "bottom",
        xOffset: "center",
        arrowOffset: "center",
        onNext: [["fillText", "#board-title-input", "Example board title"], "selectInput"]
    },
    {
        title: "Add new board 1/2",
        content: "First enter your new board title here...",
        target: document.querySelector("#board-title-input"),
        placement: "right",
        xOffset: "-30px",
        yOffset: "-10px", 
        onNext: [["deSelectInput"], "enableButton"]
    },
    {
        title: "Add new Board 2/2",
        content: "...then this button will become active. Clicking on the button creates the new board.",
        target: document.querySelector("#add-board"),
        placement: "bottom",
        onNext: [["fillText", "#board-title-input", ""], "disableButton"]
    },
    {
        title: "Add new Cards",
        content: "Of course you can add new cards, but this time we stop here with this demo. Thanks for your patience! :)",
        target: "nav",
        placement: "bottom",
        xOffset: "center",
        arrowOffset: "center"
    }
    ]
};

// Start the tour
$("#info-button").click(function(){
    hopscotch.startTour(tour);
});
