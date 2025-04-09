export const defaultHeaders = new Headers({
  Accept: "application/json",
});

export const GET = async <T>(
  url: string,
  headers = defaultHeaders,
): Promise<T> => {
  const response = await fetch(url, {
    method: "GET",
    headers,
  });
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  return response.json();
};

export const POST = async <T>(
  url: string,
  body: T,
  headers = defaultHeaders,
): Promise<T | null> => {
  try {
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  return response.json();
  } catch (error) {
    console.log(error)
    return null
  }

};

export const PUT = async <T>(
  url: string,
  body: T,
  headers = defaultHeaders,
): Promise<T> => {
  const response = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  return response.json();
};


export const DELETE = async (
  url: string,
  headers = defaultHeaders,
): Promise<void> => {
  const response = await fetch(url, {
    method: "DELETE",
    headers,
  });
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
};
