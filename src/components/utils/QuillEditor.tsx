import {useState} from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.core.css";
import {DeltaStatic} from "quill";

import "./faq.css";

interface Props {

    id: string,
    value: any,
    inputRef?: any,
    placeholder?: string,
    isReadonly?: boolean,
    onChange: (params: any) => void
}

const QuillEditor = ({id, value, inputRef, placeholder, onChange, isReadonly}: Props) => {
    const [theme, setTheme] = useState("snow");

    return (<ReactQuill
        id={id}
        ref={inputRef}
        theme={theme}
        onChange={onChange}
        value={value}
        modules={QuillEditor.modules}
        formats={QuillEditor.formats}
        bounds={".app"}
        readOnly={isReadonly}
        placeholder={placeholder ?? ""}
    />)

}

QuillEditor.modules = {
    toolbar: [
        // [{ header: '1' }, { header: '2' }, { font: [] }],
        // [{ size: [] }],
        [{size: ["small", false, "large", "huge"]}], // custom dropdown
        [{header: [1, 2, 3, 4, 5, 6, false]}],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            {list: "ordered"},
            {list: "bullet"},
            {indent: "-1"},
            {indent: "+1"},
        ],
        ["link"],
        ["clean"],
        [{color: []}, {background: []}], // dropdown with defaults from theme
        [{font: []}],
        [{align: []}],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
};


QuillEditor.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
];

QuillEditor.propTypes = {
    placeholder: PropTypes.string,
};
export default QuillEditor;
