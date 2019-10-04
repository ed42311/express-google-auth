const app = require('./app')

const { NODE_ENV, PORT } = process.env

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
})
