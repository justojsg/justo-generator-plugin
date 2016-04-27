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
       name: "Operation name",
       async: {
         title: "Asynchronous operation?",
         type: "boolean"
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
    this.input("name");
    this.confirm({name: "async", default: false});
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
    this.template("lib/op.js", answers.name + ".js", answers);
    this.template("test/unit/lib/op.js", answers.name + ".js", {opName: answers.name, async: answers.async});
  }
}
