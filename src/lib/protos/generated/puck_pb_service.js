// package: 
// file: puck.proto

var puck_pb = require("./puck_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var PuckService = (function () {
  function PuckService() {}
  PuckService.serviceName = "PuckService";
  return PuckService;
}());

PuckService.setLED = {
  methodName: "setLED",
  service: PuckService,
  requestStream: false,
  responseStream: false,
  requestType: puck_pb.PuckLED,
  responseType: puck_pb.PuckNoop
};

PuckService.isPressed = {
  methodName: "isPressed",
  service: PuckService,
  requestStream: false,
  responseStream: false,
  requestType: puck_pb.PuckNoop,
  responseType: puck_pb.PuckButton
};

PuckService.getWeather = {
  methodName: "getWeather",
  service: PuckService,
  requestStream: false,
  responseStream: false,
  requestType: puck_pb.PuckNoop,
  responseType: puck_pb.PuckWeather
};

PuckService.streamWeather = {
  methodName: "streamWeather",
  service: PuckService,
  requestStream: false,
  responseStream: true,
  requestType: puck_pb.PuckNoop,
  responseType: puck_pb.PuckWeather
};

exports.PuckService = PuckService;

function PuckServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

PuckServiceClient.prototype.setLED = function setLED(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(PuckService.setLED, {
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

PuckServiceClient.prototype.isPressed = function isPressed(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(PuckService.isPressed, {
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

PuckServiceClient.prototype.getWeather = function getWeather(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(PuckService.getWeather, {
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

PuckServiceClient.prototype.streamWeather = function streamWeather(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(PuckService.streamWeather, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.PuckServiceClient = PuckServiceClient;

