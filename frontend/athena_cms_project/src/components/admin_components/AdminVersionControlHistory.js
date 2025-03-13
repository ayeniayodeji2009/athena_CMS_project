import React, { useState, useEffect } from "react";

const AdminVersionControlHistory = ({ content_id, setUpdateTitle, setUpdateImage, setUpdateBody }) => {
    const [versions, setVersions] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/content/${content_id}/versions`)
            .then((res) => res.json())
            .then((data) => setVersions(data))
            .catch((error) => console.error("Error fetching versions:", error));
    }, [content_id]);


    function restoreContentVersionToEditor (para_content_title, para_content_image_url, para_content_body) {
        const confirmRestoreVersion = window.confirm("Are you sure you want to Restore this version into the Editor ?")
        if (confirmRestoreVersion) {
            setUpdateTitle(para_content_title)
            setUpdateImage({"image_code": para_content_image_url})
            setUpdateBody(para_content_body) // set content body to current update state for Editor use
        }
    }

    console.log(versions)

    return (
        <div>
            <h3>Version History</h3>
            <ul>
                {versions.map((version) => (
                    <li key={version.id}>
                        <p>Version ID: {version.id}</p>
                        <p style={{fontWeight: "bold"}}>Content: </p>
                        <p>Title:</p>
                        <div dangerouslySetInnerHTML={{ __html: version.title }} style={{border: "1px green solid", width: "50%", height: "50%"}}/>
                        <p>Content Image:</p>
                        <div style={{border: "1px green solid", width: "50%"}}>
                            {version.image_url && <img src={version.image_url} alt="Image_version" style={{ maxWidth: "20%" }} />}
                        </div>
                        <p>Body:</p>
                        <div dangerouslySetInnerHTML={{ __html: version.body }} style={{border: "1px green solid", width: "50%"}}/>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "50%"}}>
                            <p>Timestamp: {new Date(version.timestamp).toLocaleString()}</p>
                            <button onClick={() => restoreContentVersionToEditor(version.title, version.image_url, version.body)}>Restore Version</button>
                            <DeleteVersion content_id={content_id} version_id={version.id} versions={versions} setVersions={setVersions}/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminVersionControlHistory;



function DeleteVersion ({ content_id, version_id, versions, setVersions }) {

    const deleteVersion = (para_version_id) => {

        const confirmDelete = window.confirm("Are you sure you want to Delete this version?")
        if (confirmDelete) {
            fetch(`http://127.0.0.1:5000/content/${content_id}/versions/${para_version_id}`, {
                method: "DELETE",
            })
                .then((res) => {
                    if (res.status === 204) {
                        alert("Version Deleted successfully!");

                        // Delete version from UI
                        const updateVersionList = versions.filter(version => version.id !== para_version_id)
                        setVersions(updateVersionList)                       
                    } else {
                        alert("Failed to delete version.");
                    }
                }).catch((error) => console.error("Error Deleting version:", error));
        }
    };

    return (
        <button onClick={() => deleteVersion(version_id)}>Delete Version</button>
    )
}