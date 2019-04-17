/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import {
  parseQueryString,
  formatImageUrl,
  filterHtmlTag,
  rmSpecialChar
} from '../utils/helper'
import imageNotAail from '../static/imageNotAail.jpg'

const FETCH_BOOK_QUERY = gql`
  query FETCH_BOOK_QUERY($id: ID!) {
    book(where: { id: $id }) {
      primary_isbn
      price
      image
      description
      title
      authors {
        id
        role
        first_name
        last_name
        short_bio
      }
    }
  }
`

const SingleBookStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.boxShadow};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .details {
    padding: 3rem;
    font-size: 2rem;
  }
`

export default function SingleBook(props) {
  const qs = props.location.search
  const { id } = parseQueryString(qs)
  return (
    <Query query={FETCH_BOOK_QUERY} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>ERROR: {error}</p>
        if (!data.book) return <p>No book found</p>
        const { book } = data
        return (
          <SingleBookStyles>
            {book.image ? (
              <img src={formatImageUrl(book.image)} alt={book.title} />
            ) : (
              <img src={imageNotAail} alt={book.title} />
            )}
            <div className="details">
              <h2>{book.title}</h2>
              <h4>Primary ISBN: {book.primary_isbn}</h4>
              <h4>Price: {book.price}</h4>
              <h4>
                Authors:
                {book.authors.map(author => {
                  if (author.first_name && author.last_name) {
                    return (
                      <span key={author.id}>
                        {author.first_name} {author.last_name}
                        <br />
                      </span>
                    )
                  }
                  return null
                })}
              </h4>
              <p>{rmSpecialChar(filterHtmlTag(book.description))}</p>
            </div>
          </SingleBookStyles>
        )
      }}
    </Query>
  )
}
