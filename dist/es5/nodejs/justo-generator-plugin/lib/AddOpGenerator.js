"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _justoGenerator = require("justo-generator");function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var _class = function (_HandlebarsGenerator) {_inherits(_class, _HandlebarsGenerator);








  function _class(opts, responses) {_classCallCheck(this, _class);return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this,
    opts, responses));
  }_createClass(_class, [{ key: "prompt", value: function prompt()
























    {
      this.input("name");
      this.confirm({ name: "async", default: false });
    } }, { key: "generate", value: function generate(




    answers) {
      this.template("lib/op.js", answers.name + ".js", answers);
      this.template("test/unit/lib/op.js", answers.name + ".js", { opName: answers.name, async: answers.async });
      this.append(
      "index.js",
      this.templateAsString("snippets/index-op.hbs", answers),
      { line: -2 });

      this.append(
      "test/unit/index.js",
      this.templateAsString("snippets/test-unit-index-op.hbs", answers),
      { line: -2 });

    } }, { key: "desc", get: function get() {return "Generate an operation.";} }, { key: "params", get: function get() {return { name: "Operation name", async: { title: "Asynchronous operation?", type: "boolean" } };} }]);return _class;}(_justoGenerator.HandlebarsGenerator);exports.default = _class;