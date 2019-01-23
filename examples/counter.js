'use strict';

const { Counter } = require('../lib/main');

const counter = new Counter({
    name: 'foo',
});

counter.inc();
counter.add(10, [{ name: 'statusCode', value: 200 }]);
counter.inc([{ name: 'statusCode', value: 200 }]);
counter.add(10, [{ name: 'method', value: 'GET' }]);

counter.inc([{ name: 'statusCode', value: 404 }, { name: 'method', value: 'GET' }]);
counter.inc([{ name: 'statusCode', value: 404 }, { name: 'method', value: 'GET' }]);
counter.inc([{ name: 'statusCode', value: 404 }, { name: 'method', value: 'GET' }]);
counter.add(10);

console.log(JSON.stringify(counter, null, 2));
