import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>

{/* TopNavBar */}
<header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-12 h-[72px] transition-all duration-500 ease-out border-b shadow-sm bg-neutral-50/40 dark:bg-neutral-900/40 backdrop-blur-md border-neutral-200/30">
<div className="flex items-center gap-8">
<Link className="flex items-center" href="/">
<img alt="Botanic Logo" className="h-10 w-auto" src="/images/6179bfbf12b95edc44ecd76b2a17efa7.png"/>
</Link>
<nav className="hidden md:flex items-center gap-6 font-body text-base font-semibold">
<Link className="text-neutral-700 dark:text-neutral-300 hover:text-forest-600 transition-colors" href="/">Home</Link>
<a className="text-neutral-700 dark:text-neutral-300 hover:text-forest-600 transition-colors" href="#">Plants</a>
<Link className="text-forest-800 dark:text-forest-300 font-bold border-b-2 border-forest-800 pb-1" href="/about">About</Link>
<Link className="text-neutral-700 dark:text-neutral-300 hover:text-forest-600 transition-colors" href="/contact">Contact</Link>
</nav>
</div>
<div className="flex items-center gap-3">
<button className="p-2 hover:bg-forest-100/50 dark:hover:bg-forest-900/50 rounded-full transition-all active:scale-95">
<span className="material-symbols-outlined text-forest-800">search</span>
</button>
<button className="relative p-2 hover:bg-forest-100/50 dark:hover:bg-forest-900/50 rounded-full transition-all active:scale-95">
<span className="material-symbols-outlined text-forest-800" data-icon="shopping_basket">shopping_basket</span>
<span className="absolute top-1 right-1 bg-clay-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">2</span>
</button>
<Link href="/login" className="hidden md:block px-5 py-2 rounded-full border-1.5 border-forest-800 text-forest-800 font-semibold hover:bg-forest-800 hover:text-white transition-all text-sm">Login</Link>
</div>
</header>
<main>
{/* Hero Section */}
<section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
<div className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110" style={{ backgroundImage: `url('/images/hero_bg_highres.jpg')` }}></div>
<div className="absolute inset-0 bg-neutral-950/40"></div>
<div className="relative z-10 text-center px-6 max-w-5xl bg-neutral-950/30 backdrop-blur-sm border border-white/10 p-10 md:p-16 rounded-[2rem] shadow-2xl w-full mx-auto">
<span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-white uppercase bg-forest-800/80 backdrop-blur-md rounded-full reveal">Established 2024</span>
<h1 className="text-white text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] reveal" style={{ /* transition-delay: 100ms; */ }}>Nurturing the Bond Between <span className="text-forest-200">People &amp; Nature</span></h1>
<p className="text-neutral-100 text-lg md:text-2xl font-light max-w-2xl mx-auto mb-10 reveal" style={{ /* transition-delay: 200ms; */ }}>Bringing the soul of the forest floor into the heart of modern living spaces with curated rare specimens and expert horticultural care.</p>
<div className="reveal" style={{ /* transition-delay: 300ms; */ }}>
<a className="inline-flex items-center gap-2 px-8 py-4 bg-forest-800 text-white font-bold rounded-lg hover:bg-forest-700 transition-all hover:-translate-y-1 shadow-lg" href="#origin">
                        Our Story
                        <span className="material-symbols-outlined">arrow_downward</span>
