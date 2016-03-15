//import
import {HandlebarsGenerator} from "justo-generator";

/**
 * Generator.
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
    return "Generate an operation.";
  }

  /**
   * @override
   */
   get params() {
     return {
       name: "Operation name"
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
    this.input({name: "name"});
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
    this.copy("lib/op.js", answers.name + ".js");
    this.template("test/unit/lib/op.js", answers.name + ".js", {opName: answers.name});
  }
}
