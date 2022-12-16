import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'

export const clientSanity = sanityClient({
    projectId: "gsc1oi15",
    dataset: "production",
    apiVersion: "2022-12-16",
    useCdn: true, 
    token: process.env.NEXT_PUBLIC_SANITY_TOKE,
  });


  const builder = imageUrlBuilder(clientSanity);

  export const urlFor = (source) => builder.image(source);