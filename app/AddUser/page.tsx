'use client'

import { useState } from 'react';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { makeRequest } from '../../library/axios'

export default function PlaygroundPage() {
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

  const handleChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: newValue }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(formData)
    try {
      const response = await makeRequest.post("/auth/register", formData)

      if (response.status == 201) {
        console.log('Usuario creado exitosamente');
        setFormData(initialFormData);
      } else {
        console.error('Error al crear el usuario');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };


  return (
    <main className="p-4 md:p-10 mx-auto w-full md:w-[50%] select-none">
      <div className="bg-[#1111] rounded-md p-4 flex justify-center">
        <h1 className="font-bold">Formulario para agregar usuarios</h1>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 p-4 bg-gray-200 rounded-md flex flex-col gap-2">
      <label className='flex justify-between gap-2 hover:bg-[#1111]'>
          Firstname:
          <input
            required
            className='pl-2 rounded-sm'
            type="text"
            name="first_name"
            placeholder='Santiago'
            value={formData.first_name}
            onChange={handleChange}
          />
        </label>

        <label className='flex justify-between gap-2 hover:bg-[#1111]'>
          Lastname:
          <input
            className='pl-2 rounded-sm'
            type="text"
            name="last_name"
            placeholder='Echeverria'
            value={formData.last_name}
            onChange={handleChange}
          />
        </label>

        <label className='flex justify-between gap-2 hover:bg-[#1111]'>
          Username:
          <input
            required
            className='pl-2 rounded-sm'
            type="text"
            name="username"
            placeholder='ImPiolim'
            value={formData.username}
            onChange={handleChange}
          />
        </label>

        <label className='flex justify-between gap-2 hover:bg-[#1111]'>
          Email:
          <input
            required
            className='pl-2 rounded-sm'
            type="email"
            name="email"
            placeholder='Diazhpta2002@gmail.com'
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label className='flex justify-between gap-2 hover:bg-[#1111]'>
          Phone:
          <input
            required
            className='pl-2 rounded-sm'
            type="tel"
            placeholder='123 4567891'
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </label>

        <label className='flex justify-between gap-2 hover:bg-[#1111]'>
          Password:
          <input
            required
            className='pl-2 rounded-sm'
            type="password"
            name="password"
            placeholder='•••••••••'
            value={formData.password}
            onChange={handleChange}
          />
        </label>

        <label className='flex justify-between gap-2 hover:bg-[#1111]'>
          Acepta Marketing:
          <div className='flex items-center gap-2'>
            <input
            className='peer pl-2 rounded-sm'
            type="checkbox"
            name="marketing_accept"
            checked={formData.marketing_accept}
            onChange={handleChange}
            />
            <HiOutlineSpeakerphone className='peer-checked:text-blue-700'/>
          </div>
          
        </label>

        <label className='flex justify-between gap-2 hover:bg-[#1111]'>
          Gender:
          <select
            required
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="" selected>-Seleccione-</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </label>

        <label className='flex justify-between gap-2 hover:bg-[#1111]'>
          User Type:
          <select
            required
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="" selected>-Seleccione-</option>
            <option value="Miembro">Miembro</option>
            <option value="Usuario">Usuario</option>
          </select>
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Agregar Usuario
        </button>
      </form>

    </main>
  );
}
