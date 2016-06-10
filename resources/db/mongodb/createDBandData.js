/*
  This will create a db named `deal` and add the following `data` to the db

  Start mongodb
  Navigate to this project folder in terminal and...
  Run `cd resources/db/mongodb`
  Run `node createDBandData.js`
  The three records will be added to `deal`
*/

var MongoClient = require('mongodb').MongoClient,
    mongoUrl    = 'mongodb://localhost:27017/',
    db          = 'deal',
    collection  = 'docs';

//-- records
var data =  [
              { "name" : "pete", "color" : "blue", "fun" : "yes" },
              { "name" : "paul", "color" : "red", "fun" : "no" },
              { "name" : "mary", "color" : "purple", "fun" : "yes" }
            ];

data.forEach(function(doc) {
    var insertData = JSON.parse('{"name": "'+doc.name+'", "color": "'+doc.color+'", "fun": "'+doc.fun+'"}');
    MongoClient.connect(mongoUrl+db, function(err, db) {
        if (err) { console.log(err); return; }
        db.collection(collection).insert(insertData, function(err, result) {
            if(err) console.log(err);
            db.close();
        });
    });
});