var config = require('./config');

// dependencies

var fs = require('fs');
var async = require('async');
var _ = require('underscore');
var googleTranslate = require('google-translate')(config.api);

// XML de- and encoding

var xml2js = require('xml2js');
var xmlBuilder = new xml2js.Builder();
var xmlParse = xml2js.parseString;

///////////////
// Functions //
///////////////

/**
 * performs a shallow copy of a simple object
 * @param  {Object} object object to clone
 * @return {Object}        cloned object ready for manipulation
 */
function clone(object) {
  var string = JSON.stringify(object);
  if (typeof string !== 'undefined') return (JSON.parse(string));
  else return null;
}

/**
 * select a dynamic attribute from an object by using the selector
 * @param  {Object} object   object to select attribute from
 * @param  {String} selector attribute to select as string in dot-notation
 * @return {Object}          selected attribute
 */
function select(object, selector) {
  var path = selector.split('.');
  var obj = clone(object);
  for (var i = 0; i < path.length; i++) {
    if (_.has(obj, path[i])) obj = obj[path[i]];
    else return null;
  }

  return obj;
}

/**
 * translates a single XML file on disk
 * @param  {String}   filename complete path to the file
 * @param  {Function} callback callback(err)
 */
function translateOneFile(filename, callback) {

  if (!/\.xml$/gi.test(filename)) return callback(null);

  var string = fs.readFileSync(filename);
  xmlParse(string, function (err, result) {

    var fileContents = select(result, config.bed);

    async.mapSeries(select(fileContents, config.el),
      function (c, done) {

        process.stdout.write('.');

        var oldText = _.has(c, config.key) ? c[config.key][0] : null;
        if (oldText) {

          googleTranslate.translate(oldText, config.or, config.ta, function (err, newText) {
            if (_.has(newText, 'translatedText')) c[config.key] = [newText.translatedText];
            else console.log('Could not translate: ' + oldText);

            done(err, c);
          });

        } else done(null, c);

      },

      function (err, translated) {

        process.stdout.write(':');

        result[config.bed][config.el] = translated;
        fs.writeFile(filename, xmlBuilder.buildObject(result), callback);

      });

  });

}

/////////////
// Runtime //
/////////////

var files = fs.readdirSync(config.dir).filter(function (d) {
  return d !== '.DS_Store' ? d : null;
});

async.eachSeries(files,
  function (file, done) {

    var filepath = config.dir + '/' + file;
    translateOneFile(filepath, function (err) {
      done(err);
    });

  },

  function (err) {
    if (err) console.error(err);
    else console.log('Done.');
  });
