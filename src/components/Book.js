import React from 'react';
import '../App.css';

const Book = (props) => (
    <div className="book">
        <div className="book-top">
            <div className="book-cover" style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${props.img}")`
            }}></div>
        

        <div className="book-shelf-changer">

        <select name="optionList" 
            onChange={event => props.moveBook(props.id,event.target.value)}
            value={props.shelf}
        >
          
        <option value="none" disabled>Move to...</option>
          
          <option 
            value="currentlyReading" 
          >Currently Reading</option>
          
          <option 
            value="wantToRead"
          >Want to Read</option>
          
          <option 
            value="read"
          >Read</option>

          <option 
            value="none"
          >None</option>
        </select>
    
      </div>
      </div>

       <div className="book-title">{props.title}</div> 
       <div className="book-authors">{props.author}</div> 

    </div>
);

export default Book;