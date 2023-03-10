const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const crypto = require("crypto");
const {connect} = require("http2");

exports.postUserImage = async function(profile, userid){
    try{

        const connection = await pool.getConnection(async (conn)=> conn);

        const newparams = [profile, userid];
        const editInfoResult = await userDao.updateUserImage(connection, newparams);
        console.log(`${userid}의 프로필 변경 완료`);
        connection.release();

        return response(baseResponse.SUCCESS);
    }
    catch(err){
        logger.error(`App - editInfo Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.postUserNickname = async function(nickname,userid,name){
    try{
        if(!nickname){
            nickname = name;
        }
        const connection = await pool.getConnection(async (conn)=> conn);

        const newparams = [nickname, userid, name];
        const editInfoResult = await userDao.updateUserNickname(connection, newparams);
        console.log(`${userid}의 닉네임 변경 완료`);
        connection.release();

        return response(baseResponse.SUCCESS);
    }
    catch(err){
        logger.error(`App - editInfo Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}
exports.postResign = async function(userid){
    try{
        const connection = await pool.getConnection(async (conn)=> conn);
        //이미 탈퇴처리 되었는지 확인
        const userStatus = await userDao.selectUserstatus(connection, userid);
        console.log(userStatus);
        if(userStatus[0].status =='resign'){
            return errResponse(baseResponse.ALREADY_USER_RESIGN);
        }

        
        const editStatus = await userDao.updateUserStatus(connection,userid);
        
        console.log(`${userid}의 탈퇴 처리 완료`);
        connection.release();

        return response(baseResponse.SUCCESS);
    
    }
    catch(err){
        logger.error(`App - editStatus Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}