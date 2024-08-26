import { useCallback, useState } from "react";
import useMount from "./useMount";

interface IOptions {
    params: Record<string, string>;
    manual: boolean;
}

const useRequest = (service: (params: Record<string, string>) => Promise<unknown>, options: IOptions) =>{
    const[data, setData] = useState<unknown>();
    const[loading, setLoading] = useState<boolean>(false);

    const init = useCallback((curParams: Record<string, string>) => {
        setLoading(true);
        return service(curParams).then( (res) =>{
            setData(res);
            setLoading(false);
        }).catch(()=>{setLoading(false)})
    },[service]);

    useMount(()=>{
        if(!options.manual){
            init(options.params);
        }
    }) 

    const run = (runParams: Record<string, string>) =>{
        init(runParams);
    }


    return { loading, data, run };
}

export default useRequest;