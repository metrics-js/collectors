'use strict';

const tap = require('tap');
const utils = require('../lib/utils');

tap.test('utils.labelsToKey() - no arguments - should return empty string', (t) => {
    const result = utils.labelsToKey();
    t.equal(result, '');
    t.end();
});

