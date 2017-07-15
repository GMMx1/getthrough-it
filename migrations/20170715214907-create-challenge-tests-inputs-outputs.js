'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('ChallengeTest', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.Integer
      },
      name: {
        type: Sequelize.STRING
      }
      challengeId: {
        type: Sequelize.Integer,
        references: {
          model: 'Challenges',
          key: 'id'
        }
      },
      input: {
        type: Sequelize.STRING,
        allowNull: false
      },
      input_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      output: {
        type: Sequelize.STRING,
        allowNull: false
      },
      output_type: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('ChallengeTest')
  }
};
