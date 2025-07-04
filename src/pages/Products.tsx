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
import { useNavigate, useParams } from "react-router-dom";

interface ProductTableProps {
  onProductAction?: () => void;
}

interface Category {
  id: number;
  name: string;
}

const Products: React.FC<ProductTableProps> = ({ onProductAction }) => {
  const { id } = useParams<{ id: string }>(); // For editing
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    category_name: "",
    discount_percentage: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [useNewCategory, setUseNewCategory] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    loading: boolean;
    error: string | null;
    success: boolean;
  }>({
    loading: false,
    error: null,
    success: false,
  });
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      console.log("Fetching categories...");
      const response = await fetch("/api/products", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch products");
      const products = await response.json();

      const uniqueCategories: Category[] = [];
      const seenIds = new Set<number>();
      for (const product of products) {
        if (
          product.categories &&
          product.categories.id &&
          product.categories.name &&
          !seenIds.has(product.categories.id)
        ) {
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

  // Fetch product for editing
  useEffect(() => {
    fetchCategories();
    if (id) {
      // Edit mode
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/products/${id}`);
          if (!response.ok) throw new Error("Failed to fetch product");
          const product = await response.json();
          setFormData({
            name: product.name,
            description: product.description || "",
            price: product.price,
            stock_quantity: product.stock_quantity.toString(),
            category_name: product.categories?.name || "",
            discount_percentage: product.discount_percentage.toString(),
          });
        } catch (error) {
          console.error("Error fetching product:", error);
          setSubmitStatus({
            loading: false,
            error: "Failed to load product.",
            success: false,
          });
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  };

  const handleCategoryChange = (value: string) => {
    console.log("Selected category_name:", value);
    setFormData((prev) => ({
      ...prev,
      category_name: value,
    }));
  };

  const toggleCategoryInput = () => {
    setUseNewCategory((prev) => !prev);
    setFormData((prev) => ({
      ...prev,
      category_name: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, error: null, success: false });

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
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name.trim());
      formDataToSend.append("description", formData.description.trim() || "");
      formDataToSend.append("price", formData.price);
      formDataToSend.append("stock_quantity", formData.stock_quantity);
      formDataToSend.append("category_name", formData.category_name.trim());
      formDataToSend.append("discount_percentage", formData.discount_percentage || "0");
      if (imageFile) {
        formDataToSend.append("file", imageFile);
      }

      const url = id ? `/api/products/${id}` : "/api/products/newproduct";
      const method = id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Submission failed:", errorData);
        throw new Error(errorData.message || "Failed to create/update product");
      }

      const result = await response.json();
      console.log("Submission successful:", result);
      setSubmitStatus({ loading: false, error: null, success: true });

      setFormData({
        name: "",
        description: "",
        price: "",
        stock_quantity: "",
        category_name: "",
        discount_percentage: "",
      });
      setImageFile(null);
      setUseNewCategory(false);

      await fetchCategories();
      if (onProductAction) onProductAction();
      navigate('/'); // Redirect to ProductShowcase
    } catch (error) {
      setSubmitStatus({
        loading: false,
        error: error instanceof Error ? error.message : "An error occurred while submitting",
        success: false,
      });
    }
  };

  return (
    <div className="w-full py-5  lg:py-10">
      <h2 className="text-lg lg:text-2xl font-medium mb-4">{id ? "Edit Product" : "Create New Product/Category"}</h2>
      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        <div>
          <label htmlFor="image" className="block text-sm font-medium">
            Product Image (Optional)
          </label>
          <Input
            id="image"
            name="file"
            type="file"
            accept="image/*"
            className="w-full"
            onChange={handleFileChange}
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
            {submitStatus.loading ? "Submitting..." : id ? "Update Product" : "Create Product"}
          </Button>
        </div>

        {submitStatus.error && (
          <p className="text-red-500 text-sm">{submitStatus.error}</p>
        )}
        {submitStatus.success && (
          <p className="text-green-500 text-sm">{id ? "Product updated" : "Product created"} successfully!</p>
        )}
      </form>
    </div>
  );
};

export default Products;