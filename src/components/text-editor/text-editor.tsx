import { LegacyRef, useCallback, useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import QuillEditor from "react-quill";

import "react-quill/dist/quill.snow.css";

interface Props {
  onChange: (value: string) => void;
  value: string;
}

const TextEditor: React.FC<Props> = ({ onChange, value }) => {
  const quill = useRef<ReactQuill | null | undefined>();

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // When a file is selected
    input.onchange = () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        const reader = new FileReader();
        // Continue with your logic

        // Read the selected file as a data URL
        reader.onload = () => {
          const imageUrl = reader.result;
          const quillEditor = quill?.current?.getEditor();

          // Get the current selection range and insert the image at that index
          const range = quillEditor && quillEditor.getSelection(true);
          quillEditor?.insertEmbed(
            range?.index as number,
            "image",
            imageUrl,
            "user"
          );
        };

        reader.readAsDataURL(file);
      }
    };
  }, []);

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
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [imageHandler]
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
        ref={quill as LegacyRef<ReactQuill>}
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
