'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    queryInterface.createTable(
      'lobby',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
      },
      {
        engine: '',
        charset: '',
        schema: ''
      }
    )

    queryInterface.createTable(
      'challenge',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        question: {
           type: Sequelize.TEXT,
           allowNull: false
        },
        tests: {
          type: Sequilize.TEXT,
          allowNull: false
        }
      },
      {
        engine: '',
        charset: '',
        schema: ''
      }
    )

    queryInterface.createTable(
      'lobby_challenge',
      {
        lobby_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'lobby',
            key: 'id'
          }
        },
        challenge_id: {
          type: Sequelize.INTEGER,
            references: {
              model: 'challenge',
              key: 'id'
            }
        },
        complete: {
          type: Sequelize.BOOLEAN,
          defaultValue: 0,
        },
        editor_state: {
          type: Sequelize.TEXT
        },
        duration: {
          type: Sequelize.DOUBLE
        },
        created_at: {
          type: Sequelize.DATE
        },
        updated_at: {
          type: Sequelize.Date
        }
      },
      {
        engine: '',
        charset: '',
        schema: ''
      }
    )



    return queryInterface.
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
