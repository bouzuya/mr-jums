var rev = require('rev-hash');
var fs = require('fs');

var revFile = 'rev.json';
var jsFile = 'public/scripts/index.js';
var jsRev = rev(fs.readFileSync(jsFile));
var newJsFile = 'public/scripts/index-{hash}.js'.replace('{hash}', jsRev);
var scriptUrl = '/scripts/index-{hash}.js'.replace('{hash}', jsRev);
var revJson = { scriptUrl };

fs.renameSync(jsFile, newJsFile);
fs.writeFileSync(revFile, JSON.stringify(revJson), { encoding: 'utf-8' });
