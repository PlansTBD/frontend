// src/app/api/experiences.ts
export async function searchExperiences(query: string) {
  if (!query) return [];

  try {
    const res = await fetch("/api/v1/experiences/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch experiences");
    }

    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error("API Error:", err);
    return [];
  }
}
