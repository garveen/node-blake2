/**
 * This file contains a modified copy of LazyTransform and Hash
 * from io.js/lib/crypto.js
 */

"use strict";

const stream = require('stream');
const binding = require('./build/Release/binding');
const util = require('util');

function LazyTransform(options) {
	stream.Transform.call(this);
	this._options = options;
}

util.inherits(LazyTransform, stream.Transform);

[
	'_readableState',
	'_writableState',
	'_transformState'
].forEach(function(prop, i, props) {
	Object.defineProperty(LazyTransform.prototype, prop, {
		get: function() {
			stream.Transform.call(this, this._options);
			this._writableState.decodeStrings = false;
			this._writableState.defaultEncoding = 'binary';
			return this[prop];
		},
		set: function(val) {
			Object.defineProperty(this, prop, {
				value: val,
				enumerable: true,
				configurable: true,
				writable: true
			});
		},
		configurable: true,
		enumerable: true
	});
});


function Hash(algorithm, options) {
	LazyTransform.call(this, options);
	this._handle = new binding.Hash(algorithm);
}


util.inherits(Hash, LazyTransform);


Hash.prototype._transform = function(chunk, encoding, callback) {
	this._handle.update(chunk, encoding);
	callback();
}

Hash.prototype._flush = function(callback) {
	this.push(this._handle.digest());
	callback();
}

Hash.prototype.update = function(buf) {
	this._handle.update(buf);
	return this;
}

Hash.prototype.digest = function(outputEncoding) {
	const buf = this._handle.digest();
	if(outputEncoding) {
		return buf.toString(outputEncoding);
	}
	return buf;
}

Hash.prototype.copy = function() {
	const h = new this.constructor("bypass");
	h._handle = this._handle.copy();
		return h;
}

function createHash(algorithm, options) {
	return new Hash(algorithm, options);
}


function KeyedHash(algorithm, key, options) {
	LazyTransform.call(this, options);
	this._handle = new binding.Hash(algorithm, key);
}

KeyedHash.prototype.update = Hash.prototype.update;
KeyedHash.prototype.digest = Hash.prototype.digest;
KeyedHash.prototype.copy = Hash.prototype.copy;
KeyedHash.prototype._flush = Hash.prototype._flush;
KeyedHash.prototype._transform = Hash.prototype._transform;

function createKeyedHash(algorithm, key, options) {
	return new KeyedHash(algorithm, key, options);
}

module.exports.Hash = Hash;
module.exports.createHash = createHash;
module.exports.KeyedHash = KeyedHash;
module.exports.createKeyedHash = createKeyedHash;


