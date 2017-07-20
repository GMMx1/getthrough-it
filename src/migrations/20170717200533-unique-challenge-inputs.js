'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addConstraint('ChallengeTest', ['input', 'challengeId'], {
      type: 'unique',
      name: 'unq_input_challengeId'
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('ChallengeTest', 'unq_input_challengeId');  
  }
};
