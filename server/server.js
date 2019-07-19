var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");

var app = express();

// middleware
app.use(bodyParser.json());

//CORS Middleware
app.use(function(req, res, next) {
    // Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

// Set up server
var server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log("App now running on port ", port);
})

// Init conn string
var dbConfig = {
    user: 'svcEpson',
    password: 'svcEpson@3',
    server: 'fesurface1tb',
    database: 'Epson'
};

var baseApiUrl = "/api/user";

var executeQuery = function(res, query) {
    console.log('executing ', query);
    sql.connect(dbConfig, (err) => {
        if (err){
            console.log("Error while connecting to database: " + err);
            res.send(err);
            sql.close();
        } else {
            var request = new sql.Request();

            request.query(query, (err, recordsets) => {
                if (err) {
                    console.log("Error while querying database: " + err);
                    res.send(err);
                } else {
                    res.end(JSON.stringify(recordsets));
                }
                sql.close();
            });
        }
    });
};

// GET
app.get(baseApiUrl, (req, res) => {
    const query = "select * from [user]";
    executeQuery(res, query);

    /* returns
    {"recordsets":[[{"Id":1,"Name":"Freddie","Email":"f@yahoo.com","Password":"hello@3"},{"Id":2,"Name":"Steve Urkel","Email":"steveurkel@hotmail.com","Password":"svc@1"}]],"recordset":[{"Id":1,"Name":"Freddie","Email":"f@yahoo.com","Password":"hello@3"},{"Id":2,"Name":"Steve Urkel","Email":"steveurkel@hotmail.com","Password":"svc@1"}],"output":{},"rowsAffected":[2]}
    */
});

// POST
app.post(baseApiUrl, (req, res) => {
    const { Name, Email, Password } = req.body;

    const query = `INSERT INTO dbo.[user] (Name,Email,Password) VALUES ('${Name}','${Email}','${Password}')`;
    executeQuery(res, query);

    /* returns
    {"recordsets":[],"output":{},"rowsAffected":[1]}
    */
});

// PUT
app.put("/api/user/:id", (req, res) => {
    const { Name, Email } = req.body;
    const { id } = req.params;

    const query = `UPDATE dbo.[user] SET Name = '${Name}' , Email = '${Email}'  WHERE Id = ${id}`;
    executeQuery(res, query);

    // returns
    // {"recordsets":[],"output":{},"rowsAffected":[1]}

});

// DELETE
app.delete("/api/user/:id", (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM dbo.[user] WHERE Id = ${id}`;
    executeQuery(res, query);

    // returns
    // {"recordsets":[],"output":{},"rowsAffected":[1]}
});

