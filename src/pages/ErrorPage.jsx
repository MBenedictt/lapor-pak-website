import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();

    console.log(error);

    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-900">
            <div className="">
                <h1 className="text-[48px] max-md:text-xl text-slate-700 font-bold">{error.status} | {error.statusText || error.message}</h1>
            </div>
        </div>
    );

}

export default ErrorPage;