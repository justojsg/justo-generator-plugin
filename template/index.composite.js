//imports
import {simple} from "justo";

//internal data
const NS = "{{scope.ns}}";
var {{scope.opName}};

//api
module.exports = {
  get {{scope.opName}}() {
    if (!{{scope.opName}}) {{scope.opName}} = simple({ns: NS, name: "{{scope.opName}}"}, require("./lib/{{scope.opName}}").default);
    return {{scope.opName}};
  }
};
