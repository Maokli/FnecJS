# fnec-shared

The **fnec-shared** package holds shared utilities, constants, and types used across the `fnecJs` ecosystem. It is the backbone for other packages, providing reusable building blocks and type definitions to keep everything consistent and efficient.

---

## 📦 Overview

This package includes:

- **Utility functions** that are used by other packages in the monorepo.
- **Constants** for standard values, configurations, and other shared resources.
- **Types** that help ensure type safety and consistency across all `fnecJs` packages.

---

## 🚀 Installation

If you're working within the `fnecJs` ecosystem, this package is already included when you install the monorepo. But if you want to install it separately, run:

```bash
npm install @fnec-shared
```

---

## 🛠️ Utilities

`fnec-shared` provides several utilities to aid in development. Some of the key helpers include:

- **`ObjectUTils`**: Object utility functions.
- **`StringUtils`**: String utility functions.

You can import them as follows:

```javascript
import { ObjectUtils, StringUtilities } from '@fnec-shared/utilities';
```

---

## 📐 Types

This package also exports essential TypeScript types, ensuring type safety across the `fnecJs` ecosystem. Some key types include:

- **`CustomProps`**: Defines the types for component props.
- **`DomElement`**: Represents a transpiled JSX element.

You can import them like this:

```javascript
import { CustomProps, DomElement } from '@fnec-shared/types';
```

---

## 🔗 Constants

`fnec-shared` includes some global constants, such as:

- **`ELEMENT_TYPES`**: The possible element types set by the transpiler.

These constants help standardize configurations across your app or library.

Example usage:

```javascript
import { ELEMENT_TYPES } from '@fnec-shared/constants';

console.log(ELEMENT_TYPES.TEXT_ELEMENT);  
// Outputs: "TEXT_ELEMENT"
```

---

## 📝 Contributing

Contributions are welcome! If you want to add new utilities, types, or constants, feel free to open a pull request. Ensure your changes are well-tested and documented.

---

## 📄 License

MIT — free to use, modify, and distribute.

---

Made with 🦊 in Tunisia 🇹🇳.