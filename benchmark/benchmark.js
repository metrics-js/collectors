'use strict';

/* eslint no-unused-vars: "off", import/no-extraneous-dependencies: "off", no-console: "off" */

const PromCli = require('prom-client');
const benchmark = require('benchmark');

const { Histogram } = require('../');
const { Counter } = require('../');
const { Gauge } = require('../');


const suite = new benchmark.Suite();

const add = (name, fn) => {
    suite.add(name, fn);
};

/**
 * Counter;
 */

const counter = new Counter();

add('self - counter.inc()', () => {
    counter.inc();
    counter.inc();
    // counter.inc([{name: 'statusCode', value: 200}]);
    // counter.inc([{name: 'statusCode', value: 404}, {name: 'method', value: 'GET'}]);
});

const promCounter = new PromCli.Counter({
    name: 'metric_counter',
    help: 'metric_help',
    labelNames: ['method', 'statusCode']
});

add('prom-client - counter.inc()', () => {
    promCounter.inc();
    promCounter.inc();
    // promCounter.inc({statusCode: 200});
    // promCounter.inc({statusCode: 404, method: 'GET'});
});

/**
 * Gauge;
 */

const gauge = new Gauge();

add('self - gauge.inc()', () => {
    gauge.inc();
    gauge.inc();
    // gauge.inc([{name: 'statusCode', value: 200}]);
    // gauge.inc([{name: 'statusCode', value: 404}, {name: 'method', value: 'GET'}]);
    gauge.dec();
});

const promGauge = new PromCli.Gauge({
    name: 'metric_gauge',
    help: 'metric_help',
    labelNames: ['method', 'statusCode']
});

add('prom-client - gauge.inc()', () => {
    promGauge.inc();
    promGauge.inc();
    // promGauge.inc({statusCode: 200});
    // promGauge.inc({statusCode: 404, method: 'GET'});
    promGauge.dec();
});

/**
 * Histogram;
 */

const histogram = new Histogram();

add('self - histogram.observe()', () => {
    histogram.observe(1);
    histogram.observe(0.5);
    histogram.observe(0.25);
    histogram.observe(0.25);
    // histogram.observe(0.5, [{name: 'statusCode', value: 200}]);
    // histogram.observe(0.5, [{name: 'statusCode', value: 404}, {name: 'method', value: 'GET'}]);
});

const promHistogram = new PromCli.Histogram({
    name: 'metric_histogram',
    help: 'metric_help',
    labelNames: ['method', 'statusCode']
});

add('prom-client - histogram.observe()', () => {
    promHistogram.observe(1);
    promHistogram.observe(0.5);
    promHistogram.observe(0.25);
    promHistogram.observe(0.25);
    // promHistogram.observe({statusCode: 200}, 0.5);
    // promHistogram.observe({statusCode: 404, method: 'GET'}, 0.5);
});

suite
    .on('cycle', (ev) => {
        console.log(ev.target.toString());
        if (ev.target.error) {
            console.error(ev.target.error);
        }
    })
    .run();
