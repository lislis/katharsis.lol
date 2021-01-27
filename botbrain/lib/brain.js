const _ = require('lodash');
const random = require('random');

function fillPlaceholders(origObj, values) {
  let obj;
  let output = '';

  if (origObj.length) {
    obj = origObj[0];
  } else {
    obj = origObj;
  }

  try {
    const re = /(#.+?#)/g;
    if (obj.text) {
      const array = [...obj.text.matchAll(re)];
      output = obj.text;

      array.forEach(v => {
        const re_clean = /#(.+?)#/;
        const catClean = v[0].match(re_clean)[1];

        let sub = findSub(catClean, obj, values);
        output = replacePatternWSub(output, v[0], sub);
      });
    }
  } catch(err) {
    console.log(err);
  }

  output = output.replace(" ,", ",");
  output = output.replace("  ", " ");
  return [output];
}

function findSub(category, options, pools) {
  let word = pools[0];
  let sub = {};

  if (category == 'User') {
    // we'll leave #Users# to be replaced in _server_, it has more context
    sub.text = '#User#';
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
    .filter(x => x.word_type == cattyCat)
    .filter(x => {
      return (isValidProperty(x.flavor)) ? (x.flavor == flavorFlave) : true;
    })
    .filter(x => {
      if(isValidProperty(x.numerus)) {
        return x.numerus == options.numerus;
      } else {
        return true;
      }
  }));
  return w;
}

function isValidProperty(prop) {
  return prop
      && prop !== undefined
      && prop !== null
      && prop !== '';
}

exports.fillPlaceholders = fillPlaceholders;
