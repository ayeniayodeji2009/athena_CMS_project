// AdminUpdateContainer.js
import React, { /**/useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SharePreviewDataContext } from "../Context_API/sharePreviewData";
// import GoBackButton from "../UI_General/GoBackButton";
import ReactQuillEditor from "../tool_components/ReactQuillEditor";
import "react-quill/dist/quill.snow.css";
// import "./styles/admin_components.scss";



export default function AdminUpdate() {
    const { updateTitle, updateBody, updateContentID, setUpdateTitle,  setUpdateBody/*, setUpdateContentID*/ } = useContext(SharePreviewDataContext);
    const navigate = useNavigate();
    const location = useLocation();

    const content_id = location.state.contentID; // from content list
    const previewTitle = location.state.previewTitle;
    const previewBody = location.state.previewBody
    const previewContentID = location.state.previewContentID

    console.log(location)

    // setUpdateContentID(previewContentID)
    console.log(content_id)
    console.log(updateContentID)
    // console.log(previewContentID)

    
    const [databaseTitle, setDatabaseTitle] = useState("");
    const [databaseBody, setDatabaseBody] = useState("");
    // const [localStorageTitle, setLocalStorageTitle] = useState("");
    // const [localStorageBody, setLocalStorageBody] = useState("");




    useEffect(() => {
        fetch(`http://127.0.0.1:5000/content/${updateContentID}`)
            .then((res) => res.json())
            .then((data) => {
                // setUpdateTitle(data.title); //
                // setUpdateBody(data.body); //
                setDatabaseTitle(data.title);
                setDatabaseBody(data.body);
            })
            .catch((error) => console.error("Error fetching content:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); //content_id, previewBody, previewTitle, updateBody, updateTitle

    

    function handleUpdate() {
        fetch(`http://127.0.0.1:5000/content/${updateContentID}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: updateTitle, body: updateBody }),
        })
            .then((res) => res.json())
            .then(() => {
                alert("Content updated successfully!");
                
                // Clear the Context API for next use
                setUpdateTitle("")
                setUpdateBody("")

                // Go back to content list
                navigate(`/admin/contents`);
            })
            .catch((error) => console.error("Error updating content:", error));
    };

    function handlePreview() {
        navigate("/previewupdatecontent", { state: { title: updateTitle, body: updateBody, content_ID: updateContentID } });
        // setUpdateContentID(updateContentID)
    };

    
    // Logics for managing editing data between AdminUpdate component and Preview Component
    useEffect(() => {

        if (updateTitle === "" || updateTitle === undefined) {
            
            setUpdateTitle(databaseTitle)
        } else if (previewTitle !== undefined) {
            if (databaseTitle === updateTitle && databaseTitle.length === updateTitle.length) {
                setUpdateTitle(previewTitle)
            }
        }
        



        if (updateBody === "" || updateBody === undefined) {
           
            setUpdateBody(databaseBody)
        } else if (previewBody !== undefined) {

            if (databaseBody === updateBody && databaseBody.length === updateBody.length) {
                setUpdateBody(previewBody)
            }

        }
        
      
    },[databaseBody, databaseTitle, previewBody, previewTitle, setUpdateBody, setUpdateTitle, updateBody, updateTitle])



    
    console.log("from Database", databaseTitle, databaseBody)
    console.log("Preview:->  ",previewTitle, previewBody, previewContentID)
    console.log("Context API:-> ", updateTitle, updateBody, updateContentID)

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
function AdminUpdateChild ({ updateTitle, updateBody, setUpdateTitle, setUpdateBody, handleUpdate, handlePreview/* setCurrentTitle, setCurrentBody, */}) {
    const navigate = useNavigate();

    function goBackToContentList() {
        setUpdateTitle(); 
        setUpdateBody(); 
        navigate("/admin/contents")
    }

    function handleChange(e) {
        setUpdateTitle(e.target.value)
    }

    
    return (
        <div className="admin_update_container">
            {/* <GoBackButton /> */}
            <button onClick={goBackToContentList}>Go Back</button>
            <h2>Edit Content</h2>
            <input type="text" placeholder="Title" value={updateTitle} onChange={handleChange} /* required */ />
            <ReactQuillEditor value={updateBody} setValue={setUpdateBody} />
          
            <br />
            <br />
            <br />

            <div className="admin_update_container-button">
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handlePreview}>Preview Update</button>
            </div>
        </div>
    );
};











