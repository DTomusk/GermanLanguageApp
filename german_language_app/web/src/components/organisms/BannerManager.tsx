import { FC } from "react";
import Banner from "../molecules/Banner";

interface BannerManagerProps {
    successMessage: string;
    errorMessage: string;
    onSuccessClose: () => void;
    onErrorClose: () => void;
}

const BannerManager: FC<BannerManagerProps> = ({ successMessage, errorMessage, onSuccessClose, onErrorClose }) => {
    return (
        <>
            {successMessage && (
                <Banner
                    type="success"
                    message={successMessage}
                    onClose={onSuccessClose}
                />
            )}
            {errorMessage && (
                <Banner
                    type="error"
                    message={errorMessage}
                    onClose={onErrorClose}
                />
            )}
        </>
    )
};

export default BannerManager;
