'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addIndex(
      'LobbyChallenges',
      ['lobbyId', 'challengeId'],
      {
        indexName: 'lobbyChallengeIdx',
        indicesType: 'UNIQUE'
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('LobbyChallenges', 'lobbyChallengeIdx')
  }
};
