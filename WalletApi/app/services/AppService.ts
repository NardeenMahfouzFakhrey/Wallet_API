import User from "App/Models/User";
import Hash from '@ioc:Adonis/Core/Hash'
import Transaction from "App/Models/Transaction";


export default class AppService {

   public static async updatePassword(id: number, newPassword: string): Promise<any> {
      const user = await User.query().where('id', id).update('password', await Hash.make(newPassword))
      return user
   }

   public static async getTransaction(id: number): Promise<any> {
      const get = await Transaction.query().select().where('user_id', id).orderBy('id', 'desc').limit(10)
      return get
   }

   public static async getTransactionDaily(): Promise<any> {
      const transactions = await Transaction.query().whereRaw('Date(created_at) = CURRENT_DATE ').orderBy('created_at', 'desc')
      return transactions
   }
   public static async getTransactionWeekly(): Promise<any> {
      const transactions = await Transaction.query().whereRaw('Date(created_at) <= CURRENT_DATE OR Date(created_at) > CURRENT_DATE-7')
         .orderBy('created_at', 'desc');
      return transactions
   }
   public static async getTransactionMonthly(): Promise<any> {
      const transactions = await Transaction.query()
         .whereRaw('date_trunc(\'month\', created_at) = date_trunc(\'month\', CURRENT_DATE)').orderBy('created_at', 'desc')
      return transactions
   }

   public static async getTransactionInInterval(timestamp1: string, timestamp2: string): Promise<any> {
      const expenses = await Transaction.query()
         .whereRaw(' (created_at > ? and created_at <= ?) and transaction_type =  ?', [timestamp1, timestamp2, 'expense'])
      const salary = await Transaction.query()
         .whereRaw(' (created_at > ? and created_at <= ? )and income_category =  ?', [timestamp1, timestamp2, 'salary'])
      const loan = await Transaction.query()
         .whereRaw(' (created_at > ? and created_at <= ? )and income_category =  ?', [timestamp1, timestamp2, 'loan'])
      return { expenses, salary, loan }

   }
}