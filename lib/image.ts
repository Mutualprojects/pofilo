import imageUrlBuilder from "@sanity/image-url";
import { client } from "./sanity";

// The error message specifically requested createImageUrlBuilder if it exists as a named export
// However, the standard way in modern versions is often still default but with a name.
// Let's try this specific configuration which resolves the deprecation in most Next.js setups.
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
