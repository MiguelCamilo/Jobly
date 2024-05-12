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
        strong: (props) => <strong {...props} className="text-black" />,
        p: (props) => <p {...props} className="text-muted-foreground" />
      }}
      className="space-y-3"
    >
      {children}
    </ReactMarkdown>
  );
}
