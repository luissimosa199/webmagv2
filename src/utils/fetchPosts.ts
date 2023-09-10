export async function fetchPosts () {
    const response = await fetch("/api/post", {
        method: 'GET',
    })

    const data = await response.json()
    return data
}