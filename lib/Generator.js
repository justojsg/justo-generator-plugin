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
      contributor: "Contributor name",
      contributorEmail: "Contributor email",
      contributorUrl: "Contributor homepage",
      npmWho: "NPM username",
      bugsHomepage: "Bugs homepage",
      bugsEmail: "Bugs email",
      gitUrl: "Git repository URL",
      travisCi: "Travis CI",
      davidDm: "David DM",
      opName: "Operation name",
      ns: "Plugin namespace"
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
  preprompt() {
    var entries = this.getEntryNames(".").sort();

    if (!(entries.length === 0 ||
          (entries.length == 1 && entries[0] == ".git") ||
          (entries.length == 2 && entries[0] == ".git" && entries[1] == "README.md")
         )) {
      return "Destination dir is not empty.";
    }
  }

  /**
   * @override
   */
  prompt(answers) {
    this.input({name: "desc"});
    this.input({name: "homepage"});
    if (this.input({name: "author"})) {
      this.input({name: "authorEmail"});
      this.input({name: "authorHomepage"});
    }
    if (this.input("contributor")) {
      this.input("contributorEmail");
      this.input("contributorUrl");
    }
    this.input({name: "npmWho"});
    if (this.list({name: "type"}) == "composite") this.input({name: "opName"});
    this.input({name: "ns"});
    if (this.input("gitUrl")) {
      const re = /http[s]:\/\/github\.com\/([^\/]+\/[^\/]+).git/;
      this.input({name: "travisCi", default: "https://travis-ci.org/" + re.exec(answers.gitUrl)[1]});
      this.input({name: "davidDm", default: "https://david-dm.org/" + re.exec(answers.gitUrl)[1]});
    }
    this.input({name: "bugsHomepage"});
    this.input({name: "bugsEmail"});
  }

  /**
   * @override
   */
  pregenerate(answers) {

  }

  /**
   * @override
   */
  generate(answers) {
    if (!answers.opName) answers.opName = "op";

    if (answers.type === undefined || answers.type == "simple") {
      this.template("index.simple.js", "index.js", answers);
      this.template("test/unit/index.simple.js", "index.js", answers);
    } else if (answers.type === "composite") {
      this.template("index.composite.js", "index.js", answers);
      this.template("test/unit/index.composite.js", "index.js", answers);
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
    this.template("lib/op.js", answers.opName + ".js", answers);
    this.template("test/unit/lib/op.js", answers.opName + ".js", answers);
    this.mkdir("test/unit/data");
  }
}
