
var gifArray = [];

$('.search-button').click(function (event) {
    var userInput = $("#image-input").val();
    event.preventDefault();
    
    // Constructing a queryURL using the user input
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + userInput + '&api_key=4xhpDEomHg5DzxEn208KYSwlZIcF6lzd&limit=10&rating=g';
    
    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function (response) {
    console.log(queryURL);

        console.log(response.data);
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var imageDiv = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var imageThing = $("<img>").addClass('gif');
            imageThing.attr("src", results[i].images.fixed_height_still.url);
            imageThing.attr("data-still", results[i].images.fixed_height_still.url);
            imageThing.attr("data-animate", results[i].images.fixed_height.url);
            imageThing.attr("data-state", "still");

            imageDiv.append(imageThing);
            imageDiv.append(p);

            $(".third").prepend(imageDiv);
            whatever();
        }

    });
    $('#image-input').val('');
    
    if (userInput.val != '' && userInput != '') {
        gifArray.push(userInput);
        renderButtons()
    } else {
        alert('You gotta type something bro.')
    }
});

function renderButtons() {
    console.log(gifArray);
    $(".button-div").empty();

    for (var i = 0; i < gifArray.length; i++) {

      var a = $("<button>");
      a.addClass("image-button button");
      a.attr("data-name", gifArray[i]);
      a.text(gifArray[i]);
      
      $(".button-div").append(a); 
    }
}



function alertGifName() {
    var gifName = $(this).attr("data-name");
    renderButtons();
    // alert(gifName);

    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + gifName + '&api_key=4xhpDEomHg5DzxEn208KYSwlZIcF6lzd&limit=5&rating=g';

    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function (response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var imageDiv = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var imageThing = $("<img>").addClass('gif');
            imageThing.attr("src", results[i].images.fixed_height.url);
            imageThing.attr("data-still", results[i].images.fixed_height_still.url);
            imageThing.attr("data-animate", results[i].images.fixed_height.url);
            imageThing.attr("data-state", 'animate');

            imageDiv.append(imageThing);
            imageDiv.append(p);

            $(".third").prepend(imageDiv);
        }
        whatever();
    });
}

$("#search-button").on("click", function(event) {
    event.preventDefault();
    renderButtons();
});

function whatever() {
    $(".gif").on("click", function() {
        console.log('this');
        var state = $(this).attr("data-state");
    
        if ($(this).attr("data-state") === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
    
}

