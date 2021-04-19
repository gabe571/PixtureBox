import { NavLink } from 'react-router-dom';

function Navbar() {

    return(
        <div>
             <NavLink to='/' className='Nav_link' activeStyle={{ color: 'tomato'}}><h1>PixtureBox</h1></NavLink>
        </div>
    )
}

export default Navbar