// En esta página Add User, se encuentra un formulario para agregar usuarios con varios campos
// y opciones.

'use client'

import { useState } from 'react';
import { HiOutlineSpeakerphone, HiOutlineClock } from 'react-icons/hi';
import { makeRequest } from '../../library/axios'
import './page.css'

// El componente PlaygroundPage renderiza un formulario interactivo para agregar usuarios.
export default function PlaygroundPage() {
  const [saving, setSaving] = useState<boolean>(false);
  // Datos iniciales del formulario
  const initialFormData = {
    phone_number: '',    
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    type: '',
    gender: '',
    marketing_accept: false,
  };

  const [formData, setFormData] = useState(initialFormData);

  // Maneja el cambio en los campos del formulario
  const handleChange = (event: any) => {
  // Obtiene información del evento
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    // Actualiza el estado del formulario con los nuevos valores
    setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      setSaving(true); // Iniciar el estado de carga
      // Envía los datos al servidor para registrar un nuevo usuario
      const response = await makeRequest.post("/auth/register", formData)

      if (response.status == 201) {
        console.log('Usuario creado exitosamente');
        setFormData(initialFormData); // Reinicia el formulario después del registro exitoso
        setSaving(false); // Finalizar el estado de carga
      } else {
        window.confirm('Error al crear el usuario');
        console.error('Error al crear el usuario');
        setSaving(false); // Finalizar el estado de carga en caso de error
      }
    } catch (error) {
      window.confirm('Error al conectar a la api');
      console.error('Error de red:', error);
      setSaving(false); // Finalizar el estado de carga en caso de error
    }
  };

  // Renderiza el formulario para agregar usuarios
  return (
    <main className="p-4 md:p-10 mx-auto w-full md:w-[50%] select-none">
      <div className="bg-[#112233eb] text-white rounded-md p-4 flex justify-center">
        <h1 className="font-bold">Formulario para agregar usuarios</h1>
      </div>

      {saving ? (
          <div className="bg-[#112233] flex justify-center items-center gap-2 text-white px-4 py-2 rounded-md mt-4">
            <HiOutlineClock className="animate-spin text-3xl cursor-pointer text-white" />
            <h1>Creando usuario</h1>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 p-4 bg-gray-200 rounded-md flex flex-col gap-2">
          <label className='flex justify-between gap-2 hover:bg-[#1111]'>
                Firstname:
                <input
                  required
                  className='pl-2 rounded-sm w-[14em]'
                  type="text"
                  name="first_name"
                  placeholder='Please enter a first name'
                  value={formData.first_name}
                  onChange={handleChange} />
              </label><label className='flex justify-between gap-2 hover:bg-[#1111]'>
                  Lastname:
                  <input
                    className='pl-2 rounded-sm w-[14em]'
                    type="text"
                    name="last_name"
                    placeholder='Please enter a last name'
                    value={formData.last_name}
                    onChange={handleChange} />
                </label><label className='flex justify-between gap-2 hover:bg-[#1111]'>
                  Username:
                  <input
                    required
                    className='pl-2 rounded-sm w-[14em]'
                    type="text"
                    name="username"
                    placeholder='Please enter a username'
                    value={formData.username}
                    onChange={handleChange} />
                </label><label className='flex justify-between gap-2 hover:bg-[#1111]'>
                  Email:
                  <input
                    required
                    className='pl-2 rounded-sm w-[14em]'
                    type="email"
                    name="email"
                    placeholder='RamdonEmail@email.com'
                    value={formData.email}
                    onChange={handleChange} />
                </label><label className='flex justify-between gap-2 hover:bg-[#1111]'>
                  Phone:
                  <input
                    required
                    className='pl-2 rounded-sm w-[14em]'
                    type="tel"
                    placeholder='123-456-7891'
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange} />
                </label><label className='flex justify-between gap-2 hover:bg-[#1111]'>
                  Password:
                  <input
                    required
                    className='pl-2 rounded-sm w-[14em]'
                    type="password"
                    name="password"
                    placeholder='••••••••••••••••••'
                    value={formData.password}
                    onChange={handleChange} />
                </label><label className='flex justify-between gap-2 hover:bg-[#1111]'>
                  Acepta Marketing:
                  <div className='flex items-center gap-2'>
                    <input
                      className='peer pl-2 rounded-sm w-6 h-6 checked:bg-[#112233]'
                      type="checkbox"
                      name="marketing_accept"
                      checked={formData.marketing_accept}
                      onChange={handleChange} />
                    <HiOutlineSpeakerphone className=' w-6 h-6 peer-checked:text-[#2b7e2d] duration-300' />
                  </div>

                </label><label className='flex justify-between gap-2 hover:bg-[#1111]'>
                  Gender:
                  <select
                    required
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className='rounded-md drop-shadow-md bg-[#112233] duration-300 hover:bg-[#303a45] focus:bg-[#303a45] focus:ring-0 text-white'
                  >
                    <option value="" hidden selected>-Seleccione-</option>
                    <optgroup label="Normales">
                      <option value="masculino">masculino</option>
                      <option value="femenino">femenino</option>
                    </optgroup>
                    <optgroup label="Enfermos">
                      <option value="no binario">no binario</option>
                      <option value="otros">otros</option>
                    </optgroup>
                  </select>
                </label><label className='flex justify-between gap-2 hover:bg-[#1111]'>
                  User Type:
                  <select
                    required
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className='rounded-md drop-shadow-md bg-[#112233] duration-300 hover:bg-[#303a45] focus:bg-[#303a45] focus:ring-0 text-white'
                  >
                    <option value="" hidden selected>-Seleccione-</option>
                    <optgroup label="Roles">
                      <option value="Admin">Admin</option>
                      <option value="Member">Member</option>
                      <option value="User">User</option>
                    </optgroup>
                  </select>
                </label><button
                  type="submit"
                  className="bg-[#112233] text-white px-4 py-2 rounded-md mt-4"
                >
                  Agregar Usuario
                </button>
              </form>
        )}
    </main>
  );
}
