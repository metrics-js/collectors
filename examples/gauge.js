'use strict';

const { Gauge } = require('../lib/main');

const gauge = new Gauge({
    name: 'foo',
});

gauge.inc();
gauge.inc();
gauge.inc();
gauge.inc([{ name: 'statusCode', value: 404 }]);
gauge.inc([{ name: 'statusCode', value: 404 }]);
gauge.inc([{ name: 'statusCode', value: 404 }, { name: 'method', value: 'GET' }]);
gauge.inc();
gauge.dec();
gauge.dec([{ name: 'statusCode', value: 404 }]);

console.log(JSON.stringify(gauge, null, 2));
