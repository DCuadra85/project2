// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");
// Creating our User model
<<<<<<< HEAD
module.exports = function (sequelize, DataTypes) {
=======
module.exports = function(sequelize, DataTypes) {
>>>>>>> b5186734b56ba0bba9db622871010b98d3a02b05
  var User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
<<<<<<< HEAD
        isEmail: true,
      },
=======
        isEmail: true
      }
>>>>>>> b5186734b56ba0bba9db622871010b98d3a02b05
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
<<<<<<< HEAD
      allowNull: false,
    },
  });

  User.associate = function (models) {
    User.hasOne(models.profilePicture, {
      onDelete: "cascade",
    });
    User.hasMany(models.Songs, {
      onDelete: "cascade",
    });
  };
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function (password) {
=======
      allowNull: false
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
>>>>>>> b5186734b56ba0bba9db622871010b98d3a02b05
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
<<<<<<< HEAD
  User.addHook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
=======
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
>>>>>>> b5186734b56ba0bba9db622871010b98d3a02b05
  });
  return User;
};
