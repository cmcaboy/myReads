import React from 'react';
import * as BooksAPI from '../BooksAPI.js';
import '../App.css';
import CurrentList from './CurrentList.js';
import WantList from './WantList.js';
import CompletedList from './CompletedList.js';
import Header from './Header.js';
import {Link} from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  getBooks() {
    BooksAPI.getAll()
      .then(books => this.setState( {books}));
  }

  moveBook = (book, newShelf) => {
    BooksAPI.update(book,newShelf)
      .then(() => { this.getBooks(); })
      .catch(() => {'Error on promise'})
  }

  componentDidMount() {
    this.getBooks();
  }



  render() {
    return (
      <div className="app">
      <Header />
        <div className="list-books">
          <CurrentList 
            list={
              this.state.books.filter((datum) => datum.shelf==='currentlyReading')} 
            moveBook={this.moveBook}
          />
          <WantList 
            list={this.state.books.filter((datum) => datum.shelf==='wantToRead')}
            moveBook={this.moveBook}
          />
          <CompletedList 
            list={this.state.books.filter((datum) => datum.shelf==='read')} 
            moveBook={this.moveBook}
          />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BooksApp;
