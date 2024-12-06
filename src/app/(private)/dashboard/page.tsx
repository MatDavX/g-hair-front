import { Header } from '@/components/header';
// import { useParams } from 'next/navigation';

export default async function Page({ params, searchParams }) {
  // const date = new Date((await searchParams).date);
  // console.log(date.getDate());
  return (
    <>
      <Header>
        <p></p>
      </Header>
      <div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i as number}
              className="aspect-square rounded-xl bg-muted/50"
            />
          ))}
        </div>
      </div>
    </>
  );
}
