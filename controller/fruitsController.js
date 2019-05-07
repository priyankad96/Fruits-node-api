const Fruit = require('../schema/fruitsSchema');

exports.post = (body,done) => {
    Fruit.create(body).then((newFruit)=>{
        if(newFruit){
            done(null,newFruit);
        }
    }).catch((err)=>{
        done(err);
    });
}

exports.getAll = (done)=>{
    Fruit.findAll().then((getFruits) => {
        if(getFruits){
            done(null,getFruits);
        }

    }).catch((err)=>{
        done(err);
    });
}

exports.getById = (id,done) => {
    Fruit.findOne({where:{id:id}}).then((getFruit) => {
        if(getFruit){
            Fruit.findAll({where:{id:id}}).then((fruit) => {
               done(null,fruit)
            }).catch((err)=>{
                done(err)
            })
        }
        else{
            done({message:"Id not found to update"})
        }
    })
}

exports.deleteById = (id,done) => {
    Fruit.findOne({where: {id:id}}).then((getFruit) => {
            if(getFruit){
            Fruit.destroy({where: {id:id}}).then((fruit)=>{
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

exports.updateById = (id,body,done) => {
    Fruit.update(body,{where: {id:id}}).then((updateFruit)=>{
        done(null,updateFruit)
    }).catch((err)=>{
        done(err)
    })
}


