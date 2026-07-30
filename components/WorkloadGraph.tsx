"use client";

import React, { useMemo, useCallback, useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

type DashboardData = any;
type GitHubIssue = any;

// CI/CD status type
type CIStatus = 'success' | 'failure' | 'pending' | 'none' | 'loading';

export default function WorkloadGraph({ data, mutedRepos, onNodeClick, extractRepoName }: { data: DashboardData, mutedRepos: Record<string, boolean>, onNodeClick: (item: GitHubIssue) => void, extractRepoName: (url: string) => string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoverNode, setHoverNode] = useState<any>(null);
  const [ciStatuses, setCiStatuses] = useState<Record<string, CIStatus>>({});
  const [mounted, setMounted] = useState(false);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);
  
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    updateDimensions();
    setTimeout(updateDimensions, 100);
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Animation loop for breathing/pulsing effect
  useEffect(() => {
    const animate = () => {
      timeRef.current = Date.now() / 1000;
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // Configure d3 forces for proper spacing + gentle drift
  useEffect(() => {
    if (!graphRef.current) return;
    const fg = graphRef.current;
    
    // Strong repulsion so nodes spread out
    fg.d3Force('charge')?.strength(-400).distanceMax(500);
    
    // Longer links so connected nodes don't pile up
    fg.d3Force('link')?.distance((link: any) => {
      const srcGroup = link.source?.group ?? 0;
      if (srcGroup === 0) return 200; // ME -> Repo
      if (srcGroup === 1) return 120; // Repo -> Item
      return 80;
    });
    
    // Collision detection based on node radius
    // d3-force is a transitive dep of force-graph, import dynamically
    import('d3-force').then(d3 => {
      fg.d3Force('collision', d3.forceCollide((node: any) => (node.radius || 16) + 14));
      fg.d3ReheatSimulation();
    }).catch(() => {
      // Fallback: just reheat without collision
      fg.d3ReheatSimulation();
    });
    
    // Center force to keep graph from drifting off-screen
    fg.d3Force('center')?.strength(0.05);
    
    fg.d3ReheatSimulation();
    
    // Gentle reheat to keep bubbles alive
    const interval = setInterval(() => {
      if (graphRef.current) {
        graphRef.current.d3ReheatSimulation();
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [graphData]);

  // Fetch CI/CD statuses for all PR nodes
  useEffect(() => {
    if (!data) return;
    
    const allItems = [
      ...data.reviewRequested,
      ...data.mentions,
      ...data.myPrs,
      ...data.involved,
      ...data.assigned
    ];
    
    const seen = new Set<string>();
    const prItems: { repo: string; number: number; nodeId: string }[] = [];
    
    allItems.forEach(item => {
      if (!item.pull_request) return;
      const repo = extractRepoName(item.repository_url);
      if (!repo || mutedRepos[repo]) return;
      const nodeId = `${repo}-${item.number}`;
      if (seen.has(nodeId)) return;
      seen.add(nodeId);
      prItems.push({ repo, number: item.number, nodeId });
    });

    // Set all to loading first
    const initial: Record<string, CIStatus> = {};
    prItems.forEach(pr => { initial[pr.nodeId] = 'loading'; });
    setCiStatuses(initial);

    // Fetch each PR's check status
    prItems.forEach(pr => {
      fetch(`/api/github/checks?repo=${pr.repo}&pullNumber=${pr.number}`)
        .then(res => res.ok ? res.json() : null)
        .then(checks => {
          if (checks) {
            setCiStatuses(prev => ({ ...prev, [pr.nodeId]: checks.state as CIStatus }));
          } else {
            setCiStatuses(prev => ({ ...prev, [pr.nodeId]: 'none' }));
          }
        })
        .catch(() => {
          setCiStatuses(prev => ({ ...prev, [pr.nodeId]: 'none' }));
        });
    });

    // Refresh every 60 seconds
    const refreshInterval = setInterval(() => {
      prItems.forEach(pr => {
        fetch(`/api/github/checks?repo=${pr.repo}&pullNumber=${pr.number}`)
          .then(res => res.ok ? res.json() : null)
          .then(checks => {
            if (checks) {
              setCiStatuses(prev => ({ ...prev, [pr.nodeId]: checks.state as CIStatus }));
            }
          })
          .catch(() => {});
      });
    }, 60000);

    return () => clearInterval(refreshInterval);
  }, [data, mutedRepos, extractRepoName]);

  const graphData = useMemo(() => {
    const nodes: any[] = [];
    const links: any[] = [];
    
    if (!data) return { nodes, links };
    
    // Root node — large blue bubble
    nodes.push({ 
      id: 'ME', 
      label: '⚡ My Workload',
      group: 0, 
      radius: 40,
      color: '#3B82F6',
      glowColor: 'rgba(59, 130, 246, 0.3)',
    });
    
    const allItems = [
      ...data.reviewRequested.map((i: any) => ({...i, _type: 'review'})),
      ...data.mentions.map((i: any) => ({...i, _type: 'mention'})),
      ...data.myPrs.map((i: any) => ({...i, _type: 'my-pr'})),
      ...data.involved.map((i: any) => ({...i, _type: 'involved'})),
      ...data.assigned.map((i: any) => ({...i, _type: 'assigned'}))
    ];
    
    const repos = new Map<string, any[]>();
    
    allItems.forEach(item => {
      const repo = extractRepoName(item.repository_url);
      if (!repo || mutedRepos[repo]) return;
      if (!repos.has(repo)) repos.set(repo, []);
      repos.get(repo)!.push(item);
    });
    
    Array.from(repos.keys()).forEach(repo => {
      const items = repos.get(repo)!;
      const uniqueItems = new Map<number, any>();
      items.forEach(item => {
        if (!uniqueItems.has(item.id)) {
          uniqueItems.set(item.id, { ...item, _types: [item._type] });
        } else {
          uniqueItems.get(item.id)._types.push(item._type);
        }
      });
      
      const count = uniqueItems.size;
      const shortName = repo.includes('/') ? repo.split('/').pop() : repo;

      // Repo bubble — medium indigo
      nodes.push({ 
        id: repo, 
        label: shortName,
        sublabel: `${count} items`,
        group: 1, 
        radius: 28 + Math.min(count * 2, 12),
        color: '#6366f1',
        glowColor: 'rgba(99, 102, 241, 0.25)',
      });
      links.push({ source: 'ME', target: repo });
      
      // Individual items — small bubbles orbiting the repo
      Array.from(uniqueItems.values()).forEach(item => {
        const isPR = !!item.pull_request;
        const itemId = `${repo}-${item.number}`;
        
        nodes.push({
          id: itemId,
          label: `#${item.number}`,
          sublabel: item.title.length > 20 ? item.title.substring(0, 18) + '…' : item.title,
          typeBadge: isPR ? 'PR' : 'ISS',
          roleTag: item._types.join(', '),
          group: isPR ? 2 : 3,
          radius: 18,
          color: isPR ? '#10b981' : '#f59e0b',
          glowColor: isPR ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
          itemData: item,
          isPR,
        });
        links.push({ source: repo, target: itemId });
      });
    });
    
    return { nodes, links };
  }, [data, mutedRepos, extractRepoName]);

  const handleNodeClick = useCallback((node: any) => {
    if (node.itemData) {
      onNodeClick(node.itemData);
    }
  }, [onNodeClick]);

  // CI status color helper
  const getCIColor = (status: CIStatus): string => {
    switch (status) {
      case 'success': return '#22c55e';
      case 'failure': return '#ef4444';
      case 'pending': return '#eab308';
      case 'loading': return '#64748b';
      default: return 'transparent';
    }
  };

  if (!mounted) {
    return (
      <div ref={containerRef} className="w-full h-full min-h-[600px] lg:min-h-[75vh] bg-app-panel rounded-2xl shadow-sm border border-app-border overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center text-app-meta">Loading workload graph...</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full min-h-[600px] lg:min-h-[75vh] bg-app-panel rounded-2xl shadow-sm border border-app-border overflow-hidden relative" suppressHydrationWarning>
      {!data ? (
        <div className="absolute inset-0 flex items-center justify-center text-app-meta">Loading workload data...</div>
      ) : (
        <ForceGraph2D
          ref={graphRef}
          width={dimensions.width}
          height={dimensions.height}
          graphData={graphData}
          nodeLabel={() => ''}
          enableNodeDrag={true}
          linkCanvasObject={(link: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
            const sx = link.source.x, sy = link.source.y;
            const tx = link.target.x, ty = link.target.y;
            if (!isFinite(sx) || !isFinite(sy) || !isFinite(tx) || !isFinite(ty)) return;
            
            // Gradient line from source to target color
            const grad = ctx.createLinearGradient(sx, sy, tx, ty);
            grad.addColorStop(0, (link.source.color || '#6366f1') + '40');
            grad.addColorStop(1, (link.target.color || '#6366f1') + '40');
            
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(tx, ty);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.5 / globalScale;
            ctx.stroke();
          }}
          nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
            if (!isFinite(node.x) || !isFinite(node.y)) return;
            const t = timeRef.current;
            const isHovered = hoverNode?.id === node.id;
            const r = node.radius || 16;
            
            // Breathing pulse
            const breathe = 1 + Math.sin(t * 1.2 + (node.id.length || 0) * 0.7) * 0.04;
            const drawR = r * breathe;
            
            // === Outer glow ===
            if (node.glowColor) {
              const glowR = drawR * (isHovered ? 1.8 : 1.4);
              const glow = ctx.createRadialGradient(node.x, node.y, drawR * 0.5, node.x, node.y, glowR);
              glow.addColorStop(0, node.glowColor);
              glow.addColorStop(1, 'transparent');
              ctx.beginPath();
              ctx.arc(node.x, node.y, glowR, 0, Math.PI * 2);
              ctx.fillStyle = glow;
              ctx.fill();
            }
            
            // === CI/CD status ring for PRs ===
            if (node.isPR && ciStatuses[node.id] && ciStatuses[node.id] !== 'none') {
              const ciColor = getCIColor(ciStatuses[node.id]);
              const ringR = drawR + 4 / globalScale;
              const ringWidth = 3 / globalScale;
              
              // Pulsing ring for failure
              if (ciStatuses[node.id] === 'failure') {
                const pulseAlpha = 0.5 + Math.sin(t * 4) * 0.3;
                ctx.beginPath();
                ctx.arc(node.x, node.y, ringR + 2 / globalScale, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(239, 68, 68, ${pulseAlpha})`;
                ctx.lineWidth = (ringWidth + 2) / globalScale;
                ctx.stroke();
              }
              
              // Spinning arc for pending
              if (ciStatuses[node.id] === 'pending' || ciStatuses[node.id] === 'loading') {
                const arcStart = t * 3;
                ctx.beginPath();
                ctx.arc(node.x, node.y, ringR, arcStart, arcStart + Math.PI * 1.2);
                ctx.strokeStyle = ciColor;
                ctx.lineWidth = ringWidth;
                ctx.stroke();
              } else {
                // Full ring for success/failure
                ctx.beginPath();
                ctx.arc(node.x, node.y, ringR, 0, Math.PI * 2);
                ctx.strokeStyle = ciColor;
                ctx.lineWidth = ringWidth;
                ctx.stroke();
              }
            }
            
            // === Main bubble ===
            ctx.beginPath();
            ctx.arc(node.x, node.y, drawR, 0, Math.PI * 2);
            
            // Radial gradient fill
            const bubbleGrad = ctx.createRadialGradient(
              node.x - drawR * 0.3, node.y - drawR * 0.3, drawR * 0.1,
              node.x, node.y, drawR
            );
            const baseColor = node.color || '#6366f1';
            bubbleGrad.addColorStop(0, lighten(baseColor, 40));
            bubbleGrad.addColorStop(0.7, baseColor);
            bubbleGrad.addColorStop(1, darken(baseColor, 30));
            ctx.fillStyle = bubbleGrad;
            ctx.fill();
            
            // Subtle border
            ctx.strokeStyle = isHovered ? '#f8fafc' : (baseColor + '80');
            ctx.lineWidth = (isHovered ? 2.5 : 1) / globalScale;
            ctx.stroke();
            
            // === Shine highlight ===
            ctx.beginPath();
            ctx.arc(node.x - drawR * 0.25, node.y - drawR * 0.25, drawR * 0.35, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
            ctx.fill();
            
            // === Text labels ===
            const fontSize = Math.max(10, Math.min(14, r * 0.45)) / Math.max(1, globalScale > 1.5 ? 1.3 : 1);
            ctx.font = `600 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Main label
            ctx.fillStyle = '#ffffff';
            const mainLabel = node.label || '';
            
            if (node.sublabel) {
              // Two lines: label on top, sublabel below
              ctx.fillText(mainLabel, node.x, node.y - fontSize * 0.4);
              
              const subFontSize = fontSize * 0.75;
              ctx.font = `400 ${subFontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
              ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
              ctx.fillText(node.sublabel, node.x, node.y + fontSize * 0.55);
            } else {
              ctx.fillText(mainLabel, node.x, node.y);
            }
            
            // Type badge (PR / ISS) as small pill below bubble
            if (node.typeBadge && (isHovered || globalScale > 1.2)) {
              const badgeFontSize = 8 / Math.max(1, globalScale > 1.5 ? 1.3 : 1);
              ctx.font = `700 ${badgeFontSize}px monospace`;
              const badgeText = node.typeBadge;
              const tw = ctx.measureText(badgeText).width;
              const bx = node.x;
              const by = node.y + drawR + 8 / globalScale;
              const bpad = 4 / globalScale;
              
              ctx.beginPath();
              ctx.roundRect(bx - tw / 2 - bpad, by - badgeFontSize / 2 - bpad / 2, tw + bpad * 2, badgeFontSize + bpad, 3 / globalScale);
              ctx.fillStyle = node.isPR ? 'rgba(16, 185, 129, 0.9)' : 'rgba(245, 158, 11, 0.9)';
              ctx.fill();
              
              ctx.fillStyle = '#000';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(badgeText, bx, by);
            }
            
            // Role tag on hover
            if (node.roleTag && isHovered) {
              const tagFontSize = 7 / Math.max(1, globalScale > 1.5 ? 1.3 : 1);
              ctx.font = `500 ${tagFontSize}px monospace`;
              const tagText = node.roleTag;
              const ttw = ctx.measureText(tagText).width;
              const tagY = node.y + drawR + (node.typeBadge ? 18 : 8) / globalScale;
              const tpad = 3 / globalScale;
              
              ctx.beginPath();
              ctx.roundRect(node.x - ttw / 2 - tpad, tagY - tagFontSize / 2 - tpad / 2, ttw + tpad * 2, tagFontSize + tpad, 2 / globalScale);
              ctx.fillStyle = 'rgba(30, 41, 59, 0.95)';
              ctx.fill();
              ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
              ctx.lineWidth = 0.5 / globalScale;
              ctx.stroke();
              
              ctx.fillStyle = '#94a3b8';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(tagText, node.x, tagY);
            }
            
            // CI/CD mini icon for PRs (on hover - shows status text)
            if (node.isPR && isHovered && ciStatuses[node.id] && ciStatuses[node.id] !== 'none' && ciStatuses[node.id] !== 'loading') {
              const ciStatus = ciStatuses[node.id];
              const ciFontSize = 7 / Math.max(1, globalScale > 1.5 ? 1.3 : 1);
              ctx.font = `700 ${ciFontSize}px monospace`;
              const ciText = ciStatus === 'success' ? '✓ CI passing' : ciStatus === 'failure' ? '✗ CI failing' : '⧖ CI pending';
              const ciTW = ctx.measureText(ciText).width;
              const ciY = node.y - drawR - 8 / globalScale;
              const ciPad = 3 / globalScale;
              
              ctx.beginPath();
              ctx.roundRect(node.x - ciTW / 2 - ciPad, ciY - ciFontSize / 2 - ciPad / 2, ciTW + ciPad * 2, ciFontSize + ciPad, 2 / globalScale);
              ctx.fillStyle = ciStatus === 'success' ? 'rgba(34, 197, 94, 0.15)' : ciStatus === 'failure' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(234, 179, 8, 0.15)';
              ctx.fill();
              ctx.strokeStyle = getCIColor(ciStatus) + '60';
              ctx.lineWidth = 0.5 / globalScale;
              ctx.stroke();
              
              ctx.fillStyle = getCIColor(ciStatus);
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(ciText, node.x, ciY);
            }
          }}
          nodePointerAreaPaint={(node: any, color: string, ctx: CanvasRenderingContext2D) => {
            if (!isFinite(node.x) || !isFinite(node.y)) return;
            const r = node.radius || 16;
            ctx.beginPath();
            ctx.arc(node.x, node.y, r * 1.2, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
          }}
          backgroundColor="transparent"
          onNodeClick={handleNodeClick}
          onNodeHover={(node) => {
            setHoverNode(node || null);
            if (containerRef.current) {
              containerRef.current.style.cursor = node ? (node.itemData ? 'pointer' : 'grab') : 'default';
            }
          }}
          d3AlphaDecay={0.008}
          d3VelocityDecay={0.25}
          cooldownTime={Infinity}
          warmupTicks={100}
          linkDirectionalParticles={2}
          linkDirectionalParticleWidth={1.5}
          linkDirectionalParticleSpeed={0.003}
          linkDirectionalParticleColor={(link: any) => (link.target?.color || '#6366f1') + '60'}
        />
      )}
    </div>
  );
}

// Color utility helpers
function lighten(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, (num >> 16) + Math.round(255 * percent / 100));
  const g = Math.min(255, ((num >> 8) & 0x00FF) + Math.round(255 * percent / 100));
  const b = Math.min(255, (num & 0x0000FF) + Math.round(255 * percent / 100));
  return `rgb(${r}, ${g}, ${b})`;
}

function darken(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, (num >> 16) - Math.round(255 * percent / 100));
  const g = Math.max(0, ((num >> 8) & 0x00FF) - Math.round(255 * percent / 100));
  const b = Math.max(0, (num & 0x0000FF) - Math.round(255 * percent / 100));
  return `rgb(${r}, ${g}, ${b})`;
}
