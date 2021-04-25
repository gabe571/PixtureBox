import { NavLink } from 'react-router-dom';

function Search() {



    return (
        <div>
               <NavLink to='/search' 
               className='Nav_link' 
               activeStyle={{ color: 'tomato'}}
               >
                   <h1>search</h1>
               </NavLink>
        </div>
    )
}

export default Search;