import React, { useState } from 'react'
import PageLoader from '../Compnents/PageLoader'
import NotFoundPage from './NotFoundPage'

const AllRoute = () => {
    const [loading, setLoading]  = useState(true)
    setTimeout(() => {
        setLoading(false)
    }, (7000));
  return (
    <div>
        {loading ? <PageLoader /> : <NotFoundPage />}
    </div>
  )
}

export default AllRoute