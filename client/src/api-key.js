export const fetchApiKey = async () => {
    const fetchData = async () => {
        const res = await fetch("/api_key");
        const data = await res.json();
        return data;
    }

    const data = await fetchData();
    return data;
}