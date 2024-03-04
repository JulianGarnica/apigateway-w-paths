module.exports = async () => {
  await require('./user.js')()
  await require('./apps.js')().then(async ()=>{
    console.log("Terminó de crear apps")
    await require('./appactions.js')()
  })
  
}