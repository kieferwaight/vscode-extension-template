import * as vscode from "vscode"

/**
 * Settings enumeration for the extension.
 * 
 * The Identifier should match the "name" field in package.json
 * and is used for configuration scoping and output channel naming.
 */
export enum Settings {
    Identifier = "vscode-extension-template",
    
    // Add your configuration keys here:
    // EnableFeature = "enableFeature",
    // MaxItems = "maxItems",
}

/**
 * Set a configuration value for this extension.
 * 
 * @param key The configuration key to set
 * @param value The value to set
 */
export function set(key: Settings, value: any) {
    vscode.workspace.getConfiguration(Settings.Identifier).update(key, value, true)
}

/**
 * Get a configuration value for this extension.
 * 
 * @param key The configuration key to retrieve
 * @returns The configuration value, or undefined if not set
 */
export function get<T>(key: Settings): T {
    return vscode.workspace.getConfiguration(Settings.Identifier).get<T>(key) as T
}
