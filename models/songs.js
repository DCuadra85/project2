module.exports = function(sequelize, DataTypes) {
    var Songs = sequelize.define("Songs", {
      // Giving the Author model a name of type STRING
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    });
  
    Songs.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Songs.belongsTo(models.Users, {
        foreignKey: {
          allowNull: false
        }
      });

      Songs.hasMany(models.Comments, {
        onDelete: "cascade"
      })
    };
  
    return Songs;
}




