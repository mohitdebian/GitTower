import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Update icons import to include some we might need for the new composer
content = content.replace(
    "import { ArrowLeft } from 'lucide-react';",
    "import { ArrowLeft, Send, AtSign as AtSignIcon, Hash, HelpCircle, CheckSquare, GitCommit } from 'lucide-react';"
)

old_conversation_view = """              <div className="flex gap-6">
                {/* Timeline / Conversation */}
                <div className="flex-1 space-y-6">
                  {/* OP Body */}
                  <div className="bg-app-panel border border-app-border rounded-xl shadow-sm overflow-hidden">
                    <div className="bg-app-sidebar border-b border-app-border px-4 py-3 flex items-center gap-3">
                      <Image src={selectedItem.user.avatar_url} alt={selectedItem.user.login} width={28} height={28} className="rounded-full" />
                      <span className="font-medium text-app-text text-sm">{selectedItem.user.login}</span>
                      <span className="text-app-meta text-xs">commented {formatDistanceToNow(new Date(selectedItem.created_at), { addSuffix: true })}</span>
                    </div>
                    <div className="p-5 prose prose-invert prose-sm max-w-none prose-pre:bg-app-base prose-pre:border prose-pre:border-app-border">
                      <Markdown remarkPlugins={[remarkGfm]}>{selectedItem.body || "*No description provided.*"}</Markdown>
                    </div>
                  </div>
                  
                  {/* Comments */}
                  {selectedItem.comments_list?.map(comment => (
                    <div key={comment.id} className="bg-app-panel border border-app-border rounded-xl shadow-sm overflow-hidden">
                      <div className="bg-app-sidebar border-b border-app-border px-4 py-3 flex items-center gap-3">
                        <Image src={comment.user.avatar_url} alt={comment.user.login} width={28} height={28} className="rounded-full" />
                        <span className="font-medium text-app-text text-sm">{comment.user.login}</span>
                        <span className="text-app-meta text-xs">commented {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</span>
                      </div>
                      <div className="p-5 prose prose-invert prose-sm max-w-none prose-pre:bg-app-base prose-pre:border prose-pre:border-app-border">
                        <Markdown remarkPlugins={[remarkGfm]}>{comment.body}</Markdown>
                      </div>
                    </div>
                  ))}
                  
                  {/* Reply Box */}
                  <div className="bg-app-panel border border-app-border rounded-xl shadow-sm p-4">
                    <textarea 
                      placeholder="Leave a comment..."
                      className="w-full bg-app-base border border-app-border rounded-lg p-3 text-app-text text-sm placeholder:text-app-meta focus:outline-none focus:border-blue-500 min-h-[100px] resize-y"
                    ></textarea>
                    <div className="flex justify-end mt-3">
                      <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Sidebar Context */}
                <div className="w-64 shrink-0 hidden lg:block space-y-6">
                  <div>
                    <h3 className="text-xs font-semibold text-app-muted uppercase tracking-wider mb-3">Reviewers</h3>
                    <div className="text-sm text-app-meta">No reviewers requested</div>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-app-muted uppercase tracking-wider mb-3">Assignees</h3>
                    <div className="text-sm text-app-meta">No one assigned</div>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-app-muted uppercase tracking-wider mb-3">Labels</h3>
                    <div className="text-sm text-app-meta">None yet</div>
                  </div>
                </div>
              </div>"""

