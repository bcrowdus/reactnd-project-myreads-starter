import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchBooks extends React.Component {
  	
	onSearchTermChange = (e) => {
      	const searchTerm = e.currentTarget.value        
      	this.onSearch(searchTerm);

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

	onSearch = this.debounce((searchTerm) => {
        const {  onSearchTermChange } = this.props

		onSearchTermChange( searchTerm );

	}, 1000);


	render() {
		const { books, searchTerm } = this.props;
		
		return (
			<div className="search-books">
              <div className="search-books-bar">
          		<Link className="close-search" to='/'>Close</Link>                
                <div className="search-books-input-wrapper">
					<input type="text" placeholder="Search by title or author" defaultValue={searchTerm} onChange={ this.onSearchTermChange }/>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
             		{ 
          				books.map( book => ( <Book key={book.id} book={book} onBookShelfChange={this.onBookShelfChange} />  ))
             		}
             	</ol>
              </div>
            </div>
		)
	}
}
export default SearchBooks