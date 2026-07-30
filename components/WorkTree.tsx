"use client";
import './WorkTree.css';

import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight,
  Github,
  GitPullRequest,
  CircleDot,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Clock,
  Eye,
  AtSign,
  MessageCircle,
  ShieldCheck,
  Loader2,
  GitMerge,
  Search,
  FolderTree,
} from 'lucide-react';

type DashboardData = any;
type GitHubIssue = any;

// ─── Status Logic ───────────────────────────────────────────────────
type ItemStatus = 'needs-reply' | 'review-requested' | 'mentioned' | 'waiting' | 'done' | 'my-pr';

function getStatusConfig(status: ItemStatus) {
  switch (status) {
    case 'needs-reply':     return { color: '#ef4444', bg: 'rgba(239,68,68,0.12)',   label: 'Needs Reply' };
    case 'review-requested':return { color: '#a855f7', bg: 'rgba(168,85,247,0.12)',  label: 'Review Requested' };
    case 'mentioned':       return { color: '#eab308', bg: 'rgba(234,179,8,0.12)',   label: 'Mentioned' };
    case 'my-pr':           return { color: '#3b82f6', bg: 'rgba(59,130,246,0.12)',  label: 'My PR' };
    case 'done':            return { color: '#22c55e', bg: 'rgba(34,197,94,0.12)',   label: 'Done' };
    case 'waiting':
    default:                return { color: '#64748b', bg: 'rgba(100,116,139,0.12)', label: 'Waiting' };
  }
}

function deriveStatus(types: string[]): ItemStatus {
  if (types.includes('review'))   return 'review-requested';
  if (types.includes('mention'))  return 'mentioned';
  if (types.includes('assigned')) return 'needs-reply';
  if (types.includes('my-pr'))    return 'my-pr';
  return 'waiting';
}

// ─── CI/CD Status ───────────────────────────────────────────────────
type CIState = 'success' | 'failure' | 'pending' | 'none' | 'loading';

// ─── Tree Node Component ────────────────────────────────────────────
interface TreeNodeProps {
  icon: React.ReactNode;
  label: string;
  count?: number;
  depth: number;
  statusDot?: ItemStatus;
  ciState?: CIState;
  isExpandable?: boolean;
  defaultExpanded?: boolean;
  onClick?: () => void;
  onHover?: (hovered: boolean) => void;
  hoverPreview?: string;
  isSelected?: boolean;
  children?: React.ReactNode;
  suffix?: React.ReactNode;
}

