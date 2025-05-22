export const printFormData = (formData) => {
    console.log("=======================FORM DATA ======================");
    for (const [key, value] of formData.entries()) {
        console.log(key, value);
    }
    console.log("=======================================================");
}

export const BusinessTypes = Object.freeze({
    RESTAURANT: "restaurant",
    CAFE: "cafe",
    CLOUD: "cloud",
    FAST_FOOD: "fast",
    TRUCK: "truck",
    BAKERY: "Bakery",
    PASTRY: "Pastry",
    FRUITS: "Fruits",
    RETAIL: "Retail",
});
export const BusinessLang = Object.freeze({
    EN: 'en',
    AR: 'ar'
});