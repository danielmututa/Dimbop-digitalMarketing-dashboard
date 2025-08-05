// import React from 'react'
// import contactone from "../Images/contactpage.jpg"
// import {  PhoneIcon } from 'lucide-react'
// import map from "../Images/map.jpg"
// import { HiOutlineMailOpen } from "react-icons/hi";
// import { FaInstagram } from "react-icons/fa";
// import {HiLocationMarker} from "react-icons/hi";
// import { FiFacebook } from "react-icons/fi";
// import { FaXTwitter } from "react-icons/fa6";

// const Contactpage = () => {

// const contact = [
//     {
//       icon: PhoneIcon, type:"Phone", content:"+263-775306263"
//    },
//     {
//       icon:HiOutlineMailOpen, type:"Email", content:"type@gmail.com"
//    },
//     {
//       icon: HiLocationMarker, type:"Address", content:"Lucky Street 126"
//    },
//     {
//       icon: FaInstagram, type:"Instagram", content:"TechRevive.com"
//    },
// ];

// const media =[
//     {media: FiFacebook},
//     {media:FaInstagram},
//     {media:FaXTwitter},
// ]

//   return (
//     <div className=''>
//          <div className=' h-[400px] md:h-[400px] lg:h-[400px] xl:h-[80vh] relative'>
//                 <img loading='lazy' src={contactone} className='h-full object-cover w-full' alt="" />
//                 <div className="flex   bg-blue-600/40 top-0 absolute h-full w-full justify-center items-center flex-col gap-1 md:gap-2 px-[20px] md:px-[40px] lg:px-[60px] xl:px-[100px] text-center">
//                     <h2 className='  text-[20px] md:text-[23px] lg:text-[26px] text-white font-montserratBold '>Contact us</h2>
//                     <p className='text-sm md:text-[16px] lg:text-[18px] font-montserrat text-white'>At  TechRevive, our dedicated team of skilled professionals is passionate about technology and innovation. From expert technicians to support staff, we work together to deliver exceptional products and services, ensuring customer satisfaction and staying ahead in the evolving tech world.</p>
//                 </div>
//             </div>

//             <div className=" px-[20px] py-[50px] md:py-[60px]   md:px-[40px] lg:px-[60px]  xl:px-[100px] flex  flex-col md:flex-row justify-between xl:py-[80px]">
//                 {/* Get In Touch */}
//                     <div className="flex w-full  md:w-[46%] flex-col gap-10">
//                               <div className="flex  flex-col">
//                                <h2 className='text-[20px] md:text-[23px]  lg:text-[26px] font-montserratBold pb-1'>Get In Touch</h2>
//                                <p className=' text-sm text-[16px] lg:text-[18px] font-montserrat'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nostrum, tempora quasi doloremque</p>
//                               </div>

//                               <div className="flex w-full  flex-wrap justify-between gap-8 lg:gap-12">
//                                {
//                                 contact.map((card,index)=>(
//                                     <div className=" flex gap-2 md:gap-3">
//                                   <div className="bg-white  w-10 h-10 md:h-11 md:w-11 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center shadow-md">
//                                     < card.icon size={25} className='text-buttons'/>
//                                   </div>

//                                   <div className="flex flex-col">
//                                     <h4 className='font-montserratBold text-[16px] '> {card.type}</h4>
//                                     <p className='text-[12px] lg:text-[16px] font-montserrat'>{card.content}</p>
//                                     </div> 
                                   
                                    
//                                     </div>
//                                 ))
//                                }

//                                 {/* line */}
//                                 <div className="w-1/2 bg-buttons p-[1px]"><span></span></div>

//                               </div>

//                               {/* Social media */}
//                               <div className="flex gap-12 ">
//                                 <h4 className='font-montserratBold text-[16px] '>Social Medai</h4>

//                                 {/* media icons */}
//                                  <div className="flex gap-4">
//                                    {
//                                     media.map((card,index) =>(
//                                         <div key={index} className="">
//                                         <card.media className='text-buttons font-montserratBold' size={20} />
//                                     </div>
//                                     ))
                                    
//                                    }
//                                  </div>
//                                  </div>
//                    </div>

//                    {/* Form */}

