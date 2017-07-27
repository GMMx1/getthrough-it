'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    var challenges = [
      { id: 1,
        name: 'isPrime',
        question: 'Create function that will return a boolean indicating if input is',
        initial_editor: 'function isPrime(n) {\n}',
        skillLevel: 0,
        input_type: "[\"Number\"]",
        output_type: 'Boolean'
      },
      { id: 2,
        name: 'getSquare',
        question: 'Write function that returns the square of the input',
        initial_editor: 'function getSquare(n) {\n}',
        skillLevel: 0,
        input_type: "[\"Number\"]",
        output_type: 'Number'
      },
    ]

    return queryInterface.bulkInsert("Challenges", challenges)
      .then(function (models) {
        console.log('Promise result in migration Challenge', models);
      })
      .catch((e) => {
        console.log('error migrating: ', e)
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('LobbyChallenges', {challengeId: [1,2]})
    .then(function (models) {
      console.log('Delete LobbyChallenges Promise result in migration', models);
      return queryInterface.bulkDelete('ChallengeTest', {challengeId: [1,2]})
    })
    .then(function (models) {
      console.log('Delete ChallengeTest Promise result in migration', models);
      return queryInterface.bulkDelete('Challenges', {id: [1,2]})
    })
    .then(function (models) {
      console.log('Delete Challenge Promise result in migration', models);
    })
    .catch((e) => {
      console.log('error migrating: ', e)
    });
  }
};
