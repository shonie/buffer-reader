#!/usr/bin/env node

const { Transform } = require('stream');
const bufferize = require('../');

process.stdin.setEncoding('hex');

process.stdin.pipe(new Transform({
    transform(chunk, encoding, callback) {
        try {
            if (encoding === 'utf8' || encoding === 'buffer' || encoding === 'hex') {
                console.log('cb')
                callback(null,  bufferize(chunk));
            } else {
                throw new Error(`Expected encoding to be \'utf8\', \'hex\' or \'buffer\', got ${encoding}`);
            }
        } catch (err) {
            callback(err);
        }
    }
})).pipe(process.stdout);
