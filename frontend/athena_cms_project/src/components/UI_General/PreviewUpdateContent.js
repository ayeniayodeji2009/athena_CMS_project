import React, { useState, useContext, useEffect } from "react";
import { SharePreviewDataContext } from "../Context_API/sharePreviewData";
import { useNavigate, useLocation } from "react-router-dom";
// import GoBackButton from "./GoBackButton";
// import Test from "./Test"
import "./styles/ui_general.scss";


const PreviewUpdateContent = () => {
    const { updateTitle,updateImage, updateBody, updateContentID, category, tags, metaDescription, setUpdateTitle, setUpdateImage, setUpdateBody, setUpdateContentID, setCategory, setTags, setMetaDescription, navigateStatus} = useContext(SharePreviewDataContext);

    // Test
    const [navType1, setNavType1] = useState("");


    // const navTypeExternalTest = Test();


    const navigateRoute = useNavigate();
    const location = useLocation();
    const content_ID = location.state.content_ID;
    // console.log(content_ID)
    // console.log(updateContentID)
    console.log(updateImage.image_code)

    const updateFormData = {
      title: updateTitle,
      image_url: updateImage.image_code,
      body: updateBody,
      category,
      tags,
      meta_description: metaDescription
    }
    // Submitting update data to database via preview component
    const handleUpdateSubmit = () => {
        fetch(`http://127.0.0.1:5000/content/${updateContentID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateFormData),
        })
        .then((res) => res.json())
        .then(() => {
            alert("Content updated successfully!");
            // console.log("inspect preview submit success ", previewTitle, previewBody)
            console.log("inspect preview submit success ", updateTitle, updateBody)

            // Clear the Context API for next use
            setUpdateTitle()
            setUpdateImage()
            setUpdateBody()
            setCategory()
            setTags()
            setMetaDescription()
            localStorage.removeItem('localUpdateTitle')
            localStorage.removeItem('localUpdateImage')
            localStorage.removeItem('localUpdateImageCopy')
            localStorage.removeItem('localUpdateBody')

            // Go back to content list
            navigateRoute("/admin/contents");
        })
        .catch((error) => console.error("Error updating content:", error));
    };



    // Navigate back to Update Component
    function handleBackToAdminUpdate() {
        navigateRoute("/admin/updatecontent", { state: { previewTitle: updateTitle, previewImage: updateImage, previewBody: updateBody, previewContentID: content_ID } });
    };

    // console.log("Status in Preview component ", updateTitle, updateBody)



    console.log(performance.getEntriesByType("navigation"));
    // console.log(performance.navigation.type)


    /* Custom made Logic handling page route action status */
    let navType
    console.log(navType)

    if (navigateStatus === "navigate") {
      navType = navigateStatus
    } else {
      navType = "reload"
    }
    /* Custom made Logic handling page route action status */

  

    
    useEffect(() => {  
     
          if (navType === "reload") {
            console.log("Page was refreshed");
            // Add additional logic here for refresh handling

            // Get data from local storage and pass data to Context API for reusability
            if (updateTitle === "") {
              const localUpdateTitleFromLS = localStorage.getItem('localUpdateTitle');
              setUpdateTitle(localUpdateTitleFromLS)
            }
            
            if (updateImage["image_code"] === "" || updateImage["image_code"] === null || updateImage["image_code"] === undefined) {
              const localUpdateImageFromLS = localStorage.getItem('localUpdateImage');
              setUpdateImage({...updateImage, "image_code": localUpdateImageFromLS})
            }
  
            if (updateBody === "") {
              const localUpdateBodyFromLS = localStorage.getItem('localUpdateBody');
              setUpdateBody(localUpdateBodyFromLS)
            }

            if (updateContentID === "") {
              const localUpdateContent_ID_FromLS = localStorage.getItem('localUpdateContentID')
              setUpdateContentID(localUpdateContent_ID_FromLS)
            }
          } else if (navType === "navigate") { 
            console.log("Page loaded normally");
          }
        }
        , [updateTitle, updateImage, updateBody, updateContentID, navType, setUpdateTitle, setUpdateImage, setUpdateBody, setUpdateContentID, navigateStatus])

        console.log(navType)

    var localUpdateImageFromLS = localStorage.getItem('localUpdateImage');
    console.log(localUpdateImageFromLS)
    console.log(updateImage.image_code)




    // Test
  //   useEffect(() => {
  //     let type = "unknown";

  //     // Try using Performance API
  //     if (performance.getEntriesByType) {
  //         const entries = performance.getEntriesByType("navigation");
  //         if (entries.length > 0) {
  //             type = entries[0].type;
  //         }
  //     }

  //     // Fallback for older browsers
  //     if (performance.navigation) {
  //         switch (performance.navigation.type) {
  //             case 0:
  //                 type = "navigate"; // Normal navigation
  //                 break;
  //             case 1:
  //                 type = "reload"; // Page reload
  //                 break;
  //             case 2:
  //                 type = "back_forward"; // Back/forward navigation
  //                 break;
  //             default:
  //                 type = "unknown";
  //         }
  //     }

  //     setNavType1(type);
  //     console.log(`Navigation Type: ${type}`);
  // }, []);
  useEffect(() => {
    let type = "unknown";

    // Check Performance API for Page Reload or Back/Forward
    if (performance.getEntriesByType) {
        const entries = performance.getEntriesByType("navigation");
        if (entries.length > 0) {
            type = entries[0].type; // 'reload', 'navigate', 'back_forward'
        }
    }

    // Fallback for older browsers
    if (performance.navigation) {
        switch (performance.navigation.type) {
            case 0:
                type = "navigate"; // Direct or first-time visit
                break;
            case 1:
                type = "reload"; // Full page reload
                break;
            case 2:
                type = "back_forward"; // Browser back/forward button
                break;
            default:
                type = "unknown";
        }
    }

    // Store navigation type in session storage
    sessionStorage.setItem("lastNavType", type);
    setNavType1(type);
}, []);

useEffect(() => {
    // Detect React Router navigation
    if (!sessionStorage.getItem("lastNavType")) {
        setNavType1("react_navigation");
        sessionStorage.setItem("lastNavType", "react_navigation");
    }
}, [location]);

  // return navType;

  console.log(navType1);
  console.log(location)



    return (
        <div>
            <button onClick={handleBackToAdminUpdate}>Go Back</button>
            <h2>Preview Content</h2>
            <h3>{updateTitle}</h3>
            {(updateImage.image_code !== null || updateImage.image_code !== undefined) && <img src={updateImage.image_code} alt="Preview" style={{ maxWidth: "35%" }} />}
            <div dangerouslySetInnerHTML={{ __html: updateBody }} />
            <button onClick={handleUpdateSubmit}>Update</button>






            {/*Test Navigation*/}
            <div>
              <h1>Navigation Type: {navType}</h1>
              {navType === "reload" && <p>The page was reloaded.</p>}
              {navType === "navigate" && <p>Navigation occurred via React Router.</p>}
            </div>
        </div>
    );
};

export default PreviewUpdateContent;















