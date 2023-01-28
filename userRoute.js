module.exports = function (app) {
    const user = require("./userController");
  
    // 0. 테스트 api
    app.get("/main", user.getTest);
  
    //1. 즐겨찾기 조회 api
    app.get("/main/heart/:userid", user.getBookmark);
  
    //2. 내 정보 조회 api
    app.get("/main/profile/:userid", user.getUserInfo);
  
    //3. 내 프로필 수정 api
    // app.post("/main/profile/:userid/image", user.postUserImage);
  
    //3. 내 프로필 수정 api
    // app.post("/main/profile/:userid/nickname", user.postUserNickname);
  
    // 1-2. 흡연구역 간단 조회 api
    app.get("/main/facility/simple/:facilityid", user.getFacilitySimpleInfo);
  
    // 1-3. 흡연구역 상세 조회 api
    //app.get("/main/facility/detail/:facility_id", user.getFacilityDetailInfo);


    // 2-3. 시설 제보
    app.post("/main/facility/register", user.postFacilityRegister);
  };