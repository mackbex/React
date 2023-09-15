import {useEffect, useState} from 'react';

export default function useDebounce(value?: string | null, delay: number = 300) {


    const [val, setVal] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setVal(value)
        }, delay)

        return () => clearTimeout(handler)

    }, [value, delay]);

    return val
}
