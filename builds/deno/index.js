/// <reference types="./index.d.ts"/>

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var wrapCompilerAsTypeGuard = function (compiler) {
    return function (schema) {
        var validator = compiler(schema);
        return function (data) { return validator(data); };
    };
};

var wrapValidatorAsTypeGuard = function (validator) {
    return function (schema, data) {
        return validator(schema, data);
    };
};

exports.wrapCompilerAsTypeGuard = wrapCompilerAsTypeGuard;
exports.wrapValidatorAsTypeGuard = wrapValidatorAsTypeGuard;
