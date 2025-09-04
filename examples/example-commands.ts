/**
 * Example Commands Implementation
 * 
 * This file shows how to implement common command patterns.
 * Copy and adapt these examples to your extension.
 */

import * as vscode from "vscode";
import { out, showOutputChannel } from "./output";
import { Settings, get } from "./configuration";

/**
 * Example: Simple Hello World command
 */
export function registerHelloWorldCommand(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('your-extension.helloWorld', () => {
        const message = get<string>('customMessage') || 'Hello World!';
        vscode.window.showInformationMessage(message);
        out`Hello World command executed with message: ${message}`;
    });

    context.subscriptions.push(disposable);
}

/**
 * Example: Command that shows a QuickPick menu
 */
export function registerQuickPickCommand(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('your-extension.showQuickPick', async () => {
        const items = ['Option 1', 'Option 2', 'Option 3'];
        
        const selected = await vscode.window.showQuickPick(items, {
            placeHolder: 'Select an option',
            canPickMany: false
        });

        if (selected) {
            vscode.window.showInformationMessage(`You selected: ${selected}`);
            out`QuickPick selection: ${selected}`;
        }
    });

    context.subscriptions.push(disposable);
}

/**
 * Example: Command that works with the active editor
 */
export function registerEditorCommand(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('your-extension.processEditor', () => {
        const editor = vscode.window.activeTextEditor;
        
        if (!editor) {
            vscode.window.showWarningMessage('No active editor found');
            return;
        }

        const document = editor.document;
        const text = document.getText();
        const lineCount = document.lineCount;

        vscode.window.showInformationMessage(
            `Document has ${lineCount} lines and ${text.length} characters`
        );
        
        out`Processed document: ${document.fileName} (${lineCount} lines, ${text.length} chars)`;
    });

    context.subscriptions.push(disposable);
}

/**
 * Example: Command that works with workspace files
 */
export function registerFileProcessorCommand(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('your-extension.processFiles', async () => {
        if (!vscode.workspace.workspaceFolders) {
            vscode.window.showWarningMessage('No workspace folder open');
            return;
        }

        try {
            const files = await vscode.workspace.findFiles(
                '**/*.{js,ts,json}', // Include pattern
                '**/node_modules/**', // Exclude pattern
                100 // Max results
            );

            vscode.window.showInformationMessage(`Found ${files.length} files`);
            out`Found ${files.length} matching files in workspace`;

            // Process each file
            for (const file of files) {
                const document = await vscode.workspace.openTextDocument(file);
                out`Processing file: ${document.fileName}`;
                // Add your file processing logic here
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Error processing files: ${error}`);
            out`Error processing files: ${error}`;
        }
    });

    context.subscriptions.push(disposable);
}

/**
 * Example: Command with input validation
 */
export function registerInputCommand(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('your-extension.getInput', async () => {
        const input = await vscode.window.showInputBox({
            prompt: 'Enter a value',
            placeHolder: 'Type something here...',
            validateInput: (value: string) => {
                if (!value || value.trim().length === 0) {
                    return 'Value cannot be empty';
                }
                if (value.length < 3) {
                    return 'Value must be at least 3 characters long';
                }
                return null; // Valid input
            }
        });

        if (input) {
            vscode.window.showInformationMessage(`You entered: ${input}`);
            out`User input received: ${input}`;
        }
    });

    context.subscriptions.push(disposable);
}

/**
 * Example: Command that shows progress
 */
export function registerProgressCommand(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('your-extension.showProgress', async () => {
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: 'Processing...',
            cancellable: true
        }, async (progress, token) => {
            const steps = 10;
            
            for (let i = 0; i < steps; i++) {
                // Check for cancellation
                if (token.isCancellationRequested) {
                    vscode.window.showWarningMessage('Operation cancelled');
                    return;
                }

                // Update progress
                progress.report({
                    message: `Step ${i + 1} of ${steps}`,
                    increment: 100 / steps
                });

                // Simulate work
                await new Promise(resolve => setTimeout(resolve, 500));
            }

            vscode.window.showInformationMessage('Processing completed!');
            out`Progress operation completed`;
        });
    });

    context.subscriptions.push(disposable);
}

/**
 * Example: Command that opens external URLs
 */
export function registerOpenUrlCommand(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('your-extension.openUrl', async () => {
        const url = 'https://code.visualstudio.com/api';
        await vscode.env.openExternal(vscode.Uri.parse(url));
        out`Opened external URL: ${url}`;
    });

    context.subscriptions.push(disposable);
}