const Sequelize = require('sequelize')
const sequelize = require('../../../config/database')

module.exports = sequelize.define('tenants', {
    tenant_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    fullname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    identity_number: {
        type: Sequelize.STRING,
        allowNull: false
    },
    identification_document: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        default:true,
    },
},{
    timestamps:false
})