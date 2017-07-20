'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn('ChallengeTest', 'hidden', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
  },

  down: function down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('ChallengeTest', 'hidden');
  }
};