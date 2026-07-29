import os

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Make sure it ends exactly at <div>{comment.body}</div>
idx = content.rfind("<div>{comment.body}</div>")
if idx != -1:
    content = content[:idx + len("<div>{comment.body}</div>")]

rest_of_file = """
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Floating Reply Box */}
                  <div className="fixed bottom-6 w-full max-w-[calc(1024px-200px)] lg:max-w-[calc(1024px-350px)] z-20">
                    <div className="bg-app-panel border border-app-border rounded-xl shadow-lg p-2">
                      <div className="relative">
                        {mentionQuery !== null && filteredUsers.length > 0 && (
                          <div className="absolute bottom-full left-0 mb-2 w-64 bg-app-sidebar border border-app-border rounded-lg shadow-xl overflow-hidden z-50 py-1">
                            {filteredUsers.map(u => (
                              <button
                                key={u.login}
                                onClick={() => insertMention(u.login)}
                                className="w-full text-left px-3 py-2 hover:bg-app-panel flex items-center gap-2 text-sm"
                              >
                                <Image src={u.avatar_url} alt={u.login} width={20} height={20} className="rounded-full" />
                                <span className="font-medium text-app-text">{u.login}</span>
                              </button>
                            ))}
                          </div>
                        )}
                        <textarea 
                          ref={textareaRef}
                          value={replyText}
                          onChange={handleReplyChange}
                          placeholder="Reply..."
                          className="w-full bg-transparent p-3 text-app-text text-sm placeholder:text-app-meta focus:outline-none min-h-[60px] resize-none"
                        ></textarea>
                      </div>
                      <div className="flex items-center justify-between mt-2 px-2 pb-1">
                        <div className="flex items-center gap-4 text-app-meta text-xs font-medium">
                          <button className="flex items-center gap-1.5 hover:text-app-text transition-colors"><AtSignIcon className="w-3.5 h-3.5" /> Mention</button>
                          <button className="flex items-center gap-1.5 hover:text-app-text transition-colors"><Hash className="w-3.5 h-3.5" /> Link issue</button>
                          <button className="flex items-center gap-1.5 hover:text-app-text transition-colors"><CheckSquare className="w-3.5 h-3.5" /> Decision</button>
                          <button className="flex items-center gap-1.5 hover:text-app-text transition-colors"><HelpCircle className="w-3.5 h-3.5" /> Question</button>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg p-2 transition-colors">
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Sidebar Context */}
                <div className="w-64 shrink-0 hidden lg:block">
                  <div className="sticky top-[88px] space-y-6">
                    <div>
                      <h3 className="text-xs font-semibold text-app-meta uppercase tracking-wider mb-3">Reviewers</h3>
                      <div className="flex items-center gap-2">
                        {selectedItem.reviewRequested?.length ? (
                          <div className="flex -space-x-2">
                            {selectedItem.reviewRequested.map((r: any) => (
                              <Image key={r.login} src={r.avatar_url} alt={r.login} width={24} height={24} className="rounded-full ring-2 ring-app-base" title={r.login} />
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm text-app-muted">None requested</span>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xs font-semibold text-app-meta uppercase tracking-wider mb-3">Assignees</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-app-muted">None assigned</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xs font-semibold text-app-meta uppercase tracking-wider mb-3">Labels</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.labels?.map((label: any) => (
                          <span 
                            key={label.name} 
                            className="px-2 py-1 text-xs rounded-md border"
                            style={{ 
                              backgroundColor: `#${label.color}20`,
                              borderColor: `#${label.color}40`,
                              color: `#${label.color}`
                            }}
                          >
                            {label.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-app-meta">
            <Inbox className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-lg">Select an item to view details</p>
          </div>
        )}
      </main>
    </div>
  );
}
"""

with open('app/page.tsx', 'w') as f:
    f.write(content + rest_of_file)
