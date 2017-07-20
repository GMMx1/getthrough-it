'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addIndex('Lobbies', ['id'], {
      indexName: 'lobbyIdx',
      indicesType: 'UNIQUE'
    });
  },

  down: function down(queryInterface, Sequelize) {
    return queryInterface.removeIndex('Lobbies', 'lobbyIdx');
  }
};