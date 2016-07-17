// A Google API account is required with the Google Translate API
// activated and billing activated as well
var GoogleAPIkey = 'here-goes-your-api-key';

// Translating from...
var originLanguage = 'ja';

// ... to...
var targetLanguage = 'en';

// The directory where all XML files to be translated are placed,
// set to 'files' by default
var XMLfileDir = './files';

// The name of the repeating XML element in which the text to
// be translated is located
var nameOfRepeatingXMLelement = 'some-foreign-text';

// The path to this repeating XML element
var pathToRepeatingXMLelement = 'data';

// The name of the element within the repeating element that
// should be translated
var keyToBeTranslated = 'text';

////////////
// Export //
////////////

module.exports = {
  api: GoogleAPIkey,
  dir: XMLfileDir,
  el: nameOfRepeatingXMLelement,
  bed: pathToRepeatingXMLelement,
  key: keyToBeTranslated,
  or: originLanguage,
  ta: targetLanguage,
};
