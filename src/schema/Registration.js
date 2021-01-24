import { RegistrationTC } from '../models/Registration'

const RegistrationMutation = {
  verifyRegister: RegistrationTC.getResolver('verifyRegister')
}

export { RegistrationMutation }