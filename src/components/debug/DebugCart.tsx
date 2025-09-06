// src/components/debug/DebugCart.tsx - Temporary debugging component
import { useState } from 'react';
import { useCart } from '../shop/CartContext';
import { useAuthStore } from '@/context/userContext';

const DebugCart = () => {
  const { user } = useAuthStore();
  const { addToCart } = useCart();
  const [debugInfo, setDebugInfo] = useState<any[]>([]);

  const testAddToCart = async () => {
    if (!user) {
      addDebugInfo('ERROR: No user logged in');
      return;
    }

    // Test with product ID 100 (the one failing)
    const productId = 100;
    const quantity = 1;
    const price = "500";

    addDebugInfo(`Testing add to cart: ProductID=${productId}, Quantity=${quantity}, UserID=${user.id}`);

    try {
      const result = await addToCart(productId, quantity, price);
      addDebugInfo(`Result: ${JSON.stringify(result)}`);
    } catch (error: any) {
      addDebugInfo(`ERROR: ${error.message}`);
      addDebugInfo(`Full Error: ${JSON.stringify(error, null, 2)}`);
    }
  };

  const addDebugInfo = (info: string) => {
    const timestamp = new Date().toISOString();
    setDebugInfo(prev => [...prev, { timestamp, info }]);
  };

  const clearDebug = () => setDebugInfo([]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg m-4">
      <h3 className="text-lg font-bold mb-4">Cart Debug Tool</h3>
      
      <div className="mb-4">
       <p><strong>Current User:</strong> {user ? `ID: ${user.id}, Name: ${user.username}` : 'Not logged in'}</p>
      </div>

      <div className="space-x-2 mb-4">
        <button 
          onClick={testAddToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Test Add to Cart (Product 100)
        </button>
        <button 
          onClick={clearDebug}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Clear Debug
        </button>
      </div>

      <div className="bg-black text-green-400 p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
        <div className="mb-2"><strong>Debug Console:</strong></div>
        {debugInfo.length === 0 ? (
          <div>No debug information yet...</div>
        ) : (
          debugInfo.map((entry, index) => (
            <div key={index} className="mb-1">
              <span className="text-gray-500">[{entry.timestamp}]</span> {entry.info}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DebugCart;