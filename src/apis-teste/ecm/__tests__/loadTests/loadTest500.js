"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
var http_1 = require("k6/http");
var k6_1 = require("k6");
exports.options = {
    vus: 500,
    duration: '1m',
};
function default_1() {
    var res = http_1.get('http://localhost:80');
    (0, k6_1.check)(res, {
        'status_was_200': function (r) { return r.status === 200; },
        'transaction_less_or_3': function (r) { return r.timings.duration <= 3000; },
        'transaction_between_3_and_5': function (r) { return r.timings.duration > 3000 && r.timings.duration <= 5000; },
        'transaction_between_5_and_10': function (r) { return r.timings.duration > 5000 && r.timings.duration <= 10000; },
        'transaction_between_10_and_15': function (r) { return r.timings.duration > 10000 && r.timings.duration <= 15000; },
        'transaction_more_than_15': function (r) { return r.timings.duration > 15000; },
    });
    (0, k6_1.sleep)(1);
}
exports.default = default_1;
