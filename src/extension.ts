'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    let cmdInspect = vscode.commands.registerCommand('extension.inspect', () => {
        inspect();
    });
    let cmdSearchEvil = vscode.commands.registerCommand('extension.searchevil', () => {
        inspect();
    });

    context.subscriptions.push(cmdInspect);
    context.subscriptions.push(cmdSearchEvil);

    function inspect() {
        var src : String;

        src = vscode.window.activeTextEditor.document.getText();

        var cnt = 0;
        var ofs = 0;
        var len = src.length;
        while(true) {
            ofs = src.indexOf("　", ofs + 1);
            if (ofs < 0) {
                break;
            }
            cnt++;
        }

        vscode.window.showInformationMessage('inspect! wow! : ' + cnt);
    }
}

// this method is called when your extension is deactivated
export function deactivate() {
}