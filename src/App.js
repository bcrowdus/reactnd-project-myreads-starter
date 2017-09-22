import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookCase from './BookCase'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
	state = {
	    books: [],
        foundBooks : [],
        searchTerm: "",
        shelfIndex : { "currentlyReading": [], "wantToRead": [], "read": [] }
	};

    componentDidMount() {
      	BooksAPI.getAll().then((books) => {
            this.indexShelves(books);
      	    this.setState({ books })
        });
    }

    indexShelves = (books) => {
        const [ read, wantToRead, currentlyReading ] = [ "read", "wantToRead", "currentlyReading"];

        books.map( book => {
            switch(book.shelf) {

                case currentlyReading:
                    this.addToIndex(book, currentlyReading);
                    break;
                case wantToRead:
                    this.addToIndex(book, wantToRead);
                    break;
                case read:
                    this.addToIndex(book, read);
                    break;
                default:

            }
        })
    };

    addToIndex = (book, shelf) => {
        const shelfIndex = this.state.shelfIndex;

        shelfIndex[shelf].push(book.id);

        this.setState( { shelfIndex } );

    }

	onBookShelfChange = (book, shelf) => {

		BooksAPI.update(book, shelf)
			.then( data => { 
				this.setState((current) => {
                    if(book.shelf == "none") {
                        current.books.push(book);
                    }
                    book.shelf = shelf;
                    return { books : current.books, shelfIndex: data };
                });
            });
    }


	onSearchTermChange = (searchTerm ) => {

         BooksAPI.search(searchTerm, 0)
             .then( books =>  {
                 books.map( book => book.shelf = this.getBookShelf(book));

                 this.setState( { foundBooks : books, searchTerm : searchTerm } )
             })

    }

    getBookShelf = (book) => {
        const { shelfIndex } = this.state;

        let bookShelf = Object.keys(shelfIndex)
            .map( key => shelfIndex[key].indexOf(book.id) >= 0 ? key : "")
            .join("");

        if( bookShelf === "" ) {
            bookShelf = "none";
        }

        return bookShelf;
    };


  	renderBookCase = () => (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <BookCase books={this.state.books} onBookShelfChange={this.onBookShelfChange}/>
            <div className="open-search">
                <Link to='/search'>Add a book</Link>
            </div>
        </div>
    );

    renderSearch = () => {
        const { foundBooks, searchTerm } = this.state;

        return(
            <SearchBooks searchTerm={searchTerm}
                         books={foundBooks}
                         onSearchTermChange={this.onSearchTermChange}
                         onBookShelfChange={this.onBookShelfChange} />
        )
    };
	
  	render() {

    	return (
      		<div className="app">
       			<Route exact path="/" render={ this.renderBookCase } />
             	<Route exact path="/search" render={ this.renderSearch } />
      		</div>
    	)
  	}
}

export default BooksApp