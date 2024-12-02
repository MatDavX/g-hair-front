const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetcher<T>(url: string, rest?: RequestInit): Promise<T> {
  const option: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...rest,
  };
  const data = await fetch(`${API_URL}${url}`, option);
  return data.json();
}

async function poster<T>(
  url: string,
  body: any,
  token?: string,
  rest?: RequestInit
): Promise<T> {
  const option: RequestInit = {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
    ...rest,
  };
  const data = await fetch(`${API_URL}${url}`, option);

  return data.json();
}

export const api = {
  get: fetcher,
  post: poster,
};
