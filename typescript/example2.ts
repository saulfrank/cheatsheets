
//
const name1 = 'Josh Perez';

interface user_type {
    firstName: string;
    lastName: number;
}
//Object
const user:user_type = {
    firstName: 'Harper',
    lastName: 2
};

//another option
const user2 =<user_type> {
    firstName: 'Harper',
    lastName: 2
};

function formatName(user){
    return user.firstName  + ' ' + user.lastName;
}

function getGreeting(user) {
    if (user) {
        return `<h1>Hello, ${formatName(user)}!</h1>`;
    }
    return `<h1>Hello, Stranger.</h1>`;
}


const element1:string = `<h1>Hello, ${name1}</h1>`;

    console.log(name1, element1, getGreeting(user));