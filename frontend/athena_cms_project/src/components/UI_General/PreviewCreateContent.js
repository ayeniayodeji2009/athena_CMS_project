import React, { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SharePreviewDataContext } from "../Context_API/sharePreviewData";
import "./styles/ui_general.scss"


function PreviewCreateContent() {
    const { createTitle, createBody, createImage, setCreateImage, setCreateTitle, setCreateBody, category, tags, metaDescription } = useContext(SharePreviewDataContext);

    const navigate = useNavigate();
    const location = useLocation();
    const previewCreateTitle = location.state.title;
    const previewCreateBody = location.state.body;

    // console.log(previewCreateTitle, previewCreateBody)


    const createFormData = {
        title: createTitle, 
        body: createBody,
        category,
        tags,
        meta_description: metaDescription
    }


    if (createImage.image_code.substring(0, 4) === "http") {
        createFormData.image_url = createImage.image_code
    } else {
        createFormData.image_file = createImage
    }
    
    // Save new data to database
    const handleSave = () => {
        // Submit to the backend
        fetch("http://127.0.0.1:5000/content", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(createFormData),
        }).then((res) => res.json()).then((data) => {
            //Response to Frontend
            console.log("Content saved:", data);
            alert("Content saved:", data)

            //Clear input field
            setCreateTitle()
            setCreateImage()
            setCreateBody()
            localStorage.removeItem('localCreateTitle')
            localStorage.removeItem('localCreateBody')
            // Go back to list
            navigate(`/admin/contents`);
        });
    };

 

    // Navigate Back to Create Content Component
    function handleBackToAdminCreate() {
        navigate("/admin/createcontent", { state: { _title: previewCreateTitle, _body: previewCreateBody } });
        // setCreateTitle(localStorage.getItem('localCreateTitle'))
        // setCreateBody(localStorage.getItem('localCreateBody'))
    };



    // Function for reloading page and resturing current data back to component
    useEffect(() => {        
        if (performance.getEntriesByType("navigation")[0].type === "reload") {
          console.log("Page was refreshed");
          // Add additional logic here for refresh handling

          // Get data from local storage and pass data to Context API for reusability
          if (createTitle === "") {
            const localCreateTitleFromLS = localStorage.getItem('localCreateTitle');
            setCreateTitle(localCreateTitleFromLS)
          }
          
 
          if (createBody === "") {
            const localCreateBodyFromLS = localStorage.getItem('localCreateBody');
            setCreateBody(localCreateBodyFromLS)
          }

        } else {
          console.log("Page loaded normally");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log(createImage)
    console.log(createFormData)
    console.log(createImage.image_code.substring(0, 4))

    return (
        <div className="preview_create_container">
            <button onClick={handleBackToAdminCreate}>Go Back</button>
            <h2>Preview Content</h2>
            <h3>{createTitle}</h3>
            <img src={createImage.image_code} alt="Preview" style={{ maxWidth: "35%" }} />
            <div dangerouslySetInnerHTML={{ __html: createBody }} />
            <button onClick={handleSave}>Save</button>
        </div>
    )
}

export default PreviewCreateContent