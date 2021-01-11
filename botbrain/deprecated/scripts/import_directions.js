var fs = require('fs');
var parse = require('csv-parse');
var axios = require('axios');

// Change files and servers here!
var inputFile = 'data/directions.csv';
var server_endpoint = 'http://localhost:3003/api/direction';

var csvData=[];

fs.createReadStream(inputFile)
    .pipe(parse({delimiter: ',',
                 quote: '"',
                 columns: true}))
    .on('data', function(csvrow) {

        let meta = csvrow['Satzkategorie'].split(" ");

        let data = {
            direction_type: meta[0],
            text: csvrow['Anweisung']
        };

        if (meta[1]) {
            data.numerus = meta[1];
        }
        //console.log(data);
        axios.post(server_endpoint, data)
            .then(resp => { csvData.push(resp.data) })
            .catch(err => { console.log(err) });
    })
    .on('end',function() {
        //do something with csvData
        //console.log(csvData);
        console.log("over out");
    });
