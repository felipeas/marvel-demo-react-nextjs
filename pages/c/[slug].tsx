import Link from 'next/link'

export default function Comic({ comic }) {
  return (
    <div className='m-5 p-5'>
      you shouldn't be here ///
      <Link
        href={{ pathname: "/" }}
      >
        go home
      </Link>
      \\\
    </div>
  )
}
