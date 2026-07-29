import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Make Markdown render nicely
# Find: <Markdown remarkPlugins={[remarkGfm]}>{selectedItem.body || "*No description provided.*"}</Markdown>
# Replace with rich Markdown

search_md_body = '<Markdown remarkPlugins={[remarkGfm]}>{selectedItem.body || "*No description provided.*"}</Markdown>'
replace_md_body = """<Markdown 
                            remarkPlugins={[remarkGfm]} 
                            components={{
                              a: ({node, ...props}) => <a {...props} className="text-blue-500 hover:underline" target="_blank" rel="noreferrer" />,
                              table: ({node, ...props}) => <div className="overflow-x-auto my-4"><table {...props} className="min-w-full divide-y divide-app-border border border-app-border rounded-lg" /></div>,
                              th: ({node, ...props}) => <th {...props} className="px-4 py-2 bg-app-sidebar text-left text-xs font-semibold text-app-muted uppercase tracking-wider" />,
                              td: ({node, ...props}) => <td {...props} className="px-4 py-2 whitespace-nowrap text-sm text-app-text border-t border-app-border" />,
                              code: ({node, className, children, ...props}) => {
                                const match = /language-(\\w+)/.exec(className || '');
                                return match ? (
                                  <pre className="bg-app-sidebar border border-app-border rounded-md p-3 overflow-x-auto my-4 text-sm"><code className={className} {...props}>{children}</code></pre>
                                ) : (
                                  <code className="bg-app-sidebar border border-app-border rounded px-1.5 py-0.5 text-sm text-blue-400" {...props}>{children}</code>
                                )
                              }
                            }}
                          >
                            {selectedItem.body || "*No description provided.*"}
                          </Markdown>"""

content = content.replace(search_md_body, replace_md_body)

search_md_comment = '<Markdown remarkPlugins={[remarkGfm]}>{comment.body}</Markdown>'
replace_md_comment = """<Markdown 
                              remarkPlugins={[remarkGfm]} 
                              components={{
                                a: ({node, ...props}) => <a {...props} className="text-blue-500 hover:underline" target="_blank" rel="noreferrer" />,
                                table: ({node, ...props}) => <div className="overflow-x-auto my-4"><table {...props} className="min-w-full divide-y divide-app-border border border-app-border rounded-lg" /></div>,
                                th: ({node, ...props}) => <th {...props} className="px-4 py-2 bg-app-sidebar text-left text-xs font-semibold text-app-muted uppercase tracking-wider" />,
                                td: ({node, ...props}) => <td {...props} className="px-4 py-2 whitespace-nowrap text-sm text-app-text border-t border-app-border" />,
                                code: ({node, className, children, ...props}) => {
                                  const match = /language-(\\w+)/.exec(className || '');
                                  return match ? (
                                    <pre className="bg-app-sidebar border border-app-border rounded-md p-3 overflow-x-auto my-4 text-sm"><code className={className} {...props}>{children}</code></pre>
                                  ) : (
                                    <code className="bg-app-sidebar border border-app-border rounded px-1.5 py-0.5 text-sm text-blue-400" {...props}>{children}</code>
                                  )
                                }
                              }}
                            >
                              {comment.body}
                            </Markdown>"""

content = content.replace(search_md_comment, replace_md_comment)

with open('app/page.tsx', 'w') as f:
    f.write(content)
