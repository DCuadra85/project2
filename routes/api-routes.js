// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport.js");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  //built in to express
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

// route to get all recipes, with their ingredients, joined together
  app.get("/api/recipe", function(req, res) {
    db.Recipe.findAll({
      include: [db.Ingredients]
    }).then(function(dbrecipe) {
      res.json(dbrecipe);
    });
  });

  // Route to get on recipe through the ID in the id parameter with ingredients joined
  app.get("/api/recipe/:id", function(req, res) {
   
    db.Recipe.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Ingredients]
    }).then(function(dbrecipe) {
      res.json(dbrecipe);
    });

  });

// route to create a recipe
  app.post("/api/recipe", function(req, res) {
    console.log(req.body);
    db.Recipe.create({title: req.body.title, UserId: req.body.id}).then(function(dbrecipe) {
      res.json(dbrecipe);
    });
  });

  // route to delete recipe with rew.params id, when deleted it will delete all ingredients as well.
  // app.delete("/api/recipe/:id", function(req, res) {
  //   db.recipe.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbrecipe) {
  //     res.json(dbrecipe);
  //   });
  // });


// START OF INGRIDIENT ROUTES


// route to create new ingridient

  app.post("/api/ingredients", function(req, res) {
    db.Ingredients.create({title: req.body.title, body: req.body.body, RecipeId: req.body.id}).then(function(dbingredients) {
      res.json(dbingredients);
    });
  });

  // Incase we get to deleting specific ingredients this is the route
  // app.get("/api/ingredients", function(req, res) {
  //   db.ingredients.findAll(req.body).then(function(dbingredients) {
  //     res.json(dbingredients);
  //   });
  // });

  // If we get to being able to update an ingridient. This is the route
  // app.put("/api/ingredients", function(req, res) {
  //   db.ingredients.update(
  //     req.body,
  //     {
  //       where: {
  //         id: req.body.id
  //       }
  //     }).then(function(dbingredients) {
  //     res.json(dbingredients);
  //   });
  // });

};
