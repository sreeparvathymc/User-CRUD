import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useEffect } from "react";

const View = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    console.log(`fetch data for id: ${id}`);
    fetch(`http://localhost:3000/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
      });
  }, [id]);

  if (!post) return <div>loading</div>;

  return (
    <div className="md:w-8/12 w-10/12 mx-auto mt-20 py-10 px-6 border shadow-md rounded-lg">
      <h1 className="text-blue-700 text-2xl font-medium text-center mb-16">
        {post.title}
      </h1>

      <div className="flex justify-between gap-6">
        <div className="w-1/2">
          <h4 className="mb-3">
            <span className="mr-2 font-medium text-blue-500">
              Product Name:
            </span>
            {post.title}
          </h4>
          <h4 className="mb-3">
            <span className="mr-2 font-medium text-blue-500">Discription:</span>
            {post.description}
          </h4>
          <h4 className="mb-3">
            <span className="mr-2 font-medium text-blue-500">Category:</span>
            {post.category}
          </h4>
          <h4 className="mb-3">
            <span className="mr-2 font-medium text-blue-500">Price:</span>
            {post.price}
          </h4>

          <div className="mt-10">
            <div className="">
              <button className="bg-blue-700 text-white px-6 py-1 mr-5 rounded-sm">
                <Link to={`/edit/${post.id}`}>Edit</Link>
              </button>

              <button className="bg-blue-700 text-white px-6 py-1 mr-5 rounded-sm">
                <Link to="/">Back to Home</Link>
              </button>
            </div>
          </div>
        </div>

        <div className="w-1/2">
          {post.images && (
            <img
              src={post.images[0]}
              alt="product-img"
              className="w-full h-64"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default View;
