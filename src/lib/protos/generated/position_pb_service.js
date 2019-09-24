// package: 
// file: position.proto

var position_pb = require("./position_pb");
var common_pb = require("./common_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var PositionService = (function () {
  function PositionService() {}
  PositionService.serviceName = "PositionService";
  return PositionService;
}());

PositionService.Wait = {
  methodName: "Wait",
  service: PositionService,
  requestStream: false,
  responseStream: false,
  requestType: common_pb.Noop,
  responseType: position_pb.Command
};

PositionService.SendPose = {
  methodName: "SendPose",
  service: PositionService,
  requestStream: false,
  responseStream: false,
  requestType: position_pb.Pose,
  responseType: common_pb.Noop
};

exports.PositionService = PositionService;

function PositionServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

PositionServiceClient.prototype.wait = function wait(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(PositionService.Wait, {
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

PositionServiceClient.prototype.sendPose = function sendPose(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(PositionService.SendPose, {
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

exports.PositionServiceClient = PositionServiceClient;

