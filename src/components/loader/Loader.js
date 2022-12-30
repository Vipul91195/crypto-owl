import React from "react";
import { Bars } from "react-loader-spinner";

const Loader = () => {
    return (
        // <div className="absolute top-0 left-0 z-50 w-screen h-screen flex justify-center items-center bg-[#00000030]">
        <div className="flex justify-center items-center h-screen">
            <Bars
                height="80"
                width="80"
                color="#DD69AA"
                ariaLabel="bars-loading"
                visible={true}
            />
        </div>
    );
};

export default Loader;
