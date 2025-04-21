import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"

  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

 

const Account = () => {
  return (
    <div>
 <Sheet>
  <SheetTrigger>  <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>DM</AvatarFallback>
</Avatar>
</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
    </div>
  )
}

export default Account