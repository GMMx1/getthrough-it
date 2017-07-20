'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'ChallengeTest',
      'hidden',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    )

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('ChallengeTest', 'hidden')
  }
};
