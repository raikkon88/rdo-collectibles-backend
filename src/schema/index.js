import { SchemaComposer } from 'graphql-compose'

import db from '../db'

const schemaComposer = new SchemaComposer();

import { UserQuery , UserMutation } from './User'
import { CollectibleQuery , CollectibleMutation } from './Collectible'
import { CollectionQuery , CollectionMutation } from './Collection'

schemaComposer.Query.addFields({
  ...UserQuery,
  ...CollectionQuery, 
  ...CollectibleQuery,
})

schemaComposer.Mutation.addFields({
  ...UserMutation,
  ...CollectibleMutation, 
  ...CollectionMutation,
})

export default schemaComposer.buildSchema()