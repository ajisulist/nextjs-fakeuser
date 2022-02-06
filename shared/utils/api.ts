type QueryStringObj = {
  [key: string]: string;
};

export async function get<Res>(
  path: string,
  params?: QueryStringObj
): Promise<Res> {
  const queryStr = params ? `?${new URLSearchParams(params).toString()}` : "";
  const baseUrl = process.env.NEXT_PUBLIC_API_HOST as string;
  const apiUrl = baseUrl + path + queryStr;
  const response = await fetch(apiUrl, {
    method: "GET",
  });
  const data: Res = await response.json();
  if (response.ok && data) {
    return data;
  } else {
    return Promise.reject(
      new Error(`API call failed for ${apiUrl}. Code: ${response.status}`)
    );
  }
}
