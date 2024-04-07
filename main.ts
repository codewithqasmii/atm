import inquirer from "inquirer";
import { faker } from '@faker-js/faker';

//requirement 
//1- users data
//2- atmmachine
//3- atm function

interface User {
    id:number,
    pin:number,
    name:string,
    accountNumber:number,
    balacne:number
}
const creatUsers = ()=>{
    let users:User[] = []

    for(let i = 0; i<5; i++){
        let user:User = {
            id:i,
            pin:1000+i,
            name:faker.person.fullName(),
            accountNumber:Math.floor(100000000 * Math.random() * 9),
            balacne:100000 * i
        }
        
        users.push(user)
    }


    return users
};

//atm machine

const atmMachine = async(users:User[])=> {
    const res = await inquirer.prompt(
        {
            type:"number",
            message:"Enter your pin code",
            name:"pin"

        }
    )
    const user = users.find(val => val.pin == res.pin)
    if(user){
            console.log(`Welcom ${user.name}`)
            atmFun(user)
            return
        }      
        console.log("Invalid user");
        
}

//atm function
const atmFun = async(user:User) => {
    const ans = await inquirer.prompt(
        {
            type: "list",
            name: "select",
            message:"what do you want",
            choices:["withdraw", "balance","deposit", "exit"]
        }
    )
    if(ans.select == "withdraw"){
        const amount = await inquirer.prompt({
            type:"number",
            message: "enter your amount",
            name: "rupee"
        })
        if(amount.rupee > user.balacne){
            return console.log("insufficent balance")
        }
        if(amount.rupee > 25000){
            return console.log("app 25000 se ziada amount nahi nikal sakty")
        }
        console.log(`withdraw amount : ${amount.rupee}`)
        console.log(`balance amount : ${user.balacne-amount.rupee}`)
    }
    if(ans.select == "balance"){
        console.log(`balance amount : ${user.balacne}`)
        return
    }
    if(ans.select == "deposit"){
    const deposite = await inquirer.prompt({
        type:"number",
        message:"Deposite amount enter",
        name:"rupees"
})
    console.log(`Deposite amount: ${deposite.rupees}`);
    console.log(`Total balance: ${user.balacne + deposite.rupees}`);
    
}
    if(ans.select == "exit"){
        console.log("Thanks for using ATM");
        
    }
    
}

const users = creatUsers()
atmMachine(users)
