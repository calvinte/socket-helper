"use strict"

var StreamMgr = require('./stream');
var SocketMgr = require('./socket');
module.exports = function(message, streamPrefix, clientSocketIndex) {
    this.streamPrefix = streamPrefix;
    this.clientSocketIndex = clientSocketIndex || null;
    this.message = message;
};
module.exports.prototype = {
    encode: function(isJson) {
        return this.streamPrefix + (isJson ? JSON.stringify(this.message) : this.message);
    },
    getStream: function() {
        return StreamMgr.streams[this.streamPrefix];
    },
    getSocket: function() {
        return SocketMgr.clientSockets[this.clientSocketIndex];
    },
    maxLength: Math.pow(2, 14),
    parse: function() {
        var parsed, value = this.message.substr(StreamMgr.streamPrefixLength, this.maxLength);

        try {
            parsed = JSON.parse(value);
        } catch(e) {
            return parsed = null;
        }

        return parsed;
    },
};

