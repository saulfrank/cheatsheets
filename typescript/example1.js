// import React from 'react';
// interface Person {
//     firstName: string;
//     lastName: string;
// }
//
var name1 = 'Josh Perez';
// interface user {
//     firstName: string;
//     lastName: number;
// }
//Object
var user = {
    firstName: 'Harper',
    lastName: 'Perez'
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
console.log(element1, getGreeting(user));
