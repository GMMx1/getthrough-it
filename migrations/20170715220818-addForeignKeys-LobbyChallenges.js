'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addConstraint('LobbyChallenges', ['lobbyId'], {
      type: 'FOREIGN KEY',
      name: 'fk_lobbyId',
      references: {
        table: 'Lobbies',
        field: 'id'
      }
    });

    return queryInterface.addConstraint('LobbyChallenges', ['challengeId'], {
      type: 'FOREIGN KEY',
      name: 'fk_challengeId',
      references: {
        table: 'Challenges',
        field: 'id'
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('LobbyChallenges', 'fk_lobbyId')
    return queryInterface.removeConstraint('LobbyChallenges', 'fk_challengeId')
  }
};
