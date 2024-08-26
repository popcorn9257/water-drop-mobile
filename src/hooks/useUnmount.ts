import {  useEffect } from "react"
import useLatest from "./useLatest";

const useUnmount = (fn:() => void) =>{
    const fnRef = useLatest(fn);
    fnRef.current = fn;
    useEffect(()=>()=> fnRef.current(),[])    
}

export default useUnmount;