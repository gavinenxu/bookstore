/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { PERPAGE } from '../config'
import PaginationStyle from '../styles/PaginationStyle'

const PAGINATION_QUERY = gql`
  {
    booksConnection {
      aggregate {
        count
      }
    }
  }
`

export default function Pagination(props) {
  return (
    <Query query={PAGINATION_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>ERROR: {error}</p>
        const { count } = data.booksConnection.aggregate
        const totalPage = Math.ceil(count / PERPAGE)
        const page = Number(props.page)

        return (
          <PaginationStyle>
            <Link
              to={{ pathname: '/', search: `?page=${page - 1}` }}
              aria-disabled={page <= 1}
            >
              👈Prev
            </Link>
            <p>
              Page {page} of {totalPage}
            </p>
            <Link
              to={{ pathname: '/', search: `?page=${page + 1}` }}
              aria-disabled={page >= totalPage}
            >
              👉Next
            </Link>
          </PaginationStyle>
        )
      }}
    </Query>
  )
}

Pagination.propTypes = {
  page: PropTypes.string
}

Pagination.defaultProps = {
  page: '1'
}
