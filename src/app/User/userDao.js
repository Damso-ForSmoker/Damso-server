//모든 유저 조회
async function selectUser(connection) {
  const selectUserListQuery = `
                  SELECT user_id, email, name 
                  FROM user;
                  `;
  const [userRows] = await connection.query(selectUserListQuery);
  return userRows;
}

// userId 회원 조회
async function selectUserId(connection, userid) {
  const selectUserIdQuery = `
                   SELECT user_id, email, nickname 
                   FROM user 
                   WHERE user_id = ?;
                   `;
  const [userRow] = await connection.query(selectUserIdQuery, userid);
  return userRow;
}

//5. 내 정보

//내 정보 조회 --ok
async function selectUserInfo(connection, userid) {
  const selectUserListQuery = `
        SELECT user_id, name, nickname, profile, status
        from user 
        where user_id=?;
    `;
  const [userInfoRows] = await connection.query(selectUserListQuery, userid);
  return userInfoRows;
}

//설정 - 문의

//설정 - 이용약관 조회

//설정 - 개인정보 처리방침 조회

//설정 - 회원 탈퇴
async function updateUserStatus(connection, userid) {
  const updateStatusQuery = `
        UPDATE user
        SET status = 'resign'
        WHERE user_id=?;
    `;
  const resignUserRow = await connection.query(updateStatusQuery, userid);
  return resignUserRow;
}

//내 제보 현황 조회

//내 정보 수정 - 이미지 --ok
async function updateUserImage(connection, newparams) {
  const updateUserQuery = `
        UPDATE user 
        SET profile = ? 
        WHERE user_id = ?;
    `;
  const updateUserRow = await connection.query(updateUserQuery, newparams);
  return updateUserRow;
}
//내 정보 수정 - 닉네임 --ok
async function updateUserNickname(connection, newparams) {
  const updateUserQuery = `
        UPDATE user 
        SET nickname = ? 
        WHERE user_id = ?;
    `;
  const updateUserRow = await connection.query(updateUserQuery, newparams);
  return updateUserRow;
}

//3. 즐겨찾기

//즐겨찾기 조회 --ok

async function selectBookmark(connection, userid) {
  const selectBookmarkquery = `
    select user_id, id, f.facility_id, title, location, img, rating 
    from bookmark 
    inner join facility f on bookmark.facility_id = f.facility_id;
    `;
  const [checkBookmark] = await connection.query(selectBookmarkquery, userid);
  return checkBookmark;
}


//시설 클릭
// async function selectFacility(connection, la, lo){
//     const selectFacilityquery = `

//     `;
//     const selectFacility = await connection.query(updateUserQuery, la, lo);
//     return selectFacility[0];
// }

// 1-2. 흡연구역 간단 조회
async function selectFacilityInfo(connection, facilityid) {
  const selectFacilityIdQuery = `
                   SELECT facility_id, title, img, report, rating
                   FROM facility 
                   WHERE facility_id = ?;
                   `;
  const [checkFacilitySimpleInfo] = await connection.query(
    selectFacilityIdQuery,
    facilityid
  );
  return checkFacilitySimpleInfo;
}

// 1-3. 흡연구역 상세 조회
async function selectFacilityDetailInfo(connection, facilityid) {
  //흡연구역 상세정보 select
  const selectFacilityDetailQuery = `
                  SELECT  title, img, report, rating, location, type, installAgency
                  FROM facility
                  WHERE facility_id = ?;
                   `;
  const [selectFacilityDetail] = await connection.query(
    selectFacilityDetailQuery,
    facilityid
  );

  //해당 흡연구역 모든 리뷰 select
  const selectReviewQuery = `
                  SELECT  u.nickname, u.profile, r.content, r.rating
                  from facility f 
                  join review r 
                  on f.facility_id = r.facility_facility_id
                  join user u 
                  on r.user_user_id = u.user_id
                  where facility_id =?;
                   `;
  const [selectReview] = await connection.query(selectReviewQuery, facilityid);

  //리턴값
  const reviews = [];
  for (let i = 0; i < selectReview.length; i++) {
    let j = {
      nickname: selectReview[i].nickname,
      profileImg: selectReview[i].profile,
      content: selectReview[i].content,
      rating: selectReview[i].rating,
    };
    reviews.push(j);
  }

  const checkFacilityDetailInfo = {
    title: selectFacilityDetail[0].title,
    img: selectFacilityDetail[0].img,
    report: selectFacilityDetail[0].report,
    location: selectFacilityDetail[0].location,
    type: selectFacilityDetail[0].type,
    installAgency: selectFacilityDetail[0].installAgency,
    reviews: reviews,
  };

  return checkFacilityDetailInfo;
}


// 위치로 시설 조회
async function selectFacilLocation(connection, location) {
  const selectFacilLocationQuery = `
    SELECT location, title
    FROM facility
    WHERE location = ?;
    `;
  const [locationRows] = await connection.query(selectFacilLocationQuery, location);
  return locationRows;  
}

async function insertFacilInfo(connection, insertFacilInfoParams) {
  // 좌표 삽입 값 삽입 필요 (현재는 테이블에 위치만 삽입)
  const insertFacilInfoQuery = `
      INSERT INTO facility(location, title, type, installAgency, img, report, createdAt, updatedAt, status)
      VALUES (?, ?, ?, ?, ?, 1, NOW(), NOW(), 1);
    `;
  const insertFacilInfoRow = await connection.query(
      insertFacilInfoQuery,
      insertFacilInfoParams
    );
    
    return insertFacilInfoRow;
}


module.exports = {
  selectBookmark,
  updateUserNickname,
  updateUserImage,
  selectUserInfo,
  updateUserStatus,
  selectFacilityInfo,
  selectFacilityDetailInfo,
  insertFacilInfo,
  selectFacilLocation,
  selectFacilLocation,
  insertFacilInfo,
};
