
// import { useState } from "react"

// export default function ZimbabweCitySelector({ selectedCity, onCityChange }) {
//   // Comprehensive list of cities and towns in Zimbabwe
//   const zimbabweCities = [
//     "Harare",
//     "Bulawayo",
//     "Chitungwiza",
//     "Mutare",
//     "Epworth",
//     "Gweru",
//     "Kwekwe",
//     "Kadoma",
//     "Masvingo",
//     "Chinhoyi",
//     "Norton",
//     "Marondera",
//     "Ruwa",
//     "Chegutu",
//     "Zvishavane",
//     "Bindura",
//     "Beitbridge",
//     "Redcliff",
//     "Victoria Falls",
//     "Hwange",
//     "Chiredzi",
//     "Kariba",
//     "Karoi",
//     "Chipinge",
//     "Gokwe",
//     "Shurugwi",
//     "Gwanda",
//     "Murewa",
//     "Mutoko",
//     "Nyanga",
//     "Plumtree",
//     "Rusape",
//     "Chivhu",
//     "Shamva",
//     "Mazowe",
//     "Glendale",
//     "Banket",
//     "Mvurwi",
//     "Lupane",
//     "West Nicholson",
//   ]

//   return (
//     <div className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Country*</label>
//         <input
//           type="text"
//           value="Zimbabwe"
//           disabled
//           className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">City*</label>
//         <select
//           value={selectedCity}
//           onChange={(e) => onCityChange(e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         >
//           <option value="">Select City</option>
//           {zimbabweCities.map((city) => (
//             <option key={city} value={city}>
//               {city}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   )
// }







interface ZimbabweCitySelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

export default function ZimbabweCitySelector({ selectedCity, onCityChange }: ZimbabweCitySelectorProps) {
  // Comprehensive list of cities and towns in Zimbabwe
  const zimbabweCities = [
    "Harare",
    "Bulawayo",
    "Chitungwiza",
    "Mutare",
    "Epworth",
    "Gweru",
    "Kwekwe",
    "Kadoma",
    "Masvingo",
    "Chinhoyi",
    "Norton",
    "Marondera",
    "Ruwa",
    "Chegutu",
    "Zvishavane",
    "Bindura",
    "Beitbridge",
    "Redcliff",
    "Victoria Falls",
    "Hwange",
    "Chiredzi",
    "Kariba",
    "Karoi",
    "Chipinge",
    "Gokwe",
    "Shurugwi",
    "Gwanda",
    "Murewa",
    "Mutoko",
    "Nyanga",
    "Plumtree",
    "Rusape",
    "Chivhu",
    "Shamva",
    "Mazowe",
    "Glendale",
    "Banket",
    "Mvurwi",
    "Lupane",
    "West Nicholson",
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Country*</label>
        <input
          type="text"
          value="Zimbabwe"
          disabled
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">City*</label>
        <select
          value={selectedCity}
          onChange={(e) => onCityChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select City</option>
          {zimbabweCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}