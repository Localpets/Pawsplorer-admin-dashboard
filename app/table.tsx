'use client'

import React, { useState } from 'react';
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlineCheck, HiOutlineX } from 'react-icons/hi';
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';
import { makeRequest } from '../library/axios';

interface User {
  user_id: number;
  first_name: string;
  username: string;
  last_name: string;
  email: string;
  phone_number: number;
  gender: string;
  type: string;
}

export default function UsersTable({ users }: { users: User[] }) {
  const [editingUser, setEditingUser] = useState<number | null>(null);
  const [editedUserData, setEditedUserData] = useState<Partial<User>>({});

  const handleEdit = (user: User) => {
    setEditingUser(user.user_id);
    setEditedUserData(user);
  };

  const handleSave = async (user: User) => {
    const confirmEdit = window.confirm(`Do you want to edit this user ${user.first_name} ${user.last_name}?`);
    if (confirmEdit) {
      try {
        await makeRequest.put(`user/update/${user.user_id}`, editedUserData);
        setEditingUser(null);
        setEditedUserData({});
      } catch (error) {
        window.confirm('Error editing user')
        console.error('Error editing user:', error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditedUserData({});
  };

  const handleDelete = async (user: User) => {
    const confirmDelete = window.confirm(`Do you want delete user ${user.first_name} ${user.last_name}?`);
    if (confirmDelete) {
      try {
        await makeRequest.delete(`user/delete/${user.user_id}` )
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>UserId</TableHeaderCell>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Lastname</TableHeaderCell>
          <TableHeaderCell>Username</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Phone</TableHeaderCell>
          <TableHeaderCell>UserType</TableHeaderCell>
          <TableHeaderCell>Gender</TableHeaderCell>
          <TableHeaderCell>Controls</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.user_id}>
            <TableCell>{user.user_id}</TableCell>
            <TableCell>
              {editingUser === user.user_id ? (
                <input
                  className='w-full'
                  
                  value={editedUserData.first_name || user.first_name}
                  onChange={(e) =>
                    setEditedUserData({
                      ...editedUserData,
                      first_name: e.target.value,
                    })
                  }
                />
              ) : (
                <Text>{user.first_name}</Text>
              )}
            </TableCell>
            <TableCell>
              {editingUser === user.user_id ? (
                <input
                  className='w-full'
                  value={editedUserData.last_name || user.last_name}
                  onChange={(e) =>
                    setEditedUserData({
                      ...editedUserData,
                      last_name: e.target.value,
                    })
                  }
                />
              ) : (
                <Text>{user.last_name}</Text>
              )}
            </TableCell>
            <TableCell>
              {editingUser === user.user_id ? (
                <input
                  className='w-full'
                  value={editedUserData.username || user.username}
                  onChange={(e) =>
                    setEditedUserData({
                      ...editedUserData,
                      username: e.target.value,
                    })
                  }
                />
              ) : (
                <Text>{user.username}</Text>
              )}
            </TableCell>
            {/* Repeat the pattern for other fields */}
            <TableCell>
              {editingUser === user.user_id ? (
                <input
                  className='w-full'
                  value={editedUserData.email || user.email}
                  onChange={(e) =>
                    setEditedUserData({
                      ...editedUserData,
                      email: e.target.value,
                    })
                  }
                />
              ) : (
                <Text>{user.email}</Text>
              )}
            </TableCell>
            <TableCell>
              {editingUser === user.user_id ? (
                <input
                  className='w-full'
                  value={editedUserData.phone_number || user.phone_number}
                  onChange={(e) =>
                    setEditedUserData({
                      ...editedUserData,
                      phone_number: e.target.value,
                    })
                  }
                />
              ) : (
                <Text>{user.phone_number}</Text>
              )}
            </TableCell>
            <TableCell>
              {editingUser === user.user_id ? (
                <select
                  className='w-full'
                  value={editedUserData.type || user.type}
                  onChange={(e) =>
                    setEditedUserData({
                      ...editedUserData,
                      type: e.target.value,
                    })
                  }
                >
                  <option value="admin">ADMIN</option>
                  <option value="user">User</option>
                  <option value="member">Member</option>
                </select>
              ) : (
                <Text>{user.type}</Text>
              )}
            </TableCell>
            <TableCell>
              {editingUser === user.user_id ? (
                <select
                  className='w-full'
                  value={editedUserData.gender || user.gender}
                  onChange={(e) =>
                    setEditedUserData({
                      ...editedUserData,
                      gender: e.target.value,
                    })
                  }
                >
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="no binario">No Binario</option>
                  <option value="otros">Otros</option>
                </select>
              ) : (
                <Text>{user.gender}</Text>
              )}
            </TableCell>
            <TableCell className="flex gap-2">
            {editingUser === user.user_id ? (
                <>
                  <HiOutlineCheck
                    className='text-3xl cursor-pointer hover:text-green-400 hover:bg-[#1111] hover:rounded-md'
                    onClick={() => handleSave(user)} />
                  <HiOutlineX
                    className='text-3xl cursor-pointer hover:text-red-400 hover:bg-[#1111] hover:rounded-md'
                    onClick={handleCancelEdit} />
                </>
              ) : (
                <>
                  <HiOutlinePencilAlt
                    className='text-3xl cursor-pointer hover:text-green-400 hover:bg-[#1111] hover:rounded-md'
                    onClick={() => handleEdit(user)}
                  />
                  <HiOutlineTrash
                    className='text-3xl cursor-pointer hover:text-red-400 hover:bg-[#1111] hover:rounded-md'
                    onClick={() => handleDelete(user)}
                  />
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}