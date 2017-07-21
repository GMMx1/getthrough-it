'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    var tests = [
      {
        id: 2,
        challengeId: 1,
        input: 1,
        output: false,
        hidden: 0
      },
      {
        id: 3,
        challengeId: 1,
        input: 2,
        output: true,
        hidden: 0
      },
      {
        id: 4,
challengeId: 1,
     input: 3,
    output: true,
    hidden: 0
      },
      {
        id: 5,
challengeId: 1,
     input: 4,
    output: false,
    hidden: 0
      },
      {
        id: 6,
challengeId: 1,
     input: 0,
    output: false,
    hidden: 0
      },
      {
        id: 7,
challengeId: 1,
     input: 199,
    output: true,
    hidden: 0
      },
      {
        id: 8,
challengeId: 2,
     input: 1,
    output: 1,
    hidden: 0
      },
      {
        id: 9,
challengeId: 2,
     input: 2,
    output: 4,
    hidden: 0
      },
      {
        id: 10,
challengeId: 2,
     input: 3,
    output: 9,
    hidden: 0
      },
      {
        id: 11,
challengeId: 2,
     input: 6,
    output: 36,
    hidden: 0
      },
      {
        id: 12,
challengeId: 2,
     input: 20,
    output: 400,
    hidden: 0
      },
      {
        id: 13,
challengeId: 2,
     input: 2.2,
    output: 4.84,
    hidden: 1
      }
    ]

    return queryInterface.bulkInsert('ChallengeTest', tests)
      .then(function (models) {
        console.log('Promise result in migration', models);
      })
      .catch((e) => {
        console.log('error migrating: ', e)
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ChallengeTest', {challengeId: [1,2]})
    .then(function (models) {
      console.log('Promise result in migration', models);
    })
    .catch((e) => {
      console.log('error migrating: ', e)
    });
  }
};
