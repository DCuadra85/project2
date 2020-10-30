module.exports = function (sequelize, DataTypes) {
    var PlaylistSongs = sequelize.define("PlaylistSongs", {
    });
  
    // associate UserEvents with Users and Events
    PlaylistSongs.associate = models => {
      // Each UserEvent belongs to one User
      models.PlaylistSongs.belongsTo(models.Playlist);
      // and One Event
      models.PlaylistSongs.belongsTo(models.Songs);
    }
  
    return PlaylistSongs;
  }