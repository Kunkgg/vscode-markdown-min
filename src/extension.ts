// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "markdown-mine" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(disposable);

	return {
		extendMarkdownIt(md: any) {
			md.set({
				html: true,
				linkify: true,
				typographer: true
			});

			// load plugins
			md.use(require('markdown-it-sub'))
				.use(require('markdown-it-sup'))
				.use(require('markdown-it-footnote'))
				.use(require('markdown-it-deflist'))
				.use(require('markdown-it-abbr'))
				.use(require('markdown-it-emoji'))
				.use(require('markdown-it-imsize'))
				.use(require('markdown-it-mark'))
				.use(require('markdown-it-ins'))
				.use(require('markdown-it-task-lists'))
				.use(require('markdown-it-kbd'))
				.use(require('markdown-it-checkbox'));


			// custom container div  
			md.use(require('markdown-it-container'), 'warning', {
				validate: function (params: any) {
					return params.trim().match(/^warning\s*$/);
				},
				render: function (tokens: any, idx: any) {
					if (tokens[idx].nesting === 1) {
						return '<div class="warning">\n<p><i class="fas fa-exclamation-triangle pr-2"></i>Warning</p>' + '\n';
					} else {
						return '</div>\n';
					}
				}
			});
			md.use(require('markdown-it-container'), 'important', {
				validate: function (params: any) {
					return params.trim().match(/^important\s*$/);
				},
				render: function (tokens: any, idx: any) {
					if (tokens[idx].nesting === 1) {
						return '<div class="important">\n<p><i class="fas fa-exclamation-circle pr-2"></i>Important</p>' + '\n';
					} else {
						return '</div>\n';
					}
				}
			});
			md.use(require('markdown-it-container'), 'tip', {
				validate: function (params: any) {
					return params.trim().match(/^tip\s*$/);
				},
				render: function (tokens: any, idx: any) {
					if (tokens[idx].nesting === 1) {
						return '<div class="tip">\n<p><i class="far fa-lightbulb pr-2"></i>Tip</p>' + '\n';
					} else {
						return '</div>\n';
					}
				}
			});

			return md;
		}
	};
}

// this method is called when your extension is deactivated
export function deactivate() { }