new_conversation_view = """              <div className="flex flex-col lg:flex-row gap-6">
                {/* Timeline / Conversation */}
                <div className="flex-1 relative min-w-0 pb-32">
                  {/* Vertical line connecting timeline */}
                  <div className="absolute left-[19px] top-4 bottom-0 w-[2px] bg-app-border z-0"></div>
                  
                  <div className="space-y-8">
                    {/* OP Body */}
                    <div className="relative z-10 flex gap-4">
                      <div className="shrink-0 mt-1">
                        <Image src={selectedItem.user.avatar_url} alt={selectedItem.user.login} width={40} height={40} className="rounded-full ring-4 ring-app-base" />
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-semibold text-app-text">{selectedItem.user.login}</span>
                          <span className="text-app-meta text-sm">{formatDistanceToNow(new Date(selectedItem.created_at), { addSuffix: true })}</span>
                        </div>
                        <div className="prose prose-invert prose-sm max-w-none text-app-muted prose-p:leading-relaxed prose-pre:bg-app-panel prose-pre:border prose-pre:border-app-border prose-pre:mt-4">
                          <Markdown remarkPlugins={[remarkGfm]}>{selectedItem.body || "*No description provided.*"}</Markdown>
                        </div>
                      </div>
                    </div>
                    
                    {/* Comments */}
                    {selectedItem.comments_list?.map(comment => (
                      <div key={comment.id} className="relative z-10 flex gap-4">
                        <div className="shrink-0 mt-1">
                          <Image src={comment.user.avatar_url} alt={comment.user.login} width={40} height={40} className="rounded-full ring-4 ring-app-base" />
                        </div>
                        <div className="flex-1 min-w-0 pt-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-semibold text-app-text">{comment.user.login}</span>
                            <span className="text-app-meta text-sm">{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</span>
                          </div>
                          <div className="prose prose-invert prose-sm max-w-none text-app-muted prose-p:leading-relaxed prose-pre:bg-app-panel prose-pre:border prose-pre:border-app-border prose-pre:mt-4">
                            <Markdown remarkPlugins={[remarkGfm]}>{comment.body}</Markdown>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Floating Reply Box */}
                  <div className="fixed bottom-6 w-full max-w-[calc(1024px-200px)] lg:max-w-[calc(1024px-350px)] z-20">
                    <div className="bg-app-panel border border-app-border rounded-xl shadow-lg p-2">
                      <textarea 
                        placeholder="Reply..."
                        className="w-full bg-transparent p-3 text-app-text text-sm placeholder:text-app-meta focus:outline-none min-h-[60px] resize-none"
                      ></textarea>
                      <div className="flex items-center justify-between mt-2 px-2 pb-1">
                        <div className="flex items-center gap-4 text-app-meta text-xs font-medium">
                          <button className="flex items-center gap-1.5 hover:text-app-text transition-colors"><AtSignIcon className="w-3.5 h-3.5" /> Mention</button>
                          <button className="flex items-center gap-1.5 hover:text-app-text transition-colors"><Hash className="w-3.5 h-3.5" /> Link issue</button>
                          <button className="flex items-center gap-1.5 hover:text-app-text transition-colors"><CheckSquare className="w-3.5 h-3.5" /> Decision</button>
                          <button className="flex items-center gap-1.5 hover:text-app-text transition-colors"><HelpCircle className="w-3.5 h-3.5" /> Question</button>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                          <Send className="w-3.5 h-3.5" /> Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Sidebar Context */}
                <div className="w-full lg:w-64 shrink-0 space-y-6">
                  <div>
                    <h3 className="text-xs font-semibold text-app-muted uppercase tracking-wider mb-3">Reviewers</h3>
                    <div className="text-sm text-app-meta">No reviewers requested</div>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-app-muted uppercase tracking-wider mb-3">Assignees</h3>
                    <div className="text-sm text-app-meta">No one assigned</div>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-app-muted uppercase tracking-wider mb-3">Labels</h3>
                    <div className="text-sm text-app-meta">None yet</div>
                  </div>
                  {selectedItem.related_issue && (
                    <div>
                      <h3 className="text-xs font-semibold text-app-muted uppercase tracking-wider mb-3">Related Issue</h3>
                      <div className="text-sm text-app-text">#{selectedItem.related_issue.number} {selectedItem.related_issue.title}</div>
                    </div>
                  )}
                </div>
              </div>"""

if old_conversation_view in content:
    content = content.replace(old_conversation_view, new_conversation_view)
else:
    print("Could not find old_conversation_view")

with open('app/page.tsx', 'w') as f:
    f.write(content)
