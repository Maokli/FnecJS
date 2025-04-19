
# 🦊 fnec

This package is the **core API** of the `fnecJs` front-end library. It provides essential functions such as `render`, `useState`, and other utilities for building reactive UI components.

> Think of this as the equivalent of the `react` package in the React ecosystem.

---

## 📦 Installation

If you're consuming this package directly (e.g. in a demo or another app):

```bash
npm install fnec
```

In a monorepo context:

```bash
# Assuming you're at the root of fnecJs
npm run build --workspace=fnec
```

---

## 🚀 Usage

Here’s a simple example to get started with `fnec`:

```jsx
import { useState, render } from 'fnec';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Clicked {count} times</p>
      <button onclick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

render(<Counter />, document.getElementById('root'));
```

---

## 🔧 API

### `render(element, container)`

Renders a `fnec` element into the provided DOM container.

- `element`: A virtual node (transpiled JSX)
- `container`: A DOM element

---

### `useState(initialValue)`

A state hook that lets you manage local state in your components.

Returns a tuple:

```ts
const [state, setState] = useState(initialValue);
```

---

## 🧠 Under the Hood

- `render` delegates to `fnec-renderer` to convert virtual nodes into DOM.
- JSX is expected to be transpiled using `fnec-transpiler`.
- Hooks and lifecycle behavior are inspired by React but built independently.

---

## 📁 Project Structure

This package primarily exports:

- `render`
- `useState`
- (Future) hooks like `useEffect`, `useRef`, etc.

---

## 📚 Related Packages

- [`fnec-renderer`](../fnec-renderer) — Responsible for DOM rendering.
- [`fnec-transpiler`](../fnec-transpiler) — Converts JSX into `fnec`-compatible syntax.
- [`fnec-shared`](../fnec-shared) — Types, constants, and shared logic.

---

## 🛠️ Development

To build only this package:

```bash
npm run build --workspace=fnec
```

Run tests:

```bash
npm run test --workspace=fnec
```

---

## 📄 License

MIT

---

Part of the [fnecJs](https://github.com/your-username/fnecJs) monorepo.
```
