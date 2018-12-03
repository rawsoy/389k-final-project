var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var dataUtil = require('data-util');
var _ = require('underscore');
var mongoose = require('mongoose')
var Phone = require('./models/Phone')
var dotenv = require('dotenv')



var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

dotenv.load();

// Connect to Sandbox MongoDB
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true });
mongoose.connection.on('error', function (err) {
    console.log("Connection failed");
    process.exit(1);
});


/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5 
 * endpoints for the API, and 5 others. 
 */

// Homepage
app.get('/', function(req, res) {
    //get all data
    Phone.find({}, function(err, phones) {
        if (err) throw err;
        res.render('phones', {
            phones: phones
        })
    })
})

//Phones page
app.get('/api/getPhones', function(req, res) {
    //show all
    Phone.find({}, function (err, phones) {
        if (err) throw err;
        res.send(phones)
    })
})

//Post a phone
app.post('/api/addPhone', function(req, res) {
    var phone = new Phone({
        name: req.body.name,
        year: req.body.year,
        company: req.body.company,
        image: req.body.image,
        reviews: [],
        screenSize: req.body.screenSize
    })

    phone.save(function(err) {
        if (err) throw err;
        return res.send("Phone added!")
    })
})

//Input form to add a phone
app.get('/addPhone', function(req, res) {
    res.render('addPhone', {})
})

//Input form to add a review
app.get('/phones/:phone/addReview', function(req, res) {
    res.render('addReview', {name: req.params.phone})
})

// Add a review
app.post('/api/addReview', function(req, res) {
    Phone.findOne({name: req.body.name}, function(err, phone){
        if (err) throw err;
        if (!phone) return res.send("No phone by that name found");

        phone.reviews.push({
            rating: parseFloat(req.body.rating),
            comment: req.body.comment,
            author: req.body.author
        });

        phone.save(function(err){
            if (err) throw err;
            return res.send("Successfully added review!");
        });
    })
})

// All companies
app.get('/companies', function(req, res) {
    var companies = [];
    Phone.find({}, function(err, phones) {
        if (err) throw err;
        phones.forEach(function(phone) {
            if (!companies.includes(phone.company)) {
                companies.push(phone.company)
            }
        })
        res.render('companies', {
            companies: companies
        })
    })
})

// Phones from the current year
app.get('/phones/thisyear', function(req, res) {
    var d = new Date();
    Phone.find({year: d.getFullYear()}, function(err, phones) {
        if (err) throw err;
        res.render('grid', {
            thisyear: true,
            phones: phones
        })
    })
})

// Phone with rating avg rating >= 4
app.get('/phones/popular', function(req, res) {
    var toAdd = [];
    Phone.find({}, function(err, phones) {
        if (err) throw err
        phones.forEach(function(phone) {
            var sum = 0;
            var count = 0;
            if (phone.reviews) {
                phone.reviews.forEach(function(review) {
                    sum += review.rating;
                    count++;
                })
                if (sum/count >= 4.0) toAdd.push(phone)
            }
        })
        res.render('grid', {
            popular: true,
            phones: toAdd
        })
    })
})

// Random phone
app.get('/phones/pick', function(req, res) {
    Phone.count({}, function(err, count) {    
        Phone.find({}, function(err, phones) {
            res.render('grid', {
                pick: true,
                phones: [phones[Math.ceil(Math.random() * (count - 1))]]
            })
        })
    })
})

// Phablets
app.get('/phones/phablets', function(req, res) {
    Phone.find({screenSize: {$gte: 6}}, function(err, phones) {
        if (err) throw err
        res.render('grid', {
            phablets: true,
            phones: phones
        })
    })
})

// Phones for one company
app.get('/companies/:company', function(req, res) {
    var company = req.params.company
    Phone.find({company: company}, function(err, phones) {
        if (!phones) {
            res.send("No matches found")
        }
        else { 
            res.render('grid', {
                comp: true,
                manufacturer: company,
                phones: phones
            })
        }
    })
})

// Phone detail page
app.get('/phones/:phone', function(req, res) {
    var name = req.params.phone.split('_').join(' ');
    Phone.findOne({name: name}, function(err, phone) {
        if (err) throw err;
        if (!phone) res.send("No matches found")
        else {
            res.render('phone', {
                name: phone.name,
                year: phone.year,
                company: phone.company,
                image: phone.image,
                reviews: phone.reviews,
                rating: phone.reviews.rating,
                comment: phone.reviews.comment,
                author: phone.reviews.author
            })
        }
    })
})

app.listen(process.env.PORT || 3000, function () {
    console.log('Listening!');
});