//imports
import {simple} from "justo";

//internal data
const NS = "{{scope.ns}}";

//api
module.exports = simple({ns: NS, name: "{{replace dir.name 'justo-plugin-'}}"}, require("./lib/op").default);
