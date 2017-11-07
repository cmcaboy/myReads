import React from 'react';
import * as BooksAPI from '../BooksAPI';
import '../App.css';
import {Link} from 'react-router-dom';
import Book from './Book.js';

class SearchPage extends React.Component {
  state = {
    searchList: [],
    searchString: ''
  }

  moveBook = (book, newShelf) => {
    BooksAPI.update(book,newShelf)

  }
  
  searchBooks = (searchTerm) => {
      
    BooksAPI.search(searchTerm,10)
        .then(books => {this.setState({searchList:books})});
    this.setState(() => ({ 
        searchString: searchTerm,
    }));
  }

  render() {
    return (
        <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input 
                type="text" 
                placeholder="Search by title or author"
                value={this.state.searchString}
                onChange={event => this.searchBooks(event.target.value)}    
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {
            this.state.searchList.map((book,index) => (
                <li key={book.id}>
                    <Book
                        img={book.smallThumbnail}
                        title={book.title}
                        author={book.authors}
                        id={book.id}
                        moveBook={this.moveBook}
                        shelf={book.shelf}
                    />
                </li>
            ))
          }
          </ol>
        </div>
      </div>

    )
  }
}

export default SearchPage;
