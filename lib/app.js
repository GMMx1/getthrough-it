'use strict';

require('dotenv/config');

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _peer = require('peer');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _enableCors = require('./middlewares/enableCors');

var _enableCors2 = _interopRequireDefault(_enableCors);

var _authentication = require('./routes/authentication');

var _authentication2 = _interopRequireDefault(_authentication);

var _v = require('./routes/v1');

var _v2 = _interopRequireDefault(_v);

var _config = require('./config');

var _peerUtils = require('./utils/peerUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var app = (0, _express2.default)();
var server = _http2.default.createServer(app);
var peerServer = (0, _peer.ExpressPeerServer)(server, { debug: true });

app.use(_bodyParser2.default.json());
app.use(_enableCors2.default);
app.use((0, _morgan2.default)('dev'));
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());
app.use((0, _expressSession2.default)({ resave: false, saveUninitialized: false, secret: _config.SECRET_KEY }));

app.use('/auth', _authentication2.default);
app.use.apply(app, ['/v1'].concat(_toConsumableArray(_v2.default)));
app.use('/peerjs', peerServer);

app.get('/health', function (req, res) {
  res.sendStatus(200);
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.sendStatus(500);
});

server.listen(_config.PORT, function () {
  console.log('App is running on port: ' + _config.PORT);
});

peerServer.on('connection', _peerUtils.connectPeer);
peerServer.on('disconnect', _peerUtils.disconnectPeer);