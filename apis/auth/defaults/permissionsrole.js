const db = require("../models/index");
const bcrypt = require("bcryptjs");
const PermissionsUser = db.PermissionsUser;
const { Op } = require("sequelize");

async function initial() {

  permissionsRoleToCreate = [
    {
      userid: 1,
      actionid: 1
    },
    {
      userid: 1,
      actionid: 2
    },
    {
      userid: 1,
      actionid: 3
    },
    {
      userid: 1,
      actionid: 4
    }
  ]

  PermissionsUser.sync().then(function(){
    for (i in permissionsRoleToCreate){
      let app = permissionsRoleToCreate[i]

      console.log(`///////////// ${app.actionid}`)
    
      PermissionsUser.count({ where: {[Op.and]: [{userid: app.userid}, {actionid: app.actionid}] }}).then(async function(count){
        if (count != 0) {
          console.log(`App ${app.nameApps} already exists`)
        } else {
          PermissionsUser.create({
            userid: app.userid,
            actionid: app.actionid
          });
        }
      })
    }
})
}
module.exports = initial;