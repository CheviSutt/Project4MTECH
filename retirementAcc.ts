///<reference path="bankAccount.ts"/>
import {bankAccount} from "./bankAccount";
import {Transaction} from "../common/interfaces/Transaction";
import {TransactionOrigin} from "../common/enums/TransactionOrigin";

export class RetirementAccount extends bankAccount {
    constructor(currentdate, accountHolderBirthday) {
        super(currentdate);
        //this.currentDate = currentDate;
        this.accountHolderBirthday = accountHolderBirthday;
        this.balance = 100000;
    }

    withdrawMoney(amount: number, description: string, transactionOrigin: TransactionOrigin): Transaction {
        let earlyFee = new Date( 1958, 5, 15);
        //a better method for age check: create month,day,year variable and set to "new Date(-60y, mv, dv)"

        if(this.accountHolderBirthday < earlyFee) { //I want to merge this line in w other if else.
            return {
                success: true,
                amount: amount *= 1.0,
                resultBalance: this.balance -= amount,
                transactionDate: this.currentDate,
                errorMessage: "",
                transactionOrigin: transactionOrigin,
                description: ""
            };
        }

        if (amount > this.balance) {
            return {
                success: false,
                amount: amount,
                resultBalance: this.balance,
                transactionDate: this.currentDate,
                errorMessage: "",
                transactionOrigin: transactionOrigin,
                description: ""
            };

        } else if ((amount <= this.balance)){
            return {
                success: true,
                amount: amount *= 1.1,
                resultBalance: this.balance -= amount,
                transactionDate: this.currentDate,
                errorMessage: "",
                transactionOrigin: transactionOrigin,
                description: ""
            };
        }
    }
    advanceDate(days){
        super.calcInterest(days, .03);

    }
 }
