'use strict';

const helpers = require('./../js/helpers.js');
const uuidv4 = require('uuid/v4');

module.exports = function () {

    const startAsmtQuery = 'INSERT INTO assessments_written(asmt_id, first_name, last_name, email) ' +
        'VALUES ($1, $2, $3, $4) RETURNING *';

    const getAsmtQuestions = 'SELECT * from assessments_questions WHERE asmt_id = $1';

    const start = function (asmtId, fName, lName, email) {

        return helpers
            .dbQuery(startAsmtQuery, [asmtId, fName, lName, email])
            .then(function (data) {

                // Unique assessment instance
                return uuidv4();
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    const getQuestions = function (asmtId) {

        return helpers
            .dbQuery(getAsmtQuestions, [asmtId])
            .then(function (questions) {

                // this is only here to mimic database return
                var mockQuestions = [
                {"Id":594110,"CategoryId":0,"QuestionType":1,"Text":"<p>John is trying to join 2 very large tables"},
                {"Id":594111,"CategoryId":0,"QuestionType":1,"Text":"<p>Jessica is trying to join 3 very small tables"},
                {"Id":594112,"CategoryId":0,"QuestionType":1,"Text":"<p>Jim is trying to join 4 very large tables"},
                {"Id":594113,"CategoryId":0,"QuestionType":1,"Text":"<p>Joanna is trying to join 5 very small tables"}
                ]
                return mockQuestions;
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    return {
        start: start,
        getQuestions: getQuestions
    };
};
