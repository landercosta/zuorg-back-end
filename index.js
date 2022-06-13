// SQLITE
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('./zuorg.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err && err.code == "SQLITE_CANTOPEN") {
    createDatabase();
    return;
    } else if (err) {
      console.log("Getting error " + err);
      exit(1);
  }
  // runQueries(db);
});

function createDatabase() {
  var newdb = new sqlite3.Database('zuorg.db', (err) => {
    if (err) {
      console.log("Getting error " + err);
      exit(1);
    }
    createTables(newdb);
  });
}

function createTables(newdb) {
  newdb.exec(`
  CREATE TABLE "tasks" (
    "id"	INTEGER NOT NULL UNIQUE,
    "name"	TEXT NOT NULL,
    "minDate"	TEXT,
    "recurrenceTime"	TEXT,
    "recurrenceNumber"	INTEGER,
    PRIMARY KEY("id" AUTOINCREMENT)
  );

  CREATE TABLE "timeExchanger" (
    "seconds"	INTEGER NOT NULL,
    "pace"	INTEGER NOT NULL,
    "lastUpdate"	INTEGER NOT NULL
  );
  `, ()  => {
    // databaseFirstUse(newdb);
  });
}

function databaseFirstUse(newdb){
  // newdb.exec();
}

// EXPRESS
const express = require('express');
const app = express();
const port = 3000;

// SERVER
app.get('/', (req, res) => {
  // const tasks = await res.send(db.all(`select * from tasks`, function(err, rows){
  //   if(err) console.log(err);
  //   return rows;
  // }));
  res.render('tasks');
  
  // db.all(`select * from tasks`, function(err, rows){
  //   if(err) console.log(err);
  //   return rows;
  // });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});