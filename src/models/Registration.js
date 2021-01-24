import { composeWithMongoose } from 'graphql-compose-mongoose'
import mongoose, { Schema} from 'mongoose'
import timestamps from 'mongoose-timestamps/lib/timestamps'
import { User, UserTC } from './User'

export const RegistrationSchema = new Schema(
  {
  userId: {
    type: String, 
    required: true,
    unique: true, 
  },
  hash : {
    type: String, 
    trim: true, 
    unique: true, 
    required: true
  }
  },
  {
    collection: 'registrations'
  }
)

RegistrationSchema.plugin(timestamps)
RegistrationSchema.index({createdAt: 1, updatedAt: 1})

export const Registration = mongoose.model('Registration', RegistrationSchema)
export const RegistrationTC = composeWithMongoose(Registration)

RegistrationTC.addRelation('user', {
  resolver: () => UserTC.getResolver('findById'),
  args: {
      _id: source => source.userId
  },
  projection: { userId: false }, 
})

RegistrationTC.addResolver({
  name: 'verifyRegister',
  kind: 'mutation',
  type: RegistrationTC.getResolver('createOne').getType(),
  args: RegistrationTC.getResolver('createOne').getArgs(),
  resolve: async ({ args }) => {
    
    console.log(args.record)

    let registration = await Registration.findOneAndDelete({
      ...args.record,
    })

    await User.findByIdAndUpdate(args.record.userId, { active: true })

    return {
      record: registration, 
      recordId: registration._id
    }
  } 
})