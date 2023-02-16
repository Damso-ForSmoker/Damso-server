const mapProvider = require("../../app/map/mapProvider");
//const mapService = require("../../app/map/mapService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

exports.getMap = async function (req, res){
    
    const facilityPin = await mapProvider.retrievePin();
    return res.send(response(baseResponse.SUCCESS, facilityPin));
};