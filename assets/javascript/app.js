// Array of shows already shown for user
var shows = ["Rugrats", "Spongebob Squarepants", "Adventure Time", "The Lion King"];

function displayshowGif() {

  $('#shows-view').empty();
  var show = $(this).attr("data-name");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=dc6zaTOxFJmzC&limit=10&offset=0";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    var showDiv = $("<div class='show'>");
    console.log(response);

    for (i = 0; i < response.data.length; i++) {
      var stopGif = response.data[i].images.fixed_height_still.url;
      console.log(stopGif);

      var moveGif = response.data[i].images.fixed_height.url;
      console.log("Moving" + moveGif);

      // To output ratings for user to see
      var rating = response.data[i].rating;
      console.log(rating);

      var rating = $('<p>').text("Rating: " + rating);
      showDiv.append(rating);

      var image = $("<img>").attr("src", stopGif);
      image.attr("playsrc", moveGif);
      image.attr("stopsrc", stopGif);

      showDiv.append(image);

      $('#shows-view').append(showDiv);

      image.addClass('playGif');

    }
  });
}

// Function to click gif to start and stop
function swapGif() {
  var moveGif = $(this).attr('playsrc');
  console.log(moveGif);

  var stopImage = $(this).attr('stopsrc');

  console.log(stopImage);

  if ($(this).attr('playsrc') == $(this).attr('src')) {
    $(this).attr('src', stopImage);
  }

  else {
    $(this).attr('src', moveGif);
  }
}

function renderButtons() {

  $("#buttons-view").empty();

  for (var i = 0; i < shows.length; i++) {

    var a = $("<button>");
    a.addClass("show-btn");
    a.attr("data-name", shows[i]);
    a.text(shows[i]);
    $("#buttons-view").append(a);
  }
}

$("#add-show").on("click", function (event) {
  event.preventDefault();
  var show = $("#show-input").val().trim();

  shows.push(show);

  renderButtons();

});

$(document).on("click", ".show-btn", displayshowGif);
$(document).on('click', '.playGif', swapGif);

renderButtons();