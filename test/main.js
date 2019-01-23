'use strict';

const tap = require('tap');
const { Histogram, Counter, Gauge } = require('../lib/main');

tap.test('Main() - new Histogram() - should construct an Object', (t) => {
    const obj = new Histogram({ name: 'metric_histogram', });
    t.type(obj, 'object');
    t.end();
});

tap.test('Main() - new Counter() - should construct an Object', (t) => {
    const obj = new Counter({ name: 'metric_counter', });
    t.type(obj, 'object');
    t.end();
});

tap.test('Main() - new Gauge() - should construct an Object', (t) => {
    const obj = new Gauge({ name: 'metric_gauge', });
    t.type(obj, 'object');
    t.end();
});
