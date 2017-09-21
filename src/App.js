import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookCase from './BookCase'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
	state = { books: [], foundBooks : [], searchTerm: "" }

    componentDidMount() {
      	BooksAPI.getAll().then((books) => {
            this.setState({ books })
        });
    }

	onBookShelfChange = (book, shelf) => {
		BooksAPI.update(book, shelf)
			.then( data => { 
				this.setState((current) => {
		 		var found = current.books.find( b => b.id === book.id);
		 		found.shelf = shelf;
		 		return { books : current.books };
			});		
        });  		 
	}

	onSearchTermChange = (searchTerm ) => {
         BooksAPI.search(searchTerm, 0)
             .then( books =>  this.setState( { foundBooks : books, searchTerm : searchTerm } ))

    }

  	renderBookCase = () =>(
    		<div className="list-books">
            	<div className="list-books-title">
              		<h1>MyReads</h1>
    			</div>
          		<BookCase books={this.state.books} onBookShelfChange={this.onBookShelfChange}/>
            	<div className="open-search">
    				<Link to='/search'>Add a book</Link>
				</div>
          	</div>
		)
	
  	render() {
      	const { foundBooks, searchTerm } = this.state
		
    	return (
      		<div className="app">
       			<Route exact path="/" render={ this.renderBookCase } />
             	<Route exact path="/search" render={() => (<SearchBooks searchTerm={searchTerm} books={foundBooks} onSearchTermChange={this.onSearchTermChange} />)} />
      		</div>
    	)
  	}
}

export default BooksApp