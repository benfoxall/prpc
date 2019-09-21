// package: 
// file: calculator.proto

var calculator_pb = require("./calculator_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Calculator = (function () {
  function Calculator() {}
  Calculator.serviceName = "Calculator";
  return Calculator;
}());

Calculator.Add = {
  methodName: "Add",
  service: Calculator,
  requestStream: false,
  responseStream: false,
  requestType: calculator_pb.Request,
  responseType: calculator_pb.Response
};

Calculator.Multiply = {
  methodName: "Multiply",
  service: Calculator,
  requestStream: false,
  responseStream: false,
  requestType: calculator_pb.Request,
  responseType: calculator_pb.Response
};

Calculator.Divide = {
  methodName: "Divide",
  service: Calculator,
  requestStream: false,
  responseStream: false,
  requestType: calculator_pb.Request,
  responseType: calculator_pb.Response
};

exports.Calculator = Calculator;

function CalculatorClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

CalculatorClient.prototype.add = function add(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Calculator.Add, {
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

CalculatorClient.prototype.multiply = function multiply(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Calculator.Multiply, {
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

CalculatorClient.prototype.divide = function divide(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Calculator.Divide, {
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

exports.CalculatorClient = CalculatorClient;

