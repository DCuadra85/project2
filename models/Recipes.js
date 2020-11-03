

module.exports = function(sequelize, DataTypes) {
    var Recipe = sequelize.define("Recipe", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 20]
        }
      }

    })

    Recipe.associate = function(models) {
      
      Recipe.hasMany(models.Ingredients);
      
      };
      return Recipe;
}


