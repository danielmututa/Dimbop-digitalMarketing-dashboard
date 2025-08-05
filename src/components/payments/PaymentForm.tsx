

// import { useState } from "react"
// import { Check, CreditCard } from "lucide-react"
// import ZimbabweCitySelector from "./ZimbabweCitySelector"
// import { useNavigate } from "react-router-dom"

// export default function PaymentForm() {
//     const navigate = useNavigate()
//   const [selectedCity, setSelectedCity] = useState("")
  
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("ecocash")
//   const [formData, setFormData] = useState({
//     firstName: "",
//     street: "",
//     aptSuite: "",
//     postcode: "",
//     phone: "",
//     zipCode: "",
//     email: "",
//     nameOnCard: "",
//     cardNumber: "",
//     expMonth: "",
//     expYear: "",
//     cvv: "",
//   })

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }

// //   const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"))
// //   const years = Array.from({ length: 10 }, (_, i) => String(new Date().getFullYear() + i))

//   return (
//     <div className="min-h-screen bg-gray-50 py-14 px-5 sm:py-14 sm:px-5 md:px-10 md:py-16 lg:p-20 xl:p-20">
//       <div className="max-w-7xl mx-auto">
//         {/* Payment Method Selection */}
//         <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment</h2>
//           <p className="text-gray-600 mb-6">Choose payment method below</p>

//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
//             <div
//               className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
//                 selectedPaymentMethod === "ecocash"
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-200 hover:border-gray-300"
//               }`}
//               onClick={() => setSelectedPaymentMethod("ecocash")}
//             >
//               <div className="flex flex-col items-center text-center">
//                 <CreditCard className="w-8 h-8 text-gray-600 mb-2" />
//                 <span className="text-sm font-medium text-gray-900">EcoCash</span>
//               </div>
//               {selectedPaymentMethod === "ecocash" && (
//                 <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
//                   <Check className="w-4 h-4 text-white" />
//                 </div>
//               )}
//             </div>

//             <div
//               className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
//                 selectedPaymentMethod === "paynow"
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-200 hover:border-gray-300"
//               }`}
//               onClick={() => setSelectedPaymentMethod("paynow")}
//             >
//               <div className="flex flex-col items-center text-center">
//                 <div className="text-2xl font-bold text-blue-600 mb-2">OneMoney</div>
//                 <span className="text-xs text-gray-600">Netone</span>
//               </div>
//               {selectedPaymentMethod === "paynow" && (
//                 <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
//                   <Check className="w-4 h-4 text-white" />
//                 </div>
//               )}
//             </div>

//             <div
//               className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
//                 selectedPaymentMethod === "paypay"
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-200 hover:border-gray-300"
//               }`}
//               onClick={() => setSelectedPaymentMethod("paypay")}
//             >
//               <div className="flex flex-col items-center text-center">
//                 <div className="text-xl font-bold text-purple-600 mb-2">PayPal</div>
//                 <span className="text-xs text-gray-600">Zimbabwe</span>
//               </div>
//               {selectedPaymentMethod === "paypay" && (
//                 <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
//                   <Check className="w-4 h-4 text-white" />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Billing and Payment Forms */}
//         <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
//           {/* Billing Address */}
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="flex items-center mb-6">
//               <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
//                 1
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900">Billing Info</h3>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">First Name*</label>
//                 <input
//                   type="text"
//                   value={formData.firstName}
//                   onChange={(e) => handleInputChange("firstName", e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="John Doe"
//                 />
//               </div>

//               <ZimbabweCitySelector
//                 selectedCity={selectedCity}
//                 onCityChange={setSelectedCity}
//               />

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Billing Address</label>
//                 <input
//                   type="text"
//                   value={formData.street}
//                   onChange={(e) => handleInputChange("street", e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="Fyrverkarbacken"
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
//                   <input
//                     type="text"
//                     value={formData.zipCode}
//                     onChange={(e) => handleInputChange("zipCode", e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="12304"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
//                   <input
//                     type="tel"
//                     value={formData.phone}
//                     onChange={(e) => handleInputChange("phone", e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="+263 (77)"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Payment Info */}
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="flex items-center mb-6">
//               <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
//                 2
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900">Payment Info</h3>
//             </div>

//             <div className="space-y-4">
//               {selectedPaymentMethod === "ecocash" && (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">EcoCash Phone Number</label>
//                   <input
//                     type="tel"
//                     value={formData.phone}
//                     onChange={(e) => handleInputChange("phone", e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="0777777777"
//                   />
//                 </div>
//               )}

