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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MunroListView = __webpack_require__(/*! ./views/munros_list_view.js */ \"./src/views/munros_list_view.js\");\nconst Munro = __webpack_require__(/*! ./models/munros.js */ \"./src/models/munros.js\");\nconst MunroSelectView = __webpack_require__(/*! ./views/munro_select_view.js */ \"./src/views/munro_select_view.js\")\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  console.log('JavaScript Loaded');\n\n  const container = document.querySelector('#munros-container');\n  const munroListView = new MunroListView(container);\n  munroListView.bindEvents();\n\n  const dropDown = document.querySelector('#munro-regions');\n  munroSelectView = new MunroSelectView(dropDown);\n  munroSelectView.bindEvents();\n\n  const munros = new Munro();\n  munros.getData();\n\n});\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/helpers/pub_sub.js":
/*!********************************!*\
  !*** ./src/helpers/pub_sub.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const PubSub = {\n  publish: function (channel, payload) {\n    const event = new CustomEvent(channel, {\n      detail: payload\n    });\n    document.dispatchEvent(event);\n  },\n\n  subscribe: function (channel, callback) {\n    document.addEventListener(channel, callback);\n  }\n};\n\nmodule.exports = PubSub;\n\n\n//# sourceURL=webpack:///./src/helpers/pub_sub.js?");

/***/ }),

/***/ "./src/helpers/request_helper.js":
/*!***************************************!*\
  !*** ./src/helpers/request_helper.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const RequestHelper = function (url) {\n  this.url = url\n}\n\nRequestHelper.prototype.get = function () {\n  return fetch(this.url)\n    .then(response => response.json());\n};\n\nmodule.exports = RequestHelper;\n\n\n//# sourceURL=webpack:///./src/helpers/request_helper.js?");

/***/ }),

/***/ "./src/models/munros.js":
/*!******************************!*\
  !*** ./src/models/munros.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\nconst RequestHelper = __webpack_require__(/*! ../helpers/request_helper.js */ \"./src/helpers/request_helper.js\");\n\nconst Munros = function () {\n  this.munros = [];\n};\n\n\n\nMunros.prototype.getData = function () {\n  const requestHelper = new RequestHelper('https://munroapi.herokuapp.com/munros');\n  requestHelper.get()\n    .then( (data) => {\n      this.munros = data;\n      console.log(this.munros);\n      PubSub.publish('Munro:Ready', this.munros);\n      const regions = this.regions();\n      PubSub.publish('Munro:ReadyforDropdown', regions);\n    })\n    .catch( (err) => {\n      PubSub.publish('Munro:error', err);\n    });\n  };\n\nMunros.prototype.regions = function () {\n  return this.munros.map( munro => munro.region)\n  .filter((region, index, regions) => regions.indexOf(region) === index);\n};\n\nmodule.exports = Munros;\n\n\n//# sourceURL=webpack:///./src/models/munros.js?");

/***/ }),

/***/ "./src/views/munro_select_view.js":
/*!****************************************!*\
  !*** ./src/views/munro_select_view.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\nconst MunroView = __webpack_require__(/*! ./munro_view.js */ \"./src/views/munro_view.js\");\n\nconst MunroSelector = function (dropDown) {\n  this.dropDown = dropDown;\n}\n\nMunroSelector.prototype.bindEvents = function () {\n  PubSub.subscribe('Munro:ReadyforDropdown', (event) => {\n    // this.munros = event.detail;\n    console.log(event.detail);\n    // this.render();\n  })\n};\n\nMunroSelector.prototype.render = function () {\n  // for each unique region add option to select\n\n\n};\n\nmodule.exports = MunroSelector;\n\n\n//# sourceURL=webpack:///./src/views/munro_select_view.js?");

/***/ }),

/***/ "./src/views/munro_view.js":
/*!*********************************!*\
  !*** ./src/views/munro_view.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const MunroView = function(container, munro) {\nthis.container = container;\nthis.munro = munro;\n};\n\nMunroView.prototype.render = function () {\n  const munroContainer = document.createElement('div');\n  munroContainer.classList.add('mountain');\n\n  const heading = document.createElement('h1');\n  heading.classList.add('munro-name');\n  heading.textContent = `Munro: ${this.munro.name}`\n  this.container.appendChild(munroContainer);\n  munroContainer.appendChild(heading);\n};\n\nmodule.exports = MunroView;\n\n\n//# sourceURL=webpack:///./src/views/munro_view.js?");

/***/ }),

/***/ "./src/views/munros_list_view.js":
/*!***************************************!*\
  !*** ./src/views/munros_list_view.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\nconst MunroView = __webpack_require__(/*! ./munro_view.js */ \"./src/views/munro_view.js\");\n\nconst MunroListView = function (container) {\n  this.container = container;\n}\n\nMunroListView.prototype.bindEvents = function () {\n  PubSub.subscribe('Munro:Ready', (event) => {\n    this.munros = event.detail;\n    this.render();\n  })\n};\n\nMunroListView.prototype.render = function () {\n  this.munros.forEach( ( munro ) => {\n    const munroView = new MunroView(this.container, munro)\n    munroView.render();\n  });\n};\n\nmodule.exports = MunroListView;\n\n\n//# sourceURL=webpack:///./src/views/munros_list_view.js?");

/***/ })

/******/ });