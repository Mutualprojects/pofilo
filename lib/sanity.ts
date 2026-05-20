import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "6q773bw1",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: true,
}); 
