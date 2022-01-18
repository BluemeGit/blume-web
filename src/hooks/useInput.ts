import { useState } from "react";

const useInput = (initialValue: string, validator?: (value: string) => boolean) => {
    const [value, setValue] = useState(initialValue);
    
    const onChange = (event: any) => {
        const value = event.hasOwnProperty('target') ? event.target.value : event;

        if (validator && !validator(value)) return;
        setValue(value);
    }
    return { value, onChange }; 
}

export default useInput;
    