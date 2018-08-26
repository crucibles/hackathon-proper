/**
 * This is where all the request is being handled. 
 * All requests enter an api/"some string" depending on where or what api needs to be accessed.
 */
const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;


/**
 * Note: queries are string, body can be object because of bodyParsers;

/**
 * Note: queries are string, body can be object because of bodyParsers;  
 * @deprecated: Unhandled Promise rejection
 */


/**
 * @default 127.0.0.1:27017 the local address of the server
 * @description the main connection to the server of the client
 */
const connection = (closure) => {

    return MongoClient.connect('mongodb://127.0.0.1:27017/bananoy', (err, db) => {
        if (err) return console.log(err);
        closure(db);
    });

};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};




/**
 * @description portal for requests regarding users. api/login
 */
router.post('/login', (req, res) => {
    connection((db) => {
        const myDB = db.db('bananoy');
        myDB.collection('users')
            .findOne({
                user_email: req.body.user_email,
                user_password: req.body.user_password
            })
            .then((user) => {
                if (user) {

                    user.user_password = '';
                    response.data = user;
                    res.json(user);

                } else {

                    res.json(false);
                }
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});



/**
 * @description portal for requests regarding signup. api/signup
 */
router.post('/signup', (req, res) => {
    connection((db) => {
        const myDB = db.db('bananoy');
        var newUserObj = {
            user_fname: req.body.firstName,
            user_mname: req.body.middleName,
            user_lname: req.body.lastName,
            user_birthdate: req.body.birthdate,
            user_email: req.body.email,
            user_password: req.body.password,
            user_contact_no: req.body.contactNumber,
        };

        myDB.collection('users')
            // Counts the number of returned results from query
            .count({
                user_email: newUserObj.user_email
            })
            .then((count) => {
                // If count returns true (>=1), then user email already exists
                if (count) {
                    response.data = newUserObj.user_email;
                    // Returns false to signal that user already exists
                    res.json(false);
                } else {
                    // If count returns false (=0), inserts new user to database
                    myDB.collection('users')
                        .insertOne(newUserObj, function (err, result) {
                            if (err) {
                                response.message = err;
                                throw err;
                            }
                            response.data = newUserObj;
                            res.json(result);
                        });
                }
            })
            .catch((err) => {
                sendError(err, res);
            })
    });
});

/**
 * @description portal for requests regarding users. api/users
 */
router.get('/users', (req, res) => {

    connection((db) => {
        const myDB = db.db('bananoy');
        myDB.collection('users')
            .find(
                ObjectID(req.query.id)
            )
            .toArray()
            .then((users) => {
                if (users) {
                    response.data = users;
                    res.json(users);
                } else {
                    res.json(false);
                }
            })
            .catch((err) => {
                sendError(err, res);
            });
    });

});

module.exports = router;