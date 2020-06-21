// package: 
// file: clock.proto

var clock_pb = require("./clock_pb");
var common_pb = require("./common_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var ClockService = (function () {
  function ClockService() {}
  ClockService.serviceName = "ClockService";
  return ClockService;
}());

ClockService.Listen = {
  methodName: "Listen",
  service: ClockService,
  requestStream: false,
  responseStream: false,
  requestType: common_pb.Noop,
  responseType: clock_pb.Tick
};

exports.ClockService = ClockService;

function ClockServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ClockServiceClient.prototype.listen = function listen(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ClockService.Listen, {
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

exports.ClockServiceClient = ClockServiceClient;

