import express from 'express'
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import DataAccess from './access'


const app = express()
const port = 4000

app.use(bodyParser.json)

app.get('/', (req, res) => {
    console.log('hola')
    return { app: "started" }
}) 

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );