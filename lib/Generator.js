//import
import path from "path";
import {HandlebarsGenerator} from "justo-generator";

/**
 * Generator of the Justo.js file.
 */
export default class extends HandlebarsGenerator {
  /**
   * Constructor.
   */
  constructor(opts, responses) {
    super(opts, responses);
  }

  /**
   * @override
   */
  get desc() {
    return "Generate the Justo.js plugin scaffold.";
  }

  /**
   * @override
   */
  get params() {
    return {
      type: {title: "Plugin type", choices: ["simple", "composite"]},
      desc: "Plugin description",
      homepage: "Plugin homepage",
      author: "Author name",
      authorEmail: "Author email",
      authorHomepage: "Author homepage",
      npmWho: "NPM username",
      bugs: {title: "Configure bugs info", type: "Boolean"},
      bugsHomepage: "Bugs homepage",
      bugsEmail: "Bugs email",
      git: {title: "Configure Git repository", type: "Boolean"},
      gitUrl: "Git repository URL"
    };
  }

  /**
   * @override
   */
  init() {
    super.init();
  }

  /**
   * @override
   */
  fin() {
    super.fin();
  }

  /**
   * @override
   */
  prompt(answers) {
    this.input({name: "desc"});
    this.input({name: "homepage"});
    this.input({name: "author"});
    this.input({name: "authorEmail"});
    this.input({name: "authorHomepage"});
    this.input({name: "npmWho"});
    this.list({name: "type"});
    if (this.confirm({name: "git"})) this.input({name: "gitUrl"});
    if (this.confirm({name: "bugs"})) {
      this.input({name: "bugsHomepage"});
      this.input({name: "bugsEmail"});
    }
  }

  /**
   * @override
   */
  generate(answers) {
    if (answers.type === undefined || answers.type == "simple") {
      this.copy("index.simple.js", "index.js");
    } else if (answers.type === "composite") {
      this.copy("index.composite.js", "index.js");
    } else {
      throw new Error(`Invalid plugin type: ${answers.type}.`);
    }

    this.copy("_editorconfig", ".editorconfig");
    this.copy("_gitignore", ".gitignore");
    this.copy("_jshintrc", ".jshintrc");
    this.template("_package.json", "package.json", answers);
    this.copy("_travis.yml", ".travis.yml");
    this.template("Justo.js", answers);
    this.copy("Justo.json");
    this.template("README.md", answers);
    this.template("lib/op.js", {});
    this.template("test/unit/index.js");
    this.template("test/unit/lib/op.js", {opName: "op"});
    this.mkdir("test/unit/data");
  }
}
