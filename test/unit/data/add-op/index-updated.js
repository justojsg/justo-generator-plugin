//imports
import {simple} from "justo";

//internal data
const NS = "org.justo.plugin.testing";

module.exports = {
  get one() {
    if (!this._one) Object.defineProperty(this, "_one", {value: simple({ns: NS, name: "one"}, require("./lib/one").default)});
    return this._one;
  },
  get test() {
    if (!this._test) Object.defineProperty(this, "_test", {value: simple({ns: NS, name: "test"}, require("./lib/test").default)});
    return this._test;
  },
};
