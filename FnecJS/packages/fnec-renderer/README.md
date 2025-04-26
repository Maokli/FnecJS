# fnec-renderer

**fnec-renderer** is a core package in the **fnecJs** ecosystem that is responsible for transforming transpiled JSX (from `fnec-transpiler`) into actual DOM elements and appending them to a root element on the page.

This package is a vital part of the rendering pipeline, ensuring that the virtual DOM, generated through **fnecJs**, gets converted into real, interactive elements on the screen.

---

## 🚀 Getting Started

To use `fnec-renderer`, you’ll need to integrate it with the core `fnec` package for handling state and component logic.

### Installation

If you're using `fnecJs` as a monorepo, `fnec-renderer` will already be bundled with the core setup. However, if you need to install it as a standalone, run:

```bash
npm install fnec-renderer
```

### Usage

Once you've transpiled your JSX code using `fnec-transpiler`, you can pass the result to the renderer.

```javascript
import { render } from 'fnec'; // from the fnec package
import { render as fnecRender } from 'fnec-renderer';

// Example JSX component
const MyComponent = () => {
  return <div>Hello, world!</div>;
};

// Get the JSX transpiled code (via fnec-transpiler)
const transpiledJSX = fnec.createElement(<MyComponent />);

// Render it into a DOM node
const rootElement = document.getElementById('root');
fnecRender(transpiledJSX, rootElement);
```

This will take the JSX components and render them as actual DOM elements inside the provided `rootElement`.

---

## ⚙️ API

### `fnecRender(transpiledJSX, rootElement)`

- **`transpiledJSX`**: The output from `fnec-transpiler`. This is the JSX code that's been transformed into a structure that `fnec-renderer` understands.
- **`rootElement`**: A DOM element that serves as the root node for rendering the JSX.

---

## 🌐 Architecture Highlights

- **JSX to DOM:** The renderer takes care of converting JSX-like structures into real DOM nodes. It appends these nodes to the specified root element in the DOM.
- **Efficient Updates:** It optimizes updates to the DOM to make sure only the necessary changes are applied, minimizing reflows and repaints.

---

## 🧪 Running Tests

To test the `fnec-renderer` package, run the following in your terminal:

```bash
npm test:renderer
```

This will run the test suite specific to this package, ensuring that all functionalities are working as expected.

---

## 🛠️ Contributing

If you'd like to contribute to `fnec-renderer`, feel free to submit a pull request or open an issue. Check out the general contributing guidelines in the [root README](../../../README.md) to get started.

---

## 📄 License

MIT — free to use, modify, and distribute.

---

Made with 🦊 in Tunisia 🇹🇳.