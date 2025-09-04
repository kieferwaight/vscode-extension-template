import * as vscode from "vscode"

export enum Settings {
    Identifier = "vscode-extension-template",
}

export function set(key: Settings, value: any) {
    vscode.workspace.getConfiguration(Settings.Identifier).update(key, value, true)
}

export function get<T>(key: Settings): T {
    return vscode.workspace.getConfiguration(Settings.Identifier).get<T>(key) as T
}
