import React from 'react';
import useFetch from '@/hooks/useFetch';
import { DeleteApi } from '@/api';
import { User } from '@/components/interfaces/auth';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter
} from '@/components/ui/alert-dialog';
import { Loader } from 'lucide-react';

interface UserTableProps {
  onUserAction?: () => void;
}

const Users: React.FC<UserTableProps> = ({ onUserAction }) => {
  const { data: apiResponse, isLoading, error, refetch } = useFetch<{ success: boolean; data: User[] }>('/api/auth/users');
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

  if (isLoading) return <div className="flex h-screen w-full items-center justify-center"><Loader /></div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!users || users.length === 0) return <div className="text-center py-8">No users found</div>;

  return (
    <div className="w-full py-5  lg:py-10">
      <h2 className="text-lg lg:text-2xl font-semibold mb-6">Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Name</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Email</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Phone</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Role</th>
              <th className="py-3 px-4 border-b border-gray-200 text-left text-gray-600 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b border-gray-200">{user.username}</td>
                <td className="py-3 px-4 border-b border-gray-200">{user.email}</td>
                <td className="py-3 px-4 border-b border-gray-200">{user.phone || 'Not provided'}</td>
                <td className="py-3 px-4 border-b border-gray-200 capitalize">{user.role}</td>
                <td className="py-3 px-4 border-b border-gray-200">
                  <div className="flex space-x-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          onClick={() => setSelectedUser(user)}
                          className="text-[12px] md:text-sm"
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
                            <AlertDialogDescription>Phone: {selectedUser.phone || 'Not provided'}</AlertDialogDescription>
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
                          className="text-[12px] md:text-sm"
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
                            <Button variant="outline" className="text-[12px] md:text-sm">
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button
                            variant="destructive"
                            onClick={handleDelete}
                            className="text-[12px] md:text-sm"
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
    </div>
  );
};

export default Users;