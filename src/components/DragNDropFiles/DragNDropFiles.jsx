import { FileUploader } from "react-drag-drop-files";
import { store } from "../../stores/StatisticStore";
import { useEffect, useState } from "react";

export const DragNDropFiles = ({setFile}) => {
    const fileTypes = ["csv"]

    const [file, setFileData] = useState(store.file);

    useEffect(()=>{
        if (file)

        setFile(file);
    }, [file])

    const handleChange = async (file) => {
        setFile(file);
        const formData = new FormData()
        formData.append('file', file)
       await  store.getDataState(formData)
    };
    return(
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />)
}