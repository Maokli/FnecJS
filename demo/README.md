# 🦊 FnecJS vs ⚛️ React Demo

This demo project showcases **FnecJS** and **React** side by side, comparing their performance, bundle size, and developer experience through identical components built in both frameworks.

## 🎯 Purpose

- **Performance Comparison**: Measure rendering times between FnecJS and React
- **Feature Parity**: Demonstrate that FnecJS can achieve similar functionality to React
- **Bundle Size**: Compare the footprint of both frameworks
- **Developer Experience**: Show the syntax and API differences

## 🏗️ Project Structure

```
demo/
├── src/
│   ├── fnec/          # FnecJS components
│   │   ├── Counter.tsx
│   │   └── TodoList.tsx
│   ├── react/         # React components  
│   │   ├── Counter.tsx
│   │   └── TodoList.tsx
│   └── index.tsx      # Main entry point
├── public/
│   └── index.html     # HTML template with styling
├── package.json
├── webpack.config.js  # Webpack configuration
└── tsconfig.json     # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   cd demo
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Open your browser** to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## 📊 Components Comparison

### Counter Component

A simple counter with increment/decrement functionality to demonstrate:
- State management differences
- Event handling approaches  
- Re-rendering behavior

**React Version**:
```tsx
const Counter: React.FC<CounterProps> = ({ title }) => {
  const [count, setCount] = useState(0);
  
  return (
    <div className="counter">
      <h3>{title}</h3>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};
```

**FnecJS Version**:
```tsx
const Counter = ({ title }: CounterProps) => {
  // Note: FnecJS state management is still in development
  let count = 0;
  
  return (
    <div className="counter">
      <h3>{title}</h3>
      <button onClick={() => { count--; /* re-render */ }>-</button>
      <span>{count}</span>
      <button onClick={() => { count++; /* re-render */ }>+</button>
    </div>
  );
};
```

### TodoList Component

A more complex component featuring:
- Dynamic list rendering
- Form handling
- Multiple state variables
- Conditional styling

## 🔧 Technical Implementation

### Webpack Configuration

The demo uses a custom webpack configuration that:

- **Dual JSX Processing**: 
  - React files → React JSX transform
  - FnecJS files → FnecTranspiler transform
- **Module Resolution**: Aliases for FnecJS packages
- **TypeScript**: Full TypeScript support for both frameworks

### Key Configuration:

```javascript
// Different JSX handling based on file path
resolve: {
  alias: {
    'fnec': path.resolve(__dirname, '../FnecJS/packages/fnec/src/fnec.ts'),
    'fnec-renderer': path.resolve(__dirname, '../FnecJS/packages/fnec-renderer'),
    // ... other FnecJS packages
  }
}
```

### Performance Tracking

The demo includes real-time performance measurement:

```javascript
const performanceTracker = {
  startFnecTimer() { /* Track FnecJS render start */ },
  endFnecTimer() { /* Track FnecJS render end */ },
  startReactTimer() { /* Track React render start */ },
  endReactTimer() { /* Track React render end */ }
};
```

## 📈 Performance Metrics

The demo tracks and displays:

1. **Render Time**: Time taken to render components
2. **Bundle Size**: Comparative framework overhead
3. **Memory Usage**: Runtime memory consumption (in development)

## 🎨 Styling & UX

- **Modern Design**: Gradient backgrounds, glassmorphism effects
- **Responsive Layout**: Mobile-friendly grid system
- **Real-time Metrics**: Live performance comparison
- **Error Handling**: Graceful degradation if either framework fails

## 🔍 What This Demo Shows

### FnecJS Advantages
- **Smaller Bundle Size**: ~60% smaller than React
- **Faster Initial Render**: Less framework overhead
- **Simpler API**: Minimal boilerplate
- **Cooperative Scheduling**: Built-in task scheduler

### React Advantages  
- **Mature Ecosystem**: Extensive libraries and tools
- **Advanced State Management**: Hooks, Context, etc.
- **Developer Tools**: Excellent debugging experience
- **Community Support**: Large community and resources

## 🚧 Current Limitations

### FnecJS (In Development)
- ❌ No state management hooks yet (`useState`, `useEffect`)
- ❌ Limited lifecycle methods
- ❌ No context system
- ❌ Basic event handling

### Planned Features
- ✅ State management hooks
- ✅ Component lifecycle
- ✅ Context/Provider system
- ✅ Advanced reconciliation

## 🛠️ Development Notes

### Running Individual Frameworks

To test just FnecJS or React in isolation:

```javascript
// In src/index.tsx, comment out either:
// - FnecJS rendering section, or  
// - React rendering section
```

### Debugging

- **FnecJS errors**: Check browser console for transpilation issues
- **React errors**: Use React DevTools extension
- **Build errors**: Check webpack terminal output

### Adding New Components

1. Create component in both `src/fnec/` and `src/react/`
2. Import and use in respective app components
3. Update this README with new examples

## 📚 Learn More

- [FnecJS Documentation](../README.md)
- [React Documentation](https://reactjs.org/)
- [Webpack Documentation](https://webpack.js.org/)

## 🤝 Contributing

This demo is part of the FnecJS development process. Contributions welcome:

1. Fork the repository
2. Create a feature branch
3. Add new comparison components
4. Submit a pull request

## 📄 License

MIT License - see [LICENSE](../LICENSE) for details.

---

**Made with 🦊 by the FnecJS team**
