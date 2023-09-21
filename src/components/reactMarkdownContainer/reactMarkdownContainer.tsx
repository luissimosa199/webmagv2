import React, { FunctionComponent, PropsWithChildren } from 'react'
import ReactMarkdown from 'react-markdown'
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { twilight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface reactMarkdownContainerProps extends PropsWithChildren {

}

const ReactMarkdownContainer: FunctionComponent<reactMarkdownContainerProps> = ({ children }) => {
    return (
        <>
            {typeof children === 'string' ? <ReactMarkdown components={{
                // code: ({ node, ...props }) => props.inline ? <code>{children}</code> : <SyntaxHighlighter style={twilight} >{children}</SyntaxHighlighter>,
                // pre: ({ node, ...props }) => <pre className="not-prose" {...props} />,
            }} className="prose max-w-none prose-slate prose-xl">
                {children}
            </ReactMarkdown> : <p>Error: reactMarkdownContainer component children is not a string </p>}
        </>
    )
}

export default ReactMarkdownContainer