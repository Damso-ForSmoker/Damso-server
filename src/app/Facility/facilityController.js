const facilityProvider = require("./facilityProvider.js");
const facilityService = require("../Facility/facilityService");
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
  console.log(facilityInfo);

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

/**
 * API No. 2-3
 * API Name : 시설 제보
 * [POST] /main/facility/register
 */
exports.postFacilityRegister = async function (req, res) {
  /**
   * Body: location, title, type, installAgency, la, lo   //이미지 업로드 이슈 (우선 이미지는 전달받지 X)
   */
  const { location, title, type, installAgency, la, lo } = req.body;

  // 빈 값 체크
  if (!location)
    return res.send(response(baseResponse.REGISTER_LOCATION_EMPTY));

  const registerResponse = await facilityService.registerFacility(
    location,
    title,
    type,
    installAgency,
    la,
    lo
  );

  return res.send(registerResponse);
};

/**
 * API No. 2-4
 * API Name : 흡연구역 검색 API
 * [GET] /pin
 */
exports.getSearch = async function (req, res) {
  const { la, lo } = req.body;
  console.log(la, lo);
  if (!la) {
    return res.send(response(baseResponse.SEARCH_FACILITY_EMPTY));
  }

  const searchResponse = await facilityProvider.searchFacility(la, lo);
  return res.send(response(baseResponse.SUCCESS, searchResponse));
};

/**
 * API No. 1-4
 * API Name : 흡연구역 상세 조회에서 북마크 추가 API
 * [POST] /main/facility/detail/{facility_id}
 */
exports.postFacilityBookmark = async function (req, res) {
  const facilityid = req.params.facilityid;
  const userid = req.body.userid;

  const setFacilityBookmark = await facilityService.retrieveBookmark(
    facilityid,
    userid
  );
  return res.send(response(baseResponse.SUCCESS, setFacilityBookmark));
};
