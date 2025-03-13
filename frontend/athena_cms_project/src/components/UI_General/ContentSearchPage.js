import React, { useState } from "react";
import SearchContent from "./SearchContent";
import SearchResults from "./SearchResults";

const ContentSearchPage = () => {
    const [results, setResults] = useState([]);

    const handleSearch = (query) => {
        const params = new URLSearchParams(query).toString();

        fetch(`http://127.0.0.1:5000/search?${params}`)
            .then((res) => res.json())
            .then((data) => setResults(data))
            .catch((error) => console.error("Error fetching search results:", error));
    };

    return (
        <div>
            <SearchContent onSearch={handleSearch} />
            <SearchResults results={results} />
        </div>
    );
};

export default ContentSearchPage;
