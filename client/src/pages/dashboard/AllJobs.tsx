import React, { Fragment } from 'react'
import JobContainer from '../../components/JobContainer'
import SearchContainer from '../../components/SearchContainer'

const AllJobs = () => {
    return (
        <Fragment>
            <SearchContainer />
            <JobContainer />
        </Fragment>
    )
}

export default AllJobs