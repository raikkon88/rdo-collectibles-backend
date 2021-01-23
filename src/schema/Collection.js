import { Collection, CollectionTC } from '../models/Collection'

const CollectionQuery = {
  collectionById: CollectionTC.getResolver('findById'),
  collectionOne: CollectionTC.getResolver('findOne')
}

const CollectionMutation = {
  collectionCreateOne: CollectionTC.getResolver('createOne'),
  collectionCreateMany: CollectionTC.getResolver('createMany')
}

export { CollectionQuery, CollectionMutation }