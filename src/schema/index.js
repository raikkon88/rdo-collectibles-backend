import { SchemaComposer } from 'graphql-compose'

import db from '../db'

const schemaComposer = new SchemaComposer();

import { UserQuery , UserMutation } from './User'
import { CollectibleQuery , CollectibleMutation } from './Collectible'
import { CollectionQuery , CollectionMutation } from './Collection'
import { RegistrationMutation } from './Registration'

schemaComposer.Query.addFields({
  ...UserQuery,
  ...CollectionQuery, 
  ...CollectibleQuery,
})

schemaComposer.Mutation.addFields({
  ...UserMutation,
  ...CollectibleMutation, 
  ...CollectionMutation,
  ...RegistrationMutation
})

export default schemaComposer.buildSchema()