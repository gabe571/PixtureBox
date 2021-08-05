import { NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

export function Navbar() {

    return(
        <div>
             <NavLink to='/' className='Nav_link' activeStyle={{ color: 'tomato'}}><li>PixtureBox</li></NavLink>
             <NavLink to='/' className='Nav_link' activeStyle={{ color: 'tomato'}}><li>Home</li></NavLink> 
             {/* <NavLink to='/search' className='Nav_link' activeStyle={{ color: 'tomato'}}><li>Search</li></NavLink> */}
        </div>
    )
}

export default Navbar

