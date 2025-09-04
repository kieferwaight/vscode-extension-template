# Product Icons for VS Code Extensions

Update icon.js with an SVG of the icon you would like. Then run `npm download:icon`

## Decicons
**Devicons** is a library of free icons representing popular development technologies and tools.

- **Website / Search:** [https://devicon.dev](https://devicon.dev)  
- **GitHub Repository:** [https://github.com/devicons/devicon](https://github.com/devicons/devicon)

## 🧩 Suggested Devicons for VS Code Extensions

| Icon | Name | Usage |
|------|------|-------|
| ![TypeScript](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg) | TypeScript | Ideal for TypeScript-related projects |
| ![Tailwind](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg) | Tailwind CSS | Projects using Tailwind CSS |
| ![npm](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg) | npm | Node.js package management |
| ![Git](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg) | Git | Version control |
| ![Docker](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg) | Docker | Containerized projects |
| ![Python](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg) | Python | Python-related files/extensions |
| ![JavaScript](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg) | JavaScript | JS projects or tools |
| ![Node.js](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg) | Node.js | Node-based projects |
| ![React](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg) | React | React frontend projects |
| ![Vue.js](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg) | Vue.js | Vue frontend projects |
| ![Angular](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg) | Angular | Angular frontend projects |
| ![HTML5](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg) | HTML5 | Web markup |
| ![CSS3](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg) | CSS3 | Stylesheets |
| ![Sass](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg) | Sass | Preprocessor stylesheets |
| ![Java](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg) | Java | Java projects |
| ![C++](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg) | C++ | C++ projects |
| ![C#](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg) | C# | .NET projects |
| ![PHP](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg) | PHP | PHP projects |
| ![Ruby](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg) | Ruby | Ruby projects |
| ![Go](https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg) | Go | Go projects |

---

## 📦 VS Code Extension Icons

If your extension **requires a product icon**:

- **Format:** PNG  
- **Resolution:** 256×256 pixels  
- Place the file in your extension folder (e.g., `images/icon.png`).  

### Example `package.json` entry:

```json
{
  "name": "my-extension",
  "displayName": "My Extension",
  "publisher": "my-publisher",
  "engines": {
    "vscode": "^1.90.0"
  },
  "icon": "images/icon.png",
  "contributes": {
    "commands": [
      {
        "command": "extension.helloWorld",
        "title": "Hello World"
      }
    ]
  }
}