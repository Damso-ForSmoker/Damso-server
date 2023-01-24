module.exports = function(app){
    const user = require('./userController');

    // 0. 테스트 api
    app.get('/main', user.getTest);

    //1-1. 즐겨찾기 조회 api
    app.get('/main/heart/:userid', user.getBookmark);

    //1-2. 내 정보 조회 api
    app.get('/main/profile/:userid', user.getUserInfo);

    //1-3. 내 프로필 수정 api
    app.post('/main/profile/:userid/image', user.postUserImage);

    //1-4. 내 프로필 수정 api
    app.post('/main/profile/:userid/nickname', user.postUserNickname);

};