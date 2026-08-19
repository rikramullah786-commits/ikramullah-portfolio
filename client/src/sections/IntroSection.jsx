import React from 'react';
export default function IntroSection({profile}){return <section className="intro-strip reveal"><div className="section-index">[ 00 ]</div><div><p className="eyebrow">A SMALL INTRODUCTION</p><h2>I turn ideas into <em>working products.</em></h2></div><p className="strip-copy">{profile.about}</p></section>}
