import Fnec from '../packages/fnec/src/fnec';

describe('JSX Transpilation', () => {
  let createElementSpy: jest.SpyInstance

  beforeEach(() => {
    createElementSpy = jest.spyOn(Fnec, 'createElement');
  });

  test('should transpile JSX to CustomElement.createElement calls', () => {
    // JSX that will be transpiled
    const element = <div className="test">Hello World</div>;
    
    // Verify createElement was called with correct parameters
    expect(createElementSpy).toHaveBeenCalledWith(
      'div',
      expect.objectContaining({ className: 'test' }),
      'Hello World'
    );
    
    // Restore the original implementation
    createElementSpy.mockRestore();
  });
  
  // Test that JSX attributes are correctly passed to createElement
  test('should correctly pass props to createElement', () => {
    const handler = () => {};
    const element = (
      <button 
        id="test-button" 
        disabled={true} 
        onClick={handler}
        data-testid="button"
      >
        Click Me
      </button>
    );
    
    expect(createElementSpy).toHaveBeenCalledWith(
      'button',
      expect.objectContaining({
        id: 'test-button',
        disabled: true,
        onClick: handler,
        'data-testid': 'button'
      }),
      'Click Me'
    );
    
    createElementSpy.mockRestore();
  });
  
  // Test that JSX fragments are correctly handled
  test('should correctly handle JSX fragments', () => {    
    const element = (
      <>
        <span>Item 1</span>
        <span>Item 2</span>
      </>
    );
    
    // Check that createElement was called with the Fragment and the child spans
    expect(createElementSpy).toHaveBeenCalledWith(
      Fnec.Fragment,
      null,
      expect.any(Object), // first span
      expect.any(Object)  // second span
    );
    
    // Also verify it was called for each span
    expect(createElementSpy).toHaveBeenCalledWith(
      'span',
      null,
      'Item 1'
    );
    
    expect(createElementSpy).toHaveBeenCalledWith(
      'span',
      null,
      'Item 2'
    );
    
    createElementSpy.mockRestore();
  });
  
  // Test complex component composition
  test('should handle complex component composition', () => {
    // Define a component
    const ListItem = (props: { value: string }) => <li>{props.value}</li>;
    
    // Use the component in JSX
    const element = (
      <ul className="list">
        <ListItem value="Item 1" />
        <ListItem value="Item 2" />
        <ListItem value="Item 3" />
      </ul>
    );
    
    // Check that createElement was called for both the ul and the components
    expect(createElementSpy).toHaveBeenCalledWith(
      'ul',
      expect.objectContaining({ className: 'list' }),
      expect.anything(),
      expect.anything(),
      expect.anything()
    );
    
    expect(createElementSpy).toHaveBeenCalledWith(
      ListItem,
      expect.objectContaining({ value: 'Item 1' })
    );
    
    createElementSpy.mockRestore();
  });
});