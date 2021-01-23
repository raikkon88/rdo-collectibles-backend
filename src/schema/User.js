import { UserTC } from '../models/User'

const UserQuery = {
  userById: UserTC.getResolver('findById')
}

const UserMutation = {
  userCreateOne: UserTC.getResolver('createOne'),
  register: UserTC.getResolver('register')
}

export { UserQuery, UserMutation }