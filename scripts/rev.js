var rev = require('rev-hash');
var fs = require('fs');

var baseUrl = 'https://mr-jums.bouzuya.net';
var revFile = 'rev.json';

var jsFile = 'public/scripts/index.js';
var jsRev = rev(fs.readFileSync(jsFile));
var newJsFile = 'public/scripts/index-{hash}.js'.replace('{hash}', jsRev);
var scriptUrl = baseUrl + '/scripts/index-{hash}.js'.replace('{hash}', jsRev);

var cssFile = 'public/styles/index.css';
var cssRev = rev(fs.readFileSync(cssFile));
var newCssFile = 'public/styles/index-{hash}.css'.replace('{hash}', cssRev);
var styleUrl = baseUrl + '/styles/index-{hash}.css'.replace('{hash}', cssRev);

var revJson = { scriptUrl, styleUrl };

fs.renameSync(jsFile, newJsFile);
fs.renameSync(cssFile, newCssFile);

fs.writeFileSync(revFile, JSON.stringify(revJson), { encoding: 'utf-8' });
