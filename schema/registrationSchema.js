const Sequelize = require('sequelize');
const { db } = require('../config/database');

const Registration = db.define('registration', {
    regId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    countryId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    stateId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    salary: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

Registration.sync({ force: false }).then((res) => {
    console.log("Registration Table created");
}).catch((err) => {
    console.log("Error while creating Registration table");
})
//ALTER TABLE registrations ADD FOREIGN KEY (countryId) REFERENCES country(countryId)
module.exports = Registration;