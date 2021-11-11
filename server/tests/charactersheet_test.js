const { parseCharacterPayload2Bio } = require('../lib/charactersheet.js');

const payload = {"name":"Tellthemastory","characterProgress":{"1":[{"key":"1","value":"A","ident":"1A","question":"Wie alt ist dein Charakter?","text":"#FREITEXT# Jahr(e)","altText":""},{"key":"2","value":"C","ident":"2C","question":"Welcher Spezies gehört dein Charakter an?","text":"Alien","altText":""},{"key":"3","value":"N","ident":"3N","question":"Welchen Gegenstand hat dein Charakter bei sich? ","text":"einen Schokoriegel","altText":"Schokoriegel"},{"key":"4","value":"A","ident":"4A","question":"Welche Pronomen benutzt dein Charakter?","text":"FREITEXT","altText":""},{"key":"5","value":"E","ident":"5E","question":"Was würdest du als die größte Stärke deines Charakters beschreiben? Mein Charakter ist besonders...","text":"gutaussehend","altText":"Aussehen"},{"key":"6","value":"G","ident":"6G","question":"Was würdest du als die größte Schwäche deines Charakters beschreiben? Mein Charakter ist besonders...","text":"tollpatschig","altText":"Tollpatschigkeit"},{"key":"7","value":"D","ident":"7D","question":"Was ist die Haupt-Motivation deines Charakters?","text":"beliebt werden","altText":""},{"key":"8","value":"A","ident":"8A","question":"Der persönliche Slogan deines Charakters lautet:","text":"FREITEXT","altText":""}],"3":[{"key":"3","value":"D","ident":"2C3D","question":"Wie sieht dein Alien aus?","text":"insektenartig","altText":""}],"5":[{"key":"4","value":"A","ident":"2C3D4A","question":"Wo kommt dein Alien her?","text":"Vom Planeten Winter einer entfernten Galaxie","altText":"Alien\nBewohner:in des Planeten Winter, insektenartige Gestalt"}]},"user":{"isMod":false,"colorCode":"#e3fffd","_id":"618cf412a9e83a7b35c1d436","ticketCodeId":"618cf40ca9e83a7b35c1d435","created_date":"2021-11-11T10:44:34.554Z","__v":0},"colorCode":"#e3fffd"};

const profileSetting = {
  _id: '618c48d7f1591f5a1b60e99b',
  key: 'characterProfile',
  value: '[{"key":0,"value":"#Name#"},{"key":1,"value":"#2#"},{"key":2,"value":"Alter: #1# Jahr(e)"},{"key":3,"value":"Pronomen: #4#"},{"key":4,"value":"Trägt bei sich: #3#"},{"key":5,"value":"Stärke: #5#"},{"key":6,"value":"Schwäche: #6#"},{"key":7,"value":"Motivation: #7#"},{"key":8,"value":"\\"#8#\\""}]',
  created_date: "2021-11-10T22:33:59.795Z",
  __v: 0
};

console.log(parseCharacterPayload2Bio(payload, profileSetting));
