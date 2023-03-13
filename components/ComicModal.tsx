import { useCallback, useRef, useState } from 'react';
import Image from 'next/image'
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api'

function thumb(t) {
  if (t.path.endsWith('image_not_available')) {
    return 'https://dummyimage.com/560x850/86efad/22c55e'
  }

  return `${t.path}.${t.extension}`
}

const mapCenter = { lat: -29.6846, lng: -51.1419 }

const mapOptions = {
  disableDefaultUI: true,
  clickableIcons: true,
  scrollwheel: true,
}

const mapStyle = {
  width: '100%',
  height: '400px',
}

export default function ComicModal({ comic, onDismiss }) {
  const overlay = useRef();
  const wrapper = useRef();
  const button = useRef();

  const [address, setAddress] = useState<google.maps.LatLng>();
  const [isShipped, setIsShipped] = useState(false);

  const onMapClick = e => {
    console.log(e.latLng!)
    setAddress(e.latLng!);
  }

  const sendComic = () => {
    console.log(isShipped)
    setIsShipped(true);
  }

  const onClick = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current || e.target === button.current) {
        setIsShipped(false)
        setAddress(null);
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper, button]
  );

  return (
    <div ref={overlay} className="overlay" onClick={onClick}>
      <div ref={wrapper} className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
        {!isShipped ? <>
          <div className="bg-white flex flex-col justify-between">
            <div className="mt-16 max-w-full px-1 sm:px-6 lg:max-w-7xl lg:px-5">
              <div className="flex flex-col  sm:flex-row">
                <Image
                  src={thumb(comic.thumbnail)}
                  alt={comic.title}
                  width={200}
                  height={425}
                  style={{ minHeight: '150px' }}
                />
                <div className="mt-10 2 flex m-20 flex-col sm:mt-0 sm:ml-10 w-full">
                  <h2 className="mt-1 w-full text-l font-bold text-gray-900 sm:text-l sm:tracking-tight lg:text-l">
                    {comic.title}
                  </h2>
                  <h2 className="mt-3 text-4xl font-bold text-gray-500 sm:text-3xl sm:tracking-tight lg:text-3xl">
                    {comic.name}
                  </h2>
                  <div className="flex w-full">
                    <div className="flex-col ">
                      {comic.characters.items.length > 0 ? <>Characters</> : null}
                      {comic.characters.items.map(({ name }) => (
                        <h3 className="p-1 flex-col m-1 bg-gray-700 text-gray-100 hover:bg-gray-500 hover:text-white">
                          {name}
                        </h3>
                      ))}
                    </div>
                    <div className="flex-col">
                      {comic.creators.items.length > 0 ? <>Creators</> : null}
                      {comic.creators.items.map(({ name }) => (
                        <h3 className="p-1 flex-col m-1 bg-gray-700 text-gray-100 hover:bg-gray-500 hover:text-white">
                          {name}
                        </h3>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white flex flex-col">
              <div className="mt-16 max-w-full px-1 sm:px-6 lg:max-w-7xl lg:px-5">
                <div className="flex flex-col sm:flex-row">
                  {process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY && (
                    <LoadScriptNext
                      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}
                    >
                      <GoogleMap
                        data-testid="map"
                        mapContainerStyle={mapStyle}
                        center={mapCenter}
                        options={mapOptions}
                        zoom={15}
                        onClick={onMapClick}
                      >
                        {address && (<Marker position={address} />)}
                      </GoogleMap>
                    </LoadScriptNext>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row">
                  <p className="w-36 p-2">Endereço: </p>
                  <h4 className="p-1 flex-col m-1 bg-gray-700 text-gray-100 hover:bg-gray-500 hover:text-white">
                    {address && <>{address.lat()} || {address.lng()}</>}
                  </h4>
                </div>
                <div className="mr-5 mb-5 flex flex-col sm:flex-row">
                  <button onClick={() => sendComic()} className="p-3 flex-col m-1 bg-blue-700 text-white hover:bg-blue-500 hover:text-white">
                    ENVIAR QUADRINHO
                  </button>
                </div>
              </div>
            </div>
          </div>
        </> : <>
          <div className="bg-white flex flex-col justify-between w-6/12 h-max ">
            <div className="mt-16 max-w-2xl px-1 sm:px-6 lg:max-w-7xl lg:px-5 ">
              <div className="mb-16 flex-row sm:flex-row ">
                <p className="text-xl">Pedido enviado com sucesso</p>
                <div className="mt-10 flex-row">
                  Quadrinho
                  <h2 className="mt-1 text-l font-bold text-gray-900 sm:text-l sm:tracking-tight lg:text-l">
                    {comic.title}
                  </h2>
                </div>
                <div className="mt-10 flex-row">
                  Endereço
                  <h2 className="mt-1 text-l font-bold text-gray-900 sm:text-l sm:tracking-tight lg:text-l">
                    {address && <>{address.lat()} || {address.lng()}</>}
                  </h2>

                </div>
                <div className="mt-10 flex-row">
                  <button ref={button} onClick={onClick} className="p-3 flex-col m-1 bg-blue-700 text-white hover:bg-blue-500 hover:text-white">
                    FECHAR
                  </button>

                </div>

              </div>
            </div>
          </div>

        </>}
      </div>
    </div >
  );
}