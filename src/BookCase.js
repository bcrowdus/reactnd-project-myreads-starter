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


    currentReadingFilter = (book) => book.shelf === 'currentlyReading';

    wantToReadFilter = (book) => book.shelf === 'wantToRead';

    readFilter = (book) => book.shelf === 'read';



	render() {
		const { books } = this.state

		return (
			<div className="list-books-content">
      			<div>
					<BookShelf title="Currently Reading" books={books.filter( this.currentReadingFilter )} />
					<BookShelf title="Want to Read" books={books.filter( this.wantToReadFilter ) } />
					<BookShelf title="Read" books={books.filter( this.readFilter )} />
				</div>
			</div>
		)
	}
}
export default BooksCase