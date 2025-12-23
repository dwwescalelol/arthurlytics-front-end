const API_BASE =
    "https://by9omosqo0.execute-api.eu-west-2.amazonaws.com/prod/";

export async function getGame(site: string, id: string) {
    const url = new URL("gamehistory", API_BASE);
    url.searchParams.set("site", site);
    url.searchParams.set("id", id);

    const res = await fetch(url, { next: { revalidate: 600 } });
    if (!res.ok) throw new Error("API fetch failed");

    return res.json();
}


export async function getAllGames(sort_key: string, page: string) {
    const url = new URL("allgames", API_BASE);
    url.searchParams.set("page", page);
    if (sort_key) url.searchParams.set("sort", sort_key);

    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error("API fetch failed");

return res.json();
}
