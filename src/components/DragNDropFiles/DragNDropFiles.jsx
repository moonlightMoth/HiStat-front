import { FileUploader } from "react-drag-drop-files";
import { store } from "../../stores/StatisticStore";
import { useEffect, useState } from "react";

export const DragNDropFiles = ({setFile}) => {
    const fileTypes = ["csv"]

    const [file, setFileData] = useState(undefined);

    useEffect(()=>{
        if (file)
        setFile(false);
    }, [file])

    const handleChange = async (file) => {
        console.log(file)
        setFileData(file);
        const formData = new FormData()
        formData.append('file', file)
       await  store.getDataState(formData)
    };
    return(
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />)
}