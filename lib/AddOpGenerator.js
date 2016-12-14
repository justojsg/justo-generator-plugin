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
      asyncOp: {
        title: "Asynchronous operation?",
        type: "boolean",
        default: false
      }
    };
  }

  /**
   * @override
   */
  prompt() {
    this.input("name");
    this.confirm("asyncOp");
  }

  /**
   * @override
   */
  generate(answers) {
    this.template("lib/op.js", answers.name + ".js", answers);
    this.template("test/unit/lib/op.js", answers.name + ".js", {opName: answers.name, asyncOp: answers.asyncOp});
    this.append(
      "index.js",
      this.templateAsString("snippets/index-op.hbs", answers),
      {line: -2}
    );
    this.append(
      "test/unit/index.js",
      this.templateAsString("snippets/test-unit-index-op.hbs", answers),
      {line: -2}
    );
  }
}
