'use strict';
import * as vscode from 'vscode';

var decChars: DecChars;

export function activate(context: vscode.ExtensionContext) {

    let cmdInspect = vscode.commands.registerCommand('extension.inspect', () => {
        inspect();
    });
    let cmdSearchEvil = vscode.commands.registerCommand('extension.searchevil', () => {
        inspect();
    });
        
    // Also trigger an update on changing the editor
    vscode.window.onDidChangeActiveTextEditor(editor => {
        inspect();
    }, null, context.subscriptions);
    
    // And when modifying the document
    vscode.workspace.onDidChangeTextDocument(event => {
        inspect();
    }, null, context.subscriptions);

    context.subscriptions.push(cmdInspect);
    context.subscriptions.push(cmdSearchEvil);

    function inspect() {
        var editor = vscode.window.activeTextEditor;
        
        if (decChars != undefined) {
            decChars.decorator.dispose();
        }

        var src : string;
        src = editor.document.getText();

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

        var regex = new RegExp('　', 'gm');
        var match;
        decChars = {
            'chars': [],
            'decorator': vscode.window.createTextEditorDecorationType({
                'borderWidth': '1px',
                'borderRadius': '2px',
                'borderStyle': 'solid',
                'light': {
                    'backgroundColor': 'rgba(58, 70, 101, 0.3)',
                    'borderColor': 'rgba(58, 70, 101, 0.4)'
                },
                'dark': {
                    'backgroundColor': 'rgba(117, 141, 203, 0.3)',
                    'borderColor': 'rgba(117, 141, 203, 0.4)'
                }
            })
        }
        while(match = regex.exec(src)) {
            var startPos = editor.document.positionAt(match.index);
            var endPos = editor.document.positionAt(match.index + match[0].length);
            var range = new vscode.Range(startPos, endPos);
            decChars.chars.push(range);
        }

        editor.setDecorations(decChars.decorator, decChars.chars);
    }
}

// this method is called when your extension is deactivated
export function deactivate() {
}

class DecChars {
    chars: vscode.Range[];
    decorator: vscode.TextEditorDecorationType;
}