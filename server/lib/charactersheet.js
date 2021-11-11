const axios = require('axios');
const neatCsv = require('neat-csv');


async function processCharacterSheet2Object(url) {
  const csv =  await axios.get(url);
  const parsedCsv = await neatCsv(csv.data);
  const characterSheet = await parseCharacterLogic(parsedCsv);
  return characterSheet;
}


async function parseCharacterLogic(csvData) {
  let obj = {};

  csvData.forEach(row => {
    if (row['Code'] !== '') {
      let code = row['Code']
          .split('.')
          .filter(x => x !== '');

      if (code.length <= 0) return;

      if (code.length === 1) {
        obj[code[0]] = {
          ident: code[0],
          id: code[0],
          text: row['Text'],
          altText: row['Alt-Text'],
          options: {}
        };
      }
      if (code.length === 2) {
        obj[code[0]].options[code[1]] = {
          ident: `${code[0]}${code[1]}`,
          id: code[1],
          text: row['Text'],
          altText: row['Alt-Text'],
          next: {}
        };
      }
      if (code.length === 3) {
        obj[code[0]].options[code[1]].next = {
          ident: `${code[0]}${code[1]}${code[2]}`,
          id: code[2],
          text: row['Text'],
          altText: row['Alt-Text'],
          options: {}
        };
      }
      if (code.length === 4) {
        obj[code[0]].options[code[1]].next.options[code[3]] = {
          ident: `${code[0]}${code[1]}${code[2]}${code[3]}`,
          id: code[3],
          text: row['Text'],
          altText: row['Alt-Text'],
          next: {}
        };
      }
      if (code.length === 5) {
        obj[code[0]]
          .options[code[1]]
          .next
          .options[code[3]]
          .next = {
            ident: `${code[0]}${code[1]}${code[2]}${code[3]}${code[4]}`,
            id: code[4],
            text: row['Text'],
            altText: row['Alt-Text'],
            options: {}
        };
      }
      if (code.length === 6) {
        obj[code[0]]
          .options[code[1]]
          .next
          .options[code[3]]
          .next
          .options[code[5]] = {
            ident: `${code[0]}${code[1]}${code[2]}${code[3]}${code[4]}${code[5]}`,
            id: code[5],
            text: row['Text'],
            altText: row['Alt-Text']
        };
      }
    }
  });

  return obj;
}

async function processCharacterProfile2Object(url) {
  const csv =  await axios.get(url);
  const parsedCsv = await neatCsv(csv.data);
  const characterProfile = await parseProfileLogic(parsedCsv);
  return characterProfile;
}

async function parseProfileLogic(csvData) {
  let obj = [];
  csvData.forEach((v, key) => {
    obj.push({ key, value: v['Text']});
  });
  return obj;
}


function parseCharacterPayload2Bio(payload, profileSetting) {
  //console.log(payload, profileSetting);

  // parse template json into obj
  let template = JSON.parse(profileSetting.value)

  //console.log(template)
  // parse idents from template obj
  let requiredIdents = template.map(x => {
    //console.log(x.value);

    const re = /(#.+?#)/g;
    const matches = [...x.value.matchAll(re)];
    console.log(matches);
    return matches.length ? matches[0][1] : null;
  });
  //console.log(requiredIdents);

  // find idents from template in payload
  //let foundIdents
  console.log(payload.characterProgress)

  // replace
  // concatinate
  return 'foobar'
}

module.exports = { processCharacterSheet2Object,
                   processCharacterProfile2Object,
                   parseCharacterPayload2Bio };
