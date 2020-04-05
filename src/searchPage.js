import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookCard from './bookCard'


class SearchPage extends React.Component {
    state={
        books: [],
        myBooks: []
    }

    componentDidMount () {
        this.setState({myBooks : this.props.books})
    }

    SearchForBook = query =>{
        if (!query) {
            this.setState({books : []})
        } else {
            BooksAPI.search(query) 
            .then(books => {
                if (books.error) {
                    this.setState({
                        books: []
                    })
                } 
                else {
                    books.map(book => {
                        this.state.myBooks.map(ownBook => {
                            if (ownBook.id === book.id) {
                                book.shelf = ownBook.shelf
                            }
                            return null
                        })
                        return null
                    }
                    )
                    this.setState({books}) 
                }
            })
        }
    }


render(){
    return(
        <div>
            <div className="search-books">
                <div className="search-books-bar">
                    
                    <Link to="/">
                        <button className="close-search" >Close</button>
                    </Link> 
                        
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={(event) => this.SearchForBook(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.books.map(book => <BookCard updateState={this.props.updateState} key={book.id} book={book} />)}
                    </ol>
                </div>
            </div>
        </div>
    );
}




}

export default SearchPage;