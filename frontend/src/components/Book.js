import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookCard from '../styles/BookCard'
import Title from '../styles/Title'
import PriceTag from '../styles/PriceTag'
import {
  formatMoney,
  filterHtmlTag,
  rmSpecialChar,
  formatImageUrl
} from '../utils/helper'
import imageNotAail from '../static/imageNotAail.jpg'

export default function Book({ book }) {
  return (
    <BookCard>
      {book.image ? (
        <img src={formatImageUrl(book.image)} alt={book.title} />
      ) : (
        <img src={imageNotAail} alt={book.title} />
      )}
      <Title>
        <Link to={{ pathname: 'book', search: `?id=${book.id}` }}>
          {book.title}
        </Link>
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
