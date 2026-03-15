import { useRef, useState } from "react";
import { toast } from "sonner";

const useFetch = (cb) => {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const inFlightRef = useRef(false);

    const fn = async (...args) => {
        if (inFlightRef.current) {
            return null;
        }

        inFlightRef.current = true;
        setLoading(true);
        setError(null);

        try {
            const response = await cb(...args);
            setData(response);
            setError(null);
            return response;
        } catch (error) {
            setError(error);
            toast.error(error.message);
            return null;
        } finally {
            setLoading(false);
            inFlightRef.current = false;
        }
    };

    return { data, loading, error, fn, setData, isLoading: loading };
};

export default useFetch;
