const Sequelize = require('sequelize');
const {db} = require('../config/database');

const User=require('../schema/userSchema');

const DeliveryDetails = db.define('deliveryDetails',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
   address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    state:{
        type: Sequelize.STRING,
        allowNull: false
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pincode:{
        type:Sequelize.INTEGER(6),
        allowNull:false
    },
    contactNo:{
        type:Sequelize.STRING,
        allowNull:false
    },
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
});

DeliveryDetails.belongsTo(User,{foreignKey:'userId'});

DeliveryDetails.sync({force: false}).then((res) => {
    console.log('DeliveryDetails Table Created');
}).catch((err) => {
    console.log('Error While Creating DeliveryDetails Table');
})

module.exports = DeliveryDetails;