async function selectFacilities(connection){
    const selectFacilitiesQuery = `
        select facility_id, la, lo 
        from facility;
    `;
    const [facilityOnMap] = await connection.query(selectFacilitiesQuery);
    return facilityOnMap;
}
module.exports={
    selectFacilities,
};