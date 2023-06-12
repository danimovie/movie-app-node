const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Actor = sequelize.define('actor', {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },

    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },

    nationality: {
        type: DataTypes.STRING,
        allowNull: false
    },

    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
});

module.exports = Actor;