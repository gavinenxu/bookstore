import React, { Component } from 'react'
import Downshift from 'downshift'
import debounce from 'lodash/debounce'
import { gql } from 'apollo-boost'
import { ApolloConsumer } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { DropDown, DropDownItem, SearchStyles } from '../styles/DropDown'
import { formatImageUrl } from '../utils/helper'
import imageNotAail from '../static/imageNotAail.jpg'

const SEARCH_BOOK_QUERY = gql`
  query SEARCH_BOOK_QUERY($title: String!) {
    books(where: { title_contains: $title }) {
      id
      image
      title
    }
  }
`

class Search extends Component {
  state = {
    books: []
  }

  handleSearch = debounce(async (e, client) => {
    const searchQuery = {
      query: SEARCH_BOOK_QUERY,
      variables: { title: e.target.value }
    }
    const res = await client.query(searchQuery)
    this.setState({
      books: res.data.books
    })
  }, 500)

  render() {
    const { books } = this.state
    return (
      <SearchStyles>
        <Downshift
          itemToString={book => (book === null ? '' : book.title)}
          onChange={book => {
            // eslint-disable-next-line react/prop-types
            const { history } = this.props
            history.push({
              pathname: 'book',
              search: `?id=${book.id}`
            })
          }}
        >
          {({ getInputProps, getItemProps, isOpen, highlightedIndex }) => (
            <div>
              <ApolloConsumer>
                {client => (
                  <input
                    {...getInputProps({
                      type: 'search',
                      placeholder: 'Search by Title',
                      onChange: e => {
                        e.persist()
                        this.handleSearch(e, client)
                      }
                    })}
                  />
                )}
              </ApolloConsumer>
              {isOpen && (
                <DropDown>
                  {books.map((book, index) => (
                    <DropDownItem
                      {...getItemProps({ item: book })}
                      key={book.id}
                      highlighted={index === highlightedIndex}
                    >
                      {book.image ? (
                        <img
                          width="50"
                          src={formatImageUrl(book.image)}
                          alt={book.title}
                        />
                      ) : (
                        <img width="50" src={imageNotAail} alt={book.title} />
                      )}
                      {book.title}
                    </DropDownItem>
                  ))}
                </DropDown>
              )}
            </div>
          )}
        </Downshift>
      </SearchStyles>
    )
  }
}

export default withRouter(Search)
