// import React from 'react'
// import banner from "../Images/Services.jpg"
// import Servicesec from './Servicesec'

// const Services = () => {
//   return (
//     <div className=''>
    
//         <div className="h-[400px] md:h-[400px] lg:h-[400px]  relative xl:h-[75vh] w-full">
//             <img src={banner} className='h-full w-full object-cover ' alt="" />
//             <div className="w-full h-full top-0  bg-blue-600/40  absolute flex items-center justify-center flex-col text-center px-[20px] md:px-[40px] lg:px-[60px] xl:px-[100px] gap-2 ">
//                <h2 className='text-white font-montserratBold text-[20px] md:text-[23px] lg:text-[26px]'>Our Services</h2>
//                <p className=' text-sm md:text-[16px] lg:text-[18px] text-white font-montserrat'>At TechRevive, we provide a wide range of top-tier solutions to meet your electronic device needs. Whether you're looking for the latest mobile phones, laptops, or require expert repair services, we have you covered. We pride ourselves on delivering exceptional customer service and reliable, cutting-edge products.</p>
//             </div>
//         </div>

//       <Servicesec/>
//     </div>
    
//   )
// }


// // Our Services

// // At [Company Name], we provide a wide range of top-tier solutions to meet your electronic device needs. Whether you're looking for the latest mobile phones, laptops, or require expert repair services, we have you covered. We pride ourselves on delivering exceptional customer service and reliable, cutting-edge products. Here’s a look at what we offer:

// // Mobile Phone Sales and Repairs
// // We offer the latest mobile phones, along with expert repair services to keep your devices in perfect working condition. From screen replacements to software troubleshooting, we ensure your phone is running smoothly.

// // Laptop Sales and Repair Services
// // We provide high-performance laptops from trusted brands and offer expert repair services to handle everything from hardware fixes to software upgrades, ensuring your laptop stays efficient.

// // Electronic Gadget Solutions
// // From wearable devices to smart home gadgets, we offer a range of electronics designed to improve your life. Our repair experts also ensure that your gadgets are properly maintained and functional.

// // Eco-Friendly Repairs
// // We specialize in repairing and refurbishing electronics to reduce waste. Our eco-friendly repair services extend the life of your devices, helping you make sustainable choices.

// // Tech Support & Consultation
// // Need help with your tech? Our experienced technicians are available for consultations, providing expert guidance on device selection, setup, and troubleshooting.




// export default Services






import React from 'react';
import banner from "../Images/Services.jpg";
import Servicesec from './Servicesec';

const Services: React.FC = () => {
  return (
    <div className=''>
        <div className="h-[400px] md:h-[400px] lg:h-[400px] relative xl:h-[75vh] w-full">
            <img 
                src={banner} 
                className='h-full w-full object-cover' 
                alt="Our services banner" 
            />
            <div className="w-full h-full top-0 bg-blue-600/40 absolute flex items-center justify-center flex-col text-center px-[20px] md:px-[40px] lg:px-[60px] xl:px-[100px] gap-2">
               <h2 className='text-white font-montserratBold text-[20px] md:text-[23px] lg:text-[26px]'>
                    Our Services
               </h2>
               <p className='text-sm md:text-[16px] lg:text-[18px] text-white font-montserrat'>
                    At TechRevive, we provide a wide range of top-tier solutions to meet your electronic device needs. 
                    Whether you're looking for the latest mobile phones, laptops, or require expert repair services, 
                    we have you covered. We pride ourselves on delivering exceptional customer service and reliable, 
                    cutting-edge products.
               </p>
            </div>
        </div>

        <Servicesec />
    </div>
  );
};

export default Services;