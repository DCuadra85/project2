module.exports = function (sequelize, DataTypes) {
var Playlist = sequelize.define("Playlist", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
      validate: {
        len: [1, 30]
      } 
    }
})

Playlist.associate = function(models) {
    models.Playlist.hasMany(models.Songs)

    models.Playlist.hasMany(models.Comments)

    models.Playlist.belongsTo(models.User, {
        onDelete: "cascade"
    });
    models.Playlist.hasMany(models.PlaylistSongs, {
        onDelete: "cascade"
    })

}
return Playlist

}

// qeues 

// creaking the coding interview. 

// 