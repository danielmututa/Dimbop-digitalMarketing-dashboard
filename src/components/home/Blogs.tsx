// import {  ArrowRight } from 'lucide-react'
// import React from 'react'
// import { NavLink } from 'react-router-dom'

// // pppp

// const Blogs = () => {
    
//     const blogs = [
//         {img:"blogIpn.jpg" ,type:"Iphone", des:"Known for sleek design, powerful processors, and top-notch security, the iPhone leads with models like the iPhone 15. Apple’s MacBooks offer powerful laptops with seamless integration into the iOS ecosystem.", btn:"Read Blog" },
//         {img:"blogNk.jpg",type:"Nokia",des:"The Nokia X30 offers a reliable, budget-friendly option with a focus on sustainability. Nokia’s laptops provide durable, cost-effective performance." ,btn:"Read Blog" },
//         {img:"blogSUM.jpg",type:"Samsumg" ,  des:"The Galaxy S23 and Galaxy Z Flip 5 impress with stunning displays, great battery life, and foldable tech. Samsung’s Galaxy Book laptops deliver sleek designs and solid performance." ,btn:"Read Blog"},
//     ]

//   return (
//     <div className="flex  items-center justify-center py-[50px]  px-[20px]  md:px-[40px] md:py-[60px] lg:px-[80px] lg:py-[60px] xl:px-[100px] xl:py-[80px]">

//     <div className='flex flex-col md:flex-row md:flex-wrap gap-6 justify-between '>
//        {
//         blogs.map((card,index) => (
//           <div key={index} className=" w-full mb-[28px] md:mb-0 md:w-[48%]  lg:w-[30%] group">
//             <img loading='lazy'  src={require("../Images/" + card.img)} alt="" className='   h-[300px]  md:h-[250px]  lg:h-[300px] w-full object-cover' />
//             <p className="text-sm lg:text-[16px] font-montserrat text-gray-500 pt-[10px]">{card.type}</p>
//             <p className="text-[14px] font-montserratBold pt-[8px] pb-[8px]">{card.des}</p>

//             <NavLink to="" className="text-[16px] font-montserrat flex items-center gap-2  text-buttons underline ">{card.btn}  <ArrowRight className='group-hover:translate-x-2 duration-500' size={20}/> </NavLink>
//           </div>  
//         ))
//        }
//     </div>
//     </div>
//   )
// }

// export default Blogs




import { ArrowRight } from 'lucide-react'
import { NavLink } from 'react-router-dom'

interface BlogCard {
  img: string;
  type: string;
  des: string;
  btn: string;
}

const Blogs = () => {
    
    const blogs: BlogCard[] = [
        {img:"blogIpn.jpg" ,type:"Iphone", des:"Known for sleek design, powerful processors, and top-notch security, the iPhone leads with models like the iPhone 15. Apple's MacBooks offer powerful laptops with seamless integration into the iOS ecosystem.", btn:"Read Blog" },
        {img:"blogNk.jpg",type:"Nokia",des:"The Nokia X30 offers a reliable, budget-friendly option with a focus on sustainability. Nokia's laptops provide durable, cost-effective performance." ,btn:"Read Blog" },
        {img:"blogSUM.jpg",type:"Samsumg" ,  des:"The Galaxy S23 and Galaxy Z Flip 5 impress with stunning displays, great battery life, and foldable tech. Samsung's Galaxy Book laptops deliver sleek designs and solid performance." ,btn:"Read Blog"},
    ]

  return (
    <div className="flex  items-center justify-center py-[50px]  px-[20px]  md:px-[40px] md:py-[60px] lg:px-[80px] lg:py-[60px] xl:px-[100px] xl:py-[80px]">

    <div className='flex flex-col md:flex-row md:flex-wrap gap-6 justify-between '>
       {
        blogs.map((card,index) => (
          <div key={index} className=" w-full mb-[28px] md:mb-0 md:w-[48%]  lg:w-[30%] group">
            <img loading='lazy'  src={require("../Images/" + card.img)} alt="" className='   h-[300px]  md:h-[250px]  lg:h-[300px] w-full object-cover' />
            <p className="text-sm lg:text-[16px] font-montserrat text-gray-500 pt-[10px]">{card.type}</p>
            <p className="text-[14px] font-montserratBold pt-[8px] pb-[8px]">{card.des}</p>

            <NavLink to="" className="text-[16px] font-montserrat flex items-center gap-2  text-buttons underline ">{card.btn}  <ArrowRight className='group-hover:translate-x-2 duration-500' size={20}/> </NavLink>
          </div>  
        ))
       }
    </div>
    </div>
  )
}

export default Blogs