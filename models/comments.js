module.exports = function(sequelize, DataTypes) {
    var Comments = sequelize.define("Comments", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }  
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]  
        }
    });
    Comments.associate = function(models) {
        Comments.belongsTo(models.Songs, {
            foreignKey: {
                allowNull: false
              } 
        })
    }
return Comments;
}

