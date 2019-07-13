import React from 'react';

export const SearchResults = (props) => {
    const {suggestions} = props;
    return (
        <div className="fx__search-results" >
        {
            suggestions.fetch_suggestions_loading ?
                <h1>Loading</h1>:
                suggestions && suggestions.items.map(item =>
                    <div className="fx__search-items">
                        <span className="fx__search-name">{item.label}</span>
                        <span className="fx__search-category">({item.sub_category} ->  {item.category})</span>
                    </div>
                 )
        }
        </div>
    );
};