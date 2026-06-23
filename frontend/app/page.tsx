"use client";
import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>

{/* TopNavBar */}
<header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-12 h-[72px] transition-all duration-500 ease-out border-b shadow-sm bg-neutral-50/40 dark:bg-neutral-900/40 backdrop-blur-md border-neutral-200/30">
<div className="flex items-center gap-8">
<Link className="flex items-center" href="/">
<img alt="Botanic Logo" className="h-10 w-auto" src="/images/6179bfbf12b95edc44ecd76b2a17efa7.png"/>
</Link>
<nav className="hidden md:flex items-center gap-6 font-body text-base font-semibold">
<Link className="text-forest-800 dark:text-forest-300 font-bold border-b-2 border-forest-800 pb-1" href="/">Home</Link>
<a className="text-neutral-700 dark:text-neutral-300 hover:text-forest-600 transition-colors" href="#">Plants</a>
<Link className="text-neutral-700 dark:text-neutral-300 hover:text-forest-600 transition-colors" href="/about">About</Link>
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
<section className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center">
<div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/images/about_hero_highres.jpg')` }}></div>
<div className="absolute inset-0 bg-neutral-950/20"></div>
<div className="relative z-10 container mx-auto px-6 flex justify-center text-center">
<div className="bg-neutral-950/25 backdrop-blur-sm border border-white/10 p-10 md:p-16 rounded-[2rem] shadow-2xl max-w-5xl w-full stagger-in">
<h1 className="font-display text-white text-5xl md:text-7xl font-extrabold leading-tight mb-6">
                    Embrace the Beauty <br/>of <span className="text-forest-300">Nature</span>
</h1>
<p className="text-white/90 text-xl max-w-2xl mx-auto mb-10">
                    Curated rare species and wellness-focused greenery designed to transform your living space into a sanctuary.
                </p>
<div className="flex flex-col sm:flex-row gap-4 justify-center">
<button className="bg-forest-800 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-forest-700 transition-all hover:-translate-y-1 shadow-lg">
                        Shop Collection
                    </button>
<button className="bg-white/10 backdrop-blur-md border-2 border-white/50 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-forest-900 transition-all hover:-translate-y-1">
                        Explore Rare Species
                    </button>
</div>
</div>
</div>
</section>
{/* Features Section */}
<section className="py-24 bg-white">
<div className="container mx-auto px-6">
<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
<div className="flex flex-col items-center text-center p-8 rounded-xl bg-forest-50 border border-forest-100 hover:shadow-md transition-shadow">
<div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-forest-700 text-3xl">menu_book</span>
</div>
<h3 className="font-display text-2xl font-bold text-forest-900 mb-3">Expert Care Guides</h3>
<p className="text-neutral-500">Every plant comes with a comprehensive digital guide tailored to your specific environment and species needs.</p>
</div>
<div className="flex flex-col items-center text-center p-8 rounded-xl bg-forest-50 border border-forest-100 hover:shadow-md transition-shadow">
<div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-forest-700 text-3xl">eco</span>
</div>
<h3 className="font-display text-2xl font-bold text-forest-900 mb-3">Ethically Sourced</h3>
<p className="text-neutral-500">We partner with local nurseries and ethical collectors to ensure every specimen is sustainably grown and harvested.</p>
</div>
<div className="flex flex-col items-center text-center p-8 rounded-xl bg-forest-50 border border-forest-100 hover:shadow-md transition-shadow">
<div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-forest-700 text-3xl">local_shipping</span>
</div>
<h3 className="font-display text-2xl font-bold text-forest-900 mb-3">Fast, Secure Shipping</h3>
<p className="text-neutral-500">Specially designed eco-friendly packaging that maintains temperature and prevents damage during transit.</p>
</div>
</div>
</div>
</section>
{/* Planting Tips Section (Asymmetric Grid) */}
<section className="py-24 bg-forest-50">
<div className="container mx-auto px-6">
<div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
<div className="max-w-2xl">
<h2 className="font-display text-4xl md:text-5xl font-bold text-forest-950 mb-4">Plant Care Wisdom</h2>
<p className="text-lg text-neutral-700">Small acts of care lead to long-lasting blooms. Master the essentials of botanical maintenance.</p>
</div>
<button className="text-forest-700 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                        View All Guides <span className="material-symbols-outlined">arrow_forward</span>
</button>
</div>
<div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto">
<div className="md:col-span-8 group relative overflow-hidden rounded-2xl bg-white p-10 border border-neutral-200 shadow-sm hover:shadow-lg transition-all">
<div className="flex flex-col md:flex-row gap-10 items-center">
<div className="flex-1">
<span className="text-forest-600 font-bold tracking-widest text-sm uppercase mb-4 block">Essential #1</span>
<h3 className="font-display text-3xl font-bold mb-4">The Art of Watering</h3>
<p className="text-neutral-600 mb-6 leading-relaxed">Most indoor plants perish from overwatering rather than drought. Use the &quot;Knuckle Test&quot; — if the first inch of soil is dry, it&apos;s time to hydrate.</p>
<ul className="space-y-3">
<li className="flex items-center text-neutral-700">
<img alt="Leaf" className="leaf-bullet w-4" src="/images/bd11276d57eb236bcd82d783f49393cc.png"/>
                                        Always use room temperature water
                                    </li>
