import {useEffect, useState} from 'react';

export default function useDebounce(value?: string | null, delay: number = 300) {


    const [val, setVal] = useState(value)

    useEffect(() => {
        console.log(Date.now())
        const handler = setTimeout(() => {
            setVal(value)
            console.log(Date.now())
        }, delay)

        return () => clearTimeout(handler)

    }, [value, delay]);

    return val
}
