'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addIndex(
      'Lobbies',
      ['id'],
      {
        indexName: 'lobbyIdx',
        indicesType: 'UNIQUE'
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeIndex('Lobbies', 'lobbyIdx')
  }
};
