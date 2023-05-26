import React from "react";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";


const ShareForm = (props: {formId: number}) => {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 500);
  };

  return (
    <div className="flex justify-between items-center">
    <label>Shareable Link</label>
    <CopyToClipboard text={`localhost:3000/form/${props.formId}`} onCopy={onCopy}>
        <button className="text-red-500">{copied? "Copied!": "Copy"}</button>
    </CopyToClipboard>
    </div>
);
};

export default ShareForm;
