# Contributing to VSCode Extension Template

Thank you for your interest in contributing to this VSCode extension template! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues

Before creating an issue, please:

1. **Search existing issues** to avoid duplicates
2. **Check the documentation** - your question might already be answered
3. **Test with the latest version** of the template

When reporting issues, please include:

- **Clear description** of the problem or suggestion
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **VSCode version** and operating system
- **Template version** or commit hash
- **Relevant error messages** or screenshots

### Suggesting Enhancements

Enhancement suggestions are welcome! Please:

1. **Check if it already exists** in issues or documentation
2. **Explain the use case** - why would this be useful?
3. **Provide examples** of how it would work
4. **Consider backwards compatibility** impact

## 🛠 Development Setup

### Prerequisites

- Node.js 16.x or higher
- VSCode 1.103.0 or higher
- Git

### Getting Started

1. **Fork and clone**:
   ```bash
   git fork https://github.com/kieferwaight/vscode-extension-template.git
   cd vscode-extension-template
   npm install
   ```

2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** following our guidelines below

4. **Test your changes**:
   ```bash
   npm run compile
   npm run lint
   npm test
   ```

5. **Submit a pull request**

## 📋 Pull Request Guidelines

### Before Submitting

- [ ] **Run all checks**: `npm run compile && npm run lint`
- [ ] **Test thoroughly**: Verify your changes work as expected
- [ ] **Update documentation**: README, DEVELOPMENT.md, or inline comments
- [ ] **Add tests**: For new functionality or bug fixes
- [ ] **Follow commit conventions**: See commit message format below

### Pull Request Content

1. **Clear title**: Summarize the change in 50 characters or less
2. **Detailed description**: Explain what and why, not just how
3. **Reference issues**: Link to related issues with "Fixes #123"
4. **List changes**: Bullet points of significant modifications
5. **Testing notes**: How you tested the changes

### Example PR Description

```markdown
# Add support for custom icon URLs

## Changes
- Modified `scripts/icon.js` to accept custom icon URLs
- Added validation for icon URL format
- Updated README with custom icon instructions
- Added error handling for invalid URLs

## Testing
- Tested with various SVG URLs from different domains
- Verified error handling with invalid URLs
- Confirmed backward compatibility with existing setup

Fixes #42
```

## 📝 Code Guidelines

### TypeScript Style

- **Use strict TypeScript**: All strict mode options enabled
- **Explicit types**: Prefer explicit typing over `any`
- **Meaningful names**: Variables and functions should be self-documenting
- **Consistent formatting**: Use Prettier configuration

### Code Structure

- **Single responsibility**: Each file/function should have one clear purpose
- **Error handling**: Always handle potential errors gracefully
- **Documentation**: JSDoc comments for exported functions
- **Testing**: Write tests for new functionality

### Example Code Style

```typescript
/**
 * Validates and normalizes a configuration value.
 * @param key The configuration key to validate
 * @param value The value to validate
 * @returns The normalized value
 * @throws Error if validation fails
 */
export function validateConfigValue<T>(key: string, value: unknown): T {
    if (value === undefined || value === null) {
        throw new Error(`Configuration value for '${key}' cannot be null or undefined`);
    }
    
    // Additional validation logic here
    return value as T;
}
```

### File Organization

```
src/
├── extension.ts      # Main entry point only
├── commands.ts       # Command definitions and exports
├── configuration.ts  # Configuration utilities
├── output.ts         # Logging utilities
├── utils/           # Utility functions (if needed)
├── providers/       # Custom providers (if needed)
└── test/           # All test files
```

## 🧪 Testing Guidelines

### Test Requirements

- **New features** must include tests
- **Bug fixes** should include regression tests
- **Breaking changes** require updated tests
- **All tests** must pass before merging

### Test Types

1. **Unit Tests**: Test individual functions
2. **Integration Tests**: Test VSCode API interactions
3. **Configuration Tests**: Test settings management

### Writing Tests

```typescript
suite('Feature Name', () => {
    test('should behave correctly when condition is met', async () => {
        // Arrange
        const input = 'test input';
        const expected = 'expected output';
        
        // Act
        const result = await functionUnderTest(input);
        
        // Assert
        assert.strictEqual(result, expected);
    });
});
```

## 📚 Documentation Guidelines

### Documentation Updates

Always update relevant documentation when making changes:

- **README.md**: User-facing features and setup instructions
- **DEVELOPMENT.md**: Developer-focused documentation
- **Code comments**: Complex logic or important details
- **Package.json**: Command descriptions and metadata

### Documentation Style

- **Clear and concise**: Get to the point quickly
- **Examples**: Show real usage patterns
- **Structure**: Use headings and lists for scanability
- **Links**: Reference related documentation

## 🚀 Commit Message Format

Use conventional commits format:

```
type(scope): short description

Longer description if needed

- Key change 1
- Key change 2

Fixes #123
```

### Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(commands): add support for custom command categories

fix(output): resolve hardcoded channel name issue

docs(readme): update customization instructions

test(config): add tests for configuration validation
```

## 🏷 Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backwards compatible)
- **PATCH**: Bug fixes (backwards compatible)

### Release Checklist

- [ ] All tests passing
- [ ] Documentation updated
- [ ] Version bumped in package.json
- [ ] CHANGELOG.md updated
- [ ] Git tag created
- [ ] Release notes written

## 🆘 Getting Help

Need help contributing? Here are your options:

1. **Check existing documentation**: README, DEVELOPMENT.md
2. **Search existing issues**: Someone might have had the same question
3. **Ask in discussions**: Use GitHub Discussions for general questions
4. **Create an issue**: For specific problems or bugs

### Questions Welcome

Don't hesitate to ask questions! Some good topics:

- How to implement a specific feature
- Understanding the codebase structure
- Testing strategies
- Best practices for extensions

## 🙏 Recognition

Contributors are recognized in several ways:

- **Contributor list**: Added to README.md
- **Release notes**: Credited for significant contributions
- **Git history**: Your commits become part of the project history

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Thank you for helping make this VSCode extension template better for everyone! 🎉