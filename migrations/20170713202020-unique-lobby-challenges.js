'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addConstraint('LobbyChallenges', ['lobbyId', 'challengeId'], {
      type: 'unique',
      name: 'unq_lobby_challenge'
    });
  },

  down: function down(queryInterface, Sequelize) {
    return queryInterface.removeConstraint('LobbyChallenges', 'unq_lobby_challenge');
  }
};