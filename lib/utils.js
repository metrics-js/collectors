'use strict';

const labelsToKey = (arr = []) => {
    let result = '';
    const l = arr.length;
    for (let i = 0; i < l; i++) {
        result += `${arr[i].name}:${arr[i].value};`;
    }
    return result;
};
module.exports.labelsToKey = labelsToKey;
