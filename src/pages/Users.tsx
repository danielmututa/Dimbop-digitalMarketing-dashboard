// import React from 'react';
// import useFetch from '@/hooks/useFetch';
// import { DeleteApi } from '@/api';
// import { useAuthStore } from '@/context/userContext';
// import { User } from '@/components/interfaces/auth';
// // import { toast } from 'react-toastify';
// import { Button } from "@/components/ui/button"
// // import { toast } from "@/components/ui/sonner"
// import { toast } from "sonner"

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"


// interface UserTableProps {
//   onUserAction?: () => void;
// }

// const Users: React.FC<UserTableProps> = ({ onUserAction }) => {
//   const { token } = useAuthStore();
//   // Update the type to match what your API actually returns
//   const { data: apiResponse, loading, error, refetch } = useFetch<{ success: boolean; data: User[] }>('/api/auth/users');
//   const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

//   // Safely extract users array
//   const users = apiResponse?.data || [];

//   console.log('Current token:', token);
//   console.log('Users data:', apiResponse);
//   console.log('Loading state:', loading);
//   console.log('Error state:', error);

//   const handleDelete = async (userId: number) => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this user?');
//     if (!confirmDelete) return;
  
//     try {
//       await DeleteApi(userId.toString());
//       toast.success('User deleted successfully');
//       refetch();
//       onUserAction?.();
//     } catch (error: any) {
//       toast.error(error.message || 'Failed to delete user');
//       console.error('Delete error:', error);
//     }
//   };
  


  
  


//   const handleView = (email: string) => {
//     const user = users.find(u => u.email === email);
//     if (user) {
//       setSelectedUser(user);
//     }
//   };

//   if (loading) return <div className="text-center py-8">Loading users...</div>;
//   if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
//   if (!users || users.length === 0) return <div className="text-center py-8">No users found</div>;

//   return (
//     <div className="w-full">
//       {selectedUser && (
//         <div className="mb-4 p-4 bg-gray-100 rounded-lg">
//           <h3 className="font-bold">User Details</h3>
//           <p>Name: {selectedUser.username}</p>
//           <p>Email: {selectedUser.email}</p>
//           <p>Role: {selectedUser.role}</p>
//           <button 
//             onClick={() => setSelectedUser(null)}
//             className="mt-2 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
//           >
//             Close
//           </button>
//         </div>
//       )}

//       <table className="w-full bg-white border border-gray-200">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-600">Name</th>
//             <th className="py-3 text-start px-4 border-b border-gray-200 text-left text-gray-600">Email</th>
//             <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-600">Role</th>
//             <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-600">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.email} className="hover:bg-gray-50">
//               <td className="py-3 text-start  px-4 border-b border-gray-200">{user.username}</td>
//               <td className="py-3 text-start  px-4 border-b border-gray-200">{user.email}</td>
//               <td className="py-3  text-start  px-4 border-b border-gray-200 capitalize">{user.role}</td>
//               <td className="py-3 px-4 border-b border-gray-200">
//                 <div className="flex space-x-2">
//                  <Button variant="outline"
//                     onClick={() => handleView(user.email)}
//                     className="px-3 py-1  "
//                   >
//                     View
//                   </Button>
//                   {/* <Button
//   variant="outline"
//   onClick={() => handleDelete(user.id)}  
//   className="px-3 py-1"
// >
//   Delete
// </Button> */}


// {/* <Button
//       variant="outline"
//       onClick={() =>
//         toast("Event has been created", {
//           description: "Sunday, December 03, 2023 at 9:00 AM",
//           action: {
//             label: "Undo",
//             onClick: () => console.log("Undo"),
//           },
//         })
//       }
//     >
//       Show Toast
//     </Button> */}

//     <Dialog>
//   <DialogTrigger> <Button
//   variant="outline"
//   onClick={() => handleDelete(user.id)}  
//   className="px-3 py-1"
// >
//   Delete
// </Button> </DialogTrigger>
//   <DialogContent>
//     <DialogHeader>
//       <DialogTitle>Are you absolutely sure?</DialogTitle>
//       <DialogDescription>
//         You want to delete this user {user.username}
//       </DialogDescription>
//     </DialogHeader>
//   </DialogContent>
// </Dialog>



//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Users;










import React from 'react';
import useFetch from '@/hooks/useFetch';
import { DeleteApi } from '@/api';
// import { useAuthStore } from '@/context/userContext';
import { User } from '@/components/interfaces/auth';
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"

interface UserTableProps {
  onUserAction?: () => void;
}

const Users: React.FC<UserTableProps> = ({ onUserAction }) => {

  const { data: apiResponse, loading, error, refetch } = useFetch<{ success: boolean; data: User[] }>('/api/auth/users');
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [userToDelete, setUserToDelete] = React.useState<number | null>(null);

  const users = apiResponse?.data || [];

  const handleDelete = async () => {
    if (userToDelete === null) return;
    
    try {
      await DeleteApi(userToDelete.toString());
      toast.success('User deleted successfully');
      refetch();
      onUserAction?.();
      setDeleteDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete user');
      console.error('Delete error:', error);
    }
  };

  const handleView = (email: string) => {
    const user = users.find(u => u.email === email);
    if (user) {
      setSelectedUser(user);
    }
  };

  if (loading) return <div className="text-center py-8">Loading users...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!users || users.length === 0) return <div className="text-center py-8">No users found</div>;

  return (
    <div className="w-full">
      {selectedUser && (
        <div className="mb-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-bold">User Details</h3>
          <p>Name: {selectedUser.username}</p>
          <p>Email: {selectedUser.email}</p>
          <p>Role: {selectedUser.role}</p>
          <button 
            onClick={() => setSelectedUser(null)}
            className="mt-2 px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            Close
          </button>
        </div>
      )}

      <table className="w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-600">Name</th>
            <th className="py-3 text-start px-4 border-b border-gray-200 text-left text-gray-600">Email</th>
            <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-600">Role</th>
            <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email} className="hover:bg-gray-50">
              <td className="py-3 text-start px-4 border-b border-gray-200">{user.username}</td>
              <td className="py-3 text-start px-4 border-b border-gray-200">{user.email}</td>
              <td className="py-3 text-start px-4 border-b border-gray-200 capitalize">{user.role}</td>
              <td className="py-3 px-4 border-b border-gray-200">
                <div className="flex space-x-2">
                  <Button 
                    variant="outline"
                    onClick={() => handleView(user.email)}
                    className="px-3 py-1"
                  >
                    View
                  </Button>
                  
                  <Dialog open={deleteDialogOpen && userToDelete === user.id} onOpenChange={setDeleteDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => setUserToDelete(user.id)}
                        className="px-3 py-1"
                      >
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          You want to delete this user {user.username}
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button 
                          variant="destructive"
                          onClick={handleDelete}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;