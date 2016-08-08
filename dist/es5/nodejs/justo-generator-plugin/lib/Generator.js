"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _path = require("path");var _path2 = _interopRequireDefault(_path);
var _justoGenerator = require("justo-generator");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var _class = function (_HandlebarsGenerator) {_inherits(_class, _HandlebarsGenerator);








  function _class(opts, responses) {_classCallCheck(this, _class);return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, 
    opts, responses));}_createClass(_class, [{ key: "preprompt", value: function preprompt() 






































    {
      var entries = this.getEntryNames(".").sort();

      if (!(entries.length === 0 || 
      entries.length == 1 && entries[0] == ".git" || 
      entries.length == 2 && entries[0] == ".git" && entries[1] == "README.md")) 
      {
        return "Destination dir is not empty.";}} }, { key: "prompt", value: function prompt(






    answers) {
      this.input("desc");
      this.input("homepage");
      if (this.input("author")) {
        this.input("authorEmail");
        this.input("authorHomepage");}

      if (this.input("contributor")) {
        this.input("contributorEmail");
        this.input("contributorUrl");}

      this.input("npmWho");
      if (this.list("type") == "simple") this.confirm({ name: "async", default: false });
      this.input("ns");
      if (this.input("gitUrl")) {
        var re = /http[s]:\/\/github\.com\/([^\/]+\/[^\/]+).git/;
        this.input({ name: "travisCi", default: "https://travis-ci.org/" + re.exec(answers.gitUrl)[1] });
        this.input({ name: "davidDm", default: "https://david-dm.org/" + re.exec(answers.gitUrl)[1] });}

      this.input("bugsHomepage");
      this.input("bugsEmail");} }, { key: "generate", value: function generate(





    answers) {
      if (!answers.opName) answers.opName = "op";

      if (answers.type === undefined || answers.type == "simple") {
        this.template("index.simple.js", "index.js", answers);
        this.template("test/unit/index.simple.js", "index.js", answers);
        this.template("lib/op.js", answers.opName + ".js", answers);
        this.template("test/unit/lib/op.js", answers.opName + ".js", answers);} else 
      if (answers.type === "composite") {
        this.template("index.composite.js", "index.js", answers);
        this.template("test/unit/index.composite.js", "index.js", answers);
        this.mkdir("lib");
        this.mkdir("test/unit/lib");} else 
      {
        throw new Error("Invalid plugin type: " + answers.type + ".");}


      this.copy("_editorconfig", ".editorconfig");
      this.copy("_gitignore", ".gitignore");
      this.copy("_jshintrc", ".jshintrc");
      this.template("_package.json", "package.json", answers);
      this.copy("_travis.yml", ".travis.yml");
      this.template("Justo.js", answers);
      this.template("README.md", answers);
      this.mkdir("test/unit/data");} }, { key: "desc", get: function get() {return "Generate the Justo.js plugin scaffold.";} }, { key: "params", get: function get() {return { type: { title: "Plugin type", choices: ["simple", "composite"] }, desc: "Plugin description", homepage: "Plugin homepage", author: "Author name", authorEmail: "Author email", authorHomepage: "Author homepage", contributor: "Contributor name", contributorEmail: "Contributor email", contributorUrl: "Contributor homepage", npmWho: "NPM username", bugsHomepage: "Bugs homepage", bugsEmail: "Bugs email", gitUrl: "Git repository URL", travisCi: "Travis CI", davidDm: "David DM", opName: "Operation name", async: "Async operation?", ns: "Plugin namespace" };} }]);return _class;}(_justoGenerator.HandlebarsGenerator);exports.default = _class;