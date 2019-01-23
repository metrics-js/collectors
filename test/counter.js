'use strict';

const tap = require('tap');
const { Counter } = require('../lib/main');

tap.test('Counter() - object type - should be MetricsCounter', (t) => {
    const counter = new Counter({ name: 'metric_counter', });
    t.equal(Object.prototype.toString.call(counter), '[object MetricsCounter]');
    t.end();
});
