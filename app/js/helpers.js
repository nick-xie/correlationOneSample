'use strict';

// This would be the helper function that performs DB interactions
// Any place that calls this has mock return values in place
exports.dbQuery = function (query, queryParams) {

    // just random pointless promise so that it is still async
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
        resolve('foo');
        }, 300);
    });
};
