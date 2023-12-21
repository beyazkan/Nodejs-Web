// Browser

// IIFE
// var controllerB = (function(){
//     // scope B
//     var firstName = "Oğuz";

//     return {
//         firstName
//     }
// })();

// console.log(controllerA.firstName);
// console.log(controllerB.firstName);
// console.log(window);
// Nodejs
const scriptA = require('./ScriptA.js');

scriptA.log('Mehmet');
console.log(scriptA.name);
// console.log(scriptA.age); // undefined