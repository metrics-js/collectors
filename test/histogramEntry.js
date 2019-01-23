'use strict';

const tap = require('tap');
const Entry = require('../lib/histogram/histogramEntry');

tap.test('HistogramEntry() - object type - should be MetricsHistogramEntry', (t) => {
    const entry = new Entry();
    t.equal(Object.prototype.toString.call(entry), '[object MetricsHistogramEntry]');
    t.end();
});
