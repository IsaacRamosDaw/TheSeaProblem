import { createHeaders } from "./createHeaders";

export const GET = async <T>(url: string): Promise<T> => {
  const headers = await createHeaders();

  const response = await fetch(url, {
    method: "GET",
    headers,
  });
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  return response.json();
};

export const POST = async <T>(url: string, body: T): Promise<T | null> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: await createHeaders(),
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const PUT = async <T>(url: string, body: T): Promise<T> => {
  const response = await fetch(url, {
    method: "PUT",
    headers: await createHeaders(),
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  return response.json();
};

export const DELETE = async (url: string): Promise<void> => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: await createHeaders(),
  });
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
};
