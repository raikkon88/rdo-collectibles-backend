import express from 'express'
import bodyParser from 'body-parser';

import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers/Collection'

const app = express()
const port = 4000

const typeDefs = `
    type Query { collections: [Collection] }
    type Collectible { name: String, count: Int }
    type Collection { name: String, collectibleList: [Collectible] }
`;

const schema = makeExecutableSchema({
    typeDefs, 
    resolvers
})

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));


app.get('/', (req, res) => {
    res.send(DataAccess.collectibles)
}) 

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );