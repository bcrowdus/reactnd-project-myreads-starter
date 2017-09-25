import React from 'react'
import Book from './Book'

class BooksGrid extends React.Component {


    render() {
        const { books, onBookShelfChange, onNoBooks } = this.props;

        if( books.length === 0 ) {
            return onNoBooks();
        } else {
            return (
                <ol className="books-grid">
                    {
                        books.map(book => ( <Book key={book.id} book={book} onBookShelfChange={onBookShelfChange}/>  ))
                    }
                </ol>
            );
        }
    }
}

export default BooksGrid