var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../','', 'config'));

var client = new pg.Client(connectionString);
client.connect();

var query = client.query('DROP TABLE serial_numbers; CREATE TABLE serial_numbers(id SERIAL PRIMARY KEY, serial_number VARCHAR(50) not null unique, inUse BOOLEAN, create_date TIMESTAMP WITH TIME ZONE DEFAULT NOW())');
query.on('end', function() { client.end(); });