//               {selectedPaymentMethod === "paynow" && (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">PayNow ID (Mobile/NRIC/UEN)</label>
//                   <input
//                     type="text"
//                     value={formData.cardNumber}
//                     onChange={(e) => handleInputChange("cardNumber", e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="Mobile Number or NRIC"
//                   />
//                 </div>
//               )}

//               {selectedPaymentMethod === "paypay" && (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">PayPay Account ID</label>
//                   <input
//                     type="text"
//                     value={formData.cardNumber}
//                     onChange={(e) => handleInputChange("cardNumber", e.target.value)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     placeholder="PayPay ID or Mobile Number"
//                   />
//                 </div>
//               )}

//               <div className="flex items-center space-x-2 mt-4">
//                 <input
//                   type="checkbox"
//                   id="savePayment"
//                   className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                 />
//                 <label htmlFor="savePayment" className="text-sm text-gray-700">
//                   Set as default payment method
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
//           <button 
//             onClick={() => navigate("/shop")}
//           className="w-full sm:w-auto px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
//             RETURN TO STORE
//           </button>

//           <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
//             <button className="w-full sm:w-auto px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
//               BACK TO SHIPPING
//             </button>
//             <button className="w-full sm:w-auto px-8 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium">
//               PROCEED
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }





import { useState } from "react";
import { Check, CreditCard } from "lucide-react";
import ZimbabweCitySelector from "./ZimbabweCitySelector";
import { useNavigate } from "react-router-dom";

interface FormData {
  firstName: string;
  street: string;
  aptSuite: string;
  postcode: string;
  phone: string;
  zipCode: string;
  email: string;
  nameOnCard: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvv: string;
}

export default function PaymentForm() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"ecocash" | "paynow" | "paypay">("ecocash");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    street: "",
    aptSuite: "",
    postcode: "",
    phone: "",
    zipCode: "",
    email: "",
    nameOnCard: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-5 sm:py-14 sm:px-5 md:px-10 md:py-16 lg:p-20 xl:p-20">
      <div className="max-w-7xl mx-auto">
        {/* Payment Method Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment</h2>
          <p className="text-gray-600 mb-6">Choose payment method below</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div
              className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedPaymentMethod === "ecocash"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedPaymentMethod("ecocash")}
            >
              <div className="flex flex-col items-center text-center">
                <CreditCard className="w-8 h-8 text-gray-600 mb-2" />
                <span className="text-sm font-medium text-gray-900">EcoCash</span>
              </div>
              {selectedPaymentMethod === "ecocash" && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            <div
              className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedPaymentMethod === "paynow"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedPaymentMethod("paynow")}
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">OneMoney</div>
                <span className="text-xs text-gray-600">Netone</span>
              </div>
              {selectedPaymentMethod === "paynow" && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            <div
              className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedPaymentMethod === "paypay"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setSelectedPaymentMethod("paypay")}
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-xl font-bold text-purple-600 mb-2">PayPal</div>
                <span className="text-xs text-gray-600">Zimbabwe</span>
              </div>
              {selectedPaymentMethod === "paypay" && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Billing and Payment Forms */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Billing Address */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Billing Info</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name*</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              <ZimbabweCitySelector
                selectedCity={selectedCity}
                onCityChange={setSelectedCity}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Billing Address</label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => handleInputChange("street", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Fyrverkarbacken"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="12304"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+263 (77)"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Payment Info</h3>
            </div>

            <div className="space-y-4">
              {selectedPaymentMethod === "ecocash" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">EcoCash Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0777777777"
                  />
                </div>
              )}

              {selectedPaymentMethod === "paynow" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">PayNow ID (Mobile/NRIC/UEN)</label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Mobile Number or NRIC"
                  />
                </div>
              )}

              {selectedPaymentMethod === "paypay" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">PayPay Account ID</label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="PayPay ID or Mobile Number"
                  />
                </div>
              )}

              <div className="flex items-center space-x-2 mt-4">
                <input
                  type="checkbox"
                  id="savePayment"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="savePayment" className="text-sm text-gray-700">
                  Set as default payment method
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
          <button 
            onClick={() => navigate("/shop")}
            className="w-full sm:w-auto px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            RETURN TO STORE
          </button>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <button className="w-full sm:w-auto px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              BACK TO SHIPPING
            </button>
            <button className="w-full sm:w-auto px-8 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium">
              PROCEED
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}