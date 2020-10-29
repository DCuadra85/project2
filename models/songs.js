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
      Songs.hasMany(models.Users, {
        onDelete: "cascade"
      });
    };
  
    return Songs;
}




