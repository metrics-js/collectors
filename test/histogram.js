'use strict';

const tap = require('tap');
const { Histogram } = require('../lib/main');

tap.test('Histogram() - object type - should be MetricsHistogram', (t) => {
    const histogram = new Histogram({ name: 'metric_histogram', });
    t.equal(Object.prototype.toString.call(histogram), '[object MetricsHistogram]');
    t.end();
});
