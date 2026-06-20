import HomePage from "@/components/HomePage";

export default async function Home() {

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/all-classes`, {
    cache: 'no-store'
  });

  const classes = await res.json();
  return (
    <>
      <HomePage classes={classes} />
    </>
  );
}
