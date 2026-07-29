import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# The first one failed, let's write it differently.
state_search = "  const [selectedItem, setSelectedItem] = useState<GitHubIssue | null>(null);"
state_replace = """  const [selectedItem, setSelectedItem] = useState<GitHubIssue | null>(null);
  const [replyText, setReplyText] = useState("");
  const [mentionQuery, setMentionQuery] = useState<string | null>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const uniqueUsers = React.useMemo(() => {
    if (!data) return [];
    const usersMap = new Map();
    const addUsers = (items: GitHubIssue[]) => {
      items.forEach(item => {
        usersMap.set(item.user.login, item.user);
        if (item.comments_list) {
          item.comments_list.forEach((c: any) => usersMap.set(c.user.login, c.user));
        }
      });
    };
    addUsers(data.reviewRequested || []);
    addUsers(data.mentions || []);
    addUsers(data.myPrs || []);
    addUsers(data.involved || []);
    return Array.from(usersMap.values());
  }, [data]);

  const filteredUsers = mentionQuery !== null 
    ? uniqueUsers.filter(u => u.login.toLowerCase().includes(mentionQuery.toLowerCase()))
    : [];

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setReplyText(val);

    const cursor = e.target.selectionStart;
    const textBeforeCursor = val.slice(0, cursor);
    const match = textBeforeCursor.match(/(?:^|\\s)@(\\w*)$/);
    if (match) {
      setMentionQuery(match[1]);
    } else {
      setMentionQuery(null);
    }
  };

  const insertMention = (login: string) => {
    if (!textareaRef.current) return;
    const val = textareaRef.current.value;
    const cursor = textareaRef.current.selectionStart;
    const textBeforeCursor = val.slice(0, cursor);
    const match = textBeforeCursor.match(/(?:^|\\s)@(\\w*)$/);
    
    if (match) {
      const matchIndex = textBeforeCursor.lastIndexOf('@' + match[1]);
      const newText = val.slice(0, matchIndex) + '@' + login + ' ' + val.slice(cursor);
      setReplyText(newText);
      setMentionQuery(null);
      setTimeout(() => {
        if (textareaRef.current) {
          const newCursorPos = matchIndex + login.length + 2;
          textareaRef.current.selectionStart = newCursorPos;
          textareaRef.current.selectionEnd = newCursorPos;
          textareaRef.current.focus();
        }
      }, 0);
    }
  };"""

content = content.replace(state_search, state_replace)

import_search = "import { useEffect, useState } from 'react';"
import_replace = "import React, { useEffect, useState } from 'react';"
content = content.replace(import_search, import_replace)

textarea_search = """                      <textarea 
                        placeholder="Reply..."
                        className="w-full bg-transparent p-3 text-app-text text-sm placeholder:text-app-meta focus:outline-none min-h-[60px] resize-none"
                      ></textarea>"""
textarea_replace = """                      <div className="relative">
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
                      </div>"""
content = content.replace(textarea_search, textarea_replace)

with open('app/page.tsx', 'w') as f:
    f.write(content)
