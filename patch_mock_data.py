import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Let's find the 'feat: Add ultra-fast parser' PR
pr1_search = """            related_issue: {
              number: 4420,
              title: "Parser is too slow on large files",
              html_url: "#"
            }
          },"""

pr1_replace = """            related_issue: {
              number: 4420,
              title: "Parser is too slow on large files",
              html_url: "#"
            },
            body: "This PR introduces a completely rewritten parser for large files, which improves performance by roughly 400% on huge codebases.\\n\\n### Key Changes\\n\\n- Rewrote the tokenization phase to use SIMD instructions\\n- Avoid unnecessary allocations in the AST nodes\\n- Added proper memory arenas for AST storage\\n\\n### Performance Metrics\\n\\n| Benchmark | Before | After | Improvement |\\n| :--- | :--- | :--- | :--- |\\n| `huge_file.rs` | 450ms | 110ms | ~4x |\\n| `standard.rs` | 42ms | 12ms | ~3.5x |\\n\\n### Code Example\\n\\nHere is how the new `Parser::new()` gets called:\\n\\n```rust\\nlet source = fs::read_to_string(\\\"file.rs\\\").unwrap();\\nlet parser = Parser::new(&source);\\nlet ast = parser.parse();\\n```\\n\\nFixes #4420.",
            comments_list: [
              {
                id: 301,
                user: { login: "rust-reviewer", avatar_url: "https://avatars.githubusercontent.com/u/10?v=4" },
                created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
                body: "Wow, these benchmarks are impressive! I'll take a closer look at the SIMD implementation, but overall this looks fantastic.\\n\\nOne quick question: does this affect [memory usage](https://example.com) in any significant way?"
              }
            ]
          },"""

content = content.replace(pr1_search, pr1_replace)

with open('app/page.tsx', 'w') as f:
    f.write(content)
