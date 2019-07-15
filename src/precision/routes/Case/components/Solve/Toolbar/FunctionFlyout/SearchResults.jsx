import React from 'react';

export const SearchResults = (props) => {
    const {suggestions, onFunctionClick} = props;
    return (
        <div className="fx__search-results" >
        {
            suggestions.fetch_suggestions_loading ?
                <h1>Loading</h1>:
                suggestions && suggestions.items.map(item =>
                    <div className="fx__search-items" onClick={() => onFunctionClick(item.function_obj)}>
                        <span className="fx__search-name">{item.function_obj.name}</span>
                        <span className="fx__search-category">({item.sub_category} ->  {item.category})</span>
                    </div>
                 )
        }
        </div>
    );
};