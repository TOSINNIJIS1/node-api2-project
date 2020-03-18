const myExpress = require('express')

const myServer = myExpress();

const dataRouter = require('./data/data-router.js')


myServer.use(myExpress.json());
myServer.use('/users', dataRouter);
myServer.use('/junk', dataRouter);

//endpoint

myServer.get('/', (req, res) => {
    res.send(`
    <h2> Lambda API </h2>
    <p> Welcome to Lambda Api </p>
    `)
})


module.exports = myServer;