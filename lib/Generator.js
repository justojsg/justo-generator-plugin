//import
import path from "path";
import {Generator} from "justo-generator";

/**
 * Generator of the Justo.js file.
 */
export default class extends Generator {
  /**
   * Constructor.
   */
  constructor(opts, responses) {
    super(opts, responses);
  }

  /**
   * @override
   */
  help() {
    return {
      desc: "Generate the Justo.js plugin scaffold.",
      params: {
        type: "The plugin type: 'simple' or 'composite'"
      }
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
    //none
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
    this.template("_package.json", "package.json", {name: path.basename(process.cwd())});
    this.copy("_travis.yml", ".travis.yml");
    this.copy("Justo.js");
    this.copy("Justo.json");
    this.copy("README.md");
    this.copy("lib/op.js");
    this.copy("test/unit/index.js");
    this.copy("test/unit/lib/op.js");
    this.mkdir("test/unit/data");
  }
}