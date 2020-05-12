
const vscode = require('vscode');
const CSSData = require('vscode-web-custom-data/data/browsers.css-data');
const getFocusCodeInfo = require('./getFocusCodeInfo');
const isCompletingStyleName = require('./isCompletingStyleName');

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
		const propertyName = property.name.replace(/-(\w)/, ($, $1) => $1.toUpperCase());
		CSS_PROPERTIES[propertyName] = property;
	});
} catch (e) {
	// ignore
}

function activate(context) {
	// Register completionItem provider
	context.subscriptions.push(
		vscode.languages.registerCompletionItemProvider(
			[
				{ scheme: 'file', language: 'javascript' },
				{ scheme: 'file', language: 'javascriptreact' },
				{ scheme: 'file', language: 'typescript' },
				{ scheme: 'file', language: 'typescriptreact' }
			],
			{
				provideCompletionItems(document, position) {
					const { line, word } = getFocusCodeInfo(document, position);

					// is in Object
					if (isCompletingStyleName(word, line)) {
						const currentText = line.text;
						const previousText = currentText.substr(0, currentText.lastIndexOf(word)).trim()

						if (previousText.endsWith(':')) {
							console.log('value')

						} else {
							console.log('key')
						}

						// const propertyName =
						// 	`${currentLineText.substr(0, currentLineText.lastIndexOf(word)).trim()}${word}`
						// 		.match(new RegExp(`([a-zA-Z-]+):${word}`))
						// console.log(propertyName);
					}

					console.log(line.text)

				}
			}
		)
	);
}

exports.activate = activate;


