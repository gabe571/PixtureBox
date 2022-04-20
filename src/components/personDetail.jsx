// import React, { useState, useEffect } from 'react';

// function personDetail() {

//     useEffect(() => {
//         fetch(` https://api.themoviedb.org/3/person/1?api_key=63cad23fc5d27c914717d084f3379dd9&language=en-US`)
//           .then((response) => {
//             if (!response.ok) {
//               throw new Error(
//                 `This is an HTTP error: The status is ${response.status}`
//               );
//             }
//             return response.json();
//           })
//           .then((actualData) => console.log(actualData))
//           .catch((err) => {
//             console.log(err.message);
//           });
//       }, []);
    
     
//       return (
//         <div>
//              <h1>API Posts</h1>
//           {loading && <div>A moment please...</div>}
//           {error && (
//             <div>{`There is a problem fetching the post data - ${error}`}</div>
//           )}
//           <ul>
//             {data &&
//               data.map(({ id, title }) => (
//                 <li key={id}>
//                   <h3>testing {title}</h3>
//                 </li>
//               ))}
//           </ul>
          
//         </div>
//       )
//     }

// export default personDetail
