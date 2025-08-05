// import React, { useState,useEffect } from 'react';
// // import blogsone from '../Images/Salea.jpg';

// import { Link } from 'react-router-dom';
// import Fastdelivary from '../home/Fastdelivary';

// const Blog = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const blognews = [
//     {
//       type: 'Iphone',
//       img: 'blogIpn.jpg',
//       des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci voluptate quaerat earum enim suscipit et rem blanditiis nostrum excepturi? Sunt itaque repellat aliquid adipisci. Veritatis nihil assumenda temporibus reiciendis aliquam!",
//       button: 'Read More',
//     },
//     {
//       type: 'Sumsamg',
//       img: 'blogSUM.jpg',
//       des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci voluptate quaerat earum enim suscipit et rem blanditiis nostrum excepturi? Sunt itaque repellat aliquid adipisci. Veritatis nihil assumenda temporibus reiciendis aliquam!",
//       button: 'Read More',
//     },
//     {
//       type: 'Sumsamg',
//       img: 'SamsumgW.jpg',
//       des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci voluptate quaerat earum enim suscipit et rem blanditiis nostrum excepturi? Sunt itaque repellat aliquid adipisci. Veritatis nihil assumenda temporibus reiciendis aliquam!",
//       button: 'Read More',
//     },
//     {
//       type: 'Iphone',
//       img: 'sell-product.jpg',
//       des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci voluptate quaerat earum enim suscipit et rem blanditiis nostrum excepturi? Sunt itaque repellat aliquid adipisci. Veritatis nihil assumenda temporibus reiciendis aliquam!",
//       button: 'Read More',
//     },
//   ];

//   const  blogside = [
//     {
//         img:'Salea.jpg',
//         date:'Feb 25, 2025',
//         type:'Business,Coaching',
//         head:'Iphone',
//         des:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.',
       
//     },
//     {
//         img:'sell-product.jpg',
//         date:'Feb 25, 2025',
//         type:'Business,Coaching',
//         head:'Oppo',
//         des:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.',
       
//     },
//     {
//         img:'IphoneSiv.jpg',
//         date:'Feb 25, 2025',
//         type:'Business,Coaching',
//         head:'Iphone',
//         des:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.',
       
//     }
//   ]

// const  blog= [
//     {
//       img:'onlineshop.jpg',
//       head:'Iphone',
//       date:'Feb 25, 2025',
//       type:'Business,Coaching',
//       des:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.',
//       button:'read more'

//     },
//     {
//       img:'onlineshop.jpg',
//       head:'Iphone',
//       date:'Feb 25, 2025',
//       type:'Business,Coaching',
//       des:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.',
//       button:'read more'

//     },
//     {
//       img:'onlineshop.jpg',
//       head:'Iphone',
//       date:'Feb 25, 2025',
//       type:'Business,Coaching',
//       des:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.',
//       button:'read more'

//     },
//     {
//       img:'onlineshop.jpg',
//       head:'Iphone',
//       date:'Feb 25, 2025',
//       type:'Business,Coaching',
//       des:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.',
//       button:'read more'

//     },
//     {
//       img:'onlineshop.jpg',
//       head:'Iphone',
//       date:'Feb 25, 2025',
//       type:'Business,Coaching',
//       des:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.',
//       button:'read more'

//     },
//     {
//       img:'onlineshop.jpg',
//       head:'Iphone',
//       date:'Feb 25, 2025',
//       type:'Business,Coaching',
//       des:'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.',
//       button:'read more'

//     },
//   ]

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % blognews.length);
//     }, 5000); // switch slides every 5 seconds

//     return () => clearInterval(intervalId);
//   }, [blognews.length]);

//   return (
//     <div className="mb-20">
//     <div className="px-5 pt-[100px] md:px-10 lg:px-20 xl:px-[100px]">
//       <div className="mb-12 flex flex-col gap-2">
//         <h2 className="font-montserratBold text-[20px] md:text-[23px] lg:text-[26px]">Blog</h2>
//         <div className="border border-buttons bg-buttons w-[200px]"></div>
//         <div className="flex mt-4 md:mt-5 xl:mt-12 flex-col lg:flex-row justify-between">
//           <div className="w-full lg:w-[35%] flex">
//             <div className="w-full  relative">
//               <img src={require(`../Images/${blognews[currentIndex].img}`)} className="h-[350px] w-full object-cover" alt="" />
//               <div className="w-full h-full px-5 xl:px-10  gap-1 absolute bg-blue-600/40 top-0 flex flex-col justify-center">
//                 <h3 className="font-montserratBold text-white">{blognews[currentIndex].type}</h3>
//                 <p className="font-montserrat text-sm text-white">{blognews[currentIndex].des}</p>
//                 <Link className="font-montserratBold text-white bg-buttons w-[130px] mt-3 flex justify-center p-[5px]" to="#" >
//                   {blognews[currentIndex].button}
//                 </Link>
//                 <div className="flex items-center justify-center gap-2 mt-8">
//                   {blognews.map((_, index) => (
//                     <div key={index} className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-buttons' : 'bg-gray-300'}`} />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
                  
                  


