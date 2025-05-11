import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState, useEffect } from "react";

interface ProductTableProps {
  onProductAction?: () => void;
}

interface Category {
  id: number;
  name: string;
}

const Products: React.FC<ProductTableProps> = ({ onProductAction }) => {
  // State for form inputs (combined product and category)
  const [formData, setFormData] = useState({
    image_url: "",
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    category_name: "", // Selected or new category name
    discount_percentage: "",
  });

  // State for toggling between selecting existing category or entering new one
  const [useNewCategory, setUseNewCategory] = useState(false);

  // State for form submission status
  const [submitStatus, setSubmitStatus] = useState<{
    loading: boolean;
    error: string | null;
    success: boolean;
  }>({
    loading: false,
    error: null,
    success: false,
  });

  // State for categories (populated dynamically)
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories from /api/products
  const fetchCategories = async () => {
    try {
      console.log("Fetching categories from /api/products...");
      const response = await fetch("/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch products");
      const products = await response.json();

      // Extract unique categories from products
      const uniqueCategories: Category[] = [];
      const seenIds = new Set<number>();
      for (const product of products) {
        if (product.categories && product.categories.id && !seenIds.has(product.categories.id)) {
          uniqueCategories.push({
            id: product.categories.id,
            name: product.categories.name,
          });
          seenIds.add(product.categories.id);
        }
      }

      console.log("Fetched categories:", uniqueCategories);
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
      setSubmitStatus({
        loading: false,
        error: "Failed to load categories. Please try again.",
        success: false,
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle category selection
  const handleCategoryChange = (value: string) => {
    console.log("Selected category_name:", value);
    setFormData((prev) => ({
      ...prev,
      category_name: value,
    }));
  };

  // Toggle between existing and new category
  const toggleCategoryInput = () => {
    setUseNewCategory((prev) => !prev);
    setFormData((prev) => ({
      ...prev,
      category_name: "",
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, error: null, success: false });

    // Validation
    const missingFields: string[] = [];
    if (!formData.name.trim()) missingFields.push("name");
    if (!formData.price) missingFields.push("price");
    if (!formData.stock_quantity) missingFields.push("stock");
    if (!formData.category_name.trim()) missingFields.push("category");

    if (missingFields.length > 0) {
      setSubmitStatus({
        loading: false,
        error: `Please fill in the following required fields: ${missingFields.join(", ")}`,
        success: false,
      });
      return;
    }

    // Parse inputs
    const price = parseFloat(formData.price);
    const stock = parseInt(formData.stock_quantity, 10);
    const discount = formData.discount_percentage
      ? parseFloat(formData.discount_percentage)
      : 0;

    if (isNaN(price) || price <= 0) {
      setSubmitStatus({
        loading: false,
        error: "Price must be a positive number",
        success: false,
      });
      return;
    }
    if (isNaN(stock) || stock < 0) {
      setSubmitStatus({
        loading: false,
        error: "Stock quantity must be a non-negative integer",
        success: false,
      });
      return;
    }
    if (discount < 0) {
      setSubmitStatus({
        loading: false,
        error: "Discount percentage cannot be negative",
        success: false,
      });
      return;
    }

    try {
      const payload = {
        image_url: formData.image_url.trim() || null,
        name: formData.name.trim(),
        description: formData.description.trim() || null,
        price,
        stock_quantity: stock,
        category_name: formData.category_name.trim(),
        discount_percentage: discount,
      };

      console.log("Submitting payload:", payload);

      const response = await fetch("/api/products/newproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Submission failed:", errorData);
        throw new Error(errorData.message || "Failed to create product/category");
      }

      const result = await response.json();
      console.log("Submission successful:", result);
      setSubmitStatus({ loading: false, error: null, success: true });

      // Reset form
      setFormData({
        image_url: "",
        name: "",
        description: "",
        price: "",
        stock_quantity: "",
        category_name: "",
        discount_percentage: "",
      });
      setUseNewCategory(false);

      // Refresh categories to include any new ones created
      await fetchCategories();

      if (onProductAction) {
        onProductAction();
      }
    } catch (error) {
      setSubmitStatus({
        loading: false,
        error: error instanceof Error ? error.message : "An error occurred while submitting",
        success: false,
      });
    }
  };

  return (
    <div className="w-full p-10">
      <h2 className="text-lg font-medium mb-4">Create New Product/Category</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="image_url" className="block text-sm font-medium">
            Image URL (Optional)
          </label>
          <Input
            id="image_url"
            name="image_url"
            className="w-full"
            placeholder="Enter image URL"
            value={formData.image_url}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Product Name *
          </label>
          <Input
            id="name"
            name="name"
            className="w-full"
            placeholder="Enter product name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Product Description (Optional)
          </label>
          <Input
            id="description"
            name="description"
            className="w-full"
            placeholder="Enter product description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium">
            Product Price *
          </label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0.01"
            className="w-full"
            placeholder="Enter product price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="stock_quantity" className="block text-sm font-medium">
            Product Stock *
          </label>
          <Input
            id="stock_quantity"
            name="stock_quantity"
            type="number"
            min="0"
            className="w-full"
            placeholder="Enter product stock"
            value={formData.stock_quantity}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="category_name" className="block text-sm font-medium">
            Product Category *
          </label>
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              id="use_new_category"
              checked={useNewCategory}
              onChange={toggleCategoryInput}
            />
            <label htmlFor="use_new_category" className="text-sm">
              Create new category
            </label>
          </div>
          {useNewCategory ? (
            <Input
              id="category_name"
              name="category_name"
              className="w-full"
              placeholder="Enter new category name (e.g., Books)"
              value={formData.category_name}
              onChange={handleInputChange}
              required
            />
          ) : categories.length === 0 ? (
            <p className="text-red-500 text-sm">
              No categories available. Please enter a new category.
            </p>
          ) : (
            <Select
              onValueChange={handleCategoryChange}
              value={formData.category_name || ""}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div>
          <label htmlFor="discount_percentage" className="block text-sm font-medium">
            Product Discount (%) (Optional)
          </label>
          <Input
            id="discount_percentage"
            name="discount_percentage"
            type="number"
            step="0.01"
            min="0"
            className="w-full"
            placeholder="Enter product discount"
            value={formData.discount_percentage}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Button
            type="submit"
            disabled={submitStatus.loading}
            className="w-full"
          >
            {submitStatus.loading ? "Creating..." : "Create Product/Category"}
          </Button>
        </div>

        {submitStatus.error && (
          <p className="text-red-500 text-sm">{submitStatus.error}</p>
        )}
        {submitStatus.success && (
          <p className="text-green-500 text-sm">Product/Category created successfully!</p>
        )}
      </form>
    </div>
  );
};

export default Products;