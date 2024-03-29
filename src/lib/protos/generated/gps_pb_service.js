// package: 
// file: gps.proto

var gps_pb = require("./gps_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var GPSService = (function () {
  function GPSService() {}
  GPSService.serviceName = "GPSService";
  return GPSService;
}());

GPSService.query = {
  methodName: "query",
  service: GPSService,
  requestStream: false,
  responseStream: false,
  requestType: gps_pb.GeoNoop,
  responseType: gps_pb.GeolocationCoordinates
};

exports.GPSService = GPSService;

function GPSServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

GPSServiceClient.prototype.query = function query(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GPSService.query, {
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

exports.GPSServiceClient = GPSServiceClient;

