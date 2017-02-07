#!/usr/bin/env node

'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var readline = require('readline');

var _require = require('child_process'),
    execSync = _require.execSync;

var argv = require('yargs').boolean('e').alias('e', 'exec').boolean('l').alias('l', 'list').boolean('j').alias('j', 'json').argv;

var lines = [[function (m) {
  return m.l || m.list;
}, function (cmd) {
  return cmd.map(function (c) {
    return [c];
  });
}], [function (m) {
  return m.j || m.json;
}, function (cmd) {
  return JSON.parse(cmd);
}], [function (_) {
  return true;
}, function (cmd) {
  return execSync(cmd.join(' ')).toString().split('\n').map(function (s) {
    return s.trim();
  }).filter(Boolean).map(function (v) {
    return [v];
  });
}]].find(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 1),
      fn = _ref2[0];

  return fn(argv);
})[1](argv._);

var maxLineLen = lines.map(function (_ref3) {
  var _ref4 = _slicedToArray(_ref3, 1),
      l = _ref4[0];

  return l.length;
}).sort(function (a, b) {
  return b - a;
})[0];
var pad = Array(maxLineLen).fill(' ').join('');
lines.forEach(function (_ref5, i) {
  var _ref6 = _slicedToArray(_ref5, 2),
      cmd = _ref6[0],
      _ref6$ = _ref6[1],
      comment = _ref6$ === undefined ? '' : _ref6$;

  process.stderr.write('(' + (i + 1) + ')  ' + (cmd + pad).slice(0, maxLineLen));
  !comment || process.stderr.write('   ## ' + comment);
  process.stderr.write('\n');
});
process.stderr.write('\n');

var rl = readline.createInterface({ input: process.stdin, output: process.stderr });
rl.question('Which line do you want to select? ', function (answer) {
  process.stdout.write(lines[parseInt(answer, 10) - 1][0]);
  rl.close();
});