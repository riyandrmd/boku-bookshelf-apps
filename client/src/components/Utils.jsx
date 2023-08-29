export async function Api(endpoint, method = "GET", body) {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token not found");
    }

    const response = await fetch(`http://localhost:5000/${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
    }

    return method === "GET" ? response.json() : response.text();
}


