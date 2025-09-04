# Development Guide

This guide covers advanced development topics for working with this VSCode extension template.

## 📋 Table of Contents

- [Development Setup](#-development-setup)
- [Project Architecture](#-project-architecture)
- [Adding Features](#-adding-features)
- [Testing](#-testing)
- [Debugging](#-debugging)
- [Publishing](#-publishing)
- [Best Practices](#-best-practices)

## 🛠 Development Setup

### Prerequisites

- Node.js 16.x or higher
- VSCode 1.103.0 or higher
- Git

### Initial Setup

1. **Clone and setup**:
   ```bash
   git clone <your-repo>
   cd your-extension-name
   npm install
   ```

2. **Verify setup**:
   ```bash
   npm run compile
   npm run lint
   ```

3. **Start development**:
   ```bash
   npm run watch  # Start TypeScript compiler in watch mode
   ```

4. **Test in VSCode**:
   - Press `F5` to launch Extension Development Host
   - Your extension will be loaded in a new VSCode window

## 🏗 Project Architecture

### File Structure

```
src/
├── extension.ts      # Entry point - activation/deactivation
├── commands.ts       # Command definitions and exports
├── configuration.ts  # Settings management utilities
├── output.ts        # Logging and output channel utilities
└── test/            # Test files
    ├── extension.test.ts
    ├── runTest.ts
    └── suite/
        └── index.ts
```

### Key Concepts

- **Modular Design**: Each file has a specific responsibility
- **Type Safety**: Full TypeScript with strict mode enabled
- **Unified Logging**: Centralized output channel management
- **Configuration Management**: Type-safe settings access

## ➕ Adding Features

### 1. Adding Commands

**Step 1**: Define the command in `src/commands.ts`:
```typescript
export enum Command {
    MyNewCommand = "your-extension.myNewCommand",
}
```

**Step 2**: Register in `package.json`:
```json
{
  "contributes": {
    "commands": [
      {
        "command": "your-extension.myNewCommand",
        "title": "My New Command",
        "category": "Your Extension"
      }
    ]
  }
}
```

**Step 3**: Implement in `src/extension.ts`:
```typescript
import { Command } from "./commands";

export function activate(context: vscode.ExtensionContext) {
    subscriptions.push(
        vscode.commands.registerCommand(Command.MyNewCommand, async () => {
            // Your command implementation here
            vscode.window.showInformationMessage('Command executed!');
        })
    );
    
    context.subscriptions.push(...subscriptions);
}
```

### 2. Adding Configuration Settings

**Step 1**: Add to `package.json`:
```json
{
  "contributes": {
    "configuration": {
      "properties": {
        "your-extension.enableFeature": {
          "type": "boolean",
          "default": true,
          "description": "Enable the feature"
        }
      }
    }
  }
}
```

**Step 2**: Add to `src/configuration.ts`:
```typescript
export enum Settings {
    Identifier = "your-extension",
    EnableFeature = "enableFeature",
}
```

**Step 3**: Use in your code:
```typescript
import { Settings, get } from "./configuration";

const isEnabled = get<boolean>(Settings.EnableFeature);
if (isEnabled) {
    // Feature is enabled
}
```

### 3. Adding Keybindings

Add to `package.json`:
```json
{
  "contributes": {
    "keybindings": [
      {
        "command": "your-extension.myCommand",
        "key": "ctrl+shift+p",
        "mac": "cmd+shift+p",
        "when": "editorTextFocus"
      }
    ]
  }
}
```

### 4. Adding Menu Items

Add to `package.json`:
```json
{
  "contributes": {
    "menus": {
      "editor/context": [
        {
          "command": "your-extension.myCommand",
          "when": "editorTextFocus",
          "group": "myGroup"
        }
      ]
    }
  }
}
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (if configured)
npm run test:watch
```

### Writing Tests

Create test files in `src/test/` with `.test.ts` suffix:

```typescript
import * as assert from 'assert';
import * as vscode from 'vscode';

suite('My Feature Tests', () => {
    test('should do something', async () => {
        // Arrange
        const expectedValue = true;
        
        // Act
        const actualValue = await myFunction();
        
        // Assert
        assert.strictEqual(actualValue, expectedValue);
    });
});
```

### Test Types

- **Unit Tests**: Test individual functions and classes
- **Integration Tests**: Test command execution and VSCode API interaction
- **Configuration Tests**: Test settings management

## 🐛 Debugging

### Debug Configuration

The template includes a debug configuration in `.vscode/launch.json`:

1. Set breakpoints in your TypeScript files
2. Press `F5` to start debugging
3. The Extension Development Host launches with your extension loaded
4. Debug output appears in the Debug Console

### Debug Tips

- Use `out()` function for logging to the output channel
- Check the Debug Console for error messages
- Use VSCode's built-in developer tools (`Help > Toggle Developer Tools`)

### Common Issues

**Extension not activating**:
- Check `activationEvents` in `package.json`
- Verify your extension's entry point in `main` field
- Check for errors in the Developer Console

**Commands not appearing**:
- Ensure commands are registered in `package.json`
- Check that command names match exactly
- Verify the extension is activated

## 📦 Publishing

### Preparation Checklist

- [ ] Update version in `package.json`
- [ ] Update README with current features
- [ ] Test thoroughly in clean environment
- [ ] Check all metadata (name, description, repository)
- [ ] Ensure icon is 256x256 PNG
- [ ] Review and update keywords

### Package and Test

```bash
# Install VSCE (VSCode Extension packager)
npm install -g @vscode/vsce

# Package extension
vsce package

# Test the packaged extension
code --install-extension your-extension-0.0.1.vsix
```

### Publishing Options

**VSCode Marketplace**:
```bash
vsce publish
```

**Open VSX Registry**:
```bash
npx ovsx publish your-extension-0.0.1.vsix -p <token>
```

**Private Distribution**:
- Share the `.vsix` file directly
- Users can install with `Extensions: Install from VSIX...`

## ✨ Best Practices

### Code Quality

1. **Use TypeScript strictly**: Enable all strict mode options
2. **Follow naming conventions**: PascalCase for classes, camelCase for variables
3. **Write meaningful comments**: Explain the "why", not the "what"
4. **Handle errors gracefully**: Always provide user-friendly error messages

### User Experience

1. **Provide clear command names**: Use descriptive titles and categories
2. **Add helpful descriptions**: Both for commands and configuration
3. **Use consistent terminology**: Match VSCode's built-in language
4. **Respect user preferences**: Make features configurable when appropriate

### Performance

1. **Lazy load heavy dependencies**: Only import when needed
2. **Use efficient activation events**: Don't activate on `*` unless necessary
3. **Dispose resources properly**: Always clean up in deactivate()
4. **Debounce expensive operations**: Especially file system operations

### Security

1. **Validate all inputs**: Never trust external data
2. **Be careful with file operations**: Check paths and permissions
3. **Don't store secrets**: Use VSCode's secure storage APIs
4. **Sanitize user content**: Especially when displaying in webviews

### Documentation

1. **Keep README current**: Update with each feature addition
2. **Document all public APIs**: Use JSDoc for exported functions
3. **Provide examples**: Show real usage patterns
4. **Include troubleshooting**: Common issues and solutions

## 🚀 Advanced Topics

### Custom Webviews

For complex UI requirements, you can create custom webviews:

```typescript
const panel = vscode.window.createWebviewPanel(
    'myWebview',
    'My Webview',
    vscode.ViewColumn.One,
    {
        enableScripts: true
    }
);

panel.webview.html = getWebviewContent();
```

### Tree Data Providers

For custom tree views in the explorer:

```typescript
class MyTreeDataProvider implements vscode.TreeDataProvider<MyTreeItem> {
    // Implement required methods
}

vscode.window.registerTreeDataProvider('myView', new MyTreeDataProvider());
```

### Language Server Integration

For advanced language features, consider implementing a language server using the Language Server Protocol (LSP).

## 🤝 Contributing

If you're contributing to this template:

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Test across different VSCode versions
5. Submit a pull request with clear description

## 📚 Resources

- [VSCode Extension API](https://code.visualstudio.com/api)
- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Extension Samples](https://github.com/Microsoft/vscode-extension-samples)