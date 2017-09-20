import React from 'react'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'

class BooksCase extends React.Component {
  	state = {
        books: []
	}

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        });
    }

    onBookShelfChange = (id, shelf) => {
  		 this.setState((current) => {
		 	var found = current.books.find( book => book.id === id);
		 	found.shelf = shelf;
		 	return { books : current.books };
		 });
	}


    currentReadingFilter = (book) => book.shelf === 'currentlyReading';

    wantToReadFilter = (book) => book.shelf === 'wantToRead';

    readFilter = (book) => book.shelf === 'read';



	render() {
		const { books } = this.state

		return (
			<div className="list-books-content">
      			<div>
					<BookShelf title="Currently Reading"
							   books={books.filter( this.currentReadingFilter )}
							   onBookShelfChange={this.onBookShelfChange} />

					<BookShelf title="Want to Read"
							   books={books.filter( this.wantToReadFilter ) }
							   onBookShelfChange={this.onBookShelfChange} />

					<BookShelf title="Read"
							   books={books.filter( this.readFilter )}
							   onBookShelfChange={this.onBookShelfChange} />
				</div>
			</div>
		)
	}
}
export default BooksCase