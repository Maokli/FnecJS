import { FnecTranspiler } from 'fnec-transpiler';
import { VNodeFactory } from '../src/VNodeFactory';
import { FnecRenderer } from '../src/renderer';

const originalBuildNode = VNodeFactory.prototype.buildNode;

describe('FnecRenderer.render', () => {
  // Mock dependencies
  const mockAppendChild = jest.fn();
  const mockVNode = document.createElement('div');

  // Mock the vNodeFactory
  const mockBuildNode = jest.fn().mockReturnValue(mockVNode);

  // Setup the test environment
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Mock vNodeFactory
    VNodeFactory.prototype.buildNode = mockBuildNode;
  });

  // Clean up after unit tests
  afterEach(() => {
    // Restore original implementation
    VNodeFactory.prototype.buildNode = originalBuildNode;
  });

  test('should call buildNode with the element', () => {
    // Create a mock DOM element
    const element = <div>Test</div>;
    
    // Create a mock container
    const container = document.createElement('div');
    container.appendChild = mockAppendChild;
    
    // Call the render function
    FnecRenderer.render(element, container);
    
    // Verify buildNode was called with the element
    expect(mockBuildNode).toHaveBeenCalledWith(element);
  });
  
  test('should append the created vNode to the container', () => {
    // Create a mock DOM element
    const element = <div>Test</div>;
    
    // Create a mock container
    const container = document.createElement('div');
    container.appendChild = mockAppendChild;
    
    // Call the render function
    FnecRenderer.render(element, container);
    
    // Verify appendChild was called with the vNode
    expect(mockAppendChild).toHaveBeenCalledWith(mockVNode);
  });
  
  test('should handle component elements', () => {
    // Create a component
    const TestComponent = () => <p>Component Test</p>;
    
    // Create a component element
    const element = <TestComponent />;
    
    // Create a mock container
    const container = document.createElement('div');
    container.appendChild = mockAppendChild;
    
    // Call the render function
    FnecRenderer.render(element, container);
    
    // Verify buildNode was called with the element
    expect(mockBuildNode).toHaveBeenCalledWith(element);
    
    // Verify appendChild was called with the vNode
    expect(mockAppendChild).toHaveBeenCalledWith(mockVNode);
  });
  
  test('should handle fragment elements', () => {
    // Create a fragment
    const element = (
      <>
        <div>Item 1</div>
        <div>Item 2</div>
      </>
    );
    
    // Create a mock container
    const container = document.createElement('div');
    container.appendChild = mockAppendChild;
    
    // Call the render function
    FnecRenderer.render(element, container);
    
    // Verify buildNode was called with the element
    expect(mockBuildNode).toHaveBeenCalledWith(element);
    
    // Verify appendChild was called with the vNode
    expect(mockAppendChild).toHaveBeenCalledWith(mockVNode);
  });
});

// Integration tests that use JSDOM to test real DOM rendering
describe('FnecRenderer.render DOM integration', () => {
  test('should render a simple element to the DOM', () => {
    // Create a test element
    const element = <div className="test">Hello World</div>;
    
    // Create a container
    const container = document.createElement('div');
    
    // Use the real appendChild
    container.appendChild = HTMLElement.prototype.appendChild;
    
    // Render the element
    FnecRenderer.render(element, container);
    
    // Verify the result
    expect(container.innerHTML).toContain('<div class="test">');
    expect(container.innerHTML).toContain('Hello World');
  });
  
  test('should render nested elements to the DOM', () => {
    // Create a test element with nested structure
    const element = (
      <div className="parent">
        <h1>Title</h1>
        <p className="content">This is a test</p>
      </div>
    );
    
    // Create a container
    const container = document.createElement('div');
    
    // Use the real appendChild
    container.appendChild = HTMLElement.prototype.appendChild;
    
    // Render the element
    FnecRenderer.render(element, container);
    
    // Verify the result
    expect(container.innerHTML).toContain('<div class="parent">');
    expect(container.innerHTML).toContain('<h1>Title</h1>');
    expect(container.innerHTML).toContain('<p class="content">');
  });
  
  // TODO: Activate when implementing functional components
  xtest('should render components to the DOM', () => {
    // Create a component
    const TestComponent = (props: { name: string }) => (
      <div className="component">
        <span>Hello, {props.name}!</span>
      </div>
    );
    
    // Create an element using the component
    const element = <TestComponent name="Test" />;
    
    // Create a container
    const container = document.createElement('div');
    
    // Use the real appendChild
    container.appendChild = HTMLElement.prototype.appendChild;
    
    // Render the element
    FnecRenderer.render(element, container);
    
    // Verify the result
    expect(container.innerHTML).toContain('<div class="component">');
    expect(container.innerHTML).toContain('<span>Hello, Test!</span>');
  });
  
  test('should render fragments to the DOM', () => {
    // Create a fragment
    const element = (
      <>
        <div>Item 1</div>
        <div>Item 2</div>
      </>
    );
    
    // Create a container
    const container = document.createElement('div');
    
    // Use the real appendChild
    container.appendChild = HTMLElement.prototype.appendChild;
    
    // Render the element
    FnecRenderer.render(element, container);
    
    // Verify the result
    expect(container.innerHTML).toContain('<div>Item 1</div>');
    expect(container.innerHTML).toContain('<div>Item 2</div>');
  });
});