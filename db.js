const sql = require("mssql");

// Create connection to database
const config = {
    user: "NOCCommenter",
    password: "SilverTrain90",
    server: "rexx1.database.windows.net",
    database: "REXX1",
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instancename: "MSSQLSERVER"
    },
    port: 1433
};

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

async function getSites(){
    let pool = await sql.connect(config);

    const result = await pool.request().execute(`SiteList`);

    return result.recordset;
}

//FindComments - device
async function getComments(json){
    let pool = await sql.connect(config);

    const result = await pool.request()
        .input('device', json.site)
        .execute(`FindComments`);
    return result.recordset;
}

//DeleteComment - device, site, time, user
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