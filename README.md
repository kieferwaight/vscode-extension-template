# VSCode Extension Template

A comprehensive template for creating VSCode extensions with TypeScript, featuring a modular architecture, development tools, and best practices.

## 🚀 Quick Start

### 1. Use This Template

1. Click "Use this template" on GitHub or fork this repository
2. Clone your new repository locally
3. Follow the [Customization Guide](#-customization-guide) below

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development

```bash
# Compile TypeScript
npm run compile

# Watch for changes (recommended during development)
npm run watch

# Run linting
npm run lint
```

### 4. Test Your Extension

1. Press `F5` in VSCode to launch the Extension Development Host
2. Or use the "Run Extension (Workspace)" configuration in the Run and Debug panel

## 📁 Project Structure

```
├── src/
│   ├── extension.ts      # Main extension entry point
│   ├── commands.ts       # Command definitions and handlers
│   ├── configuration.ts  # Configuration management utilities
│   └── output.ts         # Output channel utilities
├── scripts/
│   └── icon.js          # Icon download and processing script
├── images/
│   └── icon.png         # Extension icon
├── .vscode/
│   ├── launch.json      # Debug configuration
│   └── tasks.json       # VSCode tasks
├── package.json         # Extension manifest and dependencies
└── tsconfig.json        # TypeScript configuration
```

## 📚 Examples

The [`examples/`](examples/) directory contains comprehensive examples and patterns:

- **[`package-contributes-example.json`](examples/package-contributes-example.json)**: Complete package.json contributes section with commands, keybindings, configuration, and menus
- **[`example-commands.ts`](examples/example-commands.ts)**: Common command patterns including QuickPick, file processing, progress indicators, and input validation
- **[`example-configuration.ts`](examples/example-configuration.ts)**: Advanced configuration management with validation, watchers, and feature toggles

These examples demonstrate real-world patterns you can copy and adapt to your extension.

## 🔧 Customization Guide

### Essential Changes

1. **Update Extension Metadata** in `package.json`:
   ```json
   {
     "name": "your-extension-name",
     "displayName": "Your Extension Display Name",
     "description": "Your extension description",
     "publisher": "your-publisher-name",
     "repository": {
       "url": "https://github.com/your-username/your-extension-name.git"
     }
   }
   ```

2. **Update Extension Identifier** in `src/configuration.ts`:
   ```typescript
   export enum Settings {
       Identifier = "your-extension-name", // Change this to match package.json name
   }
   ```

3. **Customize Icon** (optional):
   ```bash
   # Generate a new icon from a URL
   npm run download:icon
   # Or replace images/icon.png with your own 256x256 PNG
   ```

### Adding Commands

1. **Define commands** in `src/commands.ts`:
   ```typescript
   export enum Command {
       HelloWorld = "your-extension-name.helloWorld",
       // Add more commands here
   }
   ```

2. **Register commands** in `package.json`:
   ```json
   {
     "contributes": {
       "commands": [
         {
           "command": "your-extension-name.helloWorld",
           "title": "Hello World",
           "category": "Your Extension"
         }
       ]
     }
   }
   ```

3. **Implement command handlers** in `src/extension.ts`:
   ```typescript
   import { Command } from "./commands";

   export function activate(context: vscode.ExtensionContext) {
       // Register command handlers
       subscriptions.push(
           vscode.commands.registerCommand(Command.HelloWorld, () => {
               vscode.window.showInformationMessage('Hello World from your extension!');
           })
       );
       
       context.subscriptions.push(...subscriptions);
   }
   ```

💡 **See [`examples/`](examples/) directory for comprehensive examples of commands, configurations, and package.json setup patterns.**

### Adding Configuration Settings

1. **Define settings** in `package.json`:
   ```json
   {
     "contributes": {
       "configuration": {
         "title": "Your Extension Settings",
         "properties": {
           "your-extension-name.enableFeature": {
             "type": "boolean",
             "default": true,
             "description": "Enable the main feature"
           }
         }
       }
     }
   }
   ```

2. **Add setting keys** to `src/configuration.ts`:
   ```typescript
   export enum Settings {
       Identifier = "your-extension-name",
       EnableFeature = "enableFeature",
   }
   ```

3. **Use settings** in your code:
   ```typescript
   import { Settings, get } from "./configuration";
   
   const isEnabled = get<boolean>(Settings.EnableFeature);
   ```

## 🛠 Development Workflow

### Building and Testing

```bash
# Compile once
npm run compile

# Compile and watch for changes
npm run watch

# Run linting
npm run lint

# Build for publishing
npm run vscode:prepublish
```

### Debugging

1. Set breakpoints in your TypeScript files
2. Press `F5` to start debugging
3. The Extension Development Host will launch with your extension loaded
4. Debug output appears in the original VSCode window's Debug Console

### Output Channel

Use the built-in output utilities for logging:

```typescript
import { out, showOutputChannel } from "./output";

// Template literal (recommended)
out`Extension initialized with ${someVariable}`;

// String with placeholders
out("Processing file: {0}", fileName);

// Show the output channel
showOutputChannel();
```

## 📦 Publishing

### Prepare for Publishing

1. **Update version** in `package.json`
2. **Ensure all metadata is correct** (name, description, repository, etc.)
3. **Test thoroughly** in the Extension Development Host
4. **Generate extension package**:
   ```bash
   npx vsce package
   ```

### Publishing Options

- **VSCode Marketplace**: Use `npx vsce publish`
- **Open VSX Registry**: Use `npx ovsx publish`
- **Private distribution**: Share the generated `.vsix` file

For detailed publishing instructions, see the [VSCode Extension Publishing Guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension).

## 🏗 Architecture

This template follows a modular architecture:

- **`extension.ts`**: Main entry point, handles activation/deactivation
- **`commands.ts`**: Centralized command definitions
- **`configuration.ts`**: Configuration management with type safety
- **`output.ts`**: Unified logging and output handling

### Key Features

- ✅ **TypeScript** with strict configuration
- ✅ **ESLint** for code quality
- ✅ **Prettier** for code formatting
- ✅ **Modular architecture** for maintainability
- ✅ **Type-safe configuration** management
- ✅ **Unified output** handling
- ✅ **Debug configuration** ready
- ✅ **Icon generation** script

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes following the existing code style
4. Run tests and linting: `npm run lint`
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📝 License

This template is released under the MIT License. See [LICENSE](LICENSE) for details.

## 🔗 Resources

- [VSCode Extension API](https://code.visualstudio.com/api)
- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Extension Examples](https://github.com/Microsoft/vscode-extension-samples)