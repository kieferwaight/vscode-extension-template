/**
 * Extension Tests
 * 
 * This file demonstrates basic testing patterns for VSCode extensions.
 * Run tests using the VSCode Test Runner or by pressing F5 in the test file.
 */

import * as assert from 'assert';
import * as vscode from 'vscode';
import { Settings, get, set } from '../configuration';
import { out } from '../output';

// Test suite for the extension
suite('Extension Tests', () => {
    
    /**
     * Test configuration management
     */
    suite('Configuration', () => {
        test('should have correct identifier', () => {
            assert.strictEqual(Settings.Identifier, 'vscode-extension-template');
        });

        test('should get and set configuration values', async () => {
            // This test would work with actual configuration keys
            // Uncomment when you add real configuration properties:
            
            // const testKey = Settings.EnableFeature; // Add this to Settings enum
            // const testValue = false;
            
            // await set(testKey, testValue);
            // const retrievedValue = get<boolean>(testKey);
            
            // assert.strictEqual(retrievedValue, testValue);
        });
    });

    /**
     * Test output functionality
     */
    suite('Output', () => {
        test('should not throw when logging messages', () => {
            assert.doesNotThrow(() => {
                out('Test message');
                out`Template literal test with ${'value'}`;
                out('Placeholder test: {0}', 'value');
            });
        });
    });

    /**
     * Test extension activation
     */
    suite('Extension Lifecycle', () => {
        test('should activate extension', async () => {
            // Get the extension
            const extension = vscode.extensions.getExtension('kieferwaight.vscode-extension-template');
            
            if (extension) {
                // Activate the extension if not already active
                if (!extension.isActive) {
                    await extension.activate();
                }
                
                assert.ok(extension.isActive, 'Extension should be active');
            } else {
                // In a real test environment, the extension should be available
                // This might fail in this template context
                console.log('Extension not found - this is expected in template');
            }
        });

        test('should have expected commands registered', async () => {
            // Test that your commands are registered
            const commands = await vscode.commands.getCommands(true);
            
            // Uncomment and modify when you add actual commands:
            // assert.ok(commands.includes('vscode-extension-template.helloWorld'));
            // assert.ok(commands.includes('vscode-extension-template.showOutput'));
            
            // For now, just ensure some VSCode commands exist
            assert.ok(commands.length > 0, 'Should have some commands available');
        });
    });
});