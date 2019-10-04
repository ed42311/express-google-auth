/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const express = __webpack_require__(/*! express */ \"express\");\n\nconst passport = __webpack_require__(/*! passport */ \"passport\");\n\nconst serveStatic = __webpack_require__(/*! express-static-gzip */ \"express-static-gzip\");\n\nconst helmet = __webpack_require__(/*! helmet */ \"helmet\");\n\nconst session = __webpack_require__(/*! express-session */ \"express-session\"); // const pass = require('./passport')\n\n\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\nconst {\n  EXPRESS_SECRET\n} = process.env; // const auth = require('./auth')\n\nconst passportGoogle = __webpack_require__(/*! ./auth */ \"./src/auth.js\");\n\nconst app = express();\nconst router = express.Router();\napp.use(helmet());\napp.use(express.json());\napp.use(express.urlencoded({\n  extended: true\n}));\napp.use(session({\n  secret: EXPRESS_SECRET,\n  resave: true,\n  saveUninitialized: true\n}));\napp.use(passport.initialize()); // app.use(express.static(path.resolve(__dirname, '../react-ui/build')));\n\nrouter.use((req, res, next) => {\n  console.log(\"something is happening\");\n  next();\n});\nrouter.use('/', passportGoogle.authenticate('google', {\n  scope: 'https://www.google.com/m8/feeds'\n}));\nrouter.get('/google/callback', passportGoogle.authenticate('google', {\n  failureRedirect: '/login'\n}), function (req, res) {\n  res.redirect('/');\n});\nrouter.get('/login', function (req, res, next) {\n  res.render('login', {\n    title: 'Please Sign In with:'\n  });\n});\nrouter.get('/', (req, res) => {\n  res.status(200).send('ya got it!');\n});\napp.use(router);\nmodule.exports = app;\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/auth.js":
/*!*********************!*\
  !*** ./src/auth.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const passport = __webpack_require__(/*! passport */ \"passport\");\n\nconst GoogleStrategy = __webpack_require__(/*! passport-google-oauth */ \"passport-google-oauth\").OAuth2Strategy;\n\nconst {\n  GOOGLE_CLIENT_ID,\n  GOOGLE_CLIENT_SECRET,\n  ROOT_URL\n} = process.env;\npassport.use(new GoogleStrategy({\n  clientID: GOOGLE_CLIENT_ID,\n  clientSecret: GOOGLE_CLIENT_SECRET,\n  callbackURL: `${ROOT_URL}/google/callback`\n}, function (accessToken, refreshToken, profile, done) {\n  return done(profile.id);\n}));\nmodule.exports = passport;\n\n//# sourceURL=webpack:///./src/auth.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const app = __webpack_require__(/*! ./app */ \"./src/app.js\");\n\nconst {\n  NODE_ENV,\n  PORT\n} = process.env;\napp.listen(PORT, () => {\n  console.log(`Example app listening on port ${PORT}!`);\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-session\");\n\n//# sourceURL=webpack:///external_%22express-session%22?");

/***/ }),

/***/ "express-static-gzip":
/*!**************************************!*\
  !*** external "express-static-gzip" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-static-gzip\");\n\n//# sourceURL=webpack:///external_%22express-static-gzip%22?");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"helmet\");\n\n//# sourceURL=webpack:///external_%22helmet%22?");

/***/ }),

/***/ "passport":
/*!***************************!*\
  !*** external "passport" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport\");\n\n//# sourceURL=webpack:///external_%22passport%22?");

/***/ }),

/***/ "passport-google-oauth":
/*!****************************************!*\
  !*** external "passport-google-oauth" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-google-oauth\");\n\n//# sourceURL=webpack:///external_%22passport-google-oauth%22?");

/***/ })

/******/ });