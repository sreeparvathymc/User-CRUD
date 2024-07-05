import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [images, setImages] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!title || !category || !description || !price || !images) {
      toast.error("All fields are Required");
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newProduct = {
      title,
      category,
      description,
      price,
      images: imageUrl ? [imageUrl] : [],
    };
    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Failed to add poroduct");
      }
      const productData = await response.json();
      console.log("Sucess:", productData);
      toast("Product added Sucessfully");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log("Error", error);
      toast.error("Failed to add Product");
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImages(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="w-11/12 mx-auto mt-20 form-container">
      <ToastContainer className="top-4" />

      <form onSubmit={handleSubmit}>
        <div className="md:w-8/12 w-10/12 mx-auto py-10 px-6 border shadow-md rounded-lg">
          <div className="flex justify-between gap-5 mb-4">
            <div className="w-1/2">
              <label htmlFor="title" className="font-medium text-blue-500 mb-2">
                Product Name
              </label>
              <input
                placeholder="Product Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-blue-50 w-full rounded-sm py-2 px-2 focus:outline-none focus:ring-0"
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="category"
                className="font-medium text-blue-500 mb-2"
              >
                category
              </label>
              <input
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-blue-50 w-full rounded-sm py-2 px-2 focus:outline-none focus:ring-0"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="font-medium text-blue-500">
              Description
            </label>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-blue-50 w-full rounded-sm py-2 px-2 focus:outline-none focus:ring-0"
              rows="4"
              cols="50"
            />
          </div>
          <div>
            <label htmlFor="price" className="font-medium text-blue-500 mr-3">
              Price
            </label>
            <input
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-blue-50 mb-4 rounded-sm py-2 px-2 focus:outline-none focus:ring-0"
            />
          </div>

          <div className="px-3 py-2 flex justify-between items-center border-2 border-gray-500 border-dashed">
            <div className="mb-10 image ">
              <input
                type="file"
                placeholder="upload Image"
                className="border border-gray-600 py-2 px-3"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>

            <div className="w-80 h-80 bg-gray-300">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
            </div>
          </div>

          <div className="mt-20">
            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-1 mr-5 rounded-sm"
            >
              Add
            </button>
            <button
              type=""
              className="bg-blue-700 text-white px-6 py-1 mr-5 rounded-sm"
            >
              <Link to="/">Back to Home</Link>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Create;

