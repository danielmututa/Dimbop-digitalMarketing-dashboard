// import React, { useState, useEffect } from 'react'
// import brn from "../Images/Iphonebanner3.jpg"
// import brn2 from "../Images/Samsuag.jpg"
// import brn3 from "../Images/Nokiabanner.jpg"
// import { NavLink } from 'react-router-dom'
// import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
// import styled from 'styled-components'
// import Newproducts from './Newproducts'
// import News from './News'
// import Topsellingproducts from './Topsellingproducts'
// import Fastdelivary from './Fastdelivary'
// import Blogs from './Blogs'
// import Testmonials from '../testimonials/Testmonials'

// const CarouselContainer = styled.div`
//   height: 100%;
//   overflow: hidden;
//   position: relative;
// `

// const CarouselInner = styled.div`
//   position: relative;
//   height: 100%;
// `

// const CarouselItem = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   opacity: ${props => props.isActive ? 1 : 0};
//   transition: opacity 0.5s ease-in-out;
//   z-index: ${props => props.isActive ? 1 : 0};

//   &:first-child {
//     position: relative;
//   }
// `

// const Home = () => {
//   const [activeIndex, setActiveIndex] = useState(0)
//   const [clickedDirection, setClickedDirection] = useState(null)

//   const Bannercards = [
//     { img: brn, title: "IPHONE", all: "get all", des: "QUALITY YOU CAN TRUST" },
//     { img: brn2, title: "SAMSUNG", all: "get all", des: "QUALITY YOU CAN TRUST" },
//     { img: brn3, title: "NOKIA", all: "get all", des: "QUALITY YOU CAN TRUST" }
//   ]

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveIndex((current) =>
//         current === Bannercards.length - 1 ? 0 : current + 1
//       )
//     }, 5000)
//     return () => clearInterval(interval)
//   }, [])

//   const goToPrevious = () => {
//     setActiveIndex((current) =>
//       current === 0 ? Bannercards.length - 1 : current - 1
//     )
//     setClickedDirection('prev')
//     setTimeout(() => setClickedDirection(null), 300)
//   }

//   const goToNext = () => {
//     setActiveIndex((current) =>
//       current === Bannercards.length - 1 ? 0 : current + 1
//     )
//     setClickedDirection('next')
//     setTimeout(() => setClickedDirection(null), 300)
//   }

//   return (
//     <div>
//       <CarouselContainer>

//        {/* Prev Button (visible on mobile and md only) */}
// {/* Prev Button */}
// <div
//   className={`absolute left-[-12px] sm:left-[15px] md:left-[-2px] lg:left-[20px] top-1/2 transform -translate-y-1/2 cursor-pointer z-20 duration-300 flex items-center justify-center border-none w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px] rounded-full
//   ${clickedDirection === 'prev' ? 'bg-white/80 ring-2 ring-white' : 'lg:bg-white/50 lg:hover:bg-white/70 bg-transparent'}`}
//   onClick={goToPrevious}
// >
//   <ChevronLeft className="h-[20px] w-[20px]" color="white" />
// </div>

// {/* Next Button */}
// <div
//   className={`absolute right-[-12px] sm:right-[15px] md:right-[-2px] lg:right-[20px] top-1/2 transform -translate-y-1/2 cursor-pointer z-20 duration-300 flex items-center justify-center border-none w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px] rounded-full
//   ${clickedDirection === 'next' ? 'bg-white/80 ring-2 ring-white' : 'lg:bg-white/50 lg:hover:bg-white/70 bg-transparent'}`}
//   onClick={goToNext}
// >
//   <ChevronRight className="h-[20px] w-[20px]" color="white" />
// </div>

//         <CarouselInner>
//           {Bannercards.map((card, index) => (
//             <CarouselItem
//               key={index}
//               isActive={index === activeIndex}
//               className="flex relative items-start"
//             >
//               <img
//                 loading="lazy"
//                 src={card.img}
//                 className="w-full h-[480px] object-cover lg:h-[520px] xl:h-[100vh] lg:object-cover"
//                 alt=""
//               />
//               <div className="absolute w-full top-0 h-full flex items-start justify-center flex-col px-[20px] gap-2 md:px-[40px] lg:px-[100px] lg:gap-3">
//                 <p className="text-white text-[14px] font-semibold font-montserrat">{card.title}</p>
//                 <p className="text-[22px] md:text-[22px] lg:text-[26px] xl:text-3xl text-white font-montserrat">
//                   {card.all}
//                 </p>
//                 <h1 className="font-montserratBold pb-2 text-[24px] md:text-[24px] lg:text-[32px] xl:text-4xl text-white">
//                   {card.des}
//                 </h1>
//                 <NavLink
//                   className="border-[1px] px-[20px] md:px-[30px] lg:px-[40px] xl:px-[50px] py-[8px] md:py-[10px] xl:py-[12px] font-montserrat relative m-0 xl:h-[60px] flex justify-center items-center cursor-pointer uppercase bg-none border-[#fff] rounded-[0px] text-body font-normal text-14px xl:text-[18px] overflow-hidden transition-all duration-300 hover:animate-[rotate_0.7s_ease-in-out] group"
//                   to="/shop"
//                 >
//                   <span className="text-white text-[14px] font-montserratBold font-medium tracking-[0.7px] group-hover:animate-[storm_0.7s_ease-in-out] group-hover:delay-[60ms] flex items-center">

//                     VIEW MORE
//                     <ArrowRight
//                       size={28}
//                       className="text-white pl-[8px] transition-transform group-hover:translate-x-1"
//                     />
//                   </span>
//                   <div className="absolute right-0 bottom-0 w-[100px] h-[100px] rounded-full bg-body opacity-0 transition-all duration-200 translate-x-full -translate-y-1/4 group-hover:opacity-15 group-hover:translate-x-1/2 group-hover:scale-90" />
//                   <div className="absolute right-0 bottom-0 w-[100px] h-[100px] rounded-full bg-[#fff] opacity-0 transition-all duration-200 translate-x-full -translate-y-1/4 group-hover:opacity-15 group-hover:translate-x-1/2 group-hover:scale-110" />
//                 </NavLink>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselInner>
//       </CarouselContainer>

//       <Newproducts />
//       <News />
//       <Topsellingproducts />
//       <Fastdelivary />
//       <Blogs />
//       <Testmonials />
//     </div>
//   )
// }

// export default Home



import  { useState, useEffect } from 'react'
import brn from "../Images/Iphonebanner3.jpg"
import brn2 from "../Images/Samsuag.jpg"
import brn3 from "../Images/Nokiabanner.jpg"
import { NavLink } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import styled from 'styled-components'
import Newproducts from './Newproducts'
import News from './News'
import Topsellingproducts from './Topsellingproducts'
import Fastdelivary from './Fastdelivary'
// import Blogs from './Blogs'
import Testmonials from '../testimonials/Testmonials'

interface BannerCard {
  img: string;
  title: string;
  all: string;
  des: string;
}

interface CarouselItemProps {
  isActive: boolean;
}

const CarouselContainer = styled.div`
  height: 100%;
  overflow: hidden;
  position: relative;
`

const CarouselInner = styled.div`
  position: relative;
  height: 100%;
`

const CarouselItem = styled.div<CarouselItemProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => props.isActive ? 1 : 0};
  transition: opacity 0.5s ease-in-out;
  z-index: ${props => props.isActive ? 1 : 0};

  &:first-child {
    position: relative;
  }
