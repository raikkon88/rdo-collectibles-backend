import mongoose, { Schema } from 'mongoose'
import { UserTC } from './User'
import timestamps from 'mongoose-timestamps'
import { composeWithMongoose } from 'graphql-compose-mongoose';


export const CollectionSchema = new Schema(
  {
      userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
      },
      name: {
          type: String,
          trim: true,
          required: true,
      },
  },
  {
      collection: 'collections',
  }
);

CollectionSchema.plugin(timestamps);

CollectionSchema.index({ createdAt: 1, updatedAt: 1 });

export const Collection = mongoose.model('Collection', CollectionSchema);
export const CollectionTC = composeWithMongoose(Collection);

CollectionTC.addRelation('user', {
    resolver: () => UserTC.getResolver('findById'),
    args: {
        _id: source => source.userId
    },
    projection: { userId: false }, 
})