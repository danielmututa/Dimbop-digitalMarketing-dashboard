// import { ArrowRight } from 'lucide-react';
// import { NavLink } from 'react-router-dom';
// import blogIpn from '../Images/blogIpn.jpg';
// import blogNk from '../Images/blogNk.jpg';
// import blogSUM from '../Images/blogSUM.jpg';

// interface BlogCard {
//   img: string;
//   type: string;
//   des: string;
//   btn: string;
// }

// const Blogs = () => {
//   const blogs: BlogCard[] = [
//     {
//       img: blogIpn,
//       type: "Iphone",
//       des: "Known for sleek design, powerful processors, and top-notch security, the iPhone leads with models like the iPhone 15. Apple's MacBooks offer powerful laptops with seamless integration into the iOS ecosystem.",
//       btn: "Read Blog"
//     },
//     {
//       img: blogNk,
//       type: "Nokia",
//       des: "The Nokia X30 offers a reliable, budget-friendly option with a focus on sustainability. Nokia's laptops provide durable, cost-effective performance.",
//       btn: "Read Blog"
//     },
//     {
//       img: blogSUM,
//       type: "Samsumg",
//       des: "The Galaxy S23 and Galaxy Z Flip 5 impress with stunning displays, great battery life, and foldable tech. Samsung's Galaxy Book laptops deliver sleek designs and solid performance.",
//       btn: "Read Blog"
//     }
//   ];

//   return (
//     <div className="flex items-center justify-center py-[50px] px-[20px] md:px-[40px] md:py-[60px] lg:px-[80px] lg:py-[60px] xl:px-[100px] xl:py-[80px]">
//       <div className='flex flex-col md:flex-row md:flex-wrap gap-6 justify-between w-full'>
//         {
//           blogs.map((card, index) => (
//             <div key={index} className="w-full mb-[28px] md:mb-0 md:w-[48%] lg:w-[30%] group">
//               <img
//                 loading='lazy'
//                 src={card.img}
//                 alt={card.type}
//                 className='h-[300px] md:h-[250px] lg:h-[300px] w-full object-cover'
//               />
//               <p className="text-sm lg:text-[16px] font-montserrat text-gray-500 pt-[10px]">{card.type}</p>
//               <p className="text-[14px] font-montserratBold pt-[8px] pb-[8px]">{card.des}</p>

//               <NavLink to="#" className="text-[16px] font-montserrat flex items-center gap-2 text-buttons underline">
//                 {card.btn}
//                 <ArrowRight className='group-hover:translate-x-2 duration-500' size={20} />
//               </NavLink>
//             </div>
//           ))
//         }
//       </div>
//     </div>
//   );
// }

// export default Blogs;














import { ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GetBlogs } from '@/api';

interface BlogCard {
  id: number;
  img: string;
  type: string;
  des: string;
  btn: string;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await GetBlogs();
        
        // Transform the backend data to match your frontend structure
        const transformedBlogs = response.data.map((blog: any) => ({
          id: blog.id,
          img: blog.blog_images?.[0]?.image_url || blog.hero_image || '/placeholder-image.jpg',
          type: blog.title || 'No Title',
          des: blog.content || 'No content available',
          btn: "Read Blog"
        }));
        
        setBlogs(transformedBlogs);
      } catch (err) {
        setError('Failed to load blogs');
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center py-[50px]">Loading blogs...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center py-[50px] text-red-500">{error}</div>;
  }

  if (blogs.length === 0) {
    return <div className="flex items-center justify-center py-[50px]">No blogs available.</div>;
  }

  return (
    <div className="flex items-center justify-center py-[50px] px-[20px] md:px-[40px] md:py-[60px] lg:px-[80px] lg:py-[60px] xl:px-[100px] xl:py-[80px]">
      <div className='flex flex-col md:flex-row md:flex-wrap gap-6 justify-between w-full'>
        {blogs.map((card) => (
          <div key={card.id} className="w-full mb-[28px] md:mb-0 md:w-[48%] lg:w-[30%] group">
            <img
              loading='lazy'
              src={card.img}
              alt={card.type}
              className='h-[300px] md:h-[250px] lg:h-[300px] w-full object-cover'
              onError={(e) => {
                e.currentTarget.src = '/placeholder-image.jpg';
              }}
            />
            <p className="text-sm lg:text-[16px] font-montserrat text-gray-500 pt-[10px]">{card.type}</p>
            <p className="text-[14px] font-montserratBold pt-[8px] pb-[8px] line-clamp-3">{card.des}</p>

            <NavLink 
              to={`/blog/${card.id}`} 
              className="text-[16px] font-montserrat flex items-center gap-2 text-buttons underline"
            >
              {card.btn}
              <ArrowRight className='group-hover:translate-x-2 duration-500' size={20} />
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blogs;