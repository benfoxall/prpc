// package: 
// file: cameras.proto

var cameras_pb = require("./cameras_pb");
var common_pb = require("./common_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var CameraService = (function () {
  function CameraService() {}
  CameraService.serviceName = "CameraService";
  return CameraService;
}());

CameraService.PostPhoto = {
  methodName: "PostPhoto",
  service: CameraService,
  requestStream: false,
  responseStream: false,
  requestType: cameras_pb.Photo,
  responseType: common_pb.Noop
};

CameraService.Wait = {
  methodName: "Wait",
  service: CameraService,
  requestStream: false,
  responseStream: false,
  requestType: common_pb.Noop,
  responseType: common_pb.Noop
};

exports.CameraService = CameraService;

function CameraServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

CameraServiceClient.prototype.postPhoto = function postPhoto(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CameraService.PostPhoto, {
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

CameraServiceClient.prototype.wait = function wait(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(CameraService.Wait, {
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

exports.CameraServiceClient = CameraServiceClient;

