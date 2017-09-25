import React from 'react'
import BooksGrid from "./BooksGrid";

class BookShelf extends React.Component {
  	onNoBooks = () => {
        const { title } = this.props;

  		return (
  			<h2>The {title} bookshelf is empty.</h2>
		)
	}
	render() {
		const { title, books, onBookShelfChange } = this.props;
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{ title }</h2>
				<div className="bookshelf-books">
					<BooksGrid books={books} onBookShelfChange={onBookShelfChange} onNoBooks={this.onNoBooks}/>
				</div>
			</div>
		)
	}
}

export default BookShelf