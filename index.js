class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    this.transactions.forEach((transaction) => {
      balance += transaction.value;
    });
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.value < 0 && this.amount > this.account.balance) {
      console.log("Exceed balance!");
    } else {
      // Keep track of the time of the transaction
      this.time = new Date();
      // Add the transaction to the account
      this.account.addTransaction(this);
    }
  }
}
class Deposit extends Transaction {
  // Pass in the account that the deposit this for
  get value() {
    return this.amount;
  }
  // Update the balance in the account
  // commit() {
  //   this.account.balance += this.amount;
  // }
}

class Withdrawal extends Transaction {
  // Pass in the account that the withdrawal this for
  get value() {
    return -this.amount;
  }
  // Update the balance in the account
  // commit() {
  //   this.account.balance -= this.amount;
  // }
}

// DRIVER CODE BELOW
const myAccount = new Account();

console.log("Starting Account Balance: ", myAccount.balance);

console.log("Attempting to withdraw even $1 should fail...");
const t1 = new Withdrawal(1.0, myAccount);
console.log("Commit result:", t1.commit());
console.log("Account Balance: ", myAccount.balance);

console.log("Depositing should succeed...");
const t2 = new Deposit(9.99, myAccount);
console.log("Commit result:", t2.commit());
console.log("Account Balance: ", myAccount.balance);

console.log("Withdrawal for 9.99 should be allowed...");
const t3 = new Withdrawal(9.99, myAccount);
console.log("Commit result:", t3.commit());

console.log("Ending Account Balance: ", myAccount.balance);
console.log("Lookings like I'm broke again");

console.log("Account Transaction History: ", myAccount.transactions);
