import { NextApiRequest, NextApiResponse } from "next";

interface ErrorResponse {
    error: string;
}

interface AppSheetResponse {
    Rows: unknown[]; // Rows as an array of unknown type
    Properties?: unknown; // Optional Properties of unknown type
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AppSheetResponse | ErrorResponse>
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { tableName } = req.query;
    const { qtyChange, productId, productPrice, phone, customer, address } = req.body;

    // Validate tableName type
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
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                applicationAccessKey: apiKey,
            },
            body: JSON.stringify({
                Action: "Add",
                Properties: {
                    Locale: "en-US",
                    Timezone: "UTC",
                },
                Rows: [
                    {
                        customer: customer,
                        phone_number: phone,
                        address: address,
                        item1: productId,
                        item1_qty: qtyChange,
                        item1_price: productPrice,
                        amount: qtyChange * productPrice,
                    },
                ],
            }),
        });

        if (!response.ok) {
            throw new Error(
                `Error fetching data: ${response.statusText} (Status Code: ${response.status})`
            );
        }

        const data: AppSheetResponse = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({
            error: error instanceof Error ? error.message : "An unknown error occurred",
        });
    }
}
