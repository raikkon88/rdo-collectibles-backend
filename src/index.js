import express from 'express'
// import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import mongoose from 'mongoose'

// import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
// import { makeExecutableSchema } from 'graphql-tools';
//import resolvers from './resolvers/Collection'

import { ApolloServer } from 'apollo-server-express'


import './db'
import schema from './schema'

dotenv.config()

const app = express()
const port = 4000

const server = new ApolloServer({
    schema,
    cors: true,
    playground: process.env.NODE_ENV === 'development' ? true : false,
    introspection: true,
    tracing: true,
    path: '/',
});

server.applyMiddleware({
    app, 
    path: '/',
    cors: true, 
    onHealthCheck: () => {
        new Promise((resolve, reject) => {
            if(mongoose.connection.readyState > 0) {
                resolve();
            }
            else{
                reject();
            }
        })
    }
})

app.listen({ port: process.env.PORT }, () => {
    console.log(`🚀 Server listening on port ${process.env.PORT}`);
    console.log(`😷 Health checks available at ${process.env.HEALTH_ENDPOINT}`);
})


// const typeDefs = `
//     type Query { collections: [Collection] }
//     type Collectible { name: String, count: Int }
//     type Collection { name: String, collectibleList: [Collectible] }
// `;

// const schema = makeExecutableSchema({
//     typeDefs, 
//     resolvers
// })

// app.use('/graphql', bodyParser.json(), graphqlExpress({schema}))
// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// app.listen( port, () => {
//     console.log( `server started at http://localhost:${ port }` );
// } );