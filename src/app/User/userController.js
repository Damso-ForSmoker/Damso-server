const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const fs = require("fs");

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /main
 */
// exports.getTest = async function (req, res) {
//   return res.send(response(baseResponse.SUCCESS));
// };

/**
 * API No. 3-1
 * API Name : 즐겨찾기 조회 API
 * [GET] /main/heart/{user_id}
 */
exports.getBookmark = async function (req, res) {
  const userid = req.params.userid;

  if (!userid) {
    return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH_IN_BOOKMARK));
  }
  const userBookmark = await userProvider.retrieveBookmark(userid);
  return res.send(response(baseResponse.SUCCESS, userBookmark));
};

/**
 * API No. 1-2
 * API Name : 내 정보 조회 API
 * [GET] /main/profile/{user_id}
 */
exports.getUserInfo = async function (req, res) {
  const userid = req.params.userid;
  if (!userid) {
    return res.send(errResponse(baseResponse.USER_ID_NOT_MATCH_IN_PROFILE));
  } else {
    const data = await userProvider.retrieveProfile(userid);
    console.log(data);
    if (data[0].profile == null) {
      const userInfo = await userProvider.retrieveUser(userid);
      return res.send(response(baseResponse.SUCCESS, userInfo));
    } else {
      const userInfo = await userProvider.retrieveUser(userid);
      console.log(userInfo[0].profile);

      var fileName = `./upload/${userInfo[0].profile}`;
      //const data = fs.readFileSync(fileName);
      // let img = new Uint8Array(data);
      // let blob = new Blob([img],{type:'image/jpeg'})
      // const Url= URL.createObjectURL(blob);
      // console.log(Url);

      // fs.readFile(`'./upload/'${userInfo[0].profile}`,function (err, data){
      //   console.log(data);
      //   }
      // )
      const result = [userInfo, fileName];
      return res.send(response(baseResponse.SUCCESS, result));
    }
  }
};

/**
 * API No. 1-3
 * API Name : 내 이미지 수정 API
 * [POST] /main/profile/{user_id}/image
 */
exports.postUserImage = async function (req, res) {
  const userid = req.params.userid;
  //const profile = req.body.profile;

  if (!req.files.uploadFile) {
    return res.send({
      status: false,
      message: "파일 업로드 실패",
    });
  } else {
    let profile = req.files.uploadFile;

    console.log(profile);
    profile.mv("./upload/" + profile.name);
    const UserImageResponse = await userService.postUserImage(
      profile.name,
      userid
    );
    return res.send(UserImageResponse);
  }
};

/**
 * API No. 5-3
 * API Name : 내 닉네임 수정 API
 * [POST] /main/profile/{user_id}/nickname
 */
exports.postUserNickname = async function (req, res) {
  const nickname = req.body.nickname;
  const userid = req.params.userid;
  const name = req.body.name;

  const UserNicknameResponse = await userService.postUserNickname(
    nickname,
    userid,
    name
  );

  return res.send(UserNicknameResponse);
};
/**
 * API No. 5-4
 * API Name : 탈퇴 API
 * [POST] /main/profile/:userid/setting/resign
 */
exports.postUserResign = async function (req, res) {
  const userid = req.params.userid;

  const UserResignResponse = await userService.postResign(userid);
  return res.send(UserResignResponse);
};

/**
 * API No. 5-5
 * API Name : 내 제보 현황 조회 API
 * [GET] /main/facility/register/:userid
 */
exports.getFacilityRegister = async function (req, res) {
  const userid = req.params.userid;

  const UserRegisterResponse = await userProvider.getRegistered(userid);
  return res.send(response(baseResponse.SUCCESS, UserRegisterResponse));

  
};
