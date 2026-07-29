import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Fix the code/pre logic for react-markdown v10
search_md_body = """                              code: ({node, className, children, ...props}) => {
                                const match = /language-(\\w+)/.exec(className || '');
                                return match ? (
                                  <pre className="bg-app-sidebar border border-app-border rounded-md p-3 overflow-x-auto my-4 text-sm"><code className={className} {...props}>{children}</code></pre>
                                ) : (
                                  <code className="bg-app-sidebar border border-app-border rounded px-1.5 py-0.5 text-sm text-blue-400" {...props}>{children}</code>
                                )
                              }"""

replace_md_body = """                              pre: ({node, ...props}) => <pre {...props} className="bg-app-sidebar border border-app-border rounded-md p-4 overflow-x-auto my-4 text-sm font-mono text-app-text shadow-sm" />,
                              code: ({node, className, children, ...props}) => {
                                // @ts-ignore
                                const isBlock = node?.position?.start?.line !== node?.position?.end?.line;
                                if (isBlock || className) {
                                  return <code className={className} {...props}>{children}</code>;
                                }
                                return <code className="bg-app-sidebar border border-app-border rounded px-1.5 py-0.5 text-sm text-blue-400 font-mono" {...props}>{children}</code>;
                              }"""

content = content.replace(search_md_body, replace_md_body)

with open('app/page.tsx', 'w') as f:
    f.write(content)
