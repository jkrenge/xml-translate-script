# xml-translate-script
Translates defined attributes in a bunch of XML files at once.

## Prerequisites

You'll need a Google API account for this to work, where there is both the Google Translate API
as well as billing activated. Otherwise your API key won't yield the necessary results.

Other than that, you'll need [Node.js](https://nodejs.org/en/).

## Basic Setup

As usual, run `npm i` to get all dependencies. Then place your XML files to translate in the
folder `files` and configure the script:

For this, copy `config.template.js` and name it `config.js`. In this file, seven settings have to
be set. Let's start with the simple ones:

Your Google API token (see requirements above):
```
var GoogleAPIkey = 'here-goes-your-api-key';
```

What's your origin language? You'll need to use [ISO 639-1 codes](https://www.loc.gov/standards/
iso639-2/php/code_list.php), e.g. `en` for English, `de` for German, and `ja` for Japanese.
This could theoretically omitted when using Google Translate but I kept it for better results.
```
var originLanguage = 'ja';
```

And you'll obviously have to define the output language in the same manner:
```
var targetLanguage = 'en';
```

You can probably leave this setting to default if you don't want to change the directory with
the XML files for whatever reason.
```
var XMLfileDir = './files';
```

## Pinpoint element to be translated in XML

Now that's the only difficult part in setup. You have to define which element of the XML
should be translated. Let's do this with an example. Here we have some XML defined buttons:

```
<?xml version="1.0" encoding="UTF-8" ?>
<data>
	<button>
		<label>私を翻訳</label>
		<x>2</x>
		<y>12</y>
    <background>#598921</background>
	</button>
	<button>
		<label>全く真剣ありません</label>
		<x>2</x>
		<y>24</y>
    <background>#8EC417</background>
	</button>
</data>
```

So'll guess what we want to translate: The Japanese text. So we have to locate it using three
attributes:

Let's first find the repeating XML element with text to be translated. This is basically
the XML representation of an array. In our example it's obiously the `button`:
```
var nameOfRepeatingXMLelement = 'button';
```

Okay, now where are the buttons? They're in one big `<data />`:
```
var pathToRepeatingXMLelement = 'data';
```

Last but not least: Within the repeating element, what should be translated?
```
var keyToBeTranslated = 'label';
```

## Run

Well, that's easy now.

```
node .
```

## License

Do whatever you want.
