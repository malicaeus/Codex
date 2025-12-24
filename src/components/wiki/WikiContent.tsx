import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { parseWikiLinks } from '@/lib/content-loader';
import { useNavigate } from 'react-router-dom';

interface WikiContentProps {
  content: string;
}

export function WikiContent({ content }: WikiContentProps) {
  const navigate = useNavigate();
  const processedContent = parseWikiLinks(content);

  return (
    <div className="wiki-prose animate-fade-in">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={{
          a: ({ href, children }) => {
            // Handle internal wiki links
            if (href?.startsWith('/wiki/')) {
              return (
                <button
                  onClick={() => navigate(href)}
                  className="wiki-link"
                >
                  {children}
                </button>
              );
            }
            // External links
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="wiki-link"
              >
                {children}
              </a>
            );
          },
          h1: ({ children, id }) => (
            <h1 id={id} className="scroll-mt-20">
              {children}
            </h1>
          ),
          h2: ({ children, id }) => (
            <h2 id={id} className="scroll-mt-20">
              {children}
            </h2>
          ),
          h3: ({ children, id }) => (
            <h3 id={id} className="scroll-mt-20">
              {children}
            </h3>
          ),
          h4: ({ children, id }) => (
            <h4 id={id} className="scroll-mt-20">
              {children}
            </h4>
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}
