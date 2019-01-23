'use strict';

const Entry = class Entry {
    constructor({
        buckets = [],
        labels = [],
        count = 0,
        sum = 0,
    } = {}) {
        this.buckets = new Map(buckets);
        this.labels = labels;
        this.count = count;
        this.sum = sum;
    }

    set(bucket, value) {
        this.count += 1;
        this.sum += value;

        if (bucket === -1) {
            return;
        }

        const val = this.buckets.get(bucket);
        if (val !== undefined) {
            this.buckets.set(bucket, (val + 1));
        }
    }

    toJSON() {
        return {
            buckets: Array.from(this.buckets.entries()),
            labels: this.labels,
            count: this.count,
            sum: this.sum,
        };
    }

    get [Symbol.toStringTag]() {
        return 'MetricsHistogramEntry';
    }
};
module.exports = Entry;
