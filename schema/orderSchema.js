const Sequelize = require('sequelize');
const {db}=require('../config/database');
const Fruit=require('../schema/fruitsSchema');
const User=require('../schema/userSchema');
const DeliveryDetails = require('../schema/deliveryDetailsSchema');

const Order = db.define('order',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    fruitId:{
        type:Sequelize.INTEGER,
        allowNull: false
    },
    deliveryId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    quantity:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    totalPrice:{
        type:Sequelize.DOUBLE,
        allowNull:false
    }
});

Order.belongsTo(Fruit,{foreignKey:'fruitId'});
Order.belongsTo(User,{foreignKey:'userId'});
Order.belongsTo(DeliveryDetails,{foreignKey:'deliveryId'});

Order.sync({force:false}).then((res)=>{
    console.log("Order Table created");
}).catch((err)=>{
    console.log("Error while creating Order table");
})

module.exports = Order;