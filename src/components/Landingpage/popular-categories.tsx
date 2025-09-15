// import {Link} from "react-router-dom"
// import Image from "next/image"

// export function PopularCategories() {
//   return (
//     <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
//       <div className="container px-4 md:px-6">
//         <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
//           <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Popular Categories</h2>
//         </div>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
//           <Link to="/" className="flex flex-col items-center gap-2 group">
//            <img
//   src="/placeholder.svg?height=120&width=120"
//   width={120}
//   height={120}
//   alt="Smartphones"
//   className="rounded-lg object-cover group-hover:scale-105 transition-transform"
// />

//             <span className="text-sm font-medium group-hover:text-primary">Smartphones</span>
//           </Link>
//           <Link to="/" className="flex flex-col items-center gap-2 group">
//             <Image
//               src="/placeholder.svg?height=120&width=120"
//               width="120"
//               height="120"
//               alt="Laptops"
//               className="rounded-lg object-cover group-hover:scale-105 transition-transform"
//             />
//             <span className="text-sm font-medium group-hover:text-primary">Laptops</span>
//           </Link>
//           <Link to="/" className="flex flex-col items-center gap-2 group">
//             <Image
//               src="/placeholder.svg?height=120&width=120"
//               width="120"
//               height="120"
//               alt="TV & Audio"
//               className="rounded-lg object-cover group-hover:scale-105 transition-transform"
//             />
//             <span className="text-sm font-medium group-hover:text-primary">TV & Audio</span>
//           </Link>
//           <Link href="#" className="flex flex-col items-center gap-2 group">
//             <Image
//               src="/placeholder.svg?height=120&width=120"
//               width="120"
//               height="120"
//               alt="Computers"
//               className="rounded-lg object-cover group-hover:scale-105 transition-transform"
//             />
//             <span className="text-sm font-medium group-hover:text-primary">Computers</span>
//           </Link>
//           <Link href="#" className="flex flex-col items-center gap-2 group">
//             <Image
//               src="/placeholder.svg?height=120&width=120"
//               width="120"
//               height="120"
//               alt="Headphones"
//               className="rounded-lg object-cover group-hover:scale-105 transition-transform"
//             />
//             <span className="text-sm font-medium group-hover:text-primary">Headphones</span>
//           </Link>
//           <Link href="#" className="flex flex-col items-center gap-2 group">
//             <Image
//               src="/placeholder.svg?height=120&width=120"
//               width="120"
//               height="120"
//               alt="Cameras"
//               className="rounded-lg object-cover group-hover:scale-105 transition-transform"
//             />
//             <span className="text-sm font-medium group-hover:text-primary">Cameras</span>
//           </Link>
//         </div>
//       </div>
//     </section>
//   )
// }



import { Link } from "react-router-dom";

export function PopularCategories() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Popular Categories</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <Link to="/" className="flex flex-col items-center gap-2 group">
            <img
              src="/placeholder.svg?height=120&width=120"
              width={120}
              height={120}
              alt="Smartphones"
              className="rounded-lg object-cover group-hover:scale-105 transition-transform"
            />
            <span className="text-sm font-medium group-hover:text-primary">Smartphones</span>
          </Link>

          <Link to="/" className="flex flex-col items-center gap-2 group">
            <img
              src="/placeholder.svg?height=120&width=120"
              width={120}
              height={120}
              alt="Laptops"
              className="rounded-lg object-cover group-hover:scale-105 transition-transform"
            />
            <span className="text-sm font-medium group-hover:text-primary">Laptops</span>
          </Link>

          <Link to="/" className="flex flex-col items-center gap-2 group">
            <img
              src="/placeholder.svg?height=120&width=120"
              width={120}
              height={120}
              alt="TV & Audio"
              className="rounded-lg object-cover group-hover:scale-105 transition-transform"
            />
            <span className="text-sm font-medium group-hover:text-primary">TV & Audio</span>
          </Link>

          <Link to="#" className="flex flex-col items-center gap-2 group">
            <img
              src="/placeholder.svg?height=120&width=120"
              width={120}
              height={120}
              alt="Computers"
              className="rounded-lg object-cover group-hover:scale-105 transition-transform"
            />
            <span className="text-sm font-medium group-hover:text-primary">Computers</span>
          </Link>

          <Link to="#" className="flex flex-col items-center gap-2 group">
            <img
              src="/placeholder.svg?height=120&width=120"
              width={120}
              height={120}
              alt="Headphones"
              className="rounded-lg object-cover group-hover:scale-105 transition-transform"
            />
            <span className="text-sm font-medium group-hover:text-primary">Headphones</span>
          </Link>

          <Link to="#" className="flex flex-col items-center gap-2 group">
            <img
              src="/placeholder.svg?height=120&width=120"
              width={120}
              height={120}
              alt="Cameras"
              className="rounded-lg object-cover group-hover:scale-105 transition-transform"
            />
            <span className="text-sm font-medium group-hover:text-primary">Cameras</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
