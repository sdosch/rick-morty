export default async function (...args) {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * 2000))
  );
  const res = await fetch(...args);
  return await res.json();
}
