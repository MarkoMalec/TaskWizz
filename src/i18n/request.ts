import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
    // Read the "lang" cookie
    const langCookie = cookies().get('lang');
    const locale = langCookie ? langCookie.value : 'en';

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default
    };
});