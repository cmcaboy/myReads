import React from 'react';
import * as BooksAPI from '../BooksAPI';
import '../App.css';
import {Link} from 'react-router-dom';
import Book from './Book.js';
import { Debounce } from 'react-throttle';

class SearchPage extends React.Component {
  state = {
    searchList: [],
    searchString: ''
  }

  moveBook = (book, newShelf) => {
    BooksAPI.update(book,newShelf)
  }
  
  searchBooks = (searchTerm) => {
    if(searchTerm !== "") {  
    BooksAPI.search(searchTerm,10)
        .then(books => {
            BooksAPI.getAll()
                .then(currentBooks => {
                    // Merge teh 2 arrays together
                    // bookList is the merged array
                    
                    let bookList = [];
                    let isCurrentBook = false;
                    //console.log(books);
                    //console.log(books.length);
                    books.forEach(function(b,indb){
                        isCurrentBook = false;
                        currentBooks.forEach(function(c,indc) {
                            // If book is in our list of current books, 
                            // push our current book to the merged array
                            if(b.id === c.id){
                                isCurrentBook = true;
                                bookList.push(c);
                            }   
                        })
                        // If book is not in our list of current books, 
                        // push the search result book to our merged array
                        if(!isCurrentBook) {
                            if(!(b.imageLinks && b.imageLinks.smallThumbnail)) {
                                b.imageLinks = { smallThumbnail : "http://via.placeholder.com/128x192"}
                            }
                            bookList.push(b);
                        }
                    })
                    
                // Assign our state to our merged array
                this.setState({searchList:bookList})
                })
                .catch(e => { 
                    //console.log(e)
                    this.setState({searchList:[]});
                });
        }).catch(e => { 
            console.log("No books found.")
            this.setState({searchList:[]});
        });
    this.setState(() => ({ 
        searchString: searchTerm,
    }));
    }
  }

  render() {
    return (
        <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="300" handler="onChange">
                <input 
                    type="text" 
                    placeholder="Search by title or author"
                    
                    onChange={event => this.searchBooks(event.target.value)}    
                />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {
            !!this.state.searchList.length && this.state.searchList.map((book,index) => 
                (
                <li key={book.id}>
                    <Book
                        img={book.imageLinks.smallThumbnail}
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
