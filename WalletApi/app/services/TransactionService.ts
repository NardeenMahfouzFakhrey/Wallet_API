
export default class TransactionService {

    public static insertBalance(transaction_type: string, currentBalance: number, amount: number): number {
        var newBalance
        if (transaction_type == 'income') {
            newBalance = currentBalance + amount
        }
        else if (transaction_type == 'expense') {

            newBalance = currentBalance - amount
        }
        return newBalance
    }

    public static checkBalanceAndType(transaction_type: string, currentBalance: number, amount: number): boolean {
        if ((transaction_type == 'expense') && (amount > currentBalance)) {

            return false;
        }
        return true;
    }

    public static updateBalance(transaction_type: any, currentBalance: number, newAmount: number, oldAmount: number): number {
        var newbalance = 0
        if (transaction_type == 'income') {
            newbalance = currentBalance + newAmount - oldAmount
        }
        else if (transaction_type == 'expense') {
            newbalance = currentBalance - newAmount + oldAmount
        }
        return newbalance
    }

    public static deleteBalance(transaction_type: string, currentBalance: number, amount: number): number {
        var newBalance = 0
        if (transaction_type == 'income') {
            newBalance = currentBalance - amount

        }
        else if (transaction_type == 'expense') {
            newBalance = currentBalance + amount
        }
        return newBalance
    }
    public static getTransactionInGrpups(transactions): any {
        var sum = 0
        transactions.expenses.forEach((obj) => {
            sum += obj.amount;
            return sum
        });
        var sum1 = 0
        transactions.salary.forEach((obj) => {
            sum1 += obj.amount;
        });
        var sum2 = 0
        transactions.loan.forEach((obj) => {
            sum2 += obj.amount;
        });
        return {
            expense: {
                numberOfTransaction: transactions.expenses.length,
                TotalAmount: sum1
            },
            salary: {
                numberOfTransaction: transactions.salary.length,
                TotalAmount: sum1
            },
            loan: {
                numberOfTransaction: transactions.loan.length,
                TotalAmount: sum2
            }
        }
    }

}