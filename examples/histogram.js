'use strict';

const { Histogram } = require('../lib/main');

const histogram = new Histogram({
    name: 'foo',
});

histogram.observe(0.2);
histogram.observe(1.5);
histogram.observe(1);
histogram.observe(0.5);
histogram.observe(0.5);
histogram.observe(100);
histogram.observe(0.5, [{ name: 'statusCode', value: 404 }]);
histogram.observe(0.5, [{ name: 'statusCode', value: 404 }]);
histogram.observe(0.5, [{ name: 'statusCode', value: 404 }]);

console.log(JSON.stringify(histogram, null, 2));
