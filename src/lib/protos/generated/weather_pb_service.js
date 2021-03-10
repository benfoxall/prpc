// package: 
// file: weather.proto

var weather_pb = require("./weather_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var WeatherService = (function () {
  function WeatherService() {}
  WeatherService.serviceName = "WeatherService";
  return WeatherService;
}());

WeatherService.query = {
  methodName: "query",
  service: WeatherService,
  requestStream: false,
  responseStream: false,
  requestType: weather_pb.WeatherRequest,
  responseType: weather_pb.WeatherResponse
};

exports.WeatherService = WeatherService;

function WeatherServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

WeatherServiceClient.prototype.query = function query(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(WeatherService.query, {
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

exports.WeatherServiceClient = WeatherServiceClient;

