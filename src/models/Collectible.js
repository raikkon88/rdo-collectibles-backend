import mongoose, { Schema } from 'mongoose'
import timestamps from 'mongoose-timestamps'
import { composeWithMongoose } from 'graphql-compose-mongoose';
import {CollectionTC} from './Collection'

export const CollectibleSchema = new Schema(
  {
      collectionId: {
          type: Schema.Types.ObjectId,
          ref: 'Collection',
          required: true,
      },
      name: {
          type: String,
          trim: true,
          required: true,
      },
      count: {
          type: Number,
          trim: true,
          required: true,
      },
  },
  {
      collection: 'collectibles',
  }
);

CollectibleSchema.plugin(timestamps);

CollectibleSchema.index({ createdAt: 1, updatedAt: 1 });

export const Collectible = mongoose.model('Collectible', CollectibleSchema);
export const CollectibleTC = composeWithMongoose(Collectible);

CollectibleTC.addRelation('collection', {
    resolver: () => CollectionTC.getResolver('findById'),
    args: {
        _id: source => source.collectionId
    },
    projection: {collectionId: false}
})