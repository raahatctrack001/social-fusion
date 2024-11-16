import { Button } from "flowbite-react";
import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { apiEndPoints } from "../../apiEndPoints/api.addresses";
import PageLoader from "../PageLoader";

export default function ContributionGuideline() {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const navigate = useNavigate();

    const params = useParams();
    const { authorId, bookId, contributorId } = params;
    const handleStartContributionClickButton = async ()=>{
        setLoading(true);
        try {
            const response = await fetch(apiEndPoints.startContribution(authorId, bookId, contributorId), {
                method: "POST",
            })
            const data = await response.json();
            
            if(!response.ok){
                throw new Error(data.message || "Network response wasn't ok while starting to contribute")
            }

            if(data.success){
                console.log(data)
                const { details, book } = data.data;
                localStorage.setItem(book?._id, JSON.stringify(book)) //mapping in case multiple contribution by single author
                navigate(`/contribution/${details[0]?._id}/${book?._id}`) //contributionId/bookId
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }
    if(loading){
        return <PageLoader info={"Please wait, we are creating space for your contribution"} />
    }
    return (
        <div className="min-h-screen flex flex-col items-center p-4 dark:bg-gray-700   bg-gray-100">
            <div className="max-w-4xl w-full shadow-md rounded-lg p-6 dark:bg-gray-800   bg-gray-200">
                <h1 className="text-2xl font-bold text-center mb-4">
                    Contribution Guidelines
                </h1>
                <p className=" text-center mb-6">
                    Follow these guidelines to ensure a smooth and valuable contribution process.
                </p>

                <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                        <span className="text-blue-500 font-bold">1.</span>
                        <p>
                            **Understand the purpose**: Familiarize yourself with the document's purpose
                            and scope before contributing. Ensure your input aligns with the goals.
                        </p>
                    </div>
                    <div className="flex items-start space-x-3">
                        <span className="text-blue-500 font-bold">2.</span>
                        <p>
                            **Maintain formatting**: Follow the specified formatting guidelines, 
                            including headers, fonts, and indentation.
                        </p>
                    </div>
                    <div className="flex items-start space-x-3">
                        <span className="text-blue-500 font-bold">3.</span>
                        <p>
                            **Provide clear references**: If your contribution involves external 
                            sources, include proper citations or references.
                        </p>
                    </div>
                    <div className="flex items-start space-x-3">
                        <span className="text-blue-500 font-bold">4.</span>
                        <p>
                            **Collaborate effectively**: Communicate with other contributors, 
                            resolve conflicts professionally, and incorporate feedback.
                        </p>
                    </div>
                    <div className="flex items-start space-x-3">
                        <span className="text-blue-500 font-bold">5.</span>
                        <p>
                            **Proofread your work**: Ensure your contribution is error-free 
                            and consistent with the tone and language of the document.
                        </p>
                    </div>
                    <div className="flex items-start space-x-3">
                        <span className="text-blue-500 font-bold">6.</span>
                        <p>
                            **Do not touch other's work**: Ensure your contribution is not 
                            affecting other's work without their prior permission.
                        </p>
                    </div>
                </div>

                <div className="mt-8 p-4 rounded-lg shadow-sm w-full flex justify-center items-center">
                    <Button
                        onClick={handleStartContributionClickButton} 
                        outline 
                        color={'warning'}
                    > 
                        Start Contributing 
                    </Button>
                </div>
            </div>

            <footer className="mt-6 text-sm">
                Thank you for contributing to our project. Your efforts are highly appreciated!
            </footer>
        </div>
    );
}
