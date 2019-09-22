// package: 
// file: trails.proto

var trails_pb = require("./trails_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var TrailsService = (function () {
  function TrailsService() {}
  TrailsService.serviceName = "TrailsService";
  return TrailsService;
}());

TrailsService.Line = {
  methodName: "Line",
  service: TrailsService,
  requestStream: false,
  responseStream: false,
  requestType: trails_pb.LineRequest,
  responseType: trails_pb.Throttle
};

TrailsService.Color = {
  methodName: "Color",
  service: TrailsService,
  requestStream: false,
  responseStream: false,
  requestType: trails_pb.ColorRequest,
  responseType: trails_pb.Noopp
};

exports.TrailsService = TrailsService;

function TrailsServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

TrailsServiceClient.prototype.line = function line(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(TrailsService.Line, {
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

TrailsServiceClient.prototype.color = function color(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(TrailsService.Color, {
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

exports.TrailsServiceClient = TrailsServiceClient;

