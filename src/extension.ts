import * as vscode from "vscode"
import { out, outputChannel } from "./output"
import { Settings } from "./configuration"

// Keep track of all disposables to clean up properly on deactivation
const subscriptions: vscode.Disposable[] = []

/**
 * This method is called when your extension is activated.
 * Your extension is activated the first time any command is executed or on startup.
 */
export function activate(context: vscode.ExtensionContext) {
    out`${Settings.Identifier} activated`

    // Register disposables for proper cleanup
    subscriptions.push(
        outputChannel,
        // Add your command registrations here:
        // vscode.commands.registerCommand('your-extension.command', () => {
        //     vscode.window.showInformationMessage('Hello from your extension!');
        // })
    )

    // Add all subscriptions to the extension context
    context.subscriptions.push(...subscriptions)
}

/**
 * This method is called when your extension is deactivated.
 * Clean up any resources that were allocated during activation.
 */
export function deactivate() {
    out`${Settings.Identifier} deactivated`
    
    // Dispose of all registered subscriptions
    subscriptions.forEach((subscription) => subscription.dispose())
}
