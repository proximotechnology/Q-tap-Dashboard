export const printFormData = (formData) => {
    console.log("FormData Contents:");
    console.log("=======================Form Data=======================");
    for (const [key, value] of formData.entries()) {
        console.log(key, value);
    }
    console.log("=======================Form Data=======================");
}

