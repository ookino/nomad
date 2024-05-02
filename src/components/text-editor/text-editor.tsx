import { useMemo } from "react";
import dynamic from "next/dynamic";

import "react-quill/dist/quill.snow.css";

interface Props {
  onChange: (value: string) => void;
  value: string;
}

const TextEditor: React.FC<Props> = ({ onChange, value }) => {
  const QuillEditor = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link"],
          ["clean"],
        ],
        handlers: {},
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "color",
    "clean",
  ];

  return (
    <div className="pb-16">
      <QuillEditor
        theme="snow"
        className="h-[300px]"
        value={value}
        formats={formats}
        modules={modules}
        onChange={(value) => onChange(value)}
      />
    </div>
  );
};

export default TextEditor;
