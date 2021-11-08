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
          id: code[0],
          text: row['Text'],
          altText: row['Alt-Text'],
          options: {}
        };
      }
      if (code.length === 2) {
        obj[code[0]].options[code[1]] = {
          id: code[1],
          text: row['Text'],
          altText: row['Alt-Text'],
          next: {}
        };
      }
      if (code.length === 3) {
        obj[code[0]].options[code[1]].next = {
          id: code[2],
          text: row['Text'],
          altText: row['Alt-Text'],
          options: {}
        };
      }
      if (code.length === 4) {
        obj[code[0]].options[code[1]].next.options[code[3]] = {
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
            id: code[5],
            text: row['Text'],
            altText: row['Alt-Text']
        };
      }
    }
  });

  return obj;
}

module.exports = { processCharacterSheet2Object };
