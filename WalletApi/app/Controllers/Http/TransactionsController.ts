import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transaction from 'App/Models/Transaction'
import AppService from 'App/services/AppService'
import TransactionService from 'App/services/TransactionService'
import TransactionValidator from 'App/Validators/TransactionValidator'
import Http from 'App/utiles/Http'
import TimestampValidator from 'App/Validators/TimestampValidator'
export default class TransactionsController {

    public async insertTransaction({ request, auth, response }: HttpContextContract) {
        const transaction = await request.validate(TransactionValidator)
        const user = auth.use('api').user
        if (TransactionService.checkBalanceAndType(transaction.transaction_type, user!.wallet_balance, transaction.amount)) {
            user!.wallet_balance = TransactionService.insertBalance(transaction.transaction_type, user!.wallet_balance, transaction.amount)
        }
        else return response.status(400).json({ currentBalance: user!.wallet_balance, message: "not enough balance" })
        await user!.save()
        const created = await Transaction.create({ ...transaction, user_id: user?.id })
        return Http.responding(response, 201, "created", created.$attributes)
    }

    public async updateTransaction({ request, auth, params, response }: HttpContextContract) {
        const transaction = await Transaction.findBy('id', params.id)
        const user = auth.use('api').user
        user!.wallet_balance = TransactionService.updateBalance(transaction!.transaction_type, user!.wallet_balance, request.input('amount'), transaction!.amount)
        transaction!.amount = request.input('amount')
        transaction!.save()
        await user!.save()
        return Http.responding(response, 201, "updated", transaction!.$attributes)
    }

    public async deleteTransaction({ auth, params, response }: HttpContextContract) {
        const user =  auth.use('api').user
        const transaction = await Transaction.findBy('id', params.id)
        user!.wallet_balance = TransactionService.deleteBalance(transaction!.transaction_type, user!.wallet_balance, transaction!.amount)
        await user!.save()
        await transaction?.delete()
        return Http.responding(response, 204, "deleted", undefined)
    }

    public async getTransaction({ auth, response }: HttpContextContract) {
        const user =  auth.use('api').user
        const get = await AppService.getTransaction(user?.id!)
        return Http.responding(response, 200, "done", get!)
    }
    public async getTodayTransactions({ response }: HttpContextContract) {
        const transactions = await AppService.getTransactionDaily()
        return Http.responding(response, 200, "done", transactions)
    }

    public async getWeekTransactions({ response }: HttpContextContract) {
        const transactions = await AppService.getTransactionWeekly()
        return Http.responding(response, 200, "done", transactions)
    }

    public async getMonthTransactions({ response }: HttpContextContract) {
        const transactions = await AppService.getTransactionMonthly()
        return Http.responding(response, 200, "done", transactions)
    }

    public async viewTransactions({ request, response }: HttpContextContract) {
        {
            const time = await request.validate(TimestampValidator)
            const transactions = await AppService.getTransactionInInterval(time.timestamp1, time.timestamp2)
            const groupedtransactions = await TransactionService.getTransactionInGrpups(transactions)
            return Http.responding(response, 200, "done", groupedtransactions)

        }
    }

}



