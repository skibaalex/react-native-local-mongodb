exports.promisefy = function(Datastore, methodName) {
  var method = Datastore.prototype[methodName];

  return function() {
    var self = this;
    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    return new Promise(function(resolve, reject) {
      method.apply(
        self,
        args.concat([
          function(err, res) {
            var last = args[args.length - 1];
            if (typeof last === "function") {
              last(err, res);
            }

            if (err) return reject(err);
            resolve(res);
          }
        ])
      );
    });
  };
};
