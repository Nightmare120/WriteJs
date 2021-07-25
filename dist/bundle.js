(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tasks = require("./src/tasks");

var _tasks2 = _interopRequireDefault(_tasks);

var _cursor = require("./src/cursor");

var _cursor2 = _interopRequireDefault(_cursor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WriteJs = function WriteJs(element) {
    _classCallCheck(this, WriteJs);

    _initialiseProps.call(this);

    this.element = element;
    this.waiting = 1;
    this.tasks = new _tasks2.default();
    this.cursor = new _cursor2.default(null, this.element);
    this.cursor.addCursor(this.element);
    this.addImportantStyleToElement(element);
};

var _initialiseProps = function _initialiseProps() {
    var _this = this;

    this.delay = 1000;
    this.typingSpeed = 200;

    this.defaultValue = function (text) {
        Array.from(text).forEach(function (char) {
            var temp = document.createElement("span");
            temp.innerHTML = char;
            _this.element.insertBefore(temp, _this.cursor.cursor);
        });
    };

    this.addImportantStyleToElement = function () {
        var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.element;

        if (element.style.width.length === 0) {
            element.style.width = "90vw";
        }
        element.style.display = "flex";
        element.style.flexWrap = "wrap";
        element.style.boxSizing = "border-box";
    };

    this.clear = function () {
        var noOfTextToBeCleared = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        var text = _this.getText();
        if (!noOfTextToBeCleared) {
            noOfTextToBeCleared = text.length;
            _this.tasks.add("");
        } else {
            _this.tasks.add(text.slice(0, noOfTextToBeCleared * -1));
        }

        _this.do(function () {
            _this.clearText(noOfTextToBeCleared);
        });
        _this.addWaiting(noOfTextToBeCleared);
    };

    this.clearText = function (noOfTextToBeCleared) {
        var _loop = function _loop(index) {
            var taskEnd = index === noOfTextToBeCleared;
            setTimeout(function () {
                _this.clearChar();
                if (taskEnd) {
                    _this.handleTaskEnd();
                }
            }, _this.getSingleTextWritingTime(index));
        };

        for (var index = 1; index <= noOfTextToBeCleared; index++) {
            _loop(index);
        }
    };

    this.clearChar = function () {
        _this.element.removeChild(_this.cursor.previousElement());
        _this.cursor.updateStyle({ animationDuration: "0s" });
        _this.cursor.update();
    };

    this.getText = function () {
        if (!_this.tasks.empty()) {
            return _this.tasks.previousTask();
        }
        return _this.element.innerText;
    };

    this.write = function (text) {
        var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _this.tasks.add(_this.getText() + text);
        _this.do(function () {
            _this.addText(text, style);
        });
        _this.addWaiting(text.length);
    };

    this.addText = function (text) {
        var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        var _loop2 = function _loop2(index) {
            setTimeout(function () {
                _this.addChar(text[index], style);
                if (index + 1 === text.length) {
                    _this.handleTaskEnd();
                }
            }, _this.getSingleTextWritingTime(index));
        };

        for (var index = 0; index < text.length; index++) {
            _loop2(index);
        }
    };

    this.addChar = function (char) {
        var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var temp = document.createElement("span");
        if (style) {
            for (var key in style) {
                temp.style[key] = style[key];
            }
        }
        if (char === " ") {
            char = "&nbsp;";
        }
        _this.cursor.updateStyle({ animationDuration: "0s" });
        _this.cursor.update();
        temp.innerHTML = char;
        _this.element.insertBefore(temp, _this.cursor.cursor);
    };

    this.do = function (task) {
        var timeout = _this.getTimout();
        setTimeout(function () {
            task();
        }, timeout);
    };

    this.getTimout = function () {
        if (_this.waiting === 0) {
            return 1;
        }
        return _this.waiting;
    };

    this.addWaiting = function (len) {
        _this.waiting += len * _this.getAnimationCompleteTime() + _this.delay;
    };

    this.getAnimationCompleteTime = function () {
        return _this.typingSpeed + _this.typingSpeed * 20 / 100;
    };

    this.handleTaskEnd = function () {
        _this.tasks.remove();
        _this.handleWaiting();
        _this.cursor.updateStyle({ animationDuration: "0.7s" });
        _this.cursor.update();
    };

    this.handleWaiting = function () {
        if (_this.tasks.empty()) {
            _this.waiting = 1;
        }
    };

    this.getSingleTextWritingTime = function (textNo) {
        return _this.delay + textNo * _this.typingSpeed;
    };

    this.times = function () {
        var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
        var task = arguments[1];

        for (var i = 0; i < times; i++) {
            task();
        }
    };

    this.loop = function (task) {
        task();
        setInterval(function () {
            task();
        }, _this.getTimout());
    };

    this.update = function (toUpdate) {
        _this.do(function () {
            toUpdate();
            _this.cursor.update();
        });
    };
};

exports.default = WriteJs;


window.WriteJs = WriteJs;

},{"./src/cursor":2,"./src/tasks":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cursor = function Cursor() {
    var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var parentElement = arguments[1];

    _classCallCheck(this, Cursor);

    _initialiseProps.call(this);

    this.parentElement = parentElement;
    this.style = style ? style : this.style;
    this.style.height = this.getHeight();
    this.cursor = this.createCursor();
};

var _initialiseProps = function _initialiseProps() {
    var _this = this;

    this.style = {
        width: "2px",
        backgroundColor: "black",
        margin: "3px",
        marginBottom: "-4px",
        height: "20px",
        display: "inline-block",
        animationName: "fade",
        animationDuration: "0.7s",
        animationIterationCount: "infinite"
    };

    this.createCursor = function () {
        var cursor = document.createElement("span");
        _this.insertStyles(cursor);
        return cursor;
    };

    this.addCursor = function (element) {
        var cursor = _this.cursor;
        if (_this.cursor.style.display === "none") {
            cursor = _this.cursor = _this.createCursor();
        }
        element.appendChild(cursor);
    };

    this.updateStyle = function (style) {
        for (var key in style) {
            _this.style[key] = style[key];
        }
    };

    this.getHeight = function () {
        var style = window.getComputedStyle(_this.parentElement, null).getPropertyValue("font-size");
        var height = parseFloat(style);
        return height + "px";
    };

    this.hide = function () {
        _this.cursor.style.display = "none";
    };

    this.insertStyles = function (cursor) {
        for (var key in _this.style) {
            cursor.style[key] = _this.style[key];
        }
    };

    this.update = function () {
        _this.insertStyles(_this.cursor);
    };

    this.previousElement = function () {
        return _this.cursor.previousElementSibling;
    };

    this.nextElement = function () {
        return _this.cursor.nextElementSibling;
    };
};

exports.default = Cursor;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tasks = function Tasks() {
	var _this = this;

	_classCallCheck(this, Tasks);

	this.add = function (item) {
		_this.queue.push(item);
		_this.updateLen();
	};

	this.remove = function () {
		var newQueue = _this.queue.slice(1, _this.len);
		_this.queue = newQueue;
		_this.updateLen();
	};

	this.empty = function () {
		return _this.len === 0;
	};

	this.show = function () {
		console.log(_this.queue);
	};

	this.updateLen = function () {
		_this.len = _this.queue.length;
	};

	this.previousTask = function () {
		return _this.queue[_this.len - 1];
	};

	this.queue = [];
	this.len = this.queue.length;
};

exports.default = Tasks;

},{}]},{},[1]);
