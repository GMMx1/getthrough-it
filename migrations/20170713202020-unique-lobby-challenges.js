'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addConstraint('LobbyChallenges', ['lobbyId', 'challengeId'], {
      type: 'unique',
      name: 'unq_lobby_challenge'
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeConstraint('LobbyChallenges', 'unq_lobby_challenge');
  }
};
