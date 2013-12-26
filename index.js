var Hapi = require('hapi');
var serverManager = require('./server/ServerManager');

// Create a server with a host and port
var server = Hapi.createServer('localhost', 80);

function startServer(){
    serverManager.setServer(server);
}

// Define the route
var index = {
    handler: function (request) {
        var response = new Hapi.response.File('./app/index.html');
        request.reply(response);
    }
};

// Add the route
server.addRoute({
    method : 'GET',
    path : '/',
    config : index
});

server.addRoute({
    method: 'GET',
    path: '/clientId',
    handler: function (req) {
        this.reply(serverManager.getNewClientId());
    }
});

server.addRoute({
    method: 'GET',
    path: '/{path*}',
    handler: {
        directory: { path: './app', listing: false, index: true }
    }
});


// Start the server
server.start(startServer);