import React, {Dispatch, SetStateAction, useState} from 'react';

import {FilePond, registerPlugin} from 'react-filepond';
import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import useUserStore from "../../store/userStore";
import User from "../../entities/user";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);


interface FileUploaderProps {
    setFileId: Dispatch<SetStateAction<string>>;
    fileTypes: string[];
    allowMultiple: boolean;
    maxFiles: number;
    fileId: string;
    path: string;

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

    const {user} = useUserStore();
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
            server={{
                url: 'http://localhost:4200/api',
                timeout: 10000,
                process: {
                    url: `/${props.path}`,
                    method: 'POST',
                    headers: {
                        'tuitopediatoken': user.tuitoPediaToken || '',
                    },
                    withCredentials: false,
                },
                revert: {
                    url: `/${props.path}`,
                    method: 'DELETE',
                    headers: {
                        'tuitopediatoken': user.tuitoPediaToken || '',
                    },
                    withCredentials: false,
                },

            }}
            onupdatefiles={handleUpdateFiles}
            onprocessfile={handleProcessFile}
            acceptedFileTypes={props.fileTypes}
            labelIdle='Drag & Drop  Image or <span class="filepond--label-action">Browse</span>'
        />
    );
}



export default FileUpload;
