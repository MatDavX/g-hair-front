type Params = any;
type SearchParams = Record<string, string | string[] | undefined>;

export type PageProps = {
  params: Params;
  searchParams: SearchParams;
};
