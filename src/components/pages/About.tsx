// import React from 'react'
// import abt1 from "../Images/abt.jpg"
// import abt2 from "../Images/abtus.jpg"
// import abt3 from "../Images/abotmeet.jpg"
// const About = () => {

// const cards = [
//     {number:"1",type:"Our Vision", des:"To be the leading provider of innovative and sustainable electronic solutions, transforming how people connect with technology, while offering exceptional service and repair expertise to enhance the longevity of their devices."},
//     {number:"2",type:"Our Mission", des:"At TechRevive, our mission is to empower people by delivering cutting-edge mobile phones, laptops, and electronic gadgets, while providing expert repair services. We strive to make technology more accessible, reliable, and sustainable for every customer, ensuring their devices work seamlessly for years to come."},
//     {number:"3",type:"Our Values", des:"At TechRevive, we are driven by core values: embracing innovation, prioritizing customer-centricity, committing to sustainability, upholding integrity, and striving for excellence. These values guide us in everything we do."}
   

//  ]

//   return (
//     <div className=' py-[50px] px-[20px]  md:py-[50px] md:px-[40px] lg:px-[60px] lg:py-[60px]   xl:py-[80px] flex flex-col xl:px-[100px]'>

//         <div className=" flex-col md:flex-row lg:flex-row flex  justify-between">

//         <div className="flex-col flex w-full  md:w-[46%] lg:w-[46%] gap-4">
//             <div className="flex justify-between">
//  <img loading='lazy' src={abt1} className='w-[48%] h-[200px] object-cover' alt="" />
//  <img loading='lazy' src={abt2} className='w-[48%] h-[200px] object-cover' alt="" />
//             </div>
//             <img loading='lazy' src={abt3} className='object-cover h-[250px]' alt="" />
//         </div>
     
//      <div className="flex justify-center flex-col w-full md:w-[46%] lg:w-[46%]">
//         <h4 className="text-sm md:text-sm  lg:text-[16px]   text-buttons py-2 font-montserrat">WHY ARE WE?</h4>
//         <h2 className=' text-[20px] md:text-[23px] xl:text-[26px] font-montserratBold'>Empowering Innovation in Electronics and Technology</h2>

//         <p className=' text-sm md:text-[16px] xl:text-[18px] font-montserrat py-2'>At TechRevive, we believe in empowering innovation, advancing 
//             technology, and offering reliable solutions that enhance and 
//             simplify the everyday lives of our customers. Our mission is 
//             to provide cutting-edge mobile phones, laptops, and electronic 
//             gadgets, while also offering expert repair services to keep your 
//             devices running smoothly.
//          </p>
//      </div>

//         </div>
       
//           <div className="flex flex-col lg:flex-row justify-between pt-10">
//                  {
//                     cards.map((card,index)=>(
//                         <div className="w-full  pb-[25px] lg:pb-0 lg:w-[30%] flex justify-between gap-2 ">
//                             <div className="h-9 w-9 flex justify-center items-center rounded-full bg-white shadow-sm text-buttons font-montserratBold border">{card.number}</div>
//                             <div className="flex flex-col gap-1">
//                                 <h4 className="font-montserratBold text-[16px] ">{card.type}</h4>
//                                <p className='text-[15px]'>{card.des}</p>
//                             </div>
//                         </div>
//                     ))
//                  }
//           </div>
    
//     </div>
//   )
// }

// export default About




import React from 'react';
import abt1 from "../Images/abt.jpg";
import abt2 from "../Images/abtus.jpg";
import abt3 from "../Images/abotmeet.jpg";

interface CardItem {
  number: string;
  type: string;
  des: string;
}

const About: React.FC = () => {
  const cards: CardItem[] = [
    {
      number: "1",
      type: "Our Vision", 
      des: "To be the leading provider of innovative and sustainable electronic solutions, transforming how people connect with technology, while offering exceptional service and repair expertise to enhance the longevity of their devices."
    },
    {
      number: "2",
      type: "Our Mission", 
      des: "At TechRevive, our mission is to empower people by delivering cutting-edge mobile phones, laptops, and electronic gadgets, while providing expert repair services. We strive to make technology more accessible, reliable, and sustainable for every customer, ensuring their devices work seamlessly for years to come."
    },
    {
      number: "3",
      type: "Our Values", 
      des: "At TechRevive, we are driven by core values: embracing innovation, prioritizing customer-centricity, committing to sustainability, upholding integrity, and striving for excellence. These values guide us in everything we do."
    }
  ];

  return (
    <div className='py-[50px] px-[20px] md:py-[50px] md:px-[40px] lg:px-[60px] lg:py-[60px] xl:py-[80px] flex flex-col xl:px-[100px]'>
      <div className="flex-col md:flex-row lg:flex-row flex justify-between">
        <div className="flex-col flex w-full md:w-[46%] lg:w-[46%] gap-4">
          <div className="flex justify-between">
            <img loading='lazy' src={abt1} className='w-[48%] h-[200px] object-cover' alt="About us 1" />
            <img loading='lazy' src={abt2} className='w-[48%] h-[200px] object-cover' alt="About us 2" />
          </div>
          <img loading='lazy' src={abt3} className='object-cover h-[250px]' alt="About us 3" />
        </div>
     
        <div className="flex justify-center flex-col w-full md:w-[46%] lg:w-[46%]">
          <h4 className="text-sm md:text-sm lg:text-[16px] text-buttons py-2 font-montserrat">WHY ARE WE?</h4>
          <h2 className='text-[20px] md:text-[23px] xl:text-[26px] font-montserratBold'>Empowering Innovation in Electronics and Technology</h2>
          <p className='text-sm md:text-[16px] xl:text-[18px] font-montserrat py-2'>
            At TechRevive, we believe in empowering innovation, advancing 
            technology, and offering reliable solutions that enhance and 
            simplify the everyday lives of our customers. Our mission is 
            to provide cutting-edge mobile phones, laptops, and electronic 
            gadgets, while also offering expert repair services to keep your 
            devices running smoothly.
          </p>
        </div>
      </div>
       
      <div className="flex flex-col lg:flex-row justify-between pt-10">
        {cards.map((card, index) => (
          <div key={index} className="w-full pb-[25px] lg:pb-0 lg:w-[30%] flex justify-between gap-2">
            <div className="h-9 w-9 flex justify-center items-center rounded-full bg-white shadow-sm text-buttons font-montserratBold border">
              {card.number}
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="font-montserratBold text-[16px]">{card.type}</h4>
              <p className='text-[15px]'>{card.des}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;