# 📦 fnec-transpiler

**fnec-transpiler** is the custom JSX transpiler for the **fnecJs** front-end library. It converts JSX syntax into code that is optimized for the `fnec` runtime. This package is a crucial part of the fnecJs ecosystem, ensuring that components written in JSX are properly transformed and ready for rendering.

---

## ⚙️ Features

- **Custom JSX Syntax:** Tailored specifically for the `fnec` runtime, allowing you to write JSX just like React, with optimizations for size and performance.
- **Lightweight and Fast:** Designed to be minimalistic, the transpiler focuses on speed and small bundle sizes.
- **Integration with Other fnecJs Packages:** Works seamlessly with the `fnec` and `fnec-renderer` packages to provide a complete JSX-to-DOM pipeline.

---

## 🛠 Installation

To install `fnec-transpiler`, you can add it as a dependency to your project:

```bash
npm install fnec-transpiler
```

---

## 📝 Usage

To use the transpiler in your project, simply import it and use the provided methods to transpile your JSX code.

### Example

```javascript
import { createElement } from 'fnec-transpiler';

const jsxCode = `<div>Hello, world!</div>`;
const transpiledCode = createElement(jsxCode);

console.log(transpiledCode); // Outputs fnec-ready JavaScript code
```

The `transpile` function processes JSX syntax and outputs code that is ready for the `fnec-renderer` to transform into DOM elements.

---


## 📦 Package Structure

- **transpile(jsxCode):** The main function to transpile JSX code into `fnec`-ready JavaScript.
- **setConfig(options):** Allows you to configure the transpiler's behavior (e.g., enable optimizations, customize JSX pragma).

---

## 🚀 Running Tests

To run the tests for the transpiler package, use the following command:

```bash
npm test:transpiler
```

---

## 🔧 Development

If you're looking to contribute to `fnec-transpiler`, here are a few steps to get started:

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/Maokli/FnecJS.git
   cd fnecJs/packages/fnec-transpiler
   npm install
   ```

2. Make your changes and Submit a pull request.

---

## 🔗 See Also

- [fnecJs](https://github.com/Maokli/FnecJS) - The main repository for the fnecJs library.
- [fnec-renderer](../fnec-renderer/README.md) - The package responsible for turning transpiled JSX into DOM elements.

---

## 📄 License

MIT — free to use, modify, and distribute.

---

Made with 🦊 in Tunisia 🇹🇳.
```