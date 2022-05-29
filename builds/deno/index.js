/// <reference types="./index.d.ts"/>

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var wrapCompilerAsTypeGuard = function (compiler) {
    return function (schema) {
        var compilingOptions = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            compilingOptions[_i - 1] = arguments[_i];
        }
        var validator = compiler.apply(void 0, __spreadArray([schema], compilingOptions, false));
        return function (data) {
            var validationOptions = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                validationOptions[_i - 1] = arguments[_i];
            }
            return validator.apply(void 0, __spreadArray([data], validationOptions, false));
        };
    };
};

var wrapValidatorAsTypeGuard = function (validator) {
    return function (schema, data) {
        var validationOptions = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            validationOptions[_i - 2] = arguments[_i];
        }
        return validator.apply(void 0, __spreadArray([schema, data], validationOptions, false));
    };
};

exports.wrapCompilerAsTypeGuard = wrapCompilerAsTypeGuard;
exports.wrapValidatorAsTypeGuard = wrapValidatorAsTypeGuard;
