import { UNSPLASH_ACCESS_KEY } from '../env.json';

const images: Array<UnsplashImage> = [];

export interface UnsplashImage {
  id: string;
  width: number;
  height: number;

  urls: {
    small: string;
  };
  user: {
    name: string;
  };
}

async function fetchUnsplash(
  path: string,
  params: Record<string, string | number> = {}
): Promise<UnsplashImage[]> {
  const paramsString = Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&');
  return fetch(encodeURI(`https://api.unsplash.com/${path}?${paramsString}`), {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
    },
  }).then((response) => {
    if (response.ok) return response.json();
    throw new Error(`Fetch failed with code ${response.status}.`);
  });
}

export async function getImages(
  length: number = 50
): Promise<Array<UnsplashImage>> {
  if (images.length === 0)
    await fetchUnsplash('photos/random', { count: 30 }).then((result) =>
      images.push(...result)
    );
  if (images.length >= length) return images.slice(0, length);

  const result = images.slice();
  while (result.length < length) {
    const image = images[Math.floor(Math.random() * images.length)];
    image && result.push(image);
  }

  return result;
}
