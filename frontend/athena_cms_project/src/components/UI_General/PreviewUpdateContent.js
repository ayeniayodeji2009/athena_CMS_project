import React, { /*useState,*/ useContext, useEffect } from "react";
import { SharePreviewDataContext } from "../Context_API/sharePreviewData";
import { useNavigate, useLocation } from "react-router-dom";
// import GoBackButton from "./GoBackButton";

const PreviewUpdateContent = () => {
    const { updateTitle, updateBody, updateContentID, setUpdateTitle, setUpdateBody, setUpdateContentID } = useContext(SharePreviewDataContext);
    const navigate = useNavigate();
    const location = useLocation();
    const content_ID = location.state.content_ID;
    // console.log(content_ID)
    // console.log(updateContentID)
   

    // Submitting update data to database via preview component
    const handleUpdateSubmit = () => {
        fetch(`http://127.0.0.1:5000/content/${updateContentID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: updateTitle, body: updateBody }),
        })
        .then((res) => res.json())
        .then(() => {
            alert("Content updated successfully!");
            // console.log("inspect preview submit success ", previewTitle, previewBody)
            console.log("inspect preview submit success ", updateTitle, updateBody)

            // Clear the Context API for next use
            setUpdateTitle("")
            setUpdateBody("")

            // Go back to content list
            navigate("/admin/contents");
        })
        .catch((error) => console.error("Error updating content:", error));
    };



    // Navigate back to Update Component
    function handleBackToAdminUpdate() {
        navigate("/admin/updatecontent", { state: { previewTitle: updateTitle, previewBody: updateBody, previewContentID: content_ID } });
    };

    // console.log("Status in Preview component ", updateTitle, updateBody)




    // Function for reloading page and resturing current data from local storage back to component 
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
        <div>
            <button onClick={handleBackToAdminUpdate}>Go Back</button>
            <h2>Preview Content</h2>
            <h3>{updateTitle}</h3>
            <div dangerouslySetInnerHTML={{ __html: updateBody }} />
            <button onClick={handleUpdateSubmit}>Update</button>
        </div>
    );
};

export default PreviewUpdateContent;















