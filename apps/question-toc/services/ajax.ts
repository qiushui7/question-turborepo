const HOST = "http://localhost:3001"; // Mock 的 host

export async function get(url: string) {
  const res = await fetch(`${HOST}${url}`, {});
  return res.json();
}

export async function post(url: string, body: any) {
  const res = await fetch(`${HOST}${url}`, {
    method: "post",
    body: JSON.stringify(body),
  });
  return res.json();
}
