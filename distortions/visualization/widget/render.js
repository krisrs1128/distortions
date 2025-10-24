var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
  mod2
));

// ../../../../../../node_modules/svd-js/build-umd/svd-js.min.js
var require_svd_js_min = __commonJS({
  "../../../../../../node_modules/svd-js/build-umd/svd-js.min.js"(exports, module) {
    !function(r, f) {
      "object" == typeof exports && "undefined" != typeof module ? f(exports) : "function" == typeof define && define.amd ? define(["exports"], f) : f((r = "undefined" != typeof globalThis ? globalThis : r || self).SVDJS = {});
    }(exports, function(r) {
      "use strict";
      r.SVD = function(r2, f, o, e, t) {
        if (f = void 0 === f || f, o = void 0 === o || o, t = 1e-64 / (e = e || Math.pow(2, -52)), !r2) throw new TypeError("Matrix a is not defined");
        var i, a, n, s, h, l, M, d, p, b, u, w, y = r2[0].length, q = r2.length;
        if (q < y) throw new TypeError("Invalid matrix: m < n");
        for (var v = [], c = [], x = [], g = "f" === f ? q : y, m = b = M = 0; m < q; m++) c[m] = new Array(g).fill(0);
        for (m = 0; m < y; m++) x[m] = new Array(y).fill(0);
        var S, T = new Array(y).fill(0);
        for (m = 0; m < q; m++) for (i = 0; i < y; i++) c[m][i] = r2[m][i];
        for (m = 0; m < y; m++) {
          for (v[m] = M, p = 0, n = m + 1, i = m; i < q; i++) p += Math.pow(c[i][m], 2);
          if (p < t) M = 0;
          else for (d = (l = c[m][m]) * (M = l < 0 ? Math.sqrt(p) : -Math.sqrt(p)) - p, c[m][m] = l - M, i = n; i < y; i++) {
            for (p = 0, a = m; a < q; a++) p += c[a][m] * c[a][i];
            for (l = p / d, a = m; a < q; a++) c[a][i] = c[a][i] + l * c[a][m];
          }
          for (T[m] = M, p = 0, i = n; i < y; i++) p += Math.pow(c[m][i], 2);
          if (p < t) M = 0;
          else {
            for (d = (l = c[m][m + 1]) * (M = l < 0 ? Math.sqrt(p) : -Math.sqrt(p)) - p, c[m][m + 1] = l - M, i = n; i < y; i++) v[i] = c[m][i] / d;
            for (i = n; i < q; i++) {
              for (p = 0, a = n; a < y; a++) p += c[i][a] * c[m][a];
              for (a = n; a < y; a++) c[i][a] = c[i][a] + p * v[a];
            }
          }
          b < (u = Math.abs(T[m]) + Math.abs(v[m])) && (b = u);
        }
        if (o) for (m = y - 1; 0 <= m; m--) {
          if (0 !== M) {
            for (d = c[m][m + 1] * M, i = n; i < y; i++) x[i][m] = c[m][i] / d;
            for (i = n; i < y; i++) {
              for (p = 0, a = n; a < y; a++) p += c[m][a] * x[a][i];
              for (a = n; a < y; a++) x[a][i] = x[a][i] + p * x[a][m];
            }
          }
          for (i = n; i < y; i++) x[m][i] = 0, x[i][m] = 0;
          x[m][m] = 1, M = v[m], n = m;
        }
        if (f) {
          if ("f" === f) for (m = y; m < q; m++) {
            for (i = y; i < q; i++) c[m][i] = 0;
            c[m][m] = 1;
          }
          for (m = y - 1; 0 <= m; m--) {
            for (n = m + 1, M = T[m], i = n; i < g; i++) c[m][i] = 0;
            if (0 !== M) {
              for (d = c[m][m] * M, i = n; i < g; i++) {
                for (p = 0, a = n; a < q; a++) p += c[a][m] * c[a][i];
                for (l = p / d, a = m; a < q; a++) c[a][i] = c[a][i] + l * c[a][m];
              }
              for (i = m; i < q; i++) c[i][m] = c[i][m] / M;
            } else for (i = m; i < q; i++) c[i][m] = 0;
            c[m][m] = c[m][m] + 1;
          }
        }
        for (e *= b, a = y - 1; 0 <= a; a--) for (var k = 0; k < 50; k++) {
          for (S = false, n = a; 0 <= n; n--) {
            if (Math.abs(v[n]) <= e) {
              S = true;
              break;
            }
            if (Math.abs(T[n - 1]) <= e) break;
          }
          if (!S) {
            for (h = 0, s = n - (p = 1), m = n; m < a + 1 && (l = p * v[m], v[m] = h * v[m], !(Math.abs(l) <= e)); m++) if (M = T[m], T[m] = Math.sqrt(l * l + M * M), h = M / (d = T[m]), p = -l / d, f) for (i = 0; i < q; i++) u = c[i][s], w = c[i][m], c[i][s] = u * h + w * p, c[i][m] = -u * p + w * h;
          }
          if (w = T[a], n === a) {
            if (w < 0 && (T[a] = -w, o)) for (i = 0; i < y; i++) x[i][a] = -x[i][a];
            break;
          }
          for (b = T[n], l = (((u = T[a - 1]) - w) * (u + w) + ((M = v[a - 1]) - (d = v[a])) * (M + d)) / (2 * d * u), M = Math.sqrt(l * l + 1), l = ((b - w) * (b + w) + d * (u / (l < 0 ? l - M : l + M) - d)) / b, m = n + (p = h = 1); m < a + 1; m++) {
            if (M = v[m], u = T[m], d = p * M, M *= h, w = Math.sqrt(l * l + d * d), l = b * (h = l / (v[m - 1] = w)) + M * (p = d / w), M = -b * p + M * h, d = u * p, u *= h, o) for (i = 0; i < y; i++) b = x[i][m - 1], w = x[i][m], x[i][m - 1] = b * h + w * p, x[i][m] = -b * p + w * h;
            if (w = Math.sqrt(l * l + d * d), l = (h = l / (T[m - 1] = w)) * M + (p = d / w) * u, b = -p * M + h * u, f) for (i = 0; i < q; i++) u = c[i][m - 1], w = c[i][m], c[i][m - 1] = u * h + w * p, c[i][m] = -u * p + w * h;
          }
          v[n] = 0, v[a] = l, T[a] = b;
        }
        for (m = 0; m < y; m++) T[m] < e && (T[m] = 0);
        return { u: c, q: T, v: x };
      }, r.VERSION = "1.1.1", Object.defineProperty(r, "__esModule", { value: true });
    });
  }
});

// ../../../../../../node_modules/typed-function/lib/umd/typed-function.js
var require_typed_function = __commonJS({
  "../../../../../../node_modules/typed-function/lib/umd/typed-function.js"(exports, module) {
    (function(global, factory2) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory2() : typeof define === "function" && define.amd ? define(factory2) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global["'typed'"] = factory2());
    })(exports, function() {
      "use strict";
      function ok() {
        return true;
      }
      function notOk() {
        return false;
      }
      function undef() {
        return void 0;
      }
      const NOT_TYPED_FUNCTION = "Argument is not a typed-function.";
      function create2() {
        function isPlainObject2(x) {
          return typeof x === "object" && x !== null && x.constructor === Object;
        }
        const _types = [{
          name: "number",
          test: function(x) {
            return typeof x === "number";
          }
        }, {
          name: "string",
          test: function(x) {
            return typeof x === "string";
          }
        }, {
          name: "boolean",
          test: function(x) {
            return typeof x === "boolean";
          }
        }, {
          name: "Function",
          test: function(x) {
            return typeof x === "function";
          }
        }, {
          name: "Array",
          test: Array.isArray
        }, {
          name: "Date",
          test: function(x) {
            return x instanceof Date;
          }
        }, {
          name: "RegExp",
          test: function(x) {
            return x instanceof RegExp;
          }
        }, {
          name: "Object",
          test: isPlainObject2
        }, {
          name: "null",
          test: function(x) {
            return x === null;
          }
        }, {
          name: "undefined",
          test: function(x) {
            return x === void 0;
          }
        }];
        const anyType = {
          name: "any",
          test: ok,
          isAny: true
        };
        let typeMap;
        let typeList;
        let nConversions = 0;
        let typed3 = {
          createCount: 0
        };
        function findType(typeName) {
          const type2 = typeMap.get(typeName);
          if (type2) {
            return type2;
          }
          let message = 'Unknown type "' + typeName + '"';
          const name43 = typeName.toLowerCase();
          let otherName;
          for (otherName of typeList) {
            if (otherName.toLowerCase() === name43) {
              message += '. Did you mean "' + otherName + '" ?';
              break;
            }
          }
          throw new TypeError(message);
        }
        function addTypes(types) {
          let beforeSpec = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "any";
          const beforeIndex = beforeSpec ? findType(beforeSpec).index : typeList.length;
          const newTypes = [];
          for (let i = 0; i < types.length; ++i) {
            if (!types[i] || typeof types[i].name !== "string" || typeof types[i].test !== "function") {
              throw new TypeError("Object with properties {name: string, test: function} expected");
            }
            const typeName = types[i].name;
            if (typeMap.has(typeName)) {
              throw new TypeError('Duplicate type name "' + typeName + '"');
            }
            newTypes.push(typeName);
            typeMap.set(typeName, {
              name: typeName,
              test: types[i].test,
              isAny: types[i].isAny,
              index: beforeIndex + i,
              conversionsTo: []
              // Newly added type can't have any conversions to it
            });
          }
          const affectedTypes = typeList.slice(beforeIndex);
          typeList = typeList.slice(0, beforeIndex).concat(newTypes).concat(affectedTypes);
          for (let i = beforeIndex + newTypes.length; i < typeList.length; ++i) {
            typeMap.get(typeList[i]).index = i;
          }
        }
        function clear() {
          typeMap = /* @__PURE__ */ new Map();
          typeList = [];
          nConversions = 0;
          addTypes([anyType], false);
        }
        clear();
        addTypes(_types);
        function clearConversions() {
          let typeName;
          for (typeName of typeList) {
            typeMap.get(typeName).conversionsTo = [];
          }
          nConversions = 0;
        }
        function findTypeNames(value) {
          const matches = typeList.filter((name43) => {
            const type2 = typeMap.get(name43);
            return !type2.isAny && type2.test(value);
          });
          if (matches.length) {
            return matches;
          }
          return ["any"];
        }
        function isTypedFunction(entity) {
          return entity && typeof entity === "function" && "_typedFunctionData" in entity;
        }
        function findSignature(fn, signature, options) {
          if (!isTypedFunction(fn)) {
            throw new TypeError(NOT_TYPED_FUNCTION);
          }
          const exact = options && options.exact;
          const stringSignature = Array.isArray(signature) ? signature.join(",") : signature;
          const params = parseSignature(stringSignature);
          const canonicalSignature = stringifyParams(params);
          if (!exact || canonicalSignature in fn.signatures) {
            const match = fn._typedFunctionData.signatureMap.get(canonicalSignature);
            if (match) {
              return match;
            }
          }
          const nParams = params.length;
          let remainingSignatures;
          if (exact) {
            remainingSignatures = [];
            let name43;
            for (name43 in fn.signatures) {
              remainingSignatures.push(fn._typedFunctionData.signatureMap.get(name43));
            }
          } else {
            remainingSignatures = fn._typedFunctionData.signatures;
          }
          for (let i = 0; i < nParams; ++i) {
            const want = params[i];
            const filteredSignatures = [];
            let possibility;
            for (possibility of remainingSignatures) {
              const have = getParamAtIndex(possibility.params, i);
              if (!have || want.restParam && !have.restParam) {
                continue;
              }
              if (!have.hasAny) {
                const haveTypes = paramTypeSet(have);
                if (want.types.some((wtype) => !haveTypes.has(wtype.name))) {
                  continue;
                }
              }
              filteredSignatures.push(possibility);
            }
            remainingSignatures = filteredSignatures;
            if (remainingSignatures.length === 0) break;
          }
          let candidate;
          for (candidate of remainingSignatures) {
            if (candidate.params.length <= nParams) {
              return candidate;
            }
          }
          throw new TypeError("Signature not found (signature: " + (fn.name || "unnamed") + "(" + stringifyParams(params, ", ") + "))");
        }
        function find2(fn, signature, options) {
          return findSignature(fn, signature, options).implementation;
        }
        function convert(value, typeName) {
          const type2 = findType(typeName);
          if (type2.test(value)) {
            return value;
          }
          const conversions = type2.conversionsTo;
          if (conversions.length === 0) {
            throw new Error("There are no conversions to " + typeName + " defined.");
          }
          for (let i = 0; i < conversions.length; i++) {
            const fromType = findType(conversions[i].from);
            if (fromType.test(value)) {
              return conversions[i].convert(value);
            }
          }
          throw new Error("Cannot convert " + value + " to " + typeName);
        }
        function stringifyParams(params) {
          let separator = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : ",";
          return params.map((p) => p.name).join(separator);
        }
        function parseParam(param) {
          const restParam = param.indexOf("...") === 0;
          const types = !restParam ? param : param.length > 3 ? param.slice(3) : "any";
          const typeDefs = types.split("|").map((s) => findType(s.trim()));
          let hasAny = false;
          let paramName = restParam ? "..." : "";
          const exactTypes = typeDefs.map(function(type2) {
            hasAny = type2.isAny || hasAny;
            paramName += type2.name + "|";
            return {
              name: type2.name,
              typeIndex: type2.index,
              test: type2.test,
              isAny: type2.isAny,
              conversion: null,
              conversionIndex: -1
            };
          });
          return {
            types: exactTypes,
            name: paramName.slice(0, -1),
            // remove trailing '|' from above
            hasAny,
            hasConversion: false,
            restParam
          };
        }
        function expandParam(param) {
          const typeNames = param.types.map((t) => t.name);
          const matchingConversions = availableConversions(typeNames);
          let hasAny = param.hasAny;
          let newName = param.name;
          const convertibleTypes = matchingConversions.map(function(conversion) {
            const type2 = findType(conversion.from);
            hasAny = type2.isAny || hasAny;
            newName += "|" + conversion.from;
            return {
              name: conversion.from,
              typeIndex: type2.index,
              test: type2.test,
              isAny: type2.isAny,
              conversion,
              conversionIndex: conversion.index
            };
          });
          return {
            types: param.types.concat(convertibleTypes),
            name: newName,
            hasAny,
            hasConversion: convertibleTypes.length > 0,
            restParam: param.restParam
          };
        }
        function paramTypeSet(param) {
          if (!param.typeSet) {
            param.typeSet = /* @__PURE__ */ new Set();
            param.types.forEach((type2) => param.typeSet.add(type2.name));
          }
          return param.typeSet;
        }
        function parseSignature(rawSignature) {
          const params = [];
          if (typeof rawSignature !== "string") {
            throw new TypeError("Signatures must be strings");
          }
          const signature = rawSignature.trim();
          if (signature === "") {
            return params;
          }
          const rawParams = signature.split(",");
          for (let i = 0; i < rawParams.length; ++i) {
            const parsedParam = parseParam(rawParams[i].trim());
            if (parsedParam.restParam && i !== rawParams.length - 1) {
              throw new SyntaxError('Unexpected rest parameter "' + rawParams[i] + '": only allowed for the last parameter');
            }
            if (parsedParam.types.length === 0) {
              return null;
            }
            params.push(parsedParam);
          }
          return params;
        }
        function hasRestParam(params) {
          const param = last(params);
          return param ? param.restParam : false;
        }
        function compileTest(param) {
          if (!param || param.types.length === 0) {
            return ok;
          } else if (param.types.length === 1) {
            return findType(param.types[0].name).test;
          } else if (param.types.length === 2) {
            const test0 = findType(param.types[0].name).test;
            const test1 = findType(param.types[1].name).test;
            return function or(x) {
              return test0(x) || test1(x);
            };
          } else {
            const tests = param.types.map(function(type2) {
              return findType(type2.name).test;
            });
            return function or(x) {
              for (let i = 0; i < tests.length; i++) {
                if (tests[i](x)) {
                  return true;
                }
              }
              return false;
            };
          }
        }
        function compileTests(params) {
          let tests, test0, test1;
          if (hasRestParam(params)) {
            tests = initial(params).map(compileTest);
            const varIndex = tests.length;
            const lastTest = compileTest(last(params));
            const testRestParam = function(args) {
              for (let i = varIndex; i < args.length; i++) {
                if (!lastTest(args[i])) {
                  return false;
                }
              }
              return true;
            };
            return function testArgs(args) {
              for (let i = 0; i < tests.length; i++) {
                if (!tests[i](args[i])) {
                  return false;
                }
              }
              return testRestParam(args) && args.length >= varIndex + 1;
            };
          } else {
            if (params.length === 0) {
              return function testArgs(args) {
                return args.length === 0;
              };
            } else if (params.length === 1) {
              test0 = compileTest(params[0]);
              return function testArgs(args) {
                return test0(args[0]) && args.length === 1;
              };
            } else if (params.length === 2) {
              test0 = compileTest(params[0]);
              test1 = compileTest(params[1]);
              return function testArgs(args) {
                return test0(args[0]) && test1(args[1]) && args.length === 2;
              };
            } else {
              tests = params.map(compileTest);
              return function testArgs(args) {
                for (let i = 0; i < tests.length; i++) {
                  if (!tests[i](args[i])) {
                    return false;
                  }
                }
                return args.length === tests.length;
              };
            }
          }
        }
        function getParamAtIndex(params, index) {
          return index < params.length ? params[index] : hasRestParam(params) ? last(params) : null;
        }
        function getTypeSetAtIndex(params, index) {
          const param = getParamAtIndex(params, index);
          if (!param) {
            return /* @__PURE__ */ new Set();
          }
          return paramTypeSet(param);
        }
        function isExactType(type2) {
          return type2.conversion === null || type2.conversion === void 0;
        }
        function mergeExpectedParams(signatures, index) {
          const typeSet = /* @__PURE__ */ new Set();
          signatures.forEach((signature) => {
            const paramSet = getTypeSetAtIndex(signature.params, index);
            let name43;
            for (name43 of paramSet) {
              typeSet.add(name43);
            }
          });
          return typeSet.has("any") ? ["any"] : Array.from(typeSet);
        }
        function createError(name43, args, signatures) {
          let err, expected;
          const _name = name43 || "unnamed";
          let matchingSignatures = signatures;
          let index;
          for (index = 0; index < args.length; index++) {
            const nextMatchingDefs = [];
            matchingSignatures.forEach((signature) => {
              const param = getParamAtIndex(signature.params, index);
              const test = compileTest(param);
              if ((index < signature.params.length || hasRestParam(signature.params)) && test(args[index])) {
                nextMatchingDefs.push(signature);
              }
            });
            if (nextMatchingDefs.length === 0) {
              expected = mergeExpectedParams(matchingSignatures, index);
              if (expected.length > 0) {
                const actualTypes = findTypeNames(args[index]);
                err = new TypeError("Unexpected type of argument in function " + _name + " (expected: " + expected.join(" or ") + ", actual: " + actualTypes.join(" | ") + ", index: " + index + ")");
                err.data = {
                  category: "wrongType",
                  fn: _name,
                  index,
                  actual: actualTypes,
                  expected
                };
                return err;
              }
            } else {
              matchingSignatures = nextMatchingDefs;
            }
          }
          const lengths = matchingSignatures.map(function(signature) {
            return hasRestParam(signature.params) ? Infinity : signature.params.length;
          });
          if (args.length < Math.min.apply(null, lengths)) {
            expected = mergeExpectedParams(matchingSignatures, index);
            err = new TypeError("Too few arguments in function " + _name + " (expected: " + expected.join(" or ") + ", index: " + args.length + ")");
            err.data = {
              category: "tooFewArgs",
              fn: _name,
              index: args.length,
              expected
            };
            return err;
          }
          const maxLength = Math.max.apply(null, lengths);
          if (args.length > maxLength) {
            err = new TypeError("Too many arguments in function " + _name + " (expected: " + maxLength + ", actual: " + args.length + ")");
            err.data = {
              category: "tooManyArgs",
              fn: _name,
              index: args.length,
              expectedLength: maxLength
            };
            return err;
          }
          const argTypes = [];
          for (let i = 0; i < args.length; ++i) {
            argTypes.push(findTypeNames(args[i]).join("|"));
          }
          err = new TypeError('Arguments of type "' + argTypes.join(", ") + '" do not match any of the defined signatures of function ' + _name + ".");
          err.data = {
            category: "mismatch",
            actual: argTypes
          };
          return err;
        }
        function getLowestTypeIndex(param) {
          let min3 = typeList.length + 1;
          for (let i = 0; i < param.types.length; i++) {
            if (isExactType(param.types[i])) {
              min3 = Math.min(min3, param.types[i].typeIndex);
            }
          }
          return min3;
        }
        function getLowestConversionIndex(param) {
          let min3 = nConversions + 1;
          for (let i = 0; i < param.types.length; i++) {
            if (!isExactType(param.types[i])) {
              min3 = Math.min(min3, param.types[i].conversionIndex);
            }
          }
          return min3;
        }
        function compareParams(param1, param2) {
          if (param1.hasAny) {
            if (!param2.hasAny) {
              return 1;
            }
          } else if (param2.hasAny) {
            return -1;
          }
          if (param1.restParam) {
            if (!param2.restParam) {
              return 1;
            }
          } else if (param2.restParam) {
            return -1;
          }
          if (param1.hasConversion) {
            if (!param2.hasConversion) {
              return 1;
            }
          } else if (param2.hasConversion) {
            return -1;
          }
          const typeDiff = getLowestTypeIndex(param1) - getLowestTypeIndex(param2);
          if (typeDiff < 0) {
            return -1;
          }
          if (typeDiff > 0) {
            return 1;
          }
          const convDiff = getLowestConversionIndex(param1) - getLowestConversionIndex(param2);
          if (convDiff < 0) {
            return -1;
          }
          if (convDiff > 0) {
            return 1;
          }
          return 0;
        }
        function compareSignatures(signature1, signature2) {
          const pars1 = signature1.params;
          const pars2 = signature2.params;
          const last1 = last(pars1);
          const last2 = last(pars2);
          const hasRest1 = hasRestParam(pars1);
          const hasRest2 = hasRestParam(pars2);
          if (hasRest1 && last1.hasAny) {
            if (!hasRest2 || !last2.hasAny) {
              return 1;
            }
          } else if (hasRest2 && last2.hasAny) {
            return -1;
          }
          let any1 = 0;
          let conv1 = 0;
          let par;
          for (par of pars1) {
            if (par.hasAny) ++any1;
            if (par.hasConversion) ++conv1;
          }
          let any2 = 0;
          let conv2 = 0;
          for (par of pars2) {
            if (par.hasAny) ++any2;
            if (par.hasConversion) ++conv2;
          }
          if (any1 !== any2) {
            return any1 - any2;
          }
          if (hasRest1 && last1.hasConversion) {
            if (!hasRest2 || !last2.hasConversion) {
              return 1;
            }
          } else if (hasRest2 && last2.hasConversion) {
            return -1;
          }
          if (conv1 !== conv2) {
            return conv1 - conv2;
          }
          if (hasRest1) {
            if (!hasRest2) {
              return 1;
            }
          } else if (hasRest2) {
            return -1;
          }
          const lengthCriterion = (pars1.length - pars2.length) * (hasRest1 ? -1 : 1);
          if (lengthCriterion !== 0) {
            return lengthCriterion;
          }
          const comparisons = [];
          let tc = 0;
          for (let i = 0; i < pars1.length; ++i) {
            const thisComparison = compareParams(pars1[i], pars2[i]);
            comparisons.push(thisComparison);
            tc += thisComparison;
          }
          if (tc !== 0) {
            return tc;
          }
          let c;
          for (c of comparisons) {
            if (c !== 0) {
              return c;
            }
          }
          return 0;
        }
        function availableConversions(typeNames) {
          if (typeNames.length === 0) {
            return [];
          }
          const types = typeNames.map(findType);
          if (typeNames.length > 1) {
            types.sort((t1, t2) => t1.index - t2.index);
          }
          let matches = types[0].conversionsTo;
          if (typeNames.length === 1) {
            return matches;
          }
          matches = matches.concat([]);
          const knownTypes = new Set(typeNames);
          for (let i = 1; i < types.length; ++i) {
            let newMatch;
            for (newMatch of types[i].conversionsTo) {
              if (!knownTypes.has(newMatch.from)) {
                matches.push(newMatch);
                knownTypes.add(newMatch.from);
              }
            }
          }
          return matches;
        }
        function compileArgsPreprocessing(params, fn) {
          let fnConvert = fn;
          if (params.some((p) => p.hasConversion)) {
            const restParam = hasRestParam(params);
            const compiledConversions = params.map(compileArgConversion);
            fnConvert = function convertArgs() {
              const args = [];
              const last2 = restParam ? arguments.length - 1 : arguments.length;
              for (let i = 0; i < last2; i++) {
                args[i] = compiledConversions[i](arguments[i]);
              }
              if (restParam) {
                args[last2] = arguments[last2].map(compiledConversions[last2]);
              }
              return fn.apply(this, args);
            };
          }
          let fnPreprocess = fnConvert;
          if (hasRestParam(params)) {
            const offset = params.length - 1;
            fnPreprocess = function preprocessRestParams() {
              return fnConvert.apply(this, slice(arguments, 0, offset).concat([slice(arguments, offset)]));
            };
          }
          return fnPreprocess;
        }
        function compileArgConversion(param) {
          let test0, test1, conversion0, conversion1;
          const tests = [];
          const conversions = [];
          param.types.forEach(function(type2) {
            if (type2.conversion) {
              tests.push(findType(type2.conversion.from).test);
              conversions.push(type2.conversion.convert);
            }
          });
          switch (conversions.length) {
            case 0:
              return function convertArg(arg) {
                return arg;
              };
            case 1:
              test0 = tests[0];
              conversion0 = conversions[0];
              return function convertArg(arg) {
                if (test0(arg)) {
                  return conversion0(arg);
                }
                return arg;
              };
            case 2:
              test0 = tests[0];
              test1 = tests[1];
              conversion0 = conversions[0];
              conversion1 = conversions[1];
              return function convertArg(arg) {
                if (test0(arg)) {
                  return conversion0(arg);
                }
                if (test1(arg)) {
                  return conversion1(arg);
                }
                return arg;
              };
            default:
              return function convertArg(arg) {
                for (let i = 0; i < conversions.length; i++) {
                  if (tests[i](arg)) {
                    return conversions[i](arg);
                  }
                }
                return arg;
              };
          }
        }
        function splitParams(params) {
          function _splitParams(params2, index, paramsSoFar) {
            if (index < params2.length) {
              const param = params2[index];
              let resultingParams = [];
              if (param.restParam) {
                const exactTypes = param.types.filter(isExactType);
                if (exactTypes.length < param.types.length) {
                  resultingParams.push({
                    types: exactTypes,
                    name: "..." + exactTypes.map((t) => t.name).join("|"),
                    hasAny: exactTypes.some((t) => t.isAny),
                    hasConversion: false,
                    restParam: true
                  });
                }
                resultingParams.push(param);
              } else {
                resultingParams = param.types.map(function(type2) {
                  return {
                    types: [type2],
                    name: type2.name,
                    hasAny: type2.isAny,
                    hasConversion: type2.conversion,
                    restParam: false
                  };
                });
              }
              return flatMap(resultingParams, function(nextParam) {
                return _splitParams(params2, index + 1, paramsSoFar.concat([nextParam]));
              });
            } else {
              return [paramsSoFar];
            }
          }
          return _splitParams(params, 0, []);
        }
        function conflicting(params1, params2) {
          const ii = Math.max(params1.length, params2.length);
          for (let i = 0; i < ii; i++) {
            const typeSet1 = getTypeSetAtIndex(params1, i);
            const typeSet2 = getTypeSetAtIndex(params2, i);
            let overlap = false;
            let name43;
            for (name43 of typeSet2) {
              if (typeSet1.has(name43)) {
                overlap = true;
                break;
              }
            }
            if (!overlap) {
              return false;
            }
          }
          const len1 = params1.length;
          const len2 = params2.length;
          const restParam1 = hasRestParam(params1);
          const restParam2 = hasRestParam(params2);
          return restParam1 ? restParam2 ? len1 === len2 : len2 >= len1 : restParam2 ? len1 >= len2 : len1 === len2;
        }
        function clearResolutions(functionList) {
          return functionList.map((fn) => {
            if (isReferToSelf(fn)) {
              return referToSelf(fn.referToSelf.callback);
            }
            if (isReferTo(fn)) {
              return makeReferTo(fn.referTo.references, fn.referTo.callback);
            }
            return fn;
          });
        }
        function collectResolutions(references, functionList, signatureMap) {
          const resolvedReferences = [];
          let reference;
          for (reference of references) {
            let resolution = signatureMap[reference];
            if (typeof resolution !== "number") {
              throw new TypeError('No definition for referenced signature "' + reference + '"');
            }
            resolution = functionList[resolution];
            if (typeof resolution !== "function") {
              return false;
            }
            resolvedReferences.push(resolution);
          }
          return resolvedReferences;
        }
        function resolveReferences(functionList, signatureMap, self2) {
          const resolvedFunctions = clearResolutions(functionList);
          const isResolved = new Array(resolvedFunctions.length).fill(false);
          let leftUnresolved = true;
          while (leftUnresolved) {
            leftUnresolved = false;
            let nothingResolved = true;
            for (let i = 0; i < resolvedFunctions.length; ++i) {
              if (isResolved[i]) continue;
              const fn = resolvedFunctions[i];
              if (isReferToSelf(fn)) {
                resolvedFunctions[i] = fn.referToSelf.callback(self2);
                resolvedFunctions[i].referToSelf = fn.referToSelf;
                isResolved[i] = true;
                nothingResolved = false;
              } else if (isReferTo(fn)) {
                const resolvedReferences = collectResolutions(fn.referTo.references, resolvedFunctions, signatureMap);
                if (resolvedReferences) {
                  resolvedFunctions[i] = fn.referTo.callback.apply(this, resolvedReferences);
                  resolvedFunctions[i].referTo = fn.referTo;
                  isResolved[i] = true;
                  nothingResolved = false;
                } else {
                  leftUnresolved = true;
                }
              }
            }
            if (nothingResolved && leftUnresolved) {
              throw new SyntaxError("Circular reference detected in resolving typed.referTo");
            }
          }
          return resolvedFunctions;
        }
        function validateDeprecatedThis(signaturesMap) {
          const deprecatedThisRegex = /\bthis(\(|\.signatures\b)/;
          Object.keys(signaturesMap).forEach((signature) => {
            const fn = signaturesMap[signature];
            if (deprecatedThisRegex.test(fn.toString())) {
              throw new SyntaxError("Using `this` to self-reference a function is deprecated since typed-function@3. Use typed.referTo and typed.referToSelf instead.");
            }
          });
        }
        function createTypedFunction(name43, rawSignaturesMap) {
          typed3.createCount++;
          if (Object.keys(rawSignaturesMap).length === 0) {
            throw new SyntaxError("No signatures provided");
          }
          if (typed3.warnAgainstDeprecatedThis) {
            validateDeprecatedThis(rawSignaturesMap);
          }
          const parsedParams = [];
          const originalFunctions = [];
          const signaturesMap = {};
          const preliminarySignatures = [];
          let signature;
          for (signature in rawSignaturesMap) {
            if (!Object.prototype.hasOwnProperty.call(rawSignaturesMap, signature)) {
              continue;
            }
            const params = parseSignature(signature);
            if (!params) continue;
            parsedParams.forEach(function(pp) {
              if (conflicting(pp, params)) {
                throw new TypeError('Conflicting signatures "' + stringifyParams(pp) + '" and "' + stringifyParams(params) + '".');
              }
            });
            parsedParams.push(params);
            const functionIndex = originalFunctions.length;
            originalFunctions.push(rawSignaturesMap[signature]);
            const conversionParams = params.map(expandParam);
            let sp;
            for (sp of splitParams(conversionParams)) {
              const spName = stringifyParams(sp);
              preliminarySignatures.push({
                params: sp,
                name: spName,
                fn: functionIndex
              });
              if (sp.every((p) => !p.hasConversion)) {
                signaturesMap[spName] = functionIndex;
              }
            }
          }
          preliminarySignatures.sort(compareSignatures);
          const resolvedFunctions = resolveReferences(originalFunctions, signaturesMap, theTypedFn);
          let s;
          for (s in signaturesMap) {
            if (Object.prototype.hasOwnProperty.call(signaturesMap, s)) {
              signaturesMap[s] = resolvedFunctions[signaturesMap[s]];
            }
          }
          const signatures = [];
          const internalSignatureMap = /* @__PURE__ */ new Map();
          for (s of preliminarySignatures) {
            if (!internalSignatureMap.has(s.name)) {
              s.fn = resolvedFunctions[s.fn];
              signatures.push(s);
              internalSignatureMap.set(s.name, s);
            }
          }
          const ok0 = signatures[0] && signatures[0].params.length <= 2 && !hasRestParam(signatures[0].params);
          const ok1 = signatures[1] && signatures[1].params.length <= 2 && !hasRestParam(signatures[1].params);
          const ok2 = signatures[2] && signatures[2].params.length <= 2 && !hasRestParam(signatures[2].params);
          const ok3 = signatures[3] && signatures[3].params.length <= 2 && !hasRestParam(signatures[3].params);
          const ok4 = signatures[4] && signatures[4].params.length <= 2 && !hasRestParam(signatures[4].params);
          const ok5 = signatures[5] && signatures[5].params.length <= 2 && !hasRestParam(signatures[5].params);
          const allOk = ok0 && ok1 && ok2 && ok3 && ok4 && ok5;
          for (let i = 0; i < signatures.length; ++i) {
            signatures[i].test = compileTests(signatures[i].params);
          }
          const test00 = ok0 ? compileTest(signatures[0].params[0]) : notOk;
          const test10 = ok1 ? compileTest(signatures[1].params[0]) : notOk;
          const test20 = ok2 ? compileTest(signatures[2].params[0]) : notOk;
          const test30 = ok3 ? compileTest(signatures[3].params[0]) : notOk;
          const test40 = ok4 ? compileTest(signatures[4].params[0]) : notOk;
          const test50 = ok5 ? compileTest(signatures[5].params[0]) : notOk;
          const test01 = ok0 ? compileTest(signatures[0].params[1]) : notOk;
          const test11 = ok1 ? compileTest(signatures[1].params[1]) : notOk;
          const test21 = ok2 ? compileTest(signatures[2].params[1]) : notOk;
          const test31 = ok3 ? compileTest(signatures[3].params[1]) : notOk;
          const test41 = ok4 ? compileTest(signatures[4].params[1]) : notOk;
          const test51 = ok5 ? compileTest(signatures[5].params[1]) : notOk;
          for (let i = 0; i < signatures.length; ++i) {
            signatures[i].implementation = compileArgsPreprocessing(signatures[i].params, signatures[i].fn);
          }
          const fn0 = ok0 ? signatures[0].implementation : undef;
          const fn1 = ok1 ? signatures[1].implementation : undef;
          const fn2 = ok2 ? signatures[2].implementation : undef;
          const fn3 = ok3 ? signatures[3].implementation : undef;
          const fn4 = ok4 ? signatures[4].implementation : undef;
          const fn5 = ok5 ? signatures[5].implementation : undef;
          const len0 = ok0 ? signatures[0].params.length : -1;
          const len1 = ok1 ? signatures[1].params.length : -1;
          const len2 = ok2 ? signatures[2].params.length : -1;
          const len3 = ok3 ? signatures[3].params.length : -1;
          const len4 = ok4 ? signatures[4].params.length : -1;
          const len5 = ok5 ? signatures[5].params.length : -1;
          const iStart = allOk ? 6 : 0;
          const iEnd = signatures.length;
          const tests = signatures.map((s2) => s2.test);
          const fns = signatures.map((s2) => s2.implementation);
          const generic = function generic2() {
            for (let i = iStart; i < iEnd; i++) {
              if (tests[i](arguments)) {
                return fns[i].apply(this, arguments);
              }
            }
            return typed3.onMismatch(name43, arguments, signatures);
          };
          function theTypedFn(arg0, arg1) {
            if (arguments.length === len0 && test00(arg0) && test01(arg1)) {
              return fn0.apply(this, arguments);
            }
            if (arguments.length === len1 && test10(arg0) && test11(arg1)) {
              return fn1.apply(this, arguments);
            }
            if (arguments.length === len2 && test20(arg0) && test21(arg1)) {
              return fn2.apply(this, arguments);
            }
            if (arguments.length === len3 && test30(arg0) && test31(arg1)) {
              return fn3.apply(this, arguments);
            }
            if (arguments.length === len4 && test40(arg0) && test41(arg1)) {
              return fn4.apply(this, arguments);
            }
            if (arguments.length === len5 && test50(arg0) && test51(arg1)) {
              return fn5.apply(this, arguments);
            }
            return generic.apply(this, arguments);
          }
          try {
            Object.defineProperty(theTypedFn, "name", {
              value: name43
            });
          } catch (err) {
          }
          theTypedFn.signatures = signaturesMap;
          theTypedFn._typedFunctionData = {
            signatures,
            signatureMap: internalSignatureMap
          };
          return theTypedFn;
        }
        function _onMismatch(name43, args, signatures) {
          throw createError(name43, args, signatures);
        }
        function initial(arr) {
          return slice(arr, 0, arr.length - 1);
        }
        function last(arr) {
          return arr[arr.length - 1];
        }
        function slice(arr, start2, end) {
          return Array.prototype.slice.call(arr, start2, end);
        }
        function findInArray(arr, test) {
          for (let i = 0; i < arr.length; i++) {
            if (test(arr[i])) {
              return arr[i];
            }
          }
          return void 0;
        }
        function flatMap(arr, callback) {
          return Array.prototype.concat.apply([], arr.map(callback));
        }
        function referTo() {
          const references = initial(arguments).map((s) => stringifyParams(parseSignature(s)));
          const callback = last(arguments);
          if (typeof callback !== "function") {
            throw new TypeError("Callback function expected as last argument");
          }
          return makeReferTo(references, callback);
        }
        function makeReferTo(references, callback) {
          return {
            referTo: {
              references,
              callback
            }
          };
        }
        function referToSelf(callback) {
          if (typeof callback !== "function") {
            throw new TypeError("Callback function expected as first argument");
          }
          return {
            referToSelf: {
              callback
            }
          };
        }
        function isReferTo(objectOrFn) {
          return objectOrFn && typeof objectOrFn.referTo === "object" && Array.isArray(objectOrFn.referTo.references) && typeof objectOrFn.referTo.callback === "function";
        }
        function isReferToSelf(objectOrFn) {
          return objectOrFn && typeof objectOrFn.referToSelf === "object" && typeof objectOrFn.referToSelf.callback === "function";
        }
        function checkName(nameSoFar, newName) {
          if (!nameSoFar) {
            return newName;
          }
          if (newName && newName !== nameSoFar) {
            const err = new Error("Function names do not match (expected: " + nameSoFar + ", actual: " + newName + ")");
            err.data = {
              actual: newName,
              expected: nameSoFar
            };
            throw err;
          }
          return nameSoFar;
        }
        function getObjectName(obj) {
          let name43;
          for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key) && (isTypedFunction(obj[key]) || typeof obj[key].signature === "string")) {
              name43 = checkName(name43, obj[key].name);
            }
          }
          return name43;
        }
        function mergeSignatures(dest, source) {
          let key;
          for (key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              if (key in dest) {
                if (source[key] !== dest[key]) {
                  const err = new Error('Signature "' + key + '" is defined twice');
                  err.data = {
                    signature: key,
                    sourceFunction: source[key],
                    destFunction: dest[key]
                  };
                  throw err;
                }
              }
              dest[key] = source[key];
            }
          }
        }
        const saveTyped = typed3;
        typed3 = function(maybeName) {
          const named2 = typeof maybeName === "string";
          const start2 = named2 ? 1 : 0;
          let name43 = named2 ? maybeName : "";
          const allSignatures = {};
          for (let i = start2; i < arguments.length; ++i) {
            const item = arguments[i];
            let theseSignatures = {};
            let thisName;
            if (typeof item === "function") {
              thisName = item.name;
              if (typeof item.signature === "string") {
                theseSignatures[item.signature] = item;
              } else if (isTypedFunction(item)) {
                theseSignatures = item.signatures;
              }
            } else if (isPlainObject2(item)) {
              theseSignatures = item;
              if (!named2) {
                thisName = getObjectName(item);
              }
            }
            if (Object.keys(theseSignatures).length === 0) {
              const err = new TypeError("Argument to 'typed' at index " + i + " is not a (typed) function, nor an object with signatures as keys and functions as values.");
              err.data = {
                index: i,
                argument: item
              };
              throw err;
            }
            if (!named2) {
              name43 = checkName(name43, thisName);
            }
            mergeSignatures(allSignatures, theseSignatures);
          }
          return createTypedFunction(name43 || "", allSignatures);
        };
        typed3.create = create2;
        typed3.createCount = saveTyped.createCount;
        typed3.onMismatch = _onMismatch;
        typed3.throwMismatchError = _onMismatch;
        typed3.createError = createError;
        typed3.clear = clear;
        typed3.clearConversions = clearConversions;
        typed3.addTypes = addTypes;
        typed3._findType = findType;
        typed3.referTo = referTo;
        typed3.referToSelf = referToSelf;
        typed3.convert = convert;
        typed3.findSignature = findSignature;
        typed3.find = find2;
        typed3.isTypedFunction = isTypedFunction;
        typed3.warnAgainstDeprecatedThis = true;
        typed3.addType = function(type2, beforeObjectTest) {
          let before = "any";
          if (beforeObjectTest !== false && typeMap.has("Object")) {
            before = "Object";
          }
          typed3.addTypes([type2], before);
        };
        function _validateConversion(conversion) {
          if (!conversion || typeof conversion.from !== "string" || typeof conversion.to !== "string" || typeof conversion.convert !== "function") {
            throw new TypeError("Object with properties {from: string, to: string, convert: function} expected");
          }
          if (conversion.to === conversion.from) {
            throw new SyntaxError('Illegal to define conversion from "' + conversion.from + '" to itself.');
          }
        }
        typed3.addConversion = function(conversion) {
          let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
            override: false
          };
          _validateConversion(conversion);
          const to = findType(conversion.to);
          const existing = to.conversionsTo.find((other) => other.from === conversion.from);
          if (existing) {
            if (options && options.override) {
              typed3.removeConversion({
                from: existing.from,
                to: conversion.to,
                convert: existing.convert
              });
            } else {
              throw new Error('There is already a conversion from "' + conversion.from + '" to "' + to.name + '"');
            }
          }
          to.conversionsTo.push({
            from: conversion.from,
            convert: conversion.convert,
            index: nConversions++
          });
        };
        typed3.addConversions = function(conversions, options) {
          conversions.forEach((conversion) => typed3.addConversion(conversion, options));
        };
        typed3.removeConversion = function(conversion) {
          _validateConversion(conversion);
          const to = findType(conversion.to);
          const existingConversion = findInArray(to.conversionsTo, (c) => c.from === conversion.from);
          if (!existingConversion) {
            throw new Error("Attempt to remove nonexistent conversion from " + conversion.from + " to " + conversion.to);
          }
          if (existingConversion.convert !== conversion.convert) {
            throw new Error("Conversion to remove does not match existing conversion");
          }
          const index = to.conversionsTo.indexOf(existingConversion);
          to.conversionsTo.splice(index, 1);
        };
        typed3.resolve = function(tf, argList) {
          if (!isTypedFunction(tf)) {
            throw new TypeError(NOT_TYPED_FUNCTION);
          }
          const sigs = tf._typedFunctionData.signatures;
          for (let i = 0; i < sigs.length; ++i) {
            if (sigs[i].test(argList)) {
              return sigs[i];
            }
          }
          return null;
        };
        return typed3;
      }
      var typedFunction2 = create2();
      return typedFunction2;
    });
  }
});

// ../../../../../../node_modules/d3-array/src/ascending.js
function ascending(a, b) {
  return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

// ../../../../../../node_modules/d3-array/src/descending.js
function descending(a, b) {
  return a == null || b == null ? NaN : b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}

// ../../../../../../node_modules/d3-array/src/bisector.js
function bisector(f) {
  let compare1, compare2, delta;
  if (f.length !== 2) {
    compare1 = ascending;
    compare2 = (d, x) => ascending(f(d), x);
    delta = (d, x) => f(d) - x;
  } else {
    compare1 = f === ascending || f === descending ? f : zero;
    compare2 = f;
    delta = f;
  }
  function left2(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = lo + hi >>> 1;
        if (compare2(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }
  function right2(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = lo + hi >>> 1;
        if (compare2(a[mid], x) <= 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }
  function center2(a, x, lo = 0, hi = a.length) {
    const i = left2(a, x, lo, hi - 1);
    return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
  }
  return { left: left2, center: center2, right: right2 };
}
function zero() {
  return 0;
}

// ../../../../../../node_modules/d3-array/src/number.js
function number(x) {
  return x === null ? NaN : +x;
}

// ../../../../../../node_modules/d3-array/src/bisect.js
var ascendingBisect = bisector(ascending);
var bisectRight = ascendingBisect.right;
var bisectLeft = ascendingBisect.left;
var bisectCenter = bisector(number).center;
var bisect_default = bisectRight;

// ../../../../../../node_modules/d3-array/src/extent.js
function extent(values, valueof) {
  let min3;
  let max4;
  if (valueof === void 0) {
    for (const value of values) {
      if (value != null) {
        if (min3 === void 0) {
          if (value >= value) min3 = max4 = value;
        } else {
          if (min3 > value) min3 = value;
          if (max4 < value) max4 = value;
        }
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null) {
        if (min3 === void 0) {
          if (value >= value) min3 = max4 = value;
        } else {
          if (min3 > value) min3 = value;
          if (max4 < value) max4 = value;
        }
      }
    }
  }
  return [min3, max4];
}

// ../../../../../../node_modules/internmap/src/index.js
var InternMap = class extends Map {
  constructor(entries, key = keyof) {
    super();
    Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: key } });
    if (entries != null) for (const [key2, value] of entries) this.set(key2, value);
  }
  get(key) {
    return super.get(intern_get(this, key));
  }
  has(key) {
    return super.has(intern_get(this, key));
  }
  set(key, value) {
    return super.set(intern_set(this, key), value);
  }
  delete(key) {
    return super.delete(intern_delete(this, key));
  }
};
function intern_get({ _intern, _key }, value) {
  const key = _key(value);
  return _intern.has(key) ? _intern.get(key) : value;
}
function intern_set({ _intern, _key }, value) {
  const key = _key(value);
  if (_intern.has(key)) return _intern.get(key);
  _intern.set(key, value);
  return value;
}
function intern_delete({ _intern, _key }, value) {
  const key = _key(value);
  if (_intern.has(key)) {
    value = _intern.get(key);
    _intern.delete(key);
  }
  return value;
}
function keyof(value) {
  return value !== null && typeof value === "object" ? value.valueOf() : value;
}

// ../../../../../../node_modules/d3-array/src/ticks.js
var e10 = Math.sqrt(50);
var e5 = Math.sqrt(10);
var e2 = Math.sqrt(2);
function tickSpec(start2, stop, count) {
  const step = (stop - start2) / Math.max(0, count), power = Math.floor(Math.log10(step)), error = step / Math.pow(10, power), factor = error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1;
  let i1, i2, inc;
  if (power < 0) {
    inc = Math.pow(10, -power) / factor;
    i1 = Math.round(start2 * inc);
    i2 = Math.round(stop * inc);
    if (i1 / inc < start2) ++i1;
    if (i2 / inc > stop) --i2;
    inc = -inc;
  } else {
    inc = Math.pow(10, power) * factor;
    i1 = Math.round(start2 / inc);
    i2 = Math.round(stop / inc);
    if (i1 * inc < start2) ++i1;
    if (i2 * inc > stop) --i2;
  }
  if (i2 < i1 && 0.5 <= count && count < 2) return tickSpec(start2, stop, count * 2);
  return [i1, i2, inc];
}
function ticks(start2, stop, count) {
  stop = +stop, start2 = +start2, count = +count;
  if (!(count > 0)) return [];
  if (start2 === stop) return [start2];
  const reverse = stop < start2, [i1, i2, inc] = reverse ? tickSpec(stop, start2, count) : tickSpec(start2, stop, count);
  if (!(i2 >= i1)) return [];
  const n = i2 - i1 + 1, ticks2 = new Array(n);
  if (reverse) {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks2[i] = (i2 - i) / -inc;
    else for (let i = 0; i < n; ++i) ticks2[i] = (i2 - i) * inc;
  } else {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks2[i] = (i1 + i) / -inc;
    else for (let i = 0; i < n; ++i) ticks2[i] = (i1 + i) * inc;
  }
  return ticks2;
}
function tickIncrement(start2, stop, count) {
  stop = +stop, start2 = +start2, count = +count;
  return tickSpec(start2, stop, count)[2];
}
function tickStep(start2, stop, count) {
  stop = +stop, start2 = +start2, count = +count;
  const reverse = stop < start2, inc = reverse ? tickIncrement(stop, start2, count) : tickIncrement(start2, stop, count);
  return (reverse ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
}

// ../../../../../../node_modules/d3-array/src/max.js
function max(values, valueof) {
  let max4;
  if (valueof === void 0) {
    for (const value of values) {
      if (value != null && (max4 < value || max4 === void 0 && value >= value)) {
        max4 = value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (max4 < value || max4 === void 0 && value >= value)) {
        max4 = value;
      }
    }
  }
  return max4;
}

// ../../../../../../node_modules/d3-array/src/range.js
function range(start2, stop, step) {
  start2 = +start2, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start2, start2 = 0, 1) : n < 3 ? 1 : +step;
  var i = -1, n = Math.max(0, Math.ceil((stop - start2) / step)) | 0, range2 = new Array(n);
  while (++i < n) {
    range2[i] = start2 + i * step;
  }
  return range2;
}

// ../../../../../../node_modules/d3-array/src/sum.js
function sum(values, valueof) {
  let sum3 = 0;
  if (valueof === void 0) {
    for (let value of values) {
      if (value = +value) {
        sum3 += value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if (value = +valueof(value, ++index, values)) {
        sum3 += value;
      }
    }
  }
  return sum3;
}

// ../../../../../../node_modules/d3-axis/src/identity.js
function identity_default(x) {
  return x;
}

// ../../../../../../node_modules/d3-axis/src/axis.js
var top = 1;
var right = 2;
var bottom = 3;
var left = 4;
var epsilon = 1e-6;
function translateX(x) {
  return "translate(" + x + ",0)";
}
function translateY(y) {
  return "translate(0," + y + ")";
}
function number2(scale) {
  return (d) => +scale(d);
}
function center(scale, offset) {
  offset = Math.max(0, scale.bandwidth() - offset * 2) / 2;
  if (scale.round()) offset = Math.round(offset);
  return (d) => +scale(d) + offset;
}
function entering() {
  return !this.__axis;
}
function axis(orient, scale) {
  var tickArguments = [], tickValues = null, tickFormat2 = null, tickSizeInner = 6, tickSizeOuter = 6, tickPadding = 3, offset = typeof window !== "undefined" && window.devicePixelRatio > 1 ? 0 : 0.5, k = orient === top || orient === left ? -1 : 1, x = orient === left || orient === right ? "x" : "y", transform2 = orient === top || orient === bottom ? translateX : translateY;
  function axis2(context) {
    var values = tickValues == null ? scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain() : tickValues, format5 = tickFormat2 == null ? scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity_default : tickFormat2, spacing = Math.max(tickSizeInner, 0) + tickPadding, range2 = scale.range(), range0 = +range2[0] + offset, range1 = +range2[range2.length - 1] + offset, position = (scale.bandwidth ? center : number2)(scale.copy(), offset), selection2 = context.selection ? context.selection() : context, path = selection2.selectAll(".domain").data([null]), tick = selection2.selectAll(".tick").data(values, scale).order(), tickExit = tick.exit(), tickEnter = tick.enter().append("g").attr("class", "tick"), line = tick.select("line"), text = tick.select("text");
    path = path.merge(path.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor"));
    tick = tick.merge(tickEnter);
    line = line.merge(tickEnter.append("line").attr("stroke", "currentColor").attr(x + "2", k * tickSizeInner));
    text = text.merge(tickEnter.append("text").attr("fill", "currentColor").attr(x, k * spacing).attr("dy", orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));
    if (context !== selection2) {
      path = path.transition(context);
      tick = tick.transition(context);
      line = line.transition(context);
      text = text.transition(context);
      tickExit = tickExit.transition(context).attr("opacity", epsilon).attr("transform", function(d) {
        return isFinite(d = position(d)) ? transform2(d + offset) : this.getAttribute("transform");
      });
      tickEnter.attr("opacity", epsilon).attr("transform", function(d) {
        var p = this.parentNode.__axis;
        return transform2((p && isFinite(p = p(d)) ? p : position(d)) + offset);
      });
    }
    tickExit.remove();
    path.attr("d", orient === left || orient === right ? tickSizeOuter ? "M" + k * tickSizeOuter + "," + range0 + "H" + offset + "V" + range1 + "H" + k * tickSizeOuter : "M" + offset + "," + range0 + "V" + range1 : tickSizeOuter ? "M" + range0 + "," + k * tickSizeOuter + "V" + offset + "H" + range1 + "V" + k * tickSizeOuter : "M" + range0 + "," + offset + "H" + range1);
    tick.attr("opacity", 1).attr("transform", function(d) {
      return transform2(position(d) + offset);
    });
    line.attr(x + "2", k * tickSizeInner);
    text.attr(x, k * spacing).text(format5);
    selection2.filter(entering).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", orient === right ? "start" : orient === left ? "end" : "middle");
    selection2.each(function() {
      this.__axis = position;
    });
  }
  axis2.scale = function(_) {
    return arguments.length ? (scale = _, axis2) : scale;
  };
  axis2.ticks = function() {
    return tickArguments = Array.from(arguments), axis2;
  };
  axis2.tickArguments = function(_) {
    return arguments.length ? (tickArguments = _ == null ? [] : Array.from(_), axis2) : tickArguments.slice();
  };
  axis2.tickValues = function(_) {
    return arguments.length ? (tickValues = _ == null ? null : Array.from(_), axis2) : tickValues && tickValues.slice();
  };
  axis2.tickFormat = function(_) {
    return arguments.length ? (tickFormat2 = _, axis2) : tickFormat2;
  };
  axis2.tickSize = function(_) {
    return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis2) : tickSizeInner;
  };
  axis2.tickSizeInner = function(_) {
    return arguments.length ? (tickSizeInner = +_, axis2) : tickSizeInner;
  };
  axis2.tickSizeOuter = function(_) {
    return arguments.length ? (tickSizeOuter = +_, axis2) : tickSizeOuter;
  };
  axis2.tickPadding = function(_) {
    return arguments.length ? (tickPadding = +_, axis2) : tickPadding;
  };
  axis2.offset = function(_) {
    return arguments.length ? (offset = +_, axis2) : offset;
  };
  return axis2;
}
function axisBottom(scale) {
  return axis(bottom, scale);
}
function axisLeft(scale) {
  return axis(left, scale);
}

// ../../../../../../node_modules/d3-dispatch/src/dispatch.js
var noop = { value: () => {
} };
function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}
function Dispatch(_) {
  this._ = _;
}
function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name43 = "", i = t.indexOf(".");
    if (i >= 0) name43 = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return { type: t, name: name43 };
  });
}
Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._, T = parseTypenames(typename + "", _), t, i = -1, n = T.length;
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
      return;
    }
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
    }
    return this;
  },
  copy: function() {
    var copy2 = {}, _ = this._;
    for (var t in _) copy2[t] = _[t].slice();
    return new Dispatch(copy2);
  },
  call: function(type2, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type2)) throw new Error("unknown type: " + type2);
    for (t = this._[type2], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type2, that, args) {
    if (!this._.hasOwnProperty(type2)) throw new Error("unknown type: " + type2);
    for (var t = this._[type2], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};
function get(type2, name43) {
  for (var i = 0, n = type2.length, c; i < n; ++i) {
    if ((c = type2[i]).name === name43) {
      return c.value;
    }
  }
}
function set(type2, name43, callback) {
  for (var i = 0, n = type2.length; i < n; ++i) {
    if (type2[i].name === name43) {
      type2[i] = noop, type2 = type2.slice(0, i).concat(type2.slice(i + 1));
      break;
    }
  }
  if (callback != null) type2.push({ name: name43, value: callback });
  return type2;
}
var dispatch_default = dispatch;

// ../../../../../../node_modules/d3-selection/src/namespaces.js
var xhtml = "http://www.w3.org/1999/xhtml";
var namespaces_default = {
  svg: "http://www.w3.org/2000/svg",
  xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

// ../../../../../../node_modules/d3-selection/src/namespace.js
function namespace_default(name43) {
  var prefix = name43 += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name43.slice(0, i)) !== "xmlns") name43 = name43.slice(i + 1);
  return namespaces_default.hasOwnProperty(prefix) ? { space: namespaces_default[prefix], local: name43 } : name43;
}

// ../../../../../../node_modules/d3-selection/src/creator.js
function creatorInherit(name43) {
  return function() {
    var document2 = this.ownerDocument, uri = this.namespaceURI;
    return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name43) : document2.createElementNS(uri, name43);
  };
}
function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
function creator_default(name43) {
  var fullname = namespace_default(name43);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}

// ../../../../../../node_modules/d3-selection/src/selector.js
function none() {
}
function selector_default(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}

// ../../../../../../node_modules/d3-selection/src/selection/select.js
function select_default(select2) {
  if (typeof select2 !== "function") select2 = selector_default(select2);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select2.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }
  return new Selection(subgroups, this._parents);
}

// ../../../../../../node_modules/d3-selection/src/array.js
function array(x) {
  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}

// ../../../../../../node_modules/d3-selection/src/selectorAll.js
function empty() {
  return [];
}
function selectorAll_default(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}

// ../../../../../../node_modules/d3-selection/src/selection/selectAll.js
function arrayAll(select2) {
  return function() {
    return array(select2.apply(this, arguments));
  };
}
function selectAll_default(select2) {
  if (typeof select2 === "function") select2 = arrayAll(select2);
  else select2 = selectorAll_default(select2);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select2.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }
  return new Selection(subgroups, parents);
}

// ../../../../../../node_modules/d3-selection/src/matcher.js
function matcher_default(selector) {
  return function() {
    return this.matches(selector);
  };
}
function childMatcher(selector) {
  return function(node) {
    return node.matches(selector);
  };
}

// ../../../../../../node_modules/d3-selection/src/selection/selectChild.js
var find = Array.prototype.find;
function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}
function childFirst() {
  return this.firstElementChild;
}
function selectChild_default(match) {
  return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
}

// ../../../../../../node_modules/d3-selection/src/selection/selectChildren.js
var filter = Array.prototype.filter;
function children() {
  return Array.from(this.children);
}
function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}
function selectChildren_default(match) {
  return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}

// ../../../../../../node_modules/d3-selection/src/selection/filter.js
function filter_default(match) {
  if (typeof match !== "function") match = matcher_default(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Selection(subgroups, this._parents);
}

// ../../../../../../node_modules/d3-selection/src/selection/sparse.js
function sparse_default(update) {
  return new Array(update.length);
}

// ../../../../../../node_modules/d3-selection/src/selection/enter.js
function enter_default() {
  return new Selection(this._enter || this._groups.map(sparse_default), this._parents);
}
function EnterNode(parent, datum2) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum2;
}
EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function(child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function(selector) {
    return this._parent.querySelector(selector);
  },
  querySelectorAll: function(selector) {
    return this._parent.querySelectorAll(selector);
  }
};

// ../../../../../../node_modules/d3-selection/src/constant.js
function constant_default(x) {
  return function() {
    return x;
  };
}

// ../../../../../../node_modules/d3-selection/src/selection/data.js
function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0, node, groupLength = group.length, dataLength = data.length;
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}
function bindKey(parent, group, enter, update, exit, data, key) {
  var i, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
      exit[i] = node;
    }
  }
}
function datum(node) {
  return node.__data__;
}
function data_default(value, key) {
  if (!arguments.length) return Array.from(this, datum);
  var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
  if (typeof value !== "function") value = constant_default(value);
  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j], group = groups[j], groupLength = group.length, data = arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength) ;
        previous._next = next || null;
      }
    }
  }
  update = new Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}
function arraylike(data) {
  return typeof data === "object" && "length" in data ? data : Array.from(data);
}

// ../../../../../../node_modules/d3-selection/src/selection/exit.js
function exit_default() {
  return new Selection(this._exit || this._groups.map(sparse_default), this._parents);
}

// ../../../../../../node_modules/d3-selection/src/selection/join.js
function join_default(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter) enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update) update = update.selection();
  }
  if (onexit == null) exit.remove();
  else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

// ../../../../../../node_modules/d3-selection/src/selection/merge.js
function merge_default(context) {
  var selection2 = context.selection ? context.selection() : context;
  for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Selection(merges, this._parents);
}

// ../../../../../../node_modules/d3-selection/src/selection/order.js
function order_default() {
  for (var groups = this._groups, j = -1, m = groups.length; ++j < m; ) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0; ) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
}

// ../../../../../../node_modules/d3-selection/src/selection/sort.js
function sort_default(compare) {
  if (!compare) compare = ascending2;
  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }
  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }
  return new Selection(sortgroups, this._parents).order();
}
function ascending2(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

// ../../../../../../node_modules/d3-selection/src/selection/call.js
function call_default() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

// ../../../../../../node_modules/d3-selection/src/selection/nodes.js
function nodes_default() {
  return Array.from(this);
}

// ../../../../../../node_modules/d3-selection/src/selection/node.js
function node_default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }
  return null;
}

// ../../../../../../node_modules/d3-selection/src/selection/size.js
function size_default() {
  let size2 = 0;
  for (const node of this) ++size2;
  return size2;
}

// ../../../../../../node_modules/d3-selection/src/selection/empty.js
function empty_default() {
  return !this.node();
}

// ../../../../../../node_modules/d3-selection/src/selection/each.js
function each_default(callback) {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }
  return this;
}

// ../../../../../../node_modules/d3-selection/src/selection/attr.js
function attrRemove(name43) {
  return function() {
    this.removeAttribute(name43);
  };
}
function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name43, value) {
  return function() {
    this.setAttribute(name43, value);
  };
}
function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function attrFunction(name43, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name43);
    else this.setAttribute(name43, v);
  };
}
function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}
function attr_default(name43, value) {
  var fullname = namespace_default(name43);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
}

// ../../../../../../node_modules/d3-selection/src/window.js
function window_default(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}

// ../../../../../../node_modules/d3-selection/src/selection/style.js
function styleRemove(name43) {
  return function() {
    this.style.removeProperty(name43);
  };
}
function styleConstant(name43, value, priority) {
  return function() {
    this.style.setProperty(name43, value, priority);
  };
}
function styleFunction(name43, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name43);
    else this.style.setProperty(name43, v, priority);
  };
}
function style_default(name43, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name43, value, priority == null ? "" : priority)) : styleValue(this.node(), name43);
}
function styleValue(node, name43) {
  return node.style.getPropertyValue(name43) || window_default(node).getComputedStyle(node, null).getPropertyValue(name43);
}

// ../../../../../../node_modules/d3-selection/src/selection/property.js
function propertyRemove(name43) {
  return function() {
    delete this[name43];
  };
}
function propertyConstant(name43, value) {
  return function() {
    this[name43] = value;
  };
}
function propertyFunction(name43, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name43];
    else this[name43] = v;
  };
}
function property_default(name43, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name43, value)) : this.node()[name43];
}

// ../../../../../../node_modules/d3-selection/src/selection/classed.js
function classArray(string) {
  return string.trim().split(/^|\s+/);
}
function classList(node) {
  return node.classList || new ClassList(node);
}
function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
  add: function(name43) {
    var i = this._names.indexOf(name43);
    if (i < 0) {
      this._names.push(name43);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name43) {
    var i = this._names.indexOf(name43);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name43) {
    return this._names.indexOf(name43) >= 0;
  }
};
function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}
function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}
function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}
function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}
function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}
function classed_default(name43, value) {
  var names = classArray(name43 + "");
  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}

// ../../../../../../node_modules/d3-selection/src/selection/text.js
function textRemove() {
  this.textContent = "";
}
function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}
function text_default(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
}

// ../../../../../../node_modules/d3-selection/src/selection/html.js
function htmlRemove() {
  this.innerHTML = "";
}
function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}
function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}
function html_default(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}

// ../../../../../../node_modules/d3-selection/src/selection/raise.js
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}
function raise_default() {
  return this.each(raise);
}

// ../../../../../../node_modules/d3-selection/src/selection/lower.js
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function lower_default() {
  return this.each(lower);
}

// ../../../../../../node_modules/d3-selection/src/selection/append.js
function append_default(name43) {
  var create2 = typeof name43 === "function" ? name43 : creator_default(name43);
  return this.select(function() {
    return this.appendChild(create2.apply(this, arguments));
  });
}

// ../../../../../../node_modules/d3-selection/src/selection/insert.js
function constantNull() {
  return null;
}
function insert_default(name43, before) {
  var create2 = typeof name43 === "function" ? name43 : creator_default(name43), select2 = before == null ? constantNull : typeof before === "function" ? before : selector_default(before);
  return this.select(function() {
    return this.insertBefore(create2.apply(this, arguments), select2.apply(this, arguments) || null);
  });
}

// ../../../../../../node_modules/d3-selection/src/selection/remove.js
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}
function remove_default() {
  return this.each(remove);
}

// ../../../../../../node_modules/d3-selection/src/selection/clone.js
function selection_cloneShallow() {
  var clone4 = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone4, this.nextSibling) : clone4;
}
function selection_cloneDeep() {
  var clone4 = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone4, this.nextSibling) : clone4;
}
function clone_default(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}

// ../../../../../../node_modules/d3-selection/src/selection/datum.js
function datum_default(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}

// ../../../../../../node_modules/d3-selection/src/selection/on.js
function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}
function parseTypenames2(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name43 = "", i = t.indexOf(".");
    if (i >= 0) name43 = t.slice(i + 1), t = t.slice(0, i);
    return { type: t, name: name43 };
  });
}
function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}
function onAdd(typename, value, options) {
  return function() {
    var on = this.__on, o, listener = contextListener(value);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o = { type: typename.type, name: typename.name, value, listener, options };
    if (!on) this.__on = [o];
    else on.push(o);
  };
}
function on_default(typename, value, options) {
  var typenames = parseTypenames2(typename + ""), i, n = typenames.length, t;
  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }
  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
  return this;
}

// ../../../../../../node_modules/d3-selection/src/selection/dispatch.js
function dispatchEvent(node, type2, params) {
  var window2 = window_default(node), event = window2.CustomEvent;
  if (typeof event === "function") {
    event = new event(type2, params);
  } else {
    event = window2.document.createEvent("Event");
    if (params) event.initEvent(type2, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type2, false, false);
  }
  node.dispatchEvent(event);
}
function dispatchConstant(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params);
  };
}
function dispatchFunction(type2, params) {
  return function() {
    return dispatchEvent(this, type2, params.apply(this, arguments));
  };
}
function dispatch_default2(type2, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type2, params));
}

// ../../../../../../node_modules/d3-selection/src/selection/iterator.js
function* iterator_default() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) yield node;
    }
  }
}

// ../../../../../../node_modules/d3-selection/src/selection/index.js
var root = [null];
function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}
function selection() {
  return new Selection([[document.documentElement]], root);
}
function selection_selection() {
  return this;
}
Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: select_default,
  selectAll: selectAll_default,
  selectChild: selectChild_default,
  selectChildren: selectChildren_default,
  filter: filter_default,
  data: data_default,
  enter: enter_default,
  exit: exit_default,
  join: join_default,
  merge: merge_default,
  selection: selection_selection,
  order: order_default,
  sort: sort_default,
  call: call_default,
  nodes: nodes_default,
  node: node_default,
  size: size_default,
  empty: empty_default,
  each: each_default,
  attr: attr_default,
  style: style_default,
  property: property_default,
  classed: classed_default,
  text: text_default,
  html: html_default,
  raise: raise_default,
  lower: lower_default,
  append: append_default,
  insert: insert_default,
  remove: remove_default,
  clone: clone_default,
  datum: datum_default,
  on: on_default,
  dispatch: dispatch_default2,
  [Symbol.iterator]: iterator_default
};
var selection_default = selection;

// ../../../../../../node_modules/d3-selection/src/select.js
function select_default2(selector) {
  return typeof selector === "string" ? new Selection([[document.querySelector(selector)]], [document.documentElement]) : new Selection([[selector]], root);
}

// ../../../../../../node_modules/d3-selection/src/create.js
function create_default(name43) {
  return select_default2(creator_default(name43).call(document.documentElement));
}

// ../../../../../../node_modules/d3-selection/src/sourceEvent.js
function sourceEvent_default(event) {
  let sourceEvent;
  while (sourceEvent = event.sourceEvent) event = sourceEvent;
  return event;
}

// ../../../../../../node_modules/d3-selection/src/pointer.js
function pointer_default(event, node) {
  event = sourceEvent_default(event);
  if (node === void 0) node = event.currentTarget;
  if (node) {
    var svg = node.ownerSVGElement || node;
    if (svg.createSVGPoint) {
      var point2 = svg.createSVGPoint();
      point2.x = event.clientX, point2.y = event.clientY;
      point2 = point2.matrixTransform(node.getScreenCTM().inverse());
      return [point2.x, point2.y];
    }
    if (node.getBoundingClientRect) {
      var rect = node.getBoundingClientRect();
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    }
  }
  return [event.pageX, event.pageY];
}

// ../../../../../../node_modules/d3-drag/src/noevent.js
var nonpassivecapture = { capture: true, passive: false };
function noevent_default(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}

// ../../../../../../node_modules/d3-drag/src/nodrag.js
function nodrag_default(view) {
  var root2 = view.document.documentElement, selection2 = select_default2(view).on("dragstart.drag", noevent_default, nonpassivecapture);
  if ("onselectstart" in root2) {
    selection2.on("selectstart.drag", noevent_default, nonpassivecapture);
  } else {
    root2.__noselect = root2.style.MozUserSelect;
    root2.style.MozUserSelect = "none";
  }
}
function yesdrag(view, noclick) {
  var root2 = view.document.documentElement, selection2 = select_default2(view).on("dragstart.drag", null);
  if (noclick) {
    selection2.on("click.drag", noevent_default, nonpassivecapture);
    setTimeout(function() {
      selection2.on("click.drag", null);
    }, 0);
  }
  if ("onselectstart" in root2) {
    selection2.on("selectstart.drag", null);
  } else {
    root2.style.MozUserSelect = root2.__noselect;
    delete root2.__noselect;
  }
}

// ../../../../../../node_modules/d3-color/src/define.js
function define_default(constructor, factory2, prototype) {
  constructor.prototype = factory2.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

// ../../../../../../node_modules/d3-color/src/color.js
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*";
var reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var reHex = /^#([0-9a-f]{3,8})$/;
var reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`);
var reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`);
var reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`);
var reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`);
var reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`);
var reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define_default(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format5) {
  var m, l;
  format5 = (format5 + "").trim().toLowerCase();
  return (m = reHex.exec(format5)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format5)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format5)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format5)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format5)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format5)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format5)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format5) ? rgbn(named[format5]) : format5 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}
define_default(Rgb, rgb, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}
function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255, g = o.g / 255, b = o.b / 255, min3 = Math.min(r, g, b), max4 = Math.max(r, g, b), h = NaN, s = max4 - min3, l = (max4 + min3) / 2;
  if (s) {
    if (r === max4) h = (g - b) / s + (g < b) * 6;
    else if (g === max4) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max4 + min3 : 2 - max4 - min3;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define_default(Hsl, hsl, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

// ../../../../../../node_modules/d3-interpolate/src/basis.js
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}
function basis_default(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// ../../../../../../node_modules/d3-interpolate/src/basisClosed.js
function basisClosed_default(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

// ../../../../../../node_modules/d3-interpolate/src/constant.js
var constant_default2 = (x) => () => x;

// ../../../../../../node_modules/d3-interpolate/src/color.js
function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}
function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}
function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant_default2(isNaN(a) ? b : a);
  };
}
function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : constant_default2(isNaN(a) ? b : a);
}

// ../../../../../../node_modules/d3-interpolate/src/rgb.js
var rgb_default = function rgbGamma(y) {
  var color2 = gamma(y);
  function rgb2(start2, end) {
    var r = color2((start2 = rgb(start2)).r, (end = rgb(end)).r), g = color2(start2.g, end.g), b = color2(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
    return function(t) {
      start2.r = r(t);
      start2.g = g(t);
      start2.b = b(t);
      start2.opacity = opacity(t);
      return start2 + "";
    };
  }
  rgb2.gamma = rgbGamma;
  return rgb2;
}(1);
function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color2;
    for (i = 0; i < n; ++i) {
      color2 = rgb(colors[i]);
      r[i] = color2.r || 0;
      g[i] = color2.g || 0;
      b[i] = color2.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color2.opacity = 1;
    return function(t) {
      color2.r = r(t);
      color2.g = g(t);
      color2.b = b(t);
      return color2 + "";
    };
  };
}
var rgbBasis = rgbSpline(basis_default);
var rgbBasisClosed = rgbSpline(basisClosed_default);

// ../../../../../../node_modules/d3-interpolate/src/numberArray.js
function numberArray_default(a, b) {
  if (!b) b = [];
  var n = a ? Math.min(b.length, a.length) : 0, c = b.slice(), i;
  return function(t) {
    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
    return c;
  };
}
function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}

// ../../../../../../node_modules/d3-interpolate/src/array.js
function genericArray(a, b) {
  var nb = b ? b.length : 0, na = a ? Math.min(nb, a.length) : 0, x = new Array(na), c = new Array(nb), i;
  for (i = 0; i < na; ++i) x[i] = value_default(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];
  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
}

// ../../../../../../node_modules/d3-interpolate/src/date.js
function date_default(a, b) {
  var d = /* @__PURE__ */ new Date();
  return a = +a, b = +b, function(t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}

// ../../../../../../node_modules/d3-interpolate/src/number.js
function number_default(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}

// ../../../../../../node_modules/d3-interpolate/src/object.js
function object_default(a, b) {
  var i = {}, c = {}, k;
  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};
  for (k in b) {
    if (k in a) {
      i[k] = value_default(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }
  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
}

// ../../../../../../node_modules/d3-interpolate/src/string.js
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var reB = new RegExp(reA.source, "g");
function zero2(b) {
  return function() {
    return b;
  };
}
function one(b) {
  return function(t) {
    return b(t) + "";
  };
}
function string_default(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = [];
  a = a + "", b = b + "";
  while ((am = reA.exec(a)) && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) {
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs;
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s[i]) s[i] += bm;
      else s[++i] = bm;
    } else {
      s[++i] = null;
      q.push({ i, x: number_default(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs;
    else s[++i] = bs;
  }
  return s.length < 2 ? q[0] ? one(q[0].x) : zero2(b) : (b = q.length, function(t) {
    for (var i2 = 0, o; i2 < b; ++i2) s[(o = q[i2]).i] = o.x(t);
    return s.join("");
  });
}

// ../../../../../../node_modules/d3-interpolate/src/value.js
function value_default(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant_default2(b) : (t === "number" ? number_default : t === "string" ? (c = color(b)) ? (b = c, rgb_default) : string_default : b instanceof color ? rgb_default : b instanceof Date ? date_default : isNumberArray(b) ? numberArray_default : Array.isArray(b) ? genericArray : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object_default : number_default)(a, b);
}

// ../../../../../../node_modules/d3-interpolate/src/round.js
function round_default(a, b) {
  return a = +a, b = +b, function(t) {
    return Math.round(a * (1 - t) + b * t);
  };
}

// ../../../../../../node_modules/d3-interpolate/src/transform/decompose.js
var degrees = 180 / Math.PI;
var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose_default(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX,
    scaleY
  };
}

// ../../../../../../node_modules/d3-interpolate/src/transform/parse.js
var svgNode;
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? identity : decompose_default(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg(value) {
  if (value == null) return identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity;
  value = value.matrix;
  return decompose_default(value.a, value.b, value.c, value.d, value.e, value.f);
}

// ../../../../../../node_modules/d3-interpolate/src/transform/index.js
function interpolateTransform(parse3, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360;
      else if (b - a > 180) a += 360;
      q.push({ i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: number_default(a, b) });
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }
  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({ i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: number_default(a, b) });
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({ i: i - 4, x: number_default(xa, xb) }, { i: i - 2, x: number_default(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a, b) {
    var s = [], q = [];
    a = parse3(a), b = parse3(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null;
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

// ../../../../../../node_modules/d3-timer/src/timer.js
var frame = 0;
var timeout = 0;
var interval = 0;
var pokeDelay = 1e3;
var taskHead;
var taskTail;
var clockLast = 0;
var clockNow = 0;
var clockSkew = 0;
var clock = typeof performance === "object" && performance.now ? performance : Date;
var setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
  setTimeout(f, 17);
};
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};
function timer(callback, delay, time) {
  var t = new Timer();
  t.restart(callback, delay, time);
  return t;
}
function timerFlush() {
  now();
  ++frame;
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(void 0, e);
    t = t._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now2 = clock.now(), delay = now2 - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now2;
}
function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}
function sleep(time) {
  if (frame) return;
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time - clockNow;
  if (delay > 24) {
    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}

// ../../../../../../node_modules/d3-timer/src/timeout.js
function timeout_default(callback, delay, time) {
  var t = new Timer();
  delay = delay == null ? 0 : +delay;
  t.restart((elapsed) => {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}

// ../../../../../../node_modules/d3-transition/src/transition/schedule.js
var emptyOn = dispatch_default("start", "end", "cancel", "interrupt");
var emptyTween = [];
var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;
function schedule_default(node, name43, id2, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id2 in schedules) return;
  create(node, id2, {
    name: name43,
    index,
    // For context during callback.
    group,
    // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}
function init(node, id2) {
  var schedule = get2(node, id2);
  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
  return schedule;
}
function set2(node, id2) {
  var schedule = get2(node, id2);
  if (schedule.state > STARTED) throw new Error("too late; already running");
  return schedule;
}
function get2(node, id2) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id2])) throw new Error("transition not found");
  return schedule;
}
function create(node, id2, self2) {
  var schedules = node.__transition, tween;
  schedules[id2] = self2;
  self2.timer = timer(schedule, 0, self2.time);
  function schedule(elapsed) {
    self2.state = SCHEDULED;
    self2.timer.restart(start2, self2.delay, self2.time);
    if (self2.delay <= elapsed) start2(elapsed - self2.delay);
  }
  function start2(elapsed) {
    var i, j, n, o;
    if (self2.state !== SCHEDULED) return stop();
    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self2.name) continue;
      if (o.state === STARTED) return timeout_default(start2);
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      } else if (+i < id2) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }
    timeout_default(function() {
      if (self2.state === STARTED) {
        self2.state = RUNNING;
        self2.timer.restart(tick, self2.delay, self2.time);
        tick(elapsed);
      }
    });
    self2.state = STARTING;
    self2.on.call("start", node, node.__data__, self2.index, self2.group);
    if (self2.state !== STARTING) return;
    self2.state = STARTED;
    tween = new Array(n = self2.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self2.tween[i].value.call(node, node.__data__, self2.index, self2.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }
  function tick(elapsed) {
    var t = elapsed < self2.duration ? self2.ease.call(null, elapsed / self2.duration) : (self2.timer.restart(stop), self2.state = ENDING, 1), i = -1, n = tween.length;
    while (++i < n) {
      tween[i].call(node, t);
    }
    if (self2.state === ENDING) {
      self2.on.call("end", node, node.__data__, self2.index, self2.group);
      stop();
    }
  }
  function stop() {
    self2.state = ENDED;
    self2.timer.stop();
    delete schedules[id2];
    for (var i in schedules) return;
    delete node.__transition;
  }
}

// ../../../../../../node_modules/d3-transition/src/interrupt.js
function interrupt_default(node, name43) {
  var schedules = node.__transition, schedule, active, empty3 = true, i;
  if (!schedules) return;
  name43 = name43 == null ? null : name43 + "";
  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name43) {
      empty3 = false;
      continue;
    }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }
  if (empty3) delete node.__transition;
}

// ../../../../../../node_modules/d3-transition/src/selection/interrupt.js
function interrupt_default2(name43) {
  return this.each(function() {
    interrupt_default(this, name43);
  });
}

// ../../../../../../node_modules/d3-transition/src/transition/tween.js
function tweenRemove(id2, name43) {
  var tween0, tween1;
  return function() {
    var schedule = set2(this, id2), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name43) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }
    schedule.tween = tween1;
  };
}
function tweenFunction(id2, name43, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error();
  return function() {
    var schedule = set2(this, id2), tween = schedule.tween;
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = { name: name43, value }, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name43) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }
    schedule.tween = tween1;
  };
}
function tween_default(name43, value) {
  var id2 = this._id;
  name43 += "";
  if (arguments.length < 2) {
    var tween = get2(this.node(), id2).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name43) {
        return t.value;
      }
    }
    return null;
  }
  return this.each((value == null ? tweenRemove : tweenFunction)(id2, name43, value));
}
function tweenValue(transition2, name43, value) {
  var id2 = transition2._id;
  transition2.each(function() {
    var schedule = set2(this, id2);
    (schedule.value || (schedule.value = {}))[name43] = value.apply(this, arguments);
  });
  return function(node) {
    return get2(node, id2).value[name43];
  };
}

// ../../../../../../node_modules/d3-transition/src/transition/interpolate.js
function interpolate_default(a, b) {
  var c;
  return (typeof b === "number" ? number_default : b instanceof color ? rgb_default : (c = color(b)) ? (b = c, rgb_default) : string_default)(a, b);
}

// ../../../../../../node_modules/d3-transition/src/transition/attr.js
function attrRemove2(name43) {
  return function() {
    this.removeAttribute(name43);
  };
}
function attrRemoveNS2(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant2(name43, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttribute(name43);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrConstantNS2(fullname, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function attrFunction2(name43, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttribute(name43);
    string0 = this.getAttribute(name43);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attrFunctionNS2(fullname, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function attr_default2(name43, value) {
  var fullname = namespace_default(name43), i = fullname === "transform" ? interpolateTransformSvg : interpolate_default;
  return this.attrTween(name43, typeof value === "function" ? (fullname.local ? attrFunctionNS2 : attrFunction2)(fullname, i, tweenValue(this, "attr." + name43, value)) : value == null ? (fullname.local ? attrRemoveNS2 : attrRemove2)(fullname) : (fullname.local ? attrConstantNS2 : attrConstant2)(fullname, i, value));
}

// ../../../../../../node_modules/d3-transition/src/transition/attrTween.js
function attrInterpolate(name43, i) {
  return function(t) {
    this.setAttribute(name43, i.call(this, t));
  };
}
function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}
function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function attrTween(name43, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolate(name43, i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function attrTween_default(name43, value) {
  var key = "attr." + name43;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  var fullname = namespace_default(name43);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}

// ../../../../../../node_modules/d3-transition/src/transition/delay.js
function delayFunction(id2, value) {
  return function() {
    init(this, id2).delay = +value.apply(this, arguments);
  };
}
function delayConstant(id2, value) {
  return value = +value, function() {
    init(this, id2).delay = value;
  };
}
function delay_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id2, value)) : get2(this.node(), id2).delay;
}

// ../../../../../../node_modules/d3-transition/src/transition/duration.js
function durationFunction(id2, value) {
  return function() {
    set2(this, id2).duration = +value.apply(this, arguments);
  };
}
function durationConstant(id2, value) {
  return value = +value, function() {
    set2(this, id2).duration = value;
  };
}
function duration_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id2, value)) : get2(this.node(), id2).duration;
}

// ../../../../../../node_modules/d3-transition/src/transition/ease.js
function easeConstant(id2, value) {
  if (typeof value !== "function") throw new Error();
  return function() {
    set2(this, id2).ease = value;
  };
}
function ease_default(value) {
  var id2 = this._id;
  return arguments.length ? this.each(easeConstant(id2, value)) : get2(this.node(), id2).ease;
}

// ../../../../../../node_modules/d3-transition/src/transition/easeVarying.js
function easeVarying(id2, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (typeof v !== "function") throw new Error();
    set2(this, id2).ease = v;
  };
}
function easeVarying_default(value) {
  if (typeof value !== "function") throw new Error();
  return this.each(easeVarying(this._id, value));
}

// ../../../../../../node_modules/d3-transition/src/transition/filter.js
function filter_default2(match) {
  if (typeof match !== "function") match = matcher_default(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Transition(subgroups, this._parents, this._name, this._id);
}

// ../../../../../../node_modules/d3-transition/src/transition/merge.js
function merge_default2(transition2) {
  if (transition2._id !== this._id) throw new Error();
  for (var groups0 = this._groups, groups1 = transition2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }
  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }
  return new Transition(merges, this._parents, this._name, this._id);
}

// ../../../../../../node_modules/d3-transition/src/transition/on.js
function start(name43) {
  return (name43 + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}
function onFunction(id2, name43, listener) {
  var on0, on1, sit = start(name43) ? init : set2;
  return function() {
    var schedule = sit(this, id2), on = schedule.on;
    if (on !== on0) (on1 = (on0 = on).copy()).on(name43, listener);
    schedule.on = on1;
  };
}
function on_default2(name43, listener) {
  var id2 = this._id;
  return arguments.length < 2 ? get2(this.node(), id2).on.on(name43) : this.each(onFunction(id2, name43, listener));
}

// ../../../../../../node_modules/d3-transition/src/transition/remove.js
function removeFunction(id2) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id2) return;
    if (parent) parent.removeChild(this);
  };
}
function remove_default2() {
  return this.on("end.remove", removeFunction(this._id));
}

// ../../../../../../node_modules/d3-transition/src/transition/select.js
function select_default3(select2) {
  var name43 = this._name, id2 = this._id;
  if (typeof select2 !== "function") select2 = selector_default(select2);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select2.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule_default(subgroup[i], name43, id2, i, subgroup, get2(node, id2));
      }
    }
  }
  return new Transition(subgroups, this._parents, name43, id2);
}

// ../../../../../../node_modules/d3-transition/src/transition/selectAll.js
function selectAll_default2(select2) {
  var name43 = this._name, id2 = this._id;
  if (typeof select2 !== "function") select2 = selectorAll_default(select2);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children2 = select2.call(node, node.__data__, i, group), child, inherit2 = get2(node, id2), k = 0, l = children2.length; k < l; ++k) {
          if (child = children2[k]) {
            schedule_default(child, name43, id2, k, children2, inherit2);
          }
        }
        subgroups.push(children2);
        parents.push(node);
      }
    }
  }
  return new Transition(subgroups, parents, name43, id2);
}

// ../../../../../../node_modules/d3-transition/src/transition/selection.js
var Selection2 = selection_default.prototype.constructor;
function selection_default2() {
  return new Selection2(this._groups, this._parents);
}

// ../../../../../../node_modules/d3-transition/src/transition/style.js
function styleNull(name43, interpolate) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name43), string1 = (this.style.removeProperty(name43), styleValue(this, name43));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}
function styleRemove2(name43) {
  return function() {
    this.style.removeProperty(name43);
  };
}
function styleConstant2(name43, interpolate, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = styleValue(this, name43);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
  };
}
function styleFunction2(name43, interpolate, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name43), value1 = value(this), string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name43), styleValue(this, name43));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}
function styleMaybeRemove(id2, name43) {
  var on0, on1, listener0, key = "style." + name43, event = "end." + key, remove2;
  return function() {
    var schedule = set2(this, id2), on = schedule.on, listener = schedule.value[key] == null ? remove2 || (remove2 = styleRemove2(name43)) : void 0;
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);
    schedule.on = on1;
  };
}
function style_default2(name43, value, priority) {
  var i = (name43 += "") === "transform" ? interpolateTransformCss : interpolate_default;
  return value == null ? this.styleTween(name43, styleNull(name43, i)).on("end.style." + name43, styleRemove2(name43)) : typeof value === "function" ? this.styleTween(name43, styleFunction2(name43, i, tweenValue(this, "style." + name43, value))).each(styleMaybeRemove(this._id, name43)) : this.styleTween(name43, styleConstant2(name43, i, value), priority).on("end.style." + name43, null);
}

// ../../../../../../node_modules/d3-transition/src/transition/styleTween.js
function styleInterpolate(name43, i, priority) {
  return function(t) {
    this.style.setProperty(name43, i.call(this, t), priority);
  };
}
function styleTween(name43, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate(name43, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}
function styleTween_default(name43, value, priority) {
  var key = "style." + (name43 += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, styleTween(name43, value, priority == null ? "" : priority));
}

// ../../../../../../node_modules/d3-transition/src/transition/text.js
function textConstant2(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction2(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}
function text_default2(value) {
  return this.tween("text", typeof value === "function" ? textFunction2(tweenValue(this, "text", value)) : textConstant2(value == null ? "" : value + ""));
}

// ../../../../../../node_modules/d3-transition/src/transition/textTween.js
function textInterpolate(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}
function textTween(value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function textTween_default(value) {
  var key = "text";
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, textTween(value));
}

// ../../../../../../node_modules/d3-transition/src/transition/transition.js
function transition_default() {
  var name43 = this._name, id0 = this._id, id1 = newId();
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit2 = get2(node, id0);
        schedule_default(node, name43, id1, i, group, {
          time: inherit2.time + inherit2.delay + inherit2.duration,
          delay: 0,
          duration: inherit2.duration,
          ease: inherit2.ease
        });
      }
    }
  }
  return new Transition(groups, this._parents, name43, id1);
}

// ../../../../../../node_modules/d3-transition/src/transition/end.js
function end_default() {
  var on0, on1, that = this, id2 = that._id, size2 = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = { value: reject }, end = { value: function() {
      if (--size2 === 0) resolve();
    } };
    that.each(function() {
      var schedule = set2(this, id2), on = schedule.on;
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }
      schedule.on = on1;
    });
    if (size2 === 0) resolve();
  });
}

// ../../../../../../node_modules/d3-transition/src/transition/index.js
var id = 0;
function Transition(groups, parents, name43, id2) {
  this._groups = groups;
  this._parents = parents;
  this._name = name43;
  this._id = id2;
}
function transition(name43) {
  return selection_default().transition(name43);
}
function newId() {
  return ++id;
}
var selection_prototype = selection_default.prototype;
Transition.prototype = transition.prototype = {
  constructor: Transition,
  select: select_default3,
  selectAll: selectAll_default2,
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: filter_default2,
  merge: merge_default2,
  selection: selection_default2,
  transition: transition_default,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: on_default2,
  attr: attr_default2,
  attrTween: attrTween_default,
  style: style_default2,
  styleTween: styleTween_default,
  text: text_default2,
  textTween: textTween_default,
  remove: remove_default2,
  tween: tween_default,
  delay: delay_default,
  duration: duration_default,
  ease: ease_default,
  easeVarying: easeVarying_default,
  end: end_default,
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};

// ../../../../../../node_modules/d3-ease/src/cubic.js
function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

// ../../../../../../node_modules/d3-transition/src/selection/transition.js
var defaultTiming = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut
};
function inherit(node, id2) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id2])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id2} not found`);
    }
  }
  return timing;
}
function transition_default2(name43) {
  var id2, timing;
  if (name43 instanceof Transition) {
    id2 = name43._id, name43 = name43._name;
  } else {
    id2 = newId(), (timing = defaultTiming).time = now(), name43 = name43 == null ? null : name43 + "";
  }
  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule_default(node, name43, id2, i, group, timing || inherit(node, id2));
      }
    }
  }
  return new Transition(groups, this._parents, name43, id2);
}

// ../../../../../../node_modules/d3-transition/src/selection/index.js
selection_default.prototype.interrupt = interrupt_default2;
selection_default.prototype.transition = transition_default2;

// ../../../../../../node_modules/d3-brush/src/constant.js
var constant_default3 = (x) => () => x;

// ../../../../../../node_modules/d3-brush/src/event.js
function BrushEvent(type2, {
  sourceEvent,
  target,
  selection: selection2,
  mode,
  dispatch: dispatch2
}) {
  Object.defineProperties(this, {
    type: { value: type2, enumerable: true, configurable: true },
    sourceEvent: { value: sourceEvent, enumerable: true, configurable: true },
    target: { value: target, enumerable: true, configurable: true },
    selection: { value: selection2, enumerable: true, configurable: true },
    mode: { value: mode, enumerable: true, configurable: true },
    _: { value: dispatch2 }
  });
}

// ../../../../../../node_modules/d3-brush/src/noevent.js
function nopropagation(event) {
  event.stopImmediatePropagation();
}
function noevent_default2(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}

// ../../../../../../node_modules/d3-brush/src/brush.js
var MODE_DRAG = { name: "drag" };
var MODE_SPACE = { name: "space" };
var MODE_HANDLE = { name: "handle" };
var MODE_CENTER = { name: "center" };
var { abs, max: max2, min } = Math;
function number1(e) {
  return [+e[0], +e[1]];
}
function number22(e) {
  return [number1(e[0]), number1(e[1])];
}
var X = {
  name: "x",
  handles: ["w", "e"].map(type),
  input: function(x, e) {
    return x == null ? null : [[+x[0], e[0][1]], [+x[1], e[1][1]]];
  },
  output: function(xy) {
    return xy && [xy[0][0], xy[1][0]];
  }
};
var Y = {
  name: "y",
  handles: ["n", "s"].map(type),
  input: function(y, e) {
    return y == null ? null : [[e[0][0], +y[0]], [e[1][0], +y[1]]];
  },
  output: function(xy) {
    return xy && [xy[0][1], xy[1][1]];
  }
};
var XY = {
  name: "xy",
  handles: ["n", "w", "e", "s", "nw", "ne", "sw", "se"].map(type),
  input: function(xy) {
    return xy == null ? null : number22(xy);
  },
  output: function(xy) {
    return xy;
  }
};
var cursors = {
  overlay: "crosshair",
  selection: "move",
  n: "ns-resize",
  e: "ew-resize",
  s: "ns-resize",
  w: "ew-resize",
  nw: "nwse-resize",
  ne: "nesw-resize",
  se: "nwse-resize",
  sw: "nesw-resize"
};
var flipX = {
  e: "w",
  w: "e",
  nw: "ne",
  ne: "nw",
  se: "sw",
  sw: "se"
};
var flipY = {
  n: "s",
  s: "n",
  nw: "sw",
  ne: "se",
  se: "ne",
  sw: "nw"
};
var signsX = {
  overlay: 1,
  selection: 1,
  n: null,
  e: 1,
  s: null,
  w: -1,
  nw: -1,
  ne: 1,
  se: 1,
  sw: -1
};
var signsY = {
  overlay: 1,
  selection: 1,
  n: -1,
  e: null,
  s: 1,
  w: null,
  nw: -1,
  ne: -1,
  se: 1,
  sw: 1
};
function type(t) {
  return { type: t };
}
function defaultFilter(event) {
  return !event.ctrlKey && !event.button;
}
function defaultExtent() {
  var svg = this.ownerSVGElement || this;
  if (svg.hasAttribute("viewBox")) {
    svg = svg.viewBox.baseVal;
    return [[svg.x, svg.y], [svg.x + svg.width, svg.y + svg.height]];
  }
  return [[0, 0], [svg.width.baseVal.value, svg.height.baseVal.value]];
}
function defaultTouchable() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function local(node) {
  while (!node.__brush) if (!(node = node.parentNode)) return;
  return node.__brush;
}
function empty2(extent2) {
  return extent2[0][0] === extent2[1][0] || extent2[0][1] === extent2[1][1];
}
function brush_default() {
  return brush(XY);
}
function brush(dim) {
  var extent2 = defaultExtent, filter2 = defaultFilter, touchable = defaultTouchable, keys = true, listeners = dispatch_default("start", "brush", "end"), handleSize = 6, touchending;
  function brush2(group) {
    var overlay = group.property("__brush", initialize).selectAll(".overlay").data([type("overlay")]);
    overlay.enter().append("rect").attr("class", "overlay").attr("pointer-events", "all").attr("cursor", cursors.overlay).merge(overlay).each(function() {
      var extent3 = local(this).extent;
      select_default2(this).attr("x", extent3[0][0]).attr("y", extent3[0][1]).attr("width", extent3[1][0] - extent3[0][0]).attr("height", extent3[1][1] - extent3[0][1]);
    });
    group.selectAll(".selection").data([type("selection")]).enter().append("rect").attr("class", "selection").attr("cursor", cursors.selection).attr("fill", "#777").attr("fill-opacity", 0.3).attr("stroke", "#fff").attr("shape-rendering", "crispEdges");
    var handle = group.selectAll(".handle").data(dim.handles, function(d) {
      return d.type;
    });
    handle.exit().remove();
    handle.enter().append("rect").attr("class", function(d) {
      return "handle handle--" + d.type;
    }).attr("cursor", function(d) {
      return cursors[d.type];
    });
    group.each(redraw).attr("fill", "none").attr("pointer-events", "all").on("mousedown.brush", started).filter(touchable).on("touchstart.brush", started).on("touchmove.brush", touchmoved).on("touchend.brush touchcancel.brush", touchended).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  brush2.move = function(group, selection2, event) {
    if (group.tween) {
      group.on("start.brush", function(event2) {
        emitter(this, arguments).beforestart().start(event2);
      }).on("interrupt.brush end.brush", function(event2) {
        emitter(this, arguments).end(event2);
      }).tween("brush", function() {
        var that = this, state = that.__brush, emit = emitter(that, arguments), selection0 = state.selection, selection1 = dim.input(typeof selection2 === "function" ? selection2.apply(this, arguments) : selection2, state.extent), i = value_default(selection0, selection1);
        function tween(t) {
          state.selection = t === 1 && selection1 === null ? null : i(t);
          redraw.call(that);
          emit.brush();
        }
        return selection0 !== null && selection1 !== null ? tween : tween(1);
      });
    } else {
      group.each(function() {
        var that = this, args = arguments, state = that.__brush, selection1 = dim.input(typeof selection2 === "function" ? selection2.apply(that, args) : selection2, state.extent), emit = emitter(that, args).beforestart();
        interrupt_default(that);
        state.selection = selection1 === null ? null : selection1;
        redraw.call(that);
        emit.start(event).brush(event).end(event);
      });
    }
  };
  brush2.clear = function(group, event) {
    brush2.move(group, null, event);
  };
  function redraw() {
    var group = select_default2(this), selection2 = local(this).selection;
    if (selection2) {
      group.selectAll(".selection").style("display", null).attr("x", selection2[0][0]).attr("y", selection2[0][1]).attr("width", selection2[1][0] - selection2[0][0]).attr("height", selection2[1][1] - selection2[0][1]);
      group.selectAll(".handle").style("display", null).attr("x", function(d) {
        return d.type[d.type.length - 1] === "e" ? selection2[1][0] - handleSize / 2 : selection2[0][0] - handleSize / 2;
      }).attr("y", function(d) {
        return d.type[0] === "s" ? selection2[1][1] - handleSize / 2 : selection2[0][1] - handleSize / 2;
      }).attr("width", function(d) {
        return d.type === "n" || d.type === "s" ? selection2[1][0] - selection2[0][0] + handleSize : handleSize;
      }).attr("height", function(d) {
        return d.type === "e" || d.type === "w" ? selection2[1][1] - selection2[0][1] + handleSize : handleSize;
      });
    } else {
      group.selectAll(".selection,.handle").style("display", "none").attr("x", null).attr("y", null).attr("width", null).attr("height", null);
    }
  }
  function emitter(that, args, clean) {
    var emit = that.__brush.emitter;
    return emit && (!clean || !emit.clean) ? emit : new Emitter(that, args, clean);
  }
  function Emitter(that, args, clean) {
    this.that = that;
    this.args = args;
    this.state = that.__brush;
    this.active = 0;
    this.clean = clean;
  }
  Emitter.prototype = {
    beforestart: function() {
      if (++this.active === 1) this.state.emitter = this, this.starting = true;
      return this;
    },
    start: function(event, mode) {
      if (this.starting) this.starting = false, this.emit("start", event, mode);
      else this.emit("brush", event);
      return this;
    },
    brush: function(event, mode) {
      this.emit("brush", event, mode);
      return this;
    },
    end: function(event, mode) {
      if (--this.active === 0) delete this.state.emitter, this.emit("end", event, mode);
      return this;
    },
    emit: function(type2, event, mode) {
      var d = select_default2(this.that).datum();
      listeners.call(
        type2,
        this.that,
        new BrushEvent(type2, {
          sourceEvent: event,
          target: brush2,
          selection: dim.output(this.state.selection),
          mode,
          dispatch: listeners
        }),
        d
      );
    }
  };
  function started(event) {
    if (touchending && !event.touches) return;
    if (!filter2.apply(this, arguments)) return;
    var that = this, type2 = event.target.__data__.type, mode = (keys && event.metaKey ? type2 = "overlay" : type2) === "selection" ? MODE_DRAG : keys && event.altKey ? MODE_CENTER : MODE_HANDLE, signX = dim === Y ? null : signsX[type2], signY = dim === X ? null : signsY[type2], state = local(that), extent3 = state.extent, selection2 = state.selection, W = extent3[0][0], w0, w1, N = extent3[0][1], n0, n12, E = extent3[1][0], e0, e1, S = extent3[1][1], s0, s1, dx = 0, dy = 0, moving, shifting = signX && signY && keys && event.shiftKey, lockX, lockY, points = Array.from(event.touches || [event], (t) => {
      const i = t.identifier;
      t = pointer_default(t, that);
      t.point0 = t.slice();
      t.identifier = i;
      return t;
    });
    interrupt_default(that);
    var emit = emitter(that, arguments, true).beforestart();
    if (type2 === "overlay") {
      if (selection2) moving = true;
      const pts = [points[0], points[1] || points[0]];
      state.selection = selection2 = [[
        w0 = dim === Y ? W : min(pts[0][0], pts[1][0]),
        n0 = dim === X ? N : min(pts[0][1], pts[1][1])
      ], [
        e0 = dim === Y ? E : max2(pts[0][0], pts[1][0]),
        s0 = dim === X ? S : max2(pts[0][1], pts[1][1])
      ]];
      if (points.length > 1) move(event);
    } else {
      w0 = selection2[0][0];
      n0 = selection2[0][1];
      e0 = selection2[1][0];
      s0 = selection2[1][1];
    }
    w1 = w0;
    n12 = n0;
    e1 = e0;
    s1 = s0;
    var group = select_default2(that).attr("pointer-events", "none");
    var overlay = group.selectAll(".overlay").attr("cursor", cursors[type2]);
    if (event.touches) {
      emit.moved = moved;
      emit.ended = ended;
    } else {
      var view = select_default2(event.view).on("mousemove.brush", moved, true).on("mouseup.brush", ended, true);
      if (keys) view.on("keydown.brush", keydowned, true).on("keyup.brush", keyupped, true);
      nodrag_default(event.view);
    }
    redraw.call(that);
    emit.start(event, mode.name);
    function moved(event2) {
      for (const p of event2.changedTouches || [event2]) {
        for (const d of points)
          if (d.identifier === p.identifier) d.cur = pointer_default(p, that);
      }
      if (shifting && !lockX && !lockY && points.length === 1) {
        const point2 = points[0];
        if (abs(point2.cur[0] - point2[0]) > abs(point2.cur[1] - point2[1]))
          lockY = true;
        else
          lockX = true;
      }
      for (const point2 of points)
        if (point2.cur) point2[0] = point2.cur[0], point2[1] = point2.cur[1];
      moving = true;
      noevent_default2(event2);
      move(event2);
    }
    function move(event2) {
      const point2 = points[0], point0 = point2.point0;
      var t;
      dx = point2[0] - point0[0];
      dy = point2[1] - point0[1];
      switch (mode) {
        case MODE_SPACE:
        case MODE_DRAG: {
          if (signX) dx = max2(W - w0, min(E - e0, dx)), w1 = w0 + dx, e1 = e0 + dx;
          if (signY) dy = max2(N - n0, min(S - s0, dy)), n12 = n0 + dy, s1 = s0 + dy;
          break;
        }
        case MODE_HANDLE: {
          if (points[1]) {
            if (signX) w1 = max2(W, min(E, points[0][0])), e1 = max2(W, min(E, points[1][0])), signX = 1;
            if (signY) n12 = max2(N, min(S, points[0][1])), s1 = max2(N, min(S, points[1][1])), signY = 1;
          } else {
            if (signX < 0) dx = max2(W - w0, min(E - w0, dx)), w1 = w0 + dx, e1 = e0;
            else if (signX > 0) dx = max2(W - e0, min(E - e0, dx)), w1 = w0, e1 = e0 + dx;
            if (signY < 0) dy = max2(N - n0, min(S - n0, dy)), n12 = n0 + dy, s1 = s0;
            else if (signY > 0) dy = max2(N - s0, min(S - s0, dy)), n12 = n0, s1 = s0 + dy;
          }
          break;
        }
        case MODE_CENTER: {
          if (signX) w1 = max2(W, min(E, w0 - dx * signX)), e1 = max2(W, min(E, e0 + dx * signX));
          if (signY) n12 = max2(N, min(S, n0 - dy * signY)), s1 = max2(N, min(S, s0 + dy * signY));
          break;
        }
      }
      if (e1 < w1) {
        signX *= -1;
        t = w0, w0 = e0, e0 = t;
        t = w1, w1 = e1, e1 = t;
        if (type2 in flipX) overlay.attr("cursor", cursors[type2 = flipX[type2]]);
      }
      if (s1 < n12) {
        signY *= -1;
        t = n0, n0 = s0, s0 = t;
        t = n12, n12 = s1, s1 = t;
        if (type2 in flipY) overlay.attr("cursor", cursors[type2 = flipY[type2]]);
      }
      if (state.selection) selection2 = state.selection;
      if (lockX) w1 = selection2[0][0], e1 = selection2[1][0];
      if (lockY) n12 = selection2[0][1], s1 = selection2[1][1];
      if (selection2[0][0] !== w1 || selection2[0][1] !== n12 || selection2[1][0] !== e1 || selection2[1][1] !== s1) {
        state.selection = [[w1, n12], [e1, s1]];
        redraw.call(that);
        emit.brush(event2, mode.name);
      }
    }
    function ended(event2) {
      nopropagation(event2);
      if (event2.touches) {
        if (event2.touches.length) return;
        if (touchending) clearTimeout(touchending);
        touchending = setTimeout(function() {
          touchending = null;
        }, 500);
      } else {
        yesdrag(event2.view, moving);
        view.on("keydown.brush keyup.brush mousemove.brush mouseup.brush", null);
      }
      group.attr("pointer-events", "all");
      overlay.attr("cursor", cursors.overlay);
      if (state.selection) selection2 = state.selection;
      if (empty2(selection2)) state.selection = null, redraw.call(that);
      emit.end(event2, mode.name);
    }
    function keydowned(event2) {
      switch (event2.keyCode) {
        case 16: {
          shifting = signX && signY;
          break;
        }
        case 18: {
          if (mode === MODE_HANDLE) {
            if (signX) e0 = e1 - dx * signX, w0 = w1 + dx * signX;
            if (signY) s0 = s1 - dy * signY, n0 = n12 + dy * signY;
            mode = MODE_CENTER;
            move(event2);
          }
          break;
        }
        case 32: {
          if (mode === MODE_HANDLE || mode === MODE_CENTER) {
            if (signX < 0) e0 = e1 - dx;
            else if (signX > 0) w0 = w1 - dx;
            if (signY < 0) s0 = s1 - dy;
            else if (signY > 0) n0 = n12 - dy;
            mode = MODE_SPACE;
            overlay.attr("cursor", cursors.selection);
            move(event2);
          }
          break;
        }
        default:
          return;
      }
      noevent_default2(event2);
    }
    function keyupped(event2) {
      switch (event2.keyCode) {
        case 16: {
          if (shifting) {
            lockX = lockY = shifting = false;
            move(event2);
          }
          break;
        }
        case 18: {
          if (mode === MODE_CENTER) {
            if (signX < 0) e0 = e1;
            else if (signX > 0) w0 = w1;
            if (signY < 0) s0 = s1;
            else if (signY > 0) n0 = n12;
            mode = MODE_HANDLE;
            move(event2);
          }
          break;
        }
        case 32: {
          if (mode === MODE_SPACE) {
            if (event2.altKey) {
              if (signX) e0 = e1 - dx * signX, w0 = w1 + dx * signX;
              if (signY) s0 = s1 - dy * signY, n0 = n12 + dy * signY;
              mode = MODE_CENTER;
            } else {
              if (signX < 0) e0 = e1;
              else if (signX > 0) w0 = w1;
              if (signY < 0) s0 = s1;
              else if (signY > 0) n0 = n12;
              mode = MODE_HANDLE;
            }
            overlay.attr("cursor", cursors[type2]);
            move(event2);
          }
          break;
        }
        default:
          return;
      }
      noevent_default2(event2);
    }
  }
  function touchmoved(event) {
    emitter(this, arguments).moved(event);
  }
  function touchended(event) {
    emitter(this, arguments).ended(event);
  }
  function initialize() {
    var state = this.__brush || { selection: null };
    state.extent = number22(extent2.apply(this, arguments));
    state.dim = dim;
    return state;
  }
  brush2.extent = function(_) {
    return arguments.length ? (extent2 = typeof _ === "function" ? _ : constant_default3(number22(_)), brush2) : extent2;
  };
  brush2.filter = function(_) {
    return arguments.length ? (filter2 = typeof _ === "function" ? _ : constant_default3(!!_), brush2) : filter2;
  };
  brush2.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : constant_default3(!!_), brush2) : touchable;
  };
  brush2.handleSize = function(_) {
    return arguments.length ? (handleSize = +_, brush2) : handleSize;
  };
  brush2.keyModifiers = function(_) {
    return arguments.length ? (keys = !!_, brush2) : keys;
  };
  brush2.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? brush2 : value;
  };
  return brush2;
}

// ../../../../../../node_modules/d3-format/src/formatDecimal.js
function formatDecimal_default(x) {
  return Math.abs(x = Math.round(x)) >= 1e21 ? x.toLocaleString("en").replace(/,/g, "") : x.toString(10);
}
function formatDecimalParts(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null;
  var i, coefficient = x.slice(0, i);
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
}

// ../../../../../../node_modules/d3-format/src/exponent.js
function exponent_default(x) {
  return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
}

// ../../../../../../node_modules/d3-format/src/formatGroup.js
function formatGroup_default(grouping, thousands) {
  return function(value, width) {
    var i = value.length, t = [], j = 0, g = grouping[0], length = 0;
    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }
    return t.reverse().join(thousands);
  };
}

// ../../../../../../node_modules/d3-format/src/formatNumerals.js
function formatNumerals_default(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

// ../../../../../../node_modules/d3-format/src/formatSpecifier.js
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}
formatSpecifier.prototype = FormatSpecifier.prototype;
function FormatSpecifier(specifier) {
  this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
  this.align = specifier.align === void 0 ? ">" : specifier.align + "";
  this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === void 0 ? void 0 : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === void 0 ? "" : specifier.type + "";
}
FormatSpecifier.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};

// ../../../../../../node_modules/d3-format/src/formatTrim.js
function formatTrim_default(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".":
        i0 = i1 = i;
        break;
      case "0":
        if (i0 === 0) i0 = i;
        i1 = i;
        break;
      default:
        if (!+s[i]) break out;
        if (i0 > 0) i0 = 0;
        break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

// ../../../../../../node_modules/d3-format/src/formatPrefixAuto.js
var prefixExponent;
function formatPrefixAuto_default(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0], exponent = d[1], i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n = coefficient.length;
  return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0];
}

// ../../../../../../node_modules/d3-format/src/formatRounded.js
function formatRounded_default(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0], exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

// ../../../../../../node_modules/d3-format/src/formatTypes.js
var formatTypes_default = {
  "%": (x, p) => (x * 100).toFixed(p),
  "b": (x) => Math.round(x).toString(2),
  "c": (x) => x + "",
  "d": formatDecimal_default,
  "e": (x, p) => x.toExponential(p),
  "f": (x, p) => x.toFixed(p),
  "g": (x, p) => x.toPrecision(p),
  "o": (x) => Math.round(x).toString(8),
  "p": (x, p) => formatRounded_default(x * 100, p),
  "r": formatRounded_default,
  "s": formatPrefixAuto_default,
  "X": (x) => Math.round(x).toString(16).toUpperCase(),
  "x": (x) => Math.round(x).toString(16)
};

// ../../../../../../node_modules/d3-format/src/identity.js
function identity_default2(x) {
  return x;
}

// ../../../../../../node_modules/d3-format/src/locale.js
var map = Array.prototype.map;
var prefixes = ["y", "z", "a", "f", "p", "n", "\xB5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function locale_default(locale2) {
  var group = locale2.grouping === void 0 || locale2.thousands === void 0 ? identity_default2 : formatGroup_default(map.call(locale2.grouping, Number), locale2.thousands + ""), currencyPrefix = locale2.currency === void 0 ? "" : locale2.currency[0] + "", currencySuffix = locale2.currency === void 0 ? "" : locale2.currency[1] + "", decimal = locale2.decimal === void 0 ? "." : locale2.decimal + "", numerals = locale2.numerals === void 0 ? identity_default2 : formatNumerals_default(map.call(locale2.numerals, String)), percent = locale2.percent === void 0 ? "%" : locale2.percent + "", minus = locale2.minus === void 0 ? "\u2212" : locale2.minus + "", nan = locale2.nan === void 0 ? "NaN" : locale2.nan + "";
  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);
    var fill = specifier.fill, align = specifier.align, sign3 = specifier.sign, symbol = specifier.symbol, zero3 = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type2 = specifier.type;
    if (type2 === "n") comma = true, type2 = "g";
    else if (!formatTypes_default[type2]) precision === void 0 && (precision = 12), trim = true, type2 = "g";
    if (zero3 || fill === "0" && align === "=") zero3 = true, fill = "0", align = "=";
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type2) ? "0" + type2.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type2) ? percent : "";
    var formatType = formatTypes_default[type2], maybeSuffix = /[defgprs%]/.test(type2);
    precision = precision === void 0 ? 6 : /[gprs]/.test(type2) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format5(value) {
      var valuePrefix = prefix, valueSuffix = suffix, i, n, c;
      if (type2 === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;
        var valueNegative = value < 0 || 1 / value < 0;
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
        if (trim) value = formatTrim_default(value);
        if (valueNegative && +value === 0 && sign3 !== "+") valueNegative = false;
        valuePrefix = (valueNegative ? sign3 === "(" ? sign3 : minus : sign3 === "-" || sign3 === "(" ? "" : sign3) + valuePrefix;
        valueSuffix = (type2 === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign3 === "(" ? ")" : "");
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }
      if (comma && !zero3) value = group(value, Infinity);
      var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
      if (comma && zero3) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;
        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;
        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;
        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }
      return numerals(value);
    }
    format5.toString = function() {
      return specifier + "";
    };
    return format5;
  }
  function formatPrefix2(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3, k = Math.pow(10, -e), prefix = prefixes[8 + e / 3];
    return function(value2) {
      return f(k * value2) + prefix;
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix2
  };
}

// ../../../../../../node_modules/d3-format/src/defaultLocale.js
var locale;
var format;
var formatPrefix;
defaultLocale({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function defaultLocale(definition) {
  locale = locale_default(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}

// ../../../../../../node_modules/d3-format/src/precisionFixed.js
function precisionFixed_default(step) {
  return Math.max(0, -exponent_default(Math.abs(step)));
}

// ../../../../../../node_modules/d3-format/src/precisionPrefix.js
function precisionPrefix_default(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent_default(value) / 3))) * 3 - exponent_default(Math.abs(step)));
}

// ../../../../../../node_modules/d3-format/src/precisionRound.js
function precisionRound_default(step, max4) {
  step = Math.abs(step), max4 = Math.abs(max4) - step;
  return Math.max(0, exponent_default(max4) - exponent_default(step)) + 1;
}

// ../../../../../../node_modules/d3-scale/src/init.js
function initRange(domain, range2) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(domain);
      break;
    default:
      this.range(range2).domain(domain);
      break;
  }
  return this;
}

// ../../../../../../node_modules/d3-scale/src/ordinal.js
var implicit = Symbol("implicit");
function ordinal() {
  var index = new InternMap(), domain = [], range2 = [], unknown = implicit;
  function scale(d) {
    let i = index.get(d);
    if (i === void 0) {
      if (unknown !== implicit) return unknown;
      index.set(d, i = domain.push(d) - 1);
    }
    return range2[i % range2.length];
  }
  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [], index = new InternMap();
    for (const value of _) {
      if (index.has(value)) continue;
      index.set(value, domain.push(value) - 1);
    }
    return scale;
  };
  scale.range = function(_) {
    return arguments.length ? (range2 = Array.from(_), scale) : range2.slice();
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  scale.copy = function() {
    return ordinal(domain, range2).unknown(unknown);
  };
  initRange.apply(scale, arguments);
  return scale;
}

// ../../../../../../node_modules/d3-scale/src/band.js
function band() {
  var scale = ordinal().unknown(void 0), domain = scale.domain, ordinalRange = scale.range, r0 = 0, r1 = 1, step, bandwidth, round2 = false, paddingInner = 0, paddingOuter = 0, align = 0.5;
  delete scale.unknown;
  function rescale() {
    var n = domain().length, reverse = r1 < r0, start2 = reverse ? r1 : r0, stop = reverse ? r0 : r1;
    step = (stop - start2) / Math.max(1, n - paddingInner + paddingOuter * 2);
    if (round2) step = Math.floor(step);
    start2 += (stop - start2 - step * (n - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round2) start2 = Math.round(start2), bandwidth = Math.round(bandwidth);
    var values = range(n).map(function(i) {
      return start2 + step * i;
    });
    return ordinalRange(reverse ? values.reverse() : values);
  }
  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };
  scale.range = function(_) {
    return arguments.length ? ([r0, r1] = _, r0 = +r0, r1 = +r1, rescale()) : [r0, r1];
  };
  scale.rangeRound = function(_) {
    return [r0, r1] = _, r0 = +r0, r1 = +r1, round2 = true, rescale();
  };
  scale.bandwidth = function() {
    return bandwidth;
  };
  scale.step = function() {
    return step;
  };
  scale.round = function(_) {
    return arguments.length ? (round2 = !!_, rescale()) : round2;
  };
  scale.padding = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
  };
  scale.paddingInner = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
  };
  scale.paddingOuter = function(_) {
    return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
  };
  scale.align = function(_) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
  };
  scale.copy = function() {
    return band(domain(), [r0, r1]).round(round2).paddingInner(paddingInner).paddingOuter(paddingOuter).align(align);
  };
  return initRange.apply(rescale(), arguments);
}

// ../../../../../../node_modules/d3-scale/src/constant.js
function constants(x) {
  return function() {
    return x;
  };
}

// ../../../../../../node_modules/d3-scale/src/number.js
function number3(x) {
  return +x;
}

// ../../../../../../node_modules/d3-scale/src/continuous.js
var unit = [0, 1];
function identity2(x) {
  return x;
}
function normalize(a, b) {
  return (b -= a = +a) ? function(x) {
    return (x - a) / b;
  } : constants(isNaN(b) ? NaN : 0.5);
}
function clamper(a, b) {
  var t;
  if (a > b) t = a, a = b, b = t;
  return function(x) {
    return Math.max(a, Math.min(b, x));
  };
}
function bimap(domain, range2, interpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range2[0], r1 = range2[1];
  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
  else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
  return function(x) {
    return r0(d0(x));
  };
}
function polymap(domain, range2, interpolate) {
  var j = Math.min(domain.length, range2.length) - 1, d = new Array(j), r = new Array(j), i = -1;
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range2 = range2.slice().reverse();
  }
  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate(range2[i], range2[i + 1]);
  }
  return function(x) {
    var i2 = bisect_default(domain, x, 1, j) - 1;
    return r[i2](d[i2](x));
  };
}
function copy(source, target) {
  return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
}
function transformer() {
  var domain = unit, range2 = unit, interpolate = value_default, transform2, untransform, unknown, clamp2 = identity2, piecewise, output, input;
  function rescale() {
    var n = Math.min(domain.length, range2.length);
    if (clamp2 !== identity2) clamp2 = clamper(domain[0], domain[n - 1]);
    piecewise = n > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }
  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform2), range2, interpolate)))(transform2(clamp2(x)));
  }
  scale.invert = function(y) {
    return clamp2(untransform((input || (input = piecewise(range2, domain.map(transform2), number_default)))(y)));
  };
  scale.domain = function(_) {
    return arguments.length ? (domain = Array.from(_, number3), rescale()) : domain.slice();
  };
  scale.range = function(_) {
    return arguments.length ? (range2 = Array.from(_), rescale()) : range2.slice();
  };
  scale.rangeRound = function(_) {
    return range2 = Array.from(_), interpolate = round_default, rescale();
  };
  scale.clamp = function(_) {
    return arguments.length ? (clamp2 = _ ? true : identity2, rescale()) : clamp2 !== identity2;
  };
  scale.interpolate = function(_) {
    return arguments.length ? (interpolate = _, rescale()) : interpolate;
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  return function(t, u) {
    transform2 = t, untransform = u;
    return rescale();
  };
}
function continuous() {
  return transformer()(identity2, identity2);
}

// ../../../../../../node_modules/d3-scale/src/tickFormat.js
function tickFormat(start2, stop, count, specifier) {
  var step = tickStep(start2, stop, count), precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start2), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix_default(step, value))) specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound_default(step, Math.max(Math.abs(start2), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed_default(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}

// ../../../../../../node_modules/d3-scale/src/linear.js
function linearish(scale) {
  var domain = scale.domain;
  scale.ticks = function(count) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };
  scale.tickFormat = function(count, specifier) {
    var d = domain();
    return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };
  scale.nice = function(count) {
    if (count == null) count = 10;
    var d = domain();
    var i0 = 0;
    var i1 = d.length - 1;
    var start2 = d[i0];
    var stop = d[i1];
    var prestep;
    var step;
    var maxIter = 10;
    if (stop < start2) {
      step = start2, start2 = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }
    while (maxIter-- > 0) {
      step = tickIncrement(start2, stop, count);
      if (step === prestep) {
        d[i0] = start2;
        d[i1] = stop;
        return domain(d);
      } else if (step > 0) {
        start2 = Math.floor(start2 / step) * step;
        stop = Math.ceil(stop / step) * step;
      } else if (step < 0) {
        start2 = Math.ceil(start2 * step) / step;
        stop = Math.floor(stop * step) / step;
      } else {
        break;
      }
      prestep = step;
    }
    return scale;
  };
  return scale;
}
function linear2() {
  var scale = continuous();
  scale.copy = function() {
    return copy(scale, linear2());
  };
  initRange.apply(scale, arguments);
  return linearish(scale);
}

// ../../../../../../node_modules/d3-scale-chromatic/src/colors.js
function colors_default(specifier) {
  var n = specifier.length / 6 | 0, colors = new Array(n), i = 0;
  while (i < n) colors[i] = "#" + specifier.slice(i * 6, ++i * 6);
  return colors;
}

// ../../../../../../node_modules/d3-scale-chromatic/src/categorical/category10.js
var category10_default = colors_default("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");

// ../../../../../../node_modules/d3-zoom/src/transform.js
function Transform(k, x, y) {
  this.k = k;
  this.x = x;
  this.y = y;
}
Transform.prototype = {
  constructor: Transform,
  scale: function(k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function(x, y) {
    return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
  },
  apply: function(point2) {
    return [point2[0] * this.k + this.x, point2[1] * this.k + this.y];
  },
  applyX: function(x) {
    return x * this.k + this.x;
  },
  applyY: function(y) {
    return y * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x) {
    return (x - this.x) / this.k;
  },
  invertY: function(y) {
    return (y - this.y) / this.k;
  },
  rescaleX: function(x) {
    return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
  },
  rescaleY: function(y) {
    return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var identity3 = new Transform(1, 0, 0);
transform.prototype = Transform.prototype;
function transform(node) {
  while (!node.__zoom) if (!(node = node.parentNode)) return identity3;
  return node.__zoom;
}

// ../../../distortions-js/lib/layering.js
import d3col from "https://cdn.jsdelivr.net/npm/d3-svg-legend@2.25.6/+esm";

// ../../../distortions-js/lib/annotation.js
function annotation(svg, options, width, height, margin) {
  const defaults = {
    title: "",
    x: "",
    y: ""
  };
  const opts = { ...defaults, ...options };
  return {
    type: "labs",
    options: opts,
    render: () => {
      if (opts.title) {
        svg.append("text").attr("x", width / 2).attr("y", margin.top / 2).attr("text-anchor", "middle").style("font-size", "16px").text(opts.title);
      }
      if (opts.x) {
        svg.append("text").attr("x", width / 2).attr("y", height - margin.bottom / 3).attr("text-anchor", "middle").text(opts.x);
      }
      if (opts.y) {
        svg.append("text").attr("transform", "rotate(-90)").attr("x", -height / 2).attr("y", margin.left / 3).attr("text-anchor", "middle").text(opts.y);
      }
    }
  };
}

// ../../../distortions-js/lib/reshape.js
function flatten_edges(N, dataset, mappingObj) {
  let link_data = [];
  for (let Ni in N) {
    for (let Nj in N[Ni]) {
      link_data.push({
        "_id": `${Ni}_${N[Ni][Nj]}`,
        x1: dataset[Ni][mappingObj.x],
        y1: dataset[Ni][mappingObj.y],
        x2: dataset[N[Ni][Nj]][mappingObj.x],
        y2: dataset[N[Ni][Nj]][mappingObj.y],
        "_id_source": Ni,
        "_id_target": N[Ni][Nj]
      });
    }
  }
  return link_data;
}

// ../../../distortions-js/lib/boxplot.js
function draw_boxplot(params, summaries, outliers) {
  params.g.append("g").attr("class", params.opts.className);
  draw_whiskers(params, summaries);
  draw_rects(params, summaries);
  draw_outliers(params, outliers);
  outlier_reactivity(params, outliers);
  annotate_outliers(params);
}
function draw_rects(params, summaries) {
  params.g.select(`.${params.opts.className}`).selectAll("rect").data(summaries, (d) => d.bin).enter().append("rect").attr("x", (d) => params.xBoxScale(d.bin)).attr("y", (d) => params.yBoxScale(d.q3)).attr("width", params.xBoxScale.bandwidth()).attr("height", (d) => params.yBoxScale(d.q1) - params.yBoxScale(d.q3)).attr("fill", params.opts.fill).attr("stroke", params.opts.stroke);
  params.g.select(`.${params.opts.className}`).selectAll("line").data(summaries, (d) => d.id).enter().append("line").attr("x1", (d) => params.xBoxScale(d.bin)).attr("y1", (d) => params.yBoxScale(d.q2)).attr("x2", (d) => params.xBoxScale(d.bin) + params.xBoxScale.bandwidth()).attr("y2", (d) => params.yBoxScale(d.q2)).attr("stroke", params.opts.stroke);
}
function draw_whiskers(params, summaries) {
  params.g.select(`.${params.opts.className}`).selectAll(".whisker").data(summaries, (d) => d.bin).enter().append("line").attr("class", "whisker").attr("x1", (d) => params.xBoxScale(d.bin) + params.xBoxScale.bandwidth() / 2).attr("y1", (d) => params.yBoxScale(d.lower)).attr("x2", (d) => params.xBoxScale(d.bin) + params.xBoxScale.bandwidth() / 2).attr("y2", (d) => params.yBoxScale(d.upper)).attr("stroke", params.opts.stroke);
}
function draw_outliers(params, outliers) {
  params.g.select(`.${params.opts.className}`).selectAll("circle").data(outliers, (d) => `${d.center}-${d.neighbor}`).enter().append("circle").attr("cx", (d) => params.xBoxScale(d.bin) + params.xBoxScale.bandwidth() / 2).attr("cy", (d) => params.yBoxScale(d.value)).attr("r", params.opts.outlierRadius).attr("fill", params.opts.fill);
}
function outlier_reactivity(params, outliers) {
  let brush2 = brush_default().on("brush end", brushed).extent(
    [
      [params.xBoxScale.range()[0] - 15, params.yBoxScale.range()[1] - 15],
      [params.xBoxScale.range()[1] + 15, params.yBoxScale.range()[0] + 15]
    ]
  );
  params.g.select(`.${params.opts.className}`).call(brush2);
  params.g.insert("g").attr("id", "link_highlight");
  function brushed(event) {
    if (!event.selection) return;
    let [[x0, y0], [x1, y1]] = event.selection;
    let selected = outliers.filter((d) => {
      let cx = params.xBoxScale(d.bin) + params.xBoxScale.bandwidth() / 2;
      let cy = params.yBoxScale(d.value);
      return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
    });
    highlight_outliers(params, selected);
    highlight_links(params, selected);
  }
}
function highlight_outliers(params, selected) {
  const ids = new Set(selected.map((d) => `${d.center}-${d.neighbor}`));
  params.g.select(`.${params.opts.className}`).selectAll("circle").attr("fill", (d) => ids.has(`${d.center}-${d.neighbor}`) ? params.opts.highlightColor : params.opts.fill);
}
function highlight_links(params, selected) {
  let links = [];
  for (let i = 0; i < selected.length; i++) {
    links.push({
      "center": params.dataset[selected[i]["center"]],
      "neighbor": params.dataset[selected[i]["neighbor"]],
      "center_id": selected[i]["center"],
      "neighbor_id": selected[i]["neighbor"]
    });
  }
  let link_selection = params.g.select("#link_highlight").selectAll("line").data(links, (d) => `${d.center_id}-${d.neighbor_id}`);
  link_selection.exit().remove();
  link_selection.enter().append("line").attr("x1", (d) => params.xScale(d.center.embedding_0)).attr("y1", (d) => params.yScale(d.center.embedding_1)).attr("x2", (d) => params.xScale(d.neighbor.embedding_0)).attr("y2", (d) => params.yScale(d.neighbor.embedding_1)).attr("stroke", params.opts.highlightColor).attr("stroke-width", params.opts.strokeWidth).attr("id", (d) => `${d.center_id}-${d.neighbor_id}`);
  const highlight_ids = new Set(links.flatMap((d) => [d.center_id, d.neighbor_id]));
  for (let i = 0; i < params.opts.otherClasses.length; i++) {
    params.g.select(`.${params.opts.otherClasses[i]}`).selectAll("*").attr("stroke", (d) => {
      return highlight_ids.has(d._id) ? params.opts.highlightColor : null;
    }).attr("stroke-width", (d) => highlight_ids.has(d._id) ? params.opts.highlightStrokeWidth : null).attr("fill-opacity", (d) => highlight_ids.has(d._id) ? params.opts.opacity : params.opts.backgroundOpacity);
  }
}
function annotate_outliers(params) {
  params.g.select(`.${params.opts.className}`).append("g").attr("class", "x-axis").attr("transform", `translate(0,${params.yBoxScale.range()[0]})`).call(axisBottom(params.xBoxScale)).selectAll("text").attr("transform", "rotate(90)").attr("x", 10).attr("y", -params.xBoxScale.bandwidth() * 0.25).style("text-anchor", "start");
  params.g.select(`.${params.opts.className}`).append("g").append("g").attr("class", "y-axis").attr("transform", `translate(${params.xBoxScale.range()[0]},0)`).call(axisLeft(params.yBoxScale).ticks(5));
  params.g.select(`.${params.opts.className}`).append("text").attr("text-anchor", "middle").attr("x", (params.xBoxScale.range()[0] + params.xBoxScale.range()[1]) / 2).attr("y", params.yBoxScale.range()[1] - 10).style("fill", "#0c0c0c").style("font-size", "10px").text("Embedding vs. Original Distance");
}

// ../../../distortions-js/lib/inter_edge_link.js
function link_update(ev, g, N, dataset, mappingObj, xScale, yScale, opts, margin) {
  let broken = Object.keys(N).map((k) => {
    return { "_id": k, "data": dataset[parseInt(k)] };
  });
  let center2 = [xScale.invert(ev.layerX - margin.left), yScale.invert(ev.layerY - margin.top)];
  let current_centers = [];
  for (let i = 0; i < broken.length; i++) {
    let dist = (broken[i].data[mappingObj.x] - center2[0]) ** 2 + (broken[i].data[mappingObj.y] - center2[1]) ** 2;
    if (dist < opts.threshold) {
      current_centers.push(broken[i]._id);
    }
  }
  let current_links = flatten_edges(filter_obj(N, current_centers), dataset, mappingObj);
  let selection2 = g.select(`.${opts.className}`).selectAll("line").data(current_links, (d) => d._id);
  selection2.enter().append("line").attr("x1", (d) => xScale(d.x1)).attr("y1", (d) => yScale(d.y1)).attr("x2", (d) => xScale(d.x2)).attr("y2", (d) => yScale(d.y2)).attr("stroke-width", opts.strokeWidth).attr("stroke", opts.stroke).attr("opacity", opts.opacity);
  for (let c in opts.otherClasses) {
    g.select(`.${opts.otherClasses[c]}`).selectAll("*").attr("opacity", (d) => Object.keys(N).indexOf(d._id.toString()) == -1 ? opts.backgroundOpacity : opts.opacity).attr("stroke-width", (d) => Object.keys(N).indexOf(d._id.toString()) == -1 ? 0 : opts.highlightStrokeWidth);
  }
  selection2.exit().remove();
}
function filter_obj(raw, allowed) {
  return Object.keys(raw).filter((key) => allowed.includes(key)).reduce((obj, key) => {
    obj[key] = raw[key];
    return obj;
  }, {});
}

// ../../../distortions-js/lib/inter_isometry.js
var import_svd_js = __toESM(require_svd_js_min(), 1);

// ../../../../../../node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}

// ../../../../../../node_modules/mathjs/lib/esm/core/config.js
var DEFAULT_CONFIG = {
  // minimum relative difference between two compared values,
  // used by all comparison functions
  relTol: 1e-12,
  // minimum absolute difference between two compared values,
  // used by all comparison functions
  absTol: 1e-15,
  // type of default matrix output. Choose 'matrix' (default) or 'array'
  matrix: "Matrix",
  // type of default number output. Choose 'number' (default) 'BigNumber', 'bigint', or 'Fraction'
  number: "number",
  // type of fallback used for config { number: 'bigint' } when a value cannot be represented
  // in the configured numeric type. Choose 'number' (default) or 'BigNumber'.
  numberFallback: "number",
  // number of significant digits in BigNumbers
  precision: 64,
  // predictable output type of functions. When true, output type depends only
  // on the input types. When false (default), output type can vary depending
  // on input values. For example `math.sqrt(-4)` returns `complex('2i')` when
  // predictable is false, and returns `NaN` when true.
  predictable: false,
  // random seed for seeded pseudo random number generation
  // null = randomly seed
  randomSeed: null
};

// ../../../../../../node_modules/mathjs/lib/esm/utils/customs.js
function getSafeProperty(object, prop) {
  if (isSafeProperty(object, prop)) {
    return object[prop];
  }
  if (typeof object[prop] === "function" && isSafeMethod(object, prop)) {
    throw new Error('Cannot access method "' + prop + '" as a property');
  }
  throw new Error('No access to property "' + prop + '"');
}
function setSafeProperty(object, prop, value) {
  if (isSafeProperty(object, prop)) {
    object[prop] = value;
    return value;
  }
  throw new Error('No access to property "' + prop + '"');
}
function isSafeProperty(object, prop) {
  if (!isPlainObject(object) && !Array.isArray(object)) {
    return false;
  }
  if (hasOwnProperty(safeNativeProperties, prop)) {
    return true;
  }
  if (prop in Object.prototype) {
    return false;
  }
  if (prop in Function.prototype) {
    return false;
  }
  return true;
}
function isSafeMethod(object, method) {
  if (object === null || object === void 0 || typeof object[method] !== "function") {
    return false;
  }
  if (hasOwnProperty(object, method) && Object.getPrototypeOf && method in Object.getPrototypeOf(object)) {
    return false;
  }
  if (hasOwnProperty(safeNativeMethods, method)) {
    return true;
  }
  if (method in Object.prototype) {
    return false;
  }
  if (method in Function.prototype) {
    return false;
  }
  return true;
}
function isPlainObject(object) {
  return typeof object === "object" && object && object.constructor === Object;
}
var safeNativeProperties = {
  length: true,
  name: true
};
var safeNativeMethods = {
  toString: true,
  valueOf: true,
  toLocaleString: true
};

// ../../../../../../node_modules/mathjs/lib/esm/utils/map.js
var ObjectWrappingMap = class {
  constructor(object) {
    this.wrappedObject = object;
    this[Symbol.iterator] = this.entries;
  }
  keys() {
    return Object.keys(this.wrappedObject).filter((key) => this.has(key)).values();
  }
  get(key) {
    return getSafeProperty(this.wrappedObject, key);
  }
  set(key, value) {
    setSafeProperty(this.wrappedObject, key, value);
    return this;
  }
  has(key) {
    return isSafeProperty(this.wrappedObject, key) && key in this.wrappedObject;
  }
  entries() {
    return mapIterator(this.keys(), (key) => [key, this.get(key)]);
  }
  forEach(callback) {
    for (var key of this.keys()) {
      callback(this.get(key), key, this);
    }
  }
  delete(key) {
    if (isSafeProperty(this.wrappedObject, key)) {
      delete this.wrappedObject[key];
    }
  }
  clear() {
    for (var key of this.keys()) {
      this.delete(key);
    }
  }
  get size() {
    return Object.keys(this.wrappedObject).length;
  }
};
function mapIterator(it, callback) {
  return {
    next: () => {
      var n = it.next();
      return n.done ? n : {
        value: callback(n.value),
        done: false
      };
    }
  };
}

// ../../../../../../node_modules/mathjs/lib/esm/utils/is.js
function isNumber(x) {
  return typeof x === "number";
}
function isBigNumber(x) {
  if (!x || typeof x !== "object" || typeof x.constructor !== "function") {
    return false;
  }
  if (x.isBigNumber === true && typeof x.constructor.prototype === "object" && x.constructor.prototype.isBigNumber === true) {
    return true;
  }
  if (typeof x.constructor.isDecimal === "function" && x.constructor.isDecimal(x) === true) {
    return true;
  }
  return false;
}
function isBigInt(x) {
  return typeof x === "bigint";
}
function isComplex(x) {
  return x && typeof x === "object" && Object.getPrototypeOf(x).isComplex === true || false;
}
function isFraction(x) {
  return x && typeof x === "object" && Object.getPrototypeOf(x).isFraction === true || false;
}
function isUnit(x) {
  return x && x.constructor.prototype.isUnit === true || false;
}
function isString(x) {
  return typeof x === "string";
}
var isArray = Array.isArray;
function isMatrix(x) {
  return x && x.constructor.prototype.isMatrix === true || false;
}
function isCollection(x) {
  return Array.isArray(x) || isMatrix(x);
}
function isDenseMatrix(x) {
  return x && x.isDenseMatrix && x.constructor.prototype.isMatrix === true || false;
}
function isSparseMatrix(x) {
  return x && x.isSparseMatrix && x.constructor.prototype.isMatrix === true || false;
}
function isRange(x) {
  return x && x.constructor.prototype.isRange === true || false;
}
function isIndex(x) {
  return x && x.constructor.prototype.isIndex === true || false;
}
function isBoolean(x) {
  return typeof x === "boolean";
}
function isResultSet(x) {
  return x && x.constructor.prototype.isResultSet === true || false;
}
function isHelp(x) {
  return x && x.constructor.prototype.isHelp === true || false;
}
function isFunction(x) {
  return typeof x === "function";
}
function isDate(x) {
  return x instanceof Date;
}
function isRegExp(x) {
  return x instanceof RegExp;
}
function isObject(x) {
  return !!(x && typeof x === "object" && x.constructor === Object && !isComplex(x) && !isFraction(x));
}
function isMap(object) {
  if (!object) {
    return false;
  }
  return object instanceof Map || object instanceof ObjectWrappingMap || typeof object.set === "function" && typeof object.get === "function" && typeof object.keys === "function" && typeof object.has === "function";
}
function isNull(x) {
  return x === null;
}
function isUndefined(x) {
  return x === void 0;
}
function isAccessorNode(x) {
  return x && x.isAccessorNode === true && x.constructor.prototype.isNode === true || false;
}
function isArrayNode(x) {
  return x && x.isArrayNode === true && x.constructor.prototype.isNode === true || false;
}
function isAssignmentNode(x) {
  return x && x.isAssignmentNode === true && x.constructor.prototype.isNode === true || false;
}
function isBlockNode(x) {
  return x && x.isBlockNode === true && x.constructor.prototype.isNode === true || false;
}
function isConditionalNode(x) {
  return x && x.isConditionalNode === true && x.constructor.prototype.isNode === true || false;
}
function isConstantNode(x) {
  return x && x.isConstantNode === true && x.constructor.prototype.isNode === true || false;
}
function isFunctionAssignmentNode(x) {
  return x && x.isFunctionAssignmentNode === true && x.constructor.prototype.isNode === true || false;
}
function isFunctionNode(x) {
  return x && x.isFunctionNode === true && x.constructor.prototype.isNode === true || false;
}
function isIndexNode(x) {
  return x && x.isIndexNode === true && x.constructor.prototype.isNode === true || false;
}
function isNode(x) {
  return x && x.isNode === true && x.constructor.prototype.isNode === true || false;
}
function isObjectNode(x) {
  return x && x.isObjectNode === true && x.constructor.prototype.isNode === true || false;
}
function isOperatorNode(x) {
  return x && x.isOperatorNode === true && x.constructor.prototype.isNode === true || false;
}
function isParenthesisNode(x) {
  return x && x.isParenthesisNode === true && x.constructor.prototype.isNode === true || false;
}
function isRangeNode(x) {
  return x && x.isRangeNode === true && x.constructor.prototype.isNode === true || false;
}
function isRelationalNode(x) {
  return x && x.isRelationalNode === true && x.constructor.prototype.isNode === true || false;
}
function isSymbolNode(x) {
  return x && x.isSymbolNode === true && x.constructor.prototype.isNode === true || false;
}
function isChain(x) {
  return x && x.constructor.prototype.isChain === true || false;
}
function typeOf(x) {
  var t = typeof x;
  if (t === "object") {
    if (x === null) return "null";
    if (isBigNumber(x)) return "BigNumber";
    if (x.constructor && x.constructor.name) return x.constructor.name;
    return "Object";
  }
  return t;
}

// ../../../../../../node_modules/mathjs/lib/esm/utils/object.js
function clone(x) {
  var type2 = typeof x;
  if (type2 === "number" || type2 === "bigint" || type2 === "string" || type2 === "boolean" || x === null || x === void 0) {
    return x;
  }
  if (typeof x.clone === "function") {
    return x.clone();
  }
  if (Array.isArray(x)) {
    return x.map(function(value) {
      return clone(value);
    });
  }
  if (x instanceof Date) return new Date(x.valueOf());
  if (isBigNumber(x)) return x;
  if (isObject(x)) {
    return mapObject(x, clone);
  }
  if (type2 === "function") {
    return x;
  }
  throw new TypeError("Cannot clone: unknown type of value (value: ".concat(x, ")"));
}
function mapObject(object, callback) {
  var clone4 = {};
  for (var key in object) {
    if (hasOwnProperty(object, key)) {
      clone4[key] = callback(object[key]);
    }
  }
  return clone4;
}
function extend2(a, b) {
  for (var prop in b) {
    if (hasOwnProperty(b, prop)) {
      a[prop] = b[prop];
    }
  }
  return a;
}
function deepStrictEqual(a, b) {
  var prop, i, len;
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) {
      return false;
    }
    if (a.length !== b.length) {
      return false;
    }
    for (i = 0, len = a.length; i < len; i++) {
      if (!deepStrictEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  } else if (typeof a === "function") {
    return a === b;
  } else if (a instanceof Object) {
    if (Array.isArray(b) || !(b instanceof Object)) {
      return false;
    }
    for (prop in a) {
      if (!(prop in b) || !deepStrictEqual(a[prop], b[prop])) {
        return false;
      }
    }
    for (prop in b) {
      if (!(prop in a)) {
        return false;
      }
    }
    return true;
  } else {
    return a === b;
  }
}
function hasOwnProperty(object, property) {
  return object && Object.hasOwnProperty.call(object, property);
}
function pickShallow(object, properties) {
  var copy2 = {};
  for (var i = 0; i < properties.length; i++) {
    var key = properties[i];
    var value = object[key];
    if (value !== void 0) {
      copy2[key] = value;
    }
  }
  return copy2;
}

// ../../../../../../node_modules/mathjs/lib/esm/core/function/config.js
var MATRIX_OPTIONS = ["Matrix", "Array"];
var NUMBER_OPTIONS = ["number", "BigNumber", "Fraction"];

// ../../../../../../node_modules/mathjs/lib/esm/entry/configReadonly.js
var config = function config2(options) {
  if (options) {
    throw new Error("The global config is readonly. \nPlease create a mathjs instance if you want to change the default configuration. \nExample:\n\n  import { create, all } from 'mathjs';\n  const mathjs = create(all);\n  mathjs.config({ number: 'BigNumber' });\n");
  }
  return Object.freeze(DEFAULT_CONFIG);
};
_extends(config, DEFAULT_CONFIG, {
  MATRIX_OPTIONS,
  NUMBER_OPTIONS
});

// ../../../../../../node_modules/mathjs/lib/esm/core/function/typed.js
var import_typed_function = __toESM(require_typed_function(), 1);

// ../../../../../../node_modules/mathjs/lib/esm/utils/factory.js
function factory(name43, dependencies44, create2, meta) {
  function assertAndCreate(scope) {
    var deps = pickShallow(scope, dependencies44.map(stripOptionalNotation));
    assertDependencies(name43, dependencies44, scope);
    return create2(deps);
  }
  assertAndCreate.isFactory = true;
  assertAndCreate.fn = name43;
  assertAndCreate.dependencies = dependencies44.slice().sort();
  if (meta) {
    assertAndCreate.meta = meta;
  }
  return assertAndCreate;
}
function assertDependencies(name43, dependencies44, scope) {
  var allDefined = dependencies44.filter((dependency) => !isOptionalDependency(dependency)).every((dependency) => scope[dependency] !== void 0);
  if (!allDefined) {
    var missingDependencies = dependencies44.filter((dependency) => scope[dependency] === void 0);
    throw new Error('Cannot create function "'.concat(name43, '", ') + "some dependencies are missing: ".concat(missingDependencies.map((d) => '"'.concat(d, '"')).join(", "), "."));
  }
}
function isOptionalDependency(dependency) {
  return dependency && dependency[0] === "?";
}
function stripOptionalNotation(dependency) {
  return dependency && dependency[0] === "?" ? dependency.slice(1) : dependency;
}

// ../../../../../../node_modules/mathjs/lib/esm/utils/number.js
function isInteger(value) {
  if (typeof value === "boolean") {
    return true;
  }
  return isFinite(value) ? value === Math.round(value) : false;
}
var sign = Math.sign || function(x) {
  if (x > 0) {
    return 1;
  } else if (x < 0) {
    return -1;
  } else {
    return 0;
  }
};
var log2 = Math.log2 || function log22(x) {
  return Math.log(x) / Math.LN2;
};
var log10 = Math.log10 || function log102(x) {
  return Math.log(x) / Math.LN10;
};
var log1p = Math.log1p || function(x) {
  return Math.log(x + 1);
};
var cbrt = Math.cbrt || function cbrt2(x) {
  if (x === 0) {
    return x;
  }
  var negate = x < 0;
  var result;
  if (negate) {
    x = -x;
  }
  if (isFinite(x)) {
    result = Math.exp(Math.log(x) / 3);
    result = (x / (result * result) + 2 * result) / 3;
  } else {
    result = x;
  }
  return negate ? -result : result;
};
var expm1 = Math.expm1 || function expm12(x) {
  return x >= 2e-4 || x <= -2e-4 ? Math.exp(x) - 1 : x + x * x / 2 + x * x * x / 6;
};
function formatNumberToBase(n, base, size2) {
  var prefixes2 = {
    2: "0b",
    8: "0o",
    16: "0x"
  };
  var prefix = prefixes2[base];
  var suffix = "";
  if (size2) {
    if (size2 < 1) {
      throw new Error("size must be in greater than 0");
    }
    if (!isInteger(size2)) {
      throw new Error("size must be an integer");
    }
    if (n > 2 ** (size2 - 1) - 1 || n < -(2 ** (size2 - 1))) {
      throw new Error("Value must be in range [-2^".concat(size2 - 1, ", 2^").concat(size2 - 1, "-1]"));
    }
    if (!isInteger(n)) {
      throw new Error("Value must be an integer");
    }
    if (n < 0) {
      n = n + 2 ** size2;
    }
    suffix = "i".concat(size2);
  }
  var sign3 = "";
  if (n < 0) {
    n = -n;
    sign3 = "-";
  }
  return "".concat(sign3).concat(prefix).concat(n.toString(base)).concat(suffix);
}
function format2(value, options) {
  if (typeof options === "function") {
    return options(value);
  }
  if (value === Infinity) {
    return "Infinity";
  } else if (value === -Infinity) {
    return "-Infinity";
  } else if (isNaN(value)) {
    return "NaN";
  }
  var {
    notation,
    precision,
    wordSize
  } = normalizeFormatOptions(options);
  switch (notation) {
    case "fixed":
      return toFixed(value, precision);
    case "exponential":
      return toExponential(value, precision);
    case "engineering":
      return toEngineering(value, precision);
    case "bin":
      return formatNumberToBase(value, 2, wordSize);
    case "oct":
      return formatNumberToBase(value, 8, wordSize);
    case "hex":
      return formatNumberToBase(value, 16, wordSize);
    case "auto":
      return toPrecision(value, precision, options).replace(/((\.\d*?)(0+))($|e)/, function() {
        var digits2 = arguments[2];
        var e = arguments[4];
        return digits2 !== "." ? digits2 + e : e;
      });
    default:
      throw new Error('Unknown notation "' + notation + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function normalizeFormatOptions(options) {
  var notation = "auto";
  var precision;
  var wordSize;
  if (options !== void 0) {
    if (isNumber(options)) {
      precision = options;
    } else if (isBigNumber(options)) {
      precision = options.toNumber();
    } else if (isObject(options)) {
      if (options.precision !== void 0) {
        precision = _toNumberOrThrow(options.precision, () => {
          throw new Error('Option "precision" must be a number or BigNumber');
        });
      }
      if (options.wordSize !== void 0) {
        wordSize = _toNumberOrThrow(options.wordSize, () => {
          throw new Error('Option "wordSize" must be a number or BigNumber');
        });
      }
      if (options.notation) {
        notation = options.notation;
      }
    } else {
      throw new Error("Unsupported type of options, number, BigNumber, or object expected");
    }
  }
  return {
    notation,
    precision,
    wordSize
  };
}
function splitNumber(value) {
  var match = String(value).toLowerCase().match(/^(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);
  if (!match) {
    throw new SyntaxError("Invalid number " + value);
  }
  var sign3 = match[1];
  var digits2 = match[2];
  var exponent = parseFloat(match[4] || "0");
  var dot2 = digits2.indexOf(".");
  exponent += dot2 !== -1 ? dot2 - 1 : digits2.length - 1;
  var coefficients = digits2.replace(".", "").replace(/^0*/, function(zeros3) {
    exponent -= zeros3.length;
    return "";
  }).replace(/0*$/, "").split("").map(function(d) {
    return parseInt(d);
  });
  if (coefficients.length === 0) {
    coefficients.push(0);
    exponent++;
  }
  return {
    sign: sign3,
    coefficients,
    exponent
  };
}
function toEngineering(value, precision) {
  if (isNaN(value) || !isFinite(value)) {
    return String(value);
  }
  var split = splitNumber(value);
  var rounded = roundDigits(split, precision);
  var e = rounded.exponent;
  var c = rounded.coefficients;
  var newExp = e % 3 === 0 ? e : e < 0 ? e - 3 - e % 3 : e - e % 3;
  if (isNumber(precision)) {
    while (precision > c.length || e - newExp + 1 > c.length) {
      c.push(0);
    }
  } else {
    var missingZeros = Math.abs(e - newExp) - (c.length - 1);
    for (var i = 0; i < missingZeros; i++) {
      c.push(0);
    }
  }
  var expDiff = Math.abs(e - newExp);
  var decimalIdx = 1;
  while (expDiff > 0) {
    decimalIdx++;
    expDiff--;
  }
  var decimals = c.slice(decimalIdx).join("");
  var decimalVal = isNumber(precision) && decimals.length || decimals.match(/[1-9]/) ? "." + decimals : "";
  var str = c.slice(0, decimalIdx).join("") + decimalVal + "e" + (e >= 0 ? "+" : "") + newExp.toString();
  return rounded.sign + str;
}
function toFixed(value, precision) {
  if (isNaN(value) || !isFinite(value)) {
    return String(value);
  }
  var splitValue = splitNumber(value);
  var rounded = typeof precision === "number" ? roundDigits(splitValue, splitValue.exponent + 1 + precision) : splitValue;
  var c = rounded.coefficients;
  var p = rounded.exponent + 1;
  var pp = p + (precision || 0);
  if (c.length < pp) {
    c = c.concat(zeros(pp - c.length));
  }
  if (p < 0) {
    c = zeros(-p + 1).concat(c);
    p = 1;
  }
  if (p < c.length) {
    c.splice(p, 0, p === 0 ? "0." : ".");
  }
  return rounded.sign + c.join("");
}
function toExponential(value, precision) {
  if (isNaN(value) || !isFinite(value)) {
    return String(value);
  }
  var split = splitNumber(value);
  var rounded = precision ? roundDigits(split, precision) : split;
  var c = rounded.coefficients;
  var e = rounded.exponent;
  if (c.length < precision) {
    c = c.concat(zeros(precision - c.length));
  }
  var first = c.shift();
  return rounded.sign + first + (c.length > 0 ? "." + c.join("") : "") + "e" + (e >= 0 ? "+" : "") + e;
}
function toPrecision(value, precision, options) {
  if (isNaN(value) || !isFinite(value)) {
    return String(value);
  }
  var lowerExp = _toNumberOrDefault(options === null || options === void 0 ? void 0 : options.lowerExp, -3);
  var upperExp = _toNumberOrDefault(options === null || options === void 0 ? void 0 : options.upperExp, 5);
  var split = splitNumber(value);
  var rounded = precision ? roundDigits(split, precision) : split;
  if (rounded.exponent < lowerExp || rounded.exponent >= upperExp) {
    return toExponential(value, precision);
  } else {
    var c = rounded.coefficients;
    var e = rounded.exponent;
    if (c.length < precision) {
      c = c.concat(zeros(precision - c.length));
    }
    c = c.concat(zeros(e - c.length + 1 + (c.length < precision ? precision - c.length : 0)));
    c = zeros(-e).concat(c);
    var dot2 = e > 0 ? e : 0;
    if (dot2 < c.length - 1) {
      c.splice(dot2 + 1, 0, ".");
    }
    return rounded.sign + c.join("");
  }
}
function roundDigits(split, precision) {
  var rounded = {
    sign: split.sign,
    coefficients: split.coefficients,
    exponent: split.exponent
  };
  var c = rounded.coefficients;
  while (precision <= 0) {
    c.unshift(0);
    rounded.exponent++;
    precision++;
  }
  if (c.length > precision) {
    var removed = c.splice(precision, c.length - precision);
    if (removed[0] >= 5) {
      var i = precision - 1;
      c[i]++;
      while (c[i] === 10) {
        c.pop();
        if (i === 0) {
          c.unshift(0);
          rounded.exponent++;
          i++;
        }
        i--;
        c[i]++;
      }
    }
  }
  return rounded;
}
function zeros(length) {
  var arr = [];
  for (var i = 0; i < length; i++) {
    arr.push(0);
  }
  return arr;
}
function digits(value) {
  return value.toExponential().replace(/e.*$/, "").replace(/^0\.?0*|\./, "").length;
}
function nearlyEqual(a, b) {
  var relTol = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-8;
  var absTol = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
  if (relTol <= 0) {
    throw new Error("Relative tolerance must be greater than 0");
  }
  if (absTol < 0) {
    throw new Error("Absolute tolerance must be at least 0");
  }
  if (isNaN(a) || isNaN(b)) {
    return false;
  }
  if (!isFinite(a) || !isFinite(b)) {
    return a === b;
  }
  if (a === b) {
    return true;
  }
  return Math.abs(a - b) <= Math.max(relTol * Math.max(Math.abs(a), Math.abs(b)), absTol);
}
function _toNumberOrThrow(value, onError) {
  if (isNumber(value)) {
    return value;
  } else if (isBigNumber(value)) {
    return value.toNumber();
  } else {
    onError();
  }
}
function _toNumberOrDefault(value, defaultValue) {
  if (isNumber(value)) {
    return value;
  } else if (isBigNumber(value)) {
    return value.toNumber();
  } else {
    return defaultValue;
  }
}

// ../../../../../../node_modules/mathjs/lib/esm/core/function/typed.js
var _createTyped2 = function _createTyped() {
  _createTyped2 = import_typed_function.default.create;
  return import_typed_function.default;
};
var dependencies = ["?BigNumber", "?Complex", "?DenseMatrix", "?Fraction"];
var createTyped = /* @__PURE__ */ factory("typed", dependencies, function createTyped2(_ref) {
  var {
    BigNumber: BigNumber2,
    Complex: Complex3,
    DenseMatrix: DenseMatrix2,
    Fraction: Fraction3
  } = _ref;
  var typed3 = _createTyped2();
  typed3.clear();
  typed3.addTypes([
    {
      name: "number",
      test: isNumber
    },
    {
      name: "Complex",
      test: isComplex
    },
    {
      name: "BigNumber",
      test: isBigNumber
    },
    {
      name: "bigint",
      test: isBigInt
    },
    {
      name: "Fraction",
      test: isFraction
    },
    {
      name: "Unit",
      test: isUnit
    },
    // The following type matches a valid variable name, i.e., an alphanumeric
    // string starting with an alphabetic character. It is used (at least)
    // in the definition of the derivative() function, as the argument telling
    // what to differentiate over must (currently) be a variable.
    // TODO: deprecate the identifier type (it's not used anymore, see https://github.com/josdejong/mathjs/issues/3253)
    {
      name: "identifier",
      test: (s) => isString && /^(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDD4A-\uDD65\uDD6F-\uDD85\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDDD0-\uDDED\uDDF0\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])(?:[0-9A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C8A\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CD\uA7D0\uA7D1\uA7D3\uA7D5-\uA7DC\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDDC0-\uDDF3\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDD4A-\uDD65\uDD6F-\uDD85\uDE80-\uDEA9\uDEB0\uDEB1\uDEC2-\uDEC4\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE3F\uDE40\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61\uDF80-\uDF89\uDF8B\uDF8E\uDF90-\uDFB5\uDFB7\uDFD1\uDFD3]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8\uDFC0-\uDFE0]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDF02\uDF04-\uDF10\uDF12-\uDF33\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD80E\uD80F\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46\uDC60-\uDFFF]|\uD810[\uDC00-\uDFFA]|\uD811[\uDC00-\uDE46]|\uD818[\uDD00-\uDD1D]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDD40-\uDD6C\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDCFF-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC30-\uDC6D\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDCD0-\uDCEB\uDDD0-\uDDED\uDDF0\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0\uDFF0-\uDFFF]|\uD87B[\uDC00-\uDE5D]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])*$/.test(s)
    },
    {
      name: "string",
      test: isString
    },
    {
      name: "Chain",
      test: isChain
    },
    {
      name: "Array",
      test: isArray
    },
    {
      name: "Matrix",
      test: isMatrix
    },
    {
      name: "DenseMatrix",
      test: isDenseMatrix
    },
    {
      name: "SparseMatrix",
      test: isSparseMatrix
    },
    {
      name: "Range",
      test: isRange
    },
    {
      name: "Index",
      test: isIndex
    },
    {
      name: "boolean",
      test: isBoolean
    },
    {
      name: "ResultSet",
      test: isResultSet
    },
    {
      name: "Help",
      test: isHelp
    },
    {
      name: "function",
      test: isFunction
    },
    {
      name: "Date",
      test: isDate
    },
    {
      name: "RegExp",
      test: isRegExp
    },
    {
      name: "null",
      test: isNull
    },
    {
      name: "undefined",
      test: isUndefined
    },
    {
      name: "AccessorNode",
      test: isAccessorNode
    },
    {
      name: "ArrayNode",
      test: isArrayNode
    },
    {
      name: "AssignmentNode",
      test: isAssignmentNode
    },
    {
      name: "BlockNode",
      test: isBlockNode
    },
    {
      name: "ConditionalNode",
      test: isConditionalNode
    },
    {
      name: "ConstantNode",
      test: isConstantNode
    },
    {
      name: "FunctionNode",
      test: isFunctionNode
    },
    {
      name: "FunctionAssignmentNode",
      test: isFunctionAssignmentNode
    },
    {
      name: "IndexNode",
      test: isIndexNode
    },
    {
      name: "Node",
      test: isNode
    },
    {
      name: "ObjectNode",
      test: isObjectNode
    },
    {
      name: "OperatorNode",
      test: isOperatorNode
    },
    {
      name: "ParenthesisNode",
      test: isParenthesisNode
    },
    {
      name: "RangeNode",
      test: isRangeNode
    },
    {
      name: "RelationalNode",
      test: isRelationalNode
    },
    {
      name: "SymbolNode",
      test: isSymbolNode
    },
    {
      name: "Map",
      test: isMap
    },
    {
      name: "Object",
      test: isObject
    }
    // order 'Object' last, it matches on other classes too
  ]);
  typed3.addConversions([{
    from: "number",
    to: "BigNumber",
    convert: function convert(x) {
      if (!BigNumber2) {
        throwNoBignumber(x);
      }
      if (digits(x) > 15) {
        throw new TypeError("Cannot implicitly convert a number with >15 significant digits to BigNumber (value: " + x + "). Use function bignumber(x) to convert to BigNumber.");
      }
      return new BigNumber2(x);
    }
  }, {
    from: "number",
    to: "Complex",
    convert: function convert(x) {
      if (!Complex3) {
        throwNoComplex(x);
      }
      return new Complex3(x, 0);
    }
  }, {
    from: "BigNumber",
    to: "Complex",
    convert: function convert(x) {
      if (!Complex3) {
        throwNoComplex(x);
      }
      return new Complex3(x.toNumber(), 0);
    }
  }, {
    from: "bigint",
    to: "number",
    convert: function convert(x) {
      if (x > Number.MAX_SAFE_INTEGER) {
        throw new TypeError("Cannot implicitly convert bigint to number: value exceeds the max safe integer value (value: " + x + ")");
      }
      return Number(x);
    }
  }, {
    from: "bigint",
    to: "BigNumber",
    convert: function convert(x) {
      if (!BigNumber2) {
        throwNoBignumber(x);
      }
      return new BigNumber2(x.toString());
    }
  }, {
    from: "bigint",
    to: "Fraction",
    convert: function convert(x) {
      if (!Fraction3) {
        throwNoFraction(x);
      }
      return new Fraction3(x);
    }
  }, {
    from: "Fraction",
    to: "BigNumber",
    convert: function convert(x) {
      throw new TypeError("Cannot implicitly convert a Fraction to BigNumber or vice versa. Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.");
    }
  }, {
    from: "Fraction",
    to: "Complex",
    convert: function convert(x) {
      if (!Complex3) {
        throwNoComplex(x);
      }
      return new Complex3(x.valueOf(), 0);
    }
  }, {
    from: "number",
    to: "Fraction",
    convert: function convert(x) {
      if (!Fraction3) {
        throwNoFraction(x);
      }
      var f = new Fraction3(x);
      if (f.valueOf() !== x) {
        throw new TypeError("Cannot implicitly convert a number to a Fraction when there will be a loss of precision (value: " + x + "). Use function fraction(x) to convert to Fraction.");
      }
      return f;
    }
  }, {
    // FIXME: add conversion from Fraction to number, for example for `sqrt(fraction(1,3))`
    //  from: 'Fraction',
    //  to: 'number',
    //  convert: function (x) {
    //    return x.valueOf()
    //  }
    // }, {
    from: "string",
    to: "number",
    convert: function convert(x) {
      var n = Number(x);
      if (isNaN(n)) {
        throw new Error('Cannot convert "' + x + '" to a number');
      }
      return n;
    }
  }, {
    from: "string",
    to: "BigNumber",
    convert: function convert(x) {
      if (!BigNumber2) {
        throwNoBignumber(x);
      }
      try {
        return new BigNumber2(x);
      } catch (err) {
        throw new Error('Cannot convert "' + x + '" to BigNumber');
      }
    }
  }, {
    from: "string",
    to: "bigint",
    convert: function convert(x) {
      try {
        return BigInt(x);
      } catch (err) {
        throw new Error('Cannot convert "' + x + '" to BigInt');
      }
    }
  }, {
    from: "string",
    to: "Fraction",
    convert: function convert(x) {
      if (!Fraction3) {
        throwNoFraction(x);
      }
      try {
        return new Fraction3(x);
      } catch (err) {
        throw new Error('Cannot convert "' + x + '" to Fraction');
      }
    }
  }, {
    from: "string",
    to: "Complex",
    convert: function convert(x) {
      if (!Complex3) {
        throwNoComplex(x);
      }
      try {
        return new Complex3(x);
      } catch (err) {
        throw new Error('Cannot convert "' + x + '" to Complex');
      }
    }
  }, {
    from: "boolean",
    to: "number",
    convert: function convert(x) {
      return +x;
    }
  }, {
    from: "boolean",
    to: "BigNumber",
    convert: function convert(x) {
      if (!BigNumber2) {
        throwNoBignumber(x);
      }
      return new BigNumber2(+x);
    }
  }, {
    from: "boolean",
    to: "bigint",
    convert: function convert(x) {
      return BigInt(+x);
    }
  }, {
    from: "boolean",
    to: "Fraction",
    convert: function convert(x) {
      if (!Fraction3) {
        throwNoFraction(x);
      }
      return new Fraction3(+x);
    }
  }, {
    from: "boolean",
    to: "string",
    convert: function convert(x) {
      return String(x);
    }
  }, {
    from: "Array",
    to: "Matrix",
    convert: function convert(array2) {
      if (!DenseMatrix2) {
        throwNoMatrix();
      }
      return new DenseMatrix2(array2);
    }
  }, {
    from: "Matrix",
    to: "Array",
    convert: function convert(matrix2) {
      return matrix2.valueOf();
    }
  }]);
  typed3.onMismatch = (name43, args, signatures) => {
    var usualError = typed3.createError(name43, args, signatures);
    if (["wrongType", "mismatch"].includes(usualError.data.category) && args.length === 1 && isCollection(args[0]) && // check if the function can be unary:
    signatures.some((sig) => !sig.params.includes(","))) {
      var err = new TypeError("Function '".concat(name43, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(name43, ")'."));
      err.data = usualError.data;
      throw err;
    }
    throw usualError;
  };
  typed3.onMismatch = (name43, args, signatures) => {
    var usualError = typed3.createError(name43, args, signatures);
    if (["wrongType", "mismatch"].includes(usualError.data.category) && args.length === 1 && isCollection(args[0]) && // check if the function can be unary:
    signatures.some((sig) => !sig.params.includes(","))) {
      var err = new TypeError("Function '".concat(name43, "' doesn't apply to matrices. To call it ") + "elementwise on a matrix 'M', try 'map(M, ".concat(name43, ")'."));
      err.data = usualError.data;
      throw err;
    }
    throw usualError;
  };
  return typed3;
});
function throwNoBignumber(x) {
  throw new Error("Cannot convert value ".concat(x, " into a BigNumber: no class 'BigNumber' provided"));
}
function throwNoComplex(x) {
  throw new Error("Cannot convert value ".concat(x, " into a Complex number: no class 'Complex' provided"));
}
function throwNoMatrix() {
  throw new Error("Cannot convert array into a Matrix: no class 'DenseMatrix' provided");
}
function throwNoFraction(x) {
  throw new Error("Cannot convert value ".concat(x, " into a Fraction, no class 'Fraction' provided."));
}

// ../../../../../../node_modules/decimal.js/decimal.mjs
var EXP_LIMIT = 9e15;
var MAX_DIGITS = 1e9;
var NUMERALS = "0123456789abcdef";
var LN10 = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058";
var PI = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789";
var DEFAULTS = {
  // These values must be integers within the stated ranges (inclusive).
  // Most of these values can be changed at run-time using the `Decimal.config` method.
  // The maximum number of significant digits of the result of a calculation or base conversion.
  // E.g. `Decimal.config({ precision: 20 });`
  precision: 20,
  // 1 to MAX_DIGITS
  // The rounding mode used when rounding to `precision`.
  //
  // ROUND_UP         0 Away from zero.
  // ROUND_DOWN       1 Towards zero.
  // ROUND_CEIL       2 Towards +Infinity.
  // ROUND_FLOOR      3 Towards -Infinity.
  // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
  // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
  // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
  // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
  // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
  //
  // E.g.
  // `Decimal.rounding = 4;`
  // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
  rounding: 4,
  // 0 to 8
  // The modulo mode used when calculating the modulus: a mod n.
  // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
  // The remainder (r) is calculated as: r = a - n * q.
  //
  // UP         0 The remainder is positive if the dividend is negative, else is negative.
  // DOWN       1 The remainder has the same sign as the dividend (JavaScript %).
  // FLOOR      3 The remainder has the same sign as the divisor (Python %).
  // HALF_EVEN  6 The IEEE 754 remainder function.
  // EUCLID     9 Euclidian division. q = sign(n) * floor(a / abs(n)). Always positive.
  //
  // Truncated division (1), floored division (3), the IEEE 754 remainder (6), and Euclidian
  // division (9) are commonly used for the modulus operation. The other rounding modes can also
  // be used, but they may not give useful results.
  modulo: 1,
  // 0 to 9
  // The exponent value at and beneath which `toString` returns exponential notation.
  // JavaScript numbers: -7
  toExpNeg: -7,
  // 0 to -EXP_LIMIT
  // The exponent value at and above which `toString` returns exponential notation.
  // JavaScript numbers: 21
  toExpPos: 21,
  // 0 to EXP_LIMIT
  // The minimum exponent value, beneath which underflow to zero occurs.
  // JavaScript numbers: -324  (5e-324)
  minE: -EXP_LIMIT,
  // -1 to -EXP_LIMIT
  // The maximum exponent value, above which overflow to Infinity occurs.
  // JavaScript numbers: 308  (1.7976931348623157e+308)
  maxE: EXP_LIMIT,
  // 1 to EXP_LIMIT
  // Whether to use cryptographically-secure random number generation, if available.
  crypto: false
  // true/false
};
var inexact;
var quadrant;
var external = true;
var decimalError = "[DecimalError] ";
var invalidArgument = decimalError + "Invalid argument: ";
var precisionLimitExceeded = decimalError + "Precision limit exceeded";
var cryptoUnavailable = decimalError + "crypto unavailable";
var tag = "[object Decimal]";
var mathfloor = Math.floor;
var mathpow = Math.pow;
var isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i;
var isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i;
var isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i;
var isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
var BASE = 1e7;
var LOG_BASE = 7;
var MAX_SAFE_INTEGER = 9007199254740991;
var LN10_PRECISION = LN10.length - 1;
var PI_PRECISION = PI.length - 1;
var P = { toStringTag: tag };
P.absoluteValue = P.abs = function() {
  var x = new this.constructor(this);
  if (x.s < 0) x.s = 1;
  return finalise(x);
};
P.ceil = function() {
  return finalise(new this.constructor(this), this.e + 1, 2);
};
P.clampedTo = P.clamp = function(min3, max4) {
  var k, x = this, Ctor = x.constructor;
  min3 = new Ctor(min3);
  max4 = new Ctor(max4);
  if (!min3.s || !max4.s) return new Ctor(NaN);
  if (min3.gt(max4)) throw Error(invalidArgument + max4);
  k = x.cmp(min3);
  return k < 0 ? min3 : x.cmp(max4) > 0 ? max4 : new Ctor(x);
};
P.comparedTo = P.cmp = function(y) {
  var i, j, xdL, ydL, x = this, xd = x.d, yd = (y = new x.constructor(y)).d, xs = x.s, ys = y.s;
  if (!xd || !yd) {
    return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1;
  }
  if (!xd[0] || !yd[0]) return xd[0] ? xs : yd[0] ? -ys : 0;
  if (xs !== ys) return xs;
  if (x.e !== y.e) return x.e > y.e ^ xs < 0 ? 1 : -1;
  xdL = xd.length;
  ydL = yd.length;
  for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
    if (xd[i] !== yd[i]) return xd[i] > yd[i] ^ xs < 0 ? 1 : -1;
  }
  return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
};
P.cosine = P.cos = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.d) return new Ctor(NaN);
  if (!x.d[0]) return new Ctor(1);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
  Ctor.rounding = 1;
  x = cosine(Ctor, toLessThanHalfPi(Ctor, x));
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(quadrant == 2 || quadrant == 3 ? x.neg() : x, pr, rm, true);
};
P.cubeRoot = P.cbrt = function() {
  var e, m, n, r, rep, s, sd, t, t3, t3plusx, x = this, Ctor = x.constructor;
  if (!x.isFinite() || x.isZero()) return new Ctor(x);
  external = false;
  s = x.s * mathpow(x.s * x, 1 / 3);
  if (!s || Math.abs(s) == 1 / 0) {
    n = digitsToString(x.d);
    e = x.e;
    if (s = (e - n.length + 1) % 3) n += s == 1 || s == -2 ? "0" : "00";
    s = mathpow(n, 1 / 3);
    e = mathfloor((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2));
    if (s == 1 / 0) {
      n = "5e" + e;
    } else {
      n = s.toExponential();
      n = n.slice(0, n.indexOf("e") + 1) + e;
    }
    r = new Ctor(n);
    r.s = x.s;
  } else {
    r = new Ctor(s.toString());
  }
  sd = (e = Ctor.precision) + 3;
  for (; ; ) {
    t = r;
    t3 = t.times(t).times(t);
    t3plusx = t3.plus(x);
    r = divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1);
    if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
      n = n.slice(sd - 3, sd + 1);
      if (n == "9999" || !rep && n == "4999") {
        if (!rep) {
          finalise(t, e + 1, 0);
          if (t.times(t).times(t).eq(x)) {
            r = t;
            break;
          }
        }
        sd += 4;
        rep = 1;
      } else {
        if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
          finalise(r, e + 1, 1);
          m = !r.times(r).times(r).eq(x);
        }
        break;
      }
    }
  }
  external = true;
  return finalise(r, e, Ctor.rounding, m);
};
P.decimalPlaces = P.dp = function() {
  var w, d = this.d, n = NaN;
  if (d) {
    w = d.length - 1;
    n = (w - mathfloor(this.e / LOG_BASE)) * LOG_BASE;
    w = d[w];
    if (w) for (; w % 10 == 0; w /= 10) n--;
    if (n < 0) n = 0;
  }
  return n;
};
P.dividedBy = P.div = function(y) {
  return divide(this, new this.constructor(y));
};
P.dividedToIntegerBy = P.divToInt = function(y) {
  var x = this, Ctor = x.constructor;
  return finalise(divide(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding);
};
P.equals = P.eq = function(y) {
  return this.cmp(y) === 0;
};
P.floor = function() {
  return finalise(new this.constructor(this), this.e + 1, 3);
};
P.greaterThan = P.gt = function(y) {
  return this.cmp(y) > 0;
};
P.greaterThanOrEqualTo = P.gte = function(y) {
  var k = this.cmp(y);
  return k == 1 || k === 0;
};
P.hyperbolicCosine = P.cosh = function() {
  var k, n, pr, rm, len, x = this, Ctor = x.constructor, one2 = new Ctor(1);
  if (!x.isFinite()) return new Ctor(x.s ? 1 / 0 : NaN);
  if (x.isZero()) return one2;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
  Ctor.rounding = 1;
  len = x.d.length;
  if (len < 32) {
    k = Math.ceil(len / 3);
    n = (1 / tinyPow(4, k)).toString();
  } else {
    k = 16;
    n = "2.3283064365386962890625e-10";
  }
  x = taylorSeries(Ctor, 1, x.times(n), new Ctor(1), true);
  var cosh2_x, i = k, d8 = new Ctor(8);
  for (; i--; ) {
    cosh2_x = x.times(x);
    x = one2.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
  }
  return finalise(x, Ctor.precision = pr, Ctor.rounding = rm, true);
};
P.hyperbolicSine = P.sinh = function() {
  var k, pr, rm, len, x = this, Ctor = x.constructor;
  if (!x.isFinite() || x.isZero()) return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
  Ctor.rounding = 1;
  len = x.d.length;
  if (len < 3) {
    x = taylorSeries(Ctor, 2, x, x, true);
  } else {
    k = 1.4 * Math.sqrt(len);
    k = k > 16 ? 16 : k | 0;
    x = x.times(1 / tinyPow(5, k));
    x = taylorSeries(Ctor, 2, x, x, true);
    var sinh2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
    for (; k--; ) {
      sinh2_x = x.times(x);
      x = x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
    }
  }
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(x, pr, rm, true);
};
P.hyperbolicTangent = P.tanh = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite()) return new Ctor(x.s);
  if (x.isZero()) return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 7;
  Ctor.rounding = 1;
  return divide(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm);
};
P.inverseCosine = P.acos = function() {
  var x = this, Ctor = x.constructor, k = x.abs().cmp(1), pr = Ctor.precision, rm = Ctor.rounding;
  if (k !== -1) {
    return k === 0 ? x.isNeg() ? getPi(Ctor, pr, rm) : new Ctor(0) : new Ctor(NaN);
  }
  if (x.isZero()) return getPi(Ctor, pr + 4, rm).times(0.5);
  Ctor.precision = pr + 6;
  Ctor.rounding = 1;
  x = new Ctor(1).minus(x).div(x.plus(1)).sqrt().atan();
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.times(2);
};
P.inverseHyperbolicCosine = P.acosh = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (x.lte(1)) return new Ctor(x.eq(1) ? 0 : NaN);
  if (!x.isFinite()) return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(Math.abs(x.e), x.sd()) + 4;
  Ctor.rounding = 1;
  external = false;
  x = x.times(x).minus(1).sqrt().plus(x);
  external = true;
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.ln();
};
P.inverseHyperbolicSine = P.asinh = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite() || x.isZero()) return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 2 * Math.max(Math.abs(x.e), x.sd()) + 6;
  Ctor.rounding = 1;
  external = false;
  x = x.times(x).plus(1).sqrt().plus(x);
  external = true;
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.ln();
};
P.inverseHyperbolicTangent = P.atanh = function() {
  var pr, rm, wpr, xsd, x = this, Ctor = x.constructor;
  if (!x.isFinite()) return new Ctor(NaN);
  if (x.e >= 0) return new Ctor(x.abs().eq(1) ? x.s / 0 : x.isZero() ? x : NaN);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  xsd = x.sd();
  if (Math.max(xsd, pr) < 2 * -x.e - 1) return finalise(new Ctor(x), pr, rm, true);
  Ctor.precision = wpr = xsd - x.e;
  x = divide(x.plus(1), new Ctor(1).minus(x), wpr + pr, 1);
  Ctor.precision = pr + 4;
  Ctor.rounding = 1;
  x = x.ln();
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.times(0.5);
};
P.inverseSine = P.asin = function() {
  var halfPi, k, pr, rm, x = this, Ctor = x.constructor;
  if (x.isZero()) return new Ctor(x);
  k = x.abs().cmp(1);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (k !== -1) {
    if (k === 0) {
      halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
      halfPi.s = x.s;
      return halfPi;
    }
    return new Ctor(NaN);
  }
  Ctor.precision = pr + 6;
  Ctor.rounding = 1;
  x = x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return x.times(2);
};
P.inverseTangent = P.atan = function() {
  var i, j, k, n, px, t, r, wpr, x2, x = this, Ctor = x.constructor, pr = Ctor.precision, rm = Ctor.rounding;
  if (!x.isFinite()) {
    if (!x.s) return new Ctor(NaN);
    if (pr + 4 <= PI_PRECISION) {
      r = getPi(Ctor, pr + 4, rm).times(0.5);
      r.s = x.s;
      return r;
    }
  } else if (x.isZero()) {
    return new Ctor(x);
  } else if (x.abs().eq(1) && pr + 4 <= PI_PRECISION) {
    r = getPi(Ctor, pr + 4, rm).times(0.25);
    r.s = x.s;
    return r;
  }
  Ctor.precision = wpr = pr + 10;
  Ctor.rounding = 1;
  k = Math.min(28, wpr / LOG_BASE + 2 | 0);
  for (i = k; i; --i) x = x.div(x.times(x).plus(1).sqrt().plus(1));
  external = false;
  j = Math.ceil(wpr / LOG_BASE);
  n = 1;
  x2 = x.times(x);
  r = new Ctor(x);
  px = x;
  for (; i !== -1; ) {
    px = px.times(x2);
    t = r.minus(px.div(n += 2));
    px = px.times(x2);
    r = t.plus(px.div(n += 2));
    if (r.d[j] !== void 0) for (i = j; r.d[i] === t.d[i] && i--; ) ;
  }
  if (k) r = r.times(2 << k - 1);
  external = true;
  return finalise(r, Ctor.precision = pr, Ctor.rounding = rm, true);
};
P.isFinite = function() {
  return !!this.d;
};
P.isInteger = P.isInt = function() {
  return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
};
P.isNaN = function() {
  return !this.s;
};
P.isNegative = P.isNeg = function() {
  return this.s < 0;
};
P.isPositive = P.isPos = function() {
  return this.s > 0;
};
P.isZero = function() {
  return !!this.d && this.d[0] === 0;
};
P.lessThan = P.lt = function(y) {
  return this.cmp(y) < 0;
};
P.lessThanOrEqualTo = P.lte = function(y) {
  return this.cmp(y) < 1;
};
P.logarithm = P.log = function(base) {
  var isBase10, d, denominator, k, inf, num, sd, r, arg = this, Ctor = arg.constructor, pr = Ctor.precision, rm = Ctor.rounding, guard = 5;
  if (base == null) {
    base = new Ctor(10);
    isBase10 = true;
  } else {
    base = new Ctor(base);
    d = base.d;
    if (base.s < 0 || !d || !d[0] || base.eq(1)) return new Ctor(NaN);
    isBase10 = base.eq(10);
  }
  d = arg.d;
  if (arg.s < 0 || !d || !d[0] || arg.eq(1)) {
    return new Ctor(d && !d[0] ? -1 / 0 : arg.s != 1 ? NaN : d ? 0 : 1 / 0);
  }
  if (isBase10) {
    if (d.length > 1) {
      inf = true;
    } else {
      for (k = d[0]; k % 10 === 0; ) k /= 10;
      inf = k !== 1;
    }
  }
  external = false;
  sd = pr + guard;
  num = naturalLogarithm(arg, sd);
  denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
  r = divide(num, denominator, sd, 1);
  if (checkRoundingDigits(r.d, k = pr, rm)) {
    do {
      sd += 10;
      num = naturalLogarithm(arg, sd);
      denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
      r = divide(num, denominator, sd, 1);
      if (!inf) {
        if (+digitsToString(r.d).slice(k + 1, k + 15) + 1 == 1e14) {
          r = finalise(r, pr + 1, 0);
        }
        break;
      }
    } while (checkRoundingDigits(r.d, k += 10, rm));
  }
  external = true;
  return finalise(r, pr, rm);
};
P.minus = P.sub = function(y) {
  var d, e, i, j, k, len, pr, rm, xd, xe, xLTy, yd, x = this, Ctor = x.constructor;
  y = new Ctor(y);
  if (!x.d || !y.d) {
    if (!x.s || !y.s) y = new Ctor(NaN);
    else if (x.d) y.s = -y.s;
    else y = new Ctor(y.d || x.s !== y.s ? x : NaN);
    return y;
  }
  if (x.s != y.s) {
    y.s = -y.s;
    return x.plus(y);
  }
  xd = x.d;
  yd = y.d;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (!xd[0] || !yd[0]) {
    if (yd[0]) y.s = -y.s;
    else if (xd[0]) y = new Ctor(x);
    else return new Ctor(rm === 3 ? -0 : 0);
    return external ? finalise(y, pr, rm) : y;
  }
  e = mathfloor(y.e / LOG_BASE);
  xe = mathfloor(x.e / LOG_BASE);
  xd = xd.slice();
  k = xe - e;
  if (k) {
    xLTy = k < 0;
    if (xLTy) {
      d = xd;
      k = -k;
      len = yd.length;
    } else {
      d = yd;
      e = xe;
      len = xd.length;
    }
    i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;
    if (k > i) {
      k = i;
      d.length = 1;
    }
    d.reverse();
    for (i = k; i--; ) d.push(0);
    d.reverse();
  } else {
    i = xd.length;
    len = yd.length;
    xLTy = i < len;
    if (xLTy) len = i;
    for (i = 0; i < len; i++) {
      if (xd[i] != yd[i]) {
        xLTy = xd[i] < yd[i];
        break;
      }
    }
    k = 0;
  }
  if (xLTy) {
    d = xd;
    xd = yd;
    yd = d;
    y.s = -y.s;
  }
  len = xd.length;
  for (i = yd.length - len; i > 0; --i) xd[len++] = 0;
  for (i = yd.length; i > k; ) {
    if (xd[--i] < yd[i]) {
      for (j = i; j && xd[--j] === 0; ) xd[j] = BASE - 1;
      --xd[j];
      xd[i] += BASE;
    }
    xd[i] -= yd[i];
  }
  for (; xd[--len] === 0; ) xd.pop();
  for (; xd[0] === 0; xd.shift()) --e;
  if (!xd[0]) return new Ctor(rm === 3 ? -0 : 0);
  y.d = xd;
  y.e = getBase10Exponent(xd, e);
  return external ? finalise(y, pr, rm) : y;
};
P.modulo = P.mod = function(y) {
  var q, x = this, Ctor = x.constructor;
  y = new Ctor(y);
  if (!x.d || !y.s || y.d && !y.d[0]) return new Ctor(NaN);
  if (!y.d || x.d && !x.d[0]) {
    return finalise(new Ctor(x), Ctor.precision, Ctor.rounding);
  }
  external = false;
  if (Ctor.modulo == 9) {
    q = divide(x, y.abs(), 0, 3, 1);
    q.s *= y.s;
  } else {
    q = divide(x, y, 0, Ctor.modulo, 1);
  }
  q = q.times(y);
  external = true;
  return x.minus(q);
};
P.naturalExponential = P.exp = function() {
  return naturalExponential(this);
};
P.naturalLogarithm = P.ln = function() {
  return naturalLogarithm(this);
};
P.negated = P.neg = function() {
  var x = new this.constructor(this);
  x.s = -x.s;
  return finalise(x);
};
P.plus = P.add = function(y) {
  var carry, d, e, i, k, len, pr, rm, xd, yd, x = this, Ctor = x.constructor;
  y = new Ctor(y);
  if (!x.d || !y.d) {
    if (!x.s || !y.s) y = new Ctor(NaN);
    else if (!x.d) y = new Ctor(y.d || x.s === y.s ? x : NaN);
    return y;
  }
  if (x.s != y.s) {
    y.s = -y.s;
    return x.minus(y);
  }
  xd = x.d;
  yd = y.d;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (!xd[0] || !yd[0]) {
    if (!yd[0]) y = new Ctor(x);
    return external ? finalise(y, pr, rm) : y;
  }
  k = mathfloor(x.e / LOG_BASE);
  e = mathfloor(y.e / LOG_BASE);
  xd = xd.slice();
  i = k - e;
  if (i) {
    if (i < 0) {
      d = xd;
      i = -i;
      len = yd.length;
    } else {
      d = yd;
      e = k;
      len = xd.length;
    }
    k = Math.ceil(pr / LOG_BASE);
    len = k > len ? k + 1 : len + 1;
    if (i > len) {
      i = len;
      d.length = 1;
    }
    d.reverse();
    for (; i--; ) d.push(0);
    d.reverse();
  }
  len = xd.length;
  i = yd.length;
  if (len - i < 0) {
    i = len;
    d = yd;
    yd = xd;
    xd = d;
  }
  for (carry = 0; i; ) {
    carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
    xd[i] %= BASE;
  }
  if (carry) {
    xd.unshift(carry);
    ++e;
  }
  for (len = xd.length; xd[--len] == 0; ) xd.pop();
  y.d = xd;
  y.e = getBase10Exponent(xd, e);
  return external ? finalise(y, pr, rm) : y;
};
P.precision = P.sd = function(z) {
  var k, x = this;
  if (z !== void 0 && z !== !!z && z !== 1 && z !== 0) throw Error(invalidArgument + z);
  if (x.d) {
    k = getPrecision(x.d);
    if (z && x.e + 1 > k) k = x.e + 1;
  } else {
    k = NaN;
  }
  return k;
};
P.round = function() {
  var x = this, Ctor = x.constructor;
  return finalise(new Ctor(x), x.e + 1, Ctor.rounding);
};
P.sine = P.sin = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite()) return new Ctor(NaN);
  if (x.isZero()) return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
  Ctor.rounding = 1;
  x = sine(Ctor, toLessThanHalfPi(Ctor, x));
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(quadrant > 2 ? x.neg() : x, pr, rm, true);
};
P.squareRoot = P.sqrt = function() {
  var m, n, sd, r, rep, t, x = this, d = x.d, e = x.e, s = x.s, Ctor = x.constructor;
  if (s !== 1 || !d || !d[0]) {
    return new Ctor(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
  }
  external = false;
  s = Math.sqrt(+x);
  if (s == 0 || s == 1 / 0) {
    n = digitsToString(d);
    if ((n.length + e) % 2 == 0) n += "0";
    s = Math.sqrt(n);
    e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);
    if (s == 1 / 0) {
      n = "5e" + e;
    } else {
      n = s.toExponential();
      n = n.slice(0, n.indexOf("e") + 1) + e;
    }
    r = new Ctor(n);
  } else {
    r = new Ctor(s.toString());
  }
  sd = (e = Ctor.precision) + 3;
  for (; ; ) {
    t = r;
    r = t.plus(divide(x, t, sd + 2, 1)).times(0.5);
    if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
      n = n.slice(sd - 3, sd + 1);
      if (n == "9999" || !rep && n == "4999") {
        if (!rep) {
          finalise(t, e + 1, 0);
          if (t.times(t).eq(x)) {
            r = t;
            break;
          }
        }
        sd += 4;
        rep = 1;
      } else {
        if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
          finalise(r, e + 1, 1);
          m = !r.times(r).eq(x);
        }
        break;
      }
    }
  }
  external = true;
  return finalise(r, e, Ctor.rounding, m);
};
P.tangent = P.tan = function() {
  var pr, rm, x = this, Ctor = x.constructor;
  if (!x.isFinite()) return new Ctor(NaN);
  if (x.isZero()) return new Ctor(x);
  pr = Ctor.precision;
  rm = Ctor.rounding;
  Ctor.precision = pr + 10;
  Ctor.rounding = 1;
  x = x.sin();
  x.s = 1;
  x = divide(x, new Ctor(1).minus(x.times(x)).sqrt(), pr + 10, 0);
  Ctor.precision = pr;
  Ctor.rounding = rm;
  return finalise(quadrant == 2 || quadrant == 4 ? x.neg() : x, pr, rm, true);
};
P.times = P.mul = function(y) {
  var carry, e, i, k, r, rL, t, xdL, ydL, x = this, Ctor = x.constructor, xd = x.d, yd = (y = new Ctor(y)).d;
  y.s *= x.s;
  if (!xd || !xd[0] || !yd || !yd[0]) {
    return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd ? NaN : !xd || !yd ? y.s / 0 : y.s * 0);
  }
  e = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
  xdL = xd.length;
  ydL = yd.length;
  if (xdL < ydL) {
    r = xd;
    xd = yd;
    yd = r;
    rL = xdL;
    xdL = ydL;
    ydL = rL;
  }
  r = [];
  rL = xdL + ydL;
  for (i = rL; i--; ) r.push(0);
  for (i = ydL; --i >= 0; ) {
    carry = 0;
    for (k = xdL + i; k > i; ) {
      t = r[k] + yd[i] * xd[k - i - 1] + carry;
      r[k--] = t % BASE | 0;
      carry = t / BASE | 0;
    }
    r[k] = (r[k] + carry) % BASE | 0;
  }
  for (; !r[--rL]; ) r.pop();
  if (carry) ++e;
  else r.shift();
  y.d = r;
  y.e = getBase10Exponent(r, e);
  return external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
};
P.toBinary = function(sd, rm) {
  return toStringBinary(this, 2, sd, rm);
};
P.toDecimalPlaces = P.toDP = function(dp, rm) {
  var x = this, Ctor = x.constructor;
  x = new Ctor(x);
  if (dp === void 0) return x;
  checkInt32(dp, 0, MAX_DIGITS);
  if (rm === void 0) rm = Ctor.rounding;
  else checkInt32(rm, 0, 8);
  return finalise(x, dp + x.e + 1, rm);
};
P.toExponential = function(dp, rm) {
  var str, x = this, Ctor = x.constructor;
  if (dp === void 0) {
    str = finiteToString(x, true);
  } else {
    checkInt32(dp, 0, MAX_DIGITS);
    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);
    x = finalise(new Ctor(x), dp + 1, rm);
    str = finiteToString(x, true, dp + 1);
  }
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.toFixed = function(dp, rm) {
  var str, y, x = this, Ctor = x.constructor;
  if (dp === void 0) {
    str = finiteToString(x);
  } else {
    checkInt32(dp, 0, MAX_DIGITS);
    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);
    y = finalise(new Ctor(x), dp + x.e + 1, rm);
    str = finiteToString(y, false, dp + y.e + 1);
  }
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.toFraction = function(maxD) {
  var d, d0, d1, d2, e, k, n, n0, n12, pr, q, r, x = this, xd = x.d, Ctor = x.constructor;
  if (!xd) return new Ctor(x);
  n12 = d0 = new Ctor(1);
  d1 = n0 = new Ctor(0);
  d = new Ctor(d1);
  e = d.e = getPrecision(xd) - x.e - 1;
  k = e % LOG_BASE;
  d.d[0] = mathpow(10, k < 0 ? LOG_BASE + k : k);
  if (maxD == null) {
    maxD = e > 0 ? d : n12;
  } else {
    n = new Ctor(maxD);
    if (!n.isInt() || n.lt(n12)) throw Error(invalidArgument + n);
    maxD = n.gt(d) ? e > 0 ? d : n12 : n;
  }
  external = false;
  n = new Ctor(digitsToString(xd));
  pr = Ctor.precision;
  Ctor.precision = e = xd.length * LOG_BASE * 2;
  for (; ; ) {
    q = divide(n, d, 0, 1, 1);
    d2 = d0.plus(q.times(d1));
    if (d2.cmp(maxD) == 1) break;
    d0 = d1;
    d1 = d2;
    d2 = n12;
    n12 = n0.plus(q.times(d2));
    n0 = d2;
    d2 = d;
    d = n.minus(q.times(d2));
    n = d2;
  }
  d2 = divide(maxD.minus(d0), d1, 0, 1, 1);
  n0 = n0.plus(d2.times(n12));
  d0 = d0.plus(d2.times(d1));
  n0.s = n12.s = x.s;
  r = divide(n12, d1, e, 1).minus(x).abs().cmp(divide(n0, d0, e, 1).minus(x).abs()) < 1 ? [n12, d1] : [n0, d0];
  Ctor.precision = pr;
  external = true;
  return r;
};
P.toHexadecimal = P.toHex = function(sd, rm) {
  return toStringBinary(this, 16, sd, rm);
};
P.toNearest = function(y, rm) {
  var x = this, Ctor = x.constructor;
  x = new Ctor(x);
  if (y == null) {
    if (!x.d) return x;
    y = new Ctor(1);
    rm = Ctor.rounding;
  } else {
    y = new Ctor(y);
    if (rm === void 0) {
      rm = Ctor.rounding;
    } else {
      checkInt32(rm, 0, 8);
    }
    if (!x.d) return y.s ? x : y;
    if (!y.d) {
      if (y.s) y.s = x.s;
      return y;
    }
  }
  if (y.d[0]) {
    external = false;
    x = divide(x, y, 0, rm, 1).times(y);
    external = true;
    finalise(x);
  } else {
    y.s = x.s;
    x = y;
  }
  return x;
};
P.toNumber = function() {
  return +this;
};
P.toOctal = function(sd, rm) {
  return toStringBinary(this, 8, sd, rm);
};
P.toPower = P.pow = function(y) {
  var e, k, pr, r, rm, s, x = this, Ctor = x.constructor, yn = +(y = new Ctor(y));
  if (!x.d || !y.d || !x.d[0] || !y.d[0]) return new Ctor(mathpow(+x, yn));
  x = new Ctor(x);
  if (x.eq(1)) return x;
  pr = Ctor.precision;
  rm = Ctor.rounding;
  if (y.eq(1)) return finalise(x, pr, rm);
  e = mathfloor(y.e / LOG_BASE);
  if (e >= y.d.length - 1 && (k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
    r = intPow(Ctor, x, k, pr);
    return y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
  }
  s = x.s;
  if (s < 0) {
    if (e < y.d.length - 1) return new Ctor(NaN);
    if ((y.d[e] & 1) == 0) s = 1;
    if (x.e == 0 && x.d[0] == 1 && x.d.length == 1) {
      x.s = s;
      return x;
    }
  }
  k = mathpow(+x, yn);
  e = k == 0 || !isFinite(k) ? mathfloor(yn * (Math.log("0." + digitsToString(x.d)) / Math.LN10 + x.e + 1)) : new Ctor(k + "").e;
  if (e > Ctor.maxE + 1 || e < Ctor.minE - 1) return new Ctor(e > 0 ? s / 0 : 0);
  external = false;
  Ctor.rounding = x.s = 1;
  k = Math.min(12, (e + "").length);
  r = naturalExponential(y.times(naturalLogarithm(x, pr + k)), pr);
  if (r.d) {
    r = finalise(r, pr + 5, 1);
    if (checkRoundingDigits(r.d, pr, rm)) {
      e = pr + 10;
      r = finalise(naturalExponential(y.times(naturalLogarithm(x, e + k)), e), e + 5, 1);
      if (+digitsToString(r.d).slice(pr + 1, pr + 15) + 1 == 1e14) {
        r = finalise(r, pr + 1, 0);
      }
    }
  }
  r.s = s;
  external = true;
  Ctor.rounding = rm;
  return finalise(r, pr, rm);
};
P.toPrecision = function(sd, rm) {
  var str, x = this, Ctor = x.constructor;
  if (sd === void 0) {
    str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  } else {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);
    x = finalise(new Ctor(x), sd, rm);
    str = finiteToString(x, sd <= x.e || x.e <= Ctor.toExpNeg, sd);
  }
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.toSignificantDigits = P.toSD = function(sd, rm) {
  var x = this, Ctor = x.constructor;
  if (sd === void 0) {
    sd = Ctor.precision;
    rm = Ctor.rounding;
  } else {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);
  }
  return finalise(new Ctor(x), sd, rm);
};
P.toString = function() {
  var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  return x.isNeg() && !x.isZero() ? "-" + str : str;
};
P.truncated = P.trunc = function() {
  return finalise(new this.constructor(this), this.e + 1, 1);
};
P.valueOf = P.toJSON = function() {
  var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
  return x.isNeg() ? "-" + str : str;
};
function digitsToString(d) {
  var i, k, ws, indexOfLastWord = d.length - 1, str = "", w = d[0];
  if (indexOfLastWord > 0) {
    str += w;
    for (i = 1; i < indexOfLastWord; i++) {
      ws = d[i] + "";
      k = LOG_BASE - ws.length;
      if (k) str += getZeroString(k);
      str += ws;
    }
    w = d[i];
    ws = w + "";
    k = LOG_BASE - ws.length;
    if (k) str += getZeroString(k);
  } else if (w === 0) {
    return "0";
  }
  for (; w % 10 === 0; ) w /= 10;
  return str + w;
}
function checkInt32(i, min3, max4) {
  if (i !== ~~i || i < min3 || i > max4) {
    throw Error(invalidArgument + i);
  }
}
function checkRoundingDigits(d, i, rm, repeating) {
  var di, k, r, rd;
  for (k = d[0]; k >= 10; k /= 10) --i;
  if (--i < 0) {
    i += LOG_BASE;
    di = 0;
  } else {
    di = Math.ceil((i + 1) / LOG_BASE);
    i %= LOG_BASE;
  }
  k = mathpow(10, LOG_BASE - i);
  rd = d[di] % k | 0;
  if (repeating == null) {
    if (i < 3) {
      if (i == 0) rd = rd / 100 | 0;
      else if (i == 1) rd = rd / 10 | 0;
      r = rm < 4 && rd == 99999 || rm > 3 && rd == 49999 || rd == 5e4 || rd == 0;
    } else {
      r = (rm < 4 && rd + 1 == k || rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 100 | 0) == mathpow(10, i - 2) - 1 || (rd == k / 2 || rd == 0) && (d[di + 1] / k / 100 | 0) == 0;
    }
  } else {
    if (i < 4) {
      if (i == 0) rd = rd / 1e3 | 0;
      else if (i == 1) rd = rd / 100 | 0;
      else if (i == 2) rd = rd / 10 | 0;
      r = (repeating || rm < 4) && rd == 9999 || !repeating && rm > 3 && rd == 4999;
    } else {
      r = ((repeating || rm < 4) && rd + 1 == k || !repeating && rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 1e3 | 0) == mathpow(10, i - 3) - 1;
    }
  }
  return r;
}
function convertBase(str, baseIn, baseOut) {
  var j, arr = [0], arrL, i = 0, strL = str.length;
  for (; i < strL; ) {
    for (arrL = arr.length; arrL--; ) arr[arrL] *= baseIn;
    arr[0] += NUMERALS.indexOf(str.charAt(i++));
    for (j = 0; j < arr.length; j++) {
      if (arr[j] > baseOut - 1) {
        if (arr[j + 1] === void 0) arr[j + 1] = 0;
        arr[j + 1] += arr[j] / baseOut | 0;
        arr[j] %= baseOut;
      }
    }
  }
  return arr.reverse();
}
function cosine(Ctor, x) {
  var k, len, y;
  if (x.isZero()) return x;
  len = x.d.length;
  if (len < 32) {
    k = Math.ceil(len / 3);
    y = (1 / tinyPow(4, k)).toString();
  } else {
    k = 16;
    y = "2.3283064365386962890625e-10";
  }
  Ctor.precision += k;
  x = taylorSeries(Ctor, 1, x.times(y), new Ctor(1));
  for (var i = k; i--; ) {
    var cos2x = x.times(x);
    x = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
  }
  Ctor.precision -= k;
  return x;
}
var divide = /* @__PURE__ */ function() {
  function multiplyInteger(x, k, base) {
    var temp, carry = 0, i = x.length;
    for (x = x.slice(); i--; ) {
      temp = x[i] * k + carry;
      x[i] = temp % base | 0;
      carry = temp / base | 0;
    }
    if (carry) x.unshift(carry);
    return x;
  }
  function compare(a, b, aL, bL) {
    var i, r;
    if (aL != bL) {
      r = aL > bL ? 1 : -1;
    } else {
      for (i = r = 0; i < aL; i++) {
        if (a[i] != b[i]) {
          r = a[i] > b[i] ? 1 : -1;
          break;
        }
      }
    }
    return r;
  }
  function subtract2(a, b, aL, base) {
    var i = 0;
    for (; aL--; ) {
      a[aL] -= i;
      i = a[aL] < b[aL] ? 1 : 0;
      a[aL] = i * base + a[aL] - b[aL];
    }
    for (; !a[0] && a.length > 1; ) a.shift();
  }
  return function(x, y, pr, rm, dp, base) {
    var cmp, e, i, k, logBase, more, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0, yL, yz, Ctor = x.constructor, sign3 = x.s == y.s ? 1 : -1, xd = x.d, yd = y.d;
    if (!xd || !xd[0] || !yd || !yd[0]) {
      return new Ctor(
        // Return NaN if either NaN, or both Infinity or 0.
        !x.s || !y.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN : (
          // Return ±0 if x is 0 or y is ±Infinity, or return ±Infinity as y is 0.
          xd && xd[0] == 0 || !yd ? sign3 * 0 : sign3 / 0
        )
      );
    }
    if (base) {
      logBase = 1;
      e = x.e - y.e;
    } else {
      base = BASE;
      logBase = LOG_BASE;
      e = mathfloor(x.e / logBase) - mathfloor(y.e / logBase);
    }
    yL = yd.length;
    xL = xd.length;
    q = new Ctor(sign3);
    qd = q.d = [];
    for (i = 0; yd[i] == (xd[i] || 0); i++) ;
    if (yd[i] > (xd[i] || 0)) e--;
    if (pr == null) {
      sd = pr = Ctor.precision;
      rm = Ctor.rounding;
    } else if (dp) {
      sd = pr + (x.e - y.e) + 1;
    } else {
      sd = pr;
    }
    if (sd < 0) {
      qd.push(1);
      more = true;
    } else {
      sd = sd / logBase + 2 | 0;
      i = 0;
      if (yL == 1) {
        k = 0;
        yd = yd[0];
        sd++;
        for (; (i < xL || k) && sd--; i++) {
          t = k * base + (xd[i] || 0);
          qd[i] = t / yd | 0;
          k = t % yd | 0;
        }
        more = k || i < xL;
      } else {
        k = base / (yd[0] + 1) | 0;
        if (k > 1) {
          yd = multiplyInteger(yd, k, base);
          xd = multiplyInteger(xd, k, base);
          yL = yd.length;
          xL = xd.length;
        }
        xi = yL;
        rem = xd.slice(0, yL);
        remL = rem.length;
        for (; remL < yL; ) rem[remL++] = 0;
        yz = yd.slice();
        yz.unshift(0);
        yd0 = yd[0];
        if (yd[1] >= base / 2) ++yd0;
        do {
          k = 0;
          cmp = compare(yd, rem, yL, remL);
          if (cmp < 0) {
            rem0 = rem[0];
            if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);
            k = rem0 / yd0 | 0;
            if (k > 1) {
              if (k >= base) k = base - 1;
              prod = multiplyInteger(yd, k, base);
              prodL = prod.length;
              remL = rem.length;
              cmp = compare(prod, rem, prodL, remL);
              if (cmp == 1) {
                k--;
                subtract2(prod, yL < prodL ? yz : yd, prodL, base);
              }
            } else {
              if (k == 0) cmp = k = 1;
              prod = yd.slice();
            }
            prodL = prod.length;
            if (prodL < remL) prod.unshift(0);
            subtract2(rem, prod, remL, base);
            if (cmp == -1) {
              remL = rem.length;
              cmp = compare(yd, rem, yL, remL);
              if (cmp < 1) {
                k++;
                subtract2(rem, yL < remL ? yz : yd, remL, base);
              }
            }
            remL = rem.length;
          } else if (cmp === 0) {
            k++;
            rem = [0];
          }
          qd[i++] = k;
          if (cmp && rem[0]) {
            rem[remL++] = xd[xi] || 0;
          } else {
            rem = [xd[xi]];
            remL = 1;
          }
        } while ((xi++ < xL || rem[0] !== void 0) && sd--);
        more = rem[0] !== void 0;
      }
      if (!qd[0]) qd.shift();
    }
    if (logBase == 1) {
      q.e = e;
      inexact = more;
    } else {
      for (i = 1, k = qd[0]; k >= 10; k /= 10) i++;
      q.e = i + e * logBase - 1;
      finalise(q, dp ? pr + q.e + 1 : pr, rm, more);
    }
    return q;
  };
}();
function finalise(x, sd, rm, isTruncated) {
  var digits2, i, j, k, rd, roundUp, w, xd, xdi, Ctor = x.constructor;
  out: if (sd != null) {
    xd = x.d;
    if (!xd) return x;
    for (digits2 = 1, k = xd[0]; k >= 10; k /= 10) digits2++;
    i = sd - digits2;
    if (i < 0) {
      i += LOG_BASE;
      j = sd;
      w = xd[xdi = 0];
      rd = w / mathpow(10, digits2 - j - 1) % 10 | 0;
    } else {
      xdi = Math.ceil((i + 1) / LOG_BASE);
      k = xd.length;
      if (xdi >= k) {
        if (isTruncated) {
          for (; k++ <= xdi; ) xd.push(0);
          w = rd = 0;
          digits2 = 1;
          i %= LOG_BASE;
          j = i - LOG_BASE + 1;
        } else {
          break out;
        }
      } else {
        w = k = xd[xdi];
        for (digits2 = 1; k >= 10; k /= 10) digits2++;
        i %= LOG_BASE;
        j = i - LOG_BASE + digits2;
        rd = j < 0 ? 0 : w / mathpow(10, digits2 - j - 1) % 10 | 0;
      }
    }
    isTruncated = isTruncated || sd < 0 || xd[xdi + 1] !== void 0 || (j < 0 ? w : w % mathpow(10, digits2 - j - 1));
    roundUp = rm < 4 ? (rd || isTruncated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || isTruncated || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
    (i > 0 ? j > 0 ? w / mathpow(10, digits2 - j) : 0 : xd[xdi - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
    if (sd < 1 || !xd[0]) {
      xd.length = 0;
      if (roundUp) {
        sd -= x.e + 1;
        xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
        x.e = -sd || 0;
      } else {
        xd[0] = x.e = 0;
      }
      return x;
    }
    if (i == 0) {
      xd.length = xdi;
      k = 1;
      xdi--;
    } else {
      xd.length = xdi + 1;
      k = mathpow(10, LOG_BASE - i);
      xd[xdi] = j > 0 ? (w / mathpow(10, digits2 - j) % mathpow(10, j) | 0) * k : 0;
    }
    if (roundUp) {
      for (; ; ) {
        if (xdi == 0) {
          for (i = 1, j = xd[0]; j >= 10; j /= 10) i++;
          j = xd[0] += k;
          for (k = 1; j >= 10; j /= 10) k++;
          if (i != k) {
            x.e++;
            if (xd[0] == BASE) xd[0] = 1;
          }
          break;
        } else {
          xd[xdi] += k;
          if (xd[xdi] != BASE) break;
          xd[xdi--] = 0;
          k = 1;
        }
      }
    }
    for (i = xd.length; xd[--i] === 0; ) xd.pop();
  }
  if (external) {
    if (x.e > Ctor.maxE) {
      x.d = null;
      x.e = NaN;
    } else if (x.e < Ctor.minE) {
      x.e = 0;
      x.d = [0];
    }
  }
  return x;
}
function finiteToString(x, isExp, sd) {
  if (!x.isFinite()) return nonFiniteToString(x);
  var k, e = x.e, str = digitsToString(x.d), len = str.length;
  if (isExp) {
    if (sd && (k = sd - len) > 0) {
      str = str.charAt(0) + "." + str.slice(1) + getZeroString(k);
    } else if (len > 1) {
      str = str.charAt(0) + "." + str.slice(1);
    }
    str = str + (x.e < 0 ? "e" : "e+") + x.e;
  } else if (e < 0) {
    str = "0." + getZeroString(-e - 1) + str;
    if (sd && (k = sd - len) > 0) str += getZeroString(k);
  } else if (e >= len) {
    str += getZeroString(e + 1 - len);
    if (sd && (k = sd - e - 1) > 0) str = str + "." + getZeroString(k);
  } else {
    if ((k = e + 1) < len) str = str.slice(0, k) + "." + str.slice(k);
    if (sd && (k = sd - len) > 0) {
      if (e + 1 === len) str += ".";
      str += getZeroString(k);
    }
  }
  return str;
}
function getBase10Exponent(digits2, e) {
  var w = digits2[0];
  for (e *= LOG_BASE; w >= 10; w /= 10) e++;
  return e;
}
function getLn10(Ctor, sd, pr) {
  if (sd > LN10_PRECISION) {
    external = true;
    if (pr) Ctor.precision = pr;
    throw Error(precisionLimitExceeded);
  }
  return finalise(new Ctor(LN10), sd, 1, true);
}
function getPi(Ctor, sd, rm) {
  if (sd > PI_PRECISION) throw Error(precisionLimitExceeded);
  return finalise(new Ctor(PI), sd, rm, true);
}
function getPrecision(digits2) {
  var w = digits2.length - 1, len = w * LOG_BASE + 1;
  w = digits2[w];
  if (w) {
    for (; w % 10 == 0; w /= 10) len--;
    for (w = digits2[0]; w >= 10; w /= 10) len++;
  }
  return len;
}
function getZeroString(k) {
  var zs = "";
  for (; k--; ) zs += "0";
  return zs;
}
function intPow(Ctor, x, n, pr) {
  var isTruncated, r = new Ctor(1), k = Math.ceil(pr / LOG_BASE + 4);
  external = false;
  for (; ; ) {
    if (n % 2) {
      r = r.times(x);
      if (truncate(r.d, k)) isTruncated = true;
    }
    n = mathfloor(n / 2);
    if (n === 0) {
      n = r.d.length - 1;
      if (isTruncated && r.d[n] === 0) ++r.d[n];
      break;
    }
    x = x.times(x);
    truncate(x.d, k);
  }
  external = true;
  return r;
}
function isOdd(n) {
  return n.d[n.d.length - 1] & 1;
}
function maxOrMin(Ctor, args, n) {
  var k, y, x = new Ctor(args[0]), i = 0;
  for (; ++i < args.length; ) {
    y = new Ctor(args[i]);
    if (!y.s) {
      x = y;
      break;
    }
    k = x.cmp(y);
    if (k === n || k === 0 && x.s === n) {
      x = y;
    }
  }
  return x;
}
function naturalExponential(x, sd) {
  var denominator, guard, j, pow2, sum3, t, wpr, rep = 0, i = 0, k = 0, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
  if (!x.d || !x.d[0] || x.e > 17) {
    return new Ctor(x.d ? !x.d[0] ? 1 : x.s < 0 ? 0 : 1 / 0 : x.s ? x.s < 0 ? 0 : x : 0 / 0);
  }
  if (sd == null) {
    external = false;
    wpr = pr;
  } else {
    wpr = sd;
  }
  t = new Ctor(0.03125);
  while (x.e > -2) {
    x = x.times(t);
    k += 5;
  }
  guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
  wpr += guard;
  denominator = pow2 = sum3 = new Ctor(1);
  Ctor.precision = wpr;
  for (; ; ) {
    pow2 = finalise(pow2.times(x), wpr, 1);
    denominator = denominator.times(++i);
    t = sum3.plus(divide(pow2, denominator, wpr, 1));
    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum3.d).slice(0, wpr)) {
      j = k;
      while (j--) sum3 = finalise(sum3.times(sum3), wpr, 1);
      if (sd == null) {
        if (rep < 3 && checkRoundingDigits(sum3.d, wpr - guard, rm, rep)) {
          Ctor.precision = wpr += 10;
          denominator = pow2 = t = new Ctor(1);
          i = 0;
          rep++;
        } else {
          return finalise(sum3, Ctor.precision = pr, rm, external = true);
        }
      } else {
        Ctor.precision = pr;
        return sum3;
      }
    }
    sum3 = t;
  }
}
function naturalLogarithm(y, sd) {
  var c, c0, denominator, e, numerator, rep, sum3, t, wpr, x1, x2, n = 1, guard = 10, x = y, xd = x.d, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
  if (x.s < 0 || !xd || !xd[0] || !x.e && xd[0] == 1 && xd.length == 1) {
    return new Ctor(xd && !xd[0] ? -1 / 0 : x.s != 1 ? NaN : xd ? 0 : x);
  }
  if (sd == null) {
    external = false;
    wpr = pr;
  } else {
    wpr = sd;
  }
  Ctor.precision = wpr += guard;
  c = digitsToString(xd);
  c0 = c.charAt(0);
  if (Math.abs(e = x.e) < 15e14) {
    while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
      x = x.times(y);
      c = digitsToString(x.d);
      c0 = c.charAt(0);
      n++;
    }
    e = x.e;
    if (c0 > 1) {
      x = new Ctor("0." + c);
      e++;
    } else {
      x = new Ctor(c0 + "." + c.slice(1));
    }
  } else {
    t = getLn10(Ctor, wpr + 2, pr).times(e + "");
    x = naturalLogarithm(new Ctor(c0 + "." + c.slice(1)), wpr - guard).plus(t);
    Ctor.precision = pr;
    return sd == null ? finalise(x, pr, rm, external = true) : x;
  }
  x1 = x;
  sum3 = numerator = x = divide(x.minus(1), x.plus(1), wpr, 1);
  x2 = finalise(x.times(x), wpr, 1);
  denominator = 3;
  for (; ; ) {
    numerator = finalise(numerator.times(x2), wpr, 1);
    t = sum3.plus(divide(numerator, new Ctor(denominator), wpr, 1));
    if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum3.d).slice(0, wpr)) {
      sum3 = sum3.times(2);
      if (e !== 0) sum3 = sum3.plus(getLn10(Ctor, wpr + 2, pr).times(e + ""));
      sum3 = divide(sum3, new Ctor(n), wpr, 1);
      if (sd == null) {
        if (checkRoundingDigits(sum3.d, wpr - guard, rm, rep)) {
          Ctor.precision = wpr += guard;
          t = numerator = x = divide(x1.minus(1), x1.plus(1), wpr, 1);
          x2 = finalise(x.times(x), wpr, 1);
          denominator = rep = 1;
        } else {
          return finalise(sum3, Ctor.precision = pr, rm, external = true);
        }
      } else {
        Ctor.precision = pr;
        return sum3;
      }
    }
    sum3 = t;
    denominator += 2;
  }
}
function nonFiniteToString(x) {
  return String(x.s * x.s / 0);
}
function parseDecimal(x, str) {
  var e, i, len;
  if ((e = str.indexOf(".")) > -1) str = str.replace(".", "");
  if ((i = str.search(/e/i)) > 0) {
    if (e < 0) e = i;
    e += +str.slice(i + 1);
    str = str.substring(0, i);
  } else if (e < 0) {
    e = str.length;
  }
  for (i = 0; str.charCodeAt(i) === 48; i++) ;
  for (len = str.length; str.charCodeAt(len - 1) === 48; --len) ;
  str = str.slice(i, len);
  if (str) {
    len -= i;
    x.e = e = e - i - 1;
    x.d = [];
    i = (e + 1) % LOG_BASE;
    if (e < 0) i += LOG_BASE;
    if (i < len) {
      if (i) x.d.push(+str.slice(0, i));
      for (len -= LOG_BASE; i < len; ) x.d.push(+str.slice(i, i += LOG_BASE));
      str = str.slice(i);
      i = LOG_BASE - str.length;
    } else {
      i -= len;
    }
    for (; i--; ) str += "0";
    x.d.push(+str);
    if (external) {
      if (x.e > x.constructor.maxE) {
        x.d = null;
        x.e = NaN;
      } else if (x.e < x.constructor.minE) {
        x.e = 0;
        x.d = [0];
      }
    }
  } else {
    x.e = 0;
    x.d = [0];
  }
  return x;
}
function parseOther(x, str) {
  var base, Ctor, divisor, i, isFloat, len, p, xd, xe;
  if (str.indexOf("_") > -1) {
    str = str.replace(/(\d)_(?=\d)/g, "$1");
    if (isDecimal.test(str)) return parseDecimal(x, str);
  } else if (str === "Infinity" || str === "NaN") {
    if (!+str) x.s = NaN;
    x.e = NaN;
    x.d = null;
    return x;
  }
  if (isHex.test(str)) {
    base = 16;
    str = str.toLowerCase();
  } else if (isBinary.test(str)) {
    base = 2;
  } else if (isOctal.test(str)) {
    base = 8;
  } else {
    throw Error(invalidArgument + str);
  }
  i = str.search(/p/i);
  if (i > 0) {
    p = +str.slice(i + 1);
    str = str.substring(2, i);
  } else {
    str = str.slice(2);
  }
  i = str.indexOf(".");
  isFloat = i >= 0;
  Ctor = x.constructor;
  if (isFloat) {
    str = str.replace(".", "");
    len = str.length;
    i = len - i;
    divisor = intPow(Ctor, new Ctor(base), i, i * 2);
  }
  xd = convertBase(str, base, BASE);
  xe = xd.length - 1;
  for (i = xe; xd[i] === 0; --i) xd.pop();
  if (i < 0) return new Ctor(x.s * 0);
  x.e = getBase10Exponent(xd, xe);
  x.d = xd;
  external = false;
  if (isFloat) x = divide(x, divisor, len * 4);
  if (p) x = x.times(Math.abs(p) < 54 ? mathpow(2, p) : Decimal.pow(2, p));
  external = true;
  return x;
}
function sine(Ctor, x) {
  var k, len = x.d.length;
  if (len < 3) {
    return x.isZero() ? x : taylorSeries(Ctor, 2, x, x);
  }
  k = 1.4 * Math.sqrt(len);
  k = k > 16 ? 16 : k | 0;
  x = x.times(1 / tinyPow(5, k));
  x = taylorSeries(Ctor, 2, x, x);
  var sin2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
  for (; k--; ) {
    sin2_x = x.times(x);
    x = x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
  }
  return x;
}
function taylorSeries(Ctor, n, x, y, isHyperbolic) {
  var j, t, u, x2, i = 1, pr = Ctor.precision, k = Math.ceil(pr / LOG_BASE);
  external = false;
  x2 = x.times(x);
  u = new Ctor(y);
  for (; ; ) {
    t = divide(u.times(x2), new Ctor(n++ * n++), pr, 1);
    u = isHyperbolic ? y.plus(t) : y.minus(t);
    y = divide(t.times(x2), new Ctor(n++ * n++), pr, 1);
    t = u.plus(y);
    if (t.d[k] !== void 0) {
      for (j = k; t.d[j] === u.d[j] && j--; ) ;
      if (j == -1) break;
    }
    j = u;
    u = y;
    y = t;
    t = j;
    i++;
  }
  external = true;
  t.d.length = k + 1;
  return t;
}
function tinyPow(b, e) {
  var n = b;
  while (--e) n *= b;
  return n;
}
function toLessThanHalfPi(Ctor, x) {
  var t, isNeg = x.s < 0, pi = getPi(Ctor, Ctor.precision, 1), halfPi = pi.times(0.5);
  x = x.abs();
  if (x.lte(halfPi)) {
    quadrant = isNeg ? 4 : 1;
    return x;
  }
  t = x.divToInt(pi);
  if (t.isZero()) {
    quadrant = isNeg ? 3 : 2;
  } else {
    x = x.minus(t.times(pi));
    if (x.lte(halfPi)) {
      quadrant = isOdd(t) ? isNeg ? 2 : 3 : isNeg ? 4 : 1;
      return x;
    }
    quadrant = isOdd(t) ? isNeg ? 1 : 4 : isNeg ? 3 : 2;
  }
  return x.minus(pi).abs();
}
function toStringBinary(x, baseOut, sd, rm) {
  var base, e, i, k, len, roundUp, str, xd, y, Ctor = x.constructor, isExp = sd !== void 0;
  if (isExp) {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);
  } else {
    sd = Ctor.precision;
    rm = Ctor.rounding;
  }
  if (!x.isFinite()) {
    str = nonFiniteToString(x);
  } else {
    str = finiteToString(x);
    i = str.indexOf(".");
    if (isExp) {
      base = 2;
      if (baseOut == 16) {
        sd = sd * 4 - 3;
      } else if (baseOut == 8) {
        sd = sd * 3 - 2;
      }
    } else {
      base = baseOut;
    }
    if (i >= 0) {
      str = str.replace(".", "");
      y = new Ctor(1);
      y.e = str.length - i;
      y.d = convertBase(finiteToString(y), 10, base);
      y.e = y.d.length;
    }
    xd = convertBase(str, 10, base);
    e = len = xd.length;
    for (; xd[--len] == 0; ) xd.pop();
    if (!xd[0]) {
      str = isExp ? "0p+0" : "0";
    } else {
      if (i < 0) {
        e--;
      } else {
        x = new Ctor(x);
        x.d = xd;
        x.e = e;
        x = divide(x, y, sd, rm, 0, base);
        xd = x.d;
        e = x.e;
        roundUp = inexact;
      }
      i = xd[sd];
      k = base / 2;
      roundUp = roundUp || xd[sd + 1] !== void 0;
      roundUp = rm < 4 ? (i !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2)) : i > k || i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 || rm === (x.s < 0 ? 8 : 7));
      xd.length = sd;
      if (roundUp) {
        for (; ++xd[--sd] > base - 1; ) {
          xd[sd] = 0;
          if (!sd) {
            ++e;
            xd.unshift(1);
          }
        }
      }
      for (len = xd.length; !xd[len - 1]; --len) ;
      for (i = 0, str = ""; i < len; i++) str += NUMERALS.charAt(xd[i]);
      if (isExp) {
        if (len > 1) {
          if (baseOut == 16 || baseOut == 8) {
            i = baseOut == 16 ? 4 : 3;
            for (--len; len % i; len++) str += "0";
            xd = convertBase(str, base, baseOut);
            for (len = xd.length; !xd[len - 1]; --len) ;
            for (i = 1, str = "1."; i < len; i++) str += NUMERALS.charAt(xd[i]);
          } else {
            str = str.charAt(0) + "." + str.slice(1);
          }
        }
        str = str + (e < 0 ? "p" : "p+") + e;
      } else if (e < 0) {
        for (; ++e; ) str = "0" + str;
        str = "0." + str;
      } else {
        if (++e > len) for (e -= len; e--; ) str += "0";
        else if (e < len) str = str.slice(0, e) + "." + str.slice(e);
      }
    }
    str = (baseOut == 16 ? "0x" : baseOut == 2 ? "0b" : baseOut == 8 ? "0o" : "") + str;
  }
  return x.s < 0 ? "-" + str : str;
}
function truncate(arr, len) {
  if (arr.length > len) {
    arr.length = len;
    return true;
  }
}
function abs2(x) {
  return new this(x).abs();
}
function acos(x) {
  return new this(x).acos();
}
function acosh(x) {
  return new this(x).acosh();
}
function add(x, y) {
  return new this(x).plus(y);
}
function asin(x) {
  return new this(x).asin();
}
function asinh(x) {
  return new this(x).asinh();
}
function atan(x) {
  return new this(x).atan();
}
function atanh(x) {
  return new this(x).atanh();
}
function atan2(y, x) {
  y = new this(y);
  x = new this(x);
  var r, pr = this.precision, rm = this.rounding, wpr = pr + 4;
  if (!y.s || !x.s) {
    r = new this(NaN);
  } else if (!y.d && !x.d) {
    r = getPi(this, wpr, 1).times(x.s > 0 ? 0.25 : 0.75);
    r.s = y.s;
  } else if (!x.d || y.isZero()) {
    r = x.s < 0 ? getPi(this, pr, rm) : new this(0);
    r.s = y.s;
  } else if (!y.d || x.isZero()) {
    r = getPi(this, wpr, 1).times(0.5);
    r.s = y.s;
  } else if (x.s < 0) {
    this.precision = wpr;
    this.rounding = 1;
    r = this.atan(divide(y, x, wpr, 1));
    x = getPi(this, wpr, 1);
    this.precision = pr;
    this.rounding = rm;
    r = y.s < 0 ? r.minus(x) : r.plus(x);
  } else {
    r = this.atan(divide(y, x, wpr, 1));
  }
  return r;
}
function cbrt3(x) {
  return new this(x).cbrt();
}
function ceil(x) {
  return finalise(x = new this(x), x.e + 1, 2);
}
function clamp(x, min3, max4) {
  return new this(x).clamp(min3, max4);
}
function config3(obj) {
  if (!obj || typeof obj !== "object") throw Error(decimalError + "Object expected");
  var i, p, v, useDefaults = obj.defaults === true, ps = [
    "precision",
    1,
    MAX_DIGITS,
    "rounding",
    0,
    8,
    "toExpNeg",
    -EXP_LIMIT,
    0,
    "toExpPos",
    0,
    EXP_LIMIT,
    "maxE",
    0,
    EXP_LIMIT,
    "minE",
    -EXP_LIMIT,
    0,
    "modulo",
    0,
    9
  ];
  for (i = 0; i < ps.length; i += 3) {
    if (p = ps[i], useDefaults) this[p] = DEFAULTS[p];
    if ((v = obj[p]) !== void 0) {
      if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2]) this[p] = v;
      else throw Error(invalidArgument + p + ": " + v);
    }
  }
  if (p = "crypto", useDefaults) this[p] = DEFAULTS[p];
  if ((v = obj[p]) !== void 0) {
    if (v === true || v === false || v === 0 || v === 1) {
      if (v) {
        if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
          this[p] = true;
        } else {
          throw Error(cryptoUnavailable);
        }
      } else {
        this[p] = false;
      }
    } else {
      throw Error(invalidArgument + p + ": " + v);
    }
  }
  return this;
}
function cos(x) {
  return new this(x).cos();
}
function cosh(x) {
  return new this(x).cosh();
}
function clone2(obj) {
  var i, p, ps;
  function Decimal2(v) {
    var e, i2, t, x = this;
    if (!(x instanceof Decimal2)) return new Decimal2(v);
    x.constructor = Decimal2;
    if (isDecimalInstance(v)) {
      x.s = v.s;
      if (external) {
        if (!v.d || v.e > Decimal2.maxE) {
          x.e = NaN;
          x.d = null;
        } else if (v.e < Decimal2.minE) {
          x.e = 0;
          x.d = [0];
        } else {
          x.e = v.e;
          x.d = v.d.slice();
        }
      } else {
        x.e = v.e;
        x.d = v.d ? v.d.slice() : v.d;
      }
      return;
    }
    t = typeof v;
    if (t === "number") {
      if (v === 0) {
        x.s = 1 / v < 0 ? -1 : 1;
        x.e = 0;
        x.d = [0];
        return;
      }
      if (v < 0) {
        v = -v;
        x.s = -1;
      } else {
        x.s = 1;
      }
      if (v === ~~v && v < 1e7) {
        for (e = 0, i2 = v; i2 >= 10; i2 /= 10) e++;
        if (external) {
          if (e > Decimal2.maxE) {
            x.e = NaN;
            x.d = null;
          } else if (e < Decimal2.minE) {
            x.e = 0;
            x.d = [0];
          } else {
            x.e = e;
            x.d = [v];
          }
        } else {
          x.e = e;
          x.d = [v];
        }
        return;
      }
      if (v * 0 !== 0) {
        if (!v) x.s = NaN;
        x.e = NaN;
        x.d = null;
        return;
      }
      return parseDecimal(x, v.toString());
    }
    if (t === "string") {
      if ((i2 = v.charCodeAt(0)) === 45) {
        v = v.slice(1);
        x.s = -1;
      } else {
        if (i2 === 43) v = v.slice(1);
        x.s = 1;
      }
      return isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
    }
    if (t === "bigint") {
      if (v < 0) {
        v = -v;
        x.s = -1;
      } else {
        x.s = 1;
      }
      return parseDecimal(x, v.toString());
    }
    throw Error(invalidArgument + v);
  }
  Decimal2.prototype = P;
  Decimal2.ROUND_UP = 0;
  Decimal2.ROUND_DOWN = 1;
  Decimal2.ROUND_CEIL = 2;
  Decimal2.ROUND_FLOOR = 3;
  Decimal2.ROUND_HALF_UP = 4;
  Decimal2.ROUND_HALF_DOWN = 5;
  Decimal2.ROUND_HALF_EVEN = 6;
  Decimal2.ROUND_HALF_CEIL = 7;
  Decimal2.ROUND_HALF_FLOOR = 8;
  Decimal2.EUCLID = 9;
  Decimal2.config = Decimal2.set = config3;
  Decimal2.clone = clone2;
  Decimal2.isDecimal = isDecimalInstance;
  Decimal2.abs = abs2;
  Decimal2.acos = acos;
  Decimal2.acosh = acosh;
  Decimal2.add = add;
  Decimal2.asin = asin;
  Decimal2.asinh = asinh;
  Decimal2.atan = atan;
  Decimal2.atanh = atanh;
  Decimal2.atan2 = atan2;
  Decimal2.cbrt = cbrt3;
  Decimal2.ceil = ceil;
  Decimal2.clamp = clamp;
  Decimal2.cos = cos;
  Decimal2.cosh = cosh;
  Decimal2.div = div;
  Decimal2.exp = exp;
  Decimal2.floor = floor;
  Decimal2.hypot = hypot;
  Decimal2.ln = ln;
  Decimal2.log = log;
  Decimal2.log10 = log103;
  Decimal2.log2 = log23;
  Decimal2.max = max3;
  Decimal2.min = min2;
  Decimal2.mod = mod;
  Decimal2.mul = mul;
  Decimal2.pow = pow;
  Decimal2.random = random;
  Decimal2.round = round;
  Decimal2.sign = sign2;
  Decimal2.sin = sin;
  Decimal2.sinh = sinh;
  Decimal2.sqrt = sqrt;
  Decimal2.sub = sub;
  Decimal2.sum = sum2;
  Decimal2.tan = tan;
  Decimal2.tanh = tanh;
  Decimal2.trunc = trunc;
  if (obj === void 0) obj = {};
  if (obj) {
    if (obj.defaults !== true) {
      ps = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"];
      for (i = 0; i < ps.length; ) if (!obj.hasOwnProperty(p = ps[i++])) obj[p] = this[p];
    }
  }
  Decimal2.config(obj);
  return Decimal2;
}
function div(x, y) {
  return new this(x).div(y);
}
function exp(x) {
  return new this(x).exp();
}
function floor(x) {
  return finalise(x = new this(x), x.e + 1, 3);
}
function hypot() {
  var i, n, t = new this(0);
  external = false;
  for (i = 0; i < arguments.length; ) {
    n = new this(arguments[i++]);
    if (!n.d) {
      if (n.s) {
        external = true;
        return new this(1 / 0);
      }
      t = n;
    } else if (t.d) {
      t = t.plus(n.times(n));
    }
  }
  external = true;
  return t.sqrt();
}
function isDecimalInstance(obj) {
  return obj instanceof Decimal || obj && obj.toStringTag === tag || false;
}
function ln(x) {
  return new this(x).ln();
}
function log(x, y) {
  return new this(x).log(y);
}
function log23(x) {
  return new this(x).log(2);
}
function log103(x) {
  return new this(x).log(10);
}
function max3() {
  return maxOrMin(this, arguments, -1);
}
function min2() {
  return maxOrMin(this, arguments, 1);
}
function mod(x, y) {
  return new this(x).mod(y);
}
function mul(x, y) {
  return new this(x).mul(y);
}
function pow(x, y) {
  return new this(x).pow(y);
}
function random(sd) {
  var d, e, k, n, i = 0, r = new this(1), rd = [];
  if (sd === void 0) sd = this.precision;
  else checkInt32(sd, 1, MAX_DIGITS);
  k = Math.ceil(sd / LOG_BASE);
  if (!this.crypto) {
    for (; i < k; ) rd[i++] = Math.random() * 1e7 | 0;
  } else if (crypto.getRandomValues) {
    d = crypto.getRandomValues(new Uint32Array(k));
    for (; i < k; ) {
      n = d[i];
      if (n >= 429e7) {
        d[i] = crypto.getRandomValues(new Uint32Array(1))[0];
      } else {
        rd[i++] = n % 1e7;
      }
    }
  } else if (crypto.randomBytes) {
    d = crypto.randomBytes(k *= 4);
    for (; i < k; ) {
      n = d[i] + (d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 127) << 24);
      if (n >= 214e7) {
        crypto.randomBytes(4).copy(d, i);
      } else {
        rd.push(n % 1e7);
        i += 4;
      }
    }
    i = k / 4;
  } else {
    throw Error(cryptoUnavailable);
  }
  k = rd[--i];
  sd %= LOG_BASE;
  if (k && sd) {
    n = mathpow(10, LOG_BASE - sd);
    rd[i] = (k / n | 0) * n;
  }
  for (; rd[i] === 0; i--) rd.pop();
  if (i < 0) {
    e = 0;
    rd = [0];
  } else {
    e = -1;
    for (; rd[0] === 0; e -= LOG_BASE) rd.shift();
    for (k = 1, n = rd[0]; n >= 10; n /= 10) k++;
    if (k < LOG_BASE) e -= LOG_BASE - k;
  }
  r.e = e;
  r.d = rd;
  return r;
}
function round(x) {
  return finalise(x = new this(x), x.e + 1, this.rounding);
}
function sign2(x) {
  x = new this(x);
  return x.d ? x.d[0] ? x.s : 0 * x.s : x.s || NaN;
}
function sin(x) {
  return new this(x).sin();
}
function sinh(x) {
  return new this(x).sinh();
}
function sqrt(x) {
  return new this(x).sqrt();
}
function sub(x, y) {
  return new this(x).sub(y);
}
function sum2() {
  var i = 0, args = arguments, x = new this(args[i]);
  external = false;
  for (; x.s && ++i < args.length; ) x = x.plus(args[i]);
  external = true;
  return finalise(x, this.precision, this.rounding);
}
function tan(x) {
  return new this(x).tan();
}
function tanh(x) {
  return new this(x).tanh();
}
function trunc(x) {
  return finalise(x = new this(x), x.e + 1, 1);
}
P[Symbol.for("nodejs.util.inspect.custom")] = P.toString;
P[Symbol.toStringTag] = "Decimal";
var Decimal = P.constructor = clone2(DEFAULTS);
LN10 = new Decimal(LN10);
PI = new Decimal(PI);
var decimal_default = Decimal;

// ../../../../../../node_modules/mathjs/lib/esm/type/bignumber/BigNumber.js
var name = "BigNumber";
var dependencies2 = ["?on", "config"];
var createBigNumberClass = /* @__PURE__ */ factory(name, dependencies2, (_ref) => {
  var {
    on,
    config: config4
  } = _ref;
  var BigNumber2 = decimal_default.clone({
    precision: config4.precision,
    modulo: decimal_default.EUCLID
  });
  BigNumber2.prototype = Object.create(BigNumber2.prototype);
  BigNumber2.prototype.type = "BigNumber";
  BigNumber2.prototype.isBigNumber = true;
  BigNumber2.prototype.toJSON = function() {
    return {
      mathjs: "BigNumber",
      value: this.toString()
    };
  };
  BigNumber2.fromJSON = function(json) {
    return new BigNumber2(json.value);
  };
  if (on) {
    on("config", function(curr, prev) {
      if (curr.precision !== prev.precision) {
        BigNumber2.config({
          precision: curr.precision
        });
      }
    });
  }
  return BigNumber2;
}, {
  isClass: true
});

// ../../../../../../node_modules/complex.js/dist/complex.mjs
var cosh2 = Math.cosh || function(x) {
  return Math.abs(x) < 1e-9 ? 1 - x : (Math.exp(x) + Math.exp(-x)) * 0.5;
};
var sinh2 = Math.sinh || function(x) {
  return Math.abs(x) < 1e-9 ? x : (Math.exp(x) - Math.exp(-x)) * 0.5;
};
var cosm1 = function(x) {
  const b = Math.PI / 4;
  if (-b > x || x > b) {
    return Math.cos(x) - 1;
  }
  const xx = x * x;
  return xx * (xx * (xx * (xx * (xx * (xx * (xx * (xx / 20922789888e3 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) + 1 / 40320) - 1 / 720) + 1 / 24) - 1 / 2);
};
var hypot2 = function(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  if (x < y) [x, y] = [y, x];
  if (x < 1e8) return Math.sqrt(x * x + y * y);
  y /= x;
  return x * Math.sqrt(1 + y * y);
};
var parser_exit = function() {
  throw SyntaxError("Invalid Param");
};
function logHypot(a, b) {
  const _a = Math.abs(a);
  const _b = Math.abs(b);
  if (a === 0) {
    return Math.log(_b);
  }
  if (b === 0) {
    return Math.log(_a);
  }
  if (_a < 3e3 && _b < 3e3) {
    return Math.log(a * a + b * b) * 0.5;
  }
  a = a * 0.5;
  b = b * 0.5;
  return 0.5 * Math.log(a * a + b * b) + Math.LN2;
}
var P2 = { "re": 0, "im": 0 };
var parse = function(a, b) {
  const z = P2;
  if (a === void 0 || a === null) {
    z["re"] = z["im"] = 0;
  } else if (b !== void 0) {
    z["re"] = a;
    z["im"] = b;
  } else
    switch (typeof a) {
      case "object":
        if ("im" in a && "re" in a) {
          z["re"] = a["re"];
          z["im"] = a["im"];
        } else if ("abs" in a && "arg" in a) {
          if (!isFinite(a["abs"]) && isFinite(a["arg"])) {
            return Complex["INFINITY"];
          }
          z["re"] = a["abs"] * Math.cos(a["arg"]);
          z["im"] = a["abs"] * Math.sin(a["arg"]);
        } else if ("r" in a && "phi" in a) {
          if (!isFinite(a["r"]) && isFinite(a["phi"])) {
            return Complex["INFINITY"];
          }
          z["re"] = a["r"] * Math.cos(a["phi"]);
          z["im"] = a["r"] * Math.sin(a["phi"]);
        } else if (a.length === 2) {
          z["re"] = a[0];
          z["im"] = a[1];
        } else {
          parser_exit();
        }
        break;
      case "string":
        z["im"] = /* void */
        z["re"] = 0;
        const tokens = a.replace(/_/g, "").match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);
        let plus = 1;
        let minus = 0;
        if (tokens === null) {
          parser_exit();
        }
        for (let i = 0; i < tokens.length; i++) {
          const c = tokens[i];
          if (c === " " || c === "	" || c === "\n") {
          } else if (c === "+") {
            plus++;
          } else if (c === "-") {
            minus++;
          } else if (c === "i" || c === "I") {
            if (plus + minus === 0) {
              parser_exit();
            }
            if (tokens[i + 1] !== " " && !isNaN(tokens[i + 1])) {
              z["im"] += parseFloat((minus % 2 ? "-" : "") + tokens[i + 1]);
              i++;
            } else {
              z["im"] += parseFloat((minus % 2 ? "-" : "") + "1");
            }
            plus = minus = 0;
          } else {
            if (plus + minus === 0 || isNaN(c)) {
              parser_exit();
            }
            if (tokens[i + 1] === "i" || tokens[i + 1] === "I") {
              z["im"] += parseFloat((minus % 2 ? "-" : "") + c);
              i++;
            } else {
              z["re"] += parseFloat((minus % 2 ? "-" : "") + c);
            }
            plus = minus = 0;
          }
        }
        if (plus + minus > 0) {
          parser_exit();
        }
        break;
      case "number":
        z["im"] = 0;
        z["re"] = a;
        break;
      default:
        parser_exit();
    }
  if (isNaN(z["re"]) || isNaN(z["im"])) {
  }
  return z;
};
function Complex(a, b) {
  if (!(this instanceof Complex)) {
    return new Complex(a, b);
  }
  const z = parse(a, b);
  this["re"] = z["re"];
  this["im"] = z["im"];
}
Complex.prototype = {
  "re": 0,
  "im": 0,
  /**
   * Calculates the sign of a complex number, which is a normalized complex
   *
   * @returns {Complex}
   */
  "sign": function() {
    const abs4 = hypot2(this["re"], this["im"]);
    return new Complex(
      this["re"] / abs4,
      this["im"] / abs4
    );
  },
  /**
   * Adds two complex numbers
   *
   * @returns {Complex}
   */
  "add": function(a, b) {
    const z = parse(a, b);
    const tInfin = this["isInfinite"]();
    const zInfin = !(isFinite(z["re"]) && isFinite(z["im"]));
    if (tInfin || zInfin) {
      if (tInfin && zInfin) {
        return Complex["NAN"];
      }
      return Complex["INFINITY"];
    }
    return new Complex(
      this["re"] + z["re"],
      this["im"] + z["im"]
    );
  },
  /**
   * Subtracts two complex numbers
   *
   * @returns {Complex}
   */
  "sub": function(a, b) {
    const z = parse(a, b);
    const tInfin = this["isInfinite"]();
    const zInfin = !(isFinite(z["re"]) && isFinite(z["im"]));
    if (tInfin || zInfin) {
      if (tInfin && zInfin) {
        return Complex["NAN"];
      }
      return Complex["INFINITY"];
    }
    return new Complex(
      this["re"] - z["re"],
      this["im"] - z["im"]
    );
  },
  /**
   * Multiplies two complex numbers
   *
   * @returns {Complex}
   */
  "mul": function(a, b) {
    const z = parse(a, b);
    const tInfin = this["isInfinite"]();
    const zInfin = !(isFinite(z["re"]) && isFinite(z["im"]));
    const tIsZero = this["re"] === 0 && this["im"] === 0;
    const zIsZero = z["re"] === 0 && z["im"] === 0;
    if (tInfin && zIsZero || zInfin && tIsZero) {
      return Complex["NAN"];
    }
    if (tInfin || zInfin) {
      return Complex["INFINITY"];
    }
    if (z["im"] === 0 && this["im"] === 0) {
      return new Complex(this["re"] * z["re"], 0);
    }
    return new Complex(
      this["re"] * z["re"] - this["im"] * z["im"],
      this["re"] * z["im"] + this["im"] * z["re"]
    );
  },
  /**
   * Divides two complex numbers
   *
   * @returns {Complex}
   */
  "div": function(a, b) {
    const z = parse(a, b);
    const tInfin = this["isInfinite"]();
    const zInfin = !(isFinite(z["re"]) && isFinite(z["im"]));
    const tIsZero = this["re"] === 0 && this["im"] === 0;
    const zIsZero = z["re"] === 0 && z["im"] === 0;
    if (tIsZero && zIsZero || tInfin && zInfin) {
      return Complex["NAN"];
    }
    if (zIsZero || tInfin) {
      return Complex["INFINITY"];
    }
    if (tIsZero || zInfin) {
      return Complex["ZERO"];
    }
    if (0 === z["im"]) {
      return new Complex(this["re"] / z["re"], this["im"] / z["re"]);
    }
    if (Math.abs(z["re"]) < Math.abs(z["im"])) {
      const x = z["re"] / z["im"];
      const t = z["re"] * x + z["im"];
      return new Complex(
        (this["re"] * x + this["im"]) / t,
        (this["im"] * x - this["re"]) / t
      );
    } else {
      const x = z["im"] / z["re"];
      const t = z["im"] * x + z["re"];
      return new Complex(
        (this["re"] + this["im"] * x) / t,
        (this["im"] - this["re"] * x) / t
      );
    }
  },
  /**
   * Calculate the power of two complex numbers
   *
   * @returns {Complex}
   */
  "pow": function(a, b) {
    const z = parse(a, b);
    const tIsZero = this["re"] === 0 && this["im"] === 0;
    const zIsZero = z["re"] === 0 && z["im"] === 0;
    if (zIsZero) {
      return Complex["ONE"];
    }
    if (z["im"] === 0) {
      if (this["im"] === 0 && this["re"] > 0) {
        return new Complex(Math.pow(this["re"], z["re"]), 0);
      } else if (this["re"] === 0) {
        switch ((z["re"] % 4 + 4) % 4) {
          case 0:
            return new Complex(Math.pow(this["im"], z["re"]), 0);
          case 1:
            return new Complex(0, Math.pow(this["im"], z["re"]));
          case 2:
            return new Complex(-Math.pow(this["im"], z["re"]), 0);
          case 3:
            return new Complex(0, -Math.pow(this["im"], z["re"]));
        }
      }
    }
    if (tIsZero && z["re"] > 0) {
      return Complex["ZERO"];
    }
    const arg = Math.atan2(this["im"], this["re"]);
    const loh = logHypot(this["re"], this["im"]);
    let re2 = Math.exp(z["re"] * loh - z["im"] * arg);
    let im = z["im"] * loh + z["re"] * arg;
    return new Complex(
      re2 * Math.cos(im),
      re2 * Math.sin(im)
    );
  },
  /**
   * Calculate the complex square root
   *
   * @returns {Complex}
   */
  "sqrt": function() {
    const a = this["re"];
    const b = this["im"];
    if (b === 0) {
      if (a >= 0) {
        return new Complex(Math.sqrt(a), 0);
      } else {
        return new Complex(0, Math.sqrt(-a));
      }
    }
    const r = hypot2(a, b);
    let re2 = Math.sqrt(0.5 * (r + Math.abs(a)));
    let im = Math.abs(b) / (2 * re2);
    if (a >= 0) {
      return new Complex(re2, b < 0 ? -im : im);
    } else {
      return new Complex(im, b < 0 ? -re2 : re2);
    }
  },
  /**
   * Calculate the complex exponent
   *
   * @returns {Complex}
   */
  "exp": function() {
    const er = Math.exp(this["re"]);
    if (this["im"] === 0) {
      return new Complex(er, 0);
    }
    return new Complex(
      er * Math.cos(this["im"]),
      er * Math.sin(this["im"])
    );
  },
  /**
   * Calculate the complex exponent and subtracts one.
   *
   * This may be more accurate than `Complex(x).exp().sub(1)` if
   * `x` is small.
   *
   * @returns {Complex}
   */
  "expm1": function() {
    const a = this["re"];
    const b = this["im"];
    return new Complex(
      Math.expm1(a) * Math.cos(b) + cosm1(b),
      Math.exp(a) * Math.sin(b)
    );
  },
  /**
   * Calculate the natural log
   *
   * @returns {Complex}
   */
  "log": function() {
    const a = this["re"];
    const b = this["im"];
    if (b === 0 && a > 0) {
      return new Complex(Math.log(a), 0);
    }
    return new Complex(
      logHypot(a, b),
      Math.atan2(b, a)
    );
  },
  /**
   * Calculate the magnitude of the complex number
   *
   * @returns {number}
   */
  "abs": function() {
    return hypot2(this["re"], this["im"]);
  },
  /**
   * Calculate the angle of the complex number
   *
   * @returns {number}
   */
  "arg": function() {
    return Math.atan2(this["im"], this["re"]);
  },
  /**
   * Calculate the sine of the complex number
   *
   * @returns {Complex}
   */
  "sin": function() {
    const a = this["re"];
    const b = this["im"];
    return new Complex(
      Math.sin(a) * cosh2(b),
      Math.cos(a) * sinh2(b)
    );
  },
  /**
   * Calculate the cosine
   *
   * @returns {Complex}
   */
  "cos": function() {
    const a = this["re"];
    const b = this["im"];
    return new Complex(
      Math.cos(a) * cosh2(b),
      -Math.sin(a) * sinh2(b)
    );
  },
  /**
   * Calculate the tangent
   *
   * @returns {Complex}
   */
  "tan": function() {
    const a = 2 * this["re"];
    const b = 2 * this["im"];
    const d = Math.cos(a) + cosh2(b);
    return new Complex(
      Math.sin(a) / d,
      sinh2(b) / d
    );
  },
  /**
   * Calculate the cotangent
   *
   * @returns {Complex}
   */
  "cot": function() {
    const a = 2 * this["re"];
    const b = 2 * this["im"];
    const d = Math.cos(a) - cosh2(b);
    return new Complex(
      -Math.sin(a) / d,
      sinh2(b) / d
    );
  },
  /**
   * Calculate the secant
   *
   * @returns {Complex}
   */
  "sec": function() {
    const a = this["re"];
    const b = this["im"];
    const d = 0.5 * cosh2(2 * b) + 0.5 * Math.cos(2 * a);
    return new Complex(
      Math.cos(a) * cosh2(b) / d,
      Math.sin(a) * sinh2(b) / d
    );
  },
  /**
   * Calculate the cosecans
   *
   * @returns {Complex}
   */
  "csc": function() {
    const a = this["re"];
    const b = this["im"];
    const d = 0.5 * cosh2(2 * b) - 0.5 * Math.cos(2 * a);
    return new Complex(
      Math.sin(a) * cosh2(b) / d,
      -Math.cos(a) * sinh2(b) / d
    );
  },
  /**
   * Calculate the complex arcus sinus
   *
   * @returns {Complex}
   */
  "asin": function() {
    const a = this["re"];
    const b = this["im"];
    const t1 = new Complex(
      b * b - a * a + 1,
      -2 * a * b
    )["sqrt"]();
    const t2 = new Complex(
      t1["re"] - b,
      t1["im"] + a
    )["log"]();
    return new Complex(t2["im"], -t2["re"]);
  },
  /**
   * Calculate the complex arcus cosinus
   *
   * @returns {Complex}
   */
  "acos": function() {
    const a = this["re"];
    const b = this["im"];
    const t1 = new Complex(
      b * b - a * a + 1,
      -2 * a * b
    )["sqrt"]();
    const t2 = new Complex(
      t1["re"] - b,
      t1["im"] + a
    )["log"]();
    return new Complex(Math.PI / 2 - t2["im"], t2["re"]);
  },
  /**
   * Calculate the complex arcus tangent
   *
   * @returns {Complex}
   */
  "atan": function() {
    const a = this["re"];
    const b = this["im"];
    if (a === 0) {
      if (b === 1) {
        return new Complex(0, Infinity);
      }
      if (b === -1) {
        return new Complex(0, -Infinity);
      }
    }
    const d = a * a + (1 - b) * (1 - b);
    const t1 = new Complex(
      (1 - b * b - a * a) / d,
      -2 * a / d
    ).log();
    return new Complex(-0.5 * t1["im"], 0.5 * t1["re"]);
  },
  /**
   * Calculate the complex arcus cotangent
   *
   * @returns {Complex}
   */
  "acot": function() {
    const a = this["re"];
    const b = this["im"];
    if (b === 0) {
      return new Complex(Math.atan2(1, a), 0);
    }
    const d = a * a + b * b;
    return d !== 0 ? new Complex(
      a / d,
      -b / d
    ).atan() : new Complex(
      a !== 0 ? a / 0 : 0,
      b !== 0 ? -b / 0 : 0
    ).atan();
  },
  /**
   * Calculate the complex arcus secant
   *
   * @returns {Complex}
   */
  "asec": function() {
    const a = this["re"];
    const b = this["im"];
    if (a === 0 && b === 0) {
      return new Complex(0, Infinity);
    }
    const d = a * a + b * b;
    return d !== 0 ? new Complex(
      a / d,
      -b / d
    ).acos() : new Complex(
      a !== 0 ? a / 0 : 0,
      b !== 0 ? -b / 0 : 0
    ).acos();
  },
  /**
   * Calculate the complex arcus cosecans
   *
   * @returns {Complex}
   */
  "acsc": function() {
    const a = this["re"];
    const b = this["im"];
    if (a === 0 && b === 0) {
      return new Complex(Math.PI / 2, Infinity);
    }
    const d = a * a + b * b;
    return d !== 0 ? new Complex(
      a / d,
      -b / d
    ).asin() : new Complex(
      a !== 0 ? a / 0 : 0,
      b !== 0 ? -b / 0 : 0
    ).asin();
  },
  /**
   * Calculate the complex sinh
   *
   * @returns {Complex}
   */
  "sinh": function() {
    const a = this["re"];
    const b = this["im"];
    return new Complex(
      sinh2(a) * Math.cos(b),
      cosh2(a) * Math.sin(b)
    );
  },
  /**
   * Calculate the complex cosh
   *
   * @returns {Complex}
   */
  "cosh": function() {
    const a = this["re"];
    const b = this["im"];
    return new Complex(
      cosh2(a) * Math.cos(b),
      sinh2(a) * Math.sin(b)
    );
  },
  /**
   * Calculate the complex tanh
   *
   * @returns {Complex}
   */
  "tanh": function() {
    const a = 2 * this["re"];
    const b = 2 * this["im"];
    const d = cosh2(a) + Math.cos(b);
    return new Complex(
      sinh2(a) / d,
      Math.sin(b) / d
    );
  },
  /**
   * Calculate the complex coth
   *
   * @returns {Complex}
   */
  "coth": function() {
    const a = 2 * this["re"];
    const b = 2 * this["im"];
    const d = cosh2(a) - Math.cos(b);
    return new Complex(
      sinh2(a) / d,
      -Math.sin(b) / d
    );
  },
  /**
   * Calculate the complex coth
   *
   * @returns {Complex}
   */
  "csch": function() {
    const a = this["re"];
    const b = this["im"];
    const d = Math.cos(2 * b) - cosh2(2 * a);
    return new Complex(
      -2 * sinh2(a) * Math.cos(b) / d,
      2 * cosh2(a) * Math.sin(b) / d
    );
  },
  /**
   * Calculate the complex sech
   *
   * @returns {Complex}
   */
  "sech": function() {
    const a = this["re"];
    const b = this["im"];
    const d = Math.cos(2 * b) + cosh2(2 * a);
    return new Complex(
      2 * cosh2(a) * Math.cos(b) / d,
      -2 * sinh2(a) * Math.sin(b) / d
    );
  },
  /**
   * Calculate the complex asinh
   *
   * @returns {Complex}
   */
  "asinh": function() {
    let tmp = this["im"];
    this["im"] = -this["re"];
    this["re"] = tmp;
    const res = this["asin"]();
    this["re"] = -this["im"];
    this["im"] = tmp;
    tmp = res["re"];
    res["re"] = -res["im"];
    res["im"] = tmp;
    return res;
  },
  /**
   * Calculate the complex acosh
   *
   * @returns {Complex}
   */
  "acosh": function() {
    const res = this["acos"]();
    if (res["im"] <= 0) {
      const tmp = res["re"];
      res["re"] = -res["im"];
      res["im"] = tmp;
    } else {
      const tmp = res["im"];
      res["im"] = -res["re"];
      res["re"] = tmp;
    }
    return res;
  },
  /**
   * Calculate the complex atanh
   *
   * @returns {Complex}
   */
  "atanh": function() {
    const a = this["re"];
    const b = this["im"];
    const noIM = a > 1 && b === 0;
    const oneMinus = 1 - a;
    const onePlus = 1 + a;
    const d = oneMinus * oneMinus + b * b;
    const x = d !== 0 ? new Complex(
      (onePlus * oneMinus - b * b) / d,
      (b * oneMinus + onePlus * b) / d
    ) : new Complex(
      a !== -1 ? a / 0 : 0,
      b !== 0 ? b / 0 : 0
    );
    const temp = x["re"];
    x["re"] = logHypot(x["re"], x["im"]) / 2;
    x["im"] = Math.atan2(x["im"], temp) / 2;
    if (noIM) {
      x["im"] = -x["im"];
    }
    return x;
  },
  /**
   * Calculate the complex acoth
   *
   * @returns {Complex}
   */
  "acoth": function() {
    const a = this["re"];
    const b = this["im"];
    if (a === 0 && b === 0) {
      return new Complex(0, Math.PI / 2);
    }
    const d = a * a + b * b;
    return d !== 0 ? new Complex(
      a / d,
      -b / d
    ).atanh() : new Complex(
      a !== 0 ? a / 0 : 0,
      b !== 0 ? -b / 0 : 0
    ).atanh();
  },
  /**
   * Calculate the complex acsch
   *
   * @returns {Complex}
   */
  "acsch": function() {
    const a = this["re"];
    const b = this["im"];
    if (b === 0) {
      return new Complex(
        a !== 0 ? Math.log(a + Math.sqrt(a * a + 1)) : Infinity,
        0
      );
    }
    const d = a * a + b * b;
    return d !== 0 ? new Complex(
      a / d,
      -b / d
    ).asinh() : new Complex(
      a !== 0 ? a / 0 : 0,
      b !== 0 ? -b / 0 : 0
    ).asinh();
  },
  /**
   * Calculate the complex asech
   *
   * @returns {Complex}
   */
  "asech": function() {
    const a = this["re"];
    const b = this["im"];
    if (this["isZero"]()) {
      return Complex["INFINITY"];
    }
    const d = a * a + b * b;
    return d !== 0 ? new Complex(
      a / d,
      -b / d
    ).acosh() : new Complex(
      a !== 0 ? a / 0 : 0,
      b !== 0 ? -b / 0 : 0
    ).acosh();
  },
  /**
   * Calculate the complex inverse 1/z
   *
   * @returns {Complex}
   */
  "inverse": function() {
    if (this["isZero"]()) {
      return Complex["INFINITY"];
    }
    if (this["isInfinite"]()) {
      return Complex["ZERO"];
    }
    const a = this["re"];
    const b = this["im"];
    const d = a * a + b * b;
    return new Complex(a / d, -b / d);
  },
  /**
   * Returns the complex conjugate
   *
   * @returns {Complex}
   */
  "conjugate": function() {
    return new Complex(this["re"], -this["im"]);
  },
  /**
   * Gets the negated complex number
   *
   * @returns {Complex}
   */
  "neg": function() {
    return new Complex(-this["re"], -this["im"]);
  },
  /**
   * Ceils the actual complex number
   *
   * @returns {Complex}
   */
  "ceil": function(places) {
    places = Math.pow(10, places || 0);
    return new Complex(
      Math.ceil(this["re"] * places) / places,
      Math.ceil(this["im"] * places) / places
    );
  },
  /**
   * Floors the actual complex number
   *
   * @returns {Complex}
   */
  "floor": function(places) {
    places = Math.pow(10, places || 0);
    return new Complex(
      Math.floor(this["re"] * places) / places,
      Math.floor(this["im"] * places) / places
    );
  },
  /**
   * Ceils the actual complex number
   *
   * @returns {Complex}
   */
  "round": function(places) {
    places = Math.pow(10, places || 0);
    return new Complex(
      Math.round(this["re"] * places) / places,
      Math.round(this["im"] * places) / places
    );
  },
  /**
   * Compares two complex numbers
   *
   * **Note:** new Complex(Infinity).equals(Infinity) === false
   *
   * @returns {boolean}
   */
  "equals": function(a, b) {
    const z = parse(a, b);
    return Math.abs(z["re"] - this["re"]) <= Complex["EPSILON"] && Math.abs(z["im"] - this["im"]) <= Complex["EPSILON"];
  },
  /**
   * Clones the actual object
   *
   * @returns {Complex}
   */
  "clone": function() {
    return new Complex(this["re"], this["im"]);
  },
  /**
   * Gets a string of the actual complex number
   *
   * @returns {string}
   */
  "toString": function() {
    let a = this["re"];
    let b = this["im"];
    let ret = "";
    if (this["isNaN"]()) {
      return "NaN";
    }
    if (this["isInfinite"]()) {
      return "Infinity";
    }
    if (Math.abs(a) < Complex["EPSILON"]) {
      a = 0;
    }
    if (Math.abs(b) < Complex["EPSILON"]) {
      b = 0;
    }
    if (b === 0) {
      return ret + a;
    }
    if (a !== 0) {
      ret += a;
      ret += " ";
      if (b < 0) {
        b = -b;
        ret += "-";
      } else {
        ret += "+";
      }
      ret += " ";
    } else if (b < 0) {
      b = -b;
      ret += "-";
    }
    if (1 !== b) {
      ret += b;
    }
    return ret + "i";
  },
  /**
   * Returns the actual number as a vector
   *
   * @returns {Array}
   */
  "toVector": function() {
    return [this["re"], this["im"]];
  },
  /**
   * Returns the actual real value of the current object
   *
   * @returns {number|null}
   */
  "valueOf": function() {
    if (this["im"] === 0) {
      return this["re"];
    }
    return null;
  },
  /**
   * Determines whether a complex number is not on the Riemann sphere.
   *
   * @returns {boolean}
   */
  "isNaN": function() {
    return isNaN(this["re"]) || isNaN(this["im"]);
  },
  /**
   * Determines whether or not a complex number is at the zero pole of the
   * Riemann sphere.
   *
   * @returns {boolean}
   */
  "isZero": function() {
    return this["im"] === 0 && this["re"] === 0;
  },
  /**
   * Determines whether a complex number is not at the infinity pole of the
   * Riemann sphere.
   *
   * @returns {boolean}
   */
  "isFinite": function() {
    return isFinite(this["re"]) && isFinite(this["im"]);
  },
  /**
   * Determines whether or not a complex number is at the infinity pole of the
   * Riemann sphere.
   *
   * @returns {boolean}
   */
  "isInfinite": function() {
    return !this["isFinite"]();
  }
};
Complex["ZERO"] = new Complex(0, 0);
Complex["ONE"] = new Complex(1, 0);
Complex["I"] = new Complex(0, 1);
Complex["PI"] = new Complex(Math.PI, 0);
Complex["E"] = new Complex(Math.E, 0);
Complex["INFINITY"] = new Complex(Infinity, Infinity);
Complex["NAN"] = new Complex(NaN, NaN);
Complex["EPSILON"] = 1e-15;

// ../../../../../../node_modules/mathjs/lib/esm/type/complex/Complex.js
var name2 = "Complex";
var dependencies3 = [];
var createComplexClass = /* @__PURE__ */ factory(name2, dependencies3, () => {
  Object.defineProperty(Complex, "name", {
    value: "Complex"
  });
  Complex.prototype.constructor = Complex;
  Complex.prototype.type = "Complex";
  Complex.prototype.isComplex = true;
  Complex.prototype.toJSON = function() {
    return {
      mathjs: "Complex",
      re: this.re,
      im: this.im
    };
  };
  Complex.prototype.toPolar = function() {
    return {
      r: this.abs(),
      phi: this.arg()
    };
  };
  Complex.prototype.format = function(options) {
    var str = "";
    var im = this.im;
    var re2 = this.re;
    var strRe = format2(this.re, options);
    var strIm = format2(this.im, options);
    var precision = isNumber(options) ? options : options ? options.precision : null;
    if (precision !== null) {
      var epsilon2 = Math.pow(10, -precision);
      if (Math.abs(re2 / im) < epsilon2) {
        re2 = 0;
      }
      if (Math.abs(im / re2) < epsilon2) {
        im = 0;
      }
    }
    if (im === 0) {
      str = strRe;
    } else if (re2 === 0) {
      if (im === 1) {
        str = "i";
      } else if (im === -1) {
        str = "-i";
      } else {
        str = strIm + "i";
      }
    } else {
      if (im < 0) {
        if (im === -1) {
          str = strRe + " - i";
        } else {
          str = strRe + " - " + strIm.substring(1) + "i";
        }
      } else {
        if (im === 1) {
          str = strRe + " + i";
        } else {
          str = strRe + " + " + strIm + "i";
        }
      }
    }
    return str;
  };
  Complex.fromPolar = function(args) {
    switch (arguments.length) {
      case 1: {
        var arg = arguments[0];
        if (typeof arg === "object") {
          return Complex(arg);
        } else {
          throw new TypeError("Input has to be an object with r and phi keys.");
        }
      }
      case 2: {
        var r = arguments[0];
        var phi = arguments[1];
        if (isNumber(r)) {
          if (isUnit(phi) && phi.hasBase("ANGLE")) {
            phi = phi.toNumber("rad");
          }
          if (isNumber(phi)) {
            return new Complex({
              r,
              phi
            });
          }
          throw new TypeError("Phi is not a number nor an angle unit.");
        } else {
          throw new TypeError("Radius r is not a number.");
        }
      }
      default:
        throw new SyntaxError("Wrong number of arguments in function fromPolar");
    }
  };
  Complex.prototype.valueOf = Complex.prototype.toString;
  Complex.fromJSON = function(json) {
    return new Complex(json);
  };
  Complex.compare = function(a, b) {
    if (a.re > b.re) {
      return 1;
    }
    if (a.re < b.re) {
      return -1;
    }
    if (a.im > b.im) {
      return 1;
    }
    if (a.im < b.im) {
      return -1;
    }
    return 0;
  };
  return Complex;
}, {
  isClass: true
});

// ../../../../../../node_modules/fraction.js/dist/fraction.mjs
if (typeof BigInt === "undefined") BigInt = function(n) {
  if (isNaN(n)) throw new Error("");
  return n;
};
var C_ZERO = BigInt(0);
var C_ONE = BigInt(1);
var C_TWO = BigInt(2);
var C_THREE = BigInt(3);
var C_FIVE = BigInt(5);
var C_TEN = BigInt(10);
var MAX_INTEGER = BigInt(Number.MAX_SAFE_INTEGER);
var MAX_CYCLE_LEN = 2e3;
var P3 = {
  "s": C_ONE,
  "n": C_ZERO,
  "d": C_ONE
};
function assign(n, s) {
  try {
    n = BigInt(n);
  } catch (e) {
    throw InvalidParameter();
  }
  return n * s;
}
function ifloor(x) {
  return typeof x === "bigint" ? x : Math.floor(x);
}
function newFraction(n, d) {
  if (d === C_ZERO) {
    throw DivisionByZero();
  }
  const f = Object.create(Fraction.prototype);
  f["s"] = n < C_ZERO ? -C_ONE : C_ONE;
  n = n < C_ZERO ? -n : n;
  const a = gcd(n, d);
  f["n"] = n / a;
  f["d"] = d / a;
  return f;
}
var FACTORSTEPS = [C_TWO * C_TWO, C_TWO, C_TWO * C_TWO, C_TWO, C_TWO * C_TWO, C_TWO * C_THREE, C_TWO, C_TWO * C_THREE];
function factorize(n) {
  const factors = /* @__PURE__ */ Object.create(null);
  if (n <= C_ONE) {
    factors[n] = C_ONE;
    return factors;
  }
  const add3 = (p) => {
    factors[p] = (factors[p] || C_ZERO) + C_ONE;
  };
  while (n % C_TWO === C_ZERO) {
    add3(C_TWO);
    n /= C_TWO;
  }
  while (n % C_THREE === C_ZERO) {
    add3(C_THREE);
    n /= C_THREE;
  }
  while (n % C_FIVE === C_ZERO) {
    add3(C_FIVE);
    n /= C_FIVE;
  }
  for (let si = 0, p = C_TWO + C_FIVE; p * p <= n; ) {
    while (n % p === C_ZERO) {
      add3(p);
      n /= p;
    }
    p += FACTORSTEPS[si];
    si = si + 1 & 7;
  }
  if (n > C_ONE) add3(n);
  return factors;
}
var parse2 = function(p1, p2) {
  let n = C_ZERO, d = C_ONE, s = C_ONE;
  if (p1 === void 0 || p1 === null) {
  } else if (p2 !== void 0) {
    if (typeof p1 === "bigint") {
      n = p1;
    } else if (isNaN(p1)) {
      throw InvalidParameter();
    } else if (p1 % 1 !== 0) {
      throw NonIntegerParameter();
    } else {
      n = BigInt(p1);
    }
    if (typeof p2 === "bigint") {
      d = p2;
    } else if (isNaN(p2)) {
      throw InvalidParameter();
    } else if (p2 % 1 !== 0) {
      throw NonIntegerParameter();
    } else {
      d = BigInt(p2);
    }
    s = n * d;
  } else if (typeof p1 === "object") {
    if ("d" in p1 && "n" in p1) {
      n = BigInt(p1["n"]);
      d = BigInt(p1["d"]);
      if ("s" in p1)
        n *= BigInt(p1["s"]);
    } else if (0 in p1) {
      n = BigInt(p1[0]);
      if (1 in p1)
        d = BigInt(p1[1]);
    } else if (typeof p1 === "bigint") {
      n = p1;
    } else {
      throw InvalidParameter();
    }
    s = n * d;
  } else if (typeof p1 === "number") {
    if (isNaN(p1)) {
      throw InvalidParameter();
    }
    if (p1 < 0) {
      s = -C_ONE;
      p1 = -p1;
    }
    if (p1 % 1 === 0) {
      n = BigInt(p1);
    } else {
      let z = 1;
      let A = 0, B = 1;
      let C = 1, D = 1;
      let N = 1e7;
      if (p1 >= 1) {
        z = 10 ** Math.floor(1 + Math.log10(p1));
        p1 /= z;
      }
      while (B <= N && D <= N) {
        let M = (A + C) / (B + D);
        if (p1 === M) {
          if (B + D <= N) {
            n = A + C;
            d = B + D;
          } else if (D > B) {
            n = C;
            d = D;
          } else {
            n = A;
            d = B;
          }
          break;
        } else {
          if (p1 > M) {
            A += C;
            B += D;
          } else {
            C += A;
            D += B;
          }
          if (B > N) {
            n = C;
            d = D;
          } else {
            n = A;
            d = B;
          }
        }
      }
      n = BigInt(n) * BigInt(z);
      d = BigInt(d);
    }
  } else if (typeof p1 === "string") {
    let ndx = 0;
    let v = C_ZERO, w = C_ZERO, x = C_ZERO, y = C_ONE, z = C_ONE;
    let match = p1.replace(/_/g, "").match(/\d+|./g);
    if (match === null)
      throw InvalidParameter();
    if (match[ndx] === "-") {
      s = -C_ONE;
      ndx++;
    } else if (match[ndx] === "+") {
      ndx++;
    }
    if (match.length === ndx + 1) {
      w = assign(match[ndx++], s);
    } else if (match[ndx + 1] === "." || match[ndx] === ".") {
      if (match[ndx] !== ".") {
        v = assign(match[ndx++], s);
      }
      ndx++;
      if (ndx + 1 === match.length || match[ndx + 1] === "(" && match[ndx + 3] === ")" || match[ndx + 1] === "'" && match[ndx + 3] === "'") {
        w = assign(match[ndx], s);
        y = C_TEN ** BigInt(match[ndx].length);
        ndx++;
      }
      if (match[ndx] === "(" && match[ndx + 2] === ")" || match[ndx] === "'" && match[ndx + 2] === "'") {
        x = assign(match[ndx + 1], s);
        z = C_TEN ** BigInt(match[ndx + 1].length) - C_ONE;
        ndx += 3;
      }
    } else if (match[ndx + 1] === "/" || match[ndx + 1] === ":") {
      w = assign(match[ndx], s);
      y = assign(match[ndx + 2], C_ONE);
      ndx += 3;
    } else if (match[ndx + 3] === "/" && match[ndx + 1] === " ") {
      v = assign(match[ndx], s);
      w = assign(match[ndx + 2], s);
      y = assign(match[ndx + 4], C_ONE);
      ndx += 5;
    }
    if (match.length <= ndx) {
      d = y * z;
      s = /* void */
      n = x + d * v + z * w;
    } else {
      throw InvalidParameter();
    }
  } else if (typeof p1 === "bigint") {
    n = p1;
    s = p1;
    d = C_ONE;
  } else {
    throw InvalidParameter();
  }
  if (d === C_ZERO) {
    throw DivisionByZero();
  }
  P3["s"] = s < C_ZERO ? -C_ONE : C_ONE;
  P3["n"] = n < C_ZERO ? -n : n;
  P3["d"] = d < C_ZERO ? -d : d;
};
function modpow(b, e, m) {
  let r = C_ONE;
  for (; e > C_ZERO; b = b * b % m, e >>= C_ONE) {
    if (e & C_ONE) {
      r = r * b % m;
    }
  }
  return r;
}
function cycleLen(n, d) {
  for (; d % C_TWO === C_ZERO; d /= C_TWO) {
  }
  for (; d % C_FIVE === C_ZERO; d /= C_FIVE) {
  }
  if (d === C_ONE)
    return C_ZERO;
  let rem = C_TEN % d;
  let t = 1;
  for (; rem !== C_ONE; t++) {
    rem = rem * C_TEN % d;
    if (t > MAX_CYCLE_LEN)
      return C_ZERO;
  }
  return BigInt(t);
}
function cycleStart(n, d, len) {
  let rem1 = C_ONE;
  let rem2 = modpow(C_TEN, len, d);
  for (let t = 0; t < 300; t++) {
    if (rem1 === rem2)
      return BigInt(t);
    rem1 = rem1 * C_TEN % d;
    rem2 = rem2 * C_TEN % d;
  }
  return 0;
}
function gcd(a, b) {
  if (!a)
    return b;
  if (!b)
    return a;
  while (1) {
    a %= b;
    if (!a)
      return b;
    b %= a;
    if (!b)
      return a;
  }
}
function Fraction(a, b) {
  parse2(a, b);
  if (this instanceof Fraction) {
    a = gcd(P3["d"], P3["n"]);
    this["s"] = P3["s"];
    this["n"] = P3["n"] / a;
    this["d"] = P3["d"] / a;
  } else {
    return newFraction(P3["s"] * P3["n"], P3["d"]);
  }
}
var DivisionByZero = function() {
  return new Error("Division by Zero");
};
var InvalidParameter = function() {
  return new Error("Invalid argument");
};
var NonIntegerParameter = function() {
  return new Error("Parameters must be integer");
};
Fraction.prototype = {
  "s": C_ONE,
  "n": C_ZERO,
  "d": C_ONE,
  /**
   * Calculates the absolute value
   *
   * Ex: new Fraction(-4).abs() => 4
   **/
  "abs": function() {
    return newFraction(this["n"], this["d"]);
  },
  /**
   * Inverts the sign of the current fraction
   *
   * Ex: new Fraction(-4).neg() => 4
   **/
  "neg": function() {
    return newFraction(-this["s"] * this["n"], this["d"]);
  },
  /**
   * Adds two rational numbers
   *
   * Ex: new Fraction({n: 2, d: 3}).add("14.9") => 467 / 30
   **/
  "add": function(a, b) {
    parse2(a, b);
    return newFraction(
      this["s"] * this["n"] * P3["d"] + P3["s"] * this["d"] * P3["n"],
      this["d"] * P3["d"]
    );
  },
  /**
   * Subtracts two rational numbers
   *
   * Ex: new Fraction({n: 2, d: 3}).add("14.9") => -427 / 30
   **/
  "sub": function(a, b) {
    parse2(a, b);
    return newFraction(
      this["s"] * this["n"] * P3["d"] - P3["s"] * this["d"] * P3["n"],
      this["d"] * P3["d"]
    );
  },
  /**
   * Multiplies two rational numbers
   *
   * Ex: new Fraction("-17.(345)").mul(3) => 5776 / 111
   **/
  "mul": function(a, b) {
    parse2(a, b);
    return newFraction(
      this["s"] * P3["s"] * this["n"] * P3["n"],
      this["d"] * P3["d"]
    );
  },
  /**
   * Divides two rational numbers
   *
   * Ex: new Fraction("-17.(345)").inverse().div(3)
   **/
  "div": function(a, b) {
    parse2(a, b);
    return newFraction(
      this["s"] * P3["s"] * this["n"] * P3["d"],
      this["d"] * P3["n"]
    );
  },
  /**
   * Clones the actual object
   *
   * Ex: new Fraction("-17.(345)").clone()
   **/
  "clone": function() {
    return newFraction(this["s"] * this["n"], this["d"]);
  },
  /**
   * Calculates the modulo of two rational numbers - a more precise fmod
   *
   * Ex: new Fraction('4.(3)').mod([7, 8]) => (13/3) % (7/8) = (5/6)
   * Ex: new Fraction(20, 10).mod().equals(0) ? "is Integer"
   **/
  "mod": function(a, b) {
    if (a === void 0) {
      return newFraction(this["s"] * this["n"] % this["d"], C_ONE);
    }
    parse2(a, b);
    if (C_ZERO === P3["n"] * this["d"]) {
      throw DivisionByZero();
    }
    return newFraction(
      this["s"] * (P3["d"] * this["n"]) % (P3["n"] * this["d"]),
      P3["d"] * this["d"]
    );
  },
  /**
   * Calculates the fractional gcd of two rational numbers
   *
   * Ex: new Fraction(5,8).gcd(3,7) => 1/56
   */
  "gcd": function(a, b) {
    parse2(a, b);
    return newFraction(gcd(P3["n"], this["n"]) * gcd(P3["d"], this["d"]), P3["d"] * this["d"]);
  },
  /**
   * Calculates the fractional lcm of two rational numbers
   *
   * Ex: new Fraction(5,8).lcm(3,7) => 15
   */
  "lcm": function(a, b) {
    parse2(a, b);
    if (P3["n"] === C_ZERO && this["n"] === C_ZERO) {
      return newFraction(C_ZERO, C_ONE);
    }
    return newFraction(P3["n"] * this["n"], gcd(P3["n"], this["n"]) * gcd(P3["d"], this["d"]));
  },
  /**
   * Gets the inverse of the fraction, means numerator and denominator are exchanged
   *
   * Ex: new Fraction([-3, 4]).inverse() => -4 / 3
   **/
  "inverse": function() {
    return newFraction(this["s"] * this["d"], this["n"]);
  },
  /**
   * Calculates the fraction to some integer exponent
   *
   * Ex: new Fraction(-1,2).pow(-3) => -8
   */
  "pow": function(a, b) {
    parse2(a, b);
    if (P3["d"] === C_ONE) {
      if (P3["s"] < C_ZERO) {
        return newFraction((this["s"] * this["d"]) ** P3["n"], this["n"] ** P3["n"]);
      } else {
        return newFraction((this["s"] * this["n"]) ** P3["n"], this["d"] ** P3["n"]);
      }
    }
    if (this["s"] < C_ZERO) return null;
    let N = factorize(this["n"]);
    let D = factorize(this["d"]);
    let n = C_ONE;
    let d = C_ONE;
    for (let k in N) {
      if (k === "1") continue;
      if (k === "0") {
        n = C_ZERO;
        break;
      }
      N[k] *= P3["n"];
      if (N[k] % P3["d"] === C_ZERO) {
        N[k] /= P3["d"];
      } else return null;
      n *= BigInt(k) ** N[k];
    }
    for (let k in D) {
      if (k === "1") continue;
      D[k] *= P3["n"];
      if (D[k] % P3["d"] === C_ZERO) {
        D[k] /= P3["d"];
      } else return null;
      d *= BigInt(k) ** D[k];
    }
    if (P3["s"] < C_ZERO) {
      return newFraction(d, n);
    }
    return newFraction(n, d);
  },
  /**
   * Calculates the logarithm of a fraction to a given rational base
   *
   * Ex: new Fraction(27, 8).log(9, 4) => 3/2
   */
  "log": function(a, b) {
    parse2(a, b);
    if (this["s"] <= C_ZERO || P3["s"] <= C_ZERO) return null;
    const allPrimes = /* @__PURE__ */ Object.create(null);
    const baseFactors = factorize(P3["n"]);
    const T1 = factorize(P3["d"]);
    const numberFactors = factorize(this["n"]);
    const T2 = factorize(this["d"]);
    for (const prime in T1) {
      baseFactors[prime] = (baseFactors[prime] || C_ZERO) - T1[prime];
    }
    for (const prime in T2) {
      numberFactors[prime] = (numberFactors[prime] || C_ZERO) - T2[prime];
    }
    for (const prime in baseFactors) {
      if (prime === "1") continue;
      allPrimes[prime] = true;
    }
    for (const prime in numberFactors) {
      if (prime === "1") continue;
      allPrimes[prime] = true;
    }
    let retN = null;
    let retD = null;
    for (const prime in allPrimes) {
      const baseExponent = baseFactors[prime] || C_ZERO;
      const numberExponent = numberFactors[prime] || C_ZERO;
      if (baseExponent === C_ZERO) {
        if (numberExponent !== C_ZERO) {
          return null;
        }
        continue;
      }
      let curN = numberExponent;
      let curD = baseExponent;
      const gcdValue = gcd(curN, curD);
      curN /= gcdValue;
      curD /= gcdValue;
      if (retN === null && retD === null) {
        retN = curN;
        retD = curD;
      } else if (curN * retD !== retN * curD) {
        return null;
      }
    }
    return retN !== null && retD !== null ? newFraction(retN, retD) : null;
  },
  /**
   * Check if two rational numbers are the same
   *
   * Ex: new Fraction(19.6).equals([98, 5]);
   **/
  "equals": function(a, b) {
    parse2(a, b);
    return this["s"] * this["n"] * P3["d"] === P3["s"] * P3["n"] * this["d"];
  },
  /**
   * Check if this rational number is less than another
   *
   * Ex: new Fraction(19.6).lt([98, 5]);
   **/
  "lt": function(a, b) {
    parse2(a, b);
    return this["s"] * this["n"] * P3["d"] < P3["s"] * P3["n"] * this["d"];
  },
  /**
   * Check if this rational number is less than or equal another
   *
   * Ex: new Fraction(19.6).lt([98, 5]);
   **/
  "lte": function(a, b) {
    parse2(a, b);
    return this["s"] * this["n"] * P3["d"] <= P3["s"] * P3["n"] * this["d"];
  },
  /**
   * Check if this rational number is greater than another
   *
   * Ex: new Fraction(19.6).lt([98, 5]);
   **/
  "gt": function(a, b) {
    parse2(a, b);
    return this["s"] * this["n"] * P3["d"] > P3["s"] * P3["n"] * this["d"];
  },
  /**
   * Check if this rational number is greater than or equal another
   *
   * Ex: new Fraction(19.6).lt([98, 5]);
   **/
  "gte": function(a, b) {
    parse2(a, b);
    return this["s"] * this["n"] * P3["d"] >= P3["s"] * P3["n"] * this["d"];
  },
  /**
   * Compare two rational numbers
   * < 0 iff this < that
   * > 0 iff this > that
   * = 0 iff this = that
   *
   * Ex: new Fraction(19.6).compare([98, 5]);
   **/
  "compare": function(a, b) {
    parse2(a, b);
    let t = this["s"] * this["n"] * P3["d"] - P3["s"] * P3["n"] * this["d"];
    return (C_ZERO < t) - (t < C_ZERO);
  },
  /**
   * Calculates the ceil of a rational number
   *
   * Ex: new Fraction('4.(3)').ceil() => (5 / 1)
   **/
  "ceil": function(places) {
    places = C_TEN ** BigInt(places || 0);
    return newFraction(
      ifloor(this["s"] * places * this["n"] / this["d"]) + (places * this["n"] % this["d"] > C_ZERO && this["s"] >= C_ZERO ? C_ONE : C_ZERO),
      places
    );
  },
  /**
   * Calculates the floor of a rational number
   *
   * Ex: new Fraction('4.(3)').floor() => (4 / 1)
   **/
  "floor": function(places) {
    places = C_TEN ** BigInt(places || 0);
    return newFraction(
      ifloor(this["s"] * places * this["n"] / this["d"]) - (places * this["n"] % this["d"] > C_ZERO && this["s"] < C_ZERO ? C_ONE : C_ZERO),
      places
    );
  },
  /**
   * Rounds a rational numbers
   *
   * Ex: new Fraction('4.(3)').round() => (4 / 1)
   **/
  "round": function(places) {
    places = C_TEN ** BigInt(places || 0);
    return newFraction(
      ifloor(this["s"] * places * this["n"] / this["d"]) + this["s"] * ((this["s"] >= C_ZERO ? C_ONE : C_ZERO) + C_TWO * (places * this["n"] % this["d"]) > this["d"] ? C_ONE : C_ZERO),
      places
    );
  },
  /**
    * Rounds a rational number to a multiple of another rational number
    *
    * Ex: new Fraction('0.9').roundTo("1/8") => 7 / 8
    **/
  "roundTo": function(a, b) {
    parse2(a, b);
    const n = this["n"] * P3["d"];
    const d = this["d"] * P3["n"];
    const r = n % d;
    let k = ifloor(n / d);
    if (r + r >= d) {
      k++;
    }
    return newFraction(this["s"] * k * P3["n"], P3["d"]);
  },
  /**
   * Check if two rational numbers are divisible
   *
   * Ex: new Fraction(19.6).divisible(1.5);
   */
  "divisible": function(a, b) {
    parse2(a, b);
    if (P3["n"] === C_ZERO) return false;
    return this["n"] * P3["d"] % (P3["n"] * this["d"]) === C_ZERO;
  },
  /**
   * Returns a decimal representation of the fraction
   *
   * Ex: new Fraction("100.'91823'").valueOf() => 100.91823918239183
   **/
  "valueOf": function() {
    return Number(this["s"] * this["n"]) / Number(this["d"]);
  },
  /**
   * Creates a string representation of a fraction with all digits
   *
   * Ex: new Fraction("100.'91823'").toString() => "100.(91823)"
   **/
  "toString": function(dec = 15) {
    let N = this["n"];
    let D = this["d"];
    let cycLen = cycleLen(N, D);
    let cycOff = cycleStart(N, D, cycLen);
    let str = this["s"] < C_ZERO ? "-" : "";
    str += ifloor(N / D);
    N %= D;
    N *= C_TEN;
    if (N)
      str += ".";
    if (cycLen) {
      for (let i = cycOff; i--; ) {
        str += ifloor(N / D);
        N %= D;
        N *= C_TEN;
      }
      str += "(";
      for (let i = cycLen; i--; ) {
        str += ifloor(N / D);
        N %= D;
        N *= C_TEN;
      }
      str += ")";
    } else {
      for (let i = dec; N && i--; ) {
        str += ifloor(N / D);
        N %= D;
        N *= C_TEN;
      }
    }
    return str;
  },
  /**
   * Returns a string-fraction representation of a Fraction object
   *
   * Ex: new Fraction("1.'3'").toFraction() => "4 1/3"
   **/
  "toFraction": function(showMixed = false) {
    let n = this["n"];
    let d = this["d"];
    let str = this["s"] < C_ZERO ? "-" : "";
    if (d === C_ONE) {
      str += n;
    } else {
      const whole = ifloor(n / d);
      if (showMixed && whole > C_ZERO) {
        str += whole;
        str += " ";
        n %= d;
      }
      str += n;
      str += "/";
      str += d;
    }
    return str;
  },
  /**
   * Returns a latex representation of a Fraction object
   *
   * Ex: new Fraction("1.'3'").toLatex() => "\frac{4}{3}"
   **/
  "toLatex": function(showMixed = false) {
    let n = this["n"];
    let d = this["d"];
    let str = this["s"] < C_ZERO ? "-" : "";
    if (d === C_ONE) {
      str += n;
    } else {
      const whole = ifloor(n / d);
      if (showMixed && whole > C_ZERO) {
        str += whole;
        n %= d;
      }
      str += "\\frac{";
      str += n;
      str += "}{";
      str += d;
      str += "}";
    }
    return str;
  },
  /**
   * Returns an array of continued fraction elements
   *
   * Ex: new Fraction("7/8").toContinued() => [0,1,7]
   */
  "toContinued": function() {
    let a = this["n"];
    let b = this["d"];
    const res = [];
    while (b) {
      res.push(ifloor(a / b));
      const t = a % b;
      a = b;
      b = t;
    }
    return res;
  },
  "simplify": function(eps = 1e-3) {
    const ieps = BigInt(Math.ceil(1 / eps));
    const thisABS = this["abs"]();
    const cont = thisABS["toContinued"]();
    for (let i = 1; i < cont.length; i++) {
      let s = newFraction(cont[i - 1], C_ONE);
      for (let k = i - 2; k >= 0; k--) {
        s = s["inverse"]()["add"](cont[k]);
      }
      let t = s["sub"](thisABS);
      if (t["n"] * ieps < t["d"]) {
        return s["mul"](this["s"]);
      }
    }
    return this;
  }
};

// ../../../../../../node_modules/mathjs/lib/esm/type/fraction/Fraction.js
var name3 = "Fraction";
var dependencies4 = [];
var createFractionClass = /* @__PURE__ */ factory(name3, dependencies4, () => {
  Object.defineProperty(Fraction, "name", {
    value: "Fraction"
  });
  Fraction.prototype.constructor = Fraction;
  Fraction.prototype.type = "Fraction";
  Fraction.prototype.isFraction = true;
  Fraction.prototype.toJSON = function() {
    return {
      mathjs: "Fraction",
      n: String(this.s * this.n),
      d: String(this.d)
    };
  };
  Fraction.fromJSON = function(json) {
    return new Fraction(json);
  };
  return Fraction;
}, {
  isClass: true
});

// ../../../../../../node_modules/mathjs/lib/esm/type/matrix/Matrix.js
var name4 = "Matrix";
var dependencies5 = [];
var createMatrixClass = /* @__PURE__ */ factory(name4, dependencies5, () => {
  function Matrix2() {
    if (!(this instanceof Matrix2)) {
      throw new SyntaxError("Constructor must be called with the new operator");
    }
  }
  Matrix2.prototype.type = "Matrix";
  Matrix2.prototype.isMatrix = true;
  Matrix2.prototype.storage = function() {
    throw new Error("Cannot invoke storage on a Matrix interface");
  };
  Matrix2.prototype.datatype = function() {
    throw new Error("Cannot invoke datatype on a Matrix interface");
  };
  Matrix2.prototype.create = function(data, datatype) {
    throw new Error("Cannot invoke create on a Matrix interface");
  };
  Matrix2.prototype.subset = function(index, replacement, defaultValue) {
    throw new Error("Cannot invoke subset on a Matrix interface");
  };
  Matrix2.prototype.get = function(index) {
    throw new Error("Cannot invoke get on a Matrix interface");
  };
  Matrix2.prototype.set = function(index, value, defaultValue) {
    throw new Error("Cannot invoke set on a Matrix interface");
  };
  Matrix2.prototype.resize = function(size2, defaultValue) {
    throw new Error("Cannot invoke resize on a Matrix interface");
  };
  Matrix2.prototype.reshape = function(size2, defaultValue) {
    throw new Error("Cannot invoke reshape on a Matrix interface");
  };
  Matrix2.prototype.clone = function() {
    throw new Error("Cannot invoke clone on a Matrix interface");
  };
  Matrix2.prototype.size = function() {
    throw new Error("Cannot invoke size on a Matrix interface");
  };
  Matrix2.prototype.map = function(callback, skipZeros) {
    throw new Error("Cannot invoke map on a Matrix interface");
  };
  Matrix2.prototype.forEach = function(callback) {
    throw new Error("Cannot invoke forEach on a Matrix interface");
  };
  Matrix2.prototype[Symbol.iterator] = function() {
    throw new Error("Cannot iterate a Matrix interface");
  };
  Matrix2.prototype.toArray = function() {
    throw new Error("Cannot invoke toArray on a Matrix interface");
  };
  Matrix2.prototype.valueOf = function() {
    throw new Error("Cannot invoke valueOf on a Matrix interface");
  };
  Matrix2.prototype.format = function(options) {
    throw new Error("Cannot invoke format on a Matrix interface");
  };
  Matrix2.prototype.toString = function() {
    throw new Error("Cannot invoke toString on a Matrix interface");
  };
  return Matrix2;
}, {
  isClass: true
});

// ../../../../../../node_modules/mathjs/lib/esm/utils/bignumber/formatter.js
function formatBigNumberToBase(n, base, size2) {
  var BigNumberCtor = n.constructor;
  var big2 = new BigNumberCtor(2);
  var suffix = "";
  if (size2) {
    if (size2 < 1) {
      throw new Error("size must be in greater than 0");
    }
    if (!isInteger(size2)) {
      throw new Error("size must be an integer");
    }
    if (n.greaterThan(big2.pow(size2 - 1).sub(1)) || n.lessThan(big2.pow(size2 - 1).mul(-1))) {
      throw new Error("Value must be in range [-2^".concat(size2 - 1, ", 2^").concat(size2 - 1, "-1]"));
    }
    if (!n.isInteger()) {
      throw new Error("Value must be an integer");
    }
    if (n.lessThan(0)) {
      n = n.add(big2.pow(size2));
    }
    suffix = "i".concat(size2);
  }
  switch (base) {
    case 2:
      return "".concat(n.toBinary()).concat(suffix);
    case 8:
      return "".concat(n.toOctal()).concat(suffix);
    case 16:
      return "".concat(n.toHexadecimal()).concat(suffix);
    default:
      throw new Error("Base ".concat(base, " not supported "));
  }
}
function format3(value, options) {
  if (typeof options === "function") {
    return options(value);
  }
  if (!value.isFinite()) {
    return value.isNaN() ? "NaN" : value.gt(0) ? "Infinity" : "-Infinity";
  }
  var {
    notation,
    precision,
    wordSize
  } = normalizeFormatOptions(options);
  switch (notation) {
    case "fixed":
      return toFixed2(value, precision);
    case "exponential":
      return toExponential2(value, precision);
    case "engineering":
      return toEngineering2(value, precision);
    case "bin":
      return formatBigNumberToBase(value, 2, wordSize);
    case "oct":
      return formatBigNumberToBase(value, 8, wordSize);
    case "hex":
      return formatBigNumberToBase(value, 16, wordSize);
    case "auto": {
      var lowerExp = _toNumberOrDefault2(options === null || options === void 0 ? void 0 : options.lowerExp, -3);
      var upperExp = _toNumberOrDefault2(options === null || options === void 0 ? void 0 : options.upperExp, 5);
      if (value.isZero()) return "0";
      var str;
      var rounded = value.toSignificantDigits(precision);
      var exp2 = rounded.e;
      if (exp2 >= lowerExp && exp2 < upperExp) {
        str = rounded.toFixed();
      } else {
        str = toExponential2(value, precision);
      }
      return str.replace(/((\.\d*?)(0+))($|e)/, function() {
        var digits2 = arguments[2];
        var e = arguments[4];
        return digits2 !== "." ? digits2 + e : e;
      });
    }
    default:
      throw new Error('Unknown notation "' + notation + '". Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.');
  }
}
function toEngineering2(value, precision) {
  var e = value.e;
  var newExp = e % 3 === 0 ? e : e < 0 ? e - 3 - e % 3 : e - e % 3;
  var valueWithoutExp = value.mul(Math.pow(10, -newExp));
  var valueStr = valueWithoutExp.toPrecision(precision);
  if (valueStr.includes("e")) {
    var BigNumber2 = value.constructor;
    valueStr = new BigNumber2(valueStr).toFixed();
  }
  return valueStr + "e" + (e >= 0 ? "+" : "") + newExp.toString();
}
function toExponential2(value, precision) {
  if (precision !== void 0) {
    return value.toExponential(precision - 1);
  } else {
    return value.toExponential();
  }
}
function toFixed2(value, precision) {
  return value.toFixed(precision);
}
function _toNumberOrDefault2(value, defaultValue) {
  if (isNumber(value)) {
    return value;
  } else if (isBigNumber(value)) {
    return value.toNumber();
  } else {
    return defaultValue;
  }
}

// ../../../../../../node_modules/mathjs/lib/esm/utils/string.js
function format4(value, options) {
  var result = _format(value, options);
  if (options && typeof options === "object" && "truncate" in options && result.length > options.truncate) {
    return result.substring(0, options.truncate - 3) + "...";
  }
  return result;
}
function _format(value, options) {
  if (typeof value === "number") {
    return format2(value, options);
  }
  if (isBigNumber(value)) {
    return format3(value, options);
  }
  if (looksLikeFraction(value)) {
    if (!options || options.fraction !== "decimal") {
      return "".concat(value.s * value.n, "/").concat(value.d);
    } else {
      return value.toString();
    }
  }
  if (Array.isArray(value)) {
    return formatArray(value, options);
  }
  if (isString(value)) {
    return stringify(value);
  }
  if (typeof value === "function") {
    return value.syntax ? String(value.syntax) : "function";
  }
  if (value && typeof value === "object") {
    if (typeof value.format === "function") {
      return value.format(options);
    } else if (value && value.toString(options) !== {}.toString()) {
      return value.toString(options);
    } else {
      var entries = Object.keys(value).map((key) => {
        return stringify(key) + ": " + format4(value[key], options);
      });
      return "{" + entries.join(", ") + "}";
    }
  }
  return String(value);
}
function stringify(value) {
  var text = String(value);
  var escaped = "";
  var i = 0;
  while (i < text.length) {
    var c = text.charAt(i);
    escaped += c in controlCharacters ? controlCharacters[c] : c;
    i++;
  }
  return '"' + escaped + '"';
}
var controlCharacters = {
  '"': '\\"',
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t"
};
function formatArray(array2, options) {
  if (Array.isArray(array2)) {
    var str = "[";
    var len = array2.length;
    for (var i = 0; i < len; i++) {
      if (i !== 0) {
        str += ", ";
      }
      str += formatArray(array2[i], options);
    }
    str += "]";
    return str;
  } else {
    return format4(array2, options);
  }
}
function looksLikeFraction(value) {
  return value && typeof value === "object" && typeof value.s === "bigint" && typeof value.n === "bigint" && typeof value.d === "bigint" || false;
}

// ../../../../../../node_modules/mathjs/lib/esm/error/DimensionError.js
function DimensionError(actual, expected, relation) {
  if (!(this instanceof DimensionError)) {
    throw new SyntaxError("Constructor must be called with the new operator");
  }
  this.actual = actual;
  this.expected = expected;
  this.relation = relation;
  this.message = "Dimension mismatch (" + (Array.isArray(actual) ? "[" + actual.join(", ") + "]" : actual) + " " + (this.relation || "!=") + " " + (Array.isArray(expected) ? "[" + expected.join(", ") + "]" : expected) + ")";
  this.stack = new Error().stack;
}
DimensionError.prototype = new RangeError();
DimensionError.prototype.constructor = RangeError;
DimensionError.prototype.name = "DimensionError";
DimensionError.prototype.isDimensionError = true;

// ../../../../../../node_modules/mathjs/lib/esm/error/IndexError.js
function IndexError(index, min3, max4) {
  if (!(this instanceof IndexError)) {
    throw new SyntaxError("Constructor must be called with the new operator");
  }
  this.index = index;
  if (arguments.length < 3) {
    this.min = 0;
    this.max = min3;
  } else {
    this.min = min3;
    this.max = max4;
  }
  if (this.min !== void 0 && this.index < this.min) {
    this.message = "Index out of range (" + this.index + " < " + this.min + ")";
  } else if (this.max !== void 0 && this.index >= this.max) {
    this.message = "Index out of range (" + this.index + " > " + (this.max - 1) + ")";
  } else {
    this.message = "Index out of range (" + this.index + ")";
  }
  this.stack = new Error().stack;
}
IndexError.prototype = new RangeError();
IndexError.prototype.constructor = RangeError;
IndexError.prototype.name = "IndexError";
IndexError.prototype.isIndexError = true;

// ../../../../../../node_modules/mathjs/lib/esm/utils/array.js
function arraySize(x) {
  var s = [];
  while (Array.isArray(x)) {
    s.push(x.length);
    x = x[0];
  }
  return s;
}
function _validate(array2, size2, dim) {
  var i;
  var len = array2.length;
  if (len !== size2[dim]) {
    throw new DimensionError(len, size2[dim]);
  }
  if (dim < size2.length - 1) {
    var dimNext = dim + 1;
    for (i = 0; i < len; i++) {
      var child = array2[i];
      if (!Array.isArray(child)) {
        throw new DimensionError(size2.length - 1, size2.length, "<");
      }
      _validate(array2[i], size2, dimNext);
    }
  } else {
    for (i = 0; i < len; i++) {
      if (Array.isArray(array2[i])) {
        throw new DimensionError(size2.length + 1, size2.length, ">");
      }
    }
  }
}
function validate(array2, size2) {
  var isScalar = size2.length === 0;
  if (isScalar) {
    if (Array.isArray(array2)) {
      throw new DimensionError(array2.length, 0);
    }
  } else {
    _validate(array2, size2, 0);
  }
}
function validateIndex(index, length) {
  if (index !== void 0) {
    if (!isNumber(index) || !isInteger(index)) {
      throw new TypeError("Index must be an integer (value: " + index + ")");
    }
    if (index < 0 || typeof length === "number" && index >= length) {
      throw new IndexError(index, length);
    }
  }
}
function resize(array2, size2, defaultValue) {
  if (!Array.isArray(size2)) {
    throw new TypeError("Array expected");
  }
  if (size2.length === 0) {
    throw new Error("Resizing to scalar is not supported");
  }
  size2.forEach(function(value) {
    if (!isNumber(value) || !isInteger(value) || value < 0) {
      throw new TypeError("Invalid size, must contain positive integers (size: " + format4(size2) + ")");
    }
  });
  if (isNumber(array2) || isBigNumber(array2)) {
    array2 = [array2];
  }
  var _defaultValue = defaultValue !== void 0 ? defaultValue : 0;
  _resize(array2, size2, 0, _defaultValue);
  return array2;
}
function _resize(array2, size2, dim, defaultValue) {
  var i;
  var elem;
  var oldLen = array2.length;
  var newLen = size2[dim];
  var minLen = Math.min(oldLen, newLen);
  array2.length = newLen;
  if (dim < size2.length - 1) {
    var dimNext = dim + 1;
    for (i = 0; i < minLen; i++) {
      elem = array2[i];
      if (!Array.isArray(elem)) {
        elem = [elem];
        array2[i] = elem;
      }
      _resize(elem, size2, dimNext, defaultValue);
    }
    for (i = minLen; i < newLen; i++) {
      elem = [];
      array2[i] = elem;
      _resize(elem, size2, dimNext, defaultValue);
    }
  } else {
    for (i = 0; i < minLen; i++) {
      while (Array.isArray(array2[i])) {
        array2[i] = array2[i][0];
      }
    }
    for (i = minLen; i < newLen; i++) {
      array2[i] = defaultValue;
    }
  }
}
function reshape(array2, sizes) {
  var flatArray = flatten(array2, true);
  var currentLength = flatArray.length;
  if (!Array.isArray(array2) || !Array.isArray(sizes)) {
    throw new TypeError("Array expected");
  }
  if (sizes.length === 0) {
    throw new DimensionError(0, currentLength, "!=");
  }
  sizes = processSizesWildcard(sizes, currentLength);
  var newLength = product(sizes);
  if (currentLength !== newLength) {
    throw new DimensionError(newLength, currentLength, "!=");
  }
  try {
    return _reshape(flatArray, sizes);
  } catch (e) {
    if (e instanceof DimensionError) {
      throw new DimensionError(newLength, currentLength, "!=");
    }
    throw e;
  }
}
function processSizesWildcard(sizes, currentLength) {
  var newLength = product(sizes);
  var processedSizes = sizes.slice();
  var WILDCARD = -1;
  var wildCardIndex = sizes.indexOf(WILDCARD);
  var isMoreThanOneWildcard = sizes.indexOf(WILDCARD, wildCardIndex + 1) >= 0;
  if (isMoreThanOneWildcard) {
    throw new Error("More than one wildcard in sizes");
  }
  var hasWildcard = wildCardIndex >= 0;
  var canReplaceWildcard = currentLength % newLength === 0;
  if (hasWildcard) {
    if (canReplaceWildcard) {
      processedSizes[wildCardIndex] = -currentLength / newLength;
    } else {
      throw new Error("Could not replace wildcard, since " + currentLength + " is no multiple of " + -newLength);
    }
  }
  return processedSizes;
}
function product(array2) {
  return array2.reduce((prev, curr) => prev * curr, 1);
}
function _reshape(array2, sizes) {
  var tmpArray = array2;
  var tmpArray2;
  for (var sizeIndex = sizes.length - 1; sizeIndex > 0; sizeIndex--) {
    var size2 = sizes[sizeIndex];
    tmpArray2 = [];
    var length = tmpArray.length / size2;
    for (var i = 0; i < length; i++) {
      tmpArray2.push(tmpArray.slice(i * size2, (i + 1) * size2));
    }
    tmpArray = tmpArray2;
  }
  return tmpArray;
}
function unsqueeze(array2, dims, outer, size2) {
  var s = size2 || arraySize(array2);
  if (outer) {
    for (var i = 0; i < outer; i++) {
      array2 = [array2];
      s.unshift(1);
    }
  }
  array2 = _unsqueeze(array2, dims, 0);
  while (s.length < dims) {
    s.push(1);
  }
  return array2;
}
function _unsqueeze(array2, dims, dim) {
  var i, ii;
  if (Array.isArray(array2)) {
    var next = dim + 1;
    for (i = 0, ii = array2.length; i < ii; i++) {
      array2[i] = _unsqueeze(array2[i], dims, next);
    }
  } else {
    for (var d = dim; d < dims; d++) {
      array2 = [array2];
    }
  }
  return array2;
}
function flatten(array2) {
  var isRectangular = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  if (!Array.isArray(array2)) {
    return array2;
  }
  if (typeof isRectangular !== "boolean") {
    throw new TypeError("Boolean expected for second argument of flatten");
  }
  var flat = [];
  if (isRectangular) {
    _flattenRectangular(array2);
  } else {
    _flatten(array2);
  }
  return flat;
  function _flatten(array3) {
    for (var i = 0; i < array3.length; i++) {
      var item = array3[i];
      if (Array.isArray(item)) {
        _flatten(item);
      } else {
        flat.push(item);
      }
    }
  }
  function _flattenRectangular(array3) {
    if (Array.isArray(array3[0])) {
      for (var i = 0; i < array3.length; i++) {
        _flattenRectangular(array3[i]);
      }
    } else {
      for (var _i = 0; _i < array3.length; _i++) {
        flat.push(array3[_i]);
      }
    }
  }
}
function getArrayDataType(array2, typeOf2) {
  var type2;
  var length = 0;
  for (var i = 0; i < array2.length; i++) {
    var item = array2[i];
    var _isArray = Array.isArray(item);
    if (i === 0 && _isArray) {
      length = item.length;
    }
    if (_isArray && item.length !== length) {
      return void 0;
    }
    var itemType = _isArray ? getArrayDataType(item, typeOf2) : typeOf2(item);
    if (type2 === void 0) {
      type2 = itemType;
    } else if (type2 !== itemType) {
      return "mixed";
    } else {
    }
  }
  return type2;
}
function concatRecursive(a, b, concatDim, dim) {
  if (dim < concatDim) {
    if (a.length !== b.length) {
      throw new DimensionError(a.length, b.length);
    }
    var c = [];
    for (var i = 0; i < a.length; i++) {
      c[i] = concatRecursive(a[i], b[i], concatDim, dim + 1);
    }
    return c;
  } else {
    return a.concat(b);
  }
}
function concat() {
  var arrays = Array.prototype.slice.call(arguments, 0, -1);
  var concatDim = Array.prototype.slice.call(arguments, -1);
  if (arrays.length === 1) {
    return arrays[0];
  }
  if (arrays.length > 1) {
    return arrays.slice(1).reduce(function(A, B) {
      return concatRecursive(A, B, concatDim, 0);
    }, arrays[0]);
  } else {
    throw new Error("Wrong number of arguments in function concat");
  }
}
function broadcastSizes() {
  for (var _len = arguments.length, sizes = new Array(_len), _key = 0; _key < _len; _key++) {
    sizes[_key] = arguments[_key];
  }
  var dimensions = sizes.map((s) => s.length);
  var N = Math.max(...dimensions);
  var sizeMax = new Array(N).fill(null);
  for (var i = 0; i < sizes.length; i++) {
    var size2 = sizes[i];
    var dim = dimensions[i];
    for (var j = 0; j < dim; j++) {
      var n = N - dim + j;
      if (size2[j] > sizeMax[n]) {
        sizeMax[n] = size2[j];
      }
    }
  }
  for (var _i2 = 0; _i2 < sizes.length; _i2++) {
    checkBroadcastingRules(sizes[_i2], sizeMax);
  }
  return sizeMax;
}
function checkBroadcastingRules(size2, toSize) {
  var N = toSize.length;
  var dim = size2.length;
  for (var j = 0; j < dim; j++) {
    var n = N - dim + j;
    if (size2[j] < toSize[n] && size2[j] > 1 || size2[j] > toSize[n]) {
      throw new Error("shape mismatch: mismatch is found in arg with shape (".concat(size2, ") not possible to broadcast dimension ").concat(dim, " with size ").concat(size2[j], " to size ").concat(toSize[n]));
    }
  }
}
function broadcastTo(array2, toSize) {
  var Asize = arraySize(array2);
  if (deepStrictEqual(Asize, toSize)) {
    return array2;
  }
  checkBroadcastingRules(Asize, toSize);
  var broadcastedSize = broadcastSizes(Asize, toSize);
  var N = broadcastedSize.length;
  var paddedSize = [...Array(N - Asize.length).fill(1), ...Asize];
  var A = clone3(array2);
  if (Asize.length < N) {
    A = reshape(A, paddedSize);
    Asize = arraySize(A);
  }
  for (var dim = 0; dim < N; dim++) {
    if (Asize[dim] < broadcastedSize[dim]) {
      A = stretch(A, broadcastedSize[dim], dim);
      Asize = arraySize(A);
    }
  }
  return A;
}
function stretch(arrayToStretch, sizeToStretch, dimToStretch) {
  return concat(...Array(sizeToStretch).fill(arrayToStretch), dimToStretch);
}
function get3(array2, index) {
  if (!Array.isArray(array2)) {
    throw new Error("Array expected");
  }
  var size2 = arraySize(array2);
  if (index.length !== size2.length) {
    throw new DimensionError(index.length, size2.length);
  }
  for (var x = 0; x < index.length; x++) {
    validateIndex(index[x], size2[x]);
  }
  return index.reduce((acc, curr) => acc[curr], array2);
}
function deepMap(array2, callback) {
  var skipIndex = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  if (array2.length === 0) {
    return [];
  }
  if (skipIndex) {
    return recursiveMap(array2);
  }
  var index = [];
  return recursiveMapWithIndex(array2, 0);
  function recursiveMapWithIndex(value, depth) {
    if (Array.isArray(value)) {
      var N = value.length;
      var result = Array(N);
      for (var i = 0; i < N; i++) {
        index[depth] = i;
        result[i] = recursiveMapWithIndex(value[i], depth + 1);
      }
      return result;
    } else {
      return callback(value, index.slice(0, depth), array2);
    }
  }
  function recursiveMap(value) {
    if (Array.isArray(value)) {
      var N = value.length;
      var result = Array(N);
      for (var i = 0; i < N; i++) {
        result[i] = recursiveMap(value[i]);
      }
      return result;
    } else {
      return callback(value);
    }
  }
}
function clone3(array2) {
  return _extends([], array2);
}

// ../../../../../../node_modules/mathjs/lib/esm/utils/optimizeCallback.js
var import_typed_function2 = __toESM(require_typed_function(), 1);
function optimizeCallback(callback, array2, name43) {
  var isUnary = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  if (import_typed_function2.default.isTypedFunction(callback)) {
    var numberOfArguments;
    if (isUnary) {
      numberOfArguments = 1;
    } else {
      var firstIndex = (array2.isMatrix ? array2.size() : arraySize(array2)).map(() => 0);
      var firstValue = array2.isMatrix ? array2.get(firstIndex) : get3(array2, firstIndex);
      numberOfArguments = _findNumberOfArgumentsTyped(callback, firstValue, firstIndex, array2);
    }
    var fastCallback;
    if (array2.isMatrix && array2.dataType !== "mixed" && array2.dataType !== void 0) {
      var singleSignature = _findSingleSignatureWithArity(callback, numberOfArguments);
      fastCallback = singleSignature !== void 0 ? singleSignature : callback;
    } else {
      fastCallback = callback;
    }
    if (numberOfArguments >= 1 && numberOfArguments <= 3) {
      return {
        isUnary: numberOfArguments === 1,
        fn: function fn() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return _tryFunctionWithArgs(fastCallback, args.slice(0, numberOfArguments), name43, callback.name);
        }
      };
    }
    return {
      isUnary: false,
      fn: function fn() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        return _tryFunctionWithArgs(fastCallback, args, name43, callback.name);
      }
    };
  }
  if (isUnary === void 0) {
    return {
      isUnary: _findIfCallbackIsUnary(callback),
      fn: callback
    };
  } else {
    return {
      isUnary,
      fn: callback
    };
  }
}
function _findSingleSignatureWithArity(callback, arity) {
  var matchingFunctions = [];
  Object.entries(callback.signatures).forEach((_ref) => {
    var [signature, func] = _ref;
    if (signature.split(",").length === arity) {
      matchingFunctions.push(func);
    }
  });
  if (matchingFunctions.length === 1) {
    return matchingFunctions[0];
  }
}
function _findIfCallbackIsUnary(callback) {
  if (callback.length !== 1) return false;
  var callbackStr = callback.toString();
  if (/arguments/.test(callbackStr)) return false;
  var paramsStr = callbackStr.match(/\(.*?\)/);
  if (/\.\.\./.test(paramsStr)) return false;
  return true;
}
function _findNumberOfArgumentsTyped(callback, value, index, array2) {
  var testArgs = [value, index, array2];
  for (var i = 3; i > 0; i--) {
    var args = testArgs.slice(0, i);
    if (import_typed_function2.default.resolve(callback, args) !== null) {
      return i;
    }
  }
}
function _tryFunctionWithArgs(func, args, mappingFnName, callbackName) {
  try {
    return func(...args);
  } catch (err) {
    _createCallbackError(err, args, mappingFnName, callbackName);
  }
}
function _createCallbackError(err, args, mappingFnName, callbackName) {
  var _err$data;
  if (err instanceof TypeError && ((_err$data = err.data) === null || _err$data === void 0 ? void 0 : _err$data.category) === "wrongType") {
    var argsDesc = [];
    argsDesc.push("value: ".concat(typeOf(args[0])));
    if (args.length >= 2) {
      argsDesc.push("index: ".concat(typeOf(args[1])));
    }
    if (args.length >= 3) {
      argsDesc.push("array: ".concat(typeOf(args[2])));
    }
    throw new TypeError("Function ".concat(mappingFnName, " cannot apply callback arguments ") + "".concat(callbackName, "(").concat(argsDesc.join(", "), ") at index ").concat(JSON.stringify(args[1])));
  } else {
    throw new TypeError("Function ".concat(mappingFnName, " cannot apply callback arguments ") + "to function ".concat(callbackName, ": ").concat(err.message));
  }
}

// ../../../../../../node_modules/mathjs/lib/esm/type/matrix/DenseMatrix.js
var name5 = "DenseMatrix";
var dependencies6 = ["Matrix"];
var createDenseMatrixClass = /* @__PURE__ */ factory(name5, dependencies6, (_ref) => {
  var {
    Matrix: Matrix2
  } = _ref;
  function DenseMatrix2(data, datatype) {
    if (!(this instanceof DenseMatrix2)) {
      throw new SyntaxError("Constructor must be called with the new operator");
    }
    if (datatype && !isString(datatype)) {
      throw new Error("Invalid datatype: " + datatype);
    }
    if (isMatrix(data)) {
      if (data.type === "DenseMatrix") {
        this._data = clone(data._data);
        this._size = clone(data._size);
        this._datatype = datatype || data._datatype;
      } else {
        this._data = data.toArray();
        this._size = data.size();
        this._datatype = datatype || data._datatype;
      }
    } else if (data && isArray(data.data) && isArray(data.size)) {
      this._data = data.data;
      this._size = data.size;
      validate(this._data, this._size);
      this._datatype = datatype || data.datatype;
    } else if (isArray(data)) {
      this._data = preprocess(data);
      this._size = arraySize(this._data);
      validate(this._data, this._size);
      this._datatype = datatype;
    } else if (data) {
      throw new TypeError("Unsupported type of data (" + typeOf(data) + ")");
    } else {
      this._data = [];
      this._size = [0];
      this._datatype = datatype;
    }
  }
  DenseMatrix2.prototype = new Matrix2();
  DenseMatrix2.prototype.createDenseMatrix = function(data, datatype) {
    return new DenseMatrix2(data, datatype);
  };
  Object.defineProperty(DenseMatrix2, "name", {
    value: "DenseMatrix"
  });
  DenseMatrix2.prototype.constructor = DenseMatrix2;
  DenseMatrix2.prototype.type = "DenseMatrix";
  DenseMatrix2.prototype.isDenseMatrix = true;
  DenseMatrix2.prototype.getDataType = function() {
    return getArrayDataType(this._data, typeOf);
  };
  DenseMatrix2.prototype.storage = function() {
    return "dense";
  };
  DenseMatrix2.prototype.datatype = function() {
    return this._datatype;
  };
  DenseMatrix2.prototype.create = function(data, datatype) {
    return new DenseMatrix2(data, datatype);
  };
  DenseMatrix2.prototype.subset = function(index, replacement, defaultValue) {
    switch (arguments.length) {
      case 1:
        return _get(this, index);
      // intentional fall through
      case 2:
      case 3:
        return _set(this, index, replacement, defaultValue);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  };
  DenseMatrix2.prototype.get = function(index) {
    return get3(this._data, index);
  };
  DenseMatrix2.prototype.set = function(index, value, defaultValue) {
    if (!isArray(index)) {
      throw new TypeError("Array expected");
    }
    if (index.length < this._size.length) {
      throw new DimensionError(index.length, this._size.length, "<");
    }
    var i, ii, indexI;
    var size2 = index.map(function(i2) {
      return i2 + 1;
    });
    _fit(this, size2, defaultValue);
    var data = this._data;
    for (i = 0, ii = index.length - 1; i < ii; i++) {
      indexI = index[i];
      validateIndex(indexI, data.length);
      data = data[indexI];
    }
    indexI = index[index.length - 1];
    validateIndex(indexI, data.length);
    data[indexI] = value;
    return this;
  };
  function _get(matrix2, index) {
    if (!isIndex(index)) {
      throw new TypeError("Invalid index");
    }
    var isScalar = index.isScalar();
    if (isScalar) {
      return matrix2.get(index.min());
    } else {
      var size2 = index.size();
      if (size2.length !== matrix2._size.length) {
        throw new DimensionError(size2.length, matrix2._size.length);
      }
      var min3 = index.min();
      var max4 = index.max();
      for (var i = 0, ii = matrix2._size.length; i < ii; i++) {
        validateIndex(min3[i], matrix2._size[i]);
        validateIndex(max4[i], matrix2._size[i]);
      }
      var returnMatrix = new DenseMatrix2([]);
      var submatrix = _getSubmatrix(matrix2._data, index);
      returnMatrix._size = submatrix.size;
      returnMatrix._datatype = matrix2._datatype;
      returnMatrix._data = submatrix.data;
      return returnMatrix;
    }
  }
  function _getSubmatrix(data, index) {
    var maxDepth = index.size().length - 1;
    var size2 = Array(maxDepth);
    return {
      data: getSubmatrixRecursive(data),
      size: size2
    };
    function getSubmatrixRecursive(data2) {
      var depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      var ranges = index.dimension(depth);
      size2[depth] = ranges.size()[0];
      if (depth < maxDepth) {
        return ranges.map((rangeIndex) => {
          validateIndex(rangeIndex, data2.length);
          return getSubmatrixRecursive(data2[rangeIndex], depth + 1);
        }).valueOf();
      } else {
        return ranges.map((rangeIndex) => {
          validateIndex(rangeIndex, data2.length);
          return data2[rangeIndex];
        }).valueOf();
      }
    }
  }
  function _set(matrix2, index, submatrix, defaultValue) {
    if (!index || index.isIndex !== true) {
      throw new TypeError("Invalid index");
    }
    var iSize = index.size();
    var isScalar = index.isScalar();
    var sSize;
    if (isMatrix(submatrix)) {
      sSize = submatrix.size();
      submatrix = submatrix.valueOf();
    } else {
      sSize = arraySize(submatrix);
    }
    if (isScalar) {
      if (sSize.length !== 0) {
        throw new TypeError("Scalar expected");
      }
      matrix2.set(index.min(), submatrix, defaultValue);
    } else {
      if (!deepStrictEqual(sSize, iSize)) {
        try {
          if (sSize.length === 0) {
            submatrix = broadcastTo([submatrix], iSize);
          } else {
            submatrix = broadcastTo(submatrix, iSize);
          }
          sSize = arraySize(submatrix);
        } catch (_unused) {
        }
      }
      if (iSize.length < matrix2._size.length) {
        throw new DimensionError(iSize.length, matrix2._size.length, "<");
      }
      if (sSize.length < iSize.length) {
        var i = 0;
        var outer = 0;
        while (iSize[i] === 1 && sSize[i] === 1) {
          i++;
        }
        while (iSize[i] === 1) {
          outer++;
          i++;
        }
        submatrix = unsqueeze(submatrix, iSize.length, outer, sSize);
      }
      if (!deepStrictEqual(iSize, sSize)) {
        throw new DimensionError(iSize, sSize, ">");
      }
      var size2 = index.max().map(function(i2) {
        return i2 + 1;
      });
      _fit(matrix2, size2, defaultValue);
      _setSubmatrix(matrix2._data, index, submatrix);
    }
    return matrix2;
  }
  function _setSubmatrix(data, index, submatrix) {
    var maxDepth = index.size().length - 1;
    setSubmatrixRecursive(data, submatrix);
    function setSubmatrixRecursive(data2, submatrix2) {
      var depth = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
      var range2 = index.dimension(depth);
      if (depth < maxDepth) {
        range2.forEach((rangeIndex, i) => {
          validateIndex(rangeIndex, data2.length);
          setSubmatrixRecursive(data2[rangeIndex], submatrix2[i[0]], depth + 1);
        });
      } else {
        range2.forEach((rangeIndex, i) => {
          validateIndex(rangeIndex, data2.length);
          data2[rangeIndex] = submatrix2[i[0]];
        });
      }
    }
  }
  DenseMatrix2.prototype.resize = function(size2, defaultValue, copy2) {
    if (!isCollection(size2)) {
      throw new TypeError("Array or Matrix expected");
    }
    var sizeArray = size2.valueOf().map((value) => {
      return Array.isArray(value) && value.length === 1 ? value[0] : value;
    });
    var m = copy2 ? this.clone() : this;
    return _resize2(m, sizeArray, defaultValue);
  };
  function _resize2(matrix2, size2, defaultValue) {
    if (size2.length === 0) {
      var v = matrix2._data;
      while (isArray(v)) {
        v = v[0];
      }
      return v;
    }
    matrix2._size = size2.slice(0);
    matrix2._data = resize(matrix2._data, matrix2._size, defaultValue);
    return matrix2;
  }
  DenseMatrix2.prototype.reshape = function(size2, copy2) {
    var m = copy2 ? this.clone() : this;
    m._data = reshape(m._data, size2);
    var currentLength = m._size.reduce((length, size3) => length * size3);
    m._size = processSizesWildcard(size2, currentLength);
    return m;
  };
  function _fit(matrix2, size2, defaultValue) {
    var newSize = matrix2._size.slice(0);
    var changed = false;
    while (newSize.length < size2.length) {
      newSize.push(0);
      changed = true;
    }
    for (var i = 0, ii = size2.length; i < ii; i++) {
      if (size2[i] > newSize[i]) {
        newSize[i] = size2[i];
        changed = true;
      }
    }
    if (changed) {
      _resize2(matrix2, newSize, defaultValue);
    }
  }
  DenseMatrix2.prototype.clone = function() {
    var m = new DenseMatrix2({
      data: clone(this._data),
      size: clone(this._size),
      datatype: this._datatype
    });
    return m;
  };
  DenseMatrix2.prototype.size = function() {
    return this._size.slice(0);
  };
  DenseMatrix2.prototype.map = function(callback) {
    var skipZeros = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    var isUnary = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    var me = this;
    var maxDepth = me._size.length - 1;
    if (maxDepth < 0) return me.clone();
    var fastCallback = optimizeCallback(callback, me, "map", isUnary);
    var fastCallbackFn = fastCallback.fn;
    var result = me.create(void 0, me._datatype);
    result._size = me._size;
    if (isUnary || fastCallback.isUnary) {
      result._data = iterateUnary(me._data);
      return result;
    }
    if (maxDepth === 0) {
      var inputData = me.valueOf();
      var data = Array(inputData.length);
      for (var i = 0; i < inputData.length; i++) {
        data[i] = fastCallbackFn(inputData[i], [i], me);
      }
      result._data = data;
      return result;
    }
    var index = [];
    result._data = iterate(me._data);
    return result;
    function iterate(data2) {
      var depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      var result2 = Array(data2.length);
      if (depth < maxDepth) {
        for (var _i = 0; _i < data2.length; _i++) {
          index[depth] = _i;
          result2[_i] = iterate(data2[_i], depth + 1);
        }
      } else {
        for (var _i2 = 0; _i2 < data2.length; _i2++) {
          index[depth] = _i2;
          result2[_i2] = fastCallbackFn(data2[_i2], index.slice(), me);
        }
      }
      return result2;
    }
    function iterateUnary(data2) {
      var depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      var result2 = Array(data2.length);
      if (depth < maxDepth) {
        for (var _i3 = 0; _i3 < data2.length; _i3++) {
          result2[_i3] = iterateUnary(data2[_i3], depth + 1);
        }
      } else {
        for (var _i4 = 0; _i4 < data2.length; _i4++) {
          result2[_i4] = fastCallbackFn(data2[_i4]);
        }
      }
      return result2;
    }
  };
  DenseMatrix2.prototype.forEach = function(callback) {
    var skipZeros = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    var isUnary = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    var me = this;
    var maxDepth = me._size.length - 1;
    if (maxDepth < 0) return;
    var fastCallback = optimizeCallback(callback, me, "map", isUnary);
    var fastCallbackFn = fastCallback.fn;
    if (isUnary || fastCallback.isUnary) {
      iterateUnary(me._data);
      return;
    }
    if (maxDepth === 0) {
      for (var i = 0; i < me._data.length; i++) {
        fastCallbackFn(me._data[i], [i], me);
      }
      return;
    }
    var index = [];
    iterate(me._data);
    function iterate(data) {
      var depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      if (depth < maxDepth) {
        for (var _i5 = 0; _i5 < data.length; _i5++) {
          index[depth] = _i5;
          iterate(data[_i5], depth + 1);
        }
      } else {
        for (var _i6 = 0; _i6 < data.length; _i6++) {
          index[depth] = _i6;
          fastCallbackFn(data[_i6], index.slice(), me);
        }
      }
    }
    function iterateUnary(data) {
      var depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
      if (depth < maxDepth) {
        for (var _i7 = 0; _i7 < data.length; _i7++) {
          iterateUnary(data[_i7], depth + 1);
        }
      } else {
        for (var _i8 = 0; _i8 < data.length; _i8++) {
          fastCallbackFn(data[_i8]);
        }
      }
    }
  };
  DenseMatrix2.prototype[Symbol.iterator] = function* () {
    var maxDepth = this._size.length - 1;
    if (maxDepth < 0) {
      return;
    }
    if (maxDepth === 0) {
      for (var i = 0; i < this._data.length; i++) {
        yield {
          value: this._data[i],
          index: [i]
        };
      }
      return;
    }
    var index = [];
    var _recurse = function* recurse(value, depth) {
      if (depth < maxDepth) {
        for (var _i9 = 0; _i9 < value.length; _i9++) {
          index[depth] = _i9;
          yield* _recurse(value[_i9], depth + 1);
        }
      } else {
        for (var _i0 = 0; _i0 < value.length; _i0++) {
          index[depth] = _i0;
          yield {
            value: value[_i0],
            index: index.slice()
          };
        }
      }
    };
    yield* _recurse(this._data, 0);
  };
  DenseMatrix2.prototype.rows = function() {
    var result = [];
    var s = this.size();
    if (s.length !== 2) {
      throw new TypeError("Rows can only be returned for a 2D matrix.");
    }
    var data = this._data;
    for (var row of data) {
      result.push(new DenseMatrix2([row], this._datatype));
    }
    return result;
  };
  DenseMatrix2.prototype.columns = function() {
    var _this = this;
    var result = [];
    var s = this.size();
    if (s.length !== 2) {
      throw new TypeError("Rows can only be returned for a 2D matrix.");
    }
    var data = this._data;
    var _loop = function _loop2(i2) {
      var col = data.map((row) => [row[i2]]);
      result.push(new DenseMatrix2(col, _this._datatype));
    };
    for (var i = 0; i < s[1]; i++) {
      _loop(i);
    }
    return result;
  };
  DenseMatrix2.prototype.toArray = function() {
    return clone(this._data);
  };
  DenseMatrix2.prototype.valueOf = function() {
    return this._data;
  };
  DenseMatrix2.prototype.format = function(options) {
    return format4(this._data, options);
  };
  DenseMatrix2.prototype.toString = function() {
    return format4(this._data);
  };
  DenseMatrix2.prototype.toJSON = function() {
    return {
      mathjs: "DenseMatrix",
      data: this._data,
      size: this._size,
      datatype: this._datatype
    };
  };
  DenseMatrix2.prototype.diagonal = function(k) {
    if (k) {
      if (isBigNumber(k)) {
        k = k.toNumber();
      }
      if (!isNumber(k) || !isInteger(k)) {
        throw new TypeError("The parameter k must be an integer number");
      }
    } else {
      k = 0;
    }
    var kSuper = k > 0 ? k : 0;
    var kSub = k < 0 ? -k : 0;
    var rows = this._size[0];
    var columns = this._size[1];
    var n = Math.min(rows - kSub, columns - kSuper);
    var data = [];
    for (var i = 0; i < n; i++) {
      data[i] = this._data[i + kSub][i + kSuper];
    }
    return new DenseMatrix2({
      data,
      size: [n],
      datatype: this._datatype
    });
  };
  DenseMatrix2.diagonal = function(size2, value, k, defaultValue) {
    if (!isArray(size2)) {
      throw new TypeError("Array expected, size parameter");
    }
    if (size2.length !== 2) {
      throw new Error("Only two dimensions matrix are supported");
    }
    size2 = size2.map(function(s) {
      if (isBigNumber(s)) {
        s = s.toNumber();
      }
      if (!isNumber(s) || !isInteger(s) || s < 1) {
        throw new Error("Size values must be positive integers");
      }
      return s;
    });
    if (k) {
      if (isBigNumber(k)) {
        k = k.toNumber();
      }
      if (!isNumber(k) || !isInteger(k)) {
        throw new TypeError("The parameter k must be an integer number");
      }
    } else {
      k = 0;
    }
    var kSuper = k > 0 ? k : 0;
    var kSub = k < 0 ? -k : 0;
    var rows = size2[0];
    var columns = size2[1];
    var n = Math.min(rows - kSub, columns - kSuper);
    var _value;
    if (isArray(value)) {
      if (value.length !== n) {
        throw new Error("Invalid value array length");
      }
      _value = function _value2(i) {
        return value[i];
      };
    } else if (isMatrix(value)) {
      var ms = value.size();
      if (ms.length !== 1 || ms[0] !== n) {
        throw new Error("Invalid matrix length");
      }
      _value = function _value2(i) {
        return value.get([i]);
      };
    } else {
      _value = function _value2() {
        return value;
      };
    }
    if (!defaultValue) {
      defaultValue = isBigNumber(_value(0)) ? _value(0).mul(0) : 0;
    }
    var data = [];
    if (size2.length > 0) {
      data = resize(data, size2, defaultValue);
      for (var d = 0; d < n; d++) {
        data[d + kSub][d + kSuper] = _value(d);
      }
    }
    return new DenseMatrix2({
      data,
      size: [rows, columns]
    });
  };
  DenseMatrix2.fromJSON = function(json) {
    return new DenseMatrix2(json);
  };
  DenseMatrix2.prototype.swapRows = function(i, j) {
    if (!isNumber(i) || !isInteger(i) || !isNumber(j) || !isInteger(j)) {
      throw new Error("Row index must be positive integers");
    }
    if (this._size.length !== 2) {
      throw new Error("Only two dimensional matrix is supported");
    }
    validateIndex(i, this._size[0]);
    validateIndex(j, this._size[0]);
    DenseMatrix2._swapRows(i, j, this._data);
    return this;
  };
  DenseMatrix2._swapRows = function(i, j, data) {
    var vi = data[i];
    data[i] = data[j];
    data[j] = vi;
  };
  function preprocess(data) {
    if (isMatrix(data)) {
      return preprocess(data.valueOf());
    }
    if (isArray(data)) {
      return data.map(preprocess);
    }
    return data;
  }
  return DenseMatrix2;
}, {
  isClass: true
});

// ../../../../../../node_modules/mathjs/lib/esm/utils/collection.js
function deepMap2(array2, callback, skipZeros) {
  if (!skipZeros) {
    if (isMatrix(array2)) {
      return array2.map((x) => callback(x), false, true);
    } else {
      return deepMap(array2, callback, true);
    }
  }
  var skipZerosCallback = (x) => x === 0 ? x : callback(x);
  if (isMatrix(array2)) {
    return array2.map((x) => skipZerosCallback(x), false, true);
  } else {
    return deepMap(array2, skipZerosCallback, true);
  }
}

// ../../../../../../node_modules/mathjs/lib/esm/function/utils/isInteger.js
var name6 = "isInteger";
var dependencies7 = ["typed"];
var createIsInteger = /* @__PURE__ */ factory(name6, dependencies7, (_ref) => {
  var {
    typed: typed3
  } = _ref;
  return typed3(name6, {
    number: isInteger,
    // TODO: what to do with isInteger(add(0.1, 0.2))  ?
    BigNumber: function BigNumber2(x) {
      return x.isInt();
    },
    bigint: function bigint(x) {
      return true;
    },
    Fraction: function Fraction3(x) {
      return x.d === 1n;
    },
    "Array | Matrix": typed3.referToSelf((self2) => (x) => deepMap2(x, self2))
  });
});

// ../../../../../../node_modules/mathjs/lib/esm/plain/number/arithmetic.js
var n1 = "number";
var n2 = "number, number";
function absNumber(a) {
  return Math.abs(a);
}
absNumber.signature = n1;
function addNumber(a, b) {
  return a + b;
}
addNumber.signature = n2;
function subtractNumber(a, b) {
  return a - b;
}
subtractNumber.signature = n2;
function multiplyNumber(a, b) {
  return a * b;
}
multiplyNumber.signature = n2;
function divideNumber(a, b) {
  return a / b;
}
divideNumber.signature = n2;
function unaryMinusNumber(x) {
  return -x;
}
unaryMinusNumber.signature = n1;
function unaryPlusNumber(x) {
  return x;
}
unaryPlusNumber.signature = n1;
function cbrtNumber(x) {
  return cbrt(x);
}
cbrtNumber.signature = n1;
function cubeNumber(x) {
  return x * x * x;
}
cubeNumber.signature = n1;
function expNumber(x) {
  return Math.exp(x);
}
expNumber.signature = n1;
function expm1Number(x) {
  return expm1(x);
}
expm1Number.signature = n1;
function gcdNumber(a, b) {
  if (!isInteger(a) || !isInteger(b)) {
    throw new Error("Parameters in function gcd must be integer numbers");
  }
  var r;
  while (b !== 0) {
    r = a % b;
    a = b;
    b = r;
  }
  return a < 0 ? -a : a;
}
gcdNumber.signature = n2;
function lcmNumber(a, b) {
  if (!isInteger(a) || !isInteger(b)) {
    throw new Error("Parameters in function lcm must be integer numbers");
  }
  if (a === 0 || b === 0) {
    return 0;
  }
  var t;
  var prod = a * b;
  while (b !== 0) {
    t = b;
    b = a % t;
    a = t;
  }
  return Math.abs(prod / a);
}
lcmNumber.signature = n2;
function log10Number(x) {
  return log10(x);
}
log10Number.signature = n1;
function log2Number(x) {
  return log2(x);
}
log2Number.signature = n1;
function log1pNumber(x) {
  return log1p(x);
}
log1pNumber.signature = n1;
function modNumber(x, y) {
  return y === 0 ? x : x - y * Math.floor(x / y);
}
modNumber.signature = n2;
function signNumber(x) {
  return sign(x);
}
signNumber.signature = n1;
function sqrtNumber(x) {
  return Math.sqrt(x);
}
sqrtNumber.signature = n1;
function squareNumber(x) {
  return x * x;
}
squareNumber.signature = n1;
function xgcdNumber(a, b) {
  var t;
  var q;
  var r;
  var x = 0;
  var lastx = 1;
  var y = 1;
  var lasty = 0;
  if (!isInteger(a) || !isInteger(b)) {
    throw new Error("Parameters in function xgcd must be integer numbers");
  }
  while (b) {
    q = Math.floor(a / b);
    r = a - q * b;
    t = x;
    x = lastx - q * x;
    lastx = t;
    t = y;
    y = lasty - q * y;
    lasty = t;
    a = b;
    b = r;
  }
  var res;
  if (a < 0) {
    res = [-a, -lastx, -lasty];
  } else {
    res = [a, a ? lastx : 0, lasty];
  }
  return res;
}
xgcdNumber.signature = n2;
function powNumber(x, y) {
  if (x * x < 1 && y === Infinity || x * x > 1 && y === -Infinity) {
    return 0;
  }
  return Math.pow(x, y);
}
powNumber.signature = n2;
function normNumber(x) {
  return Math.abs(x);
}
normNumber.signature = n1;

// ../../../../../../node_modules/mathjs/lib/esm/utils/bignumber/nearlyEqual.js
function nearlyEqual2(a, b) {
  var relTol = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1e-9;
  var absTol = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
  if (relTol <= 0) {
    throw new Error("Relative tolerance must be greater than 0");
  }
  if (absTol < 0) {
    throw new Error("Absolute tolerance must be at least 0");
  }
  if (a.isNaN() || b.isNaN()) {
    return false;
  }
  if (!a.isFinite() || !b.isFinite()) {
    return a.eq(b);
  }
  if (a.eq(b)) {
    return true;
  }
  return a.minus(b).abs().lte(a.constructor.max(a.constructor.max(a.abs(), b.abs()).mul(relTol), absTol));
}

// ../../../../../../node_modules/mathjs/lib/esm/function/utils/isZero.js
var name7 = "isZero";
var dependencies8 = ["typed", "equalScalar"];
var createIsZero = /* @__PURE__ */ factory(name7, dependencies8, (_ref) => {
  var {
    typed: typed3,
    equalScalar: equalScalar2
  } = _ref;
  return typed3(name7, {
    "number | BigNumber | Complex | Fraction": (x) => equalScalar2(x, 0),
    bigint: (x) => x === 0n,
    Unit: typed3.referToSelf((self2) => (x) => typed3.find(self2, x.valueType())(x.value)),
    "Array | Matrix": typed3.referToSelf((self2) => (x) => deepMap2(x, self2))
  });
});

// ../../../../../../node_modules/mathjs/lib/esm/utils/complex.js
function complexEquals(x, y, relTol, absTol) {
  return nearlyEqual(x.re, y.re, relTol, absTol) && nearlyEqual(x.im, y.im, relTol, absTol);
}

// ../../../../../../node_modules/mathjs/lib/esm/function/relational/compareUnits.js
var createCompareUnits = /* @__PURE__ */ factory("compareUnits", ["typed"], (_ref) => {
  var {
    typed: typed3
  } = _ref;
  return {
    "Unit, Unit": typed3.referToSelf((self2) => (x, y) => {
      if (!x.equalBase(y)) {
        throw new Error("Cannot compare units with different base");
      }
      return typed3.find(self2, [x.valueType(), y.valueType()])(x.value, y.value);
    })
  };
});

// ../../../../../../node_modules/mathjs/lib/esm/function/relational/equalScalar.js
var name8 = "equalScalar";
var dependencies9 = ["typed", "config"];
var createEqualScalar = /* @__PURE__ */ factory(name8, dependencies9, (_ref) => {
  var {
    typed: typed3,
    config: config4
  } = _ref;
  var compareUnits = createCompareUnits({
    typed: typed3
  });
  return typed3(name8, {
    "boolean, boolean": function boolean_boolean(x, y) {
      return x === y;
    },
    "number, number": function number_number(x, y) {
      return nearlyEqual(x, y, config4.relTol, config4.absTol);
    },
    "BigNumber, BigNumber": function BigNumber_BigNumber(x, y) {
      return x.eq(y) || nearlyEqual2(x, y, config4.relTol, config4.absTol);
    },
    "bigint, bigint": function bigint_bigint(x, y) {
      return x === y;
    },
    "Fraction, Fraction": function Fraction_Fraction(x, y) {
      return x.equals(y);
    },
    "Complex, Complex": function Complex_Complex(x, y) {
      return complexEquals(x, y, config4.relTol, config4.absTol);
    }
  }, compareUnits);
});
var createEqualScalarNumber = factory(name8, ["typed", "config"], (_ref2) => {
  var {
    typed: typed3,
    config: config4
  } = _ref2;
  return typed3(name8, {
    "number, number": function number_number(x, y) {
      return nearlyEqual(x, y, config4.relTol, config4.absTol);
    }
  });
});

// ../../../../../../node_modules/mathjs/lib/esm/type/matrix/SparseMatrix.js
var name9 = "SparseMatrix";
var dependencies10 = ["typed", "equalScalar", "Matrix"];
var createSparseMatrixClass = /* @__PURE__ */ factory(name9, dependencies10, (_ref) => {
  var {
    typed: typed3,
    equalScalar: equalScalar2,
    Matrix: Matrix2
  } = _ref;
  function SparseMatrix2(data, datatype) {
    if (!(this instanceof SparseMatrix2)) {
      throw new SyntaxError("Constructor must be called with the new operator");
    }
    if (datatype && !isString(datatype)) {
      throw new Error("Invalid datatype: " + datatype);
    }
    if (isMatrix(data)) {
      _createFromMatrix(this, data, datatype);
    } else if (data && isArray(data.index) && isArray(data.ptr) && isArray(data.size)) {
      this._values = data.values;
      this._index = data.index;
      this._ptr = data.ptr;
      this._size = data.size;
      this._datatype = datatype || data.datatype;
    } else if (isArray(data)) {
      _createFromArray(this, data, datatype);
    } else if (data) {
      throw new TypeError("Unsupported type of data (" + typeOf(data) + ")");
    } else {
      this._values = [];
      this._index = [];
      this._ptr = [0];
      this._size = [0, 0];
      this._datatype = datatype;
    }
  }
  function _createFromMatrix(matrix2, source, datatype) {
    if (source.type === "SparseMatrix") {
      matrix2._values = source._values ? clone(source._values) : void 0;
      matrix2._index = clone(source._index);
      matrix2._ptr = clone(source._ptr);
      matrix2._size = clone(source._size);
      matrix2._datatype = datatype || source._datatype;
    } else {
      _createFromArray(matrix2, source.valueOf(), datatype || source._datatype);
    }
  }
  function _createFromArray(matrix2, data, datatype) {
    matrix2._values = [];
    matrix2._index = [];
    matrix2._ptr = [];
    matrix2._datatype = datatype;
    var rows = data.length;
    var columns = 0;
    var eq = equalScalar2;
    var zero3 = 0;
    if (isString(datatype)) {
      eq = typed3.find(equalScalar2, [datatype, datatype]) || equalScalar2;
      zero3 = typed3.convert(0, datatype);
    }
    if (rows > 0) {
      var j = 0;
      do {
        matrix2._ptr.push(matrix2._index.length);
        for (var i = 0; i < rows; i++) {
          var row = data[i];
          if (isArray(row)) {
            if (j === 0 && columns < row.length) {
              columns = row.length;
            }
            if (j < row.length) {
              var v = row[j];
              if (!eq(v, zero3)) {
                matrix2._values.push(v);
                matrix2._index.push(i);
              }
            }
          } else {
            if (j === 0 && columns < 1) {
              columns = 1;
            }
            if (!eq(row, zero3)) {
              matrix2._values.push(row);
              matrix2._index.push(i);
            }
          }
        }
        j++;
      } while (j < columns);
    }
    matrix2._ptr.push(matrix2._index.length);
    matrix2._size = [rows, columns];
  }
  SparseMatrix2.prototype = new Matrix2();
  SparseMatrix2.prototype.createSparseMatrix = function(data, datatype) {
    return new SparseMatrix2(data, datatype);
  };
  Object.defineProperty(SparseMatrix2, "name", {
    value: "SparseMatrix"
  });
  SparseMatrix2.prototype.constructor = SparseMatrix2;
  SparseMatrix2.prototype.type = "SparseMatrix";
  SparseMatrix2.prototype.isSparseMatrix = true;
  SparseMatrix2.prototype.getDataType = function() {
    return getArrayDataType(this._values, typeOf);
  };
  SparseMatrix2.prototype.storage = function() {
    return "sparse";
  };
  SparseMatrix2.prototype.datatype = function() {
    return this._datatype;
  };
  SparseMatrix2.prototype.create = function(data, datatype) {
    return new SparseMatrix2(data, datatype);
  };
  SparseMatrix2.prototype.density = function() {
    var rows = this._size[0];
    var columns = this._size[1];
    return rows !== 0 && columns !== 0 ? this._index.length / (rows * columns) : 0;
  };
  SparseMatrix2.prototype.subset = function(index, replacement, defaultValue) {
    if (!this._values) {
      throw new Error("Cannot invoke subset on a Pattern only matrix");
    }
    switch (arguments.length) {
      case 1:
        return _getsubset(this, index);
      // intentional fall through
      case 2:
      case 3:
        return _setsubset(this, index, replacement, defaultValue);
      default:
        throw new SyntaxError("Wrong number of arguments");
    }
  };
  function _getsubset(matrix2, idx) {
    if (!isIndex(idx)) {
      throw new TypeError("Invalid index");
    }
    var isScalar = idx.isScalar();
    if (isScalar) {
      return matrix2.get(idx.min());
    }
    var size2 = idx.size();
    if (size2.length !== matrix2._size.length) {
      throw new DimensionError(size2.length, matrix2._size.length);
    }
    var i, ii, k, kk;
    var min3 = idx.min();
    var max4 = idx.max();
    for (i = 0, ii = matrix2._size.length; i < ii; i++) {
      validateIndex(min3[i], matrix2._size[i]);
      validateIndex(max4[i], matrix2._size[i]);
    }
    var mvalues = matrix2._values;
    var mindex = matrix2._index;
    var mptr = matrix2._ptr;
    var rows = idx.dimension(0);
    var columns = idx.dimension(1);
    var w = [];
    var pv = [];
    rows.forEach(function(i2, r) {
      pv[i2] = r[0];
      w[i2] = true;
    });
    var values = mvalues ? [] : void 0;
    var index = [];
    var ptr = [];
    columns.forEach(function(j) {
      ptr.push(index.length);
      for (k = mptr[j], kk = mptr[j + 1]; k < kk; k++) {
        i = mindex[k];
        if (w[i] === true) {
          index.push(pv[i]);
          if (values) {
            values.push(mvalues[k]);
          }
        }
      }
    });
    ptr.push(index.length);
    return new SparseMatrix2({
      values,
      index,
      ptr,
      size: size2,
      datatype: matrix2._datatype
    });
  }
  function _setsubset(matrix2, index, submatrix, defaultValue) {
    if (!index || index.isIndex !== true) {
      throw new TypeError("Invalid index");
    }
    var iSize = index.size();
    var isScalar = index.isScalar();
    var sSize;
    if (isMatrix(submatrix)) {
      sSize = submatrix.size();
      submatrix = submatrix.toArray();
    } else {
      sSize = arraySize(submatrix);
    }
    if (isScalar) {
      if (sSize.length !== 0) {
        throw new TypeError("Scalar expected");
      }
      matrix2.set(index.min(), submatrix, defaultValue);
    } else {
      if (iSize.length !== 1 && iSize.length !== 2) {
        throw new DimensionError(iSize.length, matrix2._size.length, "<");
      }
      if (sSize.length < iSize.length) {
        var i = 0;
        var outer = 0;
        while (iSize[i] === 1 && sSize[i] === 1) {
          i++;
        }
        while (iSize[i] === 1) {
          outer++;
          i++;
        }
        submatrix = unsqueeze(submatrix, iSize.length, outer, sSize);
      }
      if (!deepStrictEqual(iSize, sSize)) {
        throw new DimensionError(iSize, sSize, ">");
      }
      if (iSize.length === 1) {
        var range2 = index.dimension(0);
        range2.forEach(function(dataIndex, subIndex) {
          validateIndex(dataIndex);
          matrix2.set([dataIndex, 0], submatrix[subIndex[0]], defaultValue);
        });
      } else {
        var firstDimensionRange = index.dimension(0);
        var secondDimensionRange = index.dimension(1);
        firstDimensionRange.forEach(function(firstDataIndex, firstSubIndex) {
          validateIndex(firstDataIndex);
          secondDimensionRange.forEach(function(secondDataIndex, secondSubIndex) {
            validateIndex(secondDataIndex);
            matrix2.set([firstDataIndex, secondDataIndex], submatrix[firstSubIndex[0]][secondSubIndex[0]], defaultValue);
          });
        });
      }
    }
    return matrix2;
  }
  SparseMatrix2.prototype.get = function(index) {
    if (!isArray(index)) {
      throw new TypeError("Array expected");
    }
    if (index.length !== this._size.length) {
      throw new DimensionError(index.length, this._size.length);
    }
    if (!this._values) {
      throw new Error("Cannot invoke get on a Pattern only matrix");
    }
    var i = index[0];
    var j = index[1];
    validateIndex(i, this._size[0]);
    validateIndex(j, this._size[1]);
    var k = _getValueIndex(i, this._ptr[j], this._ptr[j + 1], this._index);
    if (k < this._ptr[j + 1] && this._index[k] === i) {
      return this._values[k];
    }
    return 0;
  };
  SparseMatrix2.prototype.set = function(index, v, defaultValue) {
    if (!isArray(index)) {
      throw new TypeError("Array expected");
    }
    if (index.length !== this._size.length) {
      throw new DimensionError(index.length, this._size.length);
    }
    if (!this._values) {
      throw new Error("Cannot invoke set on a Pattern only matrix");
    }
    var i = index[0];
    var j = index[1];
    var rows = this._size[0];
    var columns = this._size[1];
    var eq = equalScalar2;
    var zero3 = 0;
    if (isString(this._datatype)) {
      eq = typed3.find(equalScalar2, [this._datatype, this._datatype]) || equalScalar2;
      zero3 = typed3.convert(0, this._datatype);
    }
    if (i > rows - 1 || j > columns - 1) {
      _resize2(this, Math.max(i + 1, rows), Math.max(j + 1, columns), defaultValue);
      rows = this._size[0];
      columns = this._size[1];
    }
    validateIndex(i, rows);
    validateIndex(j, columns);
    var k = _getValueIndex(i, this._ptr[j], this._ptr[j + 1], this._index);
    if (k < this._ptr[j + 1] && this._index[k] === i) {
      if (!eq(v, zero3)) {
        this._values[k] = v;
      } else {
        _remove(k, j, this._values, this._index, this._ptr);
      }
    } else {
      if (!eq(v, zero3)) {
        _insert(k, i, j, v, this._values, this._index, this._ptr);
      }
    }
    return this;
  };
  function _getValueIndex(i, top2, bottom2, index) {
    if (bottom2 - top2 === 0) {
      return bottom2;
    }
    for (var r = top2; r < bottom2; r++) {
      if (index[r] === i) {
        return r;
      }
    }
    return top2;
  }
  function _remove(k, j, values, index, ptr) {
    values.splice(k, 1);
    index.splice(k, 1);
    for (var x = j + 1; x < ptr.length; x++) {
      ptr[x]--;
    }
  }
  function _insert(k, i, j, v, values, index, ptr) {
    values.splice(k, 0, v);
    index.splice(k, 0, i);
    for (var x = j + 1; x < ptr.length; x++) {
      ptr[x]++;
    }
  }
  SparseMatrix2.prototype.resize = function(size2, defaultValue, copy2) {
    if (!isCollection(size2)) {
      throw new TypeError("Array or Matrix expected");
    }
    var sizeArray = size2.valueOf().map((value) => {
      return Array.isArray(value) && value.length === 1 ? value[0] : value;
    });
    if (sizeArray.length !== 2) {
      throw new Error("Only two dimensions matrix are supported");
    }
    sizeArray.forEach(function(value) {
      if (!isNumber(value) || !isInteger(value) || value < 0) {
        throw new TypeError("Invalid size, must contain positive integers (size: " + format4(sizeArray) + ")");
      }
    });
    var m = copy2 ? this.clone() : this;
    return _resize2(m, sizeArray[0], sizeArray[1], defaultValue);
  };
  function _resize2(matrix2, rows, columns, defaultValue) {
    var value = defaultValue || 0;
    var eq = equalScalar2;
    var zero3 = 0;
    if (isString(matrix2._datatype)) {
      eq = typed3.find(equalScalar2, [matrix2._datatype, matrix2._datatype]) || equalScalar2;
      zero3 = typed3.convert(0, matrix2._datatype);
      value = typed3.convert(value, matrix2._datatype);
    }
    var ins = !eq(value, zero3);
    var r = matrix2._size[0];
    var c = matrix2._size[1];
    var i, j, k;
    if (columns > c) {
      for (j = c; j < columns; j++) {
        matrix2._ptr[j] = matrix2._values.length;
        if (ins) {
          for (i = 0; i < r; i++) {
            matrix2._values.push(value);
            matrix2._index.push(i);
          }
        }
      }
      matrix2._ptr[columns] = matrix2._values.length;
    } else if (columns < c) {
      matrix2._ptr.splice(columns + 1, c - columns);
      matrix2._values.splice(matrix2._ptr[columns], matrix2._values.length);
      matrix2._index.splice(matrix2._ptr[columns], matrix2._index.length);
    }
    c = columns;
    if (rows > r) {
      if (ins) {
        var n = 0;
        for (j = 0; j < c; j++) {
          matrix2._ptr[j] = matrix2._ptr[j] + n;
          k = matrix2._ptr[j + 1] + n;
          var p = 0;
          for (i = r; i < rows; i++, p++) {
            matrix2._values.splice(k + p, 0, value);
            matrix2._index.splice(k + p, 0, i);
            n++;
          }
        }
        matrix2._ptr[c] = matrix2._values.length;
      }
    } else if (rows < r) {
      var d = 0;
      for (j = 0; j < c; j++) {
        matrix2._ptr[j] = matrix2._ptr[j] - d;
        var k0 = matrix2._ptr[j];
        var k1 = matrix2._ptr[j + 1] - d;
        for (k = k0; k < k1; k++) {
          i = matrix2._index[k];
          if (i > rows - 1) {
            matrix2._values.splice(k, 1);
            matrix2._index.splice(k, 1);
            d++;
          }
        }
      }
      matrix2._ptr[j] = matrix2._values.length;
    }
    matrix2._size[0] = rows;
    matrix2._size[1] = columns;
    return matrix2;
  }
  SparseMatrix2.prototype.reshape = function(sizes, copy2) {
    if (!isArray(sizes)) {
      throw new TypeError("Array expected");
    }
    if (sizes.length !== 2) {
      throw new Error("Sparse matrices can only be reshaped in two dimensions");
    }
    sizes.forEach(function(value) {
      if (!isNumber(value) || !isInteger(value) || value <= -2 || value === 0) {
        throw new TypeError("Invalid size, must contain positive integers or -1 (size: " + format4(sizes) + ")");
      }
    });
    var currentLength = this._size[0] * this._size[1];
    sizes = processSizesWildcard(sizes, currentLength);
    var newLength = sizes[0] * sizes[1];
    if (currentLength !== newLength) {
      throw new Error("Reshaping sparse matrix will result in the wrong number of elements");
    }
    var m = copy2 ? this.clone() : this;
    if (this._size[0] === sizes[0] && this._size[1] === sizes[1]) {
      return m;
    }
    var colIndex = [];
    for (var i = 0; i < m._ptr.length; i++) {
      for (var j = 0; j < m._ptr[i + 1] - m._ptr[i]; j++) {
        colIndex.push(i);
      }
    }
    var values = m._values.slice();
    var rowIndex = m._index.slice();
    for (var _i = 0; _i < m._index.length; _i++) {
      var r1 = rowIndex[_i];
      var c1 = colIndex[_i];
      var flat = r1 * m._size[1] + c1;
      colIndex[_i] = flat % sizes[1];
      rowIndex[_i] = Math.floor(flat / sizes[1]);
    }
    m._values.length = 0;
    m._index.length = 0;
    m._ptr.length = sizes[1] + 1;
    m._size = sizes.slice();
    for (var _i2 = 0; _i2 < m._ptr.length; _i2++) {
      m._ptr[_i2] = 0;
    }
    for (var h = 0; h < values.length; h++) {
      var _i3 = rowIndex[h];
      var _j = colIndex[h];
      var v = values[h];
      var k = _getValueIndex(_i3, m._ptr[_j], m._ptr[_j + 1], m._index);
      _insert(k, _i3, _j, v, m._values, m._index, m._ptr);
    }
    return m;
  };
  SparseMatrix2.prototype.clone = function() {
    var m = new SparseMatrix2({
      values: this._values ? clone(this._values) : void 0,
      index: clone(this._index),
      ptr: clone(this._ptr),
      size: clone(this._size),
      datatype: this._datatype
    });
    return m;
  };
  SparseMatrix2.prototype.size = function() {
    return this._size.slice(0);
  };
  SparseMatrix2.prototype.map = function(callback, skipZeros) {
    if (!this._values) {
      throw new Error("Cannot invoke map on a Pattern only matrix");
    }
    var me = this;
    var rows = this._size[0];
    var columns = this._size[1];
    var fastCallback = optimizeCallback(callback, me, "map");
    var invoke = function invoke2(v, i, j) {
      return fastCallback.fn(v, [i, j], me);
    };
    return _map(this, 0, rows - 1, 0, columns - 1, invoke, skipZeros);
  };
  function _map(matrix2, minRow, maxRow, minColumn, maxColumn, callback, skipZeros) {
    var values = [];
    var index = [];
    var ptr = [];
    var eq = equalScalar2;
    var zero3 = 0;
    if (isString(matrix2._datatype)) {
      eq = typed3.find(equalScalar2, [matrix2._datatype, matrix2._datatype]) || equalScalar2;
      zero3 = typed3.convert(0, matrix2._datatype);
    }
    var invoke = function invoke2(v, x, y) {
      var value2 = callback(v, x, y);
      if (!eq(value2, zero3)) {
        values.push(value2);
        index.push(x);
      }
    };
    for (var j = minColumn; j <= maxColumn; j++) {
      ptr.push(values.length);
      var k0 = matrix2._ptr[j];
      var k1 = matrix2._ptr[j + 1];
      if (skipZeros) {
        for (var k = k0; k < k1; k++) {
          var i = matrix2._index[k];
          if (i >= minRow && i <= maxRow) {
            invoke(matrix2._values[k], i - minRow, j - minColumn);
          }
        }
      } else {
        var _values = {};
        for (var _k = k0; _k < k1; _k++) {
          var _i4 = matrix2._index[_k];
          _values[_i4] = matrix2._values[_k];
        }
        for (var _i5 = minRow; _i5 <= maxRow; _i5++) {
          var value = _i5 in _values ? _values[_i5] : 0;
          invoke(value, _i5 - minRow, j - minColumn);
        }
      }
    }
    ptr.push(values.length);
    return new SparseMatrix2({
      values,
      index,
      ptr,
      size: [maxRow - minRow + 1, maxColumn - minColumn + 1]
    });
  }
  SparseMatrix2.prototype.forEach = function(callback, skipZeros) {
    if (!this._values) {
      throw new Error("Cannot invoke forEach on a Pattern only matrix");
    }
    var me = this;
    var rows = this._size[0];
    var columns = this._size[1];
    var fastCallback = optimizeCallback(callback, me, "forEach");
    for (var j = 0; j < columns; j++) {
      var k0 = this._ptr[j];
      var k1 = this._ptr[j + 1];
      if (skipZeros) {
        for (var k = k0; k < k1; k++) {
          var i = this._index[k];
          fastCallback.fn(this._values[k], [i, j], me);
        }
      } else {
        var values = {};
        for (var _k2 = k0; _k2 < k1; _k2++) {
          var _i6 = this._index[_k2];
          values[_i6] = this._values[_k2];
        }
        for (var _i7 = 0; _i7 < rows; _i7++) {
          var value = _i7 in values ? values[_i7] : 0;
          fastCallback.fn(value, [_i7, j], me);
        }
      }
    }
  };
  SparseMatrix2.prototype[Symbol.iterator] = function* () {
    if (!this._values) {
      throw new Error("Cannot iterate a Pattern only matrix");
    }
    var columns = this._size[1];
    for (var j = 0; j < columns; j++) {
      var k0 = this._ptr[j];
      var k1 = this._ptr[j + 1];
      for (var k = k0; k < k1; k++) {
        var i = this._index[k];
        yield {
          value: this._values[k],
          index: [i, j]
        };
      }
    }
  };
  SparseMatrix2.prototype.toArray = function() {
    return _toArray(this._values, this._index, this._ptr, this._size, true);
  };
  SparseMatrix2.prototype.valueOf = function() {
    return _toArray(this._values, this._index, this._ptr, this._size, false);
  };
  function _toArray(values, index, ptr, size2, copy2) {
    var rows = size2[0];
    var columns = size2[1];
    var a = [];
    var i, j;
    for (i = 0; i < rows; i++) {
      a[i] = [];
      for (j = 0; j < columns; j++) {
        a[i][j] = 0;
      }
    }
    for (j = 0; j < columns; j++) {
      var k0 = ptr[j];
      var k1 = ptr[j + 1];
      for (var k = k0; k < k1; k++) {
        i = index[k];
        a[i][j] = values ? copy2 ? clone(values[k]) : values[k] : 1;
      }
    }
    return a;
  }
  SparseMatrix2.prototype.format = function(options) {
    var rows = this._size[0];
    var columns = this._size[1];
    var density = this.density();
    var str = "Sparse Matrix [" + format4(rows, options) + " x " + format4(columns, options) + "] density: " + format4(density, options) + "\n";
    for (var j = 0; j < columns; j++) {
      var k0 = this._ptr[j];
      var k1 = this._ptr[j + 1];
      for (var k = k0; k < k1; k++) {
        var i = this._index[k];
        str += "\n    (" + format4(i, options) + ", " + format4(j, options) + ") ==> " + (this._values ? format4(this._values[k], options) : "X");
      }
    }
    return str;
  };
  SparseMatrix2.prototype.toString = function() {
    return format4(this.toArray());
  };
  SparseMatrix2.prototype.toJSON = function() {
    return {
      mathjs: "SparseMatrix",
      values: this._values,
      index: this._index,
      ptr: this._ptr,
      size: this._size,
      datatype: this._datatype
    };
  };
  SparseMatrix2.prototype.diagonal = function(k) {
    if (k) {
      if (isBigNumber(k)) {
        k = k.toNumber();
      }
      if (!isNumber(k) || !isInteger(k)) {
        throw new TypeError("The parameter k must be an integer number");
      }
    } else {
      k = 0;
    }
    var kSuper = k > 0 ? k : 0;
    var kSub = k < 0 ? -k : 0;
    var rows = this._size[0];
    var columns = this._size[1];
    var n = Math.min(rows - kSub, columns - kSuper);
    var values = [];
    var index = [];
    var ptr = [];
    ptr[0] = 0;
    for (var j = kSuper; j < columns && values.length < n; j++) {
      var k0 = this._ptr[j];
      var k1 = this._ptr[j + 1];
      for (var x = k0; x < k1; x++) {
        var i = this._index[x];
        if (i === j - kSuper + kSub) {
          values.push(this._values[x]);
          index[values.length - 1] = i - kSub;
          break;
        }
      }
    }
    ptr.push(values.length);
    return new SparseMatrix2({
      values,
      index,
      ptr,
      size: [n, 1]
    });
  };
  SparseMatrix2.fromJSON = function(json) {
    return new SparseMatrix2(json);
  };
  SparseMatrix2.diagonal = function(size2, value, k, defaultValue, datatype) {
    if (!isArray(size2)) {
      throw new TypeError("Array expected, size parameter");
    }
    if (size2.length !== 2) {
      throw new Error("Only two dimensions matrix are supported");
    }
    size2 = size2.map(function(s) {
      if (isBigNumber(s)) {
        s = s.toNumber();
      }
      if (!isNumber(s) || !isInteger(s) || s < 1) {
        throw new Error("Size values must be positive integers");
      }
      return s;
    });
    if (k) {
      if (isBigNumber(k)) {
        k = k.toNumber();
      }
      if (!isNumber(k) || !isInteger(k)) {
        throw new TypeError("The parameter k must be an integer number");
      }
    } else {
      k = 0;
    }
    var eq = equalScalar2;
    var zero3 = 0;
    if (isString(datatype)) {
      eq = typed3.find(equalScalar2, [datatype, datatype]) || equalScalar2;
      zero3 = typed3.convert(0, datatype);
    }
    var kSuper = k > 0 ? k : 0;
    var kSub = k < 0 ? -k : 0;
    var rows = size2[0];
    var columns = size2[1];
    var n = Math.min(rows - kSub, columns - kSuper);
    var _value;
    if (isArray(value)) {
      if (value.length !== n) {
        throw new Error("Invalid value array length");
      }
      _value = function _value2(i2) {
        return value[i2];
      };
    } else if (isMatrix(value)) {
      var ms = value.size();
      if (ms.length !== 1 || ms[0] !== n) {
        throw new Error("Invalid matrix length");
      }
      _value = function _value2(i2) {
        return value.get([i2]);
      };
    } else {
      _value = function _value2() {
        return value;
      };
    }
    var values = [];
    var index = [];
    var ptr = [];
    for (var j = 0; j < columns; j++) {
      ptr.push(values.length);
      var i = j - kSuper;
      if (i >= 0 && i < n) {
        var v = _value(i);
        if (!eq(v, zero3)) {
          index.push(i + kSub);
          values.push(v);
        }
      }
    }
    ptr.push(values.length);
    return new SparseMatrix2({
      values,
      index,
      ptr,
      size: [rows, columns]
    });
  };
  SparseMatrix2.prototype.swapRows = function(i, j) {
    if (!isNumber(i) || !isInteger(i) || !isNumber(j) || !isInteger(j)) {
      throw new Error("Row index must be positive integers");
    }
    if (this._size.length !== 2) {
      throw new Error("Only two dimensional matrix is supported");
    }
    validateIndex(i, this._size[0]);
    validateIndex(j, this._size[0]);
    SparseMatrix2._swapRows(i, j, this._size[1], this._values, this._index, this._ptr);
    return this;
  };
  SparseMatrix2._forEachRow = function(j, values, index, ptr, callback) {
    var k0 = ptr[j];
    var k1 = ptr[j + 1];
    for (var k = k0; k < k1; k++) {
      callback(index[k], values[k]);
    }
  };
  SparseMatrix2._swapRows = function(x, y, columns, values, index, ptr) {
    for (var j = 0; j < columns; j++) {
      var k0 = ptr[j];
      var k1 = ptr[j + 1];
      var kx = _getValueIndex(x, k0, k1, index);
      var ky = _getValueIndex(y, k0, k1, index);
      if (kx < k1 && ky < k1 && index[kx] === x && index[ky] === y) {
        if (values) {
          var v = values[kx];
          values[kx] = values[ky];
          values[ky] = v;
        }
        continue;
      }
      if (kx < k1 && index[kx] === x && (ky >= k1 || index[ky] !== y)) {
        var vx = values ? values[kx] : void 0;
        index.splice(ky, 0, y);
        if (values) {
          values.splice(ky, 0, vx);
        }
        index.splice(ky <= kx ? kx + 1 : kx, 1);
        if (values) {
          values.splice(ky <= kx ? kx + 1 : kx, 1);
        }
        continue;
      }
      if (ky < k1 && index[ky] === y && (kx >= k1 || index[kx] !== x)) {
        var vy = values ? values[ky] : void 0;
        index.splice(kx, 0, x);
        if (values) {
          values.splice(kx, 0, vy);
        }
        index.splice(kx <= ky ? ky + 1 : ky, 1);
        if (values) {
          values.splice(kx <= ky ? ky + 1 : ky, 1);
        }
      }
    }
  };
  return SparseMatrix2;
}, {
  isClass: true
});

// ../../../../../../node_modules/mathjs/lib/esm/type/number.js
var name10 = "number";
var dependencies11 = ["typed"];
function getNonDecimalNumberParts(input) {
  var nonDecimalWithRadixMatch = input.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);
  if (nonDecimalWithRadixMatch) {
    var radix = {
      "0b": 2,
      "0o": 8,
      "0x": 16
    }[nonDecimalWithRadixMatch[1]];
    var integerPart = nonDecimalWithRadixMatch[2];
    var fractionalPart = nonDecimalWithRadixMatch[3];
    return {
      input,
      radix,
      integerPart,
      fractionalPart
    };
  } else {
    return null;
  }
}
function makeNumberFromNonDecimalParts(parts) {
  var n = parseInt(parts.integerPart, parts.radix);
  var f = 0;
  for (var i = 0; i < parts.fractionalPart.length; i++) {
    var digitValue = parseInt(parts.fractionalPart[i], parts.radix);
    f += digitValue / Math.pow(parts.radix, i + 1);
  }
  var result = n + f;
  if (isNaN(result)) {
    throw new SyntaxError('String "' + parts.input + '" is not a valid number');
  }
  return result;
}
var createNumber = /* @__PURE__ */ factory(name10, dependencies11, (_ref) => {
  var {
    typed: typed3
  } = _ref;
  var number5 = typed3("number", {
    "": function _() {
      return 0;
    },
    number: function number6(x) {
      return x;
    },
    string: function string(x) {
      if (x === "NaN") return NaN;
      var nonDecimalNumberParts = getNonDecimalNumberParts(x);
      if (nonDecimalNumberParts) {
        return makeNumberFromNonDecimalParts(nonDecimalNumberParts);
      }
      var size2 = 0;
      var wordSizeSuffixMatch = x.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
      if (wordSizeSuffixMatch) {
        size2 = Number(wordSizeSuffixMatch[2]);
        x = wordSizeSuffixMatch[1];
      }
      var num = Number(x);
      if (isNaN(num)) {
        throw new SyntaxError('String "' + x + '" is not a valid number');
      }
      if (wordSizeSuffixMatch) {
        if (num > 2 ** size2 - 1) {
          throw new SyntaxError('String "'.concat(x, '" is out of range'));
        }
        if (num >= 2 ** (size2 - 1)) {
          num = num - 2 ** size2;
        }
      }
      return num;
    },
    BigNumber: function BigNumber2(x) {
      return x.toNumber();
    },
    bigint: function bigint(x) {
      return Number(x);
    },
    Fraction: function Fraction3(x) {
      return x.valueOf();
    },
    Unit: typed3.referToSelf((self2) => (x) => {
      var clone4 = x.clone();
      clone4.value = self2(x.value);
      return clone4;
    }),
    null: function _null(x) {
      return 0;
    },
    "Unit, string | Unit": function Unit_string__Unit(unit2, valuelessUnit) {
      return unit2.toNumber(valuelessUnit);
    },
    "Array | Matrix": typed3.referToSelf((self2) => (x) => deepMap2(x, self2))
  });
  number5.fromJSON = function(json) {
    return parseFloat(json.value);
  };
  return number5;
});

// ../../../../../../node_modules/mathjs/lib/esm/type/bignumber/function/bignumber.js
var name11 = "bignumber";
var dependencies12 = ["typed", "BigNumber"];
var createBignumber = /* @__PURE__ */ factory(name11, dependencies12, (_ref) => {
  var {
    typed: typed3,
    BigNumber: BigNumber2
  } = _ref;
  return typed3("bignumber", {
    "": function _() {
      return new BigNumber2(0);
    },
    number: function number5(x) {
      return new BigNumber2(x + "");
    },
    string: function string(x) {
      var wordSizeSuffixMatch = x.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
      if (wordSizeSuffixMatch) {
        var size2 = wordSizeSuffixMatch[2];
        var n = BigNumber2(wordSizeSuffixMatch[1]);
        var twoPowSize = new BigNumber2(2).pow(Number(size2));
        if (n.gt(twoPowSize.sub(1))) {
          throw new SyntaxError('String "'.concat(x, '" is out of range'));
        }
        var twoPowSizeSubOne = new BigNumber2(2).pow(Number(size2) - 1);
        if (n.gte(twoPowSizeSubOne)) {
          return n.sub(twoPowSize);
        } else {
          return n;
        }
      }
      return new BigNumber2(x);
    },
    BigNumber: function BigNumber3(x) {
      return x;
    },
    bigint: function bigint(x) {
      return new BigNumber2(x.toString());
    },
    Unit: typed3.referToSelf((self2) => (x) => {
      var clone4 = x.clone();
      clone4.value = self2(x.value);
      return clone4;
    }),
    Fraction: function Fraction3(x) {
      return new BigNumber2(String(x.n)).div(String(x.d)).times(String(x.s));
    },
    null: function _null(_x) {
      return new BigNumber2(0);
    },
    "Array | Matrix": typed3.referToSelf((self2) => (x) => deepMap2(x, self2))
  });
});

// ../../../../../../node_modules/mathjs/lib/esm/type/fraction/function/fraction.js
var name12 = "fraction";
var dependencies13 = ["typed", "Fraction"];
var createFraction = /* @__PURE__ */ factory(name12, dependencies13, (_ref) => {
  var {
    typed: typed3,
    Fraction: Fraction3
  } = _ref;
  return typed3("fraction", {
    number: function number5(x) {
      if (!isFinite(x) || isNaN(x)) {
        throw new Error(x + " cannot be represented as a fraction");
      }
      return new Fraction3(x);
    },
    string: function string(x) {
      return new Fraction3(x);
    },
    "number, number": function number_number(numerator, denominator) {
      return new Fraction3(numerator, denominator);
    },
    "bigint, bigint": function bigint_bigint(numerator, denominator) {
      return new Fraction3(numerator, denominator);
    },
    null: function _null(x) {
      return new Fraction3(0);
    },
    BigNumber: function BigNumber2(x) {
      return new Fraction3(x.toString());
    },
    bigint: function bigint(x) {
      return new Fraction3(x.toString());
    },
    Fraction: function Fraction4(x) {
      return x;
    },
    Unit: typed3.referToSelf((self2) => (x) => {
      var clone4 = x.clone();
      clone4.value = self2(x.value);
      return clone4;
    }),
    Object: function Object2(x) {
      return new Fraction3(x);
    },
    "Array | Matrix": typed3.referToSelf((self2) => (x) => deepMap2(x, self2))
  });
});

// ../../../../../../node_modules/mathjs/lib/esm/type/matrix/function/matrix.js
var name13 = "matrix";
var dependencies14 = ["typed", "Matrix", "DenseMatrix", "SparseMatrix"];
var createMatrix = /* @__PURE__ */ factory(name13, dependencies14, (_ref) => {
  var {
    typed: typed3,
    Matrix: Matrix2,
    DenseMatrix: DenseMatrix2,
    SparseMatrix: SparseMatrix2
  } = _ref;
  return typed3(name13, {
    "": function _() {
      return _create([]);
    },
    string: function string(format5) {
      return _create([], format5);
    },
    "string, string": function string_string(format5, datatype) {
      return _create([], format5, datatype);
    },
    Array: function Array2(data) {
      return _create(data);
    },
    Matrix: function Matrix3(data) {
      return _create(data, data.storage());
    },
    "Array | Matrix, string": _create,
    "Array | Matrix, string, string": _create
  });
  function _create(data, format5, datatype) {
    if (format5 === "dense" || format5 === "default" || format5 === void 0) {
      return new DenseMatrix2(data, datatype);
    }
    if (format5 === "sparse") {
      return new SparseMatrix2(data, datatype);
    }
    throw new TypeError("Unknown matrix type " + JSON.stringify(format5) + ".");
  }
});

// ../../../../../../node_modules/mathjs/lib/esm/function/arithmetic/unaryMinus.js
var name14 = "unaryMinus";
var dependencies15 = ["typed"];
var createUnaryMinus = /* @__PURE__ */ factory(name14, dependencies15, (_ref) => {
  var {
    typed: typed3
  } = _ref;
  return typed3(name14, {
    number: unaryMinusNumber,
    "Complex | BigNumber | Fraction": (x) => x.neg(),
    bigint: (x) => -x,
    Unit: typed3.referToSelf((self2) => (x) => {
      var res = x.clone();
      res.value = typed3.find(self2, res.valueType())(x.value);
      return res;
    }),
    // deep map collection, skip zeros since unaryMinus(0) = 0
    "Array | Matrix": typed3.referToSelf((self2) => (x) => deepMap2(x, self2, true))
    // TODO: add support for string
  });
});

// ../../../../../../node_modules/mathjs/lib/esm/function/arithmetic/abs.js
var name15 = "abs";
var dependencies16 = ["typed"];
var createAbs = /* @__PURE__ */ factory(name15, dependencies16, (_ref) => {
  var {
    typed: typed3
  } = _ref;
  return typed3(name15, {
    number: absNumber,
    "Complex | BigNumber | Fraction | Unit": (x) => x.abs(),
    bigint: (x) => x < 0n ? -x : x,
    // deep map collection, skip zeros since abs(0) = 0
    "Array | Matrix": typed3.referToSelf((self2) => (x) => deepMap2(x, self2, true))
  });
});

// ../../../../../../node_modules/mathjs/lib/esm/function/arithmetic/addScalar.js
var name16 = "addScalar";
var dependencies17 = ["typed"];
var createAddScalar = /* @__PURE__ */ factory(name16, dependencies17, (_ref) => {
  var {
    typed: typed3
  } = _ref;
  return typed3(name16, {
    "number, number": addNumber,
    "Complex, Complex": function Complex_Complex(x, y) {
      return x.add(y);
    },
    "BigNumber, BigNumber": function BigNumber_BigNumber(x, y) {
      return x.plus(y);
    },
    "bigint, bigint": function bigint_bigint(x, y) {
      return x + y;
    },
    "Fraction, Fraction": function Fraction_Fraction(x, y) {
      return x.add(y);
    },
    "Unit, Unit": typed3.referToSelf((self2) => (x, y) => {
      if (x.value === null || x.value === void 0) {
        throw new Error("Parameter x contains a unit with undefined value");
      }
      if (y.value === null || y.value === void 0) {
        throw new Error("Parameter y contains a unit with undefined value");
      }
      if (!x.equalBase(y)) throw new Error("Units do not match");
      var res = x.clone();
      res.value = typed3.find(self2, [res.valueType(), y.valueType()])(res.value, y.value);
      res.fixPrefix = false;
      return res;
    })
  });
});

// ../../../../../../node_modules/mathjs/lib/esm/function/arithmetic/subtractScalar.js
var name17 = "subtractScalar";
var dependencies18 = ["typed"];
var createSubtractScalar = /* @__PURE__ */ factory(name17, dependencies18, (_ref) => {
  var {
    typed: typed3
  } = _ref;
  return typed3(name17, {
    "number, number": subtractNumber,
    "Complex, Complex": function Complex_Complex(x, y) {
      return x.sub(y);
    },
    "BigNumber, BigNumber": function BigNumber_BigNumber(x, y) {
      return x.minus(y);
    },
    "bigint, bigint": function bigint_bigint(x, y) {
      return x - y;
    },
    "Fraction, Fraction": function Fraction_Fraction(x, y) {
      return x.sub(y);
    },
    "Unit, Unit": typed3.referToSelf((self2) => (x, y) => {
      if (x.value === null || x.value === void 0) {
        throw new Error("Parameter x contains a unit with undefined value");
      }
      if (y.value === null || y.value === void 0) {
        throw new Error("Parameter y contains a unit with undefined value");
      }
      if (!x.equalBase(y)) throw new Error("Units do not match");
      var res = x.clone();
      res.value = typed3.find(self2, [res.valueType(), y.valueType()])(res.value, y.value);
      res.fixPrefix = false;
      return res;
    })
  });
});

// ../../../../../../node_modules/mathjs/lib/esm/type/matrix/utils/matAlgo11xS0s.js
var name18 = "matAlgo11xS0s";
var dependencies19 = ["typed", "equalScalar"];
var createMatAlgo11xS0s = /* @__PURE__ */ factory(name18, dependencies19, (_ref) => {
  var {
    typed: typed3,
    equalScalar: equalScalar2
  } = _ref;
  return function matAlgo11xS0s(s, b, callback, inverse) {
    var avalues = s._values;
    var aindex = s._index;
    var aptr = s._ptr;
    var asize = s._size;
    var adt = s._datatype;
    if (!avalues) {
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    }
    var rows = asize[0];
    var columns = asize[1];
    var dt;
    var eq = equalScalar2;
    var zero3 = 0;
    var cf = callback;
    if (typeof adt === "string") {
      dt = adt;
      eq = typed3.find(equalScalar2, [dt, dt]);
      zero3 = typed3.convert(0, dt);
      b = typed3.convert(b, dt);
      cf = typed3.find(callback, [dt, dt]);
    }
    var cvalues = [];
    var cindex = [];
    var cptr = [];
    for (var j = 0; j < columns; j++) {
      cptr[j] = cindex.length;
      for (var k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
        var i = aindex[k];
        var v = inverse ? cf(b, avalues[k]) : cf(avalues[k], b);
        if (!eq(v, zero3)) {
          cindex.push(i);
          cvalues.push(v);
        }
      }
    }
    cptr[columns] = cindex.length;
    return s.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [rows, columns],
      datatype: dt
    });
  };
});

// ../../../../../../node_modules/mathjs/lib/esm/type/matrix/utils/matAlgo12xSfs.js
var name19 = "matAlgo12xSfs";
var dependencies20 = ["typed", "DenseMatrix"];
var createMatAlgo12xSfs = /* @__PURE__ */ factory(name19, dependencies20, (_ref) => {
  var {
    typed: typed3,
    DenseMatrix: DenseMatrix2
  } = _ref;
  return function matAlgo12xSfs(s, b, callback, inverse) {
    var avalues = s._values;
    var aindex = s._index;
    var aptr = s._ptr;
    var asize = s._size;
    var adt = s._datatype;
    if (!avalues) {
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    }
    var rows = asize[0];
    var columns = asize[1];
    var dt;
    var cf = callback;
    if (typeof adt === "string") {
      dt = adt;
      b = typed3.convert(b, dt);
      cf = typed3.find(callback, [dt, dt]);
    }
    var cdata = [];
    var x = [];
    var w = [];
    for (var j = 0; j < columns; j++) {
      var mark = j + 1;
      for (var k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
        var r = aindex[k];
        x[r] = avalues[k];
        w[r] = mark;
      }
      for (var i = 0; i < rows; i++) {
        if (j === 0) {
          cdata[i] = [];
        }
        if (w[i] === mark) {
          cdata[i][j] = inverse ? cf(b, x[i]) : cf(x[i], b);
        } else {
          cdata[i][j] = inverse ? cf(b, 0) : cf(0, b);
        }
      }
    }
    return new DenseMatrix2({
      data: cdata,
      size: [rows, columns],
      datatype: dt
    });
  };
});

// ../../../../../../node_modules/mathjs/lib/esm/type/matrix/utils/matAlgo14xDs.js
var name20 = "matAlgo14xDs";
var dependencies21 = ["typed"];
var createMatAlgo14xDs = /* @__PURE__ */ factory(name20, dependencies21, (_ref) => {
  var {
    typed: typed3
  } = _ref;
  return function matAlgo14xDs(a, b, callback, inverse) {
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype;
    var dt;
    var cf = callback;
    if (typeof adt === "string") {
      dt = adt;
      b = typed3.convert(b, dt);
      cf = typed3.find(callback, [dt, dt]);
    }
    var cdata = asize.length > 0 ? _iterate(cf, 0, asize, asize[0], adata, b, inverse) : [];
    return a.createDenseMatrix({
      data: cdata,
      size: clone(asize),
      datatype: dt
    });
  };
  function _iterate(f, level, s, n, av, bv, inverse) {
    var cv = [];
    if (level === s.length - 1) {
      for (var i = 0; i < n; i++) {
        cv[i] = inverse ? f(bv, av[i]) : f(av[i], bv);
      }
    } else {
      for (var j = 0; j < n; j++) {
        cv[j] = _iterate(f, level + 1, s, s[level + 1], av[j], bv, inverse);
      }
    }
    return cv;
  }
});

// ../../../../../../node_modules/mathjs/lib/esm/type/matrix/utils/matAlgo03xDSf.js
var name21 = "matAlgo03xDSf";
var dependencies22 = ["typed"];
var createMatAlgo03xDSf = /* @__PURE__ */ factory(name21, dependencies22, (_ref) => {
  var {
    typed: typed3
  } = _ref;
  return function matAlgo03xDSf(denseMatrix, sparseMatrix, callback, inverse) {
    var adata = denseMatrix._data;
    var asize = denseMatrix._size;
    var adt = denseMatrix._datatype || denseMatrix.getDataType();
    var bvalues = sparseMatrix._values;
    var bindex = sparseMatrix._index;
    var bptr = sparseMatrix._ptr;
    var bsize = sparseMatrix._size;
    var bdt = sparseMatrix._datatype || sparseMatrix._data === void 0 ? sparseMatrix._datatype : sparseMatrix.getDataType();
    if (asize.length !== bsize.length) {
      throw new DimensionError(asize.length, bsize.length);
    }
    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
      throw new RangeError("Dimension mismatch. Matrix A (" + asize + ") must match Matrix B (" + bsize + ")");
    }
    if (!bvalues) {
      throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    }
    var rows = asize[0];
    var columns = asize[1];
    var dt;
    var zero3 = 0;
    var cf = callback;
    if (typeof adt === "string" && adt === bdt && adt !== "mixed") {
      dt = adt;
      zero3 = typed3.convert(0, dt);
      cf = typed3.find(callback, [dt, dt]);
    }
    var cdata = [];
    for (var z = 0; z < rows; z++) {
      cdata[z] = [];
    }
    var x = [];
    var w = [];
    for (var j = 0; j < columns; j++) {
      var mark = j + 1;
      for (var k0 = bptr[j], k1 = bptr[j + 1], k = k0; k < k1; k++) {
        var i = bindex[k];
        x[i] = inverse ? cf(bvalues[k], adata[i][j]) : cf(adata[i][j], bvalues[k]);
        w[i] = mark;
      }
      for (var y = 0; y < rows; y++) {
        if (w[y] === mark) {
          cdata[y][j] = x[y];
        } else {
          cdata[y][j] = inverse ? cf(zero3, adata[y][j]) : cf(adata[y][j], zero3);
        }
      }
    }
    return denseMatrix.createDenseMatrix({
      data: cdata,
      size: [rows, columns],
      datatype: adt === denseMatrix._datatype && bdt === sparseMatrix._datatype ? dt : void 0
    });
  };
});

// ../../../../../../node_modules/mathjs/lib/esm/type/matrix/utils/matAlgo05xSfSf.js
var name22 = "matAlgo05xSfSf";
var dependencies23 = ["typed", "equalScalar"];
var createMatAlgo05xSfSf = /* @__PURE__ */ factory(name22, dependencies23, (_ref) => {
  var {
    typed: typed3,
    equalScalar: equalScalar2
  } = _ref;
  return function matAlgo05xSfSf(a, b, callback) {
    var avalues = a._values;
    var aindex = a._index;
    var aptr = a._ptr;
    var asize = a._size;
    var adt = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    var bvalues = b._values;
    var bindex = b._index;
    var bptr = b._ptr;
    var bsize = b._size;
    var bdt = b._datatype || b._data === void 0 ? b._datatype : b.getDataType();
    if (asize.length !== bsize.length) {
      throw new DimensionError(asize.length, bsize.length);
    }
    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
      throw new RangeError("Dimension mismatch. Matrix A (" + asize + ") must match Matrix B (" + bsize + ")");
    }
    var rows = asize[0];
    var columns = asize[1];
    var dt;
    var eq = equalScalar2;
    var zero3 = 0;
    var cf = callback;
    if (typeof adt === "string" && adt === bdt && adt !== "mixed") {
      dt = adt;
      eq = typed3.find(equalScalar2, [dt, dt]);
      zero3 = typed3.convert(0, dt);
      cf = typed3.find(callback, [dt, dt]);
    }
    var cvalues = avalues && bvalues ? [] : void 0;
    var cindex = [];
    var cptr = [];
    var xa = cvalues ? [] : void 0;
    var xb = cvalues ? [] : void 0;
    var wa = [];
    var wb = [];
    var i, j, k, k1;
    for (j = 0; j < columns; j++) {
      cptr[j] = cindex.length;
      var mark = j + 1;
      for (k = aptr[j], k1 = aptr[j + 1]; k < k1; k++) {
        i = aindex[k];
        cindex.push(i);
        wa[i] = mark;
        if (xa) {
          xa[i] = avalues[k];
        }
      }
      for (k = bptr[j], k1 = bptr[j + 1]; k < k1; k++) {
        i = bindex[k];
        if (wa[i] !== mark) {
          cindex.push(i);
        }
        wb[i] = mark;
        if (xb) {
          xb[i] = bvalues[k];
        }
      }
      if (cvalues) {
        k = cptr[j];
        while (k < cindex.length) {
          i = cindex[k];
          var wai = wa[i];
          var wbi = wb[i];
          if (wai === mark || wbi === mark) {
            var va = wai === mark ? xa[i] : zero3;
            var vb = wbi === mark ? xb[i] : zero3;
            var vc = cf(va, vb);
            if (!eq(vc, zero3)) {
              cvalues.push(vc);
              k++;
            } else {
              cindex.splice(k, 1);
            }
          }
        }
      }
    }
    cptr[columns] = cindex.length;
    return a.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [rows, columns],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : void 0
    });
  };
});

// ../../../../../../node_modules/mathjs/lib/esm/type/matrix/utils/matAlgo13xDD.js
var name23 = "matAlgo13xDD";
var dependencies24 = ["typed"];
var createMatAlgo13xDD = /* @__PURE__ */ factory(name23, dependencies24, (_ref) => {
  var {
    typed: typed3
  } = _ref;
  return function matAlgo13xDD(a, b, callback) {
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype;
    var bdata = b._data;
    var bsize = b._size;
    var bdt = b._datatype;
    var csize = [];
    if (asize.length !== bsize.length) {
      throw new DimensionError(asize.length, bsize.length);
    }
    for (var s = 0; s < asize.length; s++) {
      if (asize[s] !== bsize[s]) {
        throw new RangeError("Dimension mismatch. Matrix A (" + asize + ") must match Matrix B (" + bsize + ")");
      }
      csize[s] = asize[s];
    }
    var dt;
    var cf = callback;
    if (typeof adt === "string" && adt === bdt) {
      dt = adt;
      cf = typed3.find(callback, [dt, dt]);
    }
    var cdata = csize.length > 0 ? _iterate(cf, 0, csize, csize[0], adata, bdata) : [];
    return a.createDenseMatrix({
      data: cdata,
      size: csize,
      datatype: dt
    });
  };
  function _iterate(f, level, s, n, av, bv) {
    var cv = [];
    if (level === s.length - 1) {
      for (var i = 0; i < n; i++) {
        cv[i] = f(av[i], bv[i]);
      }
    } else {
      for (var j = 0; j < n; j++) {
        cv[j] = _iterate(f, level + 1, s, s[level + 1], av[j], bv[j]);
      }
    }
    return cv;
  }
});

// ../../../../../../node_modules/mathjs/lib/esm/type/matrix/utils/broadcast.js
function broadcast(A, B) {
  if (deepStrictEqual(A.size(), B.size())) {
    return [A, B];
  }
  var newSize = broadcastSizes(A.size(), B.size());
  return [A, B].map((M) => _broadcastTo(M, newSize));
}
function _broadcastTo(M, size2) {
  if (deepStrictEqual(M.size(), size2)) {
    return M;
  }
  return M.create(broadcastTo(M.valueOf(), size2), M.datatype());
}

// ../../../../../../node_modules/mathjs/lib/esm/type/matrix/utils/matrixAlgorithmSuite.js
var name24 = "matrixAlgorithmSuite";
var dependencies25 = ["typed", "matrix"];
var createMatrixAlgorithmSuite = /* @__PURE__ */ factory(name24, dependencies25, (_ref) => {
  var {
    typed: typed3,
    matrix: matrix2
  } = _ref;
  var matAlgo13xDD = createMatAlgo13xDD({
    typed: typed3
  });
  var matAlgo14xDs = createMatAlgo14xDs({
    typed: typed3
  });
  return function matrixAlgorithmSuite(options) {
    var elop = options.elop;
    var SD = options.SD || options.DS;
    var matrixSignatures;
    if (elop) {
      matrixSignatures = {
        "DenseMatrix, DenseMatrix": (x, y) => matAlgo13xDD(...broadcast(x, y), elop),
        "Array, Array": (x, y) => matAlgo13xDD(...broadcast(matrix2(x), matrix2(y)), elop).valueOf(),
        "Array, DenseMatrix": (x, y) => matAlgo13xDD(...broadcast(matrix2(x), y), elop),
        "DenseMatrix, Array": (x, y) => matAlgo13xDD(...broadcast(x, matrix2(y)), elop)
      };
      if (options.SS) {
        matrixSignatures["SparseMatrix, SparseMatrix"] = (x, y) => options.SS(...broadcast(x, y), elop, false);
      }
      if (options.DS) {
        matrixSignatures["DenseMatrix, SparseMatrix"] = (x, y) => options.DS(...broadcast(x, y), elop, false);
        matrixSignatures["Array, SparseMatrix"] = (x, y) => options.DS(...broadcast(matrix2(x), y), elop, false);
      }
      if (SD) {
        matrixSignatures["SparseMatrix, DenseMatrix"] = (x, y) => SD(...broadcast(y, x), elop, true);
        matrixSignatures["SparseMatrix, Array"] = (x, y) => SD(...broadcast(matrix2(y), x), elop, true);
      }
    } else {
      matrixSignatures = {
        "DenseMatrix, DenseMatrix": typed3.referToSelf((self2) => (x, y) => {
          return matAlgo13xDD(...broadcast(x, y), self2);
        }),
        "Array, Array": typed3.referToSelf((self2) => (x, y) => {
          return matAlgo13xDD(...broadcast(matrix2(x), matrix2(y)), self2).valueOf();
        }),
        "Array, DenseMatrix": typed3.referToSelf((self2) => (x, y) => {
          return matAlgo13xDD(...broadcast(matrix2(x), y), self2);
        }),
        "DenseMatrix, Array": typed3.referToSelf((self2) => (x, y) => {
          return matAlgo13xDD(...broadcast(x, matrix2(y)), self2);
        })
      };
      if (options.SS) {
        matrixSignatures["SparseMatrix, SparseMatrix"] = typed3.referToSelf((self2) => (x, y) => {
          return options.SS(...broadcast(x, y), self2, false);
        });
      }
      if (options.DS) {
        matrixSignatures["DenseMatrix, SparseMatrix"] = typed3.referToSelf((self2) => (x, y) => {
          return options.DS(...broadcast(x, y), self2, false);
        });
        matrixSignatures["Array, SparseMatrix"] = typed3.referToSelf((self2) => (x, y) => {
          return options.DS(...broadcast(matrix2(x), y), self2, false);
        });
      }
      if (SD) {
        matrixSignatures["SparseMatrix, DenseMatrix"] = typed3.referToSelf((self2) => (x, y) => {
          return SD(...broadcast(y, x), self2, true);
        });
        matrixSignatures["SparseMatrix, Array"] = typed3.referToSelf((self2) => (x, y) => {
          return SD(...broadcast(matrix2(y), x), self2, true);
        });
      }
    }
    var scalar = options.scalar || "any";
    var Ds = options.Ds || options.Ss;
    if (Ds) {
      if (elop) {
        matrixSignatures["DenseMatrix," + scalar] = (x, y) => matAlgo14xDs(x, y, elop, false);
        matrixSignatures[scalar + ", DenseMatrix"] = (x, y) => matAlgo14xDs(y, x, elop, true);
        matrixSignatures["Array," + scalar] = (x, y) => matAlgo14xDs(matrix2(x), y, elop, false).valueOf();
        matrixSignatures[scalar + ", Array"] = (x, y) => matAlgo14xDs(matrix2(y), x, elop, true).valueOf();
      } else {
        matrixSignatures["DenseMatrix," + scalar] = typed3.referToSelf((self2) => (x, y) => {
          return matAlgo14xDs(x, y, self2, false);
        });
        matrixSignatures[scalar + ", DenseMatrix"] = typed3.referToSelf((self2) => (x, y) => {
          return matAlgo14xDs(y, x, self2, true);
        });
        matrixSignatures["Array," + scalar] = typed3.referToSelf((self2) => (x, y) => {
          return matAlgo14xDs(matrix2(x), y, self2, false).valueOf();
        });
        matrixSignatures[scalar + ", Array"] = typed3.referToSelf((self2) => (x, y) => {
          return matAlgo14xDs(matrix2(y), x, self2, true).valueOf();
        });
      }
    }
    var sS = options.sS !== void 0 ? options.sS : options.Ss;
    if (elop) {
      if (options.Ss) {
        matrixSignatures["SparseMatrix," + scalar] = (x, y) => options.Ss(x, y, elop, false);
      }
      if (sS) {
        matrixSignatures[scalar + ", SparseMatrix"] = (x, y) => sS(y, x, elop, true);
      }
    } else {
      if (options.Ss) {
        matrixSignatures["SparseMatrix," + scalar] = typed3.referToSelf((self2) => (x, y) => {
          return options.Ss(x, y, self2, false);
        });
      }
      if (sS) {
        matrixSignatures[scalar + ", SparseMatrix"] = typed3.referToSelf((self2) => (x, y) => {
          return sS(y, x, self2, true);
        });
      }
    }
    if (elop && elop.signatures) {
      extend2(matrixSignatures, elop.signatures);
    }
    return matrixSignatures;
  };
});

// ../../../../../../node_modules/mathjs/lib/esm/type/matrix/utils/matAlgo01xDSid.js
var name25 = "matAlgo01xDSid";
var dependencies26 = ["typed"];
var createMatAlgo01xDSid = /* @__PURE__ */ factory(name25, dependencies26, (_ref) => {
  var {
    typed: typed3
  } = _ref;
  return function algorithm1(denseMatrix, sparseMatrix, callback, inverse) {
    var adata = denseMatrix._data;
    var asize = denseMatrix._size;
    var adt = denseMatrix._datatype || denseMatrix.getDataType();
    var bvalues = sparseMatrix._values;
    var bindex = sparseMatrix._index;
    var bptr = sparseMatrix._ptr;
    var bsize = sparseMatrix._size;
    var bdt = sparseMatrix._datatype || sparseMatrix._data === void 0 ? sparseMatrix._datatype : sparseMatrix.getDataType();
    if (asize.length !== bsize.length) {
      throw new DimensionError(asize.length, bsize.length);
    }
    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
      throw new RangeError("Dimension mismatch. Matrix A (" + asize + ") must match Matrix B (" + bsize + ")");
    }
    if (!bvalues) {
      throw new Error("Cannot perform operation on Dense Matrix and Pattern Sparse Matrix");
    }
    var rows = asize[0];
    var columns = asize[1];
    var dt = typeof adt === "string" && adt !== "mixed" && adt === bdt ? adt : void 0;
    var cf = dt ? typed3.find(callback, [dt, dt]) : callback;
    var i, j;
    var cdata = [];
    for (i = 0; i < rows; i++) {
      cdata[i] = [];
    }
    var x = [];
    var w = [];
    for (j = 0; j < columns; j++) {
      var mark = j + 1;
      for (var k0 = bptr[j], k1 = bptr[j + 1], k = k0; k < k1; k++) {
        i = bindex[k];
        x[i] = inverse ? cf(bvalues[k], adata[i][j]) : cf(adata[i][j], bvalues[k]);
        w[i] = mark;
      }
      for (i = 0; i < rows; i++) {
        if (w[i] === mark) {
          cdata[i][j] = x[i];
        } else {
          cdata[i][j] = adata[i][j];
        }
      }
    }
    return denseMatrix.createDenseMatrix({
      data: cdata,
      size: [rows, columns],
      datatype: adt === denseMatrix._datatype && bdt === sparseMatrix._datatype ? dt : void 0
    });
  };
});

// ../../../../../../node_modules/mathjs/lib/esm/type/matrix/utils/matAlgo04xSidSid.js
var name26 = "matAlgo04xSidSid";
var dependencies27 = ["typed", "equalScalar"];
var createMatAlgo04xSidSid = /* @__PURE__ */ factory(name26, dependencies27, (_ref) => {
  var {
    typed: typed3,
    equalScalar: equalScalar2
  } = _ref;
  return function matAlgo04xSidSid(a, b, callback) {
    var avalues = a._values;
    var aindex = a._index;
    var aptr = a._ptr;
    var asize = a._size;
    var adt = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    var bvalues = b._values;
    var bindex = b._index;
    var bptr = b._ptr;
    var bsize = b._size;
    var bdt = b._datatype || b._data === void 0 ? b._datatype : b.getDataType();
    if (asize.length !== bsize.length) {
      throw new DimensionError(asize.length, bsize.length);
    }
    if (asize[0] !== bsize[0] || asize[1] !== bsize[1]) {
      throw new RangeError("Dimension mismatch. Matrix A (" + asize + ") must match Matrix B (" + bsize + ")");
    }
    var rows = asize[0];
    var columns = asize[1];
    var dt;
    var eq = equalScalar2;
    var zero3 = 0;
    var cf = callback;
    if (typeof adt === "string" && adt === bdt && adt !== "mixed") {
      dt = adt;
      eq = typed3.find(equalScalar2, [dt, dt]);
      zero3 = typed3.convert(0, dt);
      cf = typed3.find(callback, [dt, dt]);
    }
    var cvalues = avalues && bvalues ? [] : void 0;
    var cindex = [];
    var cptr = [];
    var xa = avalues && bvalues ? [] : void 0;
    var xb = avalues && bvalues ? [] : void 0;
    var wa = [];
    var wb = [];
    var i, j, k, k0, k1;
    for (j = 0; j < columns; j++) {
      cptr[j] = cindex.length;
      var mark = j + 1;
      for (k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
        i = aindex[k];
        cindex.push(i);
        wa[i] = mark;
        if (xa) {
          xa[i] = avalues[k];
        }
      }
      for (k0 = bptr[j], k1 = bptr[j + 1], k = k0; k < k1; k++) {
        i = bindex[k];
        if (wa[i] === mark) {
          if (xa) {
            var v = cf(xa[i], bvalues[k]);
            if (!eq(v, zero3)) {
              xa[i] = v;
            } else {
              wa[i] = null;
            }
          }
        } else {
          cindex.push(i);
          wb[i] = mark;
          if (xb) {
            xb[i] = bvalues[k];
          }
        }
      }
      if (xa && xb) {
        k = cptr[j];
        while (k < cindex.length) {
          i = cindex[k];
          if (wa[i] === mark) {
            cvalues[k] = xa[i];
            k++;
          } else if (wb[i] === mark) {
            cvalues[k] = xb[i];
            k++;
          } else {
            cindex.splice(k, 1);
          }
        }
      }
    }
    cptr[columns] = cindex.length;
    return a.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [rows, columns],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : void 0
    });
  };
});

// ../../../../../../node_modules/mathjs/lib/esm/type/matrix/utils/matAlgo10xSids.js
var name27 = "matAlgo10xSids";
var dependencies28 = ["typed", "DenseMatrix"];
var createMatAlgo10xSids = /* @__PURE__ */ factory(name27, dependencies28, (_ref) => {
  var {
    typed: typed3,
    DenseMatrix: DenseMatrix2
  } = _ref;
  return function matAlgo10xSids(s, b, callback, inverse) {
    var avalues = s._values;
    var aindex = s._index;
    var aptr = s._ptr;
    var asize = s._size;
    var adt = s._datatype;
    if (!avalues) {
      throw new Error("Cannot perform operation on Pattern Sparse Matrix and Scalar value");
    }
    var rows = asize[0];
    var columns = asize[1];
    var dt;
    var cf = callback;
    if (typeof adt === "string") {
      dt = adt;
      b = typed3.convert(b, dt);
      cf = typed3.find(callback, [dt, dt]);
    }
    var cdata = [];
    var x = [];
    var w = [];
    for (var j = 0; j < columns; j++) {
      var mark = j + 1;
      for (var k0 = aptr[j], k1 = aptr[j + 1], k = k0; k < k1; k++) {
        var r = aindex[k];
        x[r] = avalues[k];
        w[r] = mark;
      }
      for (var i = 0; i < rows; i++) {
        if (j === 0) {
          cdata[i] = [];
        }
        if (w[i] === mark) {
          cdata[i][j] = inverse ? cf(b, x[i]) : cf(x[i], b);
        } else {
          cdata[i][j] = b;
        }
      }
    }
    return new DenseMatrix2({
      data: cdata,
      size: [rows, columns],
      datatype: dt
    });
  };
});

// ../../../../../../node_modules/mathjs/lib/esm/function/arithmetic/multiplyScalar.js
var name28 = "multiplyScalar";
var dependencies29 = ["typed"];
var createMultiplyScalar = /* @__PURE__ */ factory(name28, dependencies29, (_ref) => {
  var {
    typed: typed3
  } = _ref;
  return typed3("multiplyScalar", {
    "number, number": multiplyNumber,
    "Complex, Complex": function Complex_Complex(x, y) {
      return x.mul(y);
    },
    "BigNumber, BigNumber": function BigNumber_BigNumber(x, y) {
      return x.times(y);
    },
    "bigint, bigint": function bigint_bigint(x, y) {
      return x * y;
    },
    "Fraction, Fraction": function Fraction_Fraction(x, y) {
      return x.mul(y);
    },
    "number | Fraction | BigNumber | Complex, Unit": (x, y) => y.multiply(x),
    "Unit, number | Fraction | BigNumber | Complex | Unit": (x, y) => x.multiply(y)
  });
});

// ../../../../../../node_modules/mathjs/lib/esm/function/arithmetic/multiply.js
var name29 = "multiply";
var dependencies30 = ["typed", "matrix", "addScalar", "multiplyScalar", "equalScalar", "dot"];
var createMultiply = /* @__PURE__ */ factory(name29, dependencies30, (_ref) => {
  var {
    typed: typed3,
    matrix: matrix2,
    addScalar: addScalar2,
    multiplyScalar: multiplyScalar2,
    equalScalar: equalScalar2,
    dot: dot2
  } = _ref;
  var matAlgo11xS0s = createMatAlgo11xS0s({
    typed: typed3,
    equalScalar: equalScalar2
  });
  var matAlgo14xDs = createMatAlgo14xDs({
    typed: typed3
  });
  function _validateMatrixDimensions(size1, size2) {
    switch (size1.length) {
      case 1:
        switch (size2.length) {
          case 1:
            if (size1[0] !== size2[0]) {
              throw new RangeError("Dimension mismatch in multiplication. Vectors must have the same length");
            }
            break;
          case 2:
            if (size1[0] !== size2[0]) {
              throw new RangeError("Dimension mismatch in multiplication. Vector length (" + size1[0] + ") must match Matrix rows (" + size2[0] + ")");
            }
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + size2.length + " dimensions)");
        }
        break;
      case 2:
        switch (size2.length) {
          case 1:
            if (size1[1] !== size2[0]) {
              throw new RangeError("Dimension mismatch in multiplication. Matrix columns (" + size1[1] + ") must match Vector length (" + size2[0] + ")");
            }
            break;
          case 2:
            if (size1[1] !== size2[0]) {
              throw new RangeError("Dimension mismatch in multiplication. Matrix A columns (" + size1[1] + ") must match Matrix B rows (" + size2[0] + ")");
            }
            break;
          default:
            throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix B has " + size2.length + " dimensions)");
        }
        break;
      default:
        throw new Error("Can only multiply a 1 or 2 dimensional matrix (Matrix A has " + size1.length + " dimensions)");
    }
  }
  function _multiplyVectorVector(a, b, n) {
    if (n === 0) {
      throw new Error("Cannot multiply two empty vectors");
    }
    return dot2(a, b);
  }
  function _multiplyVectorMatrix(a, b) {
    if (b.storage() !== "dense") {
      throw new Error("Support for SparseMatrix not implemented");
    }
    return _multiplyVectorDenseMatrix(a, b);
  }
  function _multiplyVectorDenseMatrix(a, b) {
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype || a.getDataType();
    var bdata = b._data;
    var bsize = b._size;
    var bdt = b._datatype || b.getDataType();
    var alength = asize[0];
    var bcolumns = bsize[1];
    var dt;
    var af = addScalar2;
    var mf = multiplyScalar2;
    if (adt && bdt && adt === bdt && typeof adt === "string" && adt !== "mixed") {
      dt = adt;
      af = typed3.find(addScalar2, [dt, dt]);
      mf = typed3.find(multiplyScalar2, [dt, dt]);
    }
    var c = [];
    for (var j = 0; j < bcolumns; j++) {
      var sum3 = mf(adata[0], bdata[0][j]);
      for (var i = 1; i < alength; i++) {
        sum3 = af(sum3, mf(adata[i], bdata[i][j]));
      }
      c[j] = sum3;
    }
    return a.createDenseMatrix({
      data: c,
      size: [bcolumns],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : void 0
    });
  }
  var _multiplyMatrixVector = typed3("_multiplyMatrixVector", {
    "DenseMatrix, any": _multiplyDenseMatrixVector,
    "SparseMatrix, any": _multiplySparseMatrixVector
  });
  var _multiplyMatrixMatrix = typed3("_multiplyMatrixMatrix", {
    "DenseMatrix, DenseMatrix": _multiplyDenseMatrixDenseMatrix,
    "DenseMatrix, SparseMatrix": _multiplyDenseMatrixSparseMatrix,
    "SparseMatrix, DenseMatrix": _multiplySparseMatrixDenseMatrix,
    "SparseMatrix, SparseMatrix": _multiplySparseMatrixSparseMatrix
  });
  function _multiplyDenseMatrixVector(a, b) {
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype || a.getDataType();
    var bdata = b._data;
    var bdt = b._datatype || b.getDataType();
    var arows = asize[0];
    var acolumns = asize[1];
    var dt;
    var af = addScalar2;
    var mf = multiplyScalar2;
    if (adt && bdt && adt === bdt && typeof adt === "string" && adt !== "mixed") {
      dt = adt;
      af = typed3.find(addScalar2, [dt, dt]);
      mf = typed3.find(multiplyScalar2, [dt, dt]);
    }
    var c = [];
    for (var i = 0; i < arows; i++) {
      var row = adata[i];
      var sum3 = mf(row[0], bdata[0]);
      for (var j = 1; j < acolumns; j++) {
        sum3 = af(sum3, mf(row[j], bdata[j]));
      }
      c[i] = sum3;
    }
    return a.createDenseMatrix({
      data: c,
      size: [arows],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : void 0
    });
  }
  function _multiplyDenseMatrixDenseMatrix(a, b) {
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype || a.getDataType();
    var bdata = b._data;
    var bsize = b._size;
    var bdt = b._datatype || b.getDataType();
    var arows = asize[0];
    var acolumns = asize[1];
    var bcolumns = bsize[1];
    var dt;
    var af = addScalar2;
    var mf = multiplyScalar2;
    if (adt && bdt && adt === bdt && typeof adt === "string" && adt !== "mixed" && adt !== "mixed") {
      dt = adt;
      af = typed3.find(addScalar2, [dt, dt]);
      mf = typed3.find(multiplyScalar2, [dt, dt]);
    }
    var c = [];
    for (var i = 0; i < arows; i++) {
      var row = adata[i];
      c[i] = [];
      for (var j = 0; j < bcolumns; j++) {
        var sum3 = mf(row[0], bdata[0][j]);
        for (var x = 1; x < acolumns; x++) {
          sum3 = af(sum3, mf(row[x], bdata[x][j]));
        }
        c[i][j] = sum3;
      }
    }
    return a.createDenseMatrix({
      data: c,
      size: [arows, bcolumns],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : void 0
    });
  }
  function _multiplyDenseMatrixSparseMatrix(a, b) {
    var adata = a._data;
    var asize = a._size;
    var adt = a._datatype || a.getDataType();
    var bvalues = b._values;
    var bindex = b._index;
    var bptr = b._ptr;
    var bsize = b._size;
    var bdt = b._datatype || b._data === void 0 ? b._datatype : b.getDataType();
    if (!bvalues) {
      throw new Error("Cannot multiply Dense Matrix times Pattern only Matrix");
    }
    var arows = asize[0];
    var bcolumns = bsize[1];
    var dt;
    var af = addScalar2;
    var mf = multiplyScalar2;
    var eq = equalScalar2;
    var zero3 = 0;
    if (adt && bdt && adt === bdt && typeof adt === "string" && adt !== "mixed") {
      dt = adt;
      af = typed3.find(addScalar2, [dt, dt]);
      mf = typed3.find(multiplyScalar2, [dt, dt]);
      eq = typed3.find(equalScalar2, [dt, dt]);
      zero3 = typed3.convert(0, dt);
    }
    var cvalues = [];
    var cindex = [];
    var cptr = [];
    var c = b.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [arows, bcolumns],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : void 0
    });
    for (var jb = 0; jb < bcolumns; jb++) {
      cptr[jb] = cindex.length;
      var kb0 = bptr[jb];
      var kb1 = bptr[jb + 1];
      if (kb1 > kb0) {
        var last = 0;
        for (var i = 0; i < arows; i++) {
          var mark = i + 1;
          var cij = void 0;
          for (var kb = kb0; kb < kb1; kb++) {
            var ib = bindex[kb];
            if (last !== mark) {
              cij = mf(adata[i][ib], bvalues[kb]);
              last = mark;
            } else {
              cij = af(cij, mf(adata[i][ib], bvalues[kb]));
            }
          }
          if (last === mark && !eq(cij, zero3)) {
            cindex.push(i);
            cvalues.push(cij);
          }
        }
      }
    }
    cptr[bcolumns] = cindex.length;
    return c;
  }
  function _multiplySparseMatrixVector(a, b) {
    var avalues = a._values;
    var aindex = a._index;
    var aptr = a._ptr;
    var adt = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    if (!avalues) {
      throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    }
    var bdata = b._data;
    var bdt = b._datatype || b.getDataType();
    var arows = a._size[0];
    var brows = b._size[0];
    var cvalues = [];
    var cindex = [];
    var cptr = [];
    var dt;
    var af = addScalar2;
    var mf = multiplyScalar2;
    var eq = equalScalar2;
    var zero3 = 0;
    if (adt && bdt && adt === bdt && typeof adt === "string" && adt !== "mixed") {
      dt = adt;
      af = typed3.find(addScalar2, [dt, dt]);
      mf = typed3.find(multiplyScalar2, [dt, dt]);
      eq = typed3.find(equalScalar2, [dt, dt]);
      zero3 = typed3.convert(0, dt);
    }
    var x = [];
    var w = [];
    cptr[0] = 0;
    for (var ib = 0; ib < brows; ib++) {
      var vbi = bdata[ib];
      if (!eq(vbi, zero3)) {
        for (var ka0 = aptr[ib], ka1 = aptr[ib + 1], ka = ka0; ka < ka1; ka++) {
          var ia = aindex[ka];
          if (!w[ia]) {
            w[ia] = true;
            cindex.push(ia);
            x[ia] = mf(vbi, avalues[ka]);
          } else {
            x[ia] = af(x[ia], mf(vbi, avalues[ka]));
          }
        }
      }
    }
    for (var p1 = cindex.length, p = 0; p < p1; p++) {
      var ic = cindex[p];
      cvalues[p] = x[ic];
    }
    cptr[1] = cindex.length;
    return a.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [arows, 1],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : void 0
    });
  }
  function _multiplySparseMatrixDenseMatrix(a, b) {
    var avalues = a._values;
    var aindex = a._index;
    var aptr = a._ptr;
    var adt = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    if (!avalues) {
      throw new Error("Cannot multiply Pattern only Matrix times Dense Matrix");
    }
    var bdata = b._data;
    var bdt = b._datatype || b.getDataType();
    var arows = a._size[0];
    var brows = b._size[0];
    var bcolumns = b._size[1];
    var dt;
    var af = addScalar2;
    var mf = multiplyScalar2;
    var eq = equalScalar2;
    var zero3 = 0;
    if (adt && bdt && adt === bdt && typeof adt === "string" && adt !== "mixed") {
      dt = adt;
      af = typed3.find(addScalar2, [dt, dt]);
      mf = typed3.find(multiplyScalar2, [dt, dt]);
      eq = typed3.find(equalScalar2, [dt, dt]);
      zero3 = typed3.convert(0, dt);
    }
    var cvalues = [];
    var cindex = [];
    var cptr = [];
    var c = a.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [arows, bcolumns],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : void 0
    });
    var x = [];
    var w = [];
    for (var jb = 0; jb < bcolumns; jb++) {
      cptr[jb] = cindex.length;
      var mark = jb + 1;
      for (var ib = 0; ib < brows; ib++) {
        var vbij = bdata[ib][jb];
        if (!eq(vbij, zero3)) {
          for (var ka0 = aptr[ib], ka1 = aptr[ib + 1], ka = ka0; ka < ka1; ka++) {
            var ia = aindex[ka];
            if (w[ia] !== mark) {
              w[ia] = mark;
              cindex.push(ia);
              x[ia] = mf(vbij, avalues[ka]);
            } else {
              x[ia] = af(x[ia], mf(vbij, avalues[ka]));
            }
          }
        }
      }
      for (var p0 = cptr[jb], p1 = cindex.length, p = p0; p < p1; p++) {
        var ic = cindex[p];
        cvalues[p] = x[ic];
      }
    }
    cptr[bcolumns] = cindex.length;
    return c;
  }
  function _multiplySparseMatrixSparseMatrix(a, b) {
    var avalues = a._values;
    var aindex = a._index;
    var aptr = a._ptr;
    var adt = a._datatype || a._data === void 0 ? a._datatype : a.getDataType();
    var bvalues = b._values;
    var bindex = b._index;
    var bptr = b._ptr;
    var bdt = b._datatype || b._data === void 0 ? b._datatype : b.getDataType();
    var arows = a._size[0];
    var bcolumns = b._size[1];
    var values = avalues && bvalues;
    var dt;
    var af = addScalar2;
    var mf = multiplyScalar2;
    if (adt && bdt && adt === bdt && typeof adt === "string" && adt !== "mixed") {
      dt = adt;
      af = typed3.find(addScalar2, [dt, dt]);
      mf = typed3.find(multiplyScalar2, [dt, dt]);
    }
    var cvalues = values ? [] : void 0;
    var cindex = [];
    var cptr = [];
    var c = a.createSparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [arows, bcolumns],
      datatype: adt === a._datatype && bdt === b._datatype ? dt : void 0
    });
    var x = values ? [] : void 0;
    var w = [];
    var ka, ka0, ka1, kb, kb0, kb1, ia, ib;
    for (var jb = 0; jb < bcolumns; jb++) {
      cptr[jb] = cindex.length;
      var mark = jb + 1;
      for (kb0 = bptr[jb], kb1 = bptr[jb + 1], kb = kb0; kb < kb1; kb++) {
        ib = bindex[kb];
        if (values) {
          for (ka0 = aptr[ib], ka1 = aptr[ib + 1], ka = ka0; ka < ka1; ka++) {
            ia = aindex[ka];
            if (w[ia] !== mark) {
              w[ia] = mark;
              cindex.push(ia);
              x[ia] = mf(bvalues[kb], avalues[ka]);
            } else {
              x[ia] = af(x[ia], mf(bvalues[kb], avalues[ka]));
            }
          }
        } else {
          for (ka0 = aptr[ib], ka1 = aptr[ib + 1], ka = ka0; ka < ka1; ka++) {
            ia = aindex[ka];
            if (w[ia] !== mark) {
              w[ia] = mark;
              cindex.push(ia);
            }
          }
        }
      }
      if (values) {
        for (var p0 = cptr[jb], p1 = cindex.length, p = p0; p < p1; p++) {
          var ic = cindex[p];
          cvalues[p] = x[ic];
        }
      }
    }
    cptr[bcolumns] = cindex.length;
    return c;
  }
  return typed3(name29, multiplyScalar2, {
    // we extend the signatures of multiplyScalar with signatures dealing with matrices
    "Array, Array": typed3.referTo("Matrix, Matrix", (selfMM) => (x, y) => {
      _validateMatrixDimensions(arraySize(x), arraySize(y));
      var m = selfMM(matrix2(x), matrix2(y));
      return isMatrix(m) ? m.valueOf() : m;
    }),
    "Matrix, Matrix": function Matrix_Matrix(x, y) {
      var xsize = x.size();
      var ysize = y.size();
      _validateMatrixDimensions(xsize, ysize);
      if (xsize.length === 1) {
        if (ysize.length === 1) {
          return _multiplyVectorVector(x, y, xsize[0]);
        }
        return _multiplyVectorMatrix(x, y);
      }
      if (ysize.length === 1) {
        return _multiplyMatrixVector(x, y);
      }
      return _multiplyMatrixMatrix(x, y);
    },
    "Matrix, Array": typed3.referTo("Matrix,Matrix", (selfMM) => (x, y) => selfMM(x, matrix2(y))),
    "Array, Matrix": typed3.referToSelf((self2) => (x, y) => {
      return self2(matrix2(x, y.storage()), y);
    }),
    "SparseMatrix, any": function SparseMatrix_any(x, y) {
      return matAlgo11xS0s(x, y, multiplyScalar2, false);
    },
    "DenseMatrix, any": function DenseMatrix_any(x, y) {
      return matAlgo14xDs(x, y, multiplyScalar2, false);
    },
    "any, SparseMatrix": function any_SparseMatrix(x, y) {
      return matAlgo11xS0s(y, x, multiplyScalar2, true);
    },
    "any, DenseMatrix": function any_DenseMatrix(x, y) {
      return matAlgo14xDs(y, x, multiplyScalar2, true);
    },
    "Array, any": function Array_any(x, y) {
      return matAlgo14xDs(matrix2(x), y, multiplyScalar2, false).valueOf();
    },
    "any, Array": function any_Array(x, y) {
      return matAlgo14xDs(matrix2(y), x, multiplyScalar2, true).valueOf();
    },
    "any, any": multiplyScalar2,
    "any, any, ...any": typed3.referToSelf((self2) => (x, y, rest) => {
      var result = self2(x, y);
      for (var i = 0; i < rest.length; i++) {
        result = self2(result, rest[i]);
      }
      return result;
    })
  });
});

// ../../../../../../node_modules/mathjs/lib/esm/function/arithmetic/subtract.js
var name30 = "subtract";
var dependencies31 = ["typed", "matrix", "equalScalar", "subtractScalar", "unaryMinus", "DenseMatrix", "concat"];
var createSubtract = /* @__PURE__ */ factory(name30, dependencies31, (_ref) => {
  var {
    typed: typed3,
    matrix: matrix2,
    equalScalar: equalScalar2,
    subtractScalar: subtractScalar2,
    unaryMinus: unaryMinus2,
    DenseMatrix: DenseMatrix2,
    concat: concat3
  } = _ref;
  var matAlgo01xDSid = createMatAlgo01xDSid({
    typed: typed3
  });
  var matAlgo03xDSf = createMatAlgo03xDSf({
    typed: typed3
  });
  var matAlgo05xSfSf = createMatAlgo05xSfSf({
    typed: typed3,
    equalScalar: equalScalar2
  });
  var matAlgo10xSids = createMatAlgo10xSids({
    typed: typed3,
    DenseMatrix: DenseMatrix2
  });
  var matAlgo12xSfs = createMatAlgo12xSfs({
    typed: typed3,
    DenseMatrix: DenseMatrix2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed3,
    matrix: matrix2,
    concat: concat3
  });
  return typed3(name30, {
    "any, any": subtractScalar2
  }, matrixAlgorithmSuite({
    elop: subtractScalar2,
    SS: matAlgo05xSfSf,
    DS: matAlgo01xDSid,
    SD: matAlgo03xDSf,
    Ss: matAlgo12xSfs,
    sS: matAlgo10xSids
  }));
});

// ../../../../../../node_modules/mathjs/lib/esm/function/complex/conj.js
var name31 = "conj";
var dependencies32 = ["typed"];
var createConj = /* @__PURE__ */ factory(name31, dependencies32, (_ref) => {
  var {
    typed: typed3
  } = _ref;
  return typed3(name31, {
    "number | BigNumber | Fraction": (x) => x,
    Complex: (x) => x.conjugate(),
    Unit: typed3.referToSelf((self2) => (x) => new x.constructor(self2(x.toNumeric()), x.formatUnits())),
    "Array | Matrix": typed3.referToSelf((self2) => (x) => deepMap2(x, self2))
  });
});

// ../../../../../../node_modules/mathjs/lib/esm/function/matrix/concat.js
var name32 = "concat";
var dependencies33 = ["typed", "matrix", "isInteger"];
var createConcat = /* @__PURE__ */ factory(name32, dependencies33, (_ref) => {
  var {
    typed: typed3,
    matrix: matrix2,
    isInteger: isInteger3
  } = _ref;
  return typed3(name32, {
    // TODO: change signature to '...Array | Matrix, dim?' when supported
    "...Array | Matrix | number | BigNumber": function Array__Matrix__number__BigNumber(args) {
      var i;
      var len = args.length;
      var dim = -1;
      var prevDim;
      var asMatrix = false;
      var matrices = [];
      for (i = 0; i < len; i++) {
        var arg = args[i];
        if (isMatrix(arg)) {
          asMatrix = true;
        }
        if (isNumber(arg) || isBigNumber(arg)) {
          if (i !== len - 1) {
            throw new Error("Dimension must be specified as last argument");
          }
          prevDim = dim;
          dim = arg.valueOf();
          if (!isInteger3(dim)) {
            throw new TypeError("Integer number expected for dimension");
          }
          if (dim < 0 || i > 0 && dim > prevDim) {
            throw new IndexError(dim, prevDim + 1);
          }
        } else {
          var m = clone(arg).valueOf();
          var size2 = arraySize(m);
          matrices[i] = m;
          prevDim = dim;
          dim = size2.length - 1;
          if (i > 0 && dim !== prevDim) {
            throw new DimensionError(prevDim + 1, dim + 1);
          }
        }
      }
      if (matrices.length === 0) {
        throw new SyntaxError("At least one matrix expected");
      }
      var res = matrices.shift();
      while (matrices.length) {
        res = concat(res, matrices.shift(), dim);
      }
      return asMatrix ? matrix2(res) : res;
    },
    "...string": function string(args) {
      return args.join("");
    }
  });
});

// ../../../../../../node_modules/mathjs/lib/esm/function/matrix/diag.js
var name33 = "diag";
var dependencies34 = ["typed", "matrix", "DenseMatrix", "SparseMatrix"];
var createDiag = /* @__PURE__ */ factory(name33, dependencies34, (_ref) => {
  var {
    typed: typed3,
    matrix: matrix2,
    DenseMatrix: DenseMatrix2,
    SparseMatrix: SparseMatrix2
  } = _ref;
  return typed3(name33, {
    // FIXME: simplify this huge amount of signatures as soon as typed-function supports optional arguments
    Array: function Array2(x) {
      return _diag(x, 0, arraySize(x), null);
    },
    "Array, number": function Array_number(x, k) {
      return _diag(x, k, arraySize(x), null);
    },
    "Array, BigNumber": function Array_BigNumber(x, k) {
      return _diag(x, k.toNumber(), arraySize(x), null);
    },
    "Array, string": function Array_string(x, format5) {
      return _diag(x, 0, arraySize(x), format5);
    },
    "Array, number, string": function Array_number_string(x, k, format5) {
      return _diag(x, k, arraySize(x), format5);
    },
    "Array, BigNumber, string": function Array_BigNumber_string(x, k, format5) {
      return _diag(x, k.toNumber(), arraySize(x), format5);
    },
    Matrix: function Matrix2(x) {
      return _diag(x, 0, x.size(), x.storage());
    },
    "Matrix, number": function Matrix_number(x, k) {
      return _diag(x, k, x.size(), x.storage());
    },
    "Matrix, BigNumber": function Matrix_BigNumber(x, k) {
      return _diag(x, k.toNumber(), x.size(), x.storage());
    },
    "Matrix, string": function Matrix_string(x, format5) {
      return _diag(x, 0, x.size(), format5);
    },
    "Matrix, number, string": function Matrix_number_string(x, k, format5) {
      return _diag(x, k, x.size(), format5);
    },
    "Matrix, BigNumber, string": function Matrix_BigNumber_string(x, k, format5) {
      return _diag(x, k.toNumber(), x.size(), format5);
    }
  });
  function _diag(x, k, size2, format5) {
    if (!isInteger(k)) {
      throw new TypeError("Second parameter in function diag must be an integer");
    }
    var kSuper = k > 0 ? k : 0;
    var kSub = k < 0 ? -k : 0;
    switch (size2.length) {
      case 1:
        return _createDiagonalMatrix(x, k, format5, size2[0], kSub, kSuper);
      case 2:
        return _getDiagonal(x, k, format5, size2, kSub, kSuper);
    }
    throw new RangeError("Matrix for function diag must be 2 dimensional");
  }
  function _createDiagonalMatrix(x, k, format5, l, kSub, kSuper) {
    var ms = [l + kSub, l + kSuper];
    if (format5 && format5 !== "sparse" && format5 !== "dense") {
      throw new TypeError("Unknown matrix type ".concat(format5, '"'));
    }
    var m = format5 === "sparse" ? SparseMatrix2.diagonal(ms, x, k) : DenseMatrix2.diagonal(ms, x, k);
    return format5 !== null ? m : m.valueOf();
  }
  function _getDiagonal(x, k, format5, s, kSub, kSuper) {
    if (isMatrix(x)) {
      var dm = x.diagonal(k);
      if (format5 !== null) {
        if (format5 !== dm.storage()) {
          return matrix2(dm, format5);
        }
        return dm;
      }
      return dm.valueOf();
    }
    var n = Math.min(s[0] - kSub, s[1] - kSuper);
    var vector = [];
    for (var i = 0; i < n; i++) {
      vector[i] = x[i + kSub][i + kSuper];
    }
    return format5 !== null ? matrix2(vector) : vector;
  }
});

// ../../../../../../node_modules/mathjs/lib/esm/function/matrix/identity.js
var name34 = "identity";
var dependencies35 = ["typed", "config", "matrix", "BigNumber", "DenseMatrix", "SparseMatrix"];
var createIdentity = /* @__PURE__ */ factory(name34, dependencies35, (_ref) => {
  var {
    typed: typed3,
    config: config4,
    matrix: matrix2,
    BigNumber: BigNumber2,
    DenseMatrix: DenseMatrix2,
    SparseMatrix: SparseMatrix2
  } = _ref;
  return typed3(name34, {
    "": function _() {
      return config4.matrix === "Matrix" ? matrix2([]) : [];
    },
    string: function string(format5) {
      return matrix2(format5);
    },
    "number | BigNumber": function number__BigNumber(rows) {
      return _identity(rows, rows, config4.matrix === "Matrix" ? "dense" : void 0);
    },
    "number | BigNumber, string": function number__BigNumber_string(rows, format5) {
      return _identity(rows, rows, format5);
    },
    "number | BigNumber, number | BigNumber": function number__BigNumber_number__BigNumber(rows, cols) {
      return _identity(rows, cols, config4.matrix === "Matrix" ? "dense" : void 0);
    },
    "number | BigNumber, number | BigNumber, string": function number__BigNumber_number__BigNumber_string(rows, cols, format5) {
      return _identity(rows, cols, format5);
    },
    Array: function Array2(size2) {
      return _identityVector(size2);
    },
    "Array, string": function Array_string(size2, format5) {
      return _identityVector(size2, format5);
    },
    Matrix: function Matrix2(size2) {
      return _identityVector(size2.valueOf(), size2.storage());
    },
    "Matrix, string": function Matrix_string(size2, format5) {
      return _identityVector(size2.valueOf(), format5);
    }
  });
  function _identityVector(size2, format5) {
    switch (size2.length) {
      case 0:
        return format5 ? matrix2(format5) : [];
      case 1:
        return _identity(size2[0], size2[0], format5);
      case 2:
        return _identity(size2[0], size2[1], format5);
      default:
        throw new Error("Vector containing two values expected");
    }
  }
  function _identity(rows, cols, format5) {
    var Big = isBigNumber(rows) || isBigNumber(cols) ? BigNumber2 : null;
    if (isBigNumber(rows)) rows = rows.toNumber();
    if (isBigNumber(cols)) cols = cols.toNumber();
    if (!isInteger(rows) || rows < 1) {
      throw new Error("Parameters in function identity must be positive integers");
    }
    if (!isInteger(cols) || cols < 1) {
      throw new Error("Parameters in function identity must be positive integers");
    }
    var one2 = Big ? new BigNumber2(1) : 1;
    var defaultValue = Big ? new Big(0) : 0;
    var size2 = [rows, cols];
    if (format5) {
      if (format5 === "sparse") {
        return SparseMatrix2.diagonal(size2, one2, 0, defaultValue);
      }
      if (format5 === "dense") {
        return DenseMatrix2.diagonal(size2, one2, 0, defaultValue);
      }
      throw new TypeError('Unknown matrix type "'.concat(format5, '"'));
    }
    var res = resize([], size2, defaultValue);
    var minimum = rows < cols ? rows : cols;
    for (var d = 0; d < minimum; d++) {
      res[d][d] = one2;
    }
    return res;
  }
});

// ../../../../../../node_modules/mathjs/lib/esm/utils/noop.js
function noBignumber() {
  throw new Error('No "bignumber" implementation available');
}
function noFraction() {
  throw new Error('No "fraction" implementation available');
}
function noMatrix() {
  throw new Error('No "matrix" implementation available');
}

// ../../../../../../node_modules/mathjs/lib/esm/function/matrix/size.js
var name35 = "size";
var dependencies36 = ["typed", "config", "?matrix"];
var createSize = /* @__PURE__ */ factory(name35, dependencies36, (_ref) => {
  var {
    typed: typed3,
    config: config4,
    matrix: matrix2
  } = _ref;
  return typed3(name35, {
    Matrix: function Matrix2(x) {
      return x.create(x.size(), "number");
    },
    Array: arraySize,
    string: function string(x) {
      return config4.matrix === "Array" ? [x.length] : matrix2([x.length], "dense", "number");
    },
    "number | Complex | BigNumber | Unit | boolean | null": function number__Complex__BigNumber__Unit__boolean__null(x) {
      return config4.matrix === "Array" ? [] : matrix2 ? matrix2([], "dense", "number") : noMatrix();
    }
  });
});

// ../../../../../../node_modules/mathjs/lib/esm/function/matrix/zeros.js
var name36 = "zeros";
var dependencies37 = ["typed", "config", "matrix", "BigNumber"];
var createZeros = /* @__PURE__ */ factory(name36, dependencies37, (_ref) => {
  var {
    typed: typed3,
    config: config4,
    matrix: matrix2,
    BigNumber: BigNumber2
  } = _ref;
  return typed3(name36, {
    "": function _() {
      return config4.matrix === "Array" ? _zeros([]) : _zeros([], "default");
    },
    // math.zeros(m, n, p, ..., format)
    // TODO: more accurate signature '...number | BigNumber, string' as soon as typed-function supports this
    "...number | BigNumber | string": function number__BigNumber__string(size2) {
      var last = size2[size2.length - 1];
      if (typeof last === "string") {
        var format5 = size2.pop();
        return _zeros(size2, format5);
      } else if (config4.matrix === "Array") {
        return _zeros(size2);
      } else {
        return _zeros(size2, "default");
      }
    },
    Array: _zeros,
    Matrix: function Matrix2(size2) {
      var format5 = size2.storage();
      return _zeros(size2.valueOf(), format5);
    },
    "Array | Matrix, string": function Array__Matrix_string(size2, format5) {
      return _zeros(size2.valueOf(), format5);
    }
  });
  function _zeros(size2, format5) {
    var hasBigNumbers = _normalize(size2);
    var defaultValue = hasBigNumbers ? new BigNumber2(0) : 0;
    _validate2(size2);
    if (format5) {
      var m = matrix2(format5);
      if (size2.length > 0) {
        return m.resize(size2, defaultValue);
      }
      return m;
    } else {
      var arr = [];
      if (size2.length > 0) {
        return resize(arr, size2, defaultValue);
      }
      return arr;
    }
  }
  function _normalize(size2) {
    var hasBigNumbers = false;
    size2.forEach(function(value, index, arr) {
      if (isBigNumber(value)) {
        hasBigNumbers = true;
        arr[index] = value.toNumber();
      }
    });
    return hasBigNumbers;
  }
  function _validate2(size2) {
    size2.forEach(function(value) {
      if (typeof value !== "number" || !isInteger(value) || value < 0) {
        throw new Error("Parameters in function zeros must be positive integers");
      }
    });
  }
});

// ../../../../../../node_modules/mathjs/lib/esm/function/utils/numeric.js
var name37 = "numeric";
var dependencies38 = ["number", "?bignumber", "?fraction"];
var createNumeric = /* @__PURE__ */ factory(name37, dependencies38, (_ref) => {
  var {
    number: _number,
    bignumber: bignumber2,
    fraction: fraction2
  } = _ref;
  var validInputTypes = {
    string: true,
    number: true,
    BigNumber: true,
    Fraction: true
  };
  var validOutputTypes = {
    number: (x) => _number(x),
    BigNumber: bignumber2 ? (x) => bignumber2(x) : noBignumber,
    bigint: (x) => BigInt(x),
    Fraction: fraction2 ? (x) => fraction2(x) : noFraction
  };
  return function numeric2(value) {
    var outputType = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "number";
    var check = arguments.length > 2 ? arguments[2] : void 0;
    if (check !== void 0) {
      throw new SyntaxError("numeric() takes one or two arguments");
    }
    var inputType = typeOf(value);
    if (!(inputType in validInputTypes)) {
      throw new TypeError("Cannot convert " + value + ' of type "' + inputType + '"; valid input types are ' + Object.keys(validInputTypes).join(", "));
    }
    if (!(outputType in validOutputTypes)) {
      throw new TypeError("Cannot convert " + value + ' to type "' + outputType + '"; valid output types are ' + Object.keys(validOutputTypes).join(", "));
    }
    if (outputType === inputType) {
      return value;
    } else {
      return validOutputTypes[outputType](value);
    }
  };
});

// ../../../../../../node_modules/mathjs/lib/esm/function/arithmetic/divideScalar.js
var name38 = "divideScalar";
var dependencies39 = ["typed", "numeric"];
var createDivideScalar = /* @__PURE__ */ factory(name38, dependencies39, (_ref) => {
  var {
    typed: typed3,
    numeric: numeric2
  } = _ref;
  return typed3(name38, {
    "number, number": function number_number(x, y) {
      return x / y;
    },
    "Complex, Complex": function Complex_Complex(x, y) {
      return x.div(y);
    },
    "BigNumber, BigNumber": function BigNumber_BigNumber(x, y) {
      return x.div(y);
    },
    "bigint, bigint": function bigint_bigint(x, y) {
      return x / y;
    },
    "Fraction, Fraction": function Fraction_Fraction(x, y) {
      return x.div(y);
    },
    "Unit, number | Complex | Fraction | BigNumber | Unit": (x, y) => x.divide(y),
    "number | Fraction | Complex | BigNumber, Unit": (x, y) => y.divideInto(x)
  });
});

// ../../../../../../node_modules/mathjs/lib/esm/function/arithmetic/add.js
var name39 = "add";
var dependencies40 = ["typed", "matrix", "addScalar", "equalScalar", "DenseMatrix", "SparseMatrix", "concat"];
var createAdd = /* @__PURE__ */ factory(name39, dependencies40, (_ref) => {
  var {
    typed: typed3,
    matrix: matrix2,
    addScalar: addScalar2,
    equalScalar: equalScalar2,
    DenseMatrix: DenseMatrix2,
    SparseMatrix: SparseMatrix2,
    concat: concat3
  } = _ref;
  var matAlgo01xDSid = createMatAlgo01xDSid({
    typed: typed3
  });
  var matAlgo04xSidSid = createMatAlgo04xSidSid({
    typed: typed3,
    equalScalar: equalScalar2
  });
  var matAlgo10xSids = createMatAlgo10xSids({
    typed: typed3,
    DenseMatrix: DenseMatrix2
  });
  var matrixAlgorithmSuite = createMatrixAlgorithmSuite({
    typed: typed3,
    matrix: matrix2,
    concat: concat3
  });
  return typed3(name39, {
    "any, any": addScalar2,
    "any, any, ...any": typed3.referToSelf((self2) => (x, y, rest) => {
      var result = self2(x, y);
      for (var i = 0; i < rest.length; i++) {
        result = self2(result, rest[i]);
      }
      return result;
    })
  }, matrixAlgorithmSuite({
    elop: addScalar2,
    DS: matAlgo01xDSid,
    SS: matAlgo04xSidSid,
    Ss: matAlgo10xSids
  }));
});

// ../../../../../../node_modules/mathjs/lib/esm/function/matrix/dot.js
var name40 = "dot";
var dependencies41 = ["typed", "addScalar", "multiplyScalar", "conj", "size"];
var createDot = /* @__PURE__ */ factory(name40, dependencies41, (_ref) => {
  var {
    typed: typed3,
    addScalar: addScalar2,
    multiplyScalar: multiplyScalar2,
    conj: conj2,
    size: size2
  } = _ref;
  return typed3(name40, {
    "Array | DenseMatrix, Array | DenseMatrix": _denseDot,
    "SparseMatrix, SparseMatrix": _sparseDot
  });
  function _validateDim(x, y) {
    var xSize = _size(x);
    var ySize = _size(y);
    var xLen, yLen;
    if (xSize.length === 1) {
      xLen = xSize[0];
    } else if (xSize.length === 2 && xSize[1] === 1) {
      xLen = xSize[0];
    } else {
      throw new RangeError("Expected a column vector, instead got a matrix of size (" + xSize.join(", ") + ")");
    }
    if (ySize.length === 1) {
      yLen = ySize[0];
    } else if (ySize.length === 2 && ySize[1] === 1) {
      yLen = ySize[0];
    } else {
      throw new RangeError("Expected a column vector, instead got a matrix of size (" + ySize.join(", ") + ")");
    }
    if (xLen !== yLen) throw new RangeError("Vectors must have equal length (" + xLen + " != " + yLen + ")");
    if (xLen === 0) throw new RangeError("Cannot calculate the dot product of empty vectors");
    return xLen;
  }
  function _denseDot(a, b) {
    var N = _validateDim(a, b);
    var adata = isMatrix(a) ? a._data : a;
    var adt = isMatrix(a) ? a._datatype || a.getDataType() : void 0;
    var bdata = isMatrix(b) ? b._data : b;
    var bdt = isMatrix(b) ? b._datatype || b.getDataType() : void 0;
    var aIsColumn = _size(a).length === 2;
    var bIsColumn = _size(b).length === 2;
    var add3 = addScalar2;
    var mul2 = multiplyScalar2;
    if (adt && bdt && adt === bdt && typeof adt === "string" && adt !== "mixed") {
      var dt = adt;
      add3 = typed3.find(addScalar2, [dt, dt]);
      mul2 = typed3.find(multiplyScalar2, [dt, dt]);
    }
    if (!aIsColumn && !bIsColumn) {
      var c = mul2(conj2(adata[0]), bdata[0]);
      for (var i = 1; i < N; i++) {
        c = add3(c, mul2(conj2(adata[i]), bdata[i]));
      }
      return c;
    }
    if (!aIsColumn && bIsColumn) {
      var _c = mul2(conj2(adata[0]), bdata[0][0]);
      for (var _i = 1; _i < N; _i++) {
        _c = add3(_c, mul2(conj2(adata[_i]), bdata[_i][0]));
      }
      return _c;
    }
    if (aIsColumn && !bIsColumn) {
      var _c2 = mul2(conj2(adata[0][0]), bdata[0]);
      for (var _i2 = 1; _i2 < N; _i2++) {
        _c2 = add3(_c2, mul2(conj2(adata[_i2][0]), bdata[_i2]));
      }
      return _c2;
    }
    if (aIsColumn && bIsColumn) {
      var _c3 = mul2(conj2(adata[0][0]), bdata[0][0]);
      for (var _i3 = 1; _i3 < N; _i3++) {
        _c3 = add3(_c3, mul2(conj2(adata[_i3][0]), bdata[_i3][0]));
      }
      return _c3;
    }
  }
  function _sparseDot(x, y) {
    _validateDim(x, y);
    var xindex = x._index;
    var xvalues = x._values;
    var yindex = y._index;
    var yvalues = y._values;
    var c = 0;
    var add3 = addScalar2;
    var mul2 = multiplyScalar2;
    var i = 0;
    var j = 0;
    while (i < xindex.length && j < yindex.length) {
      var I = xindex[i];
      var J = yindex[j];
      if (I < J) {
        i++;
        continue;
      }
      if (I > J) {
        j++;
        continue;
      }
      if (I === J) {
        c = add3(c, mul2(xvalues[i], yvalues[j]));
        i++;
        j++;
      }
    }
    return c;
  }
  function _size(x) {
    return isMatrix(x) ? x.size() : size2(x);
  }
});

// ../../../../../../node_modules/mathjs/lib/esm/function/matrix/det.js
var name41 = "det";
var dependencies42 = ["typed", "matrix", "subtractScalar", "multiply", "divideScalar", "isZero", "unaryMinus"];
var createDet = /* @__PURE__ */ factory(name41, dependencies42, (_ref) => {
  var {
    typed: typed3,
    matrix: matrix2,
    subtractScalar: subtractScalar2,
    multiply: multiply2,
    divideScalar: divideScalar2,
    isZero: isZero2,
    unaryMinus: unaryMinus2
  } = _ref;
  return typed3(name41, {
    any: function any(x) {
      return clone(x);
    },
    "Array | Matrix": function det2(x) {
      var size2;
      if (isMatrix(x)) {
        size2 = x.size();
      } else if (Array.isArray(x)) {
        x = matrix2(x);
        size2 = x.size();
      } else {
        size2 = [];
      }
      switch (size2.length) {
        case 0:
          return clone(x);
        case 1:
          if (size2[0] === 1) {
            return clone(x.valueOf()[0]);
          }
          if (size2[0] === 0) {
            return 1;
          } else {
            throw new RangeError("Matrix must be square (size: " + format4(size2) + ")");
          }
        case 2: {
          var rows = size2[0];
          var cols = size2[1];
          if (rows === cols) {
            return _det(x.clone().valueOf(), rows, cols);
          }
          if (cols === 0) {
            return 1;
          } else {
            throw new RangeError("Matrix must be square (size: " + format4(size2) + ")");
          }
        }
        default:
          throw new RangeError("Matrix must be two dimensional (size: " + format4(size2) + ")");
      }
    }
  });
  function _det(matrix3, rows, cols) {
    if (rows === 1) {
      return clone(matrix3[0][0]);
    } else if (rows === 2) {
      return subtractScalar2(multiply2(matrix3[0][0], matrix3[1][1]), multiply2(matrix3[1][0], matrix3[0][1]));
    } else {
      var negated = false;
      var rowIndices = new Array(rows).fill(0).map((_, i2) => i2);
      for (var k = 0; k < rows; k++) {
        var k_ = rowIndices[k];
        if (isZero2(matrix3[k_][k])) {
          var _k = void 0;
          for (_k = k + 1; _k < rows; _k++) {
            if (!isZero2(matrix3[rowIndices[_k]][k])) {
              k_ = rowIndices[_k];
              rowIndices[_k] = rowIndices[k];
              rowIndices[k] = k_;
              negated = !negated;
              break;
            }
          }
          if (_k === rows) return matrix3[k_][k];
        }
        var piv = matrix3[k_][k];
        var piv_ = k === 0 ? 1 : matrix3[rowIndices[k - 1]][k - 1];
        for (var i = k + 1; i < rows; i++) {
          var i_ = rowIndices[i];
          for (var j = k + 1; j < rows; j++) {
            matrix3[i_][j] = divideScalar2(subtractScalar2(multiply2(matrix3[i_][j], piv), multiply2(matrix3[i_][k], matrix3[k_][j])), piv_);
          }
        }
      }
      var det2 = matrix3[rowIndices[rows - 1]][rows - 1];
      return negated ? unaryMinus2(det2) : det2;
    }
  }
});

// ../../../../../../node_modules/mathjs/lib/esm/function/matrix/inv.js
var name42 = "inv";
var dependencies43 = ["typed", "matrix", "divideScalar", "addScalar", "multiply", "unaryMinus", "det", "identity", "abs"];
var createInv = /* @__PURE__ */ factory(name42, dependencies43, (_ref) => {
  var {
    typed: typed3,
    matrix: matrix2,
    divideScalar: divideScalar2,
    addScalar: addScalar2,
    multiply: multiply2,
    unaryMinus: unaryMinus2,
    det: det2,
    identity: identity5,
    abs: abs4
  } = _ref;
  return typed3(name42, {
    "Array | Matrix": function Array__Matrix(x) {
      var size2 = isMatrix(x) ? x.size() : arraySize(x);
      switch (size2.length) {
        case 1:
          if (size2[0] === 1) {
            if (isMatrix(x)) {
              return matrix2([divideScalar2(1, x.valueOf()[0])]);
            } else {
              return [divideScalar2(1, x[0])];
            }
          } else {
            throw new RangeError("Matrix must be square (size: " + format4(size2) + ")");
          }
        case 2: {
          var rows = size2[0];
          var cols = size2[1];
          if (rows === cols) {
            if (isMatrix(x)) {
              return matrix2(_inv(x.valueOf(), rows, cols), x.storage());
            } else {
              return _inv(x, rows, cols);
            }
          } else {
            throw new RangeError("Matrix must be square (size: " + format4(size2) + ")");
          }
        }
        default:
          throw new RangeError("Matrix must be two dimensional (size: " + format4(size2) + ")");
      }
    },
    any: function any(x) {
      return divideScalar2(1, x);
    }
  });
  function _inv(mat, rows, cols) {
    var r, s, f, value, temp;
    if (rows === 1) {
      value = mat[0][0];
      if (value === 0) {
        throw Error("Cannot calculate inverse, determinant is zero");
      }
      return [[divideScalar2(1, value)]];
    } else if (rows === 2) {
      var d = det2(mat);
      if (d === 0) {
        throw Error("Cannot calculate inverse, determinant is zero");
      }
      return [[divideScalar2(mat[1][1], d), divideScalar2(unaryMinus2(mat[0][1]), d)], [divideScalar2(unaryMinus2(mat[1][0]), d), divideScalar2(mat[0][0], d)]];
    } else {
      var A = mat.concat();
      for (r = 0; r < rows; r++) {
        A[r] = A[r].concat();
      }
      var B = identity5(rows).valueOf();
      for (var c = 0; c < cols; c++) {
        var ABig = abs4(A[c][c]);
        var rBig = c;
        r = c + 1;
        while (r < rows) {
          if (abs4(A[r][c]) > ABig) {
            ABig = abs4(A[r][c]);
            rBig = r;
          }
          r++;
        }
        if (ABig === 0) {
          throw Error("Cannot calculate inverse, determinant is zero");
        }
        r = rBig;
        if (r !== c) {
          temp = A[c];
          A[c] = A[r];
          A[r] = temp;
          temp = B[c];
          B[c] = B[r];
          B[r] = temp;
        }
        var Ac = A[c];
        var Bc = B[c];
        for (r = 0; r < rows; r++) {
          var Ar = A[r];
          var Br = B[r];
          if (r !== c) {
            if (Ar[c] !== 0) {
              f = divideScalar2(unaryMinus2(Ar[c]), Ac[c]);
              for (s = c; s < cols; s++) {
                Ar[s] = addScalar2(Ar[s], multiply2(f, Ac[s]));
              }
              for (s = 0; s < cols; s++) {
                Br[s] = addScalar2(Br[s], multiply2(f, Bc[s]));
              }
            }
          } else {
            f = Ac[c];
            for (s = c; s < cols; s++) {
              Ar[s] = divideScalar2(Ar[s], f);
            }
            for (s = 0; s < cols; s++) {
              Br[s] = divideScalar2(Br[s], f);
            }
          }
        }
      }
      return B;
    }
  }
});

// ../../../../../../node_modules/mathjs/lib/esm/entry/pureFunctionsAny.generated.js
var BigNumber = /* @__PURE__ */ createBigNumberClass({
  config
});
var Complex2 = /* @__PURE__ */ createComplexClass({});
var Fraction2 = /* @__PURE__ */ createFractionClass({});
var Matrix = /* @__PURE__ */ createMatrixClass({});
var DenseMatrix = /* @__PURE__ */ createDenseMatrixClass({
  Matrix
});
var typed2 = /* @__PURE__ */ createTyped({
  BigNumber,
  Complex: Complex2,
  DenseMatrix,
  Fraction: Fraction2
});
var abs3 = /* @__PURE__ */ createAbs({
  typed: typed2
});
var addScalar = /* @__PURE__ */ createAddScalar({
  typed: typed2
});
var conj = /* @__PURE__ */ createConj({
  typed: typed2
});
var equalScalar = /* @__PURE__ */ createEqualScalar({
  config,
  typed: typed2
});
var isInteger2 = /* @__PURE__ */ createIsInteger({
  typed: typed2
});
var isZero = /* @__PURE__ */ createIsZero({
  equalScalar,
  typed: typed2
});
var multiplyScalar = /* @__PURE__ */ createMultiplyScalar({
  typed: typed2
});
var number4 = /* @__PURE__ */ createNumber({
  typed: typed2
});
var SparseMatrix = /* @__PURE__ */ createSparseMatrixClass({
  Matrix,
  equalScalar,
  typed: typed2
});
var subtractScalar = /* @__PURE__ */ createSubtractScalar({
  typed: typed2
});
var bignumber = /* @__PURE__ */ createBignumber({
  BigNumber,
  typed: typed2
});
var matrix = /* @__PURE__ */ createMatrix({
  DenseMatrix,
  Matrix,
  SparseMatrix,
  typed: typed2
});
var zeros2 = /* @__PURE__ */ createZeros({
  BigNumber,
  config,
  matrix,
  typed: typed2
});
var concat2 = /* @__PURE__ */ createConcat({
  isInteger: isInteger2,
  matrix,
  typed: typed2
});
var diag = /* @__PURE__ */ createDiag({
  DenseMatrix,
  SparseMatrix,
  matrix,
  typed: typed2
});
var fraction = /* @__PURE__ */ createFraction({
  Fraction: Fraction2,
  typed: typed2
});
var identity4 = /* @__PURE__ */ createIdentity({
  BigNumber,
  DenseMatrix,
  SparseMatrix,
  config,
  matrix,
  typed: typed2
});
var numeric = /* @__PURE__ */ createNumeric({
  bignumber,
  fraction,
  number: number4
});
var size = /* @__PURE__ */ createSize({
  matrix,
  config,
  typed: typed2
});
var unaryMinus = /* @__PURE__ */ createUnaryMinus({
  typed: typed2
});
var add2 = /* @__PURE__ */ createAdd({
  DenseMatrix,
  SparseMatrix,
  addScalar,
  concat: concat2,
  equalScalar,
  matrix,
  typed: typed2
});
var divideScalar = /* @__PURE__ */ createDivideScalar({
  numeric,
  typed: typed2
});
var subtract = /* @__PURE__ */ createSubtract({
  DenseMatrix,
  concat: concat2,
  equalScalar,
  matrix,
  subtractScalar,
  typed: typed2,
  unaryMinus
});
var dot = /* @__PURE__ */ createDot({
  addScalar,
  conj,
  multiplyScalar,
  size,
  typed: typed2
});
var multiply = /* @__PURE__ */ createMultiply({
  addScalar,
  dot,
  equalScalar,
  matrix,
  multiplyScalar,
  typed: typed2
});
var det = /* @__PURE__ */ createDet({
  divideScalar,
  isZero,
  matrix,
  multiply,
  subtractScalar,
  typed: typed2,
  unaryMinus
});
var inv = /* @__PURE__ */ createInv({
  abs: abs3,
  addScalar,
  det,
  divideScalar,
  identity: identity4,
  matrix,
  multiply,
  typed: typed2,
  unaryMinus
});

// ../../../distortions-js/lib/inter_isometry.js
function isometry_update(ev, g, dataset, metrics, mappingObj, xScale, yScale, rScale, colorScale, opts, margin) {
  let f_star = [xScale.invert(ev.layerX - margin.left), yScale.invert(ev.layerY - margin.top)];
  let { h_star, kn } = local_metric(metrics, f_star, dataset, opts.metric_bw);
  let kn_t = local_metric(metrics, f_star, dataset, opts.transformation_bw)["kn"];
  kn_t = kn_t.map((k) => k / max(kn_t));
  let h_star_ = inv(square_root_reorient(h_star));
  let h_star_inv = inv(h_star);
  let new_coords = [];
  let N = Object.values(dataset).length;
  for (let n = 0; n < N; n++) {
    let f_n = matrix([dataset[n][mappingObj.x], dataset[n][mappingObj.y]]);
    let f_tilde_n = add2(multiply(h_star_, subtract(f_n, f_star)), f_star);
    let f_n_transform = add2(multiply(kn_t[n], f_tilde_n), multiply(1 - kn_t[n], f_n));
    let h_product = multiply(h_star_inv, matrix(metrics[n]));
    let { q, v } = (0, import_svd_js.SVD)(h_product._data);
    let sv_transform = [
      kn_t[n] * q[0] + (1 - kn_t[n]) * dataset[n]["s0"],
      kn_t[n] * q[1] + (1 - kn_t[n]) * dataset[n]["s1"]
    ];
    let v_transform = [
      kn_t[n] * v[0][0] + (1 - kn_t[n]) * dataset[n]["x0"],
      kn_t[n] * v[0][1] + (1 - kn_t[n]) * dataset[n]["y0"]
    ];
    new_coords.push({
      [mappingObj.x]: f_n_transform._data[0],
      [mappingObj.y]: f_n_transform._data[1],
      "s0": sv_transform[0],
      "s1": sv_transform[1],
      "x0": v_transform[0],
      "y0": v_transform[1],
      "new_angle": angle(v_transform[0], v_transform[1]),
      "kernel_transform": kn_t[n],
      "kernel_metric": kn[n] / max(kn),
      "color": dataset[n][mappingObj.color],
      "_id": dataset[n]["_id"]
    });
  }
  for (let c in opts.otherClasses) {
    g.select(`.${opts.otherClasses[c]}`).selectAll("*").data(new_coords, (d) => d._id).attr("cx", (d) => xScale(d[mappingObj.x])).attr("cy", (d) => yScale(d[mappingObj.y])).attr("rx", (d) => rScale(d[mappingObj.a])).attr("ry", (d) => rScale(d[mappingObj.b])).attr("transform", (d) => `rotate(${d["new_angle"]} ${xScale(d[mappingObj.x])} ${yScale(d[mappingObj.y])})`);
    if (mappingObj.color !== null) {
      g.select(`.${opts.otherClasses[c]}`).selectAll("*").attr("fill", (d) => colorScale(d[mappingObj.color] ?? d["color"]));
    }
  }
  g.select(".isometry-links").selectAll("line").data(new_coords, (d) => d._id).attr("x1", (d) => xScale(d[mappingObj.x])).attr("y1", (d) => yScale(d[mappingObj.y]));
  return new_coords;
}
function similarities(f_star, dataset, gamma2) {
  let result = [];
  for (let n = 0; n < Object.values(dataset).length; n++) {
    let f_n = [dataset[n].embedding_0, dataset[n].embedding_1];
    result.push(similarity(f_star, f_n, gamma2));
  }
  let total = sum(result);
  return result.map((d) => d / total);
}
function local_metric(metrics, f_star, dataset, gamma2) {
  let N = Object.values(metrics).length;
  let h0 = matrix(metrics[0]);
  let h_star = zeros2(size(h0));
  let kn = similarities(f_star, dataset, gamma2);
  for (let n = 0; n < N; n++) {
    h_star = add2(h_star, multiply(kn[n], matrix(metrics[n])));
  }
  let { q } = (0, import_svd_js.SVD)(h_star._data);
  return { "h_star": h_star, "sv": q, "kn": kn };
}
function square_root_reorient(A) {
  let svd_result = (0, import_svd_js.SVD)(A._data);
  let { v, q } = reorient(svd_result);
  return multiply(matrix(v), diag(q.map((qk) => Math.sqrt(qk))));
}
function reorient(svd_result) {
  let v = matrix(svd_result["v"]);
  let q = svd_result["q"];
  if (Math.abs(v._data[0][0]) < Math.abs(v._data[0][1])) {
    let P4 = matrix([[0, 1], [1, 0]]);
    v = multiply(v, P4);
    q = [q[1], q[0]];
  }
  if (det(v) < 0) {
    v = multiply(v, diag([1, -1]));
  }
  if (v._data[0][0] < 0) {
    v = multiply(v, diag([-1, -1]));
  }
  return { "v": v, "q": q };
}
function similarity(a, b, gamma2 = 1) {
  let d = Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
  let result = Math.exp(-gamma2 * d);
  if (isNaN(result)) {
    return 0;
  }
  return result;
}
function angle(x1, y1) {
  return Math.atan(y1 / x1) * (180 / Math.PI) + 90;
}

// ../../../distortions-js/lib/layering.js
var DistortionPlot = class {
  // default dimensions
  constructor(el, options) {
    const defaults = { width: 700, height: 350, margin: { top: 40, right: 90, bottom: 60, left: 90 }, labelFontSize: 14 };
    const opts = { ...defaults, ...options };
    let svg = create_default("svg").attr("width", opts.width).attr("height", opts.height);
    el.appendChild(svg.node());
    this.svg = select_default2(el).select("svg");
    this.width = +this.svg.attr("width");
    this.height = +this.svg.attr("height");
    this.margin = opts.margin;
    this.plotWidth = this.width - this.margin.left - this.margin.right;
    this.plotHeight = this.height - this.margin.top - this.margin.bottom;
    this.labelFontSize = opts.labelFontSize;
    this.g = this.svg.append("g").attr("transform", `translate(${this.margin.left},${this.margin.top})`);
    this.xScale = linear2().range([0, this.plotWidth]);
    this.yScale = linear2().range([this.plotHeight, 0]);
    this.rScale = linear2();
    this.colorScale = ordinal(category10_default);
    this.dataset = null;
    this.corrected = null;
    this.layers = [];
    this.title = "";
    this.xLabel = "";
    this.yLabel = "";
  }
  // Set the base data for the plot
  data(dataset) {
    this.dataset = dataset;
    if (Object.keys(dataset[0]).indexOf("_id") == -1) {
      for (let i = 0; i < dataset.length; i++) {
        dataset[i]._id = i;
      }
    }
    return this;
  }
  // Map data columns to x and y scales
  mapping(m) {
    this.mappingObj = m;
    if (this.dataset && this.mappingObj) {
      this.xScale.domain(extent(this.dataset, (d) => +d[this.mappingObj.x])).nice();
      this.yScale.domain(extent(this.dataset, (d) => +d[this.mappingObj.y])).nice();
      let radius_data = this.dataset.map((d) => [+d[this.mappingObj.a], +d[this.mappingObj.b]]);
      this.rScale.domain(extent([].concat.apply([], radius_data))).nice();
      if (["kernel_transform", "kernel_metric"].includes(this.mappingObj.color)) {
        this.colorScale = linear2().domain([0, 1]).range(["white", "black"]);
      } else if (typeof this.dataset[0][this.mappingObj.color] === "string") {
        const uniqueValues = [...new Set(this.dataset.map((d) => d[this.mappingObj.color]))];
        this.colorScale.domain(uniqueValues);
      } else {
        const rangeValues = extent(this.dataset.map((d) => d[this.mappingObj.color]));
        this.colorScale = linear2().domain(rangeValues);
      }
    }
    return this;
  }
  // Add points/scatter layer
  geomEllipse(options = {}) {
    const defaults = {
      radiusMax: 25,
      radiusMin: 3,
      color: null,
      opacity: 1,
      className: "ellipse"
    };
    const opts = { ...defaults, ...options };
    this.layers.push({
      type: "ellipse",
      options: opts,
      render: () => {
        this.rScale.range([opts.radiusMin, opts.radiusMax]);
        this.g.append("g").attr("class", opts.className).selectAll("ellipse").data(this.dataset, (d) => d._id).enter().append("ellipse").attr("cx", (d) => this.xScale(d[this.mappingObj.x])).attr("cy", (d) => this.yScale(d[this.mappingObj.y])).attr("rx", (d) => this.rScale(d[this.mappingObj.a])).attr("ry", (d) => this.rScale(d[this.mappingObj.b])).attr("transform", (d) => `rotate(${d[this.mappingObj.angle]} ${this.xScale(d[this.mappingObj.x])} ${this.yScale(d[this.mappingObj.y])})`).attr("fill", (d) => this.mappingObj.color ? this.colorScale(d[this.mappingObj.color]) : opts.color || "#0c0c0c").attr("opacity", opts.opacity);
      }
    });
    return this;
  }
  // Add hair (line) layer, mirroring geomEllipse behavior
  geomHair(options = {}) {
    const defaults = {
      className: "hair",
      color: null,
      radiusMax: 25,
      radiusMin: 0.1,
      opacity: 1,
      strokeWidth: 1
    };
    const opts = { ...defaults, ...options };
    this.layers.push({
      type: "hair",
      options: opts,
      render: () => {
        this.rScale.range([opts.radiusMin, opts.radiusMax]);
        if (this.mappingObj.color) {
          const uniqueValues = [...new Set(this.dataset.map((d) => d[opts.color]))];
          this.colorScale.domain(uniqueValues);
        }
        this.g.append("g").attr("class", opts.className).selectAll("rect").data(this.dataset).enter().append("rect").attr("class", opts.className).attr("x", (d) => {
          const cx = this.xScale(+d[this.mappingObj.x]);
          const r = this.rScale(+d[this.mappingObj.a]);
          return cx - r;
        }).attr("y", (d) => {
          const cy = this.yScale(+d[this.mappingObj.y]);
          return cy - opts.strokeWidth / 2;
        }).attr("width", (d) => {
          const r = this.rScale(+d[this.mappingObj.a]);
          return 2 * r;
        }).attr("height", opts.strokeWidth).attr("transform", (d) => {
          const cx = this.xScale(+d[this.mappingObj.x]);
          const cy = this.yScale(+d[this.mappingObj.y]);
          return `rotate(${+d[this.mappingObj.angle]} ${cx} ${cy})`;
        }).attr("fill", (d) => this.mappingObj.color ? this.colorScale(d[this.mappingObj.color]) : opts.color || "#0c0c0c").attr("opacity", opts.opacity);
      }
    });
    return this;
  }
  // Add scale_color for changing color mapping
  scaleColor(options = {}) {
    const defaults = {
      scheme: category10_default,
      className: null,
      padding: 20,
      x_offset: 20,
      y_offset: 0,
      size: 14,
      legendTextSize: 14,
      titleOffset: 15,
      labelOffset: 20
    };
    const opts = { ...defaults, ...options };
    this.layers.push({
      type: "scale_color",
      options: opts,
      render: () => {
        if (["kernel_transform", "kernel_metric"].includes(this.mappingObj.color)) {
          this.colorScale = linear2().domain([0, 1]).range(["white", "black"]);
        } else if (typeof this.dataset[0][this.mappingObj.color] === "string") {
          const uniqueValues = [...new Set(this.dataset.map((d) => d[this.mappingObj.color]))];
          this.colorScale = ordinal(uniqueValues, opts.scheme);
        } else {
          const rangeValues = extent(this.dataset.map((d) => d[this.mappingObj.color]));
          this.colorScale = linear2(rangeValues, [opts.scheme[0], opts.scheme[1]]);
        }
        let className = opts.className || this.layers[0].options.className;
        this.svg.select(`.${className}`).selectAll("*").attr("fill", (d) => this.colorScale(d[this.mappingObj.color]));
        this.svg.select(`.${className}-background`).selectAll("*").attr("fill", (d) => this.colorScale(d[this.mappingObj.color]));
        const legend = d3col.legendColor().shapePadding(opts.padding).shapeHeight(opts.size).shapeWidth(opts.size).title(this.mappingObj.color).scale(this.colorScale);
        this.g.append("g").attr("class", "legend").attr("id", "colorScale").attr("transform", `translate(${this.plotWidth + opts.x_offset}, ${opts.y_offset})`).call(legend);
        this.g.selectAll("#colorScale .label").attr("font-size", opts.legendTextSize).attr("transform", `translate(${opts.labelOffset}, ${0.75 * opts.size})`);
        this.g.select("#colorScale .legendTitle").attr("transform", `translate(0, -${opts.titleOffset})`).attr("font-size", opts.legendTextSize);
      }
    });
    return this;
  }
  scaleSize(options = {}) {
    const defaults = {
      nCells: 4,
      shapePadding: 20,
      labelOffset: 20,
      yOffset: 100,
      legendTextSize: 14,
      xOffset: 20,
      titleOffset: 20,
      symbolColor: "#a8a8a8"
    };
    const opts = { ...defaults, ...options };
    this.layers.push({
      type: "scale_size",
      options: opts,
      render: () => {
        const legend = d3col.legendSize().scale(this.rScale).shape("circle").shapePadding(opts.shapePadding).labelOffset(opts.labelOffset).orient("vertical").title("\u03BB(H\u2099)").cells(opts.nCells);
        this.g.append("g").attr("class", "legend").attr("id", "sizeScale").attr("transform", `translate(${this.plotWidth + opts.xOffset}, ${opts.yOffset})`).call(legend);
        this.g.selectAll("#sizeScale .legendCells circle").attr("fill", opts.symbolColor);
        this.g.selectAll("#sizeScale .label").attr("font-size", opts.legendTextSize);
        this.g.select("#sizeScale .legendTitle").attr("transform", `translate(0, -${opts.titleOffset})`).attr("font-size", opts.legendTextSize);
      }
    });
  }
  // Add labels (title, x-axis, y-axis)
  labs(options = {}) {
    this.layers.push(
      annotation(this.svg, options, this.width, this.height, this.margin)
    );
    return this;
  }
  geomEdgeLink(options = {}) {
    const defaults = {
      "stroke-width": 1,
      "stroke": "#363E59",
      "opacity": 1,
      className: "edge_link"
    };
    const opts = { ...defaults, ...options };
    let N = options.N;
    let link_data = flatten_edges(N, this.dataset, this.mappingObj);
    this.layers.push({
      type: "edge_link",
      options: opts,
      render: () => {
        this.g.select(`.${opts.className}`).selectAll("line").data(link_data, (d) => d._id).enter().insert("line").attr("class", opts.className).attr("x1", (d) => this.xScale(d.x1)).attr("y1", (d) => this.yScale(d.y1)).attr("x2", (d) => this.xScale(d.x2)).attr("y2", (d) => this.yScale(d.y2)).attr("stroke-width", opts["stroke-width"]).attr("stroke", opts.stroke).attr("opacity", opts.opacity);
      }
    });
  }
  interEdgeLink(options = {}) {
    const defaults = {
      strokeWidth: 1,
      backgroundOpacity: 0.2,
      className: "inter_edge_link",
      opacity: 1,
      otherClasses: ["ellipse"],
      stroke: "#363E59",
      highlightColor: "#363E59",
      highlightStrokeWidth: 1.5,
      threshold: 1
    };
    const opts = { ...defaults, ...options };
    let N = options.N;
    this.layers.push({
      type: "inter_edge_link",
      options: opts,
      render: () => {
        this.g.insert("g").attr("class", opts.className);
        for (let c in opts.otherClasses) {
          this.g.select(`.${opts.otherClasses[c]}`).selectAll("ellipse").attr("stroke", (d) => Object.keys(N).indexOf(d._id.toString()) == -1 ? "white" : opts.highlightColor).attr("stroke-width", (d) => Object.keys(N).indexOf(d._id.toString()) == -1 ? 0 : opts.highlightStrokeWidth);
        }
        let freeze = false;
        this.svg.on("mousemove", (ev) => {
          if (!freeze) {
            link_update(
              ev,
              this.g,
              N,
              this.dataset,
              this.mappingObj,
              this.xScale,
              this.yScale,
              opts,
              this.margin
            );
          }
        });
        this.svg.on("dblclick", () => {
          freeze = !freeze;
        });
      }
    });
  }
  interIsometry(options = {}) {
    const defaults = {
      backgroundOpacity: 0.2,
      className: "inter_isometry",
      magnify: 1,
      metric_bw: 10,
      stroke: "#a5a5a5",
      strokeWidth: 1.5,
      otherClasses: ["ellipse"],
      transformation_bw: 2
    };
    const opts = { ...defaults, ...options };
    this.layers.push({
      type: "inter_isometry",
      options: opts,
      render: (model) => {
        let metrics = options.metrics;
        this.g.append("g").lower().attr("class", "isometry-links").selectAll("line").data(this.dataset, (d) => d._id).enter().append("line").attr("x1", (d) => this.xScale(d[this.mappingObj.x])).attr("y1", (d) => this.yScale(d[this.mappingObj.y])).attr("x2", (d) => this.xScale(d[this.mappingObj.x])).attr("y2", (d) => this.yScale(d[this.mappingObj.y])).attr("stroke", opts.stroke).attr("stroke-width", opts.strokeWidth);
        for (let c in opts.otherClasses) {
          this.g.select(`.${opts.otherClasses[c]}`).clone(true).lower().attr("opacity", opts.backgroundOpacity).attr("class", `${opts.otherClasses[c]}-background`).selectAll("*").data(this.dataset);
        }
        let freeze = false;
        this.svg.on("mousemove", (ev) => {
          if (!freeze) {
            let corrected = isometry_update(
              ev,
              this.g,
              this.dataset,
              metrics,
              this.mappingObj,
              this.xScale,
              this.yScale,
              this.rScale,
              this.colorScale,
              opts,
              this.margin
            );
            if (model && corrected) {
              model.set("corrected", corrected);
              model.save_changes();
            }
          }
        });
        this.svg.on("dblclick", () => {
          freeze = !freeze;
        });
      }
    });
  }
  interBoxplot(distance_summaries, outliers, options = {}) {
    const defaults = {
      backgroundOpacity: 0.2,
      className: "inter_boxplot",
      fill: "#bcbcbc",
      highlightColor: "#363E59",
      highlightStrokeWidth: 1.5,
      legendOffset: 60,
      opacity: 1,
      otherClasses: ["ellipse"],
      outlierRadius: 2,
      relHeight: 0.3,
      relPanelMargin: 0.05,
      relWidth: 0.75,
      stroke: "#262626",
      strokeWidth: 1
    };
    const opts = { ...defaults, ...options };
    let y_vals = outliers.map((d) => d.value).concat(distance_summaries.map((d) => d.q1)).concat(distance_summaries.map((d) => d.q3));
    this.xScale.range([0, this.plotWidth * (opts.relWidth - opts.relPanelMargin)]);
    this.xBoxScale = band().domain([...new Set(distance_summaries.map((d) => d.bin))]).range([opts.relWidth * this.plotWidth, this.plotWidth]);
    this.yBoxScale = linear2().domain([0, max(y_vals)]).range([opts.relHeight * this.plotHeight, 0]);
    this.layers.push({
      type: "inter_isometry",
      options: opts,
      render: () => {
        this.g.select(".legend").attr("transform", `translate(${opts.relWidth * this.plotWidth}, ${opts.relHeight * this.plotHeight + opts.legendOffset})`);
        this.opts = opts;
        draw_boxplot(this, distance_summaries, outliers);
      }
    });
  }
  // Render all layers of the plot
  render(model) {
    const xAxis = axisBottom(this.xScale);
    const yAxis = axisLeft(this.yScale);
    this.g.append("g").attr("class", "x-axis").attr("transform", `translate(0, ${this.plotHeight})`).call(xAxis.tickFormat("").tickSize(0)).selectAll(".tick text").attr("font-size", this.labelFontSize);
    this.g.append("g").attr("class", "y-axis").call(yAxis.tickFormat("").tickSize(0)).selectAll(".tick text").attr("font-size", this.labelFontSize);
    this.layers.forEach((l) => l.render(model));
    return this;
  }
};

// render.js
import * as d3 from "https://esm.sh/d3@7";
function sort_priority(str) {
  if (str.includes("geom")) return 1;
  if (str.includes("scale")) return 2;
  if (str.includes("inter")) return 3;
  return 2;
}
function layer_order(a, b) {
  const A = sort_priority(a.type);
  const B = sort_priority(b.type);
  if (A != B) {
    return A - B;
  }
  return 0;
}
function render({ model, el }) {
  let plot = new DistortionPlot(el, model.get("options")).data(model.get("dataset")).mapping(model.get("_mapping"));
  let layers = model.get("layers");
  if (Object.keys(plot.mappingObj).some((m) => m === "color") && !layers.some((l) => l.type === "scale_color")) {
    layers.push({ type: "scale_color", options: {} });
  }
  layers.sort(layer_order);
  layers.forEach((l) => callLayer(plot, l, model));
  plot.render(model);
  model.on("msg:custom", (msg) => {
    if (msg.type === "save") {
      let elem = d3.select(el).select("svg");
      let svgStr = new XMLSerializer().serializeToString(elem.node());
      model.set("elem_svg", svgStr);
      model.save_changes();
    }
  });
}
function callLayer(plot, layer, model) {
  switch (layer.type) {
    case "geom_ellipse":
      plot.geomEllipse(layer.options);
      break;
    case "geom_hair":
      plot.geomHair(layer.options);
      break;
    case "geom_edge_link":
      plot.geomEdgeLink(layer.options);
      break;
    case "inter_edge_link":
      plot.interEdgeLink(layer.options);
      break;
    case "inter_isometry":
      plot.interIsometry(layer.options);
      break;
    case "inter_boxplot":
      plot.interBoxplot(
        model.get("distance_summaries"),
        model.get("outliers"),
        layer.options
      );
      break;
    case "scale_color":
      plot.scaleColor(layer.options);
      break;
    case "scale_size":
      plot.scaleSize(layer.options);
      break;
    case "labs":
      plot.labs(layer.options);
      break;
  }
}
var render_default = { render };
export {
  render_default as default
};
/*! Bundled license information:

decimal.js/decimal.mjs:
  (*!
   *  decimal.js v10.6.0
   *  An arbitrary-precision Decimal type for JavaScript.
   *  https://github.com/MikeMcl/decimal.js
   *  Copyright (c) 2025 Michael Mclaughlin <M8ch88l@gmail.com>
   *  MIT Licence
   *)
*/
