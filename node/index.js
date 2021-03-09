const express = require("express");
const app = express();
const port = 3000;
const config = {
    host: "db",
    user: "root",
    password: "root",
    database: "nodedb",
};

const mysql = require("mysql");
const connection = mysql.createConnection(config);

const sql = `INSERT INTO people(name) values ('Gracyane')`;
connection.query(sql);

app.get("/", (req, res) => {
    const connection = mysql.createConnection(config);
    const sqlQuery = `SELECT name FROM people;`;
    connection.query(sqlQuery, function (err, results, fields) {
        if (!err) {
            res.send("<h1>Full Cycle Rocks!</h1>" + getName(results));
            console.log(results);
        } else {
            res.send(
                "<h1>Desculpe, não pudemos atender a sua solicitação!</h1>"
            );
        }
    });
});

app.listen(port, () => {
    console.log("Rodando na porta " + port);
});

function getName(results) {
    var nome = "";
    for (i = 0; i < results.length; i++) {
        nome += results[i].name + "<br>";
    }
    return nome;
}
