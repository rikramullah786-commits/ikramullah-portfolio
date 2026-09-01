import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';

const imageOf = p => {
  const shots = Array.isArray(p.screenshots)
    ? p.screenshots
        .map((s, i) => typeof s === 'string' ? { image: s, order: i + 1 } : s)
        .filter(s => s?.image)
        .sort((a, b) => (Number(a.order) || 999999) - (Number(b.order) || 999999))
    : [];
  return shots[0]?.image || p.coverImage || '';
};

export default function ProjectsSection({ projects = [] }) {
  const onMove = e => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    gsap.to(e.currentTarget, {
      rotateY: x * 1.8,
      rotateX: -y * 1.8,
      y: -3,
      duration: .35,
      transformPerspective: 1200
    });
  };

  const reset = e => gsap.to(e.currentTarget, {
    rotateX: 0,
    rotateY: 0,
    y: 0,
    duration: .65,
    ease: 'power3.out'
  });

  return (
    <section className="projects section" id="projects">
      <div className="section-heading projects-heading reveal">
        <div>
          <p className="eyebrow">03 · PROJECTS</p>
          <h2>Real Problems. <span>Real Solutions.</span> <em>Real Results.</em></h2>
        </div>
        <span>{projects.length} CASE STUDIES</span>
      </div>

      <p className="section-lead projects-lead reveal">
        A collection of projects where I have applied my skills to build efficient,
        scalable, and user-friendly solutions.
      </p>

      <div className="project-list">
        {projects.map((p, i) => {
          const cover = imageOf(p);
          return (
            <Link
              to={`/project/${p.slug || p.id}`}
              className={`project-card ${p.accent || 'mint'} reveal`}
              key={p.id}
              onMouseMove={onMove}
              onMouseLeave={reset}
            >
              <div className="project-meta">
                <span>{p.no || String(i + 1).padStart(2, '0')}</span>
                <span>{p.type || 'FULL STACK PROJECT'}</span>
                <span>{p.year || ''}</span>
              </div>

              <div className="project-main">
                <div className="project-visual">
                  <div className="visual-window">
                    <div className="window-bar"><i/><i/><i/></div>
                    {cover ? (
                      <img src={cover} alt={`${p.title} project preview`} />
                    ) : (
                      <div className="mock-content">
                        <div className="mock-lines"><b/><b/><b/><b/></div>
                        <div className="mock-chart"><span/><span/><span/><span/><span/></div>
                      </div>
                    )}
                  </div>
                  <Sparkles className="visual-spark" size={22} />
                </div>

                <div className="project-info">
                  <p className="status">● {p.status || 'IN PROGRESS'} &nbsp;·&nbsp; {p.year || ''}</p>
                  <h3>{p.title}</h3>
                  <p className="project-description">{p.summary || p.description}</p>
                  <div className="chips">
                    {(p.tech || []).slice(0, 7).map(t => <span key={t}>{t}</span>)}
                  </div>
                </div>
              </div>

              <div className="view-case">
                VIEW FULL CASE STUDY <ArrowUpRight size={15} />
              </div>
              <span className="round-arrow"><ArrowUpRight size={23} /></span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
