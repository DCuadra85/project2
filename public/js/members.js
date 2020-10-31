$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });

  

$(".testButton").on("click", function(event){
  event.preventDefault();


 window.location.href = "https://accounts.spotify.com/authorize?client_id=e4d66ae376534f54b84289b286defe4a&response_type=code&redirect_uri=https%3A%2F%2Fmusiccommenter.herokuapp.com%2Fmembers"

})

});


