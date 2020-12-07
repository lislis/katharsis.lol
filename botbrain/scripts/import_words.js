var fs = require('fs');
var parse = require('csv-parse');
var axios = require('axios');

// Change files and servers here!
var inputFile = 'data/words.csv';
var server_endpoint = 'http://localhost:3003/api/word';

var csvData=[];

fs.createReadStream(inputFile)
    .pipe(parse({delimiter: ',',
                 quote: '"',
                 columns: true}))
    .on('data', function(csvrow) {
        let data = {
            word_type: csvrow['Wortkategorie'],
            text: csvrow['Wort']
        };
        if (csvrow['flavor'] !== '') {
            data.flavor = csvrow['flavor'];
        }
        if (csvrow['Numerus'] !== '') {
            data.numerus = csvrow['Numerus'];
        }
        axios.post(server_endpoint, data)
            .then(resp => { csvData.push(resp.data) })
            .catch(err => { console.log(err) });
    })
    .on('end',function() {
        //do something with csvData
        //console.log(csvData);
        console.log("over out");
    });
