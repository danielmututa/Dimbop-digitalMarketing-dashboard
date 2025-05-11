import React from 'react';
import useFetch from '@/hooks/useFetch';
import { DeleteApi } from '@/api';
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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"



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


  if (loading) return <div className="text-center py-8">Loading users...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!users || users.length === 0) return <div className="text-center py-8">No users found</div>;

  return (
    <div className="w-full">



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
              
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button
      variant="outline"
      onClick={() => setSelectedUser(user)} // set the user directly
    >
      View
    </Button>
  </AlertDialogTrigger>
  {selectedUser?.email === user.email && (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>User Details</AlertDialogTitle>
        <AlertDialogDescription>Name: {selectedUser.username}</AlertDialogDescription>
        <AlertDialogDescription>Email: {selectedUser.email}</AlertDialogDescription>
        <AlertDialogDescription>Role: {selectedUser.role}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction onClick={() => setSelectedUser(null)}>Close</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )}
</AlertDialog>

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






