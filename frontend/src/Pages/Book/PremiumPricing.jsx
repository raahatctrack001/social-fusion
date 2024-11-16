import { useState } from "react";
import PriceCard from "../../Compnents/Books/PriceCard";
import UnderDevelopment from "../../TestComponent/UnderDevelopment";
import PopupWindow from "../PopupWindow";


export default function PricingPlan() {
    const featuresBasic = {
        existingContentAccess: true,
        futureContentAccess: true,
        accessToAllLiveRoom: true,
        oneToOneInteraction: false,
        unlimitedBooks: false,
        hostLiveShow: false,
        customerSupport: false,
    };

    const featuresPro = {
        existingContentAccess: true,
        futureContentAccess: true,
        accessToAllLiveRoom: true,
        oneToOneInteraction: false,
        unlimitedBooks: true,
        hostLiveShow: false,
        customerSupport: true,
    };

    const featuresPremium = {
        existingContentAccess: true,
        futureContentAccess: true,
        accessToAllLiveRoom: true,
        oneToOneInteraction: true,
        unlimitedBooks: true,
        hostLiveShow: true,
        customerSupport: true,
    };
    const [paymentOptions, setPaymentOptions] = useState(false);
    const handlePaymentOptions = ()=>{
        setPaymentOptions(true);
    }
    if(paymentOptions){
        return <PopupWindow heading={"Under development"} information={"Payment method isn't available right now"} setShowPopup={setPaymentOptions} />
    }
    return (
        <div className="gap-4 w-full flex flex-col justify-center min-h-screen items-center">
            <h1 className="text-5xl font-extrabold tracking-tight"> Pricing Plan </h1>
            <div className="flex gap-5">
                <PriceCard
                    planType="Basic"
                    price={500}
                    period="monthly"
                    features={featuresBasic}
                    onClick={handlePaymentOptions}
                    />
                <PriceCard
                    planType="Pro"
                    price={1000}
                    period="monthly"
                    features={featuresPro}
                    onClick={handlePaymentOptions}
                />
                <PriceCard
                    planType="Premium"
                    price={1500}
                    period="monthly"
                    features={featuresPremium}
                    onClick={handlePaymentOptions}
                    />
            </div>
        </div>
    );
}
