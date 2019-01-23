'use strict';

// https://prometheus.io/docs/concepts/metric_types/
// https://prometheus.io/docs/instrumenting/writing_clientlibs/

// https://godoc.org/github.com/prometheus/client_golang/prometheus#Gauge
// https://github.com/prometheus/client_golang/blob/master/prometheus/gauge.go

const utils = require('../utils');

const Gauge = class Gauge {
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

    dec(labels) {
        this.add(-1, labels);
    }

    add(value, labels) {
        if (typeof value !== 'number') {
            throw new Error('Not a number');
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

    set(value, labels) {
        if (typeof value !== 'number') {
            throw new Error('Not a number');
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

        this.count = value;
    }

    setToCurrentTime(labels) {
        const now = Date.now() / 1000;
        this.set(now, labels);
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
        return 'MetricsGauge';
    }
};

module.exports = Gauge;
