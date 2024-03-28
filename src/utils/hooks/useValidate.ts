import { useRef, useState } from "react"

//To Test
export const useValidate = () => {
    const refs = useRef<any>({});
    const [get, set] = useState(false)
    //Reused functions
    const rerender = () => set(prev => !prev);
    const isInvalid = (id:string) => refs.current[id] && refs.current[id].message !== null;

    return {
        register: (id:string, validations:any[] = [], initialValue:any = "", options:any = {}) => {
            const {setValue=null, setMessage=null, onChange=null, validateOnChange=true, onBlur=null, validateOnBlur=true} = options;
            refs.current = {
                ...refs.current, [id]: {
                    props: {
                        value: refs.current[id] ? refs.current[id].props.value : initialValue + "",
                        checked: refs.current[id] ? refs.current[id].props.checked : Boolean(initialValue),
                        onChange: (e:any) => {
                            if (validateOnChange) {
                                // console.log(refs);
                                if(refs.current[id].props.ref.current.getAttribute("type") === "checkbox"){
                                    refs.current[id].props.checked = !refs.current[id].props.checked;
                                } else{
                                    refs.current[id].props.value = e.target.value;
                                } 

                                setValue && setValue(e.target.value);
                                refs.current[id].validateField(false)
                                rerender();
                            }
                            onChange && onChange(e)
                        },

                        onBlur: (e:any) => {
                            if (validateOnBlur) {
                                // refs.current[id].props.value = e.target.value;
                                refs.current[id].validateField(false)
                                rerender();
                            }
                            onBlur && onBlur(e)
                        },
                        ref: (element:any) => refs.current[id].props.ref.current = element

                    },

                    validateField: (isRerender = true) => {
                        let isValid = true;
                        for (let i = 0; i < validations.length; i++) {
                            const func = validations[i];
                            // const type = refs.current[id].props.ref.current.getAttribute("type");
                            const value = refs.current[id].props.ref.current.getAttribute("type") === "checkbox" ? refs.current[id].props.checked : refs.current[id].props.value;
                            const res = func(value);
                            if (res !== null) {
                                if (isValid) {
                                    refs.current[id].message = res
                                    setMessage && setMessage(res)
                                }
                                isValid = false;
                            }
                        }
                        if (isValid) {
                            refs.current[id].message = null;
                            setMessage && setMessage(null)
                        }
                        if (isRerender) {
                            rerender();
                        }
                        return isValid;
                    },

                    resetField: () => {
                        refs.current[id].message = null;
                        setMessage && setMessage(null)
                    },

                    focusField: () => {
                        refs.current[id].props.ref.current.scrollIntoView({ block: "nearest" });
                        refs.current[id].props.ref.current.focus();
                    },

                    parsedValue: () => {
                        switch(refs.current[id].props.ref.current?.getAttribute("type")){
                            case "checkbox":
                                return refs.current[id].props.checked;
                            case "date":
                                return new Date(refs.current[id].props.value);
                            case "number":
                                return +refs.current[id].props.value;
                            default:
                                return refs.current[id].props.value;
                        }
                    },

                    message: refs.current[id] ? refs.current[id].message : null
                }
            };
            return refs.current[id].props;
        },

        validate: (ids:any[]|null = null, isRerender = true) => {
            const keys = Object.keys(refs.current);
            const values:any[] = Object.values(refs.current);
            let isValid = true;
            for (let i = 0; i < keys.length; i++) {
                let res = true;
                if (!ids || ids.includes(keys[i])) {
                    res = values[i].validateField(false);
                    if (res === false) {
                        if (isValid) {
                            values[i].focusField();
                        }
                        isValid = false;
                    }
                }
            }
            if (isRerender) {
                rerender();
            }
            return isValid;
        },

        reset: (ids:any[]|null = null) => {
            const keys = Object.keys(refs.current);
            const values:any[] = Object.values(refs.current);
            for (let i = 0; i < values.length; i++) {
                if (!ids || ids.includes(keys[i])) {
                    values[i].resetField();
                }
            }
            rerender();
        },

        messageFunction: (id:string, callback:Function) => {
            if (isInvalid(id)) {
                return callback(refs.current[id].message)
            }
        },

        setError: (id:string, message:string, isRerender = true) => {
            refs.current[id].message = message;
            if (isRerender) {
                rerender();
            }
        },

        setValue: (id:string, value:any, isRerender = true) => {
            refs.current[id].props.value = value;
            if (isRerender) {
                rerender();
            }
        },

        getParsedValue: (id:string) => {
            // console.dir(refs.current[id].props.ref)
            switch(refs.current[id].props.ref.current?.getAttribute("type")){
                case "checkbox":
                    return refs.current[id].props.checked;
                case "date":
                    return new Date(refs.current[id].props.value);
                case "number":
                    return +refs.current[id].props.value;
                default:
                    return refs.current[id].props.value;
            }
        },
        
        getValue: (id:string) => refs.current[id].props.value,

        getRef: (id:string) => refs.current[id],

        isInvalid: isInvalid,

        rerender: rerender,

        refs: refs
    }
}

export const defaultValidations = {
    required: (message = "Required field") => (val:any) => typeof(val) === "string" && val === "" ? message : typeof(val) === "boolean" && val === false ? message : null,

    date: (message = "Invalid date") => (val:any) => isNaN(new Date(val).getTime()) ? message : null,

    dateRange: (from = null, to = null, message = "Invalid date range", innerRanger = true) => (val:any) => {
        if(innerRanger){
            if(from !== null && new Date(val).getTime() < new Date(from).getTime())
                return message;
            if(to !== null && new Date(val).getTime() > new Date(to).getTime())
                return message;
            return null;
        }
        else{
            if(from !== null && new Date(val).getTime() > new Date(from).getTime() && 
            to !== null && new Date(val).getTime() < new Date(to).getTime())
                return message;
            return null;
        }
    },

    min: (minValue:number, message = `Smaller than ${minValue}`) => (val:any) => +val < minValue ? message : null,

    max: (maxValue:number, message = `Bigger than ${maxValue}`) => (val:any) => +val > maxValue ? message : null,

    minLength: (minLengthValue:number, message = `Smaller than ${minLengthValue} characters`) => (val:any) => val.length < minLengthValue ? message : null,

    maxLength: (maxLengthValue:number, message = `Bigger than ${maxLengthValue} characters`) => (val:any) => val.length > maxLengthValue ? message : null,
}