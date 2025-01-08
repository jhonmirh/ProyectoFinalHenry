export const getClientList = async () => {
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${APIURL}/users/clientlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
