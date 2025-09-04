import * as vscode from "vscode";

export const outputChannel = vscode.window.createOutputChannel("Code Folding");

// Overload for template literals
export function out(strings: TemplateStringsArray, ...values: any[]): void;
// Overload for simple strings with placeholders
export function out(message: string, ...args: any[]): void;

export function out(first: string | TemplateStringsArray, ...rest: any[]): void {
    let formattedMessage: string;

    if (Array.isArray(first) && 'raw' in first) {
        // This is a tagged template literal
        formattedMessage = String.raw({ raw: first as TemplateStringsArray }, ...rest);
    } else if (typeof first === 'string') {
        // This is a regular function call
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

export function showOutputChannel() {
    outputChannel.show();
}
