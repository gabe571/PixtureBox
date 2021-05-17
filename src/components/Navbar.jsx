import { NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

function Navbar() {

    return(
        <div>
             <NavLink to='/' className='Nav_link' activeStyle={{ color: 'tomato'}}><li>PixtureBox</li></NavLink>
             <NavLink to='/profile' className='Nav_link_two' activeStyle={{ color: 'tomato'}}><li><FaUserCircle size='50px' /></li></NavLink>
        </div>
    )
}

export default Navbar