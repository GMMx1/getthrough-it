'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addConstraint('LobbyChallenges', ['lobbyId', 'challengeId'], {
      type: 'unique',
      name: 'unq_lobby_challenge'
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('LobbyChallenges', 'unq_lobby_challenge');
  }
};
