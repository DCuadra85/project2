module.exports = function(sequelize, DataTypes) {
    var profilePicture = sequelize.define("profilePicture", {
        filepath: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1]
            }
        }
    })

profilePicture.associate = function(models) {
    profilePicture.belongsTo(models.User, {
        foreignKey: {
            allowNull: false
          }
    })
}
return profilePicture;
}