// package: 
// file: draw.proto

var draw_pb = require("./draw_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Draw = (function () {
  function Draw() {}
  Draw.serviceName = "Draw";
  return Draw;
}());

Draw.Line = {
  methodName: "Line",
  service: Draw,
  requestStream: false,
  responseStream: false,
  requestType: draw_pb.LineRequest,
  responseType: draw_pb.Throttle
};

Draw.Color = {
  methodName: "Color",
  service: Draw,
  requestStream: false,
  responseStream: false,
  requestType: draw_pb.ColorRequest,
  responseType: draw_pb.Noopp
};

exports.Draw = Draw;

function DrawClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

DrawClient.prototype.line = function line(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Draw.Line, {
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

DrawClient.prototype.color = function color(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Draw.Color, {
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

exports.DrawClient = DrawClient;

