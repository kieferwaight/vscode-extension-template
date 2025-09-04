/**
 * Example Configuration Usage
 * 
 * This file demonstrates how to work with configuration settings
 * in various scenarios.
 */

import * as vscode from "vscode";

/**
 * Enhanced Settings enum with example configuration keys
 */
export enum ExampleSettings {
    Identifier = "your-extension-name",
    EnableFeature = "enableFeature",
    MaxItems = "maxItems",
    CustomMessage = "customMessage",
    LogLevel = "logLevel",
}

/**
 * Enhanced configuration functions with validation and defaults
 */

/**
 * Get a configuration value with default fallback
 */
export function getWithDefault<T>(key: ExampleSettings, defaultValue: T): T {
    const config = vscode.workspace.getConfiguration(ExampleSettings.Identifier);
    return config.get<T>(key) ?? defaultValue;
}

/**
 * Set a configuration value with validation
 */
export async function setValidated<T>(key: ExampleSettings, value: T): Promise<boolean> {
    try {
        // Add validation logic here
        if (!validateConfigValue(key, value)) {
            vscode.window.showErrorMessage(`Invalid value for ${key}: ${value}`);
            return false;
        }

        await vscode.workspace.getConfiguration(ExampleSettings.Identifier)
            .update(key, value, vscode.ConfigurationTarget.Global);
        
        vscode.window.showInformationMessage(`${key} updated to: ${value}`);
        return true;
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to update ${key}: ${error}`);
        return false;
    }
}

/**
 * Validate configuration values
 */
function validateConfigValue<T>(key: ExampleSettings, value: T): boolean {
    switch (key) {
        case ExampleSettings.MaxItems:
            const numValue = value as number;
            return numValue >= 1 && numValue <= 100;
        
        case ExampleSettings.LogLevel:
            const validLevels = ['debug', 'info', 'warn', 'error'];
            return validLevels.includes(value as string);
        
        case ExampleSettings.CustomMessage:
            const strValue = value as string;
            return strValue.length > 0 && strValue.length <= 100;
        
        default:
            return true;
    }
}

/**
 * Watch for configuration changes
 */
export function setupConfigurationWatcher(context: vscode.ExtensionContext) {
    const watcher = vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration(ExampleSettings.Identifier)) {
            console.log('Extension configuration changed');
            
            // Check specific settings
            if (event.affectsConfiguration(`${ExampleSettings.Identifier}.${ExampleSettings.EnableFeature}`)) {
                const enabled = getWithDefault(ExampleSettings.EnableFeature, true);
                vscode.window.showInformationMessage(`Feature ${enabled ? 'enabled' : 'disabled'}`);
            }
            
            if (event.affectsConfiguration(`${ExampleSettings.Identifier}.${ExampleSettings.LogLevel}`)) {
                const logLevel = getWithDefault(ExampleSettings.LogLevel, 'info');
                console.log(`Log level changed to: ${logLevel}`);
            }
        }
    });

    context.subscriptions.push(watcher);
}

/**
 * Example: Configuration-driven feature toggle
 */
export class FeatureManager {
    private static instance: FeatureManager;

    public static getInstance(): FeatureManager {
        if (!FeatureManager.instance) {
            FeatureManager.instance = new FeatureManager();
        }
        return FeatureManager.instance;
    }

    public isFeatureEnabled(): boolean {
        return getWithDefault(ExampleSettings.EnableFeature, true);
    }

    public getMaxItems(): number {
        return getWithDefault(ExampleSettings.MaxItems, 10);
    }

    public getCustomMessage(): string {
        return getWithDefault(ExampleSettings.CustomMessage, 'Hello from Extension!');
    }

    public getLogLevel(): string {
        return getWithDefault(ExampleSettings.LogLevel, 'info');
    }

    public shouldLog(level: string): boolean {
        const currentLevel = this.getLogLevel();
        const levels = ['debug', 'info', 'warn', 'error'];
        const currentIndex = levels.indexOf(currentLevel);
        const targetIndex = levels.indexOf(level);
        
        return targetIndex >= currentIndex;
    }
}

/**
 * Example: Create a settings command
 */
export function registerSettingsCommand(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('your-extension.openSettings', () => {
        vscode.commands.executeCommand('workbench.action.openSettings', ExampleSettings.Identifier);
    });

    context.subscriptions.push(disposable);
}

/**
 * Example: Reset settings to defaults
 */
export function registerResetSettingsCommand(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('your-extension.resetSettings', async () => {
        const answer = await vscode.window.showWarningMessage(
            'Are you sure you want to reset all settings to default values?',
            { modal: true },
            'Yes',
            'No'
        );

        if (answer === 'Yes') {
            const config = vscode.workspace.getConfiguration(ExampleSettings.Identifier);
            
            // Reset each setting to undefined (which will use the default)
            await Promise.all([
                config.update(ExampleSettings.EnableFeature, undefined, vscode.ConfigurationTarget.Global),
                config.update(ExampleSettings.MaxItems, undefined, vscode.ConfigurationTarget.Global),
                config.update(ExampleSettings.CustomMessage, undefined, vscode.ConfigurationTarget.Global),
                config.update(ExampleSettings.LogLevel, undefined, vscode.ConfigurationTarget.Global),
            ]);

            vscode.window.showInformationMessage('Settings reset to default values');
        }
    });

    context.subscriptions.push(disposable);
}