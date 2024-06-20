#!  /usr/bin/env node
console.log(chalk.red("=".repeat(60)));
console.log(chalk.yellow ("Welcome to My Bank | Code-with-Momina-Khan"));
console.log(chalk.red("=".repeat(60)));

import inquirer from "inquirer"
import chalk from "chalk"

//Bank Account Interface
interface BankAccount{
    accountNumber:number;
    balance: number;
    withdraw(amount:number): void;
    deposit(amount:number): void;
    checkBalance():void;
}

//Bank Account Class 
class BankAccount implements BankAccount {
    accountNumber: number;
    balance: number;

       
       constructor(accountNumber: number,balance: number){
        this.accountNumber = accountNumber;
        this.balance = balance;
       
       }

       //Debit Money 
       withdraw(amount: number): void {
           if(this.balance>= amount ){
            this.balance -= amount;
            console.log(`Withdrawl of ${amount} Successful. Remainig Balance is ${this.balance}`)

           }else {
            console.log(`Insufficient Balance.`)
           }
       }


       //Credit Money 
       deposit(amount: number): void {
           if(amount >100 ){
            amount -=1; //1$ fee charged in case of more than 100$ amount.
           }this.balance += amount;
           console.log(`Deposit of ${amount} Successful. Remaining Balance: ${this.balance}`);

       }
       //Check Balance
       checkBalance(): void {
           console.log(`Current Balance: ${this.balance}`);
           
       }
}

//Customer Class 
class  Customer{
    firstName : string;
    lastName : string;
    gender: string;
    age : number;
    mobile  : number;
    account : BankAccount;

    constructor(firstname : string,lastName : string,gender: string,age : number,mobile  : number,account : BankAccount,){
        this.firstName = firstname;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;;
        this.mobile = mobile;
        this.account = account;
    }
}


//Create Ban Account 

const account : BankAccount[]= [
    new BankAccount (1001, 500),
    new BankAccount (1002, 1000),
    new BankAccount (1003, 1500),
];

//Create Customers

const customers : Customer[] = [
    new Customer ("Hamza", "Khan", "Male",35 ,923111111111,account[0]),
    new Customer ("Momina", "Khan", "female",22 ,9234444444444,account[1]),
    new Customer ("Sana", "Khan", "female",23 ,925555555555,account[2])

]

//Function to interact with bank account 

async function service(){
    do{
        const accountNumberInput = await inquirer.prompt(
                {   name: "AccountNumber",
                    type:"number",
                    message:"Enter Your Account Number"

                }
            )
        
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.AccountNumber)
        if(customer){
            console.log(`Welcome, ${customer.firstName} ${customer.lastName} \n`);
            const ans = await inquirer.prompt([
                {
                    name:'select',
                    type:"list",
                    message:"Select ",
                    choices:["Deposit","Withdraw","Check Balance","Exit"]
                }
            ]);
            switch(ans.select){
                case "Deposit": 
                const depositAmount = await inquirer.prompt([
                    {
                        name:"amount",
                        type:"number",
                        message: "Enter the Amount to Deposit: "
                    }
                ])
                customer.account.deposit(depositAmount.amount)
                break;
                case "Withdraw": 
                const withdrawAmount = await inquirer.prompt([
                    {
                        name:"amount",
                        type:"number",
                        message: "Enter the Amount to Withdraw: "
                    }
                ])
                customer.account.withdraw(withdrawAmount.amount)
                break;
                    
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting Bank Programme..");
                    
                    console.log("\n Thank you for using our services\n");
                    return;

                    
                
                

            }
            
        }else{
            console.log("Invalid Account Number , Please Try Again");
            
        }

    } while(true)
}

service()