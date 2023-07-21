import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Appstate } from '../App';

const Header = () => {
  const useAppstate = useContext(Appstate);
  return (
    <div className='heading text-4xl border-b-2 border-red-300 p-2 flex justify-between pb-3 sticky top-0 bg-zinc-600 z-10'>
        <Link to={'/'}><h1><span className='font-serif'>My</span> <span className='text-red-500 font-serif'>MOVIE</span></h1></Link>

        {useAppstate.login ? 
          <Link to={'/addmovie'}><button className='text-lg hover:bg-gradient-to-r from-red-500 to-black-500 rounded-full p-2 border-2 border-red-300'> + Add new</button>
          </Link>
          :
          <Link to={'/login'}><button className='text-lg bg-green-500 p-2 mr-5 rounded-md'>Login</button>
          </Link>
        }
    </div>
  )
}

export default Header