import React from 'react';
import useFetch from '@/hooks/useFetch';
import { DeleteApi } from '@/api';
import { useAuthStore } from '@/context/userContext';
import { User } from '@/components/interfaces/auth';
import { toast } from 'react-toastify';
import { Button } from "@/components/ui/button"
import apiClient from '@/context/axios';
interface UserTableProps {
  onUserAction?: () => void;
}

const Users: React.FC<UserTableProps> = ({ onUserAction }) => {
  const { token } = useAuthStore();
  // Update the type to match what your API actually returns
  const { data: apiResponse, loading, error, refetch } = useFetch<{ success: boolean; data: User[] }>('/api/auth/users');
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  // Safely extract users array
  const users = apiResponse?.data || [];

  console.log('Current token:', token);
  console.log('Users data:', apiResponse);
  console.log('Loading state:', loading);
  console.log('Error state:', error);

  const handleDelete = async (userId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;
  
    try {
      await DeleteApi(userId.toString());
      toast.success('User deleted successfully');
      refetch();
      onUserAction?.();
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
              <td className="py-3 text-start  px-4 border-b border-gray-200">{user.username}</td>
              <td className="py-3 text-start  px-4 border-b border-gray-200">{user.email}</td>
              <td className="py-3  text-start  px-4 border-b border-gray-200 capitalize">{user.role}</td>
              <td className="py-3 px-4 border-b border-gray-200">
                <div className="flex space-x-2">
                 <Button variant="outline"
                    onClick={() => handleView(user.email)}
                    className="px-3 py-1  "
                  >
                    View
                  </Button>
                  <Button
  variant="outline"
  onClick={() => handleDelete(user.id)}  // ← this must now use user.id instead of email
  className="px-3 py-1"
>
  Delete
</Button>

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