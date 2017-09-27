import React from 'react'
import BookShelf from './BookShelf'

const BookCase = ({ books, onBookShelfChange}) => {
	const bookFilter = (filter) => (book) => book.shelf === filter;
	const currentlyReadingFilter = bookFilter('currentlyReading');
    const wantToReadFilter = bookFilter('wantToRead');
    const readFilter = bookFilter('read');
	
	return (
		<div className="list-books-content">
			<div>
				<BookShelf title="Currently Reading"
						   books={books.filter( currentlyReadingFilter )}
						   onBookShelfChange={onBookShelfChange} />

				<BookShelf title="Want to Read"
						   books={books.filter( wantToReadFilter  ) }
						   onBookShelfChange={onBookShelfChange} />

				<BookShelf title="Read"
						   books={books.filter( readFilter )}
						   onBookShelfChange={onBookShelfChange} />
			</div>
		</div>
	)
};
export default BookCase;