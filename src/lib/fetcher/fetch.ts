type BufferSource = ArrayBufferView | ArrayBuffer;

type XMLHttpRequestBodyInit =
  | Blob
  | BufferSource
  | FormData
  | URLSearchParams
  | string;

type BodyInit = ReadableStream | XMLHttpRequestBodyInit;

type optionsGetProps = {
  bearer?: string;
  cache?: string[];
};

type optionsPostProps = {
  bearer?: string;
  cache?: string[];
  body?: BodyInit | null | undefined;
};

async function fetcher<T>(url: string, options: optionsGetProps): Promise<T> {
  const { bearer, cache } = options;

  try {
    const response = await fetch(url, {
      method: 'GET',
      next: {
        tags: cache
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearer}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error('Fetcher error:', error);
    throw error;
  }
}

async function poster<T>(url: string, options: optionsPostProps): Promise<T> {
  const { bearer, cache, body } = options;

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: body,
      next: {
        tags: cache
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearer}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error('Fetcher error:', error);
    throw error;
  }
}

export const api = {
  get: fetcher,
  post: poster
};
