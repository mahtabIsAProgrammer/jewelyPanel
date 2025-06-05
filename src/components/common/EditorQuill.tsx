import { memo, useRef } from "react";

import { Grid } from "@mui/material";
import ReactQuill from "react-quill-new";

// import "easymde/dist/easymde.min.css";
// import "react-quill/dist/quill.snow.css";

import { ErrorMessage } from "../controllers/CustomTextfield";
import { CustomLabel } from "../controllers/CustomLabel";
import { SPACE_SM } from "../../helpers/constants/spaces";

import "react-quill-new/dist/quill.snow.css";

export interface IEditorQuill {
  value?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  errorMessage?: IErrorMessage;
  customLabel?: string;
  required?: boolean;
}

export const EditorQuill = memo<IEditorQuill>(
  ({ value, onChange, readOnly, errorMessage, customLabel, required }) => {
    const quillRef = useRef(null) as TAny;

    const modules = {
      toolbar: {
        container: [
          // [{ header: "1" }, { header: "2" }],
          // [{ size: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          [
            "link",
            // "image", "video"
          ],
          ["clean"],
          [{ direction: "left" }],
        ],
      },
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
    };

    return (
      <Grid
        sx={{
          "& .react-quill": {
            // direction: dir,
            textAlign: "left",
            "& .ql-toolbar": {
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              padding: SPACE_SM,
              backgroundColor: "#F4F6F8",
            },
          },
          "& .ql-container": {
            minHeight: "7rem",
            height: "100%",
            flex: "1",
            display: "flex",
            flexDirection: "column",
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
          },
          "& .ql-editor": {
            height: "100%",
            flex: "1",
            overflow: "auto",
            width: "100%",
          },
          pb: SPACE_SM,
          " .ql-clipboard": {
            position: "unset",
          },
          "& .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg": {
            right: "0",
            left: "unset",
          },
          "& .ql-editor .ql-direction-rtl": {
            textAlign: "left",
          },
        }}
      >
        <CustomLabel
          customLabel={customLabel ?? "Detials"}
          required={required}
        />

        <ReactQuill
          ref={quillRef}
          className="react-quill"
          readOnly={readOnly}
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          onFocus={() => {
            const event = quillRef.current;
            if (event) {
              event.getEditor().format("direction");
              event.getEditor().format("align", "left");
            }
          }}
        />
        {errorMessage && <ErrorMessage {...errorMessage} />}
      </Grid>
    );
  }
);
