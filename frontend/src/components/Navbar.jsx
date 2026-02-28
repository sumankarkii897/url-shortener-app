import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
function Navbar() {
    const { token , logout} = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center text-white" >
        <div className="flex gap-4">
            <Link to = "/dashboard" className="font-bold" > Home</Link>
            {token && <Link to="/analytics" className="hover:text-gray-200">Analytics</Link>}
        </div>
        {
            token ? (
                <button className="bg-red-500 px-4 py-1 rounded"  onClick={logout}> Logout</button>
            )
            : (
                <button className="bg-red-500 px-4 py-1 rounded"> <Link to="/login"> Login</Link></button>
            )
        }
    </nav>
  )
}

export default Navbar