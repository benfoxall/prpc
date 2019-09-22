// package: 
// file: meta.proto

var meta_pb = require("./meta_pb");
var common_pb = require("./common_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Meta = (function () {
  function Meta() {}
  Meta.serviceName = "Meta";
  return Meta;
}());

Meta.getPage = {
  methodName: "getPage",
  service: Meta,
  requestStream: false,
  responseStream: false,
  requestType: common_pb.Noop,
  responseType: meta_pb.Page
};

Meta.getPageChange = {
  methodName: "getPageChange",
  service: Meta,
  requestStream: false,
  responseStream: false,
  requestType: meta_pb.Page,
  responseType: meta_pb.Page
};

exports.Meta = Meta;

function MetaClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

MetaClient.prototype.getPage = function getPage(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Meta.getPage, {
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

MetaClient.prototype.getPageChange = function getPageChange(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Meta.getPageChange, {
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

exports.MetaClient = MetaClient;

