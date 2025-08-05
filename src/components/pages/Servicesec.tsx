// import React from 'react'


// const Servicesec = () => {

// const service = [
//           {
//             img:"Repair.jpg",
//              type:"Repair",
//              des:"We fix electronic gadgets with care, including smartphone screens, laptop hardware, and essential home appliances like TVs and microwaves. Get your devices working like new again."

//           },
//           {
//             img:"Salea.jpg",
//              type:"Sales",
//             des:"Upgrade or declutter with ease! Buy and sell pre-owned gadgets or enhance your devices with hardware upgrades like more RAM or improved storage."

//           },
//           {
//             img:"Recycling.jpg",
//              type:"Recycling",
//             des:"Make a difference by recycling your old gadgets responsibly. We also refurbish and resell devices to give them a second life and reduce waste."

//           },
//           {
//             img:"Customization.jpg",
//              type:"Customization",
//             des:"Tailor your tech to your needs. From custom-built PCs for gaming or work to setting up smart home systems, we bring your vision to life."

//           },
//           {
//             img:"Software.jpg",
//              type:"Software",
//             des:"Keep your gadgets running smoothly with our software services. We install operating systems, recover lost data, and optimize performance with essential apps."

//           },
//           {
//             img:"Suport.jpg",
//              type:"Suport",
//             des:"Gain confidence in using your devices with our training sessions. For ongoing needs, our remote tech support is ready to help with any issues."

//           }

// ]

//   return (
//     <div className=' px-[20px] py-[50px] md:py-[60px] lg:py-[60px] md:px-[40px] lg:px-[60px] xl:px-[100px]  xl:py-[80px] '>
       
//        <div className="flex justify-between  flex-wrap gap-7 md:gap-6 lg:gap-8 xl:gap-12 items-start">
//          {
//             service.map((card,index) => (
//                 <div key={index} className="flex w-full md:w-[48%] lg:w-[30%] items-center justify-center gap-3  flex-col">

//                     <div className="w-full h-[230px] relative">
//                     <img loading='lazy' className='object-cover w-full  h-full' src={require("../Images/" + card.img)} alt="" />
//                     <div className="absolute top-0 flex items-end pb-8  h-full w-full">
//                         <div className="p-3 bg-white">
//                         <p className='font-montserratBold text-buttons'>{card.type}</p>
//                         </div>
//                     </div>
//                     </div>
                      
//                     <p className='font-montserrat text-sm  md:text-[16]'>{card.des}</p>
//                 </div>
//             ))
//          }
//           </div>
//         </div>
//   )
// }

// export default Servicesec






// import React from 'react';

// interface ServiceCard {
//   img: string;
//   type: string;
//   des: string;
// }

// const Servicesec: React.FC = () => {
//   const service: ServiceCard[] = [
//     {
//       img: "Repair.jpg",
//       type: "Repair",
//       des: "We fix electronic gadgets with care, including smartphone screens, laptop hardware, and essential home appliances like TVs and microwaves. Get your devices working like new again."
//     },
//     {
//       img: "Salea.jpg",
//       type: "Sales",
//       des: "Upgrade or declutter with ease! Buy and sell pre-owned gadgets or enhance your devices with hardware upgrades like more RAM or improved storage."
//     },
//     {
//       img: "Recycling.jpg",
//       type: "Recycling",
//       des: "Make a difference by recycling your old gadgets responsibly. We also refurbish and resell devices to give them a second life and reduce waste."
//     },
//     {
//       img: "Customization.jpg",
//       type: "Customization",
//       des: "Tailor your tech to your needs. From custom-built PCs for gaming or work to setting up smart home systems, we bring your vision to life."
//     },
//     {
//       img: "Software.jpg",
//       type: "Software",
//       des: "Keep your gadgets running smoothly with our software services. We install operating systems, recover lost data, and optimize performance with essential apps."
//     },
//     {
//       img: "Suport.jpg",
//       type: "Suport",
//       des: "Gain confidence in using your devices with our training sessions. For ongoing needs, our remote tech support is ready to help with any issues."
//     }
//   ];

