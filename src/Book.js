import React from 'react'
import BookShelfChanger from './BookShelfChanger'

const Book = ({ book, onBookShelfChange }) => {
    const onChange = (e) => {
        const shelf = e.currentTarget.value;
        onBookShelfChange(book, shelf);
    };

    const getThumbnail = () => {
        if( book.imageLinks && book.imageLinks.thumbnail ) {
            return(<div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>);
        }
    };

    const authors = book.authors ? book.authors.join(", ") : "";

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    { getThumbnail() }
                    <BookShelfChanger shelf={book.shelf} onChange={onChange} />
                </div>
                <div className="book-title">{ book.title }</div>
                <div className="book-authors">{ authors }</div>
            </div>
        </li>
    );
}
export default Book