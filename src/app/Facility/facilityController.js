const facilityProvider = require("./facilityProvider.js");
// const facilityService = require("../Facility/facilityService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

/**
 * API No. 1-2
 * API Name : 흡연구역 간단 조회 API
 * [GET] /main/facility/simple/{facility_id}
 */
exports.getFacilitySimpleInfo = async function (req, res) {
  const facilityid = req.params.facilityid;

  const facilityInfo = await facilityProvider.retrieveFacility(facilityid);
  return res.send(response(baseResponse.SUCCESS, facilityInfo));
};

/**
 * API No. 1-3
 * API Name : 흡연구역 상세 조회 API
 * [GET] /main/facility/detail/{facility_id}
 */
exports.getFacilityDetailInfo = async function (req, res) {
  const facilityid = req.params.facilityid;

  const facilityInfo = await facilityProvider.retrieveFacilityDetail(
    facilityid
  );
  return res.send(response(baseResponse.SUCCESS, facilityInfo));
};
