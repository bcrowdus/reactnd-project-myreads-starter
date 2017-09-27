import React from 'react'

const Loading = ({ visible }) => {
	const className = visible ? "search-loading" : "search-loading hidden";
    return ( <div className={className}></div> );
};
                
export default Loading;