import React from 'react'

class BookShelfChanger extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      		currentShelf: props.shelf
        };
	}  	
	onBookShelfChange(e) {
      	this.setState( { currentShelf: e.target.value })
      	// Callback when bookshelf is actually changed
      	//https://stackoverflow.com/questions/32560744/react-event-bubbling-through-nested-components
    }
	render() {
      	const { currentShelf } = this.state;
		return (
			<div className="book-shelf-changer">
				<select value={currentShelf} onChange={this.onBookShelfChange}>
					<option value="none" disabled>Move to...</option>
					<option value="currentlyReading">Currently Reading</option>
					<option value="wantToRead">Want to Read</option>
					<option value="read">Read</option>
					<option value="none">None</option>
				</select>
			</div>
		)
    }
}

export default BookShelfChanger;
