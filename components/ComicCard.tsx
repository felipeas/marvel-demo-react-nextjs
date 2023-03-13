import Image from 'next/image'
import Link from 'next/link'

function thumb(t) {
  if (t.path.endsWith('image_not_available')) {
    return 'https://dummyimage.com/560x850/86efad/22c55e'
  }

  return `${t.path}.${t.extension}`
}

export default function ProductCard({ id, product }) {
  return (
    <>
      <Link
        href={{ pathname: "/", query: { comicId: id } }}
        as={`/c/${encodeURI(id)}`}
        className="group overflow-hidden h-full shadow-2xl hover:-translate-y-1 hover:scale-110 duration-300"
      >
        <div className="cursor-pointer">
          <Image
            src={thumb(product.thumbnail)}
            alt={product.title}
            className="w-full"
            width={553}
            height={850}
            style={{ minHeight: '150px' }}
          />

          <div className="px-6 py-4">
            <div className="group-hover:text-red-800 text-black text-sm font-semibold" >
              {product.title}
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}
