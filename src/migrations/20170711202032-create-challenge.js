'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Challenges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      question: {
        type: Sequelize.TEXT
      },
      initial_editor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      skillLevel: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0
      },
      input_type: {
        type: Sequelize.TEXT
      },
      output_type: {
        type: Sequelize.TEXT
      },
      createdAt: {
        // allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        // allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Challenges');
  }
};


// insert into Challenges (id, name, question, initial_editor, input_type, output_type) values (1, 'isPrime?', 'Create function that will return a boolean indicating if input is a prime number', 'function isPrime(n) = {\n}', 'Number', 'boolean')
