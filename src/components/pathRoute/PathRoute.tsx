import { FC } from 'react'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'

interface PathRouteProps {
    path: string,
    subPath?: string
}

const PathRoute: FC<PathRouteProps> = ({ path, subPath }) => {


    return (
        <div className='py-6 sm:py-10'>
            <ul className='flex justify-start items-center gap-x-4'>
                <li>
                    <Link to="/" className='flex space-x-2 font-semibold items-center'>
                        <FaHome size={18} />
                        <p>Home</p>
                    </Link>
                </li>
                <li>{">"}</li>
                <li>{path}</li>
                {
                    subPath &&
                    <>
                        <li>{">"}</li>
                        <li>{subPath}</li></>
                }
            </ul>
        </div>
    )
}

export default PathRoute