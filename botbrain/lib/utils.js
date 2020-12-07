const _ = require('lodash');
const random = require('random');

function fillPlaceholders(origObj, values, params) {
    let [word, users] = values;
    let obj = origObj;

    let {flavor, numerus} = params;

    const re = /(\#.+?\#)/g;
    const array = [...obj.text.matchAll(re)];
    let output = obj.text;

    array.forEach((v, k) => {
        const re1 = /\#(.+?)\#/;
        const cat = v[0].match(re1)[1];

        if (cat == 'User') {
            output = replaceUser(output, v[0], users);
        } else {
            let subs = {};
            const isOptional = cat.match(/\?.+/);

            if (isOptional) {
                if (random.boolean()) {
                    //console.log("isoptional: true")
                    subs.text = "";
                } else {
                    //console.log("isoptional: false");
                    subs = _.sample(word
                                    .filter(x => x.word_type == cat.split('?optional')[0])
                                    .filter(x => x.numerus == obj.numerus
                                            || !x.numerus ));
                }
            } else {
                subs = _.sample(word
                                .filter(x => x.word_type == cat)
                                .filter(x => x.numerus == obj.numerus
                                        || !x.numerus ));
            }

            if (subs !== undefined) {
                output = output.replace(v[0], subs.text);
            }
        }
    });

    return [output];
}


function replaceUser(str, pattern, replacementPool) {
    let user = _.sample(replacementPool);
    return str.replace(pattern, user.nickname);
}

exports.fillPlaceholders = fillPlaceholders;
