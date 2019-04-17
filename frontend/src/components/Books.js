/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import Book from './Book'
import Pagination from './Pagination'
import { parseQueryString } from '../utils/helper'
import { PERPAGE } from '../config'

const ALL_BOOKS_QUERY = gql`
  query ALL_BOOKS_QUERY($skip: Int, $first: Int) {
    books(skip: $skip, first: $first) {
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

const Center = styled.div`
  text-align: center;
`

const BookList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    justify-content: center;
  }
`

export default function Books(props) {
  const qs = props.location.search
  const { page } = parseQueryString(qs)
  return (
    <Center>
      <Pagination page={page} />
      <Query
        query={ALL_BOOKS_QUERY}
        variables={{
          skip: page * PERPAGE - PERPAGE,
          first: PERPAGE
        }}
      >
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
      <Pagination page={page} />
    </Center>
  )
}
