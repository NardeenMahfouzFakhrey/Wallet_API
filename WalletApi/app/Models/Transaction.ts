import { DateTime } from 'luxon'
import { BaseModel, column ,belongsTo ,BelongsTo} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id:number
   @column()
  public transaction_type: string

  @column()
  public income_category: string
  
  @column()
  public amount: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}

