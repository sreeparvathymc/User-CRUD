import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [newImageUrl, setNewImageUrl] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
      });
  }, [id]);

  if (!post) return <div>Loading...</div>;

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedPost = { ...post };
    if (newImageUrl) {
      updatedPost.images = [newImageUrl];
    }
    fetch(`http://localhost:3000/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    })
      .then((response) => response.json())
      .then((updatedPost) => {
        console.log("updated post", updatedPost);
        toast.success("Updated Sucessfully");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div>
      <ToastContainer className="top-4" />
      <div className="w-11/12 mx-auto form-container mt-20">
        <form onSubmit={handleUpdate}>
          <div className="md:w-8/12 w-10/12 mx-auto py-10 px-6 border shadow-md rounded-lg">
            <h1 className="text-blue-700 text-2xl font-medium text-center mb-16">
              {post.title}
            </h1>

            <div className="flex justify-between gap-5 mb-4">
              <div className="w-1/2">
                <label
                  htmlFor="title"
                  className="font-medium text-blue-500 mb-2"
                >
                  Product Name
                </label>
                <input
                  name="title"
                  placeholder="Product Name"
                  value={post.title || ""}
                  onChange={handleFileChange}
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
                  name="category"
                  placeholder="Category"
                  value={post.category}
                  onChange={handleChange}
                  className="bg-blue-50 w-full rounded-sm py-2 px-2 focus:outline-none focus:ring-0"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="font-medium text-blue-500"
              >
                Description
              </label>

              <textarea
                name="description"
                value={post.description}
                onChange={handleChange}
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
                name="price"
                placeholder="Price"
                value={post.price}
                onChange={handleChange}
                className="bg-blue-50 mb-4 rounded-sm py-2 px-2 focus:outline-none focus:ring-0"
              />
            </div>
            <div className="mb-4">
              <div className="py-2 px-2 flex justify-between items-center border-2 border-gray-500 border-dashed">
                <div className="">
                  <input
                    type="file"
                    id="image"
                    onChange={handleFileChange}
                    placeholder="upload Image"
                    className="border border-gray-600 py-2 px-3"
                  />
                </div>
                <div>
                  <label
                    htmlFor="image"
                    className="font-medium text-blue-500 mr-3"
                  >
                    {newImageUrl ? "Updated Image" : "Image"}
                  </label>

                  {newImageUrl ? (
                    <img
                      src={newImageUrl}
                      alt="Product img"
                      className="w-80 h-80 object-cover"
                    />
                  ) : (
                    post.images &&
                    post.images[0] && (
                      <img
                        src={post.images[0]}
                        alt="Product img"
                        className="w-80 h-80 object-cover"
                      />
                    )
                  )}
                </div>
              </div>

              <div className="mt-10">
                <button className="bg-blue-700 text-white px-6 py-1 mr-5 rounded-sm">
                  Update
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
