
import { Input } from "@/components/ui/input"
import Account from "@/Account/Account"




const Navbar = () => {
  return (
    <div className=' gap-4 pl-2 flex justify-between w-full'>
        <Input placeholder='Search items' className='py-2' />

       
            <Account />
      
</div>
  )
}

export default Navbar