var PeerServer = require('peer').PeerServer;


function ServerManager (){
    this.games = [];
    this.curClientId = 1;
};

ServerManager.prototype.setServer = function(server){
    this.server = server;
    this.startWebRtcServer();
};

ServerManager.prototype.getNewClientId = function(){
    return this.curClientId++;
}

ServerManager.prototype.startWebRtcServer = function(){
    this.peerServer = new PeerServer({ port: 9000 });
};

module.exports = new ServerManager();