//           <div className="flex w-full lg:w-[62%] mt-8 lg:mt-0  gap-4 justify-between flex-col">
//             {
//                blogside.map((item,index) => (
//              <div  key={index} className="flex gap-4 justify-between items-center">
//               <img src={require('../Images/' + item.img)} className='  h-[120px] lg:h-[98px] object-cover w-[80px] md:w-[200px]' alt="" />
//                 <div className="">
//                   <p className='font-montserratBold'>{item.head}</p>
//                   <div className="flex gap-[4px]"><p className='font-montserrat text-sm'>{item.date}</p> | <p className='font-montserrat text-sm'>{item.type}</p></div>
                  
//                   <p className='font-montserrat text-sm'>{item.des}</p>
//                 </div>
//              </div>
//                ))
//             }
//           </div>
//         </div>
 
//             <div className="flex flex-wrap gap-5  xl:gap-8 xl:mt-20 mt-9 justify-between">
//               {
//                 blog.map((item,index) =>(
//                  <div className=" w-[full]  lg:w-[31%] md:pb-2  md:w-[48%]">
//                  <img src={require('../Images/' + item.img)} className='w-full h-[180px] object-cover'  alt="" />
              
//                   <p className='font-montserratBold pt-2'>{item.head}</p>
//                   <div className="flex gap-[4px]"><p className='font-montserrat text-sm'>{item.date}</p> | <p className='font-montserrat text-sm'>{item.type}</p></div>
//                   <p className='font-montserrat text-sm'>{item.des}</p>
//                  <Link className='font-montserratBold text-[13px] text-buttons underline'>Read more</Link>
//                  </div>
//                 ))
                
//               }
//             </div>

//       </div>
//     </div>
//     <Fastdelivary/>
//     </div>
// );
// };

// export default Blog;







import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Fastdelivary from '../home/Fastdelivary';

interface BlogNewsItem {
  type: string;
  img: string;
  des: string;
  button: string;
}

interface BlogSideItem {
  img: string;
  date: string;
  type: string;
  head: string;
  des: string;
}

interface BlogItem {
  img: string;
  head: string;
  date: string;
  type: string;
  des: string;
  button: string;
}

