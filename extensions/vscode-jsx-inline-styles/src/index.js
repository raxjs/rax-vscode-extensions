
const vscode = require('vscode');
const CSSData = require('vscode-web-custom-data/data/browsers.css-data');
const getFocusCodeInfo = require('./getFocusCodeInfo');
const getCompletionItem = require('./getCompletionItem');
const isInObject = require('./isInObject');

// {
//   position: {
//     name: "position",
//     values: [
//       { name: "absolute", description: "xxx" },
//       { name: "fixed", description: "xxx" },
//       ...
//     ],
//     syntax: "static | relative | absolute | sticky | fixed",
//     references: [
//       { name: "MDN Reference", url: "https://developer.mozilla.org/docs/Web/CSS/position" }
//     ],
//     description: "The position CSS property sets how an element is positioned in a document. The top, right, bottom, and left properties determine the final location of positioned elements."
//   }
// }
let CSS_PROPERTIES = {};

try {
	// https://github.com/microsoft/vscode-custom-data
	CSSData.properties.forEach((property) => {
		// To camelCased property
		CSS_PROPERTIES[toCamel(property.name)] = property;
	});
} catch (e) {
	// ignore
}

const CSS_DOCS_URL = 'https://developer.mozilla.org/en-US/docs/Web/CSS';

// To camelCased property, margin-left to marginLeft
function toCamel(prop) {
	return prop.replace(/-(\w|$)/g, ($, $1) => $1.toUpperCase());
}

// Compare first chars
function firstCharsEqual(str1, str2) {
	return str1[0].toLowerCase() === str2[0].toLowerCase();
}

function isEndsWithComma(text) {
	return /,\s*$/.test(text)
}

// Register completionItem provider
function provideCompletionItems(document, position) {
	const completions = [];
	const { line, word } = getFocusCodeInfo(document, position);

	const currentText = line.text;
	const previousText = currentText.substr(0, currentText.lastIndexOf(word)).trim();

	// The JSX style attribute accepts a JavaScript object.
	// If the active word is in an object, it seems like to completing style.
	if (isInObject(word, line)) {
		if (previousText.endsWith(':')) {
			processPropertyValue()
		} else {
			processPropertyName();
		}
	}

	// Completion property name
	function processPropertyName() {
		for (let propertyName in CSS_PROPERTIES) {
			const property = CSS_PROPERTIES[propertyName];
			if (firstCharsEqual(word, propertyName)) {
				completions.push(
					getCompletionItem(
						propertyName, property.description,
						`${CSS_DOCS_URL}/${property.name}`, // Docs
						`${propertyName}: `  // EXP position:
					)
				);
			}
		}
	}

	// Completion property value
	function processPropertyValue() {
		const matched = previousText.match(/\s*([a-zA-Z]+)\s*:$/);
		const property = CSS_PROPERTIES[matched && matched[1]];

		for (value of Array.from(property.values || [])) {
			if (firstCharsEqual(value.name, word)) {

				completions.push(
					getCompletionItem(
						value.name, value.description,
						`${CSS_DOCS_URL}/${property.name}#Values`, // Docs
						`'${value.name}'${!isEndsWithComma(currentText) ? ',' : ''}`, // EXP 'relative',
						'Value'
					)
				);
			}
		}
	}

	return completions;
}

// Extension activate
function activate(context) {
	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider(
			[
				{ scheme: 'file', language: 'javascript' },
				{ scheme: 'file', language: 'javascriptreact' },
				{ scheme: 'file', language: 'typescript' },
				{ scheme: 'file', language: 'typescriptreact' }
			],
			{ provideCompletionItems }
		)
	);
}

exports.activate = activate;
