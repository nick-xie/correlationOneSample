'use strict';

const helpers = require('./../js/helpers.js');

module.exports = function () {

    const getQuestionAnswer = 'SELECT * from question_answer WHERE question_id = $1';

    const submitAnswer = function (questionId, submittedAnswer) {

        return helpers
            .dbQuery(getQuestionAnswer, [questionId])
            .then(function (answer) {

                // this is only here to mimic database return
                var mockAnswer = "Split the two tables in half";
                if (submittedAnswer == mockAnswer) {
                    return {correct: true};
                } else {
                    return {correct: false};
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    return {
        submitAnswer: submitAnswer
    };
};
