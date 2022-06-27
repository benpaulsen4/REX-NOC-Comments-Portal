const sql = require("mssql");

//Input file must be specified with MSSQL required info
const config = require('./dbconfig.json');

//Takes JSON input and runs DB function 
async function newComment(json) {
    let pool = await sql.connect(config);

    const result = await pool.request()
        .input('device', json.site)
        .input('site', json.node)
        .input('time', new Date())
        .input('user', json.name)
        .input('comment', json.comment)
        .execute(`AddComment`);
    return result.recordset;
}

//Gets sites from DB with no input
async function getSites(){
    let pool = await sql.connect(config);

    const result = await pool.request().execute(`SiteList`);

    return result.recordset;
}

//Gets comments of current site given input, for delete function
async function getComments(json){
    let pool = await sql.connect(config);

    const result = await pool.request()
        .input('device', json.site)
        .execute(`FindComments`);
    return result.recordset;
}

//Executes a DB function to delete a comment given input
async function deleteComment(json){
    let pool = await sql.connect(config);

    const result = await pool.request()
        .input('device', json.site)
        .input('site', json.node)
        .input('time', json.time)
        .input('user', json.name)
        .execute(`DeleteComment`);
}

module.exports = {newComment, getSites, getComments, deleteComment}