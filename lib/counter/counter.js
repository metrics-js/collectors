'use strict';

// https://prometheus.io/docs/concepts/metric_types/
// https://prometheus.io/docs/instrumenting/writing_clientlibs/

// https://godoc.org/github.com/prometheus/client_golang/prometheus#Counter
// https://github.com/prometheus/client_golang/blob/master/prometheus/counter.go

const utils = require('../utils');

const Counter = class Counter {
    constructor({
        name = '',
        description = '',
        labels = [],
        count = 0,
    } = {}) {
        this.name = name;
        this.description = description;

        this.dict = new Map(labels);
        this.count = count;
    }

    inc(labels) {
        this.add(1, labels);
    }

    add(value, labels) {
        if (typeof value !== 'number') {
            throw new Error('Not a number');
        }
        if (value < 0) {
            throw new Error('Can not be negative');
        }

        if (labels) {
            const key = utils.labelsToKey(labels);
            const preVal = this.dict.get(key);

            if (preVal) {
                preVal.count += value;
                this.dict.set(key, preVal);
            } else {
                this.dict.set(key, {
                    labels,
                    count: value,
                });
            }

            return;
        }

        this.count += value;
    }

    toJSON() {
        return {
            name: this.name,
            description: this.description,
            labels: Array.from(this.dict.entries()),
            count: this.count,
        };
    }

    get [Symbol.toStringTag]() {
        return 'MetricsCounter';
    }
};

module.exports = Counter;
