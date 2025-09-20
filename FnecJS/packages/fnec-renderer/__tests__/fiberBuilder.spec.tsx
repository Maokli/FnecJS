import { FnecTranspiler } from 'fnec-transpiler';
import { VNodeFactory } from '../src/VNodeFactory';
import { FnecRenderer } from '../src/renderer';
import { FiberBuilder } from '../src/FiberBuilder';

const originalBuildNode = VNodeFactory.prototype.buildNode;

describe('FnecRenderer.render', () => {
  // Mock dependencies
  const mockAppendChild = jest.fn();
  const mockVNode = document.createElement('div');

  // Mock the vNodeFactory
  const mockBuildNode = jest.fn().mockReturnValue(mockVNode);

  let fiberBuilder: FiberBuilder;
  // Setup the test environment
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    fiberBuilder = new FiberBuilder();
    // Mock vNodeFactory
    VNodeFactory.prototype.buildNode = mockBuildNode;
  });

  describe("should call buildNode with the correct number of elements", () => {

    test('Single element Case', () => {
        // Create a mock DOM element
        const element = <div>Test</div>;
        
        // Create a mock container
        const container = document.createElement('div');
        container.appendChild = mockAppendChild;
        
        // Call the cooperative fiber build loop
        let continuation = fiberBuilder.buildFiberRoot(element, container);
        while(continuation) {
            continuation = fiberBuilder.buildFiber(continuation);
        }
        
        // Verify buildNode was called 2 times ( one call for the div node and the other for the text node)
        expect(mockBuildNode).toHaveBeenCalledTimes(2);
    });

    test('Div container with 3 elements case', () => {
        // Create a mock DOM element
        const textNode = () => <div> Text </div>
        const element = <div>
                <textNode />
                <textNode />
                <textNode />
        </div>;
        
        // Create a mock container
        const container = document.createElement('div');
        container.appendChild = mockAppendChild;
        
        // Call the cooperative fiber build loop
        let continuation = fiberBuilder.buildFiberRoot(element, container);
        while(continuation) {
            continuation = fiberBuilder.buildFiber(continuation);
        }
        
        // Verify buildNode was called 2 times
        expect(mockBuildNode).toHaveBeenCalledTimes(4);
    });
  });
});