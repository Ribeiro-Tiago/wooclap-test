const API_URL = process.env.REACT_APP_API_URL;

export const requestWithFile = async (
  endpoint: string,
  body: FormData,
  method: "post" | "put",
) => {
  const result = await fetch(`${API_URL}/${endpoint}`, { method, body });

  // when body comes back empty
  try {
    return await result.json();
  } catch (err) {
    return result;
  }
};

export const request = async (endpoint: string, method = "get", body?: any) => {
  const result = await fetch(`${API_URL}/${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    ...(body && { body }),
  });

  // when body comes back empty
  try {
    return await result.json();
  } catch (err) {
    return result;
  }
};
