const Order = require('../schema/orderSchema');
// const {db} = require('../config/database');
// const Sequelize = require('sequelize');

exports.post = (body,done) => {
    Order.create(body).then((newOrder) => {
        if(newOrder){
            done(null,newOrder);
        }
    }).catch((err) => {
        done(err);
    });
}
