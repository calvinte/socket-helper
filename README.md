Socket Helper
=============

Package exposes an interface for managing multiple different streams of data
over a WebSocket connection.

A `Stream` represents a pluggable bus of `Message`s, with an interface for
managing clients.

A `Message` transforms the WebSocket message to the intended format for usage
in the `Stream` (JSON, String).

A `Socket` (there can be only one) represents the WebSocket connection. This
interface sorts `Message`s to their appropriate `Stream`.

Sample Usage
------------
`myServer.js`
```
var SocketHelper = require('socket-helper');
var Socket = SocketHelper.Socket;
var server = Socket.startServer(function(err) { 
    if (err) {
        // Well... shit.
    } else {
        // yay!
    }
});
```
`myService.js`
```
var myServiceUsesJSON = false;
var myServiceStream = new require('socket-helper').Stream();
myServiceStream.onClientClose(function(clientSocketIndex) {
    // Nice seeing you sucker.
});
myServiceStream.onValue(function(message) {
    var clientSocketIndex = message.clientSocketIndex; // Which client sent the message?
    var messageString = message.parse(myServiceUsesJSON); // Consider putting them in a queue; mind your back-pressure...
});
```

