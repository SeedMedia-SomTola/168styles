import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/config";
export default getRequestConfig(async ({ requestLocale }) => {
    const locale = await requestLocale; // type is inferred as string
    if (!locales.includes(locale as any)) notFound(); // locale is directly used as a string

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default,
    };
});
