const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
    return { app: "started" }
}) 

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );