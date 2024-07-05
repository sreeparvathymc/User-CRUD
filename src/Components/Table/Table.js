import { Edit2, Eye, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Table = () => {
  const [posts, setPosts] = useState([]);
  // const navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        const reverseData = data.reverse();
        setPosts(reverseData)
      });
  }, []);

  

  const deletePost = (index) => {
    const newpost = [...posts];
    alert("want to Delete")
    newpost.splice(index, 1);
    // const deletedPost = newPost.splice(index,1)[0]
    setPosts(newpost);

    

    
            // toast.success("Product Deleted",
            // {
            //   position: "top-right",
            //   autoClose: 2000,
            // })



    // setTimeout(()=>{
      // alert("Want to delete")
            // toast.success("Delete Product")

            // toast.success("Product Deleted"),
            // {
              // position: "top-right",
            // }

  //     // toast.success("Delete Product",{
  //     //   onclose:()=> toast.dismiss("delete Product")
  //     // toast.success("Post Deleted")
    // },2000);
  };

// =========================================================================================================
// =========================================================================================================
// =================================================return========================================================
// =========================================================================================================
  return (
    <div>

      <div className="md:w-11/12 mx-auto pb-52">
      <button className="bg-blue-500 text-black px-6 py-1 mr-5 rounded-sm mt-10 mb-10">
          <Link to="/create">Create</Link>
        </button>
        <div className="">
          <table className="mx-auto border border-gray-900 w-full">


            <thead className="">
              <tr className="w-full text-left bg-blue-500 text-white">
                <th className="py-3 md:py-6 px-1">Product Name</th>
                <th className="border border-gray-600 px-1">Category</th>
                <th className="border border-gray-600 px-1">Price</th>
                <th className="border border-gray-600 px-1">Actions</th>
              </tr>
            </thead>

            <tbody className="w-full">


              {posts.map((post, index) => (
                <tr className="" key={post.id}>
                  <td className="py-3 border border-gray-600 px-1">
                    {post.title}
                  </td>
                  <td className="py-2 border border-gray-600 px-1">
                    {post.category}
                  </td>
                  <td className="py-2 border border-gray-600 px-1">
                    {post.price}
                  </td>
                  <td className="py-2 border border-gray-600 px-1">

                    <div className="flex">

                      {/* ==========================view======================== */}
                      <Link to={`/view/${post.id}`}>
                        <Eye style={{ color: "#6488ea" }} className="mr-5" />
                      </Link>


                        {/* ==========================Edit======================== */}
                      <Link to={`/edit/${post.id}`}>
                        <Edit2 style={{ color: "#6488ea" }} className="mr-5"/>
                      </Link>


                        {/* ==========================Delete======================== */}
                      <button className="" onClick={() => deletePost(index)}>
                        <Trash style={{ color: "#6488ea" }} />
                      </button>

                      {/* =========================================================== */}
                    </div>
                  </td>
                </tr>
              ))}







            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
