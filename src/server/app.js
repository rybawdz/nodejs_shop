require('./scripts/validateDependencies')().then(() => {
const server = require('./server');
server.start()})
