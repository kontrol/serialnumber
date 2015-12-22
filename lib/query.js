
var postNew = "INSERT INTO serial_numbers(serial_number, inuse) VALUES ($1,$2)";
var getSerial = 'SELECT * from serial_numbers WHERE inuse = true ORDER BY id ASC';
function queryErr(err){
    if (err) {
        return console.error('error running query', err);
    }
}

function poolErr(err) {
    if (err){
        return console.error('error fetching client from pool', err);
    }
}

function selectSerial(client, results, res,done){

    var query = client.query('SELECT * from serial_numbers WHERE inuse = true ORDER BY id ASC');

    query.on('row',function(row) {
        results.push(row);
    });

    query.on('end', function() {
        done();
        return res.json(results);
    });
}

module.exports = {
    selectSerial: selectSerial,
    postNew: postNew,
    getSerial: getSerial,
    poolErr: poolErr,
    queryErr: queryErr,
}; 
