/*
Ivan's notes: 
I made inputs and buttons and stored the hooks in variables. 
What this does thus far, is just console.log values just to make sure that we are getting values
Then I made a class in our stylesheet of 'hide' that allows containers to hide or show when a button is clicked 
i.e when you click the startButton, then the start container will hide and show the next container up. 

Here is were our ajax call magic will happen
*/

$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  var startButton = $("#add");
  var ingredientButton = $("#add-ingredient");
  var viewAllButton = $("#view-all");
  var doneButton = $("#done-button");
  var ingredientContainer = $("#ingredient-container");
  var startContainer = $("#start-container");
  var endContainer = $("#end-container");
  var recipeName = $(".recipe-input");
  var ingredientInput = $(".ingredient-input");
  var instructionInput = $("#add-instruction");
  var addAnother = $("#add-another");
  var vewAllButton = $("#view-all");

  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });

  $(startButton).on("click", function (event) {
    event.preventDefault();
    console.log(recipeName.val());

    ingredientContainer.attr("class", "none card text-center border border-secondary ingredientCon");
    endContainer.attr("class", "hide card text-center border border-secondary endCon");
    startContainer.attr("class", "hide card text-center border border-secondary");

    //  Making a call to post.
    $.get("/api/user_data").then(function (data) {
      console.log(data.id);
      // This is to get user Id and pass it to the UserId foreign Key
      var userId = data.id;
      $.post("/api/recipe", { title: recipeName.val(), id: userId });
    });
  });

  $(ingredientButton).on("click", function (event) {
    event.preventDefault();
    console.log(ingredientInput.val());
    console.log(instructionInput.val());
    // Making a call to post
    $.get("/api/recipe", function (data) {
      var recipeId = data.length;

      console.log(data.length);

      $.post("/api/ingredients", {
        title: ingredientInput.val(),
        body: instructionInput.val(),
        id: recipeId,
      });
    });
  });

  $(doneButton).on("click", function (event) {
    event.preventDefault();
    ingredientContainer.attr("class", "hide card text-center border border-secondary ingredientCon");
    endContainer.attr("class", "none card text-center border border-secondary");
    startContainer.attr("class", "hide card text-center border border-secondary");
  });

  $(addAnother).on("click", function (event) {
    event.preventDefault();

    ingredientContainer.attr("class", "hide card text-center border border-secondary ingredientCon");
    endContainer.attr("class", "none card text-center border border-secondary endCon");
    startContainer.attr("class", "hide card text-center border border-secondary");
  });

  // viewAll Code Starts here

  function appendButtons() {
    var allRecipes = $("#all-recipes");
    var currentRecipes = $("#current-recipe");

    $.get("/api/recipe", function (data) {
      // testing data
      console.log(data);
      console.log(JSON.stringify(data[0].title));
      console.log(data[2].id);

      for (i = 0; i < data.length; i++) {
        var recipeCard = `
<div>
        <h5>${data[i].title}</h5>
        <button class="btn btn-secondary currentR" id=${data[i].id}>View Recipe</button>
</div>

`;

        allRecipes.append(recipeCard);
      }

    });
  }

  appendButtons();

$(document).on("click", ".currentR", function(event){
event.preventDefault()
$("#current-recipe").empty();
var currentId = this.id;
console.log(this.id);

$.get("/api/recipe/" + currentId, function(data){
console.log(data)

var allIngredients = "";

for (i=0; i< data.Ingredients.length; i++){
  allIngredients += "<p><strong>Ingredient: </strong>" + data.Ingredients[i].title + "</p>" + "<p>Instruction: " + data.Ingredients[i].body + "</p>"
  
}

var fullrecipe = 
`
<h3>${data.title}</h3>
<div>${allIngredients}</div>

`;

$("#current-recipe").append(fullrecipe);
})




})

 
});
