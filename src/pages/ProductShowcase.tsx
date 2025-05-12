
// const fetchImages = async () => {
//   try {
//     const response = await fetch('/api/products/images', {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     if (!response.ok) throw new Error('Failed to fetch images');
//     const imageUrls = await response.json();
//     console.log('Fetched image URLs:', imageUrls);
//     // Use imageUrls in your component
//   } catch (err) {
//     console.error('Error fetching images:', err);
//   }
// };


import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  price: string;
  stock_quantity: number;
  image_url: string;
  categories: { id: number; name: string } | null;
  discount_percentage: number;
  cart: { id: number; product_id: number; quantity: number }[];
}

const ProductShowcase: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; productId: number | null }>({
    open: false,
    productId: null,
  });

  // Base URL for backend
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  // Normalize image URL
  const getImageUrl = (imageUrl: string) => {
    if (!imageUrl) {
      console.warn('No image_url provided, using placeholder');
      return '/placeholder-image.jpg';
    }
    if (imageUrl.startsWith('http')) return imageUrl;
    // Remove leading slash and ensure correct path
    return `${BASE_URL}${imageUrl}`;
  };

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      console.log('Fetched products:', data);
      // Log image URLs for debugging
      data.forEach((product: Product) => {
        const fullUrl = getImageUrl(product.image_url);
        console.log(`Product: ${product.name}, Raw image_url: ${product.image_url}, Full URL: ${fullUrl}`);
      });
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle product deletion
  const handleDelete = async (productId: number) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to delete product');
      setProducts(products.filter((product) => product.id !== productId));
      setDeleteDialog({ open: false, productId: null });
      toast.success('Product deleted successfully.');
    } catch (err) {
      console.error('Error deleting product:', err);
      toast.error('Failed to delete product.');
    }
  };

  return (
    <div className="w-full p-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Product Showcase</h2>
        <Link to="/products/create">
          <Button>Create Product</Button>
        </Link>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock Quantity</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    src={getImageUrl(product.image_url)}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) => {
                      console.error(`Failed to load image: ${product.image_url}, Full URL: ${getImageUrl(product.image_url)}`);
                      e.currentTarget.src = '/placeholder-image.jpg';
                    }}
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  ${parseFloat(product.price).toFixed(2)}
                  {product.discount_percentage > 0 &&
                    ` (-${product.discount_percentage}%)`}
                </TableCell>
                <TableCell>
                  {product.categories ? product.categories.name : 'No Category'}
                </TableCell>
                <TableCell>{product.stock_quantity}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link to={`/products/edit/${product.id}`}>
                      <Button variant="outline">Edit</Button>
                    </Link>
                    <Dialog
                      open={deleteDialog.open && deleteDialog.productId === product.id}
                      onOpenChange={(open) =>
                        setDeleteDialog({ open, productId: open ? product.id : null })
                      }
                    >
                      <DialogTrigger asChild>
                        <Button variant="destructive">Delete</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Product</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete "{product.name}"? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setDeleteDialog({ open: false, productId: null })}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleDelete(product.id)}
                          >
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ProductShowcase;