//                    <div className="w-full mt-8 lg:mt-0 lg:w-[46%]  md:p-4 ">
//                             <form  className='w-full flex flex-col gap-5' action="">
//                                 {/* Email Nmae */}
//                                 <div className="flex w-full  justify-between">


//                                     <div className="flex w-[48%] flex-col gap-1">
//                                         <label htmlFor="" className='font-montserratBold text-[14px]'>Name</label>
//                                         <input type="text" placeholder='Name' className=' text-sm md:text-[16px] border border-buttons p-2 w-full font-montserrat outline-none text-body' />
//                                     </div>

//                                     <div className="flex w-[48%] flex-col gap-1">
//                                         <label htmlFor="" className='font-montserratBold text-[14px]'>Email</label>
//                                         <input type="text" placeholder='Email' className='text-sm md:text-[16px] border w-full p-2 border-buttons font-montserrat outline-none text-body' />
//                                     </div>
//                                 </div>
                                    
//                                     {/* Phone */}
//                                     <div className="flex w-full flex-col gap-1">
//                                         <label htmlFor="" className='font-montserratBold text-[14px]'>Phone</label>
//                                         <input type="text" placeholder='Phone' className='text-sm md:text-[16px] border border-buttons p-2 w-full font-montserrat outline-none text-body' />
//                                     </div>

//                                     {/* Email */}
//                                     <div className="flex w-full flex-col gap-1">
//                                         <label htmlFor="" className='font-montserratBold text-[14px]'>Message</label>
//                                         <textarea placeholder='Message' className=' text-sm md:text-[16px] border border-buttons p-2 h-[100px] w-full font-montserrat outline-none text-body'  name="" id=""> 
//                                     </textarea>
//                                     </div>

//                                     {/* buttons */}
//                                     <div className="flex  flex-start">
//                                     <button className=' text-[12px] border text-buttons border-buttons p-3 font-montserratBold hover:bg-buttons transition duration-500 hover:text-white'  type="button">
//                                    SUBMIT BUTTON
//                                     </button>
//                                     </div>
                                    

//                             </form>
//                    </div>
//             </div>

//             <div className="px-[20px] md:px-[40px] lg:px-[60px]  xl:px-[100px] flex justify-between pb-[50px] md:pb-[60px] xl:pb-[80px]">
//                 <img src={map} className='h-[250px]  md:h-[300px] lg:h-[400px]  object-cover' alt="" />
//             </div>
         
//     </div>
//   )
// }

// export default Contactpage




import React from 'react';
import contactone from "../Images/contactpage.jpg";
import { PhoneIcon } from 'lucide-react';
import map from "../Images/map.jpg";
import { HiOutlineMailOpen } from "react-icons/hi";
import { FaInstagram } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { FiFacebook } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

interface ContactItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  type: string;
  content: string;
}

interface MediaItem {
  media: React.ComponentType<{ size?: number; className?: string }>;
}

