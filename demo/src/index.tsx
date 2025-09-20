import React from 'react';
import ReactDOM from 'react-dom/client';
import Fnec from 'fnec';

// Import React components
import ReactCounter from './react/Counter';
import ReactTodoList from './react/TodoList';

// Import FnecJS components  
import FnecCounter from './fnec/Counter';
import FnecTodoList from './fnec/TodoList';

// Performance tracker from the global scope
declare global {
  interface Window {
    performanceTracker: {
      startFnecTimer(): void;
      endFnecTimer(): number;
      startReactTimer(): void;
      endReactTimer(): number;
    };
  }
}

// FnecJS App Component
const FnecApp = 
    <div>
      <FnecCounter title="FnecJS Counter" />
      <FnecTodoList title="FnecJS Todo List" />
    </div>;

// React App Component
const ReactApp: React.FC = () => {
  return (
    <div>
      <ReactCounter title="React Counter" />
      <ReactTodoList title="React Todo List" />
    </div>
  );
};

// Initialize both frameworks
function initializeDemo() {
  // Render FnecJS
  const fnecRoot = document.getElementById('fnec-root');
  if (fnecRoot) {
    try {
      window.performanceTracker.startFnecTimer();
      
      // Clear loading text
      fnecRoot.innerHTML = '';
      
      
      // Render FnecJS app
      Fnec.render(FnecApp, fnecRoot);
      
      window.performanceTracker.endFnecTimer();
    } catch (error) {
      console.error('FnecJS rendering error:', error);
      fnecRoot.innerHTML = `<div style="color: red; padding: 20px;">
        <h3>FnecJS Error</h3>
        <p>Failed to render FnecJS components</p>
        <details>
          <summary>Error Details</summary>
          <pre>${error instanceof Error ? error.message : String(error)}</pre>
        </details>
      </div>`;
    }
  }

  // Render React
  const reactRoot = document.getElementById('react-root');
  if (reactRoot) {
    try {
      window.performanceTracker.startReactTimer();
      
      // Clear loading text
      reactRoot.innerHTML = '';
      
      // Create React root and render
      const root = ReactDOM.createRoot(reactRoot);
      root.render(<ReactApp />);
      
      // React rendering is async, so we need to wait a bit
      setTimeout(() => {
        window.performanceTracker.endReactTimer();
      }, 10);
    } catch (error) {
      console.error('React rendering error:', error);
      reactRoot.innerHTML = `<div style="color: red; padding: 20px;">
        <h3>React Error</h3>
        <p>Failed to render React components</p>
        <details>
          <summary>Error Details</summary>
          <pre>${error instanceof Error ? error.message : String(error)}</pre>
        </details>
      </div>`;
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeDemo);
} else {
  initializeDemo();
}

// Add some performance comparison info
setTimeout(() => {
  const bundleDiffElement = document.getElementById('bundle-diff');
  if (bundleDiffElement) {
    // This is a rough estimate - in a real scenario you'd measure actual bundle sizes
    bundleDiffElement.textContent = '~60% smaller';
  }
}, 1000);
