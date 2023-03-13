import md5 from 'md5';

export default async function getComics(offset: Number) {
    const resource = 'comics'
    const PUBLIC_KEY = process.env.MARVEL_PUBLIC_KEY;
    const PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY;
    const URL = process.env.MARVEL_API_URL;

    const timestamp = new Date().getTime();
    const hash = md5(`${timestamp}${PRIVATE_KEY}${PUBLIC_KEY}`);
    const url = `${URL}/${resource}`;

    const uri = `${url}?apikey=${PUBLIC_KEY}&ts=${timestamp}&hash=${hash}&offset=${offset}&orderBy=-focDate`;
    const res = await fetch(uri).then(response => response.json())
    console.log(res)
    return res.data.results
}

