/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('/wallet/loginbyemail' ,'UsersController.loginByEmail')
Route.post('/wallet/loginbyphonenumber', 'UsersController.loginByPhoneNumber')
Route.post('/wallet/register', 'UsersController.register')

Route.group(() => {
    Route.put('/wallet/updatepassword', 'UsersController.updateUserPassward')
    Route.post('/wallet/transaction', 'TransactionsController.insertTransaction')
    Route.put('/wallet/transaction/:id', 'TransactionsController.updateTransaction')
    Route.delete('/wallet/transaction/:id', 'TransactionsController.deleteTransaction')
    Route.get('/wallet/transactions', 'TransactionsController.getTransaction')

    Route.get('/wallet/transaction/today', 'TransactionsController.getTodayTransactions')
    Route.get('/wallet/transaction/currentweek', 'TransactionsController.getWeekTransactions')
    Route.get('/wallet/transaction/currentmonth', 'TransactionsController.getMonthTransactions')
    Route.post('/wallet/viewtransactions', 'TransactionsController.viewTransactions')

  }).middleware('auth')
