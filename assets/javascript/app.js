
$('.search-button').click(function (event) {
    var userInput = $('#image-input').val();
    var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + userInput + '&api_key=4xhpDEomHg5DzxEn208KYSwlZIcF6lzd&limit=5&rating=g';
    // alert(userInput);
    // alert(queryURL);
    event.preventDefault();
    
    $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function movieData(response) {
          // $("#movie-view").text(JSON.stringify(response));
          console.log(response.data);

          var item = response.data

          for (let i = 0; i < item.length; i++) {
              var imageRating = item[i].rating;
              var imageDisplay = $('<p>');
              imageDisplay.text(imageRating);
              $('.image-results').prepend(imageDisplay);

              var image = item[i].images.original_still.url;
              console.log(image)
              var imageDisplay = $('<img>');
              imageDisplay.attr('src', image);
              $('.image-results').prepend(imageDisplay);
              
          }
        });
}) 




    