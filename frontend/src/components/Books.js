import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import Book from './Book'

const ALL_BOOKS_QUERY = gql`
  {
    books {
      id
      title
      price
      image
      description
      authors {
        role
        first_name
        last_name
        short_bio
      }
    }
  }
`

const BookList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
`

export default function Books() {
  return (
    <Query query={ALL_BOOKS_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <p>...Loading</p>
        if (error) return <p>ERROR: {error}</p>
        return (
          <BookList>
            {data.books.map(book => (
              <Book key={book.id} book={book} />
            ))}
          </BookList>
        )
      }}
    </Query>
  )
}
