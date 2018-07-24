require('dotenv').config({ path: 'variables.env' })

const app = require('./app');
app.set('port', process.env.PORT);
const server = app.listen(app.get('port'), () => { console.log(`Starting on ${process.env.PORT}`) });
