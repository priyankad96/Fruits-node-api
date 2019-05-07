const Register = require('../schema/registrationSchema');
const {db} = require('../config/database');
const Sequelize = require('sequelize');

exports.getCountry = (done)=>{
    db.query("select * from country",{type:Sequelize.QueryTypes.SELECT})
    .then((getCountry) => {
        if(getCountry){
            done(null,getCountry);
        }

    }).catch((err)=>{
        done(err);
    });
}

exports.getStateByCountryId = (countryid,done) => {
    db.query("select * from state where countryId = " + countryid,{type:Sequelize.QueryTypes.SELECT})
        .then((getState) => {
            if(getState){
                done(null,getState);
            }
        }).catch((err)=>{
        done(err);
    });
}

exports.AddRegistrationData = (body,done) => {
    Register.create(body).then((newRegister) => {
        if (newRegister) {
            db.query("select * from registrations,country,state where isDeleted = false && registrations.countryId = country.countryId && registrations.stateId = state.stateId && registrations.regId = " + newRegister.regId, {type: Sequelize.QueryTypes.SELECT})
                .then((newData) => {
                    done(null, newData);
                })
                .catch((err) => {
                    done(err);
                })
        }
    })
}

exports.getRegisterData = (done) => {
    db.query("select * from registrations,country,state where isDeleted = false && registrations.countryId = country.countryId && registrations.stateId = state.stateId",{type:Sequelize.QueryTypes.SELECT})
        .then((getData) => {
            if(getData){
                done(null,getData);
            }

        }).catch((err)=>{
        done(err);
    });
}

exports.deleteById = (id,done) => {
    db.query("update registrations set isDeleted = true where regId = " + id, {type: Sequelize.QueryTypes.UPDATE})
        .then((getData) => {
            if (getData) {
                db.query("select * from registrations,country,state where isDeleted = false && registrations.countryId = country.countryId && registrations.stateId = state.stateId ", {type: Sequelize.QueryTypes.SELECT})
                    .then((data) => {
                        done(null, data)
                    }).catch((err) => {
                    done(err)
                })
            }
        })
}

exports.getDataById = (id,done) => {
    db.query("select * from registrations,country,state where isDeleted = false && registrations.countryId = country.countryId && registrations.stateId = state.stateId && registrations.regId = " + id, {type: Sequelize.QueryTypes.SELECT})
        .then((getData) => {
            if (getData) {
                done(null, getData);
            }
        }).catch((err) => {
        done(err);
    });
}

// exports.getDataByLimit = (id,done) => {
//     db.query("select * from registrations,country,state where isDeleted = false && registrations.countryId = country.countryId && registrations.stateId = state.stateId limit " + id, {type: Sequelize.QueryTypes.SELECT})
//         .then((getData) => {
//             if (getData) {
//                 done(null, getData);
//             }
//         }).catch((err) => {
//         done(err);
//     });
// }

exports.updateById = (id,body,done) => {
    Register.update(body, {where: {regId: id}}).then((updateData) => {
        if (updateData) {
            db.query("select * from registrations,country,state where isDeleted=false && registrations.countryId = country.countryId && registrations.stateId = state.stateId && registrations.regId = " + id, {type: Sequelize.QueryTypes.SELECT})
                .then((getData) => {
                    done(null, getData)
                }).catch((err) => {
                done(err)
            })
        }
    }).catch((err) => {
        done(err)
    })
}