</a>
</div>
</div>
</section>
{/* Our Origin */}
<section className="py-24 px-6 md:py-32" id="origin">
<div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
<div className="reveal">
<div className="relative">
<div className="absolute -top-10 -left-10 w-48 h-48 bg-forest-100 organic-shape -z-10 animate-pulse"></div>
<img className="w-full aspect-[4/5] object-cover rounded-3xl shadow-xl" data-alt="A macro close-up of a rare Monstera Albo leaf with stunning white variegation, showcasing intricate natural patterns and textures. The lighting is soft and diffused, highlighting the organic curves and the premium, museum-like quality of the botanical specimen. The style is clean, modern, and high-end, fitting for a luxury plant marketplace." src="/images/3b462fc0dc6a327ceabd184da43dc80e.png"/>
<div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-2xl shadow-lg max-w-xs border border-neutral-100">
<span className="text-forest-800 text-4xl font-display font-extrabold block mb-2">150+</span>
<p className="text-neutral-500 text-sm font-semibold uppercase tracking-wider">Rare Species Rescued &amp; Cataloged</p>
</div>
</div>
</div>
<div className="reveal" style={{ /* transition-delay: 200ms; */ }}>
<span className="text-forest-600 font-bold uppercase tracking-widest text-sm mb-4 block">How Botanic Bloomed</span>
<h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight">From a Shared Greenhouse to a <span className="text-forest-800">Global Sanctuary.</span></h2>
<div className="space-y-6 text-neutral-600 text-lg leading-relaxed">
<p>Botanic began not as a business, but as a midnight collective. We were a small group of rare plant collectors and master botanists meeting in steam-filled city greenhouses, trading cuttings of rare Anthuriums and sharing secrets of soil pH.</p>
<p>We realized that while the world was becoming more digital, the human soul was thirsting for the tactile, living presence of nature. The &quot;big box&quot; nurseries couldn&apos;t provide the specialized knowledge or the ethically sourced specimens that true plant lovers demanded.</p>
<p>In 2024, we took our collective expertise public. Botanic was born to bridge the gap between the wild forests of the world and the urban sanctuaries we call home—ensuring every plant finds a place where it can truly thrive.</p>
</div>
<div className="mt-12 flex flex-wrap gap-8">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-full bg-forest-100 flex items-center justify-center text-forest-800">
<span className="material-symbols-outlined">eco</span>
</div>
<div>
<h4 className="font-bold text-neutral-900">Master Botanists</h4>
<p className="text-sm text-neutral-500">Expert care on call</p>
</div>
</div>
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-full bg-forest-100 flex items-center justify-center text-forest-800">
<span className="material-symbols-outlined">verified_user</span>
</div>
<div>
<h4 className="font-bold text-neutral-900">Ethical Origins</h4>
<p className="text-sm text-neutral-500">Sustainable supply chain</p>
</div>
</div>
</div>
</div>
</div>
</section>
{/* The Botanic Benefit (Bento Grid) */}
<section className="py-24 bg-neutral-100/50">
<div className="max-w-7xl mx-auto px-6">
<div className="text-center mb-16 reveal">
<h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4">The Botanic Benefit</h2>
<p className="text-neutral-500 max-w-xl mx-auto">Why the most discerning plant enthusiasts choose us for their collection.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
{/* Ethical Sourcing */}
<div className="group bg-white p-10 rounded-3xl border border-neutral-200 shadow-sm hover:shadow-hover hover:-translate-y-2 transition-all duration-500 reveal" style={{ /* transition-delay: 100ms; */ }}>
<div className="w-16 h-16 bg-forest-100 rounded-2xl flex items-center justify-center text-forest-600 mb-8 group-hover:bg-forest-600 group-hover:text-white transition-colors">
<span className="material-symbols-outlined text-3xl">handshake</span>
</div>
<h3 className="text-2xl font-bold mb-4 text-neutral-900">Ethical Sourcing</h3>
<p className="text-neutral-500 leading-relaxed mb-6">We partner exclusively with nurseries that practice sustainable propagation, ensuring no wild populations are disturbed for commerce.</p>
<a className="text-forest-700 font-bold flex items-center gap-2 group-hover:gap-4 transition-all" href="#">
                            Our Standards
                            <span className="material-symbols-outlined">arrow_forward</span>
</a>
</div>
{/* Expert Care Support */}
<div className="group bg-white p-10 rounded-3xl border border-neutral-200 shadow-sm hover:shadow-hover hover:-translate-y-2 transition-all duration-500 reveal" style={{ /* transition-delay: 200ms; */ }}>
<div className="w-16 h-16 bg-forest-100 rounded-2xl flex items-center justify-center text-forest-600 mb-8 group-hover:bg-forest-600 group-hover:text-white transition-colors">
<span className="material-symbols-outlined text-3xl">psychology</span>
</div>
<h3 className="text-2xl font-bold mb-4 text-neutral-900">Expert Care Support</h3>
<p className="text-neutral-500 leading-relaxed mb-6">Your plant's journey doesn&apos;t end at delivery. Our botanists provide lifelong care guides and 1-on-1 digital health consultations.</p>
<a className="text-forest-700 font-bold flex items-center gap-2 group-hover:gap-4 transition-all" href="#">
                            Meet the Experts
                            <span className="material-symbols-outlined">arrow_forward</span>
