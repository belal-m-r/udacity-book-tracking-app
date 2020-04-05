import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import SearchPage from './searchPage'
import BookCard from './bookCard'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount () {
    BooksAPI.getAll()
    .then(books => {
      this.setState({books})
    })
  }

  updateState = (book, value) => {
    let books = this.state.books
    BooksAPI.update(book, value)
      .then(() => {
        BooksAPI.get(book.id)
          .then(book => {
            let newBooks = books.filter(b => b.id !== book.id);
            this.setState({
              books: [...newBooks, book]
            })
          })
      })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render = {() => (<SearchPage 
                                              updateState={this.updateState}
                                              books={this.state.books}/>)} />

        <Route exact path='/' render = {() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books.filter(book => book.shelf === "currentlyReading")
                        .map(book => <BookCard updateState={this.updateState} key={book.id} book={book} />)
                      }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books.filter(book => book.shelf === "wantToRead")
                        .map(book => <BookCard updateState={this.updateState} key={book.id} book={book} />)
                      }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {this.state.books.filter(book => book.shelf === "read")
                        .map(book => <BookCard updateState={this.updateState} key={book.id} book={book} />)
                      }
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
          </div>
        )
        }/>
      </div>
    )
  }
}

export default BooksApp
