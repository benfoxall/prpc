// package: 
// file: bubble.proto

var bubble_pb = require("./bubble_pb");
var common_pb = require("./common_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var BubbleService = (function () {
  function BubbleService() {}
  BubbleService.serviceName = "BubbleService";
  return BubbleService;
}());

BubbleService.GetAll = {
  methodName: "GetAll",
  service: BubbleService,
  requestStream: false,
  responseStream: false,
  requestType: common_pb.Noop,
  responseType: bubble_pb.BubbleList
};

BubbleService.Pop = {
  methodName: "Pop",
  service: BubbleService,
  requestStream: false,
  responseStream: false,
  requestType: bubble_pb.Bubble,
  responseType: common_pb.Noop
};

BubbleService.Popped = {
  methodName: "Popped",
  service: BubbleService,
  requestStream: false,
  responseStream: true,
  requestType: common_pb.Noop,
  responseType: bubble_pb.Bubble
};

exports.BubbleService = BubbleService;

function BubbleServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

BubbleServiceClient.prototype.getAll = function getAll(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(BubbleService.GetAll, {
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

BubbleServiceClient.prototype.pop = function pop(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(BubbleService.Pop, {
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

BubbleServiceClient.prototype.popped = function popped(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(BubbleService.Popped, {
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

exports.BubbleServiceClient = BubbleServiceClient;

