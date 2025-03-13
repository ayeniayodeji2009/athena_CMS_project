// AdminUpdateContainer.js
import React, { /**/useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SharePreviewDataContext } from "../Context_API/sharePreviewData";
// import GoBackButton from "../UI_General/GoBackButton";
import AdminVersionControlHistory from "./AdminVersionControlHistory"
import ReactQuillEditor from "../tool_components/ReactQuillEditor";
import ImageUpload from "../tool_components/ImageUpload"
import Loading from "../UI_General/Loading";
import "react-quill/dist/quill.snow.css";
import "./styles/admin_components.scss";

// category, setCategory, tags, setTags, metaDescription, setMetaDescription

export default function AdminUpdate() {
    const { updateTitle, updateBody, updateContentID, category, tags, metaDescription, setUpdateTitle, updateImage, setUpdateImage, setUpdateBody, setUpdateContentID, setCategory, setTags, setMetaDescription, navigateStatus, setNavigateStatus} = useContext(SharePreviewDataContext);
    const [loading, setLoading] = useState(true)

    
    const navigate = useNavigate();
    const location = useLocation();

    const content_id = location.state.contentID; // from content list
    const previewTitle = location.state.previewTitle;
    const previewImage = location.state.previewImage
    const previewBody = location.state.previewBody
    // const previewContentID = location.state.previewContentID

    // console.log(location)

    // setUpdateContentID(previewContentID)
    // console.log(content_id)
    // console.log(updateContentID) // string Value
    // console.log(previewContentID)
   

    
    const [databaseTitle, setDatabaseTitle] = useState("");
    const [databaseImage, setDatabaseImage] = useState({"image_code": ""})
    const [databaseBody, setDatabaseBody] = useState("");

    // const localUpdateImageFromLS = localStorage.getItem('localUpdateImage');
    // if (localUpdateImageFromLS && updateImage["image_code"])

    // Getting Data from database to be edited
    useEffect(() => {
        fetch(`http://127.0.0.1:5000/content/${updateContentID}`)
            .then((res) => res.json())
            .then((data) => {
                // Passing Data from Database to state
                setDatabaseTitle(data.title);                
                // setUpdateImage({...updateImage, "image_code": data.image_url})
                setDatabaseImage({...databaseImage, "image_code": data.image_url})
                setDatabaseBody(data.body);
                setCategory(data.category)
                setTags(data.tags)
                setMetaDescription(data.meta_description)
                setLoading(false)
            })
            .catch((error) => console.error("Error fetching content:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    
    console.log(databaseImage)

    // console.log(updateImage)
    // Submit or Push Update to Database
    function handleUpdate() {
        fetch(`http://127.0.0.1:5000/content/${updateContentID}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                title: updateTitle,
                image_url: updateImage["image_code"],
                body: updateBody,
                category,
                tags,
                meta_description: metaDescription 
            }),
        })
            .then((res) => res.json())
            .then(() => {
                alert("Content updated successfully!");
                
                // Clear the Context API for next use
                setUpdateTitle()
                setUpdateBody()
                setCategory()
                setTags()
                setMetaDescription()

                // Clear data in local storage
                localStorage.removeItem('localUpdateTitle')
                localStorage.removeItem('localUpdateImage')
                localStorage.removeItem('localUpdateImageCopy')
                localStorage.removeItem('localUpdateBody')

                // Go back to content list
                navigate(`/admin/contents`);
            })
            .catch((error) => console.error("Error updating content:", error));
    };


    // Navigation to Preview content or Component
    function handlePreview() {
        navigate("/previewupdatecontent", { state: { title: updateTitle, body: updateBody, content_ID: updateContentID } });
        setNavigateStatus("navigate") //detecting navigation stored to context API
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // if (previewImage["image_code"] !== )
        // For Image
        if (updateImage.image_code === "" || updateImage.image_code === null || updateImage.image_code === undefined) {
            setUpdateImage({...updateImage, "image_code": databaseImage.image_code})
        }
        // else if (previewImage.image_code !== undefined || previewImage.image_code !== null) {
        //     if (databaseImage.image_code === updateImage.image_code) {     /*&& databaseTitle.length === updateTitle.length*/
        //         setUpdateImage({...updateImage, "image_code": previewImage.image_code})
        //     }
        // }
        /* Before going to Preview page(upon entering into the update page), existing preview variable is has value "undefined". 
           After leaving preview page comingback to update page, previewImage becomes an object which has value.*/
        if (previewImage !== undefined || previewImage !== null) {
            console.log("I have gone to the preview page, and I'm back to the update page - Image speaking")
            // if (databaseImage.image_code === previewImage.image_code) {
            //     setUpdateImage({...updateImage, "image_code": previewImage.image_code})
            // } else {
            //     setUpdateImage({...updateImage, "image_code": databaseImage.image_code})
            // }
        }

        // For Body
        if (updateBody === "" || updateBody === undefined) {
            setUpdateBody(databaseBody)
        } else if (previewBody !== undefined) {
            if (databaseBody === updateBody && databaseBody.length === updateBody.length) {
                setUpdateBody(previewBody)
            }

        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[databaseBody, /*databaseImage.image_code, updateImage.image_code,*/ databaseTitle, previewBody, /*previewImage.image_code,*/ previewTitle, setUpdateBody, setUpdateImage, setUpdateTitle, updateBody, updateImage, updateTitle])

    console.log(previewImage)

    /* Saving updated data to local storage for reusability if browser is refreshed: when main state is not empty, 
    save current data to local storage */
    useEffect(() => {
        if (updateTitle !== "" || updateTitle === null) {
            // Save data to local storage
            localStorage.setItem('localUpdateTitle', updateTitle);
        }

        if (updateImage["image_code"] !== "" || updateImage["image_code"] === null || updateImage["image_code"] === undefined) {
            // Save data to local storage
            localStorage.setItem('localUpdateImage', updateImage["image_code"]);

            // if image is a truety value, save as a copy for reusability and update if there is change to original value
            if (updateImage["image_code"]) {
                localStorage.setItem('localUpdateImageCopy', updateImage["image_code"]);
            }
        }

        // if ()

        if (updateBody !== "" || updateBody === null) {
            // Save data to local storage
            localStorage.setItem('localUpdateBody', updateBody);
        }


        if (updateContentID === content_id) {
            // Save data to local storage
            localStorage.setItem('localUpdateContentID', updateContentID)
        } 
    },[updateBody, updateTitle, content_id, updateContentID, updateImage])

    
    // console.log("from Database", databaseTitle, databaseBody)
    // console.log("Preview:->  ",previewTitle, previewBody, previewContentID)
    // console.log("Context API:-> ", updateTitle, updateBody, updateContentID)

    /* Custom made Logic handling page route action status */
    let navType
    console.log(navType)

    if (navigateStatus === "navigate") {
      navType = navigateStatus
    } else {
      navType = "reload"
    }
    /* Custom made Logic handling page route action status */
    console.log(navType)


    // Function for reloading page and restoring current data back to component
    useEffect(() => {        
        if (navType === "reload") {
          console.log("Page was refreshed");
          // Add additional logic here for refresh handling

          // Get data from local storage and pass data to Context API for reusability
          if (updateTitle === "") {
            const localUpdateTitleFromLS = localStorage.getItem('localUpdateTitle');
            setUpdateTitle(localUpdateTitleFromLS)
          }
          
          console.log(`Reload Title say ${updateTitle}`)


          //Error Cleared
          if (updateImage["image_code"] === null || updateImage["image_code"] === undefined) {
            const localUpdateImageFromLS = localStorage.getItem('localUpdateImageCopy');
            setUpdateImage({...updateImage, "image_code": localUpdateImageFromLS})
          }
          console.log(updateImage)
          console.log(`Reload image say ${updateImage["image_code"]}`)

 
          if (updateBody === "") {
            const localUpdateBodyFromLS = localStorage.getItem('localUpdateBody');
            setUpdateBody(localUpdateBodyFromLS)
          }
          console.log(`Reload Body say ${updateBody}`)


          if (updateContentID === "") {
            const localUpdateContent_ID_FromLS = localStorage.getItem('localUpdateContentID')
            setUpdateContentID(localUpdateContent_ID_FromLS)
          }

          // Change State of Loading
          setLoading(false)
        } else if (navType === "navigate") {
          console.log("Page loaded normally");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  

    if (loading) {
        return <Loading />; // Show loading component while fetching data
    }


    // if (localUpdateImageFromLS !== "" || localUpdateImageFromLS !== null) {
    //     setUpdateImage({...updateImage, "image_code": localUpdateImageFromLS})
    // } else {

    return (
        <AdminUpdateChild
            content_id={updateContentID}
            updateTitle={updateTitle}
            updateBody={updateBody}
            setUpdateTitle={setUpdateTitle}
            setUpdateBody={setUpdateBody}
            // imagePreview={imagePreview} 
            // setImagePreview={setImagePreview}
            updateImage={updateImage}
            setUpdateImage={setUpdateImage}
            handleUpdate={handleUpdate}
            handlePreview={handlePreview}
            // setCurrentTitle={setCurrentTitle}
            // setCurrentBody={setCurrentBody}
            category={category}
            setCategory={setCategory} 
            tags={tags} 
            setTags={setTags}
            metaDescription={metaDescription} 
            setMetaDescription={setMetaDescription}
        />
    );
};











// AdminUpdate.js
function AdminUpdateChild ({ content_id, updateTitle, updateBody, updateImage, setUpdateImage, setUpdateTitle, setUpdateBody, handleUpdate, handlePreview,/* setCurrentTitle, setCurrentBody, */category, setCategory, tags, setTags, metaDescription, setMetaDescription }) {
    const navigate = useNavigate();

    function goBackToContentList() {
        setUpdateTitle();
        setUpdateImage({"image_code": ""}) 
        setUpdateBody();
        setCategory()
        setTags()
        setMetaDescription() 
        localStorage.removeItem('localUpdateTitle')
        localStorage.removeItem('localUpdateImage')
        localStorage.removeItem('localUpdateImageCopy')
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
            <ImageUpload setCurrentImageUpload={setUpdateImage} currentImageUpload={updateImage} />
            <ReactQuillEditor value={updateBody} setValue={setUpdateBody} />
            <br />
            <br />
            <div>
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Tags (comma-separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Meta Description"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                />
            </div>
          
            <br />
            <br />
            <br />

            <div className="admin_update_container-button">
                <button onClick={handleUpdate}>Update</button>
                <button onClick={handlePreview}>Preview Update</button>
            </div>


            <br />
            <br />
            <AdminVersionControlHistory content_id={content_id} setUpdateTitle={setUpdateTitle} setUpdateImage={setUpdateImage} setUpdateBody={setUpdateBody} /*onLoadVersion={handleLoadVersion}*/ />
        </div>
    );
};











