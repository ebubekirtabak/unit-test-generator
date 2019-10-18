import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {


	console.log('Congratulations, your extension "tdd-generator" is now active!');

	let disposable = vscode.commands.registerCommand('extension.generateUnitTest', () => {
		vscode.window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
