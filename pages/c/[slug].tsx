import Link from 'next/link'

export default function Comic({ comic }) {
  return (
    <div>
      you shouldn't be here
      <Link
        href={{ pathname: "/" }}
      >
        go home
      </Link>
    </div>
  )
}
