
// Here now we are putting our routes and models into use as we have set them up correctly and configured them. 

// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

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
};

 









// Get route to get all the songs made by the user. 
 app.get("/api/user_songs", function (req, res) {
    db.Songs.findAll({
        where: {
            hostId: req.params.id
        }
    }).then(function (dbSongs) {
        res.json(dbSongs);
    });
});

// route used to get all songs and their host
app.get("/api/event", (req, res) => {

})

//POST route for saving new Songs
app.post("/api/user_songs", function (req, res) {
    db.Songs.create({

    }).then(function (dbSongs) {
        res.json(dbSongs);
    });
});
//DELETE route from Songs list
app.delete("/api/user_songs/:id", function (req, res) {
    db.Songs.destroy({}).then(function (req, res) {
        res.json(dbSongs);
    });
});
app.get("/api/user_comments", function (req, res) {
    db.Comments.findAll({}).then(function (req, res) {
        res.json(dbComments);
    });
});
app.post("/api/user_comments", function (req, res) {
    db.Comments.create({}).then(function (req, res) {
        res.json(dbComments);
    });
});
app.delete("/api/user_comments", function (req, res) {
    db.Comments.destroy({}).then(function (req, res) {
        res.json(dbComments);
    });
});
app.update("/api/user_comments", function (req, res) {
    db.Comments.update({}).then(function (req, res) {
        res.json(dbComments);
    });
});

