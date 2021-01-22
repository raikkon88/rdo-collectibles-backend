import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

import { ApolloServer } from 'apollo-server-express'

import './db'
import schema from './schema'

dotenv.config()

// Possible implementation for Registration
// https://www.youtube.com/watch?v=mEIR7M6VzPo&list=PLpGo-Y3em4SXceWj-OOEFcJmN0MO05vs7&index=6&ab_channel=CodebookInc.
// Possible implementation for Authentication
// https://www.youtube.com/watch?v=6stMH9c9YRw&list=PLpGo-Y3em4SXceWj-OOEFcJmN0MO05vs7&index=7&ab_channel=CodebookInc.

const app = express()

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
