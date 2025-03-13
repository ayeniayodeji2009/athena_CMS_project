import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { /*useParams, useNavigate,*/ useLocation } from "react-router-dom";
import HTMLContentConverter from '../tool_components/HTMLContentConverter.js';
import HTMLHead from '../tool_components/HTMLHead.js';
import GoBackButton from './GoBackButton.js';



function ViewIndividualContent() {
    const [selectedPage, setSelectedPage] = useState("");


    // users Props recieved from listContentAdmin by using useLocation in router
    const location = useLocation();
    const content_id = location.state; //From AdminContentList Component
    console.log(content_id)


     // Fetch this content with this ID number pages on load
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/content/${content_id}`)
        .then(response => {
            setSelectedPage(response.data);
        })
        .catch(error => {console.error(error); alert(error)});
    }, [content_id]);


    if (!selectedPage) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <HTMLHead pageTitle={selectedPage.title} pageMetaDescription={selectedPage.meta_description} />
            <GoBackButton />
            View Individual Content
            <h2>{selectedPage.title}</h2>
            {/* <p>{selectedPage.body}</p> */}
            <img src={selectedPage.image_url} alt={selectedPage.image_url} width={"50%"} height={"50%"} />
            <HTMLContentConverter htmlString={selectedPage.body} />
        </>
    )
}

export default ViewIndividualContent