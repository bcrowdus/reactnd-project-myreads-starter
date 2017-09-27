import React from 'react'
import Book from './Book'

const BooksGrid = ({books, onBookShelfChange, onNoBooks}) => {

    const onShowBook = (book) => {
        return (
            <Book key={book.id}
                  book={book}
                  onBookShelfChange={onBookShelfChange}/>
        )
    };

    const onShowBooks = () => {
        return (
            <ol className="books-grid">
                { books.map(book => onShowBook(book) ) }
            </ol>
        );
    };

    if( books.length === 0 ) {
        return onNoBooks();
    } else {
        return onShowBooks();
    }
};

export default BooksGrid