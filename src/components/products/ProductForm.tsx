"use client";

import React, { useState, useEffect } from "react";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export type ProductFormData = {
  title: string;
  description: string;
  price: number | "";
  thumbnail: string;
};

interface ProductFormProps {
  initialData?: ProductFormData;
  loading: boolean;
  onSubmit: (data: ProductFormData) => Promise<void>;
}

export function ProductForm({
  initialData,
  loading,
  onSubmit,
}: ProductFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [price, setPrice] = useState<number | "">(initialData?.price ?? "");
  const [thumbnail, setThumbnail] = useState(initialData?.thumbnail || "");

  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setPrice(initialData.price);
      setThumbnail(initialData.thumbnail);
    }
  }, [initialData]);

  function validate() {
    const newErrors: { [key: string]: string | null } = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (price === "" || price <= 0)
      newErrors.price = "Price must be positive number";
    if (!thumbnail.trim()) newErrors.thumbnail = "Thumbnail URL is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({ title, description, price: Number(price), thumbnail });
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="max-w-xl mx-auto px-4 py-8"
    >
      <Input
        id="title"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={errors.title}
        disabled={loading}
        required
      />
      <Input
        id="description"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={errors.description}
        disabled={loading}
        required
      />
      <Input
        id="price"
        label="Price"
        type="number"
        min={0.01}
        step={0.01}
        value={price === "" ? "" : String(price)}
        onChange={(e) =>
          setPrice(e.target.value === "" ? "" : Number(e.target.value))
        }
        error={errors.price}
        disabled={loading}
        required
      />
      <Input
        id="thumbnail"
        label="Thumbnail URL"
        type="url"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
        error={errors.thumbnail}
        disabled={loading}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
