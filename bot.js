console.log("On va tous mourir."); //to let me know it is running

// include node fs module
var fs = require('fs');

//import discord.js and login
const Discord = require('discord.js');
const client = new Discord.Client();
client.login('NzgxMjU2MDQ0Nzk3MTAwMDQ0.X76_ZA.plUWCmTpsMZJEe7T31lrv1__6Xw');
//connect to discord and let me know when you're ready to play
client.on('ready', readyDiscord);

function readyDiscord() {
    console.log('on est prêt');
}

//import rita and parse a rita string to console to show it's working 
var rita = require('rita');
var rs = rita.RiString("The elephant took a bite!");
console.log(rs.features());

//load paradise lost and generate markov sentence
var rm = new rita.RiMarkov(3);
let sentence;
rm.loadFrom('applethorn.txt', markovify);
function markovify() {
    sentence = rm.generateSentences(5000);
    sentence = sentence.join(' ');
    sentence = String(sentence);
    
    createMyFile();
};


//import tracery.js and flatten a basic grammar to console to show it's working
var tracery = require('tracery-grammar');
 
var grammar = tracery.createGrammar({
  'animal': ['panda','fox','capybara','iguana', 'chimpanzee', 'Patrick', 'bum'],
  'emotion': ['sad','happy','angry','jealous', 'confused', 'excited', 'foolish', 'poopy'],
  'origin':['Hi there! I am #emotion.a# #animal#.'],
});
 
grammar.addModifiers(tracery.baseEngModifiers); 
 
console.log(grammar.flatten('#origin#'));

//scan for messages and call function when message logged
client.on('message', gotMessage);

let mortbotreplies;

function gotMessage(msg) {
    console.log(msg.content)
    if (msg.content === 'mort') {
        mortbotreplies = grammar.flatten('#origin#');
        msg.reply(mortbotreplies);
    } else if (msg.content === 'hello MORT') {
        msg.reply('Hi')
    } else {
        sentence = rm.generateSentences()
        msg.reply(sentence + " My goodly sir.");
    }
}

//write a text file using the output of markovify

function createMyFile() {

    fs.writeFile('newfile.txt', sentence, function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
      }); 

    }
