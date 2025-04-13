import { useState } from "react";

export const useBanner = () => {
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const showSuccessBanner = (message: string) => setSuccessMessage(message);
    const showErrorBanner = (message: string) => setErrorMessage(message);
    const hideSuccessBanner = () => setSuccessMessage("");
    const hideErrorBanner = () => setErrorMessage("");

    return {
        successMessage,
        errorMessage,
        showSuccessBanner,
        showErrorBanner,
        hideSuccessBanner,
        hideErrorBanner
    };
}