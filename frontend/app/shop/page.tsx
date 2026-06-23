import React from 'react';
import Link from 'next/link';

export default function ShopPage() {
  return (
    <>

{/* TopNavBar */}
<nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-12 h-[72px] bg-neutral-50/85 dark:bg-neutral-900/85 backdrop-blur-xl border-b border-neutral-200 dark:border-forest-900 shadow-sm">
<div className="flex items-center gap-8">
<a className="flex items-center" href="#">
<img alt="Botanic Logo" className="h-10" src="https://lh3.googleusercontent.com/aida/AP1WRLuar5hHQwPlDQHjE2W0cbGsP6K1Gn5FSB_7oDEyLV0cFaGKm2B0xudufLTkgoOBYJCto6-bkM-xHOHkaz3Q5J7VY89j8XOE9EB98Aw_YWKI_bcMdWNcAZ7iKw2CP5oFxh92VYkm3iTKBEXqngWZ8YMjCOjCEbAQlFu3XV7yeZkSzSBI1O4O07ylc3tqRte-ifZe70pYP3CgV4dfz5KDnh4TjV3CWAO5CA7xbpJ6Qrd4eKTExbzoN9NGvQo"/>
</a>
<div className="hidden lg:flex items-center gap-6">
<Link className="text-neutral-500 hover:text-forest-600 transition-all duration-200 font-body text-base font-semibold" href="/">Home</Link>
<a className="text-forest-800 dark:text-forest-300 font-bold border-b-2 border-forest-800 pb-1 font-body text-base font-semibold" href="#">Plants</a>
<Link className="text-neutral-500 hover:text-forest-600 transition-all duration-200 font-body text-base font-semibold" href="/about">About</Link>
</div>
</div>
<div className="flex-1 max-w-md mx-8 hidden md:block">
<div className="relative group">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">search</span>
<input className="w-full bg-neutral-100 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-forest-800/20 text-sm transition-all" placeholder="Search rare finds..." type="text"/>
</div>
</div>
<div className="flex items-center gap-4">
<button className="p-2 hover:bg-forest-100/50 rounded-full transition-all active:scale-95">
<span className="material-symbols-outlined text-forest-800" data-icon="shopping_basket">shopping_basket</span>
</button>
<Link href="/login" className="hidden sm:block px-6 py-2 border-1.5 border-forest-800 text-forest-800 font-semibold rounded-full hover:bg-forest-100 transition-all active:scale-95 text-base font-semibold">Login</Link>
<button className="md:hidden p-2 text-forest-800">
<span className="material-symbols-outlined">menu</span>
</button>
</div>
</nav>
{/* Hero Banner */}
<section className="relative h-[35vh] w-full overflow-hidden flex items-center justify-center">
<div className="absolute inset-0 z-0">
<img alt="Lush Interior Garden" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AP1WRLtWsRhIn6jpQWisyX2PBLJNvNVG3QUv_ASHTf0F4OSwUVcEAxx51g35kT54Qdgy0pORuqi2yBo3NJ_n9Y49xwvvXsf3-K0NmAx1rvnj5QnAMQ7u6wMXhI9JBrpr4Mvq8k8AQ5Jxt5oBlLaKATPsAhi7ZZHbYoPgBbrq7Bo4aJ-WXORNm1L_sH_A-QjHoy7eOqjv8Gc-8qnUwOVQDenFthb24GRzsTcbCpsia1k5NRQhoBxCZF9hnZSFHweD"/>
<div className="absolute inset-0 bg-forest-950/65"></div>
</div>
<div className="relative z-10 text-center px-6">
<h1 className="fade-up text-white text-4xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-xl">
                Curated Greenery for Your Space
            </h1>
<p className="fade-up text-white/90 text-lg md:text-xl max-w-2xl mx-auto" style={{ /* animation-delay: 0.2s */ }}>
                Ethically sourced, master-grown specimens delivered from our sanctuary to your home.
            </p>
</div>
</section>
{/* Main Content Layout */}
<main className="container mx-auto px-4 md:px-12 py-12">
<div className="flex flex-col lg:flex-row gap-12">
{/* Sidebar Filters */}
<aside className="w-full lg:w-72 flex-shrink-0 space-y-10">
<div className="space-y-6">
<div>
<h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Categories</h3>
<div className="flex flex-wrap gap-2">
<button className="px-4 py-1.5 rounded-full bg-forest-800 text-white text-xs font-semibold shadow-sm">Indoor</button>
<button className="px-4 py-1.5 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:border-forest-600 hover:text-forest-700 transition-all text-xs">Outdoor</button>
<button className="px-4 py-1.5 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:border-forest-600 hover:text-forest-700 transition-all text-xs">Rare</button>
<button className="px-4 py-1.5 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:border-forest-600 hover:text-forest-700 transition-all text-xs">Succulents</button>
</div>
</div>
<div>
<h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Price Range</h3>
<input className="w-full h-1" max="1000" min="0" type="range"/>
<div className="flex justify-between mt-2 text-[11px] font-bold text-neutral-700">
<span>$0</span>
<span>$1000+</span>
</div>
</div>
<div>
<h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4">Care Level</h3>
<div className="space-y-3">
<label className="flex items-center gap-3 cursor-pointer group">
<input className="w-5 h-5 rounded border-neutral-300 text-forest-800 focus:ring-forest-800" type="checkbox"/>
<span className="text-sm text-neutral-700 group-hover:text-forest-800 transition-colors">Easy (Beginner)</span>
</label>
<label className="flex items-center gap-3 cursor-pointer group">
<input className="w-5 h-5 rounded border-neutral-300 text-forest-800 focus:ring-forest-800" type="checkbox"/>
<span className="text-sm text-neutral-700 group-hover:text-forest-800 transition-colors">Intermediate</span>
</label>
<label className="flex items-center gap-3 cursor-pointer group">
<input className="w-5 h-5 rounded border-neutral-300 text-forest-800 focus:ring-forest-800" type="checkbox"/>
<span className="text-sm text-neutral-700 group-hover:text-forest-800 transition-colors">Expert Care</span>
</label>
</div>
</div>
</div>
{/* Empty State Preview */}
<div className="p-6 border-2 border-dashed border-neutral-200 rounded-xl text-center">
<span className="material-symbols-outlined text-neutral-300 text-4xl mb-2">filter_list_off</span>
<p className="text-[11px] text-neutral-500">No results for specific filters? Try widening your search.</p>
</div>
</aside>
{/* Product Grid */}
<div className="flex-1 space-y-16">
{/* Seller Section: The Orchid Room */}
<section>
<div className="flex items-end justify-between mb-8 border-b border-neutral-200 pb-4">
<div>
<h2 className="text-2xl font-bold text-neutral-900 tracking-tight">The Orchid Room</h2>
<p className="text-xs text-neutral-500">Curated by Master Botanist Elena Vance</p>
</div>
<span className="px-3 py-1 bg-forest-100 text-forest-700 rounded-full text-xs font-bold font-bold">12 ITEMS</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
{/* Product Card 1 */}
<div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 group">
<div className="h-80 overflow-hidden relative">
<img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="A premium close-up shot of a rare, vibrant Orchid with deep purple petals and intricate patterns, set against a blurred forest green background. The lighting is soft and studio-like, emphasizing the organic texture of the flower. The overall aesthetic is high-end botanical photography." src="/images/034a7d611a233e1245ad91166badba46.png"/>
<div className="absolute top-4 right-4">
<button className="bg-white/90 backdrop-blur p-2 rounded-full shadow-md text-forest-800 hover:bg-forest-800 hover:text-white transition-colors">
<span className="material-symbols-outlined text-sm">favorite</span>
</button>
</div>
</div>
<div className="p-6">
<h3 className="text-xl font-bold font-bold text-neutral-900 mb-1">Vanda Coerulea</h3>
<p className="text-xs text-neutral-500 mb-4 line-clamp-2">A majestic blue orchid known for its long-lasting blooms and exotic aerial roots.</p>
<div className="flex items-center justify-between mb-6">
<span className="text-forest-800 text-xl font-bold font-display">$185.00</span>
<span className="text-xs font-bold uppercase text-neutral-400">Easy Care</span>
</div>
<button className="w-full bg-forest-800 text-white py-3 rounded-lg font-bold hover:bg-forest-700 transition-all active:scale-[0.98]">
                                    Add to Cart
                                </button>
</div>
</div>
{/* Product Card 2 */}
<div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 group">
<div className="h-80 overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="A tall, majestic indoor tree plant in a handcrafted terracotta pot, standing in a bright, modern living room with large windows and warm sunlight. The leaves are broad, waxy, and deep green. The style is luxury interior design, focusing on the intersection of nature and architecture." src="/images/21ddd1bd3fa447f90dcf5adacaba3965.png"/>
</div>
<div className="p-6">
<h3 className="text-xl font-bold font-bold text-neutral-900 mb-1">Ficus Lyrata &apos;Premium&apos;</h3>
<p className="text-xs text-neutral-500 mb-4 line-clamp-2">Extra-large fiddle leaf fig with a sturdy trunk and lush, umbrella-like canopy.</p>
<div className="flex items-center justify-between mb-6">
<span className="text-forest-800 text-xl font-bold font-display">$240.00</span>
<span className="text-xs font-bold uppercase text-neutral-400">Intermediate</span>
</div>
<button className="w-full bg-forest-800 text-white py-3 rounded-lg font-bold hover:bg-forest-700 transition-all active:scale-[0.98]">
                                    Add to Cart
                                </button>
</div>
</div>
{/* Skeleton Loading Variant */}
<div className="bg-neutral-100 rounded-xl border border-neutral-200 overflow-hidden animate-pulse">
<div className="h-80 bg-neutral-200"></div>
<div className="p-6 space-y-4">
<div className="h-6 bg-neutral-200 rounded w-3/4"></div>
<div className="space-y-2">
<div className="h-4 bg-neutral-200 rounded"></div>
<div className="h-4 bg-neutral-200 rounded w-5/6"></div>
</div>
<div className="flex justify-between items-center pt-2">
<div className="h-8 bg-neutral-200 rounded w-24"></div>
<div className="h-4 bg-neutral-200 rounded w-16"></div>
</div>
<div className="h-12 bg-neutral-200 rounded w-full"></div>
</div>
</div>
</div>
</section>
{/* Seller Section: Desert Blooms */}
<section>
<div className="flex items-end justify-between mb-8 border-b border-neutral-200 pb-4">
<div>
<h2 className="text-2xl font-bold text-neutral-900 tracking-tight">Desert Blooms</h2>
<p className="text-xs text-neutral-500">Rare Cacti &amp; Arid Flora from the High Sierras</p>
</div>
<span className="px-3 py-1 bg-forest-100 text-forest-700 rounded-full text-xs font-bold font-bold">8 ITEMS</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
{/* Product Card 3 */}
<div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 group">
<div className="h-80 overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="A cluster of unique, geometrically shaped succulents in various shades of dusty blue and muted rose, arranged in a shallow ceramic dish. The scene is illuminated by the golden hour sun, casting long, soft shadows. The aesthetic is organic, minimalist, and serene, highlighting the sculptural quality of desert plants." src="/images/eef024fb110ee22e9de1a3002899cc79.png"/>
</div>
<div className="p-6">
<h3 className="text-xl font-bold font-bold text-neutral-900 mb-1">Echeveria &apos;Blue Rose&apos;</h3>
<p className="text-xs text-neutral-500 mb-4 line-clamp-2">A sculptural succulent with perfect rosettes and a shimmering waxy coating.</p>
<div className="flex items-center justify-between mb-6">
<span className="text-forest-800 text-xl font-bold font-display">$45.00</span>
<span className="text-xs font-bold uppercase text-neutral-400">Easy Care</span>
</div>
<button className="w-full bg-forest-800 text-white py-3 rounded-lg font-bold hover:bg-forest-700 transition-all active:scale-[0.98]">
                                    Add to Cart
                                </button>
</div>
</div>
{/* Product Card 4 */}
<div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 group">
<div className="h-80 overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="A tall, slender cactus with intricate white spines standing in a minimalist concrete pot against a clean, off-white wall. The lighting is bright and directional, creating a sharp shadow that emphasizes the plant's unique form. The overall style is modern desert chic, focusing on clean lines and natural textures." src="/images/1065466b56550bba78b5e202fbcea3fa.png"/>
</div>
<div className="p-6">
<h3 className="text-xl font-bold font-bold text-neutral-900 mb-1">Old Man Cactus</h3>
<p className="text-xs text-neutral-500 mb-4 line-clamp-2">Cephalocereus senilis, cherished for its long, shaggy white hair-like spines.</p>
<div className="flex items-center justify-between mb-6">
<span className="text-forest-800 text-xl font-bold font-display">$68.00</span>
<span className="text-xs font-bold uppercase text-neutral-400">Easy Care</span>
</div>
<button className="w-full bg-forest-800 text-white py-3 rounded-lg font-bold hover:bg-forest-700 transition-all active:scale-[0.98]">
                                    Add to Cart
                                </button>
</div>
</div>
{/* Product Card 5 */}
<div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 group">
<div className="h-80 overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="A close-up of a rare variegated Monstera Adansonii leaf with striking white and lime green patterns. The leaf has characteristic 'swiss cheese' holes and is shimmering under soft morning light. The background is a lush green blur of other tropical plants. The image has a premium, collectors-edition feel." src="/images/099e876f7e25dbe0ae84561bdce257a0.png"/>
</div>
<div className="p-6">
<h3 className="text-xl font-bold font-bold text-neutral-900 mb-1">Monstera Adansonii</h3>
<p className="text-xs text-neutral-500 mb-4 line-clamp-2">Vibrant climbing plant with characteristic &apos;Swiss Cheese&apos; leaf perforations.</p>
<div className="flex items-center justify-between mb-6">
<span className="text-forest-800 text-xl font-bold font-display">$55.00</span>
<span className="text-xs font-bold uppercase text-neutral-400">Expert Care</span>
</div>
<button className="w-full bg-forest-800 text-white py-3 rounded-lg font-bold hover:bg-forest-700 transition-all active:scale-[0.98]">
                                    Add to Cart
                                </button>
</div>
</div>
</div>
</section>
</div>
</div>
</main>
{/* Footer */}
<footer className="w-full py-16 px-6 md:px-24 grid grid-cols-1 md:grid-cols-3 gap-12 bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-forest-900">
<div className="space-y-6">
<img alt="Botanic Footer Logo" className="h-12" src="https://lh3.googleusercontent.com/aida/AP1WRLuar5hHQwPlDQHjE2W0cbGsP6K1Gn5FSB_7oDEyLV0cFaGKm2B0xudufLTkgoOBYJCto6-bkM-xHOHkaz3Q5J7VY89j8XOE9EB98Aw_YWKI_bcMdWNcAZ7iKw2CP5oFxh92VYkm3iTKBEXqngWZ8YMjCOjCEbAQlFu3XV7yeZkSzSBI1O4O07ylc3tqRte-ifZe70pYP3CgV4dfz5KDnh4TjV3CWAO5CA7xbpJ6Qrd4eKTExbzoN9NGvQo"/>
<p className="text-neutral-500 font-body text-xs leading-relaxed max-w-sm">
                Botanic is a premium marketplace connecting discerning collectors with the world&apos;s most extraordinary plant life. We believe every space deserves a soul.
            </p>
<div className="flex gap-4">
<a className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-forest-800 hover:text-white transition-all duration-300" href="#">
<span className="material-symbols-outlined text-xl">share</span>
</a>
<a className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-forest-800 hover:text-white transition-all duration-300" href="#">
<span className="material-symbols-outlined text-xl">mail</span>
</a>
</div>
</div>
<div className="grid grid-cols-2 gap-8">
<div className="space-y-4">
<h4 className="text-xs font-bold uppercase tracking-widest text-forest-900 dark:text-forest-100 font-bold">Shop</h4>
<nav className="flex flex-col gap-2">
<a className="text-neutral-500 dark:text-neutral-400 hover:translate-x-1 hover:text-forest-600 transition-all duration-200 font-body text-xs" href="#">All Plants</a>
<a className="text-neutral-500 dark:text-neutral-400 hover:translate-x-1 hover:text-forest-600 transition-all duration-200 font-body text-xs" href="#">Rare Collection</a>
<a className="text-neutral-500 dark:text-neutral-400 hover:translate-x-1 hover:text-forest-600 transition-all duration-200 font-body text-xs" href="#">Care Kits</a>
<a className="text-neutral-500 dark:text-neutral-400 hover:translate-x-1 hover:text-forest-600 transition-all duration-200 font-body text-xs" href="#">E-Gift Cards</a>
</nav>
</div>
<div className="space-y-4">
<h4 className="text-xs font-bold uppercase tracking-widest text-forest-900 dark:text-forest-100 font-bold">Help</h4>
<nav className="flex flex-col gap-2">
<a className="text-neutral-500 dark:text-neutral-400 hover:translate-x-1 hover:text-forest-600 transition-all duration-200 font-body text-xs" href="#">Plant Care</a>
<a className="text-neutral-500 dark:text-neutral-400 hover:translate-x-1 hover:text-forest-600 transition-all duration-200 font-body text-xs" href="#">Shipping</a>
<a className="text-neutral-500 dark:text-neutral-400 hover:translate-x-1 hover:text-forest-600 transition-all duration-200 font-body text-xs" href="#">Terms of Service</a>
</nav>
</div>
</div>
<div className="space-y-6">
<h4 className="text-xs font-bold uppercase tracking-widest text-forest-900 dark:text-forest-100 font-bold">The Greenhouse Letter</h4>
<p className="text-xs text-neutral-500">Join our community for early access to rare drops and botanical wisdom.</p>
<div className="flex gap-2">
<input className="flex-1 bg-white border border-neutral-200 rounded-lg px-4 py-2 focus:ring-forest-800 focus:border-forest-800 text-xs" placeholder="Your email" type="email"/>
<button className="bg-forest-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-forest-700 transition-all text-xs">Join</button>
</div>
<p className="text-[10px] text-neutral-400 mt-12">© 2024 Botanic Premium Plant Marketplace. All rights reserved.</p>
</div>
</footer>


    </>
  );
}
