const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "unit-test-generator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', function () {
		vscode.window.showInformationMessage('Hello World!');
	});

	let disposableUnitTestGenerate = vscode.commands.registerCommand('extension.generateUnitTest', function () {
        const { activeTextEditor } = vscode.window;

        if (activeTextEditor) {
            const { document } = activeTextEditor;
            if (document) {
				const documentText = document.getText();
                /*
                  build your textEdits similarly to the above with insert, delete, replace 
                  but not within an editBuilder arrow function
				  const textEdits: vscode.TextEdit[] = [];
				  textEdits.push(vscode.TextEdit.replace(...));
				  textEdits.push(vscode.TextEdit.insert(...));
                */

                const workEdits = new vscode.WorkspaceEdit();
                //workEdits.set(document.uri, textEdits); // give the edits
                vscode.workspace.applyEdit(workEdits); // apply the edits
            }
        }

		vscode.window.showInformationMessage('Generate UnitTest ');
	});
	context.subscriptions.push(disposable);
	context.subscriptions.push(disposableUnitTestGenerate);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
