module.exports = function(sequelize, DataTypes) {
    var Comments = sequelize.define("Comments", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1, 30]
            }  
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1, 200]  
        }
    });
    Comments.associate = function(models) {
       models.Comments.belongsTo(models.Playlist, {
            onDelete: "cascade"
       })
    }
return Comments;
}

