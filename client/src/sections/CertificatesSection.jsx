import React from 'react';
import { ArrowUpRight, Award, ExternalLink } from 'lucide-react';

export default function CertificatesSection({ certificates = [] }) {
  if (!certificates.length) return null;

  return (
    <section className="certificates section" id="certificates">
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow">05 — CERTIFICATES</p>
          <h2>Proof of <em>learning.</em></h2>
        </div>
        <span>{certificates.length} CERTIFICATES</span>
      </div>

      <div className="certificate-intro reveal">
        <p className="section-lead">
          Certifications and learning milestones that support the work I build.
        </p>
        <span className="certificate-note">SELECTED CREDENTIALS / CONTINUOUS GROWTH</span>
      </div>

      <div className="certificate-grid">
        {certificates.map((c, i) => {
          const hasCredential = Boolean(c.credentialUrl);

          return (
            <article
              className={`certificate-card reveal ${c.image ? 'has-image' : 'no-image'}`}
              key={c.id || i}
            >
              <div className="certificate-topline">
                <span className="certificate-number">{String(i + 1).padStart(2, '0')}</span>
                <span>{c.date || 'CERTIFICATE'}</span>
              </div>

              <div className="certificate-image-wrap">
                <div className="certificate-image">
                  {c.image ? (
                    <img src={c.image} alt={c.title || 'Certificate'} loading="lazy" />
                  ) : (
                    <div className="certificate-placeholder">
                      <Award size={38} strokeWidth={1.4} />
                      <span>IMAGE PENDING</span>
                    </div>
                  )}
                </div>

                {hasCredential && (
                  <a
                    className="certificate-image-link"
                    href={c.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${c.title || 'certificate'} credential`}
                  >
                    <ExternalLink size={17} />
                  </a>
                )}
              </div>

              <div className="certificate-body">
                <div>
                  <p className="certificate-kicker">LEARNING MILESTONE</p>
                  <h3>{c.title || 'Untitled certificate'}</h3>
                  {c.issuer && <p className="certificate-issuer">{c.issuer}</p>}
                  {c.description && <p className="certificate-description">{c.description}</p>}
                </div>

                {hasCredential ? (
                  <a
                    className="certificate-link"
                    href={c.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>VIEW CREDENTIAL</span>
                    <span className="certificate-link-icon"><ArrowUpRight size={16} /></span>
                  </a>
                ) : (
                  <span className="certificate-link certificate-link-disabled">
                    <span>CREDENTIAL DETAILS</span>
                    <span className="certificate-link-icon"><ArrowUpRight size={16} /></span>
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
