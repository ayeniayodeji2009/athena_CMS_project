import React from "react";

const SearchResults = ({ results }) => {
    return (
        <div>
            <h3>Search Results</h3>
            <ul>
                {results.map((result) => (
                    <li key={result.id}>
                        <h4>{result.title}</h4>
                        <p>Category: {result.category}</p>
                        <p>Tags: {result.tags}</p>
                        <p>{result.meta_description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;
