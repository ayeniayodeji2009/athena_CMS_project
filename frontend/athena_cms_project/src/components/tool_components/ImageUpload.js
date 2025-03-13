import React, { useState, /*useEffect*/ } from "react";
import { useDropzone } from "react-dropzone";

const ImageUpload = ({ setCurrentImageUpload, currentImageUpload, updateImage }) => {
    // const [imagePreview, setImagePreview] = useState("");
    const [imageUrl, setImageUrl] = useState("");


    // useEffect(() => {

    //     if (updateImage) {
    //         setImagePreview(updateImage)
    //     }
    // }, [updateImage])

    // console.log(imagePreview)
    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {

                file["image_code"] = reader.result // add image code to uploaded file object
                
                if (typeof setCurrentImageUpload === "function") {
                    setCurrentImageUpload(file); // Pass file to parent
                } else {
                    console.error("setCurrentImageUpload function is not provided. # from drag and drop");
                }

                console.log(currentImageUpload)
                //setImagePreview(currentImageUpload["image_code"]); // Preview or display selected image from parent
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {

                file["image_code"] = reader.result // add image code to uploaded file object

                if (typeof setCurrentImageUpload === "function") {
                    setCurrentImageUpload(file); // Pass file to parent
                } else {
                    console.error("setCurrentImageUpload function is not provided. # from upload from local computer");
                }

                console.log(currentImageUpload)
                //setImagePreview(currentImageUpload["image_code"]); // Preview or display selected image from parent
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUrlInput = (e) => {
        const url = e.target.value;
        setImageUrl(url);
        // onImageUpload(url); // Pass URL to parent
        if (typeof setCurrentImageUpload === "function") {
            setCurrentImageUpload({"image_code" : url});
        } else {
            console.error("setCurrentImageUpload function is not provided. # from input URL");
        }

        console.log(currentImageUpload)
        //setImagePreview(currentImageUpload["image_code"]); // Show URL preview
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div>
            <h3>Upload Image</h3>
            <div
                {...getRootProps()}
                style={{
                    border: "2px dashed gray",
                    padding: "20px",
                    textAlign: "center",
                    marginBottom: "10px",
                }}
            >
                <input {...getInputProps()} />
                <p>Drag and drop an image here, or click to select a file</p>
            </div>
            <input type="file" onChange={handleFileInput} />
            <input
                type="text"
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={handleUrlInput}
            />
            {currentImageUpload["image_code"] && (
                <div>
                    <h4>Image Preview:</h4>
                    <img src={currentImageUpload["image_code"]} alt="Preview" style={{ maxWidth: "35%" }} />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