//   return (
//     <div className='px-[20px] py-[50px] md:py-[60px] lg:py-[60px] md:px-[40px] lg:px-[60px] xl:px-[100px] xl:py-[80px]'>
//       <div className="flex justify-between flex-wrap gap-7 md:gap-6 lg:gap-8 xl:gap-12 items-start">
//         {service.map((card, index) => (
//           <div key={index} className="flex w-full md:w-[48%] lg:w-[30%] items-center justify-center gap-3 flex-col">
//             <div className="w-full h-[230px] relative">
//               <img 
//                 loading='lazy' 
//                 className='object-cover w-full h-full' 
//                 src={require("../Images/" + card.img)} 
//                 alt={card.type} 
//               />
//               <div className="absolute top-0 flex items-end pb-8 h-full w-full">
//                 <div className="p-3 bg-white">
//                   <p className='font-montserratBold text-buttons'>{card.type}</p>
//                 </div>
//               </div>
//             </div>
//             <p className='font-montserrat text-sm md:text-[16]'>{card.des}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Servicesec;







import React from 'react';

// ✅ Static imports for images
import Repair from '../Images/Repair.jpg';
import Salea from '../Images/Salea.jpg';
import Recycling from '../Images/Recycling.jpg';
import Customization from '../Images/Customization.jpg';
import Software from '../Images/Software.jpg';
import Suport from '../Images/Suport.jpg';

interface ServiceCard {
  img: string;
  type: string;
  des: string;
}

const Servicesec: React.FC = () => {
  // ✅ Use imported images directly
  const service: ServiceCard[] = [
    {
      img: Repair,
      type: "Repair",
      des: "We fix electronic gadgets with care, including smartphone screens, laptop hardware, and essential home appliances like TVs and microwaves. Get your devices working like new again."
    },
    {
      img: Salea,
      type: "Sales",
      des: "Upgrade or declutter with ease! Buy and sell pre-owned gadgets or enhance your devices with hardware upgrades like more RAM or improved storage."
    },
    {
      img: Recycling,
      type: "Recycling",
      des: "Make a difference by recycling your old gadgets responsibly. We also refurbish and resell devices to give them a second life and reduce waste."
    },
    {
      img: Customization,
      type: "Customization",
      des: "Tailor your tech to your needs. From custom-built PCs for gaming or work to setting up smart home systems, we bring your vision to life."
    },
    {
      img: Software,
      type: "Software",
      des: "Keep your gadgets running smoothly with our software services. We install operating systems, recover lost data, and optimize performance with essential apps."
    },
    {
      img: Suport,
      type: "Suport",
      des: "Gain confidence in using your devices with our training sessions. For ongoing needs, our remote tech support is ready to help with any issues."
    }
  ];

  return (
    <div className='px-[20px] py-[50px] md:py-[60px] lg:py-[60px] md:px-[40px] lg:px-[60px] xl:px-[100px] xl:py-[80px]'>
      <div className="flex justify-between flex-wrap gap-7 md:gap-6 lg:gap-8 xl:gap-12 items-start">
        {service.map((card, index) => (
          <div key={index} className="flex w-full md:w-[48%] lg:w-[30%] items-center justify-center gap-3 flex-col">
            <div className="w-full h-[230px] relative">
              <img 
                loading='lazy' 
                className='object-cover w-full h-full' 
                src={card.img} 
                alt={card.type} 
              />
              <div className="absolute top-0 flex items-end pb-8 h-full w-full">
                <div className="p-3 bg-white">
                  <p className='font-montserratBold text-buttons'>{card.type}</p>
                </div>
              </div>
            </div>
            <p className='font-montserrat text-sm md:text-[16]'>{card.des}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Servicesec;
