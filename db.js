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

// function queryDatabase(query) {
//     const connection = new Connection(config);
//     connection.connect();
//     connection.on("connect", err => {
//         if (err) {
//             console.error(err.message);
//         }});

//     const request = new Request(query,
//         (err, rowCount) => {
//             if (err) {
//                 console.error(err.message);
//             }
//         }
//     );

//     connection.execSql(request);
// }

async function newComment(json) {
    let pool = await sql.connect(config);

    const result = await pool.request()
        .input('device', `'${json.site}'`)
        .input('site', `'${json.node}'`)
        .input('time', new Date())
        .input('user', `'${json.name}'`)
        .input('comment', `'${json.comment}'`)
        .execute(`AddComment`);
    return result.recordset;
}

//site list returns all device/site pairs
module.exports = {newComment}