const Contactpage: React.FC = () => {
  const contact: ContactItem[] = [
    {
      icon: PhoneIcon,
      type: "Phone",
      content: "+263-775306263"
    },
    {
      icon: HiOutlineMailOpen,
      type: "Email",
      content: "type@gmail.com"
    },
    {
      icon: HiLocationMarker,
      type: "Address",
      content: "Lucky Street 126"
    },
    {
      icon: FaInstagram,
      type: "Instagram",
      content: "TechRevive.com"
    },
  ];

  const media: MediaItem[] = [
    { media: FiFacebook },
    { media: FaInstagram },
    { media: FaXTwitter },
  ];

  return (
    <div className=''>
      <div className='h-[400px] md:h-[400px] lg:h-[400px] xl:h-[80vh] relative'>
        <img loading='lazy' src={contactone} className='h-full object-cover w-full' alt="Contact us banner" />
        <div className="flex bg-blue-600/40 top-0 absolute h-full w-full justify-center items-center flex-col gap-1 md:gap-2 px-[20px] md:px-[40px] lg:px-[60px] xl:px-[100px] text-center">
          <h2 className='text-[20px] md:text-[23px] lg:text-[26px] text-white font-montserratBold'>Contact us</h2>
          <p className='text-sm md:text-[16px] lg:text-[18px] font-montserrat text-white'>
            At TechRevive, our dedicated team of skilled professionals is passionate about technology and innovation. 
            From expert technicians to support staff, we work together to deliver exceptional products and services, 
            ensuring customer satisfaction and staying ahead in the evolving tech world.
          </p>
        </div>
      </div>

      <div className="px-[20px] py-[50px] md:py-[60px] md:px-[40px] lg:px-[60px] xl:px-[100px] flex flex-col md:flex-row justify-between xl:py-[80px]">
        {/* Get In Touch */}
        <div className="flex w-full md:w-[46%] flex-col gap-10">
          <div className="flex flex-col">
            <h2 className='text-[20px] md:text-[23px] lg:text-[26px] font-montserratBold pb-1'>Get In Touch</h2>
            <p className='text-sm text-[16px] lg:text-[18px] font-montserrat'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nostrum, tempora quasi doloremque
            </p>
          </div>

          <div className="flex w-full flex-wrap justify-between gap-8 lg:gap-12">
            {contact.map((card, index) => (
              <div key={index} className="flex gap-2 md:gap-3">
                <div className="bg-white w-10 h-10 md:h-11 md:w-11 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center shadow-md">
                  <card.icon size={25} className='text-buttons'/>
                </div>

                <div className="flex flex-col">
                  <h4 className='font-montserratBold text-[16px]'>{card.type}</h4>
                  <p className='text-[12px] lg:text-[16px] font-montserrat'>{card.content}</p>
                </div>
              </div>
            ))}

            {/* line */}
            <div className="w-1/2 bg-buttons p-[1px]"><span></span></div>
          </div>

          {/* Social media */}
          <div className="flex gap-12">
            <h4 className='font-montserratBold text-[16px]'>Social Media</h4>

            {/* media icons */}
            <div className="flex gap-4">
              {media.map((card, index) => (
                <div key={index}>
                  <card.media className='text-buttons font-montserratBold' size={20} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="w-full mt-8 lg:mt-0 lg:w-[46%] md:p-4">
          <form className='w-full flex flex-col gap-5' action="">
            {/* Email Name */}
            <div className="flex w-full justify-between">
              <div className="flex w-[48%] flex-col gap-1">
                <label htmlFor="name" className='font-montserratBold text-[14px]'>Name</label>
                <input 
                  type="text" 
                  placeholder='Name' 
                  className='text-sm md:text-[16px] border border-buttons p-2 w-full font-montserrat outline-none text-body' 
                />
              </div>

              <div className="flex w-[48%] flex-col gap-1">
                <label htmlFor="email" className='font-montserratBold text-[14px]'>Email</label>
                <input 
                  type="text" 
                  placeholder='Email' 
                  className='text-sm md:text-[16px] border w-full p-2 border-buttons font-montserrat outline-none text-body' 
                />
              </div>
            </div>
            
            {/* Phone */}
            <div className="flex w-full flex-col gap-1">
              <label htmlFor="phone" className='font-montserratBold text-[14px]'>Phone</label>
              <input 
                type="text" 
                placeholder='Phone' 
                className='text-sm md:text-[16px] border border-buttons p-2 w-full font-montserrat outline-none text-body' 
              />
            </div>

            {/* Message */}
            <div className="flex w-full flex-col gap-1">
              <label htmlFor="message" className='font-montserratBold text-[14px]'>Message</label>
              <textarea 
                placeholder='Message' 
                className='text-sm md:text-[16px] border border-buttons p-2 h-[100px] w-full font-montserrat outline-none text-body'
                id="message"
              ></textarea>
            </div>

            {/* buttons */}
            <div className="flex flex-start">
              <button 
                className='text-[12px] border text-buttons border-buttons p-3 font-montserratBold hover:bg-buttons transition duration-500 hover:text-white' 
                type="button"
              >
                SUBMIT BUTTON
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="px-[20px] md:px-[40px] lg:px-[60px] xl:px-[100px] flex justify-between pb-[50px] md:pb-[60px] xl:pb-[80px]">
        <img src={map} className='h-[250px] md:h-[300px] lg:h-[400px] object-cover' alt="Location map" />
      </div>
    </div>
  );
};

export default Contactpage;