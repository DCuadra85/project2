

module.exports = function(sequelize, DataTypes) {
var Ingredients = sequelize.define("Ingredients", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 50]
    }
  },
  
  body: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1, 255]
      }
});
Ingredients.associate = function(models) {
   
    Ingredients.belongsTo(models.Recipe, {
      foreignKey: {
        allowNull: false
      }
    });
  };
return Ingredients;
}

