"use strict";
//
var name1 = 'Josh Perez';
//Object
var user = {
    firstName: 'Harper',
    lastName: 2
};
function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}
function getGreeting(user) {
    if (user) {
        return "<h1>Hello, " + formatName(user) + "!</h1>";
    }
    return "<h1>Hello, Stranger.</h1>";
}
var element1 = "<h1>Hello, " + name1 + "</h1>";
console.log(name1, element1, getGreeting(user));
