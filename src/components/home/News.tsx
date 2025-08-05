

// import  { useState, useEffect} from 'react'
// import newsimg from "../Images/news-image.png"


// const News = () => {

//     const [timeLeft, setTimeLeft] = useState({
//         days: 0,
//         hours: 0,
//         minutes: 0,
//         seconds: 0
//       });
    
     
//   useEffect(() => {
//     // Set your target date here
//     const targetDate = new Date('2024-12-31T23:59:59').getTime();

//     const interval = setInterval(() => {
//       const now = new Date().getTime();
//       const difference = targetDate - now;

//       if (difference > 0) {
//         const days = Math.floor(difference / (1000 * 60 * 60 * 24));
//         const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((difference % (1000 * 60)) / 1000);

//         setTimeLeft({ days, hours, minutes, seconds });
//       } else {
//         clearInterval(interval);
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);



//   return (
//     <div className='h-[350px]  relative lg:h-[450px]'>
//         <img loading='lazy' src={newsimg} className='object-cover w-full h-full' alt="" />
//         <div className=" left-5 gap-2   absolute  lg:left-[100px]  top-0  flex justify-center  h-full flex-col lg:gap-3">
//           <h4 className='text-[16px] md:text-[16px]  font-montserratBold  lg:text-[16px] text-white'>  Fresh Updates & Trends</h4>
//            <h1 className='text-[24px] md:text-[28px]  font-montserratBold lg:text-[32px] xl:text-[36px] text-white'> Upcoming Launch Countdown</h1>
//            <div className="p-[2px] border w-[70px] border-solid rounded-s-[10px] bg-white lg:p-1"><span></span></div>

//            {/* {{TIME ? TIME}} */}
           

//            <div className="gap-3 mt-3 flex lg:gap-8 items-center lg:mt-4">
//       <div className="flex flex-col items-center border py-2 px-4  ">
//         <span className="text-[25px] md:text-[28px] font-bold font-montserratBold lg:text-3xl text-white">{timeLeft.days}</span>
//         <span className="text-sm font-montserratBold text-white">days</span>
//       </div>
//       <div className="flex flex-col items-center  border py-2 px-4">
//         <span className="text-[25px] md:text-[28px] font-bold lg:text-3xl font-montserratBold text-white">{timeLeft.hours}</span>
//         <span className="text-sm font-montserratBold text-white">hours</span>
//       </div>
//       <div className="flex flex-col items-center  border py-2 px-4">
//         <span className=" text-[25px] md:text-[28px] font-bold font-montserratBold lg:text-3xl text-white">{timeLeft.minutes}</span>
//         <span className="text-sm font-montserratBold text-white">mins</span>
//       </div>
//       <div className="flex flex-col items-center  border py-2 px-4">
//         <span className="text-[25px] md:text-[28px]  font-bold font-montserratBold lg:text-3xl text-white">{timeLeft.seconds}</span>
//         <span className="text-sm font-montserratBold text-white">secs</span>
//       </div>
//     </div>
// <div className="flex gap-3">
// <p className="text-buttons/80 line-through text-[20px] font-montserratBold">$220.00</p>
// <p className='text-[20px] font-montserratBold text-buttons'>$180.00</p>
// </div>
  
//             </div>


     

//     </div>
//   )
// }

// export default News







import { useState, useEffect } from 'react';
import newsimg from "../Images/news-image.png";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const News = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set your target date here
    const targetDate = new Date('2024-12-31T23:59:59').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='h-[350px] relative lg:h-[450px]'>
      <img loading='lazy' src={newsimg} className='object-cover w-full h-full' alt="" />
      <div className="left-5 gap-2 absolute lg:left-[100px] top-0 flex justify-center h-full flex-col lg:gap-3">
        <h4 className='text-[16px] md:text-[16px] font-montserratBold lg:text-[16px] text-white'>Fresh Updates & Trends</h4>
        <h1 className='text-[24px] md:text-[28px] font-montserratBold lg:text-[32px] xl:text-[36px] text-white'>Upcoming Launch Countdown</h1>
        <div className="p-[2px] border w-[70px] border-solid rounded-s-[10px] bg-white lg:p-1"><span></span></div>

        <div className="gap-3 mt-3 flex lg:gap-8 items-center lg:mt-4">
          <div className="flex flex-col items-center border py-2 px-4">
            <span className="text-[25px] md:text-[28px] font-bold font-montserratBold lg:text-3xl text-white">{timeLeft.days}</span>
            <span className="text-sm font-montserratBold text-white">days</span>
          </div>
          <div className="flex flex-col items-center border py-2 px-4">
            <span className="text-[25px] md:text-[28px] font-bold lg:text-3xl font-montserratBold text-white">{timeLeft.hours}</span>
            <span className="text-sm font-montserratBold text-white">hours</span>
          </div>
          <div className="flex flex-col items-center border py-2 px-4">
            <span className="text-[25px] md:text-[28px] font-bold font-montserratBold lg:text-3xl text-white">{timeLeft.minutes}</span>
            <span className="text-sm font-montserratBold text-white">mins</span>
          </div>
          <div className="flex flex-col items-center border py-2 px-4">
            <span className="text-[25px] md:text-[28px] font-bold font-montserratBold lg:text-3xl text-white">{timeLeft.seconds}</span>
            <span className="text-sm font-montserratBold text-white">secs</span>
          </div>
        </div>
        <div className="flex gap-3">
          <p className="text-buttons/80 line-through text-[20px] font-montserratBold">$220.00</p>
          <p className='text-[20px] font-montserratBold text-buttons'>$180.00</p>
        </div>
      </div>
    </div>
  );
};

export default News;