module.exports = function(sequelize, DataTypes) {
    var Songs = sequelize.define("Songs", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
    }
  }
    });
  
    Songs.associate = function(models) {
      
      models.Songs.belongsTo(models.Playlist, {
        onDelete: "cascade"
      })

      models.Songs.belongsTo(models.PlaylistSongs)

    };
  
    return Songs;
}




