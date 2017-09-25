import React from 'react'
import BookShelfChanger from './BookShelfChanger'

class Book extends React.Component {

    onChange = (e) => {
        const { book, onBookShelfChange } = this.props;
        const shelf = e.currentTarget.value;

        onBookShelfChange(book, shelf);
    }

    getThumbnail = () => {
        const { book } = this.props;

        if( book.imageLinks && book.imageLinks.thumbnail ) {
            return(<div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>);
        }
    }

    render() {
		const { book } = this.props;
		// some books apparently do not have authors
        const authors = book.authors ? book.authors.join("") : "";

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        { this.getThumbnail() }
                		<BookShelfChanger shelf={book.shelf} onChange={this.onChange} />
                    </div>
                    <div className="book-title">{ book.title }</div>
                    <div className="book-authors">{ authors }</div>
                </div>
            </li>
        )
	}
}
export default Book