import React from 'react'
import BookShelf from './BookShelf'

class BooksCase extends React.Component {
  	
	bookFilter = (filter) => (book) => book.shelf === filter;

	currentlyReadingFilter = this.bookFilter('currentlyReading');
    wantToReadFilter = this.bookFilter('wantToRead');
    readFilter = this.bookFilter('read');
	
	render() {
		const { books, onBookShelfChange } = this.props
		
		return (
			<div className="list-books-content">
      			<div>
					<BookShelf title="Currently Reading"
							   books={books.filter( this.currentlyReadingFilter )}
							   onBookShelfChange={onBookShelfChange} />

					<BookShelf title="Want to Read"
							   books={books.filter( this.wantToReadFilter  ) }
							   onBookShelfChange={onBookShelfChange} />

					<BookShelf title="Read"
							   books={books.filter( this.readFilter )}
							   onBookShelfChange={onBookShelfChange} />
				</div>
			</div>
		)
	}
}
export default BooksCase