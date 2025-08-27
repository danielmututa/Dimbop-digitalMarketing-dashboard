import { useParams } from 'react-router-dom';
import { GetBlogById } from '@/api';
import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { BlogPostSM } from '@/components/interfaces/blog';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogPostSM | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!id) {
          throw new Error('No blog ID provided');
        }

        const response = await GetBlogById(id);
        
        if (!response) {
          throw new Error('Blog not found');
        }

        setBlog(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blog');
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Create an array of all available images for the carousel
  const getCarouselImages = () => {
    if (!blog) return [];
    
    const images = [
      blog.hero_image,
      blog.blog_image_one,
      blog.blog_image_two,
      blog.blog_image_three,
      blog.annotation_image_one,
      blog.annotation_image_two,
      blog.annotation_image_three,
      blog.annotation_image_four,
      blog.annotation_image_five,
      ...(blog.blog_images?.map((img) => img.image_url) || [])
    ];

    return images.filter((img): img is string => !!img);
  };

  const renderContentSection = (content?: string, className = '') => {
    if (!content) return null;
    
    return (
      <div 
        className={`prose max-w-none mb-4 ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };

  const renderKeyPoint = (
    title?: string,
    description?: string,
    image?: string,
    index: number = 0
  ) => {
    if (!title && !description) return null;

    return (
      <div key={index} className="mb-8">
        {title && <h3 className="text-xl font-bold mb-2">{title}</h3>}
        {description && renderContentSection(description)}
        {image && (
          <div className="mt-4 flex justify-center">
            <img
              src={image}
              alt={title || `Blog image ${index}`}
              className="max-h-96 object-contain rounded-lg border"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="px-4 md:px-8 lg:px-16 py-12">
        <Skeleton className="h-8 w-3/4 mb-6" />
        <div className="grid gap-6">
          <Skeleton className="h-64 w-full" />
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 md:px-8 lg:px-16 py-12">
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="px-4 md:px-8 lg:px-16 py-12">
        <Alert>
          <AlertTitle>Not Found</AlertTitle>
          <AlertDescription>The requested blog could not be found.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const carouselImages = getCarouselImages();

  return (
    <div className="px-4 md:px-8 lg:px-16 py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{blog.title}</h1>
      
      {/* Carousel for images */}
      {carouselImages.length > 0 ? (
        <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
          <Carousel 
            showThumbs={false} 
            infiniteLoop 
            useKeyboardArrows 
            autoPlay
            showStatus={false}
            showArrows={carouselImages.length > 1}
            showIndicators={carouselImages.length > 1}
          >
            {carouselImages.map((img, index) => (
              <div key={index} className="h-[400px] md:h-[500px] relative">
                <img 
                  src={img} 
                  alt={`Blog image ${index + 1}`}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-blog.jpg';
                  }}
                />
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <div className="mb-8 h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
          No images available
        </div>
      )}

      {/* Blog content sections */}
      <div className="prose max-w-none">
        {blog.epigraph && (
          <blockquote className="text-xl italic border-l-4 pl-4 mb-6 text-gray-600">
            {blog.epigraph}
          </blockquote>
        )}

        {renderContentSection(blog.first_paragraph)}
        {renderContentSection(blog.second_paragraph)}
        {renderContentSection(blog.third_paragraph)}
        {renderContentSection(blog.fourth_paragraph)}
        {renderContentSection(blog.fifth_paragraph)}

        {/* Key points section */}
        <div className="mt-8 space-y-8">
          {renderKeyPoint(
            blog.point_one_title,
            blog.point_one_description,
            blog.annotation_image_one,
            1
          )}
          {renderKeyPoint(
            blog.point_two_title,
            blog.point_two_description,
            blog.annotation_image_two,
            2
          )}
          {renderKeyPoint(
            blog.point_three_title,
            blog.point_three_description,
            blog.annotation_image_three,
            3
          )}
          {renderKeyPoint(
            blog.point_four_title,
            blog.point_four_description,
            blog.annotation_image_four,
            4
          )}
          {renderKeyPoint(
            blog.point_five_title,
            blog.point_five_description,
            blog.annotation_image_five,
            5
          )}
        </div>
      </div>

      {/* Blog metadata */}
      <div className="mt-12 pt-6 border-t">
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {blog.created_at && (
            <div>
              <span className="font-medium">Published: </span>
              {new Date(blog.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          )}
          {blog.categories && (
            <div>
              <span className="font-medium">Categories: </span>
              {blog.categories}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;



// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { GetBlogById } from '@/api';

// interface BlogData {
//   id: number;
//   title: string;
//   description: string;
//   content: string;
//   image_url: string | null;
//   created_at: string;
//   hero_image: string | null;
//   blog_image_one: string | null;
//   blog_image_two: string | null;
//   blog_image_three: string | null;
//   author_avatar: string | null;
//   epigraph: string | null;
//   first_paragraph: string | null;
//   second_paragraph: string | null;
//   third_paragraph: string | null;
//   fourth_paragraph: string | null;
//   fifth_paragraph: string | null;
//   annotation_image_one: string | null;
//   annotation_image_two: string | null;
//   annotation_image_three: string | null;
//   annotation_image_four: string | null;
//   annotation_image_five: string | null;
//   point_one_title: string | null;
//   point_one_description: string | null;
//   point_two_title: string | null;
//   point_two_description: string | null;
//   point_three_title: string | null;
//   point_three_description: string | null;
//   point_four_title: string | null;
//   point_four_description: string | null;
//   point_five_title: string | null;
//   point_five_description: string | null;
//   categories: string | null;
//   meta_og_title: string | null;
//   blog_images: Array<{
//     id: number;
//     blog_id: number;
//     image_url: string;
//   }>;
// }

// const Blog = () => {
//   const { id } = useParams<{ id: string }>();
//   const [blog, setBlog] = useState<BlogData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       if (!id) return;
      
//       try {
//         setLoading(true);
//         const response = await GetBlogById(id);
//         setBlog(response);
//       } catch (err) {
//         setError('Failed to load blog');
//         console.error('Error fetching blog:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlog();
//   }, [id]);

//   if (loading) {
//     return <div className="flex items-center justify-center py-[50px]">Loading blog...</div>;
//   }

//   if (error) {
//     return <div className="flex items-center justify-center py-[50px] text-red-500">{error}</div>;
//   }

//   if (!blog) {
//     return <div className="flex items-center justify-center py-[50px]">Blog not found.</div>;
//   }

//   // Prepare carousel images
//   const carouselImages = [
//     blog.annotation_image_one,
//     blog.annotation_image_two, 
//     blog.annotation_image_three,
//     blog.annotation_image_four,
//     blog.annotation_image_five
//   ].filter(img => img !== null) as string[];

//   // Prepare points data
//   const points = [
//     { title: blog.point_one_title, description: blog.point_one_description },
//     { title: blog.point_two_title, description: blog.point_two_description },
//     { title: blog.point_three_title, description: blog.point_three_description },
//     { title: blog.point_four_title, description: blog.point_four_description },
//     { title: blog.point_five_title, description: blog.point_five_description }
//   ].filter(point => point.title && point.description);

//   // Prepare blog side data
//   const blogSideData = blog.blog_images?.map((img, index) => ({
//     img: img.image_url,
//     head: blog.title || 'No Title',
//     date: new Date(blog.created_at).toLocaleDateString(),
//     type: blog.categories || 'Uncategorized',
//     des: blog.meta_og_title ? 
//       (blog.meta_og_title.length > 90 ? blog.meta_og_title.substring(0, 90) + '...' : blog.meta_og_title) 
//       : 'No description available'
//   })) || [];

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long', 
//       day: 'numeric'
//     });
//   };

//   return (
//     <div className="py-[50px] px-[20px] md:px-[40px] lg:px-[80px] xl:px-[100px]">
//       {/* Hero Section */}
//       <div className="mb-8">
//         <h1 className="text-3xl md:text-4xl font-montserratBold mb-4">{blog.title}</h1>
//         <p className="text-gray-600 mb-2">{formatDate(blog.created_at)} | {blog.categories}</p>
//         {blog.epigraph && (
//           <p className="italic text-lg text-gray-700 mb-6">"{blog.epigraph}"</p>
//         )}
//         {blog.hero_image && (
//           <img 
//             src={blog.hero_image} 
//             alt={blog.title}
//             className="w-full h-[400px] object-cover rounded-lg mb-6"
//             onError={(e) => {
//               e.currentTarget.src = '/placeholder-image.jpg';
//             }}
//           />
//         )}
//       </div>

//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Main Content */}
//         <div className="flex-1">
//           {/* Carousel Section */}
//           {carouselImages.length > 0 && (
//             <div className="mb-8">
//               <div className="relative">
//                 <img 
//                   src={carouselImages[currentImageIndex]}
//                   alt={`Carousel ${currentImageIndex + 1}`}
//                   className="w-full h-[300px] object-cover rounded-lg"
//                   onError={(e) => {
//                     e.currentTarget.src = '/placeholder-image.jpg';
//                   }}
//                 />
//                 {carouselImages.length > 1 && (
//                   <div className="flex justify-center mt-4 gap-2">
//                     {carouselImages.map((_, index) => (
//                       <button
//                         key={index}
//                         onClick={() => setCurrentImageIndex(index)}
//                         className={`w-3 h-3 rounded-full ${
//                           currentImageIndex === index ? 'bg-blue-600' : 'bg-gray-300'
//                         }`}
//                       />
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Points Section */}
//           {points.length > 0 && (
//             <div className="mb-8">
//               <h2 className="text-2xl font-montserratBold mb-6">Key Points</h2>
//               <div className="space-y-6">
//                 {points.map((point, index) => (
//                   <div key={index} className="border-l-4 border-blue-600 pl-6">
//                     <h3 className="text-xl font-montserratBold mb-2">{point.title}</h3>
//                     <p className="text-gray-700 font-montserrat">{point.description}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Content Paragraphs */}
//           <div className="prose max-w-none">
//             {blog.first_paragraph && (
//               <p className="mb-4 font-montserrat">{blog.first_paragraph}</p>
//             )}
//             {blog.second_paragraph && (
//               <p className="mb-4 font-montserrat">{blog.second_paragraph}</p>
//             )}
//             {blog.third_paragraph && (
//               <p className="mb-4 font-montserrat">{blog.third_paragraph}</p>
//             )}
//             {blog.fourth_paragraph && (
//               <p className="mb-4 font-montserrat">{blog.fourth_paragraph}</p>
//             )}
//             {blog.fifth_paragraph && (
//               <p className="mb-4 font-montserrat">{blog.fifth_paragraph}</p>
//             )}
//             {blog.content && (
//               <p className="mb-4 font-montserrat">{blog.content}</p>
//             )}
//           </div>
//         </div>

//         {/* Sidebar */}
//         {blogSideData.length > 0 && (
//           <div className="flex w-full lg:w-[38%] mt-8 lg:mt-0">
//             <div className="flex w-full gap-4 justify-between flex-col">
//               {blogSideData.map((item, index) => (
//                 <div key={index} className="flex gap-4 justify-between items-center">
//                   <img 
//                     src={item.img} 
//                     className='h-[120px] lg:h-[98px] object-cover w-[80px] md:w-[200px]' 
//                     alt={item.head}
//                     onError={(e) => {
//                       e.currentTarget.src = '/placeholder-image.jpg';
//                     }}
//                   />
//                   <div className="">
//                     <p className='font-montserratBold'>{item.head}</p>
//                     <div className="flex gap-[4px]">
//                       <p className='font-montserrat text-sm'>{item.date}</p> | 
//                       <p className='font-montserrat text-sm'>{item.type}</p>
//                     </div>
//                     <p className='font-montserrat text-sm'>{item.des}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Blog;