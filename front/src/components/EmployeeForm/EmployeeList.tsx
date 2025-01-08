'use client'

import { useState } from 'react'

const mockEmployees = [
  { id: 1, name: 'Ana Martínez', position: 'Recepcionista', active: true },
  { id: 2, name: 'Pedro Sánchez', position: 'Mantenimiento', active: true },
  { id: 3, name: 'Laura Rodríguez', position: 'Limpieza', active: true },
  { id: 4, name: 'Carlos Gómez', position: 'Recepcionista', active: true },
  { id: 5, name: 'María López', position: 'Administrador', active: true },
]

const positions = ['Todos', 'Recepcionista', 'Mantenimiento', 'Limpieza', 'Administrador']

export default function EmployeeList() {
  const [nameFilter, setNameFilter] = useState('')
  const [positionFilter, setPositionFilter] = useState('Todos')
  const [employees, setEmployees] = useState(mockEmployees)

  const filteredEmployees = employees.filter(employee =>
    (positionFilter === 'Todos' || employee.position === positionFilter) &&
    (employee.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
     employee.position.toLowerCase().includes(nameFilter.toLowerCase()))
  )

  const handleDeactivate = (id: number) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, active: !emp.active } : emp
    ))
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h4 className="text-xl font-semibold mb-4">Lista de Empleados</h4>
      <div className="mb-4">
        <select
          value={positionFilter}
          onChange={(e) => setPositionFilter(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
        >
          {positions.map(position => (
            <option key={position} value={position}>{position}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Buscar empleados..."
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <ul className="divide-y divide-gray-200">
        {filteredEmployees.map(employee => (
          <li key={employee.id} className="py-4 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {employee.name}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {employee.position}
              </p>
            </div>
            <button className="px-3 py-1 rounded text-white text-sm bg-blue-500 hover:bg-blue-600">Editar</button>
            <button
              onClick={() => handleDeactivate(employee.id)}
              className={`px-3 py-1 rounded text-white text-sm ${
                employee.active ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {employee.active ? 'Dar de Baja' : 'Reactivar'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

