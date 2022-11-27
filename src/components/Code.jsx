import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
// import { atomDark } from "react-syntax-highlighter/dist/esm/prism";
import {
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useEffect, useState } from "react";
function Code({ children }) {
  console.log(children.props.children);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [copied]);
  return (
    <div className="prose relative">
      {copied ? (
        <div className="absolute right-0 top-0 cursor-pointer">
          <ClipboardDocumentCheckIcon className="m-2 h-6 w-6 text-blue-500 " />
        </div>
      ) : (
        <CopyToClipboard
          text={children.props.children}
          onCopy={() => setCopied(true)}
        >
          <div className="absolute right-0 top-0 cursor-pointer">
            <ClipboardDocumentIcon className="m-2 h-6 w-6 " />
          </div>
        </CopyToClipboard>
      )}

      <pre>{children}</pre>
    </div>
  );
}

export default Code;
