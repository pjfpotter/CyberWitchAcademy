// include node fs module
var fs = require('fs');

//import rita and parse a rita string to console to show it's working 
var rita = require('rita');
var rs = rita.RiString("The elephant took a bite!");
console.log(rs.features());

//load source text and generate markov sentences
var rm = new rita.RiMarkov(3);
let sentence;
rm.loadFrom('applethorn.txt', markovify);
//use a callback so that we wait for the source to finish loading before making our markov soup
function markovify() {
    sentence = rm.generateSentences(5000);
    sentence = sentence.join(' '); //Join the sentences together
    sentence = String(sentence); //stringify them
    
    createMyFile(); //call the fs method that dumps the string in a text file
};

//write a text file using the output of markovify

function createMyFile() {

    fs.writeFile('newfile.txt', sentence, function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
      }); 

    }
