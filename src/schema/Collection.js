import { Collection, CollectionTC } from '../models/Collection'

const CollectionQuery = {
  collectionById: CollectionTC.getResolver('findById')
}

const CollectionMutation = {
  collectionCreateOne: CollectionTC.getResolver('createOne')
}

export { CollectionQuery, CollectionMutation }