'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addConstraint('ChallengeTest', ['input', 'challengeId'], {
      type: 'unique',
      name: 'unq_input_challengeId'
    });
  },

  down: function down(queryInterface, Sequelize) {
    return queryInterface.removeConstraint('ChallengeTest', 'unq_input_challengeId');
  }
};