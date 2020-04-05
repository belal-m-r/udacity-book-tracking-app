import React from 'react'

const BookCard = (props) => (
        <li className="books-grid li">
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ 
                            width: 128,
                            height: 192,
                            backgroundImage: `url(${props.book.imageLinks ? `${props.book.imageLinks.thumbnail}` : ''})`}}>
                            </div>
                        <div className="book-shelf-changer">
                            <select
                                value={props.book.shelf===undefined?"none":props.book.shelf}
                                onChange={event => {
                                    props.updateState(props.book, event.target.value)
                                }}
                            >
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{props.book.title}</div>
                    {props.book.authors && (
                        props.book.authors.map((author, i) => (
                            <div key={`${author}${i}`} className="book-authors">{author}</div>
                            )
                        )
                    )
                    }
            </div>
        </li>
    );

export default BookCard;