const db = require("../models/index");
const bcrypt = require("bcryptjs");
const AppActions = db.AppActions;
const apps = db.apps;

async function initial() {

  appsActionsToCreate = [
    {
      nameAction: "/api/auth/register,register",
      description: "Allow register user",
      appid: 1
    },
    {
      nameAction: "/api/auth/apps,register",
      description: "Allow register app",
      appid: 1
    }
  ]

  AppActions.sync().then(function(){
    for (i in appsActionsToCreate){
      let app = appsActionsToCreate[i]
    
      AppActions.count({ where: {nameAction: app.nameAction} }).then(async function(count){
        if (count != 0) {
          console.log(`AppAction ${app.nameAction} already exists`)
        } else {
          AppActions.create({
            nameAction: app.nameAction,
            description: app.description,
            appid: app.appid
          });
        }
      })
    }
})
}
module.exports = initial;