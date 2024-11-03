// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import AdminNav from '../../../components/admin_components/AdminNav.js'; 
import ListContentPublic from '../../../components/public_components/PublicListContent.js';
// import HTMLContent from '../../components/tool_components/HTMLContent.js';




const HomePublic = () => {

    return (
        <div className="app">
            <h1>Project Athena CMS Public Home page </h1>
            <p>Navigation</p>
            <AdminNav />
            <ListContentPublic />
        </div>
    )
}


export default HomePublic






// const HomePublic = () => {
//     const [pages, setPages] = useState([]);
//     const [selectedPage, setSelectedPage] = useState(null);

//     // Fetch all pages on load
//     useEffect(() => {
//         axios.get('http://127.0.0.1:5000/contents')
//             .then(response => {
//                 setPages(response.data);
//             })
//             .catch(error => console.error(error));
//     }, []);

//     const fetchPage = (id) => {
//         axios.get(`http://127.0.0.1:5000/content/${id}`)
//             .then(response => {
//                 setSelectedPage(response.data);
//             })
//             .catch(error => console.error(error));
//     };

//     return (
//         <div className="app">
//             <p>Navigation</p>
//             <AdminNav />
//             <h1>Project Athena CMS</h1>
//             <div className="page-list">
//                 <h2>Pages</h2>
//                 <ul>
//                     {pages.map(page => (
//                         <li key={page.id} onClick={() => fetchPage(page.id)}>
//                             {page.title}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             <div className="page-content">
//                 {selectedPage ? (
//                     <>
//                         <h2>{selectedPage.title}</h2>
//                         {/* <p>{selectedPage.body}</p> */}
//                         <HTMLContent htmlString={selectedPage.body} />
//                     </>
//                 ) : (
//                     <p>Select a page to view content</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default HomePublic;
