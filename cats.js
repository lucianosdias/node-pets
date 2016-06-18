
//#4
var _ = require('lodash');

var Cat = require('./cat.model');

//#3
module.exports = function (app) {

    _cats = [];

    // //Create
    // app.post('/cat', function (req, res) {
    //     _cats.push(req.body);
    //     res.json({ info: 'cat created!' });
    // });

    // //Retrive
    // app.get('/cat', function (req, res) {
    //     res.send(_cats);
    // });

    // //#4
    // app.get('/cat/:id', function (req, res) {
    //     res.send(_.find(_cats, { name: req.params.id }));
    // });

    // //Update
    // app.put('/cat/:id', function (req, res) {
    //     var index = _.findIndex(
    //         _cats,
    //         { name: req.params.id }
    //     );

    //     _.merge(_cats[index], req.body);
    //     res.json({ info: 'cat updated!' });
    // });

    // //Delete
    // app.delete('/cat/:id', function (req, res) {
    //     _.remove(_cats, function (cat) {
    //         return cat.name == req.params.id;
    //     });
    //     res.json({ info: 'cat removed!' });
    // });


    //Create
    app.post('/cat', function (req, res) {
        var newCat = new Cat(req.body);
        newCat.save(function (err) {
            if (err) {
                res.json({ info: 'error during cat create', error: err });
            }
            res.json({ info: 'cat created' });
        });
    });

    //Retrieve
    app.get('/cat', function (req, res) {
        Cat.find(function (err, cats) {
            if (err) {
                res.json({ info: 'error during cat retrieve', error: err });
            }

            if (cats.length > 0) {
                res.json({ info: 'cats found', data: cats });
            }
            else {
                res.json({ info: 'is empty' });
            }
        });
    });

    //#4
    app.get('/cat/:id', function (req, res) {
        Cat.findById(req.params.id, function (err, cat) {
            if (err) {
                res.json({ info: 'error during find cat', error: err });
            }
            if (cat) {
                // res.json({ info: 'cats found', data: cat });
                setTimeout(function () {
                    res.json({ info: 'cats found', data: cat });
                }, 10000);
            }
            else {
                res.json({ info: 'cat not found' });
            }
        });
    });

    //Update
    app.put('/cat/:id', function (req, res) {
        Cat.findById(req.params.id, function (err, cat) {
            if (err) {
                res.json({ info: 'error during find cat', error: err });
            }
            if (cat) {
                _.merge(cat, req.body);
                cat.save(function (err) {
                    if (err) {
                        res.json({ info: 'error during cat update', error: err });
                    }
                    res.json({ info: 'cat updated' });
                });
            }
            else {
                res.json({ info: 'cat not found' });
            }
        });
    });

    //Delete
    app.delete('/cat/:id', function (req, res) {
        Cat.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
                res.json({ info: 'error during remove cat', error: err });
            }
            res.json({ info: 'cat removed' });
        });
    });

}