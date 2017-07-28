'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    github_uid: DataTypes.STRING,
    email: DataTypes.STRING,
    photo_url: DataTypes.STRING,
    display_name: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        console.log(this)
        this.hasMany(models.UserLobbies)
      }
    }
  });
  return User;
};