import { User, UserTC } from '../models/User'

const UserQuery = {
  userById: UserTC.getResolver('findById')
}

const UserMutation = {
  userCreateOne: UserTC.getResolver('createOne')
}

export { UserQuery, UserMutation }