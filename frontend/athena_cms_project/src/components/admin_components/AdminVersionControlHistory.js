import React, { useState, useEffect } from "react";

const AdminVersionControlHistory = ({ content_id, setUpdateBody }) => {
    const [versions, setVersions] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/content/${content_id}/versions`)
            .then((res) => res.json())
            .then((data) => setVersions(data))
            .catch((error) => console.error("Error fetching versions:", error));
    }, [content_id]);


    return (
        <div>
            <h3>Version History</h3>
            <ul>
                {versions.map((version) => (
                    <li key={version.id}>
                        <p>Version ID: {version.id}</p>
                        <p style={{fontWeight: "bold"}}>Content: </p>
                        <div dangerouslySetInnerHTML={{ __html: version.body }} style={{border: "1px green solid", width: "50%"}}/>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "50%"}}>
                            <p>Timestamp: {new Date(version.timestamp).toLocaleString()}</p>
                            <button onClick={() => setUpdateBody(version.body)}>Restore Version</button>
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