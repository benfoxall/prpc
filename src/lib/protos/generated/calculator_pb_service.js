// package: 
// file: calculator.proto

var calculator_pb = require("./calculator_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var CalculatorService = (function () {
  function CalculatorService() {}
  CalculatorService.serviceName = "CalculatorService";
  return CalculatorService;
}());

CalculatorService.Calculate = {
  methodName: "Calculate",
  service: CalculatorService,
  requestStream: false,
  responseStream: false,
  requestType: calculator_pb.NumberPair,
  responseType: calculator_pb.Result
};

exports.CalculatorService = CalculatorService;

function CalculatorServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

CalculatorServiceClient.prototype.calculate = function calculate(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CalculatorService.Calculate, {
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

exports.CalculatorServiceClient = CalculatorServiceClient;

