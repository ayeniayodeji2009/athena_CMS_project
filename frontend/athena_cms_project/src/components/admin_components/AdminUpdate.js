// AdminUpdateContainer.js
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SharePreviewDataContext } from "../Context_API/sharePreviewData";
// import GoBackButton from "../UI_General/GoBackButton";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AdminUpdate() {
    const { updateTitle, updateBody, updateContentID, setUpdateTitle,  setUpdateBody, setUpdateContentID } = useContext(SharePreviewDataContext);
    const navigate = useNavigate();
    const location = useLocation();
    const content_id = location.state.contentID; // from content list
    const previewTitle = location.state.previewTitle;
    const previewBody = location.state.previewBody
    const previewContentID = location.state.previewContentID

    setUpdateContentID(previewContentID)
    console.log(previewTitle, previewBody, previewContentID)
    console.log(content_id)
    console.log(updateContentID)

    // setUpdateTitle("Hello"); //data.title
    // setUpdateBody("World"); //data.body

    // const [updateTitle, setUpdateTitle] = useState("");
    // const [updateBody, setUpdateBody] = useState("");
    const [databaseTitle, setDatabaseTitle] = useState("");
    const [databaseBody, setDatabaseBody] = useState("");
    // const [localStorageTitle, setLocalStorageTitle] = useState("");
    // const [localStorageBody, setLocalStorageBody] = useState("");




    useEffect(() => {
        fetch(`http://127.0.0.1:5000/content/${content_id}`)
            .then((res) => res.json())
            .then((data) => {
                setUpdateTitle(data.title); //
                setUpdateBody(data.body); //
                setDatabaseTitle(data.title);
                setDatabaseBody(data.body);
            })
            .catch((error) => console.error("Error fetching content:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); //content_id, previewBody, previewTitle, updateBody, updateTitle

    // useEffect(() => {
    //     localStorage.setItem("localTitle", updateTitle);
    //     localStorage.setItem("localBody", updateBody);
    //     localStorage.setItem("localContentID", content_id);


    //     const savedTitle = localStorage.getItem("localTitle");
    //     const savedBody = localStorage.getItem("localBody");
    //     setLocalStorageTitle(savedTitle);
    //     setLocalStorageBody(savedBody);
    // }, [updateTitle, updateBody, content_id, localStorageTitle, localStorageBody]);



    // const savedTitle = localStorage.getItem("localTitle");
    // const savedBody = localStorage.getItem("localBody");
    // if (savedTitle) setLocalStorageTitle(savedTitle);
    // if (savedBody) setLocalStorageBody(savedBody);

    function handleUpdate() {
        fetch(`http://127.0.0.1:5000/content/${content_id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: updateTitle, body: updateBody }),
        })
            .then((res) => res.json())
            .then(() => {
                alert("Content updated successfully!");
                navigate(`/admin/contents`);
            })
            .catch((error) => console.error("Error updating content:", error));
    };

    function handlePreview() {
        navigate("/previewcontent", { state: { title: updateTitle, body: updateBody } });
    };

    // function setCurrentTitle(updateSetTitlePara) {
    //     if (databaseTitle === localStorageTitle && databaseTitle.length === localStorageTitle.length) {
    //         updateSetTitlePara(databaseTitle);
    //         return updateTitle;
    //     } else {
    //         updateSetTitlePara(localStorageTitle);
    //         return updateTitle;
    //     }
    // };

    // function setCurrentBody(updateSetBodyPara) {
    //     if (databaseBody === localStorageBody && databaseBody.length === localStorageBody.length) {
    //         updateSetBodyPara(databaseBody);
    //         return updateBody;
    //     } else {
    //         updateSetBodyPara(localStorageBody);
    //         return updateBody;
    //     }
    // };

    useEffect(() => {
        if (databaseTitle === updateTitle && databaseTitle.length === updateTitle.length) {
            setUpdateTitle(databaseTitle);
            // return updateTitle;
        } else {
            setUpdateTitle(updateTitle);
            // return updateTitle;
        }
    
    
        if (databaseBody === updateBody && databaseBody.length === updateBody.length) {
            setUpdateBody(databaseBody);
            // return updateBody;
        } else {
            setUpdateBody(updateBody);
            // return updateBody;
        }


        // if (previewTitle !== "" && previewTitle !== updateTitle && previewTitle.length !== updateTitle.length) {
        //     setUpdateTitle(previewTitle)
        // }
       

        // if (previewBody !== "" && previewBody !== updateBody && previewBody.length !== updateBody.length) {
        //     setUpdateBody(previewBody)
        // } 

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    // useEffect(() => {
    //     if (databaseTitle === localStorageTitle && databaseTitle.length === localStorageTitle.length) {
    //         setUpdateTitle(databaseTitle);
    //         // return updateTitle;
    //     } else {
    //         setUpdateTitle(localStorageTitle);
    //         // return updateTitle;
    //     }
    
    
    //     if (databaseBody === localStorageBody && databaseBody.length === localStorageBody.length) {
    //         setUpdateBody(databaseBody);
    //         // return updateBody;
    //     } else {
    //         setUpdateBody(localStorageBody);
    //         // return updateBody;
    //     }


    //     if (previewTitle !== "" && previewTitle !== updateTitle && previewTitle.length !== updateTitle.length) {
    //         setUpdateTitle(previewTitle)
    //     }
       

    //     if (previewBody !== "" && previewBody !== updateBody && previewBody.length !== updateBody.length) {
    //         setUpdateBody(previewBody)
    //     } 

    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[])
    

    return (
        <AdminUpdateChild
            updateTitle={updateTitle}
            updateBody={updateBody}
            setUpdateTitle={setUpdateTitle}
            setUpdateBody={setUpdateBody}
            handleUpdate={handleUpdate}
            handlePreview={handlePreview}
            // setCurrentTitle={setCurrentTitle}
            // setCurrentBody={setCurrentBody}
        />
    );
};











// AdminUpdate.js
function AdminUpdateChild ({
    updateTitle,
    updateBody,
    setUpdateTitle,
    setUpdateBody,
    handleUpdate,
    handlePreview,
    // setCurrentTitle,
    // setCurrentBody,
}) {

    const navigate = useNavigate();

    function handleChange(e) {
        setUpdateTitle(e.target.value)
    }
    
    return (
        <div>
            {/* <GoBackButton /> */}
            <button onClick={() => navigate("/admin/contents")}>Go Back</button>
            <h2>Edit Content</h2>
            <input
                type="text"
                placeholder="Title"
                value={updateTitle}
                onChange={handleChange}
                // required
            />
            <ReactQuill value={updateBody} onChange={setUpdateBody} />
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handlePreview}>Preview Update</button>
        </div>
    );
};












// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate /*, useLocation*/ } from "react-router-dom";
// import { SharePreviewDataContext } from "../Context_API/sharePreviewData";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// export default function AdminUpdate() {
//     const { updateTitle, updateBody, updateContentID, setUpdateTitle,  setUpdateBody, setUpdateContentID } = useContext(SharePreviewDataContext);
//     const navigate = useNavigate();
   
//     // Update state of ID number in AdminUpdate component
//     setUpdateContentID(updateContentID)
//     console.log(updateContentID)

    
//     // State for using data and processing from database in AdminUpdate component
//     const [databaseTitle, setDatabaseTitle] = useState("");
//     const [databaseBody, setDatabaseBody] = useState("");
   


//     // fetching data to be updated and storing them in state
//     useEffect(() => {
//         fetch(`http://127.0.0.1:5000/content/${updateContentID}`)
//             .then((res) => res.json())
//             .then((data) => {
//                 setUpdateTitle(data.title); //
//                 setUpdateBody(data.body); //
//                 setDatabaseTitle(data.title);
//                 setDatabaseBody(data.body);
//             })
//             .catch((error) => console.error("Error fetching content:", error));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []); //content_id, previewBody, previewTitle, updateBody, updateTitle

    

//     // Submit Updated data after editing
//     function handleUpdate() {
//         fetch(`http://127.0.0.1:5000/content/${updateContentID}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ title: updateTitle, body: updateBody }),
//         })
//             .then((res) => res.json())
//             .then(() => {
//                 alert("Content updated successfully!");
//                 navigate(`/admin/contents`);
//             })
//             .catch((error) => console.error("Error updating content:", error));
//     };

//     function handlePreview() {
//         navigate("/previewcontent", { state: { title: updateTitle, body: updateBody } });
//     };

    
//     // conditions for checking data after any changes done before or after preview 
//     useEffect(() => {
//         if (databaseTitle === updateTitle && databaseTitle.length === updateTitle.length) {
//             setUpdateTitle(databaseTitle);
//             // return updateTitle;
//         } else {
//             setUpdateTitle(updateTitle);
//             // return updateTitle;
//         }
    
    
//         if (databaseBody === updateBody && databaseBody.length === updateBody.length) {
//             setUpdateBody(databaseBody);
//             // return updateBody;
//         } else {
//             setUpdateBody(updateBody);
//             // return updateBody;
//         }


//         // if (previewTitle !== "" && previewTitle !== updateTitle && previewTitle.length !== updateTitle.length) {
//         //     setUpdateTitle(previewTitle)
//         // }
       

//         // if (previewBody !== "" && previewBody !== updateBody && previewBody.length !== updateBody.length) {
//         //     setUpdateBody(previewBody)
//         // } 

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     },[])


//     // useEffect(() => {
//     //     if (databaseTitle === localStorageTitle && databaseTitle.length === localStorageTitle.length) {
//     //         setUpdateTitle(databaseTitle);
//     //         // return updateTitle;
//     //     } else {
//     //         setUpdateTitle(localStorageTitle);
//     //         // return updateTitle;
//     //     }
    
    
//     //     if (databaseBody === localStorageBody && databaseBody.length === localStorageBody.length) {
//     //         setUpdateBody(databaseBody);
//     //         // return updateBody;
//     //     } else {
//     //         setUpdateBody(localStorageBody);
//     //         // return updateBody;
//     //     }


//     //     if (previewTitle !== "" && previewTitle !== updateTitle && previewTitle.length !== updateTitle.length) {
//     //         setUpdateTitle(previewTitle)
//     //     }
       

//     //     if (previewBody !== "" && previewBody !== updateBody && previewBody.length !== updateBody.length) {
//     //         setUpdateBody(previewBody)
//     //     } 

//     // // eslint-disable-next-line react-hooks/exhaustive-deps
//     // },[])
    

//     return (
//         <AdminUpdateChild
//             updateTitle={updateTitle}
//             updateBody={updateBody}
//             setUpdateTitle={setUpdateTitle}
//             setUpdateBody={setUpdateBody}
//             handleUpdate={handleUpdate}
//             handlePreview={handlePreview}
//             // setCurrentTitle={setCurrentTitle}
//             // setCurrentBody={setCurrentBody}
//         />
//     );
// };
