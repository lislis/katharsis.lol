var _ = require('lodash');

function fillPlaceholders(origObj, values) {
    let [word, users] = values;
    let obj = origObj;

    if (obj.text.split(/###VERB###/).length > 1) {
        let verb = _.sample(word);
        obj.text = obj.text
            .replace(/###VERB###/, verb.text);
    }
    if (obj.text.split(/###USER###/).length > 1) {
        let user = _.sample(users);
        obj.text = obj.text
            .replace(/###USER###/, user.nickname);
    }

    return [obj];
}


exports.fillPlaceholders = fillPlaceholders;
