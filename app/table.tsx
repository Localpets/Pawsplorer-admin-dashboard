// Este componente UsersTable es una tabla interactiva que muestra información de usuarios y permite
// la edición y eliminación de usuarios.

'use client'

import React, { useState, useEffect } from 'react';
import { HiOutlinePencilAlt, HiOutlineTrash, HiOutlineCheck, HiOutlineX, HiOutlineClock } from 'react-icons/hi';
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

// La interfaz User define la estructura de los datos de usuario.
interface User {
  user_id: number;
  first_name: string;
  username: string;
  last_name: string;
  email: string;
  phone_number: string;
  gender: string;
  type: string;
}

// Este componente funcional UsersTable realiza una solicitud a la API para obtener la lista de usuarios
// y muestra una tabla con sus detalles. Permite la edición y eliminación de usuarios.
export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [editingUser, setEditingUser] = useState<number | null>(null);
  const [editedUserData, setEditedUserData] = useState<Partial<User>>({});
  const [saving, setSaving] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Realizar la solicitud a la API para obtener la lista de usuarios
  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true) // Iniciar el estado de carga
        const response = await makeRequest.get('/user/find/all');
        setUsers(response.data.data);
        setLoading(false) // Finalizar el estado de carga
      } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
        setLoading(false) // Finalizar el estado de carga en caso de error
      }
    }
    fetchUsers();
  }, []);

  // Maneja la acción de editar un usuario, almacenando los datos editados en el estado.
  const handleEdit = (user: User) => {
    setEditingUser(user.user_id);
    // Establecer los datos editados en el estado, pero con los valores actuales del usuario
    setEditedUserData({ ...user });
    // Seleccionar fila para aplicar estilo
    setSelectedRow(user.user_id);
  };

  // Maneja la acción de guardar los cambios editados de un usuario en el servidor.
  const handleSave = async (user: User) => {
    const confirmEdit = window.confirm(`¿Deseas editar a ${user.first_name} ${user.last_name}?`);
    if (confirmEdit) {
      try {
        setSaving(true); // Iniciar el estado de carga
        await makeRequest.put(`user/update/${user.user_id}`, editedUserData);
        // Actualizar los datos del usuario editado en el estado local
        setUsers(prevUsers =>
          prevUsers.map(prevUser =>
            prevUser.user_id === user.user_id ? { ...prevUser, ...editedUserData } : prevUser
          )
        );
        setEditingUser(null);
        setEditedUserData({});
        setSaving(false); // Finalizar el estado de carga
        setSelectedRow(null); //Deseleccionar fila
      } catch (error) {
        window.confirm('Error al editar el usuario');
        console.error('Error al editar el usuario:', error);
        setSaving(false); // Finalizar el estado de carga en caso de error
      }
    }
  };

  // Maneja la acción de cancelar la edición de un usuario.
  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditedUserData({});
    setSelectedRow(null);
  };

  // Maneja la acción de eliminar un usuario.
  const handleDelete = async (user: User) => {
    const confirmDelete = window.confirm(`¿Deseas eliminar a ${user.first_name} ${user.last_name}?`);
    if (confirmDelete) {
      try {
        setDeleting(true); // Iniciar el estado de carga
        await makeRequest.delete(`user/delete/${user.user_id}`);
        // Remover el usuario eliminado del estado local
        setUsers(prevUsers => prevUsers.filter(prevUser => prevUser.user_id !== user.user_id));
        setDeleting(false); // Finalizar el estado de carga
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        setDeleting(false); // Finalizar el estado de carga en caso de error
      }
    }
  }

  // La función renderiza la tabla y los controles de edición y eliminación.
  return (
    <>
      {loading ? (
          <div className='flex gap-2 items-center'>
            <HiOutlineClock className="animate-spin text-3xl cursor-pointer text-gray-400" />
            <h1>Cargando tablas desde la api</h1>
          </div>
        ) : (
      <Table>
        <TableHead>
          {/* Encabezados de la tabla */}
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
          </TableHead><TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.user_id}
                  className={`${selectedRow === user.user_id ? 'bg-[#e7e7e779]' : ''} transition-colors duration-300`}
                >
                  {/* Filas de la tabla con detalles de usuario */}
                  <TableCell>{user.user_id}</TableCell>
                  {/* Celdas editables o de solo lectura */}
                  <TableCell>
                    {editingUser === user.user_id ? (
                      <input
                        className='rounded-md bg-[#e7e7e779]'
                        style={{ width: `${user.first_name.length + 2}ch` }}
                        value={editedUserData.first_name || user.first_name}
                        disabled={saving}
                        onChange={(e) => setEditedUserData({
                          ...editedUserData,
                          first_name: e.target.value,
                        })} />
                    ) : (
                      <Text>{user.first_name}</Text>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingUser === user.user_id ? (
                      <input
                        className='rounded-md bg-[#e7e7e779]'
                        style={{ width: `${user.last_name.length + 2}ch` }}
                        value={editedUserData.last_name || user.last_name}
                        disabled={saving}
                        onChange={(e) => setEditedUserData({
                          ...editedUserData,
                          last_name: e.target.value,
                        })} />
                    ) : (
                      <Text>{user.last_name}</Text>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingUser === user.user_id ? (
                      <input
                        className='rounded-md bg-[#e7e7e779]'
                        style={{ width: `${user.username.length + 2}ch` }}
                        value={editedUserData.username || user.username}
                        disabled={saving}
                        onChange={(e) => setEditedUserData({
                          ...editedUserData,
                          username: e.target.value,
                        })} />
                    ) : (
                      <Text>{user.username}</Text>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingUser === user.user_id ? (
                      <input
                        className='rounded-md bg-[#e7e7e779]'
                        style={{ width: `${user.email.length + 2}ch` }}
                        value={editedUserData.email || user.email}
                        disabled={saving}
                        onChange={(e) => setEditedUserData({
                          ...editedUserData,
                          email: e.target.value,
                        })} />
                    ) : (
                      <Text>{user.email}</Text>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingUser === user.user_id ? (
                      <input
                        className='rounded-md bg-[#e7e7e779]'
                        style={{ width: `${user.phone_number.length + 2}ch` }}
                        value={editedUserData.phone_number || user.phone_number}
                        disabled={saving}
                        onChange={(e) => setEditedUserData({
                          ...editedUserData,
                          phone_number: e.target.value,
                        })} />
                    ) : (
                      <text>{user.phone_number}</text>
                    )}
                  </TableCell>
                  <TableCell className='w-12'>
                    {editingUser === user.user_id ? (
                      <select
                        className='rounded-md drop-shadow-md bg-[#112233] duration-300 hover:bg-[#303a45] focus:bg-[#303a45] focus:ring-0 text-white'
                        style={{ width: `${user.type.length + 4}ch` }}
                        value={editedUserData.type || user.type}
                        disabled={saving}
                        onChange={(e) => setEditedUserData({
                          ...editedUserData,
                          type: e.target.value,
                        })}
                      >
                        <optgroup label="User Roles">
                          <option value="admin">admin</option>
                          <option value="member">member</option>
                          <option value="user">user</option>
                        </optgroup>
                      </select>
                    ) : (
                      <Text>{user.type}</Text>
                    )}
                  </TableCell>
                  <TableCell className='w-12'>
                    {editingUser === user.user_id ? (
                      <select
                        className='rounded-md drop-shadow-md bg-[#112233] duration-300 hover:bg-[#303a45] focus:bg-[#303a45] focus:ring-0 text-white'
                        style={{ width: `${user.gender.length + 2}ch` }}
                        value={editedUserData.gender || user.gender}
                        disabled={saving}
                        onChange={(e) => setEditedUserData({
                          ...editedUserData,
                          gender: e.target.value,
                        })}
                      >
                        <optgroup label="Generos">
                          <option value="masculino">masculino</option>
                          <option value="femenino">femenino</option>
                          <option value="no binario">no binario</option>
                          <option value="otros">otros</option>
                        </optgroup>
                      </select>
                    ) : (
                      <Text>{user.gender}</Text>
                    )}
                  </TableCell>
                  {/* Controles para editar o eliminar */}
                  {editingUser === user.user_id ? (
                    <TableCell className="flex gap-2">
                      {saving ? (
                        <div className="animate-spin">
                          <HiOutlineClock className="text-3xl cursor-pointer text-gray-400" />
                        </div>
                      ) : (
                        <>
                          <HiOutlineCheck
                            className="text-3xl cursor-pointer hover:text-green-400 hover:bg-[#1111] hover:rounded-md"
                            onClick={() => handleSave(user)} />
                          <HiOutlineX
                            className="text-3xl cursor-pointer hover:text-red-400 hover:bg-[#1111] hover:rounded-md"
                            onClick={handleCancelEdit} />
                        </>
                      )}
                    </TableCell>
                  ) : (
                    <TableCell className="flex gap-2">
                      {deleting ? (
                        <div className="animate-spin">
                          <HiOutlineClock className="text-3xl cursor-pointer text-gray-400" />
                        </div>
                      ) : (
                        <>
                          <HiOutlinePencilAlt
                            className="text-3xl cursor-pointer hover:text-green-400 hover:bg-[#1111] hover:rounded-md"
                            onClick={() => handleEdit(user)} />
                          <HiOutlineTrash
                            className="text-3xl cursor-pointer hover:text-red-400 hover:bg-[#1111] hover:rounded-md"
                            onClick={() => handleDelete(user)} />
                        </>
                      )}

                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
      </Table>
    )}
    </>
  );
}