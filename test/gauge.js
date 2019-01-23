'use strict';

const tap = require('tap');
const { Gauge } = require('../lib/main');

tap.test('Gauge() - object type - should be MetricsGauge', (t) => {
    const gauge = new Gauge({ name: 'metric_gauge', });
    t.equal(Object.prototype.toString.call(gauge), '[object MetricsGauge]');
    t.end();
});
