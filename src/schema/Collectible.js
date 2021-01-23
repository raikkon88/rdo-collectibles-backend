import { Collectible, CollectibleTC } from '../models/Collectible'

const CollectibleQuery = {
  collectibleById: CollectibleTC.getResolver('findById')
}

const CollectibleMutation = {
  collectibleCreateOne: CollectibleTC.getResolver('createOne'),
  collectibleCreateMany: CollectibleTC.getResolver('createMany')
}

export { CollectibleQuery, CollectibleMutation }