const Blog: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  const blognews: BlogNewsItem[] = [
    {
      type: 'Iphone',
      img: 'blogIpn.jpg',
      des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci voluptate quaerat earum enim suscipit et rem blanditiis nostrum excepturi? Sunt itaque repellat aliquid adipisci. Veritatis nihil assumenda temporibus reiciendis aliquam!",
      button: 'Read More',
    },
    {
      type: 'Sumsamg',
      img: 'blogSUM.jpg',
      des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci voluptate quaerat earum enim suscipit et rem blanditiis nostrum excepturi? Sunt itaque repellat aliquid adipisci. Veritatis nihil assumenda temporibus reiciendis aliquam!",
      button: 'Read More',
    },
    {
      type: 'Sumsamg',
      img: 'SamsumgW.jpg',
      des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci voluptate quaerat earum enim suscipit et rem blanditiis nostrum excepturi? Sunt itaque repellat aliquid adipisci. Veritatis nihil assumenda temporibus reiciendis aliquam!",
      button: 'Read More',
    },
    {
      type: 'Iphone',
      img: 'sell-product.jpg',
      des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci voluptate quaerat earum enim suscipit et rem blanditiis nostrum excepturi? Sunt itaque repellat aliquid adipisci. Veritatis nihil assumenda temporibus reiciendis aliquam!",
      button: 'Read More',
    },
  ];

  const blogside: BlogSideItem[] = [
    {
      img: 'Salea.jpg',
      date: 'Feb 25, 2025',
      type: 'Business,Coaching',
      head: 'Iphone',
      des: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.',
    },
    {
      img: 'sell-product.jpg',
      date: 'Feb 25, 2025',
      type: 'Business,Coaching',
      head: 'Oppo',
      des: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.',
    },
    {
      img: 'IphoneSiv.jpg',
      date: 'Feb 25, 2025',
      type: 'Business,Coaching',
      head: 'Iphone',
      des: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.',
    }
  ];

  const blog: BlogItem[] = [
    {
      img: 'onlineshop.jpg',
      head: 'Iphone',
      date: 'Feb 25, 2025',
      type: 'Business,Coaching',
      des: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.',
      button: 'read more'
    },
    {
      img: 'onlineshop.jpg',
      head: 'Iphone',
      date: 'Feb 25, 2025',
      type: 'Business,Coaching',
      des: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.',
      button: 'read more'
    },
    {
      img: 'onlineshop.jpg',
      head: 'Iphone',
      date: 'Feb 25, 2025',
      type: 'Business,Coaching',
      des: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.',
      button: 'read more'
    },
    {
      img: 'onlineshop.jpg',
      head: 'Iphone',
      date: 'Feb 25, 2025',
      type: 'Business,Coaching',
      des: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.',
      button: 'read more'
    },
    {
      img: 'onlineshop.jpg',
      head: 'Iphone',
      date: 'Feb 25, 2025',
      type: 'Business,Coaching',
      des: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.',
      button: 'read more'
    },
    {
      img: 'onlineshop.jpg',
      head: 'Iphone',
      date: 'Feb 25, 2025',
      type: 'Business,Coaching',
      des: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem qui adipisci error quis repellendus.',
      button: 'read more'
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % blognews.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [blognews.length]);

  return (
    <div className="mb-20">
      <div className="px-5 pt-[100px] md:px-10 lg:px-20 xl:px-[100px]">
        <div className="mb-12 flex flex-col gap-2">
          <h2 className="font-montserratBold text-[20px] md:text-[23px] lg:text-[26px]">Blog</h2>
          <div className="border border-buttons bg-buttons w-[200px]"></div>
          <div className="flex mt-4 md:mt-5 xl:mt-12 flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-[35%] flex">
              <div className="w-full relative">
                <img 
                  src={`/Images/${blognews[currentIndex].img}`} 
                  className="h-[350px] w-full object-cover" 
                  alt={blognews[currentIndex].type} 
                />
                <div className="w-full h-full px-5 xl:px-10 gap-1 absolute bg-blue-600/40 top-0 flex flex-col justify-center">
                  <h3 className="font-montserratBold text-white">{blognews[currentIndex].type}</h3>
                  <p className="font-montserrat text-sm text-white">{blognews[currentIndex].des}</p>
                  <Link className="font-montserratBold text-white bg-buttons w-[130px] mt-3 flex justify-center p-[5px]" to="#" >
                    {blognews[currentIndex].button}
                  </Link>
                  <div className="flex items-center justify-center gap-2 mt-8">
                    {blognews.map((_, index) => (
                      <div key={index} className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-buttons' : 'bg-gray-300'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full lg:w-[62%] mt-8 lg:mt-0 gap-4 justify-between flex-col">
              {blogside.map((item, index) => (
                <div key={index} className="flex gap-4 justify-between items-center">
                  <img 
                    src={`/Images/${item.img}`} 
                    className='h-[120px] lg:h-[98px] object-cover w-[80px] md:w-[200px]' 
                    alt={item.head} 
                  />
                  <div className="">
                    <p className='font-montserratBold'>{item.head}</p>
                    <div className="flex gap-[4px]">
                      <p className='font-montserrat text-sm'>{item.date}</p> | 
                      <p className='font-montserrat text-sm'>{item.type}</p>
                    </div>
                    <p className='font-montserrat text-sm'>{item.des}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-5 xl:gap-8 xl:mt-20 mt-9 justify-between">
            {blog.map((item, index) => (
              <div key={index} className="w-[full] lg:w-[31%] md:pb-2 md:w-[48%]">
                <img 
                  src={`/Images/${item.img}`} 
                  className='w-full h-[180px] object-cover' 
                  alt={item.head} 
                />
                <p className='font-montserratBold pt-2'>{item.head}</p>
                <div className="flex gap-[4px]">
                  <p className='font-montserrat text-sm'>{item.date}</p> | 
                  <p className='font-montserrat text-sm'>{item.type}</p>
                </div>
                <p className='font-montserrat text-sm'>{item.des}</p>
                <Link className='font-montserratBold text-[13px] text-buttons underline' to="#">
                  Read more
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Fastdelivary />
    </div>
  );
};

export default Blog;