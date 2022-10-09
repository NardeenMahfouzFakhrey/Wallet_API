import type { HttpContextContract  } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'
import LoginValidator from 'App/Validators/LoginValidator'
import UpdatePasswordValidator from 'App/Validators/UpdatePasswordValidator'
import AppService from 'App/services/AppService'
import  Http from "App/utiles/Http"
export default class UsersController {

    public async register({ request, response }: HttpContextContract) {
       const user = await request.validate(RegisterValidator)
        const created = await User.create(user)
       return Http.responding(response,201, "signed up", created.$attributes)
   }

   public async loginByEmail({ request, auth, response }: HttpContextContract) {
       const user = await request.validate(LoginValidator)
       const accessToken = await auth.use('api').attempt(user.email!  , user.password)
       return  Http.responding(response,200, "login sucessfully", { "access_token": accessToken })
    }

   public async loginByPhoneNumber({ request, auth, response }: HttpContextContract) {
    const user = await request.validate(LoginValidator)
    const accessToken = await auth.use('api').attempt(user.phonenumber!  , user.password)
    return  Http.responding(response,200, "login sucessfully", { "access_token": accessToken })
}

public async updateUserPassward({ request, auth, response }: HttpContextContract){
    const user = await request.validate(UpdatePasswordValidator)
    const id = auth.use('api').user?.id  
     await AppService.updatePassword(id! , user.newPassword)
    return  Http.responding(response ,201, "updated",undefined)
}

}

