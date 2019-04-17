import React from 'react'
import PropTypes from 'prop-types'
import BookCard from '../styles/BookCard'
import Title from '../styles/Title'
import PriceTag from '../styles/PriceTag'
import { formatMoney, filterHtmlTag, rmSpecialChar } from '../utils/helper'

export default function Book({ book }) {
  return (
    <BookCard>
      {book.image ? (
        <img src={book.image} alt={book.title} />
      ) : (
        <img src="../static/imageNotAail.jpg" alt={book.title} />
      )}
      <Title>
        <a href="_blank">{book.title}</a>
      </Title>
      <PriceTag>{formatMoney(book.price)}</PriceTag>
      {book.description ? (
        <p>{rmSpecialChar(filterHtmlTag(book.description)).slice(0, 200)}...</p>
      ) : (
        <p>No Description</p>
      )}
    </BookCard>
  )
}

Book.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  book: PropTypes.object.isRequired
}
