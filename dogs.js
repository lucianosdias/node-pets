
//#4
var _ = require('lodash');

var Dog = require('./dog.model');

//#3
module.exports = function (app) {
    

    //Create
    app.post('/dog', function (req, res) {
        var newDog = new Dog(req.body);
        newDog.save(function (err) {
            if (err) {
                res.json({ info: 'error during Dog create', error: err });
            }
            res.json({ info: 'Dog created' });
        });
    });

    //Retrieve
    app.get('/dog', function (req, res) {
        Dog.find(function (err, dogs) {
            if (err) {
                res.json({ info: 'error during Dog retrieve', error: err });
            }

            if (dogs.length > 0) {
                // res.json({ info: 'Dogs found', data: dogs });
                setTimeout(function () {
                    res.json({ info: 'Dogs found', data: dogs });
                }, 10000);
            }
            else {
                res.json({ info: 'is empty' });
            }
        });
    });

    //#4
    app.get('/dog/:id', function (req, res) {
        Dog.findById(req.params.id, function (err, dog) {
            if (err) {
                res.json({ info: 'error during find Dog', error: err });
            }
            if (dog) {
                res.json({ info: 'Dogs found', data: dog });
            }
            else {
                res.json({ info: 'Dog not found' });
            }
        });
    });

    //Update
    app.put('/dog/:id', function (req, res) {
        Dog.findById(req.params.id, function (err, dog) {
            if (err) {
                res.json({ info: 'error during find Dog', error: err });
            }
            if (dog) {
                _.merge(dog, req.body);
                Dog.save(function (err) {
                    if (err) {
                        res.json({ info: 'error during Dog update', error: err });
                    }
                    res.json({ info: 'Dog updated' });
                });
            }
            else {
                res.json({ info: 'Dog not found' });
            }
        });
    });

    //Delete
    app.delete('/dog/:id', function (req, res) {
        Dog.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                res.json({ info: 'error during remove Dog', error: err });
            }
            res.json({ info: 'Dog removed' });
        });
    });

}