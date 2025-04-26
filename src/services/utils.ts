export async function dummyFetch(url: string): Promise<unknown> {
    const response = await fetch(url)
    if (!response.ok) throw new Error('Could not fetch data')
    return response.json();
}