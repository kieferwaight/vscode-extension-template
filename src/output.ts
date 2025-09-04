import * as vscode from "vscode";
import { Settings } from "./configuration";

/**
 * Output channel for this extension.
 * Uses the extension identifier for the channel name.
 */
export const outputChannel = vscode.window.createOutputChannel(Settings.Identifier);

// Overload for template literals
export function out(strings: TemplateStringsArray, ...values: any[]): void;
// Overload for simple strings with placeholders
export function out(message: string, ...args: any[]): void;

/**
 * Unified output function that supports both template literals and placeholder strings.
 * 
 * Usage examples:
 * - Template literal: out`Extension loaded with ${count} items`
 * - Placeholder string: out("Processing file: {0} of {1}", current, total)
 * 
 * @param first Either a template string array or a regular string
 * @param rest Template values or placeholder arguments
 */
export function out(first: string | TemplateStringsArray, ...rest: any[]): void {
    let formattedMessage: string;

    if (Array.isArray(first) && 'raw' in first) {
        // This is a tagged template literal
        formattedMessage = String.raw({ raw: first as TemplateStringsArray }, ...rest);
    } else if (typeof first === 'string') {
        // This is a regular function call with placeholder support
        const message = first;
        const args = rest;
        formattedMessage = args.length > 0
            ? message.replace(/{(\d+)}/g, (match, index) => {
                const argIndex = parseInt(index, 10);
                return typeof args[argIndex] !== 'undefined' ? args[argIndex] : match;
            })
            : message;
    } else {
        // Should not be reached due to overloads
        return;
    }

    outputChannel.appendLine(formattedMessage);
}

/**
 * Show the output channel in the VSCode UI.
 * Useful for debugging or when you want to draw attention to logged messages.
 */
export function showOutputChannel() {
    outputChannel.show();
}
