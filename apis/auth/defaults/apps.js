const db = require("../models/index");
const bcrypt = require("bcryptjs");
const apps = db.apps;

async function initial() {

  appsToCreate = [
    {
      nameApps: "Auth",
      description: "Auth actions, like register or changes permissions",
      url: "auth"
    }
  ]

  apps.sync().then(function(){
    for (i in appsToCreate){
      let app = appsToCreate[i]
    
      apps.count({ where: {nameApps: app.nameApps} }).then(async function(count){
        if (count != 0) {
          console.log(`App ${app.nameApps} already exists`)
        } else {
          apps.create({
            nameApps: app.nameApps,
            description: app.description,
            url: app.url
          });
        }
      })
    }
})
}
module.exports = initial;