function TreeNode({ icon, label, count, depth, statusDot, ciState, isExpandable = false, defaultExpanded = false, onClick, onHover, hoverPreview, isSelected, children, suffix }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimer = useRef<ReturnType<typeof setTimeout>>();
  const nodeRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (isExpandable) setExpanded(prev => !prev);
    onClick?.();
  };

  const handleMouseEnter = () => {
    onHover?.(true);
    if (hoverPreview) {
      tooltipTimer.current = setTimeout(() => setShowTooltip(true), 500);
    }
  };

  const handleMouseLeave = () => {
    onHover?.(false);
    clearTimeout(tooltipTimer.current);
    setShowTooltip(false);
  };

  const statusConfig = statusDot ? getStatusConfig(statusDot) : null;

  return (
    <div className="work-tree-node">
      {/* Node Row */}
      <div
        ref={nodeRef}
        className={`work-tree-row group ${isSelected ? 'work-tree-row-selected' : ''}`}
        style={{ paddingLeft: `${depth * 20 + 8}px` }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="treeitem"
        aria-expanded={isExpandable ? expanded : undefined}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); }
          if (e.key === 'ArrowRight' && isExpandable && !expanded) { e.preventDefault(); setExpanded(true); }
          if (e.key === 'ArrowLeft' && isExpandable && expanded) { e.preventDefault(); setExpanded(false); }
        }}
      >
        {/* Expand chevron */}
        <div className="work-tree-chevron" style={{ opacity: isExpandable ? 1 : 0, pointerEvents: isExpandable ? 'auto' : 'none' }}>
          <motion.div animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.15, ease: 'easeOut' }}>
            <ChevronRight className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Icon */}
        <div className="work-tree-icon">{icon}</div>

        {/* Label */}
        <span className="work-tree-label">{label}</span>

        {/* Status dot */}
        {statusConfig && (
          <div className="work-tree-status-dot" title={statusConfig.label}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: statusConfig.color, boxShadow: `0 0 6px ${statusConfig.color}60` }} />
          </div>
        )}

        {/* CI badge */}
        {ciState && ciState !== 'none' && ciState !== 'loading' && (
          <div className={`work-tree-ci-badge work-tree-ci-${ciState}`}>
            {ciState === 'success' && <CheckCircle2 className="w-3 h-3" />}
            {ciState === 'failure' && <AlertCircle className="w-3 h-3" />}
            {ciState === 'pending' && <Clock className="w-3 h-3" />}
          </div>
        )}
        {ciState === 'loading' && (
          <Loader2 className="w-3 h-3 animate-spin text-app-meta ml-1" />
        )}

        {/* Count badge */}
        {count !== undefined && count > 0 && (
          <span className="work-tree-count">{count}</span>
        )}

        {/* Suffix (custom actions) */}
        {suffix && <div className="work-tree-suffix opacity-0 group-hover:opacity-100 transition-opacity">{suffix}</div>}

        {/* Hover tooltip */}
        <AnimatePresence>
          {showTooltip && hoverPreview && (
            <motion.div
              className="work-tree-tooltip"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
            >
              {hoverPreview}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Children */}
      <AnimatePresence initial={false}>
        {expanded && children && (
          <motion.div
            className="work-tree-children"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            {/* Tree guide line */}
            <div className="work-tree-guide" style={{ left: `${depth * 20 + 16}px` }} />
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────
export default function WorkTree({ data, mutedRepos, onNodeClick, extractRepoName, user }: {
  data: DashboardData;
  mutedRepos: Record<string, boolean>;
  onNodeClick: (item: GitHubIssue) => void;
  extractRepoName: (url: string) => string;
  user?: { login: string } | null;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [ciStatuses, setCiStatuses] = useState<Record<string, CIState>>({});

  // ── Build tree data ────────────────────────────────────────────
  const treeData = useMemo(() => {
    if (!data) return [];

    const allItems = [
      ...data.reviewRequested.map((i: any) => ({ ...i, _type: 'review' })),
      ...data.mentions.map((i: any) => ({ ...i, _type: 'mention' })),
      ...data.myPrs.map((i: any) => ({ ...i, _type: 'my-pr' })),
      ...data.involved.map((i: any) => ({ ...i, _type: 'involved' })),
      ...data.assigned.map((i: any) => ({ ...i, _type: 'assigned' })),
    ];

    const repos = new Map<string, Map<number, any>>();

    allItems.forEach(item => {
      const repo = extractRepoName(item.repository_url);
      if (!repo || mutedRepos[repo]) return;
      if (!repos.has(repo)) repos.set(repo, new Map());
      const repoMap = repos.get(repo)!;
      if (!repoMap.has(item.id)) {
        repoMap.set(item.id, { ...item, _types: [item._type] });
      } else {
        repoMap.get(item.id)._types.push(item._type);
      }
    });

    return Array.from(repos.entries()).map(([repoName, itemsMap]) => {
      const items = Array.from(itemsMap.values());
      const prs = items.filter(i => !!i.pull_request);
      const issues = items.filter(i => !i.pull_request);

      const ownerAvatarUrl = items[0]?.repository_url
        ? `https://github.com/${items[0].repository_url.replace('https://api.github.com/repos/', '').split('/')[0]}.png?size=32`
        : '';

      return {
        repoName,
        ownerAvatar: ownerAvatarUrl,
        totalCount: items.length,
        prs,
        issues,
      };
    }).sort((a, b) => b.totalCount - a.totalCount);
  }, [data, mutedRepos, extractRepoName]);

  // ── Fetch CI/CD for PRs ────────────────────────────────────────
  useEffect(() => {
    if (!data) return;
    const allItems = [...data.reviewRequested, ...data.mentions, ...data.myPrs, ...data.involved, ...data.assigned];
    const seen = new Set<string>();
    const prItems: { repo: string; number: number; key: string }[] = [];

    allItems.forEach(item => {
      if (!item.pull_request) return;
      const repo = extractRepoName(item.repository_url);
      if (!repo || mutedRepos[repo]) return;
      const key = `${repo}-${item.number}`;
      if (seen.has(key)) return;
      seen.add(key);
      prItems.push({ repo, number: item.number, key });
    });

    const init: Record<string, CIState> = {};
    prItems.forEach(pr => { init[pr.key] = 'loading'; });
    setCiStatuses(init);

    prItems.forEach(pr => {
      fetch(`/api/github/checks?repo=${pr.repo}&pullNumber=${pr.number}`)
        .then(res => res.ok ? res.json() : null)
        .then(checks => {
          setCiStatuses(prev => ({ ...prev, [pr.key]: checks?.state || 'none' }));
        })
        .catch(() => {
          setCiStatuses(prev => ({ ...prev, [pr.key]: 'none' }));
        });
    });
  }, [data, mutedRepos, extractRepoName]);

  // ── Search filter ──────────────────────────────────────────────
  const filteredTree = useMemo(() => {
    if (!searchQuery.trim()) return treeData;
    const q = searchQuery.toLowerCase();
    return treeData.map(repo => ({
      ...repo,
      prs: repo.prs.filter((pr: any) => pr.title.toLowerCase().includes(q) || `#${pr.number}`.includes(q)),
      issues: repo.issues.filter((iss: any) => iss.title.toLowerCase().includes(q) || `#${iss.number}`.includes(q)),
    })).filter(repo => repo.prs.length > 0 || repo.issues.length > 0 || repo.repoName.toLowerCase().includes(q));
  }, [treeData, searchQuery]);

  const handleItemClick = useCallback((item: any) => {
    setSelectedId(item.id);
    onNodeClick(item);
  }, [onNodeClick]);

  const totalItems = treeData.reduce((sum, r) => sum + r.totalCount, 0);

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div className="work-tree-container">
      {/* Search bar */}
      <div className="work-tree-search">
        <Search className="w-4 h-4 text-app-meta shrink-0" />
        <input
          type="text"
          placeholder="Filter items…"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="work-tree-search-input"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="text-app-meta hover:text-app-text text-xs">✕</button>
        )}
      </div>

      {/* Tree */}
      <div className="work-tree-scroll" role="tree">
        {!data ? (
          <div className="flex items-center justify-center py-16 text-app-meta gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Loading…</span>
          </div>
        ) : filteredTree.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-app-meta">
            <FolderTree className="w-8 h-8 mb-3 opacity-40" />
            <span className="text-sm">{searchQuery ? 'No items match your filter.' : 'No active work items.'}</span>
          </div>
        ) : (
          <>
            {/* Root: GitHub Provider */}
            <TreeNode
              icon={<Github className="w-4 h-4" />}
              label="GitHub"
              count={totalItems}
              depth={0}
              isExpandable
              defaultExpanded
            >
              {filteredTree.map(repo => (
                <TreeNode
                  key={repo.repoName}
                  icon={<img src={repo.ownerAvatar} alt="" className="w-5 h-5 rounded-full" loading="lazy" />}
                  label={repo.repoName.includes('/') ? repo.repoName.split('/').pop()! : repo.repoName}
                  count={repo.totalCount}
                  depth={1}
                  isExpandable
                  defaultExpanded={filteredTree.length <= 4}
                  hoverPreview={repo.repoName}
                >
                  {/* Pull Requests */}
                  {repo.prs.length > 0 && (
                    <TreeNode
                      icon={<GitPullRequest className="w-4 h-4 text-emerald-400" />}
                      label="Pull Requests"
                      count={repo.prs.length}
                      depth={2}
                      isExpandable
                      defaultExpanded={repo.prs.length <= 5}
                    >
                      {repo.prs.map((pr: any) => {
                        const status = deriveStatus(pr._types);
                        const ciKey = `${repo.repoName}-${pr.number}`;
                        const ci = ciStatuses[ciKey];
                        return (
                          <TreeNode
                            key={pr.id}
                            icon={
                              pr.pull_request?.merged_at ? <GitMerge className="w-4 h-4 text-purple-400" /> :
                              pr.state === 'closed' ? <GitPullRequest className="w-4 h-4 text-red-400" /> :
                              <GitPullRequest className="w-4 h-4 text-emerald-400" />
                            }
                            label={`#${pr.number} ${pr.title}`}
                            depth={3}
                            statusDot={status}
                            ciState={ci}
                            onClick={() => handleItemClick(pr)}
                            isSelected={selectedId === pr.id}
                            hoverPreview={`${pr.title}\n${pr._types.map((t: string) => `• ${t}`).join('\n')}`}
                          />
                        );
                      })}
                    </TreeNode>
                  )}

                  {/* Issues */}
                  {repo.issues.length > 0 && (
                    <TreeNode
                      icon={<CircleDot className="w-4 h-4 text-amber-400" />}
                      label="Issues"
                      count={repo.issues.length}
                      depth={2}
                      isExpandable
                      defaultExpanded={repo.issues.length <= 5}
                    >
                      {repo.issues.map((issue: any) => {
                        const status = deriveStatus(issue._types);
                        return (
                          <TreeNode
                            key={issue.id}
                            icon={
                              issue.state === 'closed' ? <CheckCircle2 className="w-4 h-4 text-purple-400" /> :
                              <CircleDot className="w-4 h-4 text-amber-400" />
                            }
                            label={`#${issue.number} ${issue.title}`}
                            depth={3}
                            statusDot={status}
                            onClick={() => handleItemClick(issue)}
                            isSelected={selectedId === issue.id}
                            hoverPreview={`${issue.title}\n${issue._types.map((t: string) => `• ${t}`).join('\n')}`}
                          />
                        );
                      })}
                    </TreeNode>
                  )}
                </TreeNode>
              ))}
            </TreeNode>
          </>
        )}
      </div>
    </div>
  );
}
