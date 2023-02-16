module.exports = function (app) {
  const facility = require("./facilityController");

  //1-2. 흡연구역 간단 조회 api
  app.get("/main/facility/simple/:facilityid", facility.getFacilitySimpleInfo);

  //1-3. 흡연구역 상세 조회 api
  app.get("/main/facility/detail/:facilityid", facility.getFacilityDetailInfo);
};
