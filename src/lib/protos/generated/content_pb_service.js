// package: 
// file: content.proto

var content_pb = require("./content_pb");
var common_pb = require("./common_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var ContentService = (function () {
  function ContentService() {}
  ContentService.serviceName = "ContentService";
  return ContentService;
}());

ContentService.Wait = {
  methodName: "Wait",
  service: ContentService,
  requestStream: false,
  responseStream: false,
  requestType: content_pb.ContentWait,
  responseType: content_pb.Content
};

ContentService.GetContent = {
  methodName: "GetContent",
  service: ContentService,
  requestStream: false,
  responseStream: false,
  requestType: common_pb.Noop,
  responseType: content_pb.Content
};

exports.ContentService = ContentService;

function ContentServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ContentServiceClient.prototype.wait = function wait(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ContentService.Wait, {
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

ContentServiceClient.prototype.getContent = function getContent(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ContentService.GetContent, {
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

exports.ContentServiceClient = ContentServiceClient;

