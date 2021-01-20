import DataAccess from '../dataSources'

const Collections = Object.keys(DataAccess.collectibles).map(key => {return {name: DataAccess.collectibles[key].name, collectibleList: DataAccess.collectibles[key].collectibleList}})


const CollectionResolver = {
  Query: { collections: () =>  Collections},
  // Mutation: {
  //   increaseCollectible: async (_, {collectionName, collectibleName}, {dataSources}) => {

  //   }
  // }
}

export default CollectionResolver
