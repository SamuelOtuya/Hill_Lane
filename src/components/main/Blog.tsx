import { useState, useEffect } from "react";
import { FaHeart, FaComment, FaEye } from "react-icons/fa";
import API from "../../api/API"; 

interface BlogPost {
  id: number;
  title: string;
  image: string;
  date: string;
  comments: number;
  likes: number;
  viewed: number;
}

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const response = await API.get("client/news", {
        params: { limit: 10 },
      });
  
      console.log("API response:", response.data); // Debugging API response
  
      // Access the correct data path
      if (response.data && Array.isArray(response.data.newsArticles)) {
        setBlogs(response.data.newsArticles);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      setError("Failed to fetch blogs. Please try again later.");
      console.error("Error fetching blogs:", err);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogs();
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <div className="md:pl-[70px] pl-5 pt-[78px]">
        {/* <BreadcrumbComponent l2="blogs" /> */}
      </div>
      {/* <h1 className="text-2xl md:pl-[110px] pl-5 font-bold text-left text-gray-800 mb-8 pt-10">
        Our Latest Blogs
      </h1> */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {Array.isArray(blogs) && blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(blog.date).toLocaleDateString()} • {blog.comments} comments
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-gray-600 flex items-center space-x-4">
                    <div className="flex items-center">
                      <FaHeart className="text-red-500" />
                      <span className="ml-1">{blog.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <FaComment className="text-blue-500" />
                      <span className="ml-1">{blog.comments}</span>
                    </div>
                    <div className="flex items-center">
                      <FaEye className="text-green-500" />
                      <span className="ml-1">{blog.viewed}</span>
                    </div>
                  </div>
                  <a
                    href={`/single-blog/${blog.id}-${blog.title.replace(/\s+/g, "-").toLowerCase()}`}
                    className="text-red-600 hover:underline"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No blogs available</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
