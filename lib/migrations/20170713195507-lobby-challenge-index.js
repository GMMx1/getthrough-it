'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addIndex('LobbyChallenges', ['lobbyId', 'challengeId'], {
      indexName: 'lobbyChallengeIdx',
      indicesType: 'UNIQUE'
    });
  },

  down: function down(queryInterface, Sequelize) {
    return queryInterface.removeIndex('LobbyChallenges', 'lobbyChallengeIdx');
  }
};