import * as vscode from "vscode"
import { out, outputChannel } from "./output"
import { Settings } from "./configuration"

const subscriptions: vscode.Disposable[] = []

export function activate(context: vscode.ExtensionContext) {
    out`${Settings.Identifier} activated`

    subscriptions.push(
        outputChannel
    )

    context.subscriptions.push(...subscriptions)
}

export function deactivate() {
    out`${Settings.Identifier} deactivated`
    subscriptions.forEach((subscription) => subscription.dispose())
}
