import React from 'react'
import { Link } from 'react-router-dom'
import BooksGrid from "./BooksGrid";
import Loading from "./Loading";

class SearchBooks extends React.Component {

  	state = { isLoading : false }

	searchTerm = this.props.searchTerm;

    onSearchTermChange = (e) => {
        const {  onSearchTermChange } = this.props;
        
      	this.setState({ isLoading: true });
      	this.searchTerm = e.currentTarget.value;
      
		if(this.searchTerm.length === 0){
            onSearchTermChange( this.searchTerm, this.onSearchComplete );          	
		} else {
            this.onSearch(this.searchTerm);
		}

    }

	debounce = (func, wait, immediate) => {
		var timeout;

		return function() {
			var context = this, args = arguments;

			clearTimeout(timeout);

			timeout = setTimeout(function() {
				timeout = null;
				if (!immediate) {
					func.apply(context, args);
                }
			}, wait);

			if (immediate && !timeout) {
				func.apply(context, args);
            }
		};
	}
	
	onSearchComplete = () => this.setState({ isLoading: false });

	onSearch = this.debounce(() => {
        const {  onSearchTermChange } = this.props

        if(this.searchTerm.length > 0){
            onSearchTermChange( this.searchTerm, this.onSearchComplete );
		}      	
	}, 800);

    onNoBooks = () => {
        const { books, searchTerm } = this.props;

        if( searchTerm.length > 0 && books.length === 0 ){
            return (<h2 style={{ position : 'absolute', left: '45%' }}>No Results</h2>)
        } else {
        	return null;
		}
    }	
                    
	render() {
        
		const { books, searchTerm, onBookShelfChange } = this.props;
       	const { isLoading } = this.state;
              
		return (
			<div className="search-books">
              <div className="search-books-bar">
          		<Link className="close-search" to='/'>Close</Link>                
                <div className="search-books-input-wrapper">
					<input type="text" placeholder="Search by title or author" defaultValue={searchTerm} onChange={ this.onSearchTermChange }/>
                </div>
              </div>
              <div className="search-books-results">
          		<Loading visible={isLoading} />
                <BooksGrid books={books} 
          			onBookShelfChange={onBookShelfChange} 
          			onNoBooks={this.onNoBooks}/>
              </div>
            </div>
		)
	}
}
export default SearchBooks