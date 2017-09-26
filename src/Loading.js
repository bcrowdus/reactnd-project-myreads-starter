import React from 'react'

class Loading extends React.Component {
	render() {
      	const { visible } = this.props;      
      	const className = visible ? "search-loading" : "search-loading hidden";
        
		return (<div className={className}></div> );	
    }
}
                
export default Loading;