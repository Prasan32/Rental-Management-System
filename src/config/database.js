const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    dialectOptions: {
        multipleStatements: true
      }
})

sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully !!!');
    })
    .catch((error) => {
        console.log(error);
    })

module.exports = sequelize