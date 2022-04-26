import { ReactElement } from "react"
import { JobType } from "../context/appContext"
import Wrapper from "../styles/JobInfo.style"

interface JobInfoProps {
    icon: ReactElement,
    text: string | JobType,
}

const JobInfo: React.FC<JobInfoProps> = ({ icon, text }) => {
    return (
        <Wrapper>
            <span className='icon'>{icon}</span>
            <span className='text'>{text}</span>
        </Wrapper>
    )
}

export default JobInfo
