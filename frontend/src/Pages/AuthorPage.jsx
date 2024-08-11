import React, { useEffect } from 'react'
import AuthorCard from '../Compnents/AuthorCard'

const Author = () => {
  const authorData = JSON.parse(localStorage.getItem("authorToDisplay"))
  console.log(authorData)


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <AuthorCard author={authorData} />
  )
}

export default Author