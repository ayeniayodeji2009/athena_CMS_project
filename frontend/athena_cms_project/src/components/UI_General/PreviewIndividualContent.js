import React, { useState, useContext, useEffect } from "react";
import { SharePreviewDataContext } from "../Context_API/sharePreviewData";
import { useNavigate } from "react-router-dom";
// import GoBackButton from "./GoBackButton";

const PreviewIndividualContent = () => {
    const { updateTitle, setUpdateTitle, updatedContentID, updateBody, setUpdateBody /*, setUpdatedContentID*/ } = useContext(SharePreviewDataContext);
    const navigate = useNavigate();
    // const title = localStorage.getItem("title");
    // const body = localStorage.getItem("body");
    // const content_id = localStorage.getItem("content_id"); // assuming content_id is stored


    const [previewTitle, setPreviewTitle] = useState('');
    const [previewBody, setPreviewBody] = useState('');
    const [contentID, setContentID] = useState('')
    // const [copyTitle, setCopyTitle] = useState("")
    // const [copyBody, setCopyBody] = useState("")



    

    useEffect(() => {
        const savedTitle = localStorage.getItem('localTitle');
        const savedBody = localStorage.getItem('localBody');
        const savedContentID = localStorage.getItem('localContentID')
        if (savedTitle) setPreviewTitle(savedTitle);
        if (savedBody) setPreviewBody(savedBody);
        if (savedContentID) setContentID(savedContentID);
    }, []);


    let _previewTitle = previewTitle;
    let copyPreviewTitle = "";

    if (_previewTitle !== "") {
        copyPreviewTitle = _previewTitle;
        localStorage.setItem("localTitleCopy", copyPreviewTitle);
        // localStorage.setItem("localContentID", content_id);
    }

    let _previewBody = previewBody;
    let copyPreviewBody = "";

    if (_previewBody !== "") {
        copyPreviewBody = _previewBody;
        localStorage.setItem("localBodyCopy", copyPreviewBody);
    }


    //Copy of data to localStorage
    // useEffect(() => {
    //     const _copyTitle = localStorage.getItem('localTitleCopy');
    //     const _copyBody = localStorage.getItem('localBodyCopy');
    //     // const savedContentID = localStorage.getItem('localContentID')
    //     if (_copyTitle) setCopyTitle(_copyTitle);
    //     if (_copyBody) setCopyBody(_copyBody);
    //     // if (savedContentID) setContentID(savedContentID);
    // }, []);



    const handleUpdateSubmit = () => {
        fetch(`http://127.0.0.1:5000/content/${contentID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: updateTitle, body: updateBody }),
        })
        .then((res) => res.json())
        .then(() => {
            alert("Content updated successfully!");
            console.log("inspect preview submit success ", previewTitle, previewBody)
            navigate("/admin/contents");
        })
        .catch((error) => console.error("Error updating content:", error));
    };

    
    
    useEffect(() => {
        setUpdateTitle(updateTitle) 
        setUpdateBody(updateBody)
        // setUpdatedContentID(updatedContentID)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    function handleBackToAdminUpdate() {
        navigate("/admin/updatecontent", { state: { previewTitle: updateTitle, previewBody: updateBody, previewContentID: updatedContentID } });
    };

    return (
        <div>
            {/* <GoBackButton /> */}
            <button onClick={handleBackToAdminUpdate}>Go Back</button>
            <h2>Preview Content</h2>
            <h3>{updateTitle}</h3>
            <div dangerouslySetInnerHTML={{ __html: updateBody }} />
            {/* <button onClick={() => navigate("/admin/update")}>Go Back</button> */}
            <button onClick={handleUpdateSubmit}>Update</button>
        </div>
    );
};

export default PreviewIndividualContent;















// import React, { /*useState,*/ useContext, useEffect } from "react";
// import { SharePreviewDataContext } from "../Context_API/sharePreviewData";
// import { useNavigate } from "react-router-dom";
// // import GoBackButton from "./GoBackButton";

// const PreviewIndividualContent = () => {
//     const { updateTitle, setUpdateTitle, updateContentID, updateBody, setUpdateBody, setUpdateContentID } = useContext(SharePreviewDataContext);
//     const navigate = useNavigate();
   

//     // const [previewTitle, setPreviewTitle] = useState('');
//     // const [previewBody, setPreviewBody] = useState('');
//     // const [contentID, setContentID] = useState('')
//     // const [copyTitle, setCopyTitle] = useState("")
//     // const [copyBody, setCopyBody] = useState("")



    

//     // useEffect(() => {
//     //     const savedTitle = localStorage.getItem('localTitle');
//     //     const savedBody = localStorage.getItem('localBody');
//     //     // const savedContentID = localStorage.getItem('localContentID')
//     //     if (savedTitle) setPreviewTitle(savedTitle);
//     //     if (savedBody) setPreviewBody(savedBody);
//     //     // if (savedContentID) setContentID(savedContentID);
//     // }, []);


//     // let _previewTitle = previewTitle;
//     // let copyPreviewTitle = "";

//     // if (_previewTitle !== "") {
//     //     copyPreviewTitle = _previewTitle;
//     //     localStorage.setItem("localTitleCopy", copyPreviewTitle);
//     //     // localStorage.setItem("localContentID", content_id);
//     // }

//     // let _previewBody = previewBody;
//     // let copyPreviewBody = "";

//     // if (_previewBody !== "") {
//     //     copyPreviewBody = _previewBody;
//     //     localStorage.setItem("localBodyCopy", copyPreviewBody);
//     // }



//     // Submit Updated content via the preview component
//     const handleUpdateSubmit = () => {
//         fetch(`http://127.0.0.1:5000/content/${updateContentID}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ title: updateTitle, body: updateBody }),
//         })
//         .then((res) => res.json())
//         .then(() => {
//             alert("Content updated successfully!");
//             console.log("inspect preview submit success ", updateTitle, updateBody)
//             navigate("/admin/contents");
//         })
//         .catch((error) => console.error("Error updating content:", error));
//     };

    
//     //Update the state in preview to enable using that when navigating back
//     useEffect(() => {
//         setUpdateTitle(updateTitle) 
//         setUpdateBody(updateBody)
//         setUpdateContentID(updateContentID)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [])


//     // Navigate back to AdminUpdate
//     function handleBackToAdminUpdate() {
//         // navigate("/admin/updatecontent", { state: { previewTitle: updateTitle, previewBody: updateBody, previewContentID: updateContentID } });
//         navigate("/admin/updatecontent");
//     };

//     return (
//         <div>
//             {/* <GoBackButton /> */}
//             <button onClick={handleBackToAdminUpdate}>Go Back</button>
//             <h2>Preview Content</h2>
//             <h3>{updateTitle}</h3>
//             <div dangerouslySetInnerHTML={{ __html: updateBody }} />
//             {/* <button onClick={() => navigate("/admin/update")}>Go Back</button> */}
//             <button onClick={handleUpdateSubmit}>Update</button>
//         </div>
//     );
// };

// export default PreviewIndividualContent;
