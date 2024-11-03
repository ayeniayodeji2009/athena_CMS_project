// frontend/src/components/ContentList.js
import React, { useEffect, useState } from "react";
import AdminDelete from "./AdminDelete";
// import AdminUpdate from "./AdminUpdate"
import { useNavigate } from "react-router-dom";


const AdminContentList = () => {
    const [contentList, setContentList] = useState([]);
    // const [navToUpdate, setNavToUpdate] = useState(false)
    // const [currentContentID, setCurrentContentID] = useState(2)
    const navigate = useNavigate();

    const navigateToUpdatePage = (content_id) => {
        navigate(`/admin/updatecontent/`, { state: {contentID: content_id} }); // from const navigate above
        console.log(content_id)
    };

    const navigateToViewPage = (content_id) => {
        navigate(`/viewcontent`, { state: content_id }); // from const navigate above
    }

    // const handleClick = (content_id) => {
    //     console.log(`sender comp - ${content_id}`)
    //     navigate(`/updatecontent/${content_id}`);
    // };

    // function navToUpdateHandleClick(status) {
    //     return setNavToUpdate(status)
    // }


    useEffect(() => {
        fetch("http://127.0.0.1:5000/contents")
            .then((res) => res.json())
            .then((data) => setContentList(data));
    }, []);

    return (
        <div>
            <h2>Admin Content List</h2>
            <ol>
                {contentList.map((content) => (
                    <li key={content.id}>
                        <h3>{content.title} <button onClick={() => navigateToViewPage(content.id)}>view</button></h3>
                        <p>{content.category}</p>
                        {/* {setCurrentContentID(content.id)} */}
                        <button onClick={() => navigateToUpdatePage(content.id)}>Update Content</button>
                        <AdminDelete content_id={content.id} />
                    </li>
                )).reverse()}
            </ol>
        </div>
    );
};

export default AdminContentList;





















// // frontend/src/components/ContentList.js
// import React, { useEffect, useState, useContext } from "react";
// import AdminDelete from "./AdminDelete";
// // import AdminUpdate from "./AdminUpdate"
// import { SharePreviewDataContext } from "../Context_API/sharePreviewData";
// import { useNavigate } from "react-router-dom";


// const AdminContentList = () => {
//     const { setUpdateContentID } = useContext(SharePreviewDataContext);
//     const [contentList, setContentList] = useState([]);
//     // const [navToUpdate, setNavToUpdate] = useState(false)
//     // const [currentContentID, setCurrentContentID] = useState(2)
//     const navigate = useNavigate();

//     const navigateToUpdatePage = (content_id) => {
//         // navigate(`/admin/updatecontent/`, { state: {contentID: content_id} }); // from const navigate above
//         navigate(`/admin/updatecontent/`); // from const navigate above
//         setUpdateContentID(content_id)
//         console.log(content_id)
//     };

//     const navigateToViewPage = (content_id) => {
//         navigate(`/viewcontent`, { state: content_id }); // from const navigate above
//     }

//     // const handleClick = (content_id) => {
//     //     console.log(`sender comp - ${content_id}`)
//     //     navigate(`/updatecontent/${content_id}`);
//     // };

//     // function navToUpdateHandleClick(status) {
//     //     return setNavToUpdate(status)
//     // }


//     useEffect(() => {
//         fetch("http://127.0.0.1:5000/contents")
//             .then((res) => res.json())
//             .then((data) => setContentList(data));
//     }, []);

//     return (
//         <div>
//             <h2>Admin Content List</h2>
//             <ol>
//                 {contentList.map((content) => (
//                     <li key={content.id}>
//                         <h3>{content.title} <button onClick={() => navigateToViewPage(content.id)}>view</button></h3>
//                         <p>{content.category}</p>
//                         {/* {setCurrentContentID(content.id)} */}
//                         <button onClick={() => navigateToUpdatePage(content.id)}>Update Content</button>
//                         <AdminDelete content_id={content.id} />
//                     </li>
//                 )).reverse()}
//             </ol>
//         </div>
//     );
// };

// export default AdminContentList;
