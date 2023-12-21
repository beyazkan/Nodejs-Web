// Browser

// IIFE
// var controllerA = (function(){
//     // scope A
//     // Private Members
//     var age = 20;
//     var firstName = "Mustafa";

//     var log = function(){
//         console.log(this.firstName);
//     }

//     // Public members
//     return {
//         firstName,
//         log
//     }
// })();


// Nodejs
// console.log(module);

// private members
var age = 30;

// public members
var firstName = "Mustafa";

var log = function(name){
    console.log(name);
}

// module.exports.name = firstName;
// module.exports.log = log;

// module.exports = {
//     name: firstName,
//     log: log
// };

module.exports = {
    firstName,
    log
};