import { useEffect, useRef, useState } from "react";

export default function useElementSize() {
    const [size, setSize] = useState({ width: 0, height: 0 });
    const elementRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (elementRef.current) {
                const { width, height } =
                    elementRef.current.getBoundingClientRect();
                setSize({ width, height });
            }
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return { size, elementRef };
}
