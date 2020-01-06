[![Version](https://vsmarketplacebadge.apphb.com/version/Rax.vscode-orange-theme.svg)](https://marketplace.visualstudio.com/items?itemName=Rax.vscode-orange-theme)
[![Installs](https://vsmarketplacebadge.apphb.com/installs-short/Rax.vscode-orange-theme.svg)](https://marketplace.visualstudio.com/items?itemName=Rax.vscode-orange-theme)

# Orange Theme

![screenshot](https://user-images.githubusercontent.com/677114/71815715-59183e00-30bb-11ea-9d1a-cd92d3f02fec.jpg)

## What's in the folder

* This folder contains all of the files necessary for your color theme extension.
* `package.json` - this is the manifest file that defines the location of the theme file and specifies the base theme of the theme.
* `themes/orange-dark-color-theme.json` - the color theme definition file.

## Running the extension

- Press `F5` to open a new window with your extension loaded.
- Open `File > Preferences > Color Themes` (or `Code > Preferences > Color Theme` on macOS), and pick `Orange`.
- Open a file that has a language associated. The languages' configured grammar will tokenize the text and assign 'scopes' to the tokens. To examine these scopes, invoke the `Inspect TM Scopes` command from the Commmand Palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) .

## Make changes

- You can relaunch the extension from the debug toolbar after making changes to the files listed above.
- You can also reload (`Ctrl+R` or `Cmd+R` on Mac) the VS Code window with your extension to load your changes.

## VS Code API

- [contributes.themes](https://code.visualstudio.com/api/references/contribution-points#contributes.themes)

## Adopt your theme to Visual Studio Code

* The token colorization is done based on standard TextMate themes. Colors are matched against one or more scopes.

To learn more about scopes and how they're used, check out the [color theme](https://code.visualstudio.com/api/extension-guides/color-theme) documentation.

## Install your extension

* To start using your extension with Visual Studio Code copy it into the `<user home>/.vscode/extensions` folder and restart Code.
* To share your extension with the world, read on https://code.visualstudio.com/docs about publishing an extension.