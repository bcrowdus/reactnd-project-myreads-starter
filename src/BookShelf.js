import React from 'react'
import BooksGrid from "./BooksGrid";

const BookShelf = ({ title, books, onBookShelfChange }) => {
    const onNoBooks = () => {
        return (
			<h2>The {title} bookshelf is empty.</h2>
        )
    };

	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{ title }</h2>
			<div className="bookshelf-books">
				<BooksGrid books={books}
						   onBookShelfChange={onBookShelfChange}
						   onNoBooks={onNoBooks}/>
			</div>
		</div>
	);
};

export default BookShelf