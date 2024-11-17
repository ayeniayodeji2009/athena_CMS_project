// AdminUpdateContainer.js
import React, { /**/useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SharePreviewDataContext } from "../Context_API/sharePreviewData";
// import GoBackButton from "../UI_General/GoBackButton";
import ReactQuillEditor from "../tool_components/ReactQuillEditor";
import "react-quill/dist/quill.snow.css";
import "./styles/admin_components.scss";



export default function AdminUpdate() {
    const { updateTitle, updateBody, updateContentID, setUpdateTitle,  setUpdateBody, setUpdateContentID } = useContext(SharePreviewDataContext);
    const navigate = useNavigate();
    const location = useLocation();

    const content_id = location.state.contentID; // from content list
    const previewTitle = location.state.previewTitle;
    const previewBody = location.state.previewBody
    // const previewContentID = location.state.previewContentID

    // console.log(location)

    // setUpdateContentID(previewContentID)
    // console.log(content_id)
    // console.log(updateContentID) // string Value
    // console.log(previewContentID)
   

    
    const [databaseTitle, setDatabaseTitle] = useState("");
    const [databaseBody, setDatabaseBody] = useState("");



    // Getting Data from database to be edited
    useEffect(() => {
        fetch(`http://127.0.0.1:5000/content/${updateContentID}`)
            .then((res) => res.json())
            .then((data) => {
                // Passing Data from Database to state
                setDatabaseTitle(data.title);
                setDatabaseBody(data.body);
            })
            .catch((error) => console.error("Error fetching content:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    

    // Submit or Push Update to Database
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
                setUpdateTitle()
                setUpdateBody()
                localStorage.removeItem('localUpdateTitle')
                localStorage.removeItem('localUpdateBody')

                // Go back to content list
                navigate(`/admin/contents`);
            })
            .catch((error) => console.error("Error updating content:", error));
    };


    // Navigation to Preview content or Component
    function handlePreview() {
        navigate("/previewupdatecontent", { state: { title: updateTitle, body: updateBody, content_ID: updateContentID } });
    };



    
    // Logics for managing editing data between AdminUpdate component and Preview Component
    useEffect(() => {

        // For Title
        if (updateTitle === "" || updateTitle === undefined) {
            setUpdateTitle(databaseTitle)
        } else if (previewTitle !== undefined) {
            if (databaseTitle === updateTitle && databaseTitle.length === updateTitle.length) {
                setUpdateTitle(previewTitle)
            }
        }
        


        // For Body
        if (updateBody === "" || updateBody === undefined) {
            setUpdateBody(databaseBody)
        } else if (previewBody !== undefined) {

            if (databaseBody === updateBody && databaseBody.length === updateBody.length) {
                setUpdateBody(previewBody)
            }

        }
    },[databaseBody, databaseTitle, previewBody, previewTitle, setUpdateBody, setUpdateTitle, updateBody, updateTitle])



    /* Saving updated data to local storage for reusability if browser is refreshed: when main state is not empty, 
    save current data to local storage */
    useEffect(() => {
        if (updateTitle !== "" || updateTitle === null) {
            // Save data to local storage
            localStorage.setItem('localUpdateTitle', updateTitle);
        }

        if (updateBody !== "" || updateBody === null) {
            // Save data to local storage
            localStorage.setItem('localUpdateBody', updateBody);
        }


        if (updateContentID === content_id) {
            // Save data to local storage
            localStorage.setItem('localUpdateContentID', updateContentID)
        } 
    },[updateBody, updateTitle, content_id, updateContentID])

    
    // console.log("from Database", databaseTitle, databaseBody)
    // console.log("Preview:->  ",previewTitle, previewBody, previewContentID)
    // console.log("Context API:-> ", updateTitle, updateBody, updateContentID)


    // Function for reloading page and resturing current data back to component
    useEffect(() => {        
        if (performance.getEntriesByType("navigation")[0].type === "reload") {
          console.log("Page was refreshed");
          // Add additional logic here for refresh handling

          // Get data from local storage and pass data to Context API for reusability
          if (updateTitle === "") {
            const localUpdateTitleFromLS = localStorage.getItem('localUpdateTitle');
            setUpdateTitle(localUpdateTitleFromLS)
          }
          
 
          if (updateBody === "") {
            const localUpdateBodyFromLS = localStorage.getItem('localUpdateBody');
            setUpdateBody(localUpdateBodyFromLS)
          }

          if (updateContentID === "") {
            const localUpdateContent_ID_FromLS = localStorage.getItem('localUpdateContentID')
            setUpdateContentID(localUpdateContent_ID_FromLS)
          }
        } else {
          console.log("Page loaded normally");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  

     

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
        localStorage.removeItem('localUpdateTitle')
        localStorage.removeItem('localUpdateBody')
        navigate("/admin/contents")
    }

    function handleChange(e) {
        setUpdateTitle(e.target.value)
    }

    
    return (
        <div className="admin_update_container">
            {/* <GoBackButton /> */}
            <button onClick={goBackToContentList} className="admin_update-button">Go Back</button>
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











