export const BASE_URL = 'https://api.qutap.co/api/'

export const BASE_URL_IMG = `https://api.qutap.co/`
// export const BASE_URL = 'https://highleveltecknology.com/Qtap/api/'
// export const BASE_URL_IMG = `https://highleveltecknology.com/Qtap/public/`
export const formateDate = (timestamp) => {
    const date = new Date(timestamp);
    // Get YYYY-MM-DD
    const formattedDate = date.toISOString().split('T')[0];

    // Get HH:mm (in UTC)
    const time = date.toISOString().split('T')[1].slice(0, 5);

    // Get Day name
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });

    return { formattedDate, time, dayName }
}