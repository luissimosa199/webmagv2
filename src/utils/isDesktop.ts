import { useEffect, useState } from "react"

const useIsDesktop = () => {
    const [width, setWidth] = useState<number>()

    const handleResize = () => setWidth(window.innerWidth)

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (width !== undefined){
        return width > 767
    }
}

export default useIsDesktop;