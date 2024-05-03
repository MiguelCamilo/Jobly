import ReactMarkdown from "react-markdown";

interface MarkdownProps {
  children: string;
}

export default function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        ul: (props) => <ul {...props} className="list-inside list-disc" />,
        a: (props) => (
          <a
            {...props}
            className="text-blue-500 hover:text-blue-600 hover:underline"
            target="_blank"
          />
        ),
      }}
      className="space-y-3"
    >
      {children}
    </ReactMarkdown>
  );
}