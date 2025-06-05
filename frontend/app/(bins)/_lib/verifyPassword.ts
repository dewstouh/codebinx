export async function verifyBinPassword(binId: string, password: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/bins/${binId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
    })

    if (res.status === 401) throw new Error("INVALID_PASSWORD")
    if (!res.ok) throw new Error("UNKNOWN_ERROR")

    const data = await res.json()
    return data.bin
  }