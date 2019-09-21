// package: 
// file: zoom.proto

var zoom_pb = require("./zoom_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Zoom = (function () {
  function Zoom() {}
  Zoom.serviceName = "Zoom";
  return Zoom;
}());

Zoom.echo = {
  methodName: "echo",
  service: Zoom,
  requestStream: false,
  responseStream: false,
  requestType: zoom_pb.EchoMessage,
  responseType: zoom_pb.EchoMessage
};

Zoom.systemInfo = {
  methodName: "systemInfo",
  service: Zoom,
  requestStream: false,
  responseStream: true,
  requestType: zoom_pb.Noop,
  responseType: zoom_pb.SystemInfo
};

Zoom.screenShot = {
  methodName: "screenShot",
  service: Zoom,
  requestStream: false,
  responseStream: false,
  requestType: zoom_pb.Noop,
  responseType: zoom_pb.Image
};

Zoom.setColorScheme = {
  methodName: "setColorScheme",
  service: Zoom,
  requestStream: false,
  responseStream: false,
  requestType: zoom_pb.ColorSchemeRequest,
  responseType: zoom_pb.Noop
};

exports.Zoom = Zoom;

function ZoomClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ZoomClient.prototype.echo = function echo(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Zoom.echo, {
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

ZoomClient.prototype.systemInfo = function systemInfo(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Zoom.systemInfo, {
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

ZoomClient.prototype.screenShot = function screenShot(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Zoom.screenShot, {
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

ZoomClient.prototype.setColorScheme = function setColorScheme(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Zoom.setColorScheme, {
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

exports.ZoomClient = ZoomClient;

