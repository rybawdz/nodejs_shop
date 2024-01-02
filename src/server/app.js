require('./lib/validateDependencies')().then(() => {
const server = require('./server');
server.start()})
