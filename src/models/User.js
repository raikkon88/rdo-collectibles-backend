import mongoose, { Schema} from 'mongoose'
import timestamps from 'mongoose-timestamp';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import crypto from 'crypto'
import collectibles from '../data/collectibles.json'
import { Collection } from './Collection'
import { Collectible } from './Collectible'

const MAX_SALT_LENGTH = 100
const MIN_SALT_LENGTH = 50

export const UserSchema = new Schema(
  {
    username: {
      type: String, 
      trim: true, 
      required: true,
      unique: true, 
    },
    email : {
      type: String, 
      trim: true, 
      lowercase: true, 
      unique: true, 
      required: true
    },
    password: {
      type: String,
      required: true
    },
    salt: {
      type: String,
      required: false
    },
    active: {
      type: Boolean,
      required: false
    },
  },
  {
    collection: 'users'
  }
)

UserSchema.plugin(timestamps);
UserSchema.index({ createdAt: 1, updatedAt: 1 });

export const User = mongoose.model('User', UserSchema);
export const UserTC = composeWithMongoose(User);


UserTC.addResolver({
  name: 'register',
  kind: 'mutation',
  type: UserTC.getResolver('createOne').getType(),
  args: UserTC.getResolver('createOne').getArgs(),
  resolve: async ({ args }) => {
    
    // Random length from 50 to 100
    const randomLength = Math.floor(Math.random() * MAX_SALT_LENGTH) + MIN_SALT_LENGTH
    // Random salt for the password storage created from random length
    const salt = crypto.randomBytes(randomLength).toString('hex')
    // Password storage created from salt and user password.
    const password = crypto.createHash("sha256").update(`${args.record.email}-${args.record.password}-${salt}`).digest("hex")

    let userArguments = {
      ...args.record,
      salt,
      password,
      active:false,
    }

    let user = await User.create(userArguments);

    await collectibles.forEach(async collection => {
      console.log(collection)
      let collectionId = await Collection.create({ userId: user._id, name: collection.name })
      await collection.collectibleList.forEach(async collectible => {
        Collectible.create({ collectionId: collectionId, name: collectible.name, count: collectible.count })
      })
    })

    return {
      record: user, 
      recordId: user._id
    }
  } 
})