</a>
</div>
{/* Rare Specimen Access */}
<div className="group bg-white p-10 rounded-3xl border border-neutral-200 shadow-sm hover:shadow-hover hover:-translate-y-2 transition-all duration-500 reveal" style={{ /* transition-delay: 300ms; */ }}>
<div className="w-16 h-16 bg-forest-100 rounded-2xl flex items-center justify-center text-forest-600 mb-8 group-hover:bg-forest-600 group-hover:text-white transition-colors">
<span className="material-symbols-outlined text-3xl">diamond</span>
</div>
<h3 className="text-2xl font-bold mb-4 text-neutral-900">Rare Specimen Access</h3>
<p className="text-neutral-500 leading-relaxed mb-6">Gain early access to exclusive drops of rare cultivars, from variegated monsteras to extremely elusive tropical fern species.</p>
<a className="text-forest-700 font-bold flex items-center gap-2 group-hover:gap-4 transition-all" href="#">
                            Join the Waitlist
                            <span className="material-symbols-outlined">arrow_forward</span>
</a>
</div>
</div>
</div>
</section>
{/* Mission & Vision */}
<section className="relative py-32 bg-forest-800 overflow-hidden">
<div className="absolute inset-0 opacity-10">
<div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
<div className="absolute bottom-0 right-0 w-96 h-96 bg-forest-400 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
</div>
<div className="max-w-5xl mx-auto px-6 text-center relative z-10 reveal">
<span className="text-forest-200 font-bold uppercase tracking-widest text-sm mb-6 block">Our Mission &amp; Vision</span>
<h2 className="text-4xl md:text-6xl font-bold text-white mb-10 leading-tight">To be the world&apos;s most trusted <span className="italic font-light">botanical marketplace</span>, cultivating joy through nature.</h2>
<div className="w-24 h-1 bg-gold-500 mx-auto mb-12"></div>
<p className="text-forest-100 text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto">
                    We envision a future where every home is a micro-ecosystem, where the connection between humans and the plant kingdom is celebrated, understood, and preserved for generations to come.
                </p>
<div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
<div>
<div className="text-white text-3xl font-bold font-display mb-1">98%</div>
<div className="text-forest-300 text-xs uppercase tracking-widest">Arrival Success</div>
</div>
<div>
<div className="text-white text-3xl font-bold font-display mb-1">12k+</div>
<div className="text-forest-300 text-xs uppercase tracking-widest">Happy Growers</div>
</div>
<div>
<div className="text-white text-3xl font-bold font-display mb-1">Zero</div>
<div className="text-forest-300 text-xs uppercase tracking-widest">Peat Usage</div>
</div>
<div>
<div className="text-white text-3xl font-bold font-display mb-1">100%</div>
<div className="text-forest-300 text-xs uppercase tracking-widest">Plastic Free</div>
</div>
</div>
</div>
</section>
{/* Our Values */}
<section className="py-24 px-6 md:py-32 bg-white">
<div className="max-w-7xl mx-auto">
<div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 reveal">
<div className="max-w-2xl">
<span className="text-forest-600 font-bold uppercase tracking-widest text-sm mb-4 block">The Roots of Our Brand</span>
<h2 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight">Core values that guide every single leaf we ship.</h2>
</div>
<div className="hidden md:block">
<span className="material-symbols-outlined text-forest-100 text-8xl">potted_plant</span>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
<div className="reveal" style={{ /* transition-delay: 100ms; */ }}>
<h4 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
<span className="w-8 h-8 rounded-full bg-forest-800 text-white flex items-center justify-center text-sm">01</span>
                            Sustainability
                        </h4>
<p className="text-neutral-500 leading-relaxed pl-11">Our packaging is 100% compostable, and we invest 2% of every sale into rainforest reforestation projects. We believe in leaving the world greener than we found it.</p>
</div>
<div className="reveal" style={{ /* transition-delay: 200ms; */ }}>
<h4 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
<span className="w-8 h-8 rounded-full bg-forest-800 text-white flex items-center justify-center text-sm">02</span>
                            Craftsmanship
                        </h4>
<p className="text-neutral-500 leading-relaxed pl-11">Botany is an art. From the hand-mixed soil substrates to the custom-made ceramic pots, every detail is considered for the ultimate plant health and aesthetic.</p>
</div>
<div className="reveal" style={{ /* transition-delay: 300ms; */ }}>
<h4 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-3">
<span className="w-8 h-8 rounded-full bg-forest-800 text-white flex items-center justify-center text-sm">03</span>
                            Community
                        </h4>
