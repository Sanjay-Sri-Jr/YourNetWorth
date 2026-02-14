import { useState } from "react";
import { toast } from "sonner";

const useFetch = (cb)=>{
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fn=async (...args)=>{
        setIsLoading(true);
        setError(null);

        try{
            const response = await cb(...args);
            setData(response);
            setError(null);
        }catch(error){
            setError(error);
            toast.error(error.message);
        }finally{
            setIsLoading(false);
        }
    };
    return {data, loading, error, fn, setData, isLoading};
};
export default useFetch;
