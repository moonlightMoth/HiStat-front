import { FileUploader } from "react-drag-drop-files";

export const DragNDropFiles = () => {
    const fileTypes = ["csv"]

    const handleChange = (file) => {
        console.log(file)
        setFile(file);
    };
    return(
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />)
}