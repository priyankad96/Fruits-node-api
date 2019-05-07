const DeliveryDetails = require('../schema/deliveryDetailsSchema');
const {db} = require('../config/database');
const Sequelize = require('sequelize');

exports.post = (body,done) => {
    DeliveryDetails.create(body).then((deliveryData)=>{
        if(deliveryData){
            done(null,deliveryData);
        }
    }).catch((err)=>{
        done(err);
    });
}

exports.getDeliveryDataByUser =(uid,done) => {
    db.query("select * from deliveryDetails where userId = " + uid,{type:Sequelize.QueryTypes.SELECT})
        .then((getData) => {
            if(getData) {
                done(null,getData);
            }
        }).catch((err) => {
            done(err)
    })
}