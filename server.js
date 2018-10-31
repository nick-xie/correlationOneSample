// Required Modules
var express = require("express");
var morgan = require("morgan");
var helmet = require("helmet");
var app = express();

var bodyParser = require("body-parser");

const Models = require('./app/models/Models');

var port = process.env.PORT || 3002;

app.use(morgan("dev"));
app.use(helmet());
app.use(express.static(__dirname + '/app', {redirect: false}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


// ------------- ROUTES -------------

// Assessment ROUTES ------------------------------------------
app.get('/assessment/questions/:asmtId', function (req, res) {
    Models.Assessment.getQuestions(req.params.asmtId)
        .then(function (questions) {

            res.send(questions);
        })
        .catch(function (e) {
            res.statusCode = 400;
            res.end(e);
        });
});
// Route for begin assessment
app.post('/assessment/start', function (req, res) {
    // req body contains assessment id, first name, last name, and email
    Models.Assessment.start(req.body.asmtId, req.body.firstName, req.body.lastName, req.body.email)
        .then(function (uniqueAsmtId) {

            // returns the unique assessment id and assessment question id's
            res.send(uniqueAsmtId);
        })
        .catch(function (e) {
            res.statusCode = 400;
            res.end(e);
        });
});

// Question ROUTES -------------------------------------
app.post('/question/submit', function (req, res) {
    // req body contains question id and submitted answer
    Models.Question.submitAnswer(req.body.questionId, req.body.submittedAnswer)
        .then(function (result) {

            if (result.correct) {
                // leaving the response as this because not sure how the app handles it
                res.send("Correct answer");
            } else {
                res.send("Incorrect answer");
            }
        })
        .catch(function (e) {
            res.statusCode = 400;
            res.end(e);
        });
});

// ------------ END OF ROUTES -------


// Start Server
app.listen(port, function () {
    console.log( "Express server listening on port " + port);
});
