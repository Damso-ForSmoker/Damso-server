const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");

exports.retrieveBookmark = async function (userid) {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await userDao.selectBookmark(connection, userid);

  connection.release();
  return result;
};
exports.retrieveUser = async function (userid) {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await userDao.selectUserInfo(connection, userid);

  connection.release();
  return result;
};


exports.retrieveFacility = async function (facilityid) {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await userDao.selectFacilityInfo(connection, facilityid);

  connection.release();
  return result;
};

exports.retrieveFacilityDetail = async function (facilityid) {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await userDao.selectFacilityDetailInfo(connection, facilityid);

  connection.release();
  return result;
};


exports.locationCheck = async function (location) {
  const connection = await pool.getConnection(async (conn) => conn);
  const locationCheckResult = await userDao.selectFacilLocation(connection, location);
  connection.release();

  return locationCheckResult;
}
