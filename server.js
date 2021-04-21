const app = require('./app');

const server = app.listen(7000, () => {
    console.log("server is running on port 7000");
})
