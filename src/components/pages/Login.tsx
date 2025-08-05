// import React from 'react'
// import login from "../Images/Loginimg.jpg"
// const Login = () => {
//   return (
//     <div className='flex w-full justify-between md:h-[450px]   xl:h-[100vh]'>
//         <div className="w-full md:w-1/2 px-5 md:px-[40px] lg:px-20 xl:px-[100px] pt-[100px]  xl:pt-[150px] flex flex-col justify-between h-full">
//         <form className="">
//           <h3 className='font-montserratBold  text-[18px] mb-3 md:mb-4 lg:mb-5 xl:mb-7'>Login</h3>

//           <div className=" flex flex-col gap-1">
//           <label className='font-montserratBold text-sm'>Email</label>
//           <input className='p-2 border border-buttons rounded-none font-montserrat text-buttons mb-4 outline-none text-[16px] '  type="email" placeholder='Email' />
//           </div>
          
//           <div className="flex flex-col gap-1">
//           <label className='font-montserratBold text-sm'>Password</label>
//           <input className='p-2 border border-buttons rounded-none font-montserrat text-buttons mb-4 outline-none text-[16px]' type="password" placeholder='Password' />
//           </div>

//           <div className=" flex flex-col-reverse xl:flex-row justify-between gap-3 xl:gap-0 xl:items-center mt-0  xl:mt-[20px]">
//         <p className='font-montserratBold text-buttons text-sm md:text-[16px]'>create an account</p>  
//           <button className='font-montserratBold text-white w-full xl:w-[220px] flex justify-center items-center bg-buttons py-3'>Login</button>
//           </div>

          
//           </form>
//           <div className="flex justify-between mt-8 md:mt-0 mb-3">
//             <p className='font-montserratBold text-buttons text-[12px] md:text-[16x] cursor-pointer'>Pricing & Payments</p>
//             <p className='font-montserratBold text-buttons text-[12px] md:text-[16x] cursor-pointer'>Privacy & Policy</p>
//             <p className='font-montserratBold text-buttons text-[12px] md:text-[16x] cursor-pointer'>Forget Paword</p>
//           </div>

//         </div>

//         <div className="hidden md:block  w-1/2 h-full">
//         <img src={login} className='h-full w-full object-cover' alt="" />
//         </div>

//     </div>
//   )
// }

// export default Login




import React from 'react';
import login from "../Images/Loginimg.jpg";

const Login: React.FC = () => {
  return (
    <div className='flex w-full justify-between md:h-[450px] xl:h-[100vh]'>
        <div className="w-full md:w-1/2 px-5 md:px-[40px] lg:px-20 xl:px-[100px] pt-[100px] xl:pt-[150px] flex flex-col justify-between h-full">
        <form className="">
          <h3 className='font-montserratBold text-[18px] mb-3 md:mb-4 lg:mb-5 xl:mb-7'>Login</h3>

          <div className="flex flex-col gap-1">
          <label className='font-montserratBold text-sm'>Email</label>
          <input 
            className='p-2 border border-buttons rounded-none font-montserrat text-buttons mb-4 outline-none text-[16px]'  
            type="email" 
            placeholder='Email' 
          />
          </div>
          
          <div className="flex flex-col gap-1">
          <label className='font-montserratBold text-sm'>Password</label>
          <input 
            className='p-2 border border-buttons rounded-none font-montserrat text-buttons mb-4 outline-none text-[16px]' 
            type="password" 
            placeholder='Password' 
          />
          </div>

          <div className="flex flex-col-reverse xl:flex-row justify-between gap-3 xl:gap-0 xl:items-center mt-0 xl:mt-[20px]">
            <p className='font-montserratBold text-buttons text-sm md:text-[16px]'>create an account</p>  
            <button className='font-montserratBold text-white w-full xl:w-[220px] flex justify-center items-center bg-buttons py-3'>
              Login
            </button>
          </div>
        </form>
        
        <div className="flex justify-between mt-8 md:mt-0 mb-3">
          <p className='font-montserratBold text-buttons text-[12px] md:text-[16x] cursor-pointer'>Pricing & Payments</p>
          <p className='font-montserratBold text-buttons text-[12px] md:text-[16x] cursor-pointer'>Privacy & Policy</p>
          <p className='font-montserratBold text-buttons text-[12px] md:text-[16x] cursor-pointer'>Forget Paword</p>
        </div>

        </div>

        <div className="hidden md:block w-1/2 h-full">
          <img src={login} className='h-full w-full object-cover' alt="" />
        </div>
    </div>
  );
};

export default Login;