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
  // State for product form inputs
  const [formData, setFormData] = useState({
    image_url: "",
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    category_name: "", // Changed to category_name
    discount_percentage: "",
  });

  // State for product form submission status
  const [submitStatus, setSubmitStatus] = useState<{
    loading: boolean;
    error: string | null;
    success: boolean;
  }>({
    loading: false,
    error: null,
    success: false,
  });

  // State for category creation
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categorySubmitStatus, setCategorySubmitStatus] = useState<{
    loading: boolean;
    error: string | null;
    success: boolean;
  }>({
    loading: false,
    error: null,
    success: false,
  });

  // State for categories (populated dynamically)
  const [categories, setCategories] = useState<Category[]>([
    { id: 4, name: "Electronics" }, 
  ]);

  // Fetch categories (placeholder; replace with actual endpoint if available)
  const fetchCategories = async () => {
    try {
      console.log("Fetching categories...");
      // Replace with actual endpoint if available (e.g., /api/products/categories)
      // const response = await fetch("/api/products/categories");
      // if (!response.ok) throw new Error("Failed to fetch categories");
      // const data = await response.json();
      // setCategories(data);

      // For now, use fallback categories
      setCategories([{ id: 4, name: "Electronics" }]);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([{ id: 4, name: "Electronics" }]); // Fallback
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle product form input changes
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

  // Handle new category input change
  const handleNewCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(e.target.value);
  };

  // Handle category creation
  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) {
      setCategorySubmitStatus({
        loading: false,
        error: "Category name is required",
        success: false,
      });
      return;
    }

    setCategorySubmitStatus({ loading: true, error: null, success: false });

    try {
      console.log("Creating category with name:", newCategoryName);
      // Assume /api/products/newproduct can create a category by sending category_name
      const response = await fetch("/api/products/newproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category_name: newCategoryName.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Category creation failed:", errorData);
        throw new Error(errorData.message || "Failed to create category");
      }

      const result = await response.json();
      console.log("Category created:", result);
      // Assume backend returns the new category's id and name
      setCategories((prev) => [
        ...prev,
        { id: result.category_id || prev.length + 1, name: newCategoryName.trim() },
      ]);
      setCategorySubmitStatus({ loading: false, error: null, success: true });
      setNewCategoryName("");
    } catch (error) {
      setCategorySubmitStatus({
        loading: false,
        error: error instanceof Error ? error.message : "An error occurred while creating the category",
        success: false,
      });
    }
  };

  // Handle product form submission
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
        category_name: formData.category_name.trim(), // Send category_name
        discount_percentage: discount,
      };

      console.log("Form data before submission:", formData);
      console.log("Submitting product payload:", payload);

      const response = await fetch("/api/products/newproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Product creation failed:", errorData);
        throw new Error(errorData.message || "Failed to create product");
      }

      const result = await response.json();
      console.log("Product created:", result);
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

      if (onProductAction) {
        onProductAction();
      }
    } catch (error) {
      setSubmitStatus({
        loading: false,
        error: error instanceof Error ? error.message : "An error occurred while creating the product",
        success: false,
      });
    }
  };

  return (
    <div className="w-full p-10">
      {/* Category Creation Form */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Create New Category</h2>
        <form onSubmit={handleCategorySubmit} className="space-y-4">
          <div>
            <label htmlFor="new_category" className="block text-sm font-medium">
              Category Name *
            </label>
            <Input
              id="new_category"
              value={newCategoryName}
              onChange={handleNewCategoryChange}
              placeholder="Enter category name (e.g., Electronics)"
              className="w-full"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={categorySubmitStatus.loading}
            className="w-full"
          >
            {categorySubmitStatus.loading ? "Creating..." : "Create Category"}
          </Button>
          {categorySubmitStatus.error && (
            <p className="text-red-500 text-sm">{categorySubmitStatus.error}</p>
          )}
          {categorySubmitStatus.success && (
            <p className="text-green-500 text-sm">Category created successfully!</p>
          )}
        </form>
      </div>

      {/* Product Creation Form */}
      <h2 className="text-lg font-medium mb-4">Create New Product</h2>
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
          {categories.length === 0 ? (
            <p className="text-red-500 text-sm">
              No categories available. Please create a category first.
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
            disabled={submitStatus.loading || categories.length === 0}
            className="w-full"
          >
            {submitStatus.loading ? "Creating..." : "Create Product"}
          </Button>
        </div>

        {submitStatus.error && (
          <p className="text-red-500 text-sm">{submitStatus.error}</p>
        )}
        {submitStatus.success && (
          <p className="text-green-500 text-sm">Product created successfully!</p>
        )}
      </form>
    </div>
  );
};

export default Products;