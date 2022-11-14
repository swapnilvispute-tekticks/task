const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let userData = {};
let currentUser = {};

let manipulate = () => {
    rl.question('$', function (name) {
        const nameArr = name.split(' ');
        switch (nameArr[0]) {
            case 'login':
                if (nameArr.length > 1) {
                    loginUser(nameArr[1])
                    console.log(`Hello ${currentUser.name}\nYour balance is $${currentUser.balance}`);
                }
                break;
            case 'deposit':
                if (nameArr.length > 1) {
                    depositAmount(currentUser.id, nameArr[1]);
                }
                break;
            case 'logout':
                console.log(`Goodbye, ${currentUser.name}`)
                currentUser = {};
                break;
            case 'transfer':
                if (nameArr.length > 2) {
                    transferAmount(nameArr[1], nameArr[2]);
                }
                break;
            default:
                console.log('Oops! You are using invalid command')
        }
        manipulate();
        //rl.close();
    });

    rl.on('close', function () {
        console.log('\nBYE BYE !!!');
        process.exit(0);
    });
}


let depositAmount = (userId, amount) => {
    if (Object.keys(currentUser).length > 0) {
        currentUser['balance'] = parseFloat(currentUser['balance']) + parseFloat(amount)
        userData[userId] = currentUser
        console.log(`Your balance is ${currentUser['balance']}`);
    } else {
        console.log(`You are not authorised to deposit, please login to continue`)
    }
}

let getUserData = (userName) => {
    let info = {}
    for (const key in userData) {
        if (Object.hasOwnProperty.call(userData, key)) {
            const element = userData[key];
            if (element.name == userName) {
                info = element
                break;
            }
        }
    }
    return info
}

let loginUser = (userName) => {
    currentUser = getUserData(userName)
    if (Object.keys(currentUser).length === 0) {
        let id = Math.floor(1000 + Math.random() * 9000)
        currentUser = {
            'id': id,
            'name': userName,
            'balance': 0
        }
        userData[id] = currentUser;
    }
}

let transferAmount = (amount, userName) => {
    if (Object.keys(currentUser).length > 0) {
        let userInfo = getUserData(userName);
        if (Object.keys(userInfo).length > 0) {
            userData[userInfo.id].balance = userData[userInfo.id].balance + parseFloat(amount);
            currentUser['balance'] = parseFloat(currentUser['balance']) - parseFloat(amount);
            userData[currentUser.id] = currentUser
        }
        console.log(`Transfered ${amount} to ${userName}`);
        console.log(`Your balance is ${currentUser['balance']}`);
    } else {
        console.log(`You are not authorised to transfer amount, please login to continue`)
    }
}

manipulate();