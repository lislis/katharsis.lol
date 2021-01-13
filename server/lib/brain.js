const _ = require('lodash');

function replacePatternWUsers(string, userPool) {
    const re = /(\#.+?\#)/g;
    const matches = [...string.matchAll(re)];
    let output = string;

    matches.forEach((v, k) => {
        const reClean = /\#(.+?)\#/;
        const catClean = v[0].match(reClean)[1];

        if (catClean === 'User') {
            if (userPool.length >= 1) {
                let u = _.sample(userPool);
                _.remove(userPool, (n) => {
                   return  n._id === u._id;
                });
                output = output.replace(v[0], u.nickname);
            } else {
                // tbd also abort with empty string?
                output = output.replace(v[0], "ein Geist");
            }
        } else {
            // meaning: there are other placeholders than #User# that we can't replace here
            // we basically abort with an empty string, that will be ignored later on
            output = "";
        }
    });

    return output;
}

exports.replacePatternWUsers = replacePatternWUsers;
