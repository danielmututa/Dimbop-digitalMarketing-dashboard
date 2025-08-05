

// import { QuoteIcon } from 'lucide-react'
// import React, { useEffect, useState } from 'react'

// interface Testimonial {
//   icon: typeof QuoteIcon;
//   img: string;
//   name: string;
//   role: string;
//   Comment: string;
// }

// const Testimonials: React.FC = () => {
//   const [position, setPosition] = useState<number>(0);
//   const testimonials: Testimonial[] = [
//     // {icon: QuoteIcon, img: "Sophia Lee.jpg", name: "Sophia Lee", role: "Digital Marketer", Comment: "The refurbished devices were like a breath of fresh air—affordable and reliable.They delivered excellent value without any compromise in quality.Truly a game-changer for small businesses like mine!" },
//     {icon: QuoteIcon, img: "../Images/Sophia Lee.jpg", name: "Sophia Lee", role: "Digital Marketer", Comment: "The refurbished devices were like a breath of fresh air—affordable and reliable.They delivered excellent value without any compromise in quality.Truly a game-changer for small businesses like mine!" },
//     {icon: QuoteIcon, img: "../Images/Michael Roberts.jpg", name: "Michael Roberts", role: "IT Specialist", Comment: "My laptop was running sluggishly, but their upgrades made it feel brand new.Everything from response time to performance has improved dramatically.I am beyond satisfied with the results of their work." },
//     {icon: QuoteIcon, img: "../Images/Emily Chen.jpg", name: "Emily Chen", role: "Content Creator", Comment: "Editing videos on my custom-built PC is a game-changer.It's fast, efficient, and tailored to handle my intensive workloads.This service has boosted my productivity immensely!" },
//     {icon: QuoteIcon, img: "../Images/James Wright.jpg", name: "James Wright", role: "Student", Comment: "I struggled to set up my laptop, but their support team made it so simple.Their guidance helped me optimize my device for maximum productivity.They made the entire process stress-free and enjoyable." },
//     {icon: QuoteIcon, img: "../Images/Aisha Khan.jpg", name: "Aisha Khan", role: "Small Business Owner", Comment: "Knowing my old gadgets were recycled responsibly gives me peace of mind.Their efforts toward sustainability are truly commendable.I'm proud to support a service that values the planet." },
//     {icon: QuoteIcon, img: "../Images/David Smith.jpg", name: "David Smith", role: "Photographer", Comment: "I thought I'd lost my project files forever, but they recovered them!Their expertise saved my career from a major setback.I'm forever grateful for their incredible service." },
//     {icon: QuoteIcon, img: "../Images/Maria Gonzalez.jpg", name: "Maria Gonzalez", role: "Homemaker", Comment: "My smart home system is now seamlessly integrated and easy to use.It adds a touch of luxury and so much convenience to my daily routine.I'm amazed by how much easier life has become!" },
//   ];

//   // Create a duplicated array for seamless looping
//   const duplicatedTestimonials = [...testimonials, ...testimonials];

//   useEffect(() => {
//     const animation = setInterval(() => {
//       setPosition((prevPosition) => {
//         // Reset position when we've scrolled through all original items
//         if (prevPosition >= testimonials.length * 35) {
//           return 0;
//         }
//         return prevPosition + 0.5; // Smaller increment for smoother movement
//       });
//     }, 100); // Smaller interval for smoother animation

//     return () => clearInterval(animation);
//   }, [testimonials.length]);

//   return (
//     <div className='pb-[50px] md:pb-[60px] xl:pb-[80px]'>
//       <div className="relative overflow-hidden w-full">
//         <div 
//           className="flex gap-14 transition-transform duration-300 ease-linear"
//           style={{
//             transform: `translateX(-${position}%)`,
//           }}
//         >
//           {duplicatedTestimonials.map((card, index) => (
//             <div 
//               key={index}
//               className="relative w-full md:w-[35%] flex-shrink-0 flex flex-col gap-7"
//             >
//               <p className='text-sm md:text-[16px] font-montserrat pt-10'>{card.Comment}</p>
//               <div className="flex items-center gap-3">
//                 <img 
//                   src={require("../Images/" + card.img)} 
//                   className='h-12 w-12 rounded-full object-cover' 
//                   alt={card.name} 
//                 />
//                 <div className="flex flex-col">
//                   <h4 className='font-montserratBold text-buttons'>{card.name}</h4>
//                   <p className='text-sm md:text-[16px] font-montserrat text'>{card.role}</p>
//                 </div>
//               </div>
//               <card.icon size={30} className='text-buttons absolute top-[-5]' />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Testimonials;





import { QuoteIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

// ✅ Import images
import sophiaImg from '../Images/Sophia Lee.jpg'
import michaelImg from '../Images/Michael Roberts.jpg'
import emilyImg from '../Images/Emily Chen.jpg'
import jamesImg from '../Images/James Wright.jpg'
import aishaImg from '../Images/Aisha Khan.jpg'
import davidImg from '../Images/David Smith.jpg'
import mariaImg from '../Images/Maria Gonzalez.jpg'

// ✅ Map images by filename
const testimonialImages: Record<string, string> = {
  'sophia-lee.jpg': sophiaImg,
  'michael-roberts.jpg': michaelImg,
  'emily-chen.jpg': emilyImg,
  'james-wright.jpg': jamesImg,
  'aisha-khan.jpg': aishaImg,
  'david-smith.jpg': davidImg,
  'maria-gonzalez.jpg': mariaImg,
}

interface Testimonial {
  icon: typeof QuoteIcon
  img: string
  name: string
  role: string
  Comment: string
}

const Testimonials: React.FC = () => {
  const [position, setPosition] = useState<number>(0)

  const testimonials: Testimonial[] = [
    { icon: QuoteIcon, img: 'sophia-lee.jpg', name: 'Sophia Lee', role: 'Digital Marketer', Comment: 'The refurbished devices were like a breath of fresh air—affordable and reliable. They delivered excellent value without any compromise in quality. Truly a game-changer for small businesses like mine!' },
    { icon: QuoteIcon, img: 'michael-roberts.jpg', name: 'Michael Roberts', role: 'IT Specialist', Comment: 'My laptop was running sluggishly, but their upgrades made it feel brand new. Everything from response time to performance has improved dramatically. I am beyond satisfied with the results of their work.' },
    { icon: QuoteIcon, img: 'emily-chen.jpg', name: 'Emily Chen', role: 'Content Creator', Comment: 'Editing videos on my custom-built PC is a game-changer. It’s fast, efficient, and tailored to handle my intensive workloads. This service has boosted my productivity immensely!' },
    { icon: QuoteIcon, img: 'james-wright.jpg', name: 'James Wright', role: 'Student', Comment: 'I struggled to set up my laptop, but their support team made it so simple. Their guidance helped me optimize my device for maximum productivity. They made the entire process stress-free and enjoyable.' },
    { icon: QuoteIcon, img: 'aisha-khan.jpg', name: 'Aisha Khan', role: 'Small Business Owner', Comment: 'Knowing my old gadgets were recycled responsibly gives me peace of mind. Their efforts toward sustainability are truly commendable. I’m proud to support a service that values the planet.' },
    { icon: QuoteIcon, img: 'david-smith.jpg', name: 'David Smith', role: 'Photographer', Comment: 'I thought I\'d lost my project files forever, but they recovered them! Their expertise saved my career from a major setback. I\'m forever grateful for their incredible service.' },
    { icon: QuoteIcon, img: 'maria-gonzalez.jpg', name: 'Maria Gonzalez', role: 'Homemaker', Comment: 'My smart home system is now seamlessly integrated and easy to use. It adds a touch of luxury and so much convenience to my daily routine. I\'m amazed by how much easier life has become!' },
  ]

  const duplicatedTestimonials = [...testimonials, ...testimonials]

  useEffect(() => {
    const animation = setInterval(() => {
      setPosition((prev) => (prev >= testimonials.length * 35 ? 0 : prev + 0.5))
    }, 100)

    return () => clearInterval(animation)
  }, [testimonials.length])

  return (
    <div className='pt-[50px] md:pt-[60px] xl:pt-[80px]  pb-[50px] md:pb-[60px] xl:pb-[80px]'>
      <div className="relative overflow-hidden w-full">
        <div
          className="flex gap-14 transition-transform duration-300 ease-linear"
          style={{ transform: `translateX(-${position}%)` }}
        >
          {duplicatedTestimonials.map((card, index) => (
            <div
              key={index}
              className="relative w-full md:w-[35%] flex-shrink-0 flex flex-col gap-7"
            >
              <p className='text-sm md:text-[16px] font-montserrat pt-10'>{card.Comment}</p>
              <div className="flex items-center gap-3">
                <img
                  src={testimonialImages[card.img]}
                  className='h-12 w-12 rounded-full object-cover'
                  alt={card.name}
                />
                <div className="flex flex-col">
                  <h4 className='font-montserratBold text-buttons'>{card.name}</h4>
                  <p className='text-sm md:text-[16px] font-montserrat text'>{card.role}</p>
                </div>
              </div>
              <card.icon size={30} className='text-buttons absolute top-[-5]' />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Testimonials
