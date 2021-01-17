import DataAccess from '../access'

const Collections = Object.keys(DataAccess.collectibles).map(key => {return {name: DataAccess.collectibles[key].name, collectibleList: DataAccess.collectibles[key].collectibleList}})

const CollectionResolver = {
  Query: { collections: () =>  Collections}
}

export default CollectionResolver
