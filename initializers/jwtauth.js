var jsonwebtoken = require ('jsonwebtoken');
exports.jwtauth = function(api, next) {
  api.jwtauth = {
    processToken: function(token, success, fail) {
      jsonwebtoken.verify(token, api.config.jwtauth.secret, {}, function(err, data) {
        if(err) {
          fail(err);
        } else {
          success(data);
        }
      });
    },
    generateToken: function(data, success, fail, options) {
        options = options ? options : {};
        options.algorithm = api.config.jwtauth.algorithm;

        try {
        var token = jsonwebtoken.sign(data, api.config.jwtauth.secret, options);
        success(token);
      } catch(err) {
        fail(err);
      }
    }
  };
  next();
};