`

const Home = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [clickedDirection, setClickedDirection] = useState<string | null>(null)

  const Bannercards: BannerCard[] = [
    { img: brn, title: "IPHONE", all: "get all", des: "QUALITY YOU CAN TRUST" },
    { img: brn2, title: "SAMSUNG", all: "get all", des: "QUALITY YOU CAN TRUST" },
    { img: brn3, title: "NOKIA", all: "get all", des: "QUALITY YOU CAN TRUST" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) =>
        current === Bannercards.length - 1 ? 0 : current + 1
      )
    }, 5000)
    return () => clearInterval(interval)
  }, [Bannercards.length])

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? Bannercards.length - 1 : current - 1
    )
    setClickedDirection('prev')
    setTimeout(() => setClickedDirection(null), 300)
  }

  const goToNext = () => {
    setActiveIndex((current) =>
      current === Bannercards.length - 1 ? 0 : current + 1
    )
    setClickedDirection('next')
    setTimeout(() => setClickedDirection(null), 300)
  }

  return (
    <div>
      <CarouselContainer>
        {/* Prev Button */}
        <div
          className={`absolute left-[-12px] sm:left-[15px] md:left-[-2px] lg:left-[20px] top-1/2 transform -translate-y-1/2 cursor-pointer z-20 duration-300 flex items-center justify-center border-none w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px] rounded-full
          ${clickedDirection === 'prev' ? 'bg-white/80 ring-2 ring-white' : 'lg:bg-white/50 lg:hover:bg-white/70 bg-transparent'}`}
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-[20px] w-[20px]" color="white" />
        </div>

        {/* Next Button */}
        <div
          className={`absolute right-[-12px] sm:right-[15px] md:right-[-2px] lg:right-[20px] top-1/2 transform -translate-y-1/2 cursor-pointer z-20 duration-300 flex items-center justify-center border-none w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px] rounded-full
          ${clickedDirection === 'next' ? 'bg-white/80 ring-2 ring-white' : 'lg:bg-white/50 lg:hover:bg-white/70 bg-transparent'}`}
          onClick={goToNext}
        >
          <ChevronRight className="h-[20px] w-[20px]" color="white" />
        </div>

        <CarouselInner>
          {Bannercards.map((card, index) => (
            <CarouselItem
              key={index}
              isActive={index === activeIndex}
              className="flex relative items-start"
            >
              <img
              loading="lazy"
              src={card.img}      
              alt={card.title}
              className="w-full h-[480px] object-cover lg:h-[520px] xl:h-[100vh] lg:object-cover"
            />

              <div className="absolute w-full top-0 h-full flex items-start justify-center flex-col px-[20px] gap-2 md:px-[40px] lg:px-[100px] lg:gap-3">
                <p className="text-white text-[14px] font-semibold font-montserrat">{card.title}</p>
                <p className="text-[22px] md:text-[22px] lg:text-[26px] xl:text-3xl text-white font-montserrat">
                  {card.all}
                </p>
                <h1 className="font-montserratBold pb-2 text-[24px] md:text-[24px] lg:text-[32px] xl:text-4xl text-white">
                  {card.des}
                </h1>
                <NavLink
                  className="border-[1px] px-[20px] md:px-[30px] lg:px-[40px] xl:px-[50px] py-[8px] md:py-[10px] xl:py-[12px] font-montserrat relative m-0 xl:h-[60px] flex justify-center items-center cursor-pointer uppercase bg-none border-[#fff] rounded-[0px] text-body font-normal text-14px xl:text-[18px] overflow-hidden transition-all duration-300 hover:animate-[rotate_0.7s_ease-in-out] group"
                  to="/shop"
                >
                  <span className="text-white text-[14px] font-montserratBold font-medium tracking-[0.7px] group-hover:animate-[storm_0.7s_ease-in-out] group-hover:delay-[60ms] flex items-center">
                    VIEW MORE
                    <ArrowRight
                      size={28}
                      className="text-white pl-[8px] transition-transform group-hover:translate-x-1"
                    />
                  </span>
                  <div className="absolute right-0 bottom-0 w-[100px] h-[100px] rounded-full bg-body opacity-0 transition-all duration-200 translate-x-full -translate-y-1/4 group-hover:opacity-15 group-hover:translate-x-1/2 group-hover:scale-90" />
                  <div className="absolute right-0 bottom-0 w-[100px] h-[100px] rounded-full bg-[#fff] opacity-0 transition-all duration-200 translate-x-full -translate-y-1/4 group-hover:opacity-15 group-hover:translate-x-1/2 group-hover:scale-110" />
                </NavLink>
              </div>
            </CarouselItem>
          ))}
        </CarouselInner>
      </CarouselContainer>

       <Newproducts />
       <News /> 
      <Topsellingproducts />
      <Fastdelivary />
       {/* <Blogs /> */}
      <Testmonials />    
    </div>
  )
}

export default Home