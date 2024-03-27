const db = require("../models/index");
const bcrypt = require("bcryptjs");
const AppActions = db.AppActions;
const apps = db.apps;

async function initial() {

  appsActionsToCreate = [
    {
      path: "/api/auth/register",
      nameAction: "register",
      description: "Allow register user",
      appid: 1,
    },
    {
      path: "/api/auth/apps",
      nameAction: "register",
      description: "Allow register app",
      appid: 1,
    },
    {
      path: "/api/gtfacturas/invoice",
      nameAction: "createInvoice",
      description: "Allow create invoice",
      appid: 1,
    },
    {
      path: "/api/gtfacturas/assignInvoice",
      nameAction: "assignInvoice",
      description: "Can asign invoice invoice",
      appid: 1,
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
            path: app.path,
            nameAction: app.nameAction,
            description: app.description,
            appid: app.appid,
          });
        }
      })
    }
})
}
module.exports = initial;