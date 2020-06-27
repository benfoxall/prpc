// package: 
// file: spaceInvaders.proto

var spaceInvaders_pb = require("./spaceInvaders_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var SpaceService = (function () {
  function SpaceService() {}
  SpaceService.serviceName = "SpaceService";
  return SpaceService;
}());

SpaceService.Move = {
  methodName: "Move",
  service: SpaceService,
  requestStream: false,
  responseStream: false,
  requestType: spaceInvaders_pb.SpaceMessage,
  responseType: spaceInvaders_pb.SpaceNoop
};

SpaceService.Fire = {
  methodName: "Fire",
  service: SpaceService,
  requestStream: false,
  responseStream: false,
  requestType: spaceInvaders_pb.SpaceNoop,
  responseType: spaceInvaders_pb.SpaceNoop
};

exports.SpaceService = SpaceService;

function SpaceServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

SpaceServiceClient.prototype.move = function move(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(SpaceService.Move, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

SpaceServiceClient.prototype.fire = function fire(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(SpaceService.Fire, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.SpaceServiceClient = SpaceServiceClient;

