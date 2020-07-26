export default async function (...args) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await fetch(...args);
  return await res.json();
}
