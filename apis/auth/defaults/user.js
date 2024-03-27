const db = require("../models/index");
const bcrypt = require("bcryptjs");
const User = db.User;

async function initial() {
  

  User.sync().then(function(){
    User.count({ where: {id: 1} }).then(async function(count){
      if (count != 0) {
        console.log('Author already exists')
      } else {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        User.create({
          email: "agujadoctor@gmail.com",
          nit: "1230201",
          name: "admin",
          password: await bcrypt.hash("123", salt)
        });
      }
    })
})
}
module.exports = initial;