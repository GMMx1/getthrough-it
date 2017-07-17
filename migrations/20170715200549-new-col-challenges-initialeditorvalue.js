'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Challenges',
      'initial_editor',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Challenges', 'initial_editor')
  }
};
