'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('ChallengeTest', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      challengeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Challenges',
          key: 'id'
        }
      },
      input: {
        type: Sequelize.STRING,
        allowNull: false
      },
      output: {
        type: Sequelize.STRING,
        allowNull: false
      },
      hidden: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },

  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('ChallengeTest');
  }
};
