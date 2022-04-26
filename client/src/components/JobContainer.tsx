import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import Loading from './Loading';
import Wrapper from '../styles/JobContainer.style';
import Job from './Job';

const JobContainer = () => {
  const { jobs, getJobs, isLoading, page, totalJobs } = useAppContext();
  useEffect(() => {
    getJobs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return <Loading center={true} />
  }

  if (jobs.length === 0) {
    return <Wrapper>
      <h2>No Job to display...</h2>
    </Wrapper>
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job
            key={job._id}
            _id={job._id as string}
            position={job.position}
            company={job.company}
            jobLocation={job.jobLocation}
            jobType={job.jobType}
            createdAt={job.createdAt}
            status={job.status}
          />
        })}

      </div>
    </Wrapper>
  )
}

export default JobContainer