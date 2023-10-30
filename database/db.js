const { Sequelize, DataTypes } = require('sequelize');

const dbURL = 'postgres://postgres:postgres@localhost:5432/starpets_test';

const db = new Sequelize(dbURL);

async function initDb() {
    try {
        await db.authenticate();
    } catch (err) {
        console.error('Troubles with connection: ', error);
    }
}

initDb();

const User = db.define('User', {
    id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
});

async function addUserSeed() {
    try {
        await User.truncate();
        const newUser = await User.build({ id: 1, balance: 10000 });
        await newUser.save();
    } catch (err) {
        console.error(err);
    }
}

db.sync();
addUserSeed();

module.exports = { db, User };
