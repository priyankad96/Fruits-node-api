const Sequelize = require('sequelize');
const {db}=require('../config/database');
const Fruit=require('../schema/fruitsSchema');
const User=require('../schema/userSchema');

const Cart = db.define('cart',{
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
    quantity:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    isOrdered:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    }
});

Cart.belongsTo(Fruit,{foreignKey:'fruitId'});
Cart.belongsTo(User,{foreignKey:'userId'});

Cart.sync({force:false}).then((res)=>{
    console.log("Cart Table created");
}).catch((err)=>{
    console.log("Error while creating Cart table");
})

module.exports=Cart;