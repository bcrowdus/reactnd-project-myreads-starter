import React from 'react'
import BookShelfChanger from './BookShelfChanger'

class Book extends React.Component {

    onChange = (e) => {
        const { book, onBookShelfChange } = this.props;
        const shelf = e.currentTarget.value;

        onBookShelfChange(book, shelf);
    }


    render() {
		const { book } = this.props;
      
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                		<BookShelfChanger shelf={book.shelf} onChange={this.onChange} />
                    </div>
                    <div className="book-title">{ book.title }</div>
                    <div className="book-authors">{ book.authors.join(", ") }</div>
                </div>
            </li>
        )
	}
}
export default Book