import { UserTC } from '../models/User'

const UserQuery = {
  userById: UserTC.getResolver('findById'),
  userOne: UserTC.getResolver('findOne')
}

const UserMutation = {
  userCreateOne: UserTC.getResolver('createOne'),
  register: UserTC.getResolver('register'),
  login: UserTC.getResolver('login')
}

export { UserQuery, UserMutation }
