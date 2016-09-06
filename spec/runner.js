var assert = require('assert');
var async = require('async');
var _ = require('underscore');

var SocketHelper = require('../index');
var Socket = SocketHelper.Socket;
var Stream = SocketHelper.Stream;

describe('Socket Helper', function() {
    var server;
    describe('Start WebSocket Server', function() {
        it('should initiate a webSocket server', function(done) {
            server = Socket.startServer(function(err) {
                assert.equal(null, err);
                done();
            });

            assert(server !== null);
            if (server === null) {
                done();
            }
        });
    });

    describe('Check WebSocket Server Status', function() {
        it('should open and close a webSocket connection', function(done) {
            Socket.checkStatus(function(err) {
                assert.equal(null, err);
                done();
            });
        });
    });

    describe('Stop WebSocket Server', function() {
        it('should stop the webSocket server', function(done) {
            assert(server !== null);
            if (server === null) {
                done();
                return;
            }

            server.stopServer(function(err) {
                assert.equal(null, err);
                setTimeout(function() {
                    done();
                }, 1500);
            });
        });
    });

    // @TODO message tests
    // @TODO stream tests
});

