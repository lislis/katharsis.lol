const axios = require('axios');
const neatCsv = require('neat-csv');

async function runWordParser(url) {
    let csvData = await axios.get(url);
    let parsedData = await neatCsv(csvData.data);

    let dataOut = parsedData.map(row => {
        let data = {
            word_type: row['Wortkategorie'],
            text: row['Wort']
        };
        if (row['Flavor'] !== '') {
            data.flavor = row['Flavor'];
        }
        if (row['Numerus'] !== '') {
            data.numerus = row['Numerus'];
        }
        if (row['klassich/modern'] !== '') {
            data.other = row['klassich/modern'];
        }
        return data;
    });
    return dataOut;
}


async function runDirectionParser(url) {
    let csvData = await axios.get(url);
    let parsedData = await neatCsv(csvData.data);

    let dataOut = parsedData.map(row => {
        let meta = row['Satzkategorie'].split(" ");
        let data = {
            direction_type: meta[0],
            text: row['Anweisung']
        };

        if (meta[1]) {
            data.numerus = meta[1];
        }

        return data;
    });
    return dataOut;
}


module.exports = { runWordParser, runDirectionParser };
