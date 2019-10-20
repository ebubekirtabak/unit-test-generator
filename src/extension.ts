import * as vscode from 'vscode';
import { TypeScriptParser } from './parsers/TypeScriptParser';

export function activate(context: vscode.ExtensionContext) {


	console.log('Congratulations, your extension "tdd-generator" is now active!');

	let disposable = vscode.commands.registerCommand('extension.generateUnitTest', () => {
    new TypeScriptParser().parse();
		vscode.window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
