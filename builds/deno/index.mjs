/// <reference types="./index.d.ts"/>

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

export { wrapCompilerAsTypeGuard, wrapValidatorAsTypeGuard };