<p className="text-neutral-500 leading-relaxed pl-11">Plants bring people together. We host workshops, plant swaps, and digital forums because we know that a collection is better shared with fellow enthusiasts.</p>
</div>
</div>
<div className="mt-24 rounded-3xl overflow-hidden relative h-[400px] reveal">
<img className="w-full h-full object-cover" data-alt="A candid, warm lifestyle photo of a group of diverse plant enthusiasts gathered in a modern, light-filled botanical studio. They are engaged in a repotting workshop, with terracotta pots, premium soil, and lush tropical plants scattered on a large wooden table. The atmosphere is joyful and collaborative, with natural sunlight creating a warm, inviting glow. Professional photography style with shallow depth of field." src="/images/4ddfdb19b402a1394581aff9ffc6ddd4.png"/>
<div className="absolute inset-0 bg-neutral-950/20 flex items-center justify-center">
<button className="w-20 h-20 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-4xl" style={{ /* font-variation-settings: 'FILL' 1; */ }}>play_arrow</span>
</button>
</div>
</div>
</div>
</section>
{/* Newsletter / CTA */}
<section className="py-24 px-6">
<div className="max-w-7xl mx-auto bg-forest-50 rounded-[40px] p-12 md:p-24 text-center reveal">
<h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-6">Ready to start your own sanctuary?</h2>
<p className="text-neutral-600 text-lg mb-10 max-w-2xl mx-auto">Join the Botanic inner circle for early access to rare drops, care tips from our master botanists, and $10 off your first specimen.</p>
<form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
<input className="flex-1 px-6 py-4 rounded-xl border-neutral-200 focus:ring-forest-800 focus:border-forest-800 bg-white" placeholder="Enter your email" type="email"/>
<button className="px-8 py-4 bg-forest-800 text-white font-bold rounded-xl hover:bg-forest-700 transition-all shadow-md" type="submit">Subscribe</button>
</form>
</div>
</section>
</main>
{/* Footer */}
<footer className="bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 w-full rounded-t-3xl">
<div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-8 py-20 max-w-7xl mx-auto">
<div>
<img alt="Botanic Logo" className="h-8 w-auto mb-6 opacity-80" src="/images/79fa4201745250366b6c6cf3aa6f6125.png"/>
<p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed mb-8">Premium indoor plants and rare specimens for the modern home. Cultivating nature, one room at a time.</p>
<div className="flex gap-4">
<a className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-600 hover:bg-forest-800 hover:text-white transition-all" href="#">
<span className="material-symbols-outlined text-lg">public</span>
</a>
<a className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-600 hover:bg-forest-800 hover:text-white transition-all" href="#">
<span className="material-symbols-outlined text-lg">camera</span>
</a>
</div>
</div>
<div>
<h4 className="text-xs font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-300 mb-8">Navigation</h4>
<ul className="space-y-4">
<li><a className="text-neutral-500 dark:text-neutral-400 text-sm hover:translate-x-1 hover:text-forest-600 transition-all flex items-center gap-2" href="#">Shipping Policy</a></li>
<li><a className="text-neutral-500 dark:text-neutral-400 text-sm hover:translate-x-1 hover:text-forest-600 transition-all flex items-center gap-2" href="#">Terms of Service</a></li>
<li><a className="text-neutral-500 dark:text-neutral-400 text-sm hover:translate-x-1 hover:text-forest-600 transition-all flex items-center gap-2" href="#">Privacy Policy</a></li>
</ul>
</div>
<div>
<h4 className="text-xs font-bold uppercase tracking-widest text-neutral-700 dark:text-neutral-300 mb-8">Experience</h4>
<ul className="space-y-4">
<li><a className="text-neutral-500 dark:text-neutral-400 text-sm hover:translate-x-1 hover:text-forest-600 transition-all flex items-center gap-2" href="#">Sustainability</a></li>
<li><a className="text-neutral-500 dark:text-neutral-400 text-sm hover:translate-x-1 hover:text-forest-600 transition-all flex items-center gap-2" href="#">Gift Cards</a></li>
<li><a className="text-neutral-500 dark:text-neutral-400 text-sm hover:translate-x-1 hover:text-forest-600 transition-all flex items-center gap-2" href="#">Wholesale</a></li>
</ul>
</div>
</div>
<div className="border-t border-neutral-200/50 dark:border-neutral-800/50 py-8 px-8 text-center">
<p className="text-neutral-400 dark:text-neutral-600 text-xs">© <span id="current-year"></span> Botanic Premium Plants. All rights reserved.</p>
</div>
</footer>


    </>
  );
}
