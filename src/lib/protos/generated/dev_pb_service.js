// package: 
// file: dev.proto

var dev_pb = require("./dev_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Dev = (function () {
  function Dev() {}
  Dev.serviceName = "Dev";
  return Dev;
}());

Dev.MouseMove = {
  methodName: "MouseMove",
  service: Dev,
  requestStream: false,
  responseStream: false,
  requestType: dev_pb.MoveEvent,
  responseType: dev_pb.MoveResponse
};

Dev.Background = {
  methodName: "Background",
  service: Dev,
  requestStream: false,
  responseStream: false,
  requestType: dev_pb.Color,
  responseType: dev_pb.ColorResponse
};

exports.Dev = Dev;

function DevClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

DevClient.prototype.mouseMove = function mouseMove(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Dev.MouseMove, {
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

DevClient.prototype.background = function background(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Dev.Background, {
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

exports.DevClient = DevClient;

