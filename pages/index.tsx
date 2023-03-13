import { useEffect, useCallback } from 'react'
import Header from '../components/Header'
import ComicCard from '../components/ComicCard'
import getComics from '../marvel'
import ComicModal from "../components/ComicModal"
import { useRouter } from "next/router"

export default function Home({ comics }) {
  const router = useRouter();
  const { comicId } = router.query;
  const comic = comicId && comics.find((x: any) => x.id === parseInt(comicId as string));

  const onDismiss = useCallback(() => {
    if (comicId) router.back();
  }, [comicId, router]);

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <>
      <Header/>
      {comicId && <ComicModal comic={comic} onDismiss={onDismiss} />}
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="sm:py-15 mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
          
        </div>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {comics &&
            comics.map((comic) => (
              <ComicCard product={comic} id={comic.id} key={comic.id}/>
            ))}
        </div>
    
      </div>
    </>
  )
}

export async function getStaticProps() {
  const searchResults = await getComics()
  console.log('xuller')
  return {
    props: {
      comics: searchResults ? searchResults : null,
    },
    revalidate: 60,
  }
}
