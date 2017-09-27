import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookCase from './BookCase'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
	state = {
	    books: [],
        foundBooks : [],
        searchTerm: "",

	};

    shelfIndex = { }

    constants = {
        "currentlyReading": "currentlyReading",
        "wantToRead": "wantToRead",
        "read": "read"
    };

    componentDidMount() {
      	BooksAPI.getAll().then((books) => {
            this.indexShelves(books);
      	    this.setState({ books })
        });
    }

    indexShelves = (books) => {
        const { read, wantToRead, currentlyReading } = this.constants;

        books.forEach( book => {
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
        this.shelfIndex[book.id] = shelf;

    }

	onBookShelfChange = (book, shelf) => {

		BooksAPI.update(book, shelf)
			.then( data => { 
				this.setState((current) => {
                    if(book.shelf === "none") {
                        book.shelf = shelf;
                        current.books.push(book);
                    } else {
                        let currentBook = current.books.find( cb => cb.id === book.id);
                        currentBook.shelf = shelf;
                        currentBook = current.foundBooks.find(cb => cb.id === book.id);
                        currentBook.shelf = shelf;
                    }
                    return { books : current.books, foundBooks : current.foundBooks };
                });
            });
    }


	onSearchTermChange = (searchTerm, onSearchComplete ) => {

        if(searchTerm === "") {
            let foundBooks = []
            this.setState({ foundBooks, searchTerm });
          	onSearchComplete();
        } else {
            BooksAPI.search(searchTerm, 0)
                .then( books =>  {
                    if(books.error) {
                        this.setState( { searchTerm : searchTerm, foundBooks: [] } )
                    } else {
                        books.map( book => book.shelf = this.getBookShelf(book));
                        this.setState( { foundBooks : books, searchTerm : searchTerm } )
                    }
              		onSearchComplete();
                })
        }      	
    }

    getBookShelf = (book) => {
        let bookShelf = this.shelfIndex[book.id] ? this.shelfIndex[book.id] : 'none';
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

    renderNoMatch = (location) => {
        return (
            <div id="NoMatch">

                <a href="//www.google.com/">
                    <span id="logo" aria-label="Google"></span>
                </a>

                <p>
                    <b>404.</b> <ins>That’s an error.</ins>
                </p>
                <p style={{width: '50%'}}>The requested URL <code>{location.pathname}</code> was not found on this server.
                    <ins>That’s all we know.</ins>
                </p>
            </div>
        )

    }
	
  	render() {

    	return (
      		<div className="app">
                <Switch>
       			    <Route exact path="/" render={ this.renderBookCase } />
             	    <Route exact path="/search" render={ this.renderSearch } />
                    <Route render={ props => this.renderNoMatch(props.location) } />
                </Switch>
      		</div>
    	)
  	}
}

export default BooksApp