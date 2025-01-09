import { NextApiRequest, NextApiResponse } from "next";

interface ErrorResponse {
    error: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any | ErrorResponse> // Adjust the `any` type based on your expected data structure
) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { tableName } = req.query;

    // Validate `tableName` type
    if (typeof tableName !== "string") {
        return res.status(400).json({ error: "Invalid tableName parameter" });
    }

    const apiKey = process.env.APPSHEET_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "Missing AppSheet API key" });
    }

    const appId = "4847193e-4ce7-426f-92df-d5fed06513c0";
    const endPoint = `https://api.appsheet.com/api/v2/apps/${appId}/tables/${tableName}/query`;

    try {
        const response = await fetch(endPoint, {
            method: 'POST', // Explicit method definition
            headers: {
                "Content-Type": "application/json",
                "applicationAccessKey":  apiKey,
            },
            body: JSON.stringify({
                "Action": "Find",
                "Properties": {
                    "Locale": "en-US",
                    "Timezone": "UTC"
                },
                "Rows": []
            })
        });

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText} (Status Code: ${response.status})`);
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error details:", error);  // Log the full error for debugging
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
}
