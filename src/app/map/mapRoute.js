module.exports= function(app){
  const map = require("./mapController");

  //메인 화면
  app.get("/main", map.getMap);

}