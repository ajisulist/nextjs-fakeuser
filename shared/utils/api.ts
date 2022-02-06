type QueryStringObj = {
  [key: string]: string;
};

export async function get<Res>(
  path: string,
  queryParams?: QueryStringObj
): Promise<Res> {
  let queryStr = "";
  if (queryParams) {
    queryStr = `?${new URLSearchParams(cleanQueryObj(queryParams)).toString()}`;
  }
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

// HELPERS
const cleanQueryObj = (params: QueryStringObj) => {
  return Object.entries(params).reduce((prev, current) => {
    const [key, val] = current;
    if (val) {
      return {
        ...prev,
        [key]: val,
      };
    }
    return prev;
  }, {});
};
