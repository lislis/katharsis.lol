const _ = require('lodash');
const random = require('random');


function replacePatternWUsers(string, userPool) {
    let usersUsed = [];
    let output = '';

    const re = /(\#.+?\#)/g;
    const matches = [...string.matchAll(re)];
    output = string;

    matches.forEach((v, k) => {
        const re_clean = /\#(.+?)\#/;
        const catClean = v[0].match(re_clean)[1];

        if (catClean === 'User') {
            if (userPool.length >= 1) {
                let u = _.sample(userPool);
                _.remove(userPool, (n) => {
                   return  n._id === u._id;
                });
                output = output.replace(v[0], u.nickname);
            } else {
                output = output.replace(v[0], "ein Geist");
            }
        } else {
            //console.log('Something other than #User# needs replacement, check botbrain');
        }
    });

    return output;
}

exports.replacePatternWUsers = replacePatternWUsers;
