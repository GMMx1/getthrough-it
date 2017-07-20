'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('LobbyChallenges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lobbyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Lobbies',
          key: 'id'
        }
      },
      challengeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Challenges',
          key: 'id'
        }
      },
      complete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      editorState: {
        type: Sequelize.TEXT
      },
      duration: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('LobbyChallenges');
  }
};
