var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var serial = require('../lib/randGen');
var connectString = require(path.join(__dirname, '../', '', 'config'));
var helper = require('../lib/query');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
    res.sendFile(path.join(__dirname, '../views','index.html'));
});

router.post('/api/serial/new', function(req, res) {

    var results = [];
    pg.connect(connectString, function(err, client, done) {
   	    if(err) {
	        done();
	        console.log(err);
	        return res.status(500).json({ success: false, data: err});
	    }

	    client.query(helper.postNew , [serial.randomSerialGenerator(25), true], function(err, result) {
            helper.queryErr(err);
	    });

        //The callback doesn't always refresh the page when done.  So force the refresh with a Select
    helper.selectSerial(client,results,res,done);

    });	
});

router.get('/api/serial', function(req, res) {
	var results = []; 
	pg.connect(connectString, function(err, client,done) {
	  if(err) {
	    return console.error('error fetching client from pool', err);
	  }
	  client.query(helper.getSerial, function(err, result) {
	    done();
	    if(err) {
	      return console.error('error running query', err);
	    }
	    return res.json(result.rows);	
	  });
	   
	});
});

router.get('/api/serial/latest/:num', function(req, res) {
        var results = [];
	var howMany = req.params.num;
        pg.connect(connectString, function(err, client,done) {
          if(err) {
            return console.error('error fetching client from pool', err);
          }
          client.query('SELECT * from serial_numbers WHERE inuse = true ORDER BY create_date DESC limit '+ howMany, function(err, result) {
            done();
            if(err) {
              return console.error('error running query', err);
            }
            return res.json(result.rows);
          });

        });
});

router.put('/api/serial/latest/void/:num', function(req,res) {
    var results = [];
    var howMany = req.params.num;
    pg.connect(connectString, function(err, client, done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('UPDATE serial_numbers SET inuse = false WHERE id IN (SELECT id from serial_numbers WHERE inuse = true ORDER BY create_date DESC limit $1)', [howMany]); 
        helper.selectSerial(client,results,res,done);
    });
});

router.put('/api/serial/void/:serial_id', function (req, res) {
    var results =[];
    var id = req.params.serial_id;

    pg.connect(connectString, function(err, client, done) {
        if (err){
            done();
            console.log(err);
            return res.status(500).json({success: false, data:err});
        }
        client.query('UPDATE serial_numbers SET inuse = false where id IN ($1)', [id]);
        helper.selectSerial(client,results,res, done);
    });

});

router.delete('/api/serial/:serial_id', function(req, res) {
	var results = [];

	var id = req.params.serial_id;

	pg.connect(connectString, function(err, client, done) {
	  if(err) {
    	    done();
	    console.log(err);
	    return res.status(500).json({success: false, data: err});
	  }
	  client.query('DELETE FROM serial_numbers WHERE id IN ($1)', [id]);
      helper.selectSerial(client,results,res,done);
	});
});

router.delete('/api/serial/latest/:num', function(req, res) {
    var results = [];
    var howMany = req.params.num;
    pg.connect(connectString, function(err, client,done) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }

        client.query('DELETE FROM serial_numbers WHERE id IN (SELECT id from serial_numbers WHERE inuse = true ORDER BY create_date DESC limit $1)', [howMany]);

        helper.selectSerial(client,results,res,done);
    });
});
module.exports = router;
