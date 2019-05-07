const Cart = require('../schema/cartSchema');
const {db} = require('../config/database');
const Sequelize = require('sequelize');

exports.post = (body,done) => {
    Cart.create(body).then((newCart) => {
        if(newCart){
            done(null,newCart);
        }
    }).catch((err) => {
        done(err);
    });
}

exports.getByUser = (uid,done) => {
    db.query("select carts.*,fruits.image,fruits.fruitsname,fruits.price from carts,fruits where carts.isOrdered = false && carts.userId = "+ uid + " && carts.fruitId = fruits.id",{type:Sequelize.QueryTypes.SELECT})
        .then((getData) => {
        if (getData) {
            done(null, getData)
        }
    }).catch((err) => {
        done(err);
    })
}

exports.getCartByFruit = (fid,done) => {
    db.query("select fruits.id,carts.id,carts.quantity,fruits.fruitsname,fruits.image,fruits.price from fruits,carts where carts.isOrdered = false && fruits.id = carts.fruitId && fruits.id = " + fid ,{type:Sequelize.QueryTypes.SELECT})
        .then((getData) => {
            if(getData){
                done(null,getData);
            }
        }).catch((err) => {
            done(err);
    })
}

exports.updateOrderProduct = (fid,uid,done) => {
    db.query("update carts set isOrdered=true where userId = "+ uid +" && fruitId = " + fid,{type:Sequelize.QueryTypes.UPDATE}).then((updateCart)=>{
        done(null,updateCart)
    }).catch((err)=>{
        done(err)
    })
}

exports.deleteById = (fid,done) => {
    Cart.findOne({where: {fruitId:fid}}).then((getCart) => {
        if(getCart){
            Cart.destroy({where: {fruitId:fid}}).then((fruit)=>{
                done(null,fruit)
            }).catch((err) => {
                done(err)
            })
        }
        else{
            done({message: "Id not found"})
        }
    })
}