<li className="flex items-center text-neutral-700">
<img alt="Leaf" className="leaf-bullet w-4" src="/images/bd11276d57eb236bcd82d783f49393cc.png"/>
                                        Drain excess water from the tray immediately
                                    </li>
</ul>
</div>
<div className="w-full md:w-1/3 aspect-square rounded-xl bg-forest-100 overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="A macro shot of water droplets on a lush green leaf, soft morning light filtering through a window in a high-end modern apartment, botanical aesthetic, shallow depth of field, forest green tones." src="/images/48fed7138f7fda3a5f68b0cec8d3fe03.png"/>
</div>
</div>
</div>
<div className="md:col-span-4 bg-forest-900 text-white p-10 rounded-2xl shadow-xl flex flex-col justify-between">
<div>
<span className="text-forest-400 font-bold tracking-widest text-sm uppercase mb-4 block">Essential #2</span>
<h3 className="font-display text-3xl font-bold mb-4">Sunlight &amp; Shadows</h3>
<p className="text-forest-200 leading-relaxed mb-6">Place your plants near north or east-facing windows for bright, indirect light that mimics their natural canopy habitat.</p>
</div>
<div className="bg-forest-800/50 p-6 rounded-xl border border-forest-700">
<p className="italic text-sm text-forest-300">&quot;Light is the food plants eat. Quality matters more than quantity.&quot;</p>
</div>
</div>
<div className="md:col-span-4 bg-white p-10 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-lg transition-all group">
<div className="mb-6 w-12 h-12 bg-clay-100 rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined text-clay-700">spa</span>
</div>
<h3 className="font-display text-2xl font-bold mb-4 text-forest-900">Soil &amp; Nutrition</h3>
<p className="text-neutral-600 mb-6">Fertilize during the growing season (Spring and Summer) to provide necessary minerals for leaf development.</p>
<a className="inline-flex items-center font-bold text-forest-700 group-hover:translate-x-1 transition-transform" href="#">
                            Soil Guide <span className="material-symbols-outlined ml-1">chevron_right</span>
</a>
</div>
<div className="md:col-span-8 bg-neutral-900 rounded-2xl p-1 relative overflow-hidden group">
<div className="absolute inset-0 opacity-40 bg-cover bg-center" data-alt="A top-down view of a modern wooden potting bench with terracotta pots, a small hand trowel, and fresh nutrient-rich soil. Elegant shadows and warm sunlight create a serene gardening mood." style={{ backgroundImage: `url('/images/7d5001ad18529f7dce7e905656b8846c.png')` }}></div>
<div className="relative z-10 p-10 flex flex-col md:flex-row justify-between items-center gap-8 bg-black/30 backdrop-blur-[2px] h-full">
<div>
<h3 className="font-display text-3xl font-bold text-white mb-2">Ready to Repot?</h3>
<p className="text-white/70">Our premium soil blends are now available for individual purchase.</p>
</div>
<button className="bg-white text-forest-950 px-8 py-3 rounded-lg font-bold hover:bg-forest-100 transition-all shrink-0">
                                Shop Supplies
                            </button>
</div>
</div>
</div>
</div>
</section>
{/* Seasonal Offer Banner */}
<section className="container mx-auto px-6 py-12">
<div className="relative rounded-3xl overflow-hidden bg-forest-800 text-white py-16 px-8 md:px-24">
<div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
<img className="w-full h-full object-cover" data-alt="Close up of vibrant green fern leaves with intricate textures, soft natural lighting, elegant botanical pattern backdrop for a sales banner." src="/images/bbf0d247d6302ba7694068f178786e9e.png"/>
</div>
<div className="relative z-10 max-w-2xl">
<span className="bg-gold-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">Flash Sale</span>
<h2 className="font-display text-4xl md:text-6xl font-extrabold mb-6">Spring Renewal: <span className="text-gold-400">20% Off</span> All Ferns</h2>
<p className="text-xl text-forest-100 mb-10">Refresh your home with our hardiest and most air-purifying plants. Use code <span className="font-bold border-b-2 border-gold-400">FERNFRENZY</span> at checkout.</p>
<button className="bg-white text-forest-800 px-10 py-4 rounded-lg font-bold text-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                        Shop the Sale
                    </button>
</div>
</div>
</section>
{/* Suggested Seasonal Plants */}
<section className="py-24 bg-white overflow-hidden">
<div className="container mx-auto px-6">
<div className="text-center mb-16">
<h2 className="font-display text-4xl font-bold text-forest-950 mb-4">Curated for the Season</h2>
<p className="text-neutral-500 max-w-xl mx-auto">Selected by our botanists for their vigor and beauty during the current climate.</p>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
{/* Plant Card 1 */}
<div className="group">
<div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-neutral-100 shadow-sm transition-all hover:shadow-hover hover:-translate-y-2">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A beautiful Fiddle Leaf Fig plant in a minimal ceramic white pot, bright airy room, contemporary interior design, premium plant photography." src="/images/7d2b45ad2b8048efc3198e38aa9f4363.png"/>
<div className="absolute top-4 right-4 bg-white/90 backdrop-blur shadow-sm rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-forest-800 hover:text-white transition-colors">
<span className="material-symbols-outlined text-[20px]">favorite</span>
</div>
<div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur rounded-xl p-3 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
<button className="w-full bg-forest-800 text-white py-2 rounded-lg text-sm font-bold">Quick Add</button>
</div>
</div>
<h3 className="font-display text-xl font-bold text-forest-900 mb-1">Fiddle Leaf Fig</h3>
<div className="flex justify-between items-center">
<p className="text-neutral-500 text-sm">Ficus Lyrata</p>
<p className="font-bold text-forest-800">$64.00</p>
</div>
</div>
{/* Plant Card 2 */}
<div className="group">
<div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-neutral-100 shadow-sm transition-all hover:shadow-hover hover:-translate-y-2">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A healthy Monstera Deliciosa with large Swiss cheese leaves, standing in a large clay terracotta pot, soft sunlight from a large window, luxury home decor." src="/images/924949c83e80cbaf07fde14afb2513be.png"/>
<div className="absolute top-4 right-4 bg-white/90 backdrop-blur shadow-sm rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-forest-800 hover:text-white transition-colors">
<span className="material-symbols-outlined text-[20px]">favorite</span>
</div>
<div className="absolute top-4 left-4 bg-clay-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">Selling Fast</div>
<div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur rounded-xl p-3 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
<button className="w-full bg-forest-800 text-white py-2 rounded-lg text-sm font-bold">Quick Add</button>
</div>
</div>
<h3 className="font-display text-xl font-bold text-forest-900 mb-1">Monstera Deliciosa</h3>
<div className="flex justify-between items-center">
<p className="text-neutral-500 text-sm">Cheese Plant</p>
<p className="font-bold text-forest-800">$48.00</p>
</div>
</div>
{/* Plant Card 3 */}
<div className="group">
<div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-neutral-100 shadow-sm transition-all hover:shadow-hover hover:-translate-y-2">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A delicate string of pearls succulent hanging from an elegant macrame hanger, white background, detailed texture, minimalist botanical style." src="/images/d6412d089f71c04dc7d96cb3bd566ede.png"/>
<div className="absolute top-4 right-4 bg-white/90 backdrop-blur shadow-sm rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-forest-800 hover:text-white transition-colors">
<span className="material-symbols-outlined text-[20px]">favorite</span>
</div>
<div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur rounded-xl p-3 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
<button className="w-full bg-forest-800 text-white py-2 rounded-lg text-sm font-bold">Quick Add</button>
</div>
</div>
<h3 className="font-display text-xl font-bold text-forest-900 mb-1">String of Pearls</h3>
<div className="flex justify-between items-center">
<p className="text-neutral-500 text-sm">Curio Rowleyanus</p>
<p className="font-bold text-forest-800">$22.00</p>
</div>
</div>
{/* Plant Card 4 */}
<div className="group">
<div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-neutral-100 shadow-sm transition-all hover:shadow-hover hover:-translate-y-2">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A rare White Knight Philodendron with stunning variegated leaves, premium specimen, dark moody background with spotlight, luxury indoor plant." src="/images/1523712596cf59a44d808066b6e4e522.png"/>
<div className="absolute top-4 right-4 bg-white/90 backdrop-blur shadow-sm rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-forest-800 hover:text-white transition-colors">
<span className="material-symbols-outlined text-[20px]">favorite</span>
</div>
<div className="absolute top-4 left-4 bg-gold-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">Collector&apos;s Pick</div>
<div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur rounded-xl p-3 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
<button className="w-full bg-forest-800 text-white py-2 rounded-lg text-sm font-bold">Quick Add</button>
</div>
</div>
<h3 className="font-display text-xl font-bold text-forest-900 mb-1">White Knight Philodendron</h3>
<div className="flex justify-between items-center">
<p className="text-neutral-500 text-sm">Rare Variegated</p>
<p className="font-bold text-forest-800">$125.00</p>
</div>
</div>
</div>
</div>
</section>
{/* Newsletter Section */}
<section className="py-24 bg-forest-100 relative overflow-hidden">
<div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-10 rotate-12">
<img alt="" className="w-64 h-auto" src="/images/bd11276d57eb236bcd82d783f49393cc.png"/>
</div>
<div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 opacity-10 -rotate-45">
<img alt="" className="w-96 h-auto" src="/images/bd11276d57eb236bcd82d783f49393cc.png"/>
</div>
<div className="container mx-auto px-6 relative z-10">
<div className="max-w-3xl mx-auto text-center bg-white p-12 md:p-20 rounded-[2.5rem] shadow-xl border border-forest-200">
<span className="material-symbols-outlined text-5xl text-forest-600 mb-6 block">mail_outline</span>
<h2 className="font-display text-4xl font-bold text-forest-950 mb-4">Join the Green Club</h2>
<p className="text-neutral-500 text-lg mb-10">Be the first to hear about rare restocks, seasonal sales, and expert care tips delivered to your inbox.</p>
<form className="flex flex-col sm:flex-row gap-4">
<input className="flex-1 px-6 py-4 bg-neutral-100 border-none rounded-xl focus:ring-2 focus:ring-forest-500 font-body outline-none" placeholder="Enter your email address" required="" type="email"/>
<button className="bg-forest-800 text-white px-10 py-4 rounded-xl font-bold hover:bg-forest-900 transition-all shadow-md active:scale-95" type="submit">
                            Subscribe
                        </button>
</form>
<p className="mt-6 text-xs text-neutral-400">By subscribing, you agree to our <a className="underline hover:text-forest-600" href="#">Privacy Policy</a>.</p>
</div>
</div>
</section>
</main>
{/* Footer */}
<footer className="w-full py-16 px-6 md:px-24 grid grid-cols-1 md:grid-cols-3 gap-12 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-forest-900 font-body text-xs">
<div className="space-y-6">
<img alt="Botanic Logo" className="h-10 w-auto" src="/images/6179bfbf12b95edc44ecd76b2a17efa7.png"/>
<p className="text-neutral-500 max-w-xs">Connecting urban spaces with the serene energy of the forest floor since 2024.</p>
<div className="flex gap-4">
<a className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-forest-800 hover:text-white transition-all" href="#">
<svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
</a>
<a className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-forest-800 hover:text-white transition-all" href="#">
<svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
</a>
</div>
</div>
<div>
<h4 className="font-display font-bold text-forest-900 mb-6 uppercase tracking-widest text-xs">Marketplace</h4>
<ul className="space-y-4">
<li><a className="text-neutral-500 hover:translate-x-1 hover:text-forest-600 transition-all duration-200 inline-block" href="#">Best Sellers</a></li>
<li><a className="text-neutral-500 hover:translate-x-1 hover:text-forest-600 transition-all duration-200 inline-block" href="#">Rare Specimens</a></li>
<li><a className="text-neutral-500 hover:translate-x-1 hover:text-forest-600 transition-all duration-200 inline-block" href="#">Indoor Trees</a></li>
<li><a className="text-neutral-500 hover:translate-x-1 hover:text-forest-600 transition-all duration-200 inline-block" href="#">Planters &amp; Pots</a></li>
</ul>
</div>
<div>
<h4 className="font-display font-bold text-forest-900 mb-6 uppercase tracking-widest text-xs">Customer Care</h4>
<ul className="space-y-4">
<li><a className="text-neutral-500 hover:translate-x-1 hover:text-forest-600 transition-all duration-200 inline-block" href="#">Plant Care Tips</a></li>
<li><a className="text-neutral-500 hover:translate-x-1 hover:text-forest-600 transition-all duration-200 inline-block" href="#">Shipping Policy</a></li>
<li></li><li><a className="text-neutral-500 hover:translate-x-1 hover:text-forest-600 transition-all duration-200 inline-block" href="#">Sustainability</a></li>
<li><Link className="text-neutral-500 hover:translate-x-1 hover:text-forest-600 transition-all duration-200 inline-block" href="/contact">Contact Support</Link></li>
</ul>
</div>
<div className="md:col-span-3 pt-12 border-t border-neutral-200 dark:border-forest-900 flex flex-col md:flex-row justify-between items-center gap-6">
<p className="text-neutral-400">© 2024 Botanic Premium Plant Marketplace. All rights reserved.</p>
<div className="flex gap-8">
<a className="text-neutral-400 hover:text-forest-600 transition-colors" href="#">Terms of Service</a>
<a className="text-neutral-400 hover:text-forest-600 transition-colors" href="#">Privacy Policy</a>
</div>
</div>
</footer>


    </>
  );
}
