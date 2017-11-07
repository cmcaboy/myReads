import React from 'react';
import '../App.css';
import Book from './Book.js';

const WantList = (props) => (
    <div className="bookshelf">
    <h2 className="bookshelf-title">Want to Read</h2>
    <div className="bookshelf-books">
    <ol className="books-grid">
        {props.list.map((book,index) => (
            <li key={book.id}>
                <Book
                    img={book.imageLinks.smallThumbnail}
                    title={book.title}
                    author={book.authors[0]}
                    id={book.id}
                    moveBook={props.moveBook}
                    shelf={book.shelf}
                />
            </li>
        ))
        }
    </ol>
    </div>
</div>
);

export default WantList;

