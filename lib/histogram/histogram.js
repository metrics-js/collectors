'use strict';

// https://prometheus.io/docs/concepts/metric_types/
// https://prometheus.io/docs/instrumenting/writing_clientlibs/

// https://godoc.org/github.com/prometheus/client_golang/prometheus#Histogram
// https://github.com/prometheus/client_golang/blob/master/prometheus/histogram.go

const Entry = require('./histogramEntry');
const utils = require('../utils');

const DEFAULT_BOUNDS = [
    0.005,
    0.01,
    0.025,
    0.05,
    0.1,
    0.25,
    0.5,
    1,
    2.5,
    5,
    10
];

const DEFAULT_BUCKETS = DEFAULT_BOUNDS.map((val) => {
    return [val, 0];
});

const Histogram = class Histogram {
    constructor({
        name = '',
        description = '',
        labels = [],
    } = {}) {
        this.name = name;
        this.description = description;
        this.bounds = DEFAULT_BOUNDS;

        this.dict = new Map(labels);
        this.stat = new Entry({
            buckets: DEFAULT_BUCKETS,
        });
    }

    find(value) {
        const l = this.bounds.length;
        for (let i = 0; i < l; i++) {
            if (value <= this.bounds[i]) return this.bounds[i];
        }
        return -1;
    }

    observe(value, labels) {
        if (typeof value !== 'number') {
            throw new Error('Not a number');
        }
        if (value < 0) {
            throw new Error('Can not be negative');
        }

        const bucket = this.find(value);

        if (labels) {
            const key = utils.labelsToKey(labels);
            const preVal = this.dict.get(key);

            if (preVal) {
                preVal.set(bucket, value);
                this.dict.set(key, preVal);
            } else {
                const obj = new Entry({
                    buckets: DEFAULT_BUCKETS,
                    labels,
                });

                obj.set(bucket, value);
                this.dict.set(key, obj);
            }

            return;
        }

        this.stat.set(bucket, value);
    }

    toJSON() {
        return {
            name: this.name,
            description: this.description,
            labels: Array.from(this.dict.entries()),
            buckets: Array.from(this.stat.buckets.entries()),
            count: this.stat.count,
            sum: this.stat.sum,
        };
    }

    get [Symbol.toStringTag]() {
        return 'MetricsHistogram';
    }
};
module.exports = Histogram;
