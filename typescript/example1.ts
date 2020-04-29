// import React from 'react';

// interface Person {
//     firstName: string;
//     lastName: string;
// }

//
const name1:string = 'Josh Perez';

// interface user {
//     firstName: string;
//     lastName: number;
// }
//Object
const user: {firstName:string; lastName:string} = {
    firstName: 'Harper',
    lastName: 'Perez'
};

function formatName(user: {firstName:string; lastName:string}){
    return user.firstName  + ' ' + user.lastName;
}

function getGreeting(user: {firstName:string; lastName:string}) {
    if (user) {
        return `<h1>Hello, ${formatName(user)}!</h1>`;
    }
    return `<h1>Hello, Stranger.</h1>`;
}


const element1:string = `<h1>Hello, ${name1}</h1>`;

    console.log(element1, getGreeting(user));