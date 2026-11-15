const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

export const getPremiumStatusById = async (id: string) => {
    const result = await fetch(`${BASE_URL}/users/${id}/premium`)
    return result.json()
}