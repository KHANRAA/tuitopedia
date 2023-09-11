import React, {Dispatch, SetStateAction, useState} from 'react';
import ReactDOM from 'react-dom';

// Import React FilePond
import {FilePond, FilePondProps, registerPlugin} from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import '../Help/help.css';
// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);


interface FileUploaderProps {
    setFileId: Dispatch<SetStateAction<string>>;
    fileTypes: string[];
    allowMultiple: boolean;
    maxFiles: number;
    fileId: string;

}

// Our app
const FileUpload = (props: FileUploaderProps) => {
    const [files, setFiles] = useState([]);
    const handleUpdateFiles = (files: any) => {
        const photos = files.map((file: any) => ({
            source: file.source,
            tag: 'interior',
        }));
        setFiles(photos);
    };
    const handleProcessFile = (error: any, file: any) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log("process complete...");
        console.log(file);
        props.setFileId(file.serverId);
    };

    return (

        <FilePond
            files={files}
            allowMultiple={props.allowMultiple}
            credits={false}
            maxFiles={props.maxFiles}
            name="filepond"
            server={FilePondServer.server}
            onupdatefiles={handleUpdateFiles}
            onprocessfile={handleProcessFile}
            acceptedFileTypes={props.fileTypes}
            labelIdle='Drag & Drop  Image or <span class="filepond--label-action">Browse</span>'
        />
    );
}

export const FilePondServer: FilePondProps = {
    server: {
        url: 'http://localhost:4200/api',
        timeout: 10000,
        process: {
            url: '/upload',
            method: 'POST',
            headers: {
                'tuitopediatoken': localStorage.getItem('tuitoPediaToken') || '',
            },
            withCredentials: false,
        },
        revert: {
            url: '/upload',
            method: 'DELETE',
            headers: {
                'tuitopediatoken': localStorage.getItem('tuitoPediaToken') || '',
            },
            withCredentials: false,
        },

    }
}


export default FileUpload;
