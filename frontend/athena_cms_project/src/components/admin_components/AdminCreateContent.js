// frontend/src/components/PageEditor.js
import React, { /*useState,*/ useEffect, useContext } from "react";
import { useNavigate/*, useLocation*/ } from "react-router-dom";
import { SharePreviewDataContext } from "../Context_API/sharePreviewData";
import "react-quill/dist/quill.snow.css";
// import DraftEditor from "../tool_components/DraftEditor";
import ReactQuillEditor from "../tool_components/ReactQuillEditor";
import ImageUpload from "../tool_components/ImageUpload";
import "./styles/admin_components.scss"

const AdminCreateContent = () => {
    const navigate = useNavigate();
    const { createTitle, setCreateTitle, createImage, setCreateImage, createBody, setCreateBody, category, setCategory, tags, setTags, metaDescription, setMetaDescription } = useContext(SharePreviewDataContext);

    


    // console.log(createImage.name)

    // const formDataObj = {}

    const formData = {
        "title": createTitle,
        "body": createBody,
        "category": category,
        "tags": tags,
        "meta_description": metaDescription
    }



    if (createImage !== null) {
        formData["image_url"] = createImage["image_code"]
    } else {
        formData["image_file"] = createImage
        // if (typeof createImage["image_code"] === "string") {
        
        // }
    }

    const jsonString = JSON.stringify(formData);
    // const formData = new FormData();
    // formData.append("title", createTitle);
    // formData.append("body", createBody);
    // formData.append("category", category);
    // formData.append("tags", tags);
    // formData.append("meta_description", metaDescription);
    // if (createImage !== null) {
    //     if (typeof createImage["image_code"] === "string") {
    //         formData.append("image_url", createImage["image_code"]);
    //     } else {
    //         formData.append("image_file", createImage);
    //     }
    // }

    // console.log(formData)
    // formData.forEach((value, key) => { 
    //     formDataObj[key] = value; 
    // }); 

    // const jsonString = JSON.stringify(formDataObj);

    console.log(createImage)
    console.log(jsonString)

    // Saving new data to database
    const handleSave = () => {
        // Submit to the backend
        fetch("http://127.0.0.1:5000/content", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonString,
        }).then((res) => res.json()).then((data) => {
            console.log("Content saved:", data);
            alert("Content saved:", data)

            // Clear input field
            setCreateTitle()
            setCreateBody()
            setCategory()
            setTags()
            setMetaDescription()
            localStorage.removeItem('localCreateTitle')
            localStorage.removeItem('localCreateBody')
            navigate(`/admin/contents`);
        });
    };



   
    // Saving new data to database
    // const handleSave = () => {
    //     // Submit to the backend
    //     fetch("http://127.0.0.1:5000/content", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ 
    //             title: createTitle, 
    //             body: createBody, 
    //             category,
    //             tags,
    //             meta_description: metaDescription
    //         }),
    //     }).then((res) => res.json()).then((data) => {
    //         console.log("Content saved:", data);
    //         alert("Content saved:", data)

    //         // Clear input field
    //         setCreateTitle()
    //         setCreateBody()
    //         setCategory()
    //         setTags()
    //         setMetaDescription()
    //         localStorage.removeItem('localCreateTitle')
    //         localStorage.removeItem('localCreateBody')
    //         navigate(`/admin/contents`);
    //     });
    // };

   

    // Navigating to Preview component and passing data to be used
    function handlePreview() {
        navigate("/previewcreatecontent", { state: { title: createTitle, body: createBody } });
    };




    // Updating Context API state in this component
    useEffect(() => {
        if (createTitle !== "") {
            setCreateTitle(createTitle)
        }

        if (createBody !== "") {
            setCreateBody(createBody)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // Navigating back to content list and clearing state data
    function goBackToContentList() {
        setCreateTitle()
        setCreateBody()
        setCategory()
        setTags()
        setMetaDescription()
        localStorage.removeItem('localCreateTitle')
        localStorage.removeItem('localCreateBody')
        navigate("/admin/contents")
    }

  

    // Saving current data to local storage for reusability
    useEffect(() => {
        if (createTitle !== "" || createTitle === null) {
            // Save data to local storage
            localStorage.setItem('localCreateTitle', createTitle);
        }

        if (createBody !== "" || createBody === null) {
            // Save data to local storage
            localStorage.setItem('localCreateBody', createBody);
        }

    },[createTitle, createBody])



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



    return (
        <div>
            <button onClick={goBackToContentList}>Go Back</button>
            <h2>Admin Write Content</h2>
            <input 
                type="text" 
                placeholder="Title" 
                value={createTitle || ""} 
                onChange={(e) => setCreateTitle(e.target.value)} 
            />
            <ImageUpload setCurrentImageUpload={setCreateImage} currentImageUpload={createImage} />
            <ReactQuillEditor value={createBody} setValue={setCreateBody} />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div>
                <input
                    type="text"
                    placeholder="Category"
                    value={category || ""}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Tags (comma-separated)"
                    value={tags || ""}
                    onChange={(e) => setTags(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Meta Description"
                    value={metaDescription || ""}
                    onChange={(e) => setMetaDescription(e.target.value)}
                />
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <button onClick={handleSave}>Save</button>
            <button onClick={handlePreview}>Preview Update</button>
        </div>
    );
};

export default AdminCreateContent;
