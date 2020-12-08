const _ = require('lodash');
const random = require('random');

function fillPlaceholders(origObj, values, params) {
    let obj = origObj;

    const re = /(\#.+?\#)/g;
    const array = [...obj.text.matchAll(re)];
    let output = obj.text;

    array.forEach((v, k) => {
        const re_clean = /\#(.+?)\#/;
        const catClean = v[0].match(re_clean)[1];

        let sub = findSub(catClean, obj, values);
        output = replacePatternWSub(output, v[0], sub);
    });

    return [output];
}

function findSub(category, options, pools) {
    let [word, users] = pools;
    let sub = {};

    if (category == 'User') {
        sub = sampleUser(users);
    } else {
        const isOptional = category.match(/\?.+/);

        if (isOptional) {
            if (random.boolean()) {
                sub.text = "";
            } else {
                let catNoOptional = category.split('?optional')[0];
                sub = sampleBy(word, catNoOptional, options);
            }
        } else {
            sub = sampleBy(word, category, options);
        }
    }
    return sub;
}

function replacePatternWSub(str, pattern, sub) {
    let txt = "";
    if (sub != undefined) {
        if (sub.nickname) {
            txt = sub.nickname;
        } else {
            txt = sub.text;
        }
    }
    return str.replace(pattern, txt);
}

function sampleBy(pool, category, options) {
    let flavorFlave = options.direction_type;
    let cattyCat = category;

    const reOtherFlavor = /_/;
    let hasExplicitFlavor = category.match(reOtherFlavor);

    if (hasExplicitFlavor) {
        cattyCat= category.split("_")[0];
        flavorFlave = category.split("_")[1];
    }

    let w =  _.sample(pool
                      .filter(x => x.flavor == flavorFlave)
                      .filter(x => x.word_type == cattyCat)
                      .filter(x => {
                          if (cattyCat == "Verb") {
                              return x.numerus == options.numerus;
                          } else {
                              return x.numerus == options.numerus || !x.numerus;
                          }
                      }));
    return w;
}

function sampleUser(pool) {
    return _.sample(pool);
}

exports.fillPlaceholders = fillPlaceholders;
