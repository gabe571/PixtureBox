import { NavLink } from 'react-router-dom';

function Navbar() {

    return(
        <div>
             <NavLink to='/' className='Nav_link' activeStyle={{ color: 'tomato'}}><li>PixtureBox</li></NavLink>
             <NavLink to='/profile' className='Nav_link_two' activeStyle={{ color: 'tomato'}}><li>Profile</li></NavLink>
        </div>
    )
}

export default Navbar