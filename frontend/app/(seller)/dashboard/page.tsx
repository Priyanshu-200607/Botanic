import React from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <>

{/* TopNavBar */}
<nav className="fixed top-0 w-full z-50 bg-neutral-50/85 dark:bg-neutral-950/85 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 shadow-sm">
<div className="flex justify-between items-center h-[72px] px-6 lg:px-12 max-w-[1400px] mx-auto">
<div className="font-display text-[24px] lg:text-[32px] font-extrabold text-forest-900 dark:text-forest-100 tracking-tight">Botanic</div>
<div className="hidden lg:flex items-center space-x-8 font-body text-[16px] font-semibold tracking-tight text-neutral-700">
<a className="hover:text-forest-600 transition-colors" href="#">Shop</a>
<a className="hover:text-forest-600 transition-colors" href="#">Plant Care</a>
<Link className="hover:text-forest-600 transition-colors" href="/about">About</Link>
<Link className="hover:text-forest-600 transition-colors" href="/contact">Contact</Link>
</div>
<div className="flex items-center space-x-4">
<button className="p-2 hover:bg-forest-100/50 rounded-full transition-all duration-300">
<span className="material-symbols-outlined text-forest-800">shopping_cart</span>
</button>
<button className="flex items-center space-x-2 text-forest-800 dark:text-forest-300 bg-forest-100 dark:bg-forest-900 rounded-full px-4 py-1.5 transition-transform active:scale-95 duration-200">
<span className="material-symbols-outlined" style={{ /* font-variation-settings: 'FILL' 1; */ }}>account_circle</span>
<span className="font-semibold text-sm hidden md:inline">Dashboard</span>
</button>
</div>
</div>
</nav>
{/* Main Dashboard Layout */}
<div className="pt-[72px] min-h-screen flex flex-col lg:flex-row max-w-[1400px] mx-auto">
{/* Sidebar Navigation */}
<aside className="w-full lg:w-72 border-r border-neutral-200 p-6 space-y-8 bg-white/50">
<div>
<h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6 px-4">Management</h3>
<nav className="space-y-2">
<a className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-forest-50 text-neutral-700" href="#profile">
<span className="material-symbols-outlined text-forest-600">person</span>
<span className="font-medium">Profile Info</span>
</a>
<a className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-forest-50 text-neutral-700" href="#shop">
<span className="material-symbols-outlined text-forest-600">storefront</span>
<span className="font-medium">Shop Settings</span>
</a>
<a className="flex items-center space-x-3 px-4 py-3 rounded-xl active-nav shadow-sm" href="#inventory">
<span className="material-symbols-outlined text-forest-800" style={{ /* font-variation-settings: 'FILL' 1; */ }}>inventory_2</span>
<span className="font-semibold">Manage Inventory</span>
</a>
<a className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 hover:bg-forest-50 text-neutral-700" href="#sales">
<span className="material-symbols-outlined text-forest-600">analytics</span>
<span className="font-medium">Sales Overview</span>
</a>
</nav>
</div>
<div className="pt-6 border-t border-neutral-200">
<button className="w-full flex items-center justify-center space-x-2 bg-forest-800 text-white py-3.5 rounded-xl font-bold shadow-md hover:bg-forest-700 transition-all duration-300 hover:-translate-y-0.5">
<span className="material-symbols-outlined">add_circle</span>
<span>Add New Plant</span>
</button>
</div>
<div className="hidden lg:block pt-12">
<div className="bg-gold-100 rounded-2xl p-6 relative overflow-hidden">
<div className="relative z-10">
<h4 className="font-display font-bold text-gold-700 text-lg mb-2">Grow with us!</h4>
<p className="text-sm text-gold-600 leading-relaxed">Upgrade to Botanic Pro to access advanced analytics and bulk upload features.</p>
<button className="mt-4 text-sm font-bold text-white bg-gold-600 px-4 py-2 rounded-lg hover:bg-gold-700 transition-colors">Upgrade Now</button>
</div>
<span className="material-symbols-outlined absolute -bottom-4 -right-4 text-7xl text-gold-500/20 rotate-12">local_florist</span>
</div>
</div>
</aside>
{/* Main Content Area */}
<main className="flex-1 p-6 lg:p-12 space-y-12">
{/* Section 1: Personal Information */}
<section className="scroll-mt-24" id="profile">
<div className="flex items-end justify-between mb-8">
<div>
<h2 className="font-display text-3xl font-bold text-forest-950">Personal Information</h2>
<p className="text-neutral-500 mt-1">Manage your account details and contact preferences.</p>
</div>
</div>
<div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200">
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
<div className="space-y-2">
<label className="block text-sm font-semibold text-neutral-900 ml-1">Full Name</label>
<input className="w-full h-12 px-4 bg-neutral-100 border-neutral-200 rounded-lg focus:ring-forest-600 focus:border-forest-600 transition-all" type="text" value="Elena Rivers"/>
</div>
<div className="space-y-2">
<label className="block text-sm font-semibold text-neutral-900 ml-1">Email Address</label>
<input className="w-full h-12 px-4 bg-neutral-100 border-neutral-200 rounded-lg focus:ring-forest-600 focus:border-forest-600 transition-all" type="email" value="elena@botanic-seller.com"/>
</div>
<div className="space-y-2">
<label className="block text-sm font-semibold text-neutral-900 ml-1">Phone Number</label>
<input className="w-full h-12 px-4 bg-neutral-100 border-neutral-200 rounded-lg focus:ring-forest-600 focus:border-forest-600 transition-all" type="tel" value="+1 (555) 012-3456"/>
</div>
<div className="flex items-end pb-1">
<button className="px-6 h-12 border-2 border-forest-800 text-forest-800 font-bold rounded-lg hover:bg-forest-100 transition-all">Update Info</button>
</div>
</div>
</div>
</section>
{/* Section 2: Shop Info */}
<section className="scroll-mt-24" id="shop">
<div className="flex items-end justify-between mb-8">
<div>
<h2 className="font-display text-3xl font-bold text-forest-950">Shop Presence</h2>
<p className="text-neutral-500 mt-1">How customers see your botanical boutique.</p>
</div>
</div>
<div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-200">
{/* Banner Placeholder */}
<div className="h-48 w-full relative" data-alt="A lush, high-resolution aesthetic photo of a professional plant nursery with hanging ferns, sunlight streaming through glass panes, and premium terracotta pots arranged on rustic wooden benches. The scene is bathed in warm morning light, evoking a sense of calm and organic luxury consistent with a premium plant brand." style={{ backgroundImage: `url('/images/2066294781c589752edc32694898522a.png')` }}>
<div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 to-transparent"></div>
<button className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-2 rounded-lg text-sm font-bold text-forest-800 flex items-center space-x-2 shadow-lg">
<span className="material-symbols-outlined text-sm">photo_camera</span>
<span>Change Banner</span>
</button>
</div>
<div className="p-8 -mt-12 relative z-10">
<div className="flex flex-col md:flex-row md:items-end gap-6 mb-8">
<div className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-forest-100">
<img className="w-full h-full object-cover" data-alt="A minimalist and elegant brand logo for a plant shop featuring a stylized monstera leaf inside a circle, using deep forest green and ivory white. The logo reflects a boutique, premium greenery aesthetic and is perfectly centered with a clean, high-contrast look." src="/images/76e48faee8134bea89345de8377603f6.png"/>
</div>
<div className="flex-1 mb-2">
<label className="block text-sm font-semibold text-neutral-900 ml-1 mb-2">Shop Name</label>
<input className="w-full h-12 px-4 bg-neutral-50 border-neutral-200 rounded-lg text-xl font-bold text-forest-900" type="text" value="Verdant Valleys Boutique"/>
</div>
</div>
<div className="space-y-2">
<label className="block text-sm font-semibold text-neutral-900 ml-1">Shop Description</label>
<textarea className="w-full p-4 bg-neutral-100 border-neutral-200 rounded-lg focus:ring-forest-600 focus:border-forest-600 transition-all" rows="4">Curating rare tropical specimens and artisan-potted succulents for the modern collector. Every plant is nurtured with organic care in our sustainable greenhouse before finding its way to your home.</textarea>
</div>
<div className="mt-8 flex justify-end">
<button className="bg-forest-800 text-white px-8 py-3 rounded-lg font-bold shadow-md hover:bg-forest-700 transition-all">Save Shop Settings</button>
</div>
</div>
</div>
</section>
{/* Section 3: Inventory Management */}
<section className="scroll-mt-24" id="inventory">
<div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
<div>
<h2 className="font-display text-3xl font-bold text-forest-950">Active Inventory</h2>
<p className="text-neutral-500 mt-1">Manage 24 live listings across your store.</p>
</div>
<div className="flex space-x-3">
<div className="relative">
<input className="pl-10 pr-4 h-11 bg-white border-neutral-200 rounded-full text-sm focus:ring-forest-600 focus:border-forest-600 w-64" placeholder="Search plants..." type="text"/>
<span className="material-symbols-outlined absolute left-3 top-2.5 text-neutral-400">search</span>
</div>
<button className="h-11 px-4 border border-neutral-200 rounded-full bg-white flex items-center space-x-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-50">
<span className="material-symbols-outlined text-sm">tune</span>
<span>Filter</span>
</button>
</div>
</div>
{/* Plant Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
{/* Plant Card 1 */}
<div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden group hover:shadow-hover transition-all duration-500 hover:-translate-y-1.5">
<div className="h-56 relative overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A premium Monstera Deliciosa plant with large, glossy, fenestrated leaves in a high-end textured white ceramic pot. The lighting is soft and studio-quality, highlighting the vibrant green textures against a clean, neutral background. This image should represent a luxury product listing for an online nursery." src="/images/ead8393f2880d23c53517deebaf63a7a.png"/>
<div className="absolute top-3 left-3 bg-forest-800 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">Top Seller</div>
<div className="absolute top-3 right-3">
<label className="inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-neutral-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-forest-600"></div>
</label>
</div>
</div>
<div className="p-6">
<div className="flex justify-between items-start mb-2">
<h4 className="font-display text-lg font-bold text-neutral-900">Monstera Deliciosa</h4>
<span className="material-symbols-outlined text-neutral-400 cursor-pointer hover:text-forest-600">more_vert</span>
</div>
<p className="text-sm text-neutral-500 line-clamp-1 mb-4">Mature swiss cheese plant in ceramic pot.</p>
<div className="flex items-center justify-between pt-4 border-t border-neutral-100">
<div className="space-y-1">
<span className="text-[10px] uppercase font-bold text-neutral-400">Price</span>
<div className="flex items-center text-forest-800">
<span className="text-sm font-bold mr-1">$</span>
<input className="w-16 h-8 p-0 border-0 bg-transparent font-bold text-lg focus:ring-0" type="text" value="48.00"/>
</div>
</div>
<div className="flex space-x-2">
<button className="p-2 text-forest-600 hover:bg-forest-50 rounded-lg transition-colors" title="Edit Details">
<span className="material-symbols-outlined">edit</span>
</button>
<button className="p-2 text-clay-600 hover:bg-clay-100 rounded-lg transition-colors" title="Remove">
<span className="material-symbols-outlined">delete</span>
</button>
</div>
</div>
</div>
</div>
{/* Plant Card 2 */}
<div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden group hover:shadow-hover transition-all duration-500 hover:-translate-y-1.5">
<div className="h-56 relative overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-alt="A beautiful Fiddle Leaf Fig tree in a woven seagrass basket, placed in a bright, modern corner of a living room with sunlight hitting the broad leaves. The image should feel organic and high-end, showcasing the plant as a centerpiece of interior design, with deep green tones and natural textures." src="/images/855baa3a63a7d38002c494b410bc24b8.png"/>
<div className="absolute top-3 right-3">
<label className="inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-neutral-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-forest-600"></div>
</label>
</div>
</div>
<div className="p-6">
<div className="flex justify-between items-start mb-2">
<h4 className="font-display text-lg font-bold text-neutral-900">Fiddle Leaf Fig</h4>
<span className="material-symbols-outlined text-neutral-400 cursor-pointer hover:text-forest-600">more_vert</span>
</div>
<p className="text-sm text-neutral-500 line-clamp-1 mb-4">Tall 5ft specimen, healthy broad leaves.</p>
<div className="flex items-center justify-between pt-4 border-t border-neutral-100">
<div className="space-y-1">
<span className="text-[10px] uppercase font-bold text-neutral-400">Price</span>
<div className="flex items-center text-forest-800">
<span className="text-sm font-bold mr-1">$</span>
<input className="w-20 h-8 p-0 border-0 bg-transparent font-bold text-lg focus:ring-0" type="text" value="125.00"/>
</div>
</div>
<div className="flex space-x-2">
<button className="p-2 text-forest-600 hover:bg-forest-50 rounded-lg transition-colors">
<span className="material-symbols-outlined">edit</span>
</button>
<button className="p-2 text-clay-600 hover:bg-clay-100 rounded-lg transition-colors">
<span className="material-symbols-outlined">delete</span>
</button>
</div>
</div>
</div>
</div>
{/* Plant Card 3 (Hidden/Disabled) */}
<div className="bg-neutral-50 rounded-xl border border-neutral-200 shadow-sm overflow-hidden group opacity-80">
<div className="h-56 relative overflow-hidden grayscale">
<img className="w-full h-full object-cover" data-alt="A delicate and rare String of Pearls succulent trailing elegantly over the edge of a minimalist gray concrete pot. The tiny spherical leaves catch soft, diffuse lighting, creating a poetic and sophisticated image that emphasizes the unique botanical structure of this collector's plant." src="/images/0cd7af1df38d25d631284c7d5913dddb.png"/>
<div className="absolute inset-0 bg-neutral-950/20 flex items-center justify-center">
<span className="bg-white/90 text-neutral-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">HIDDEN FROM SHOP</span>
</div>
<div className="absolute top-3 right-3">
<label className="inline-flex items-center cursor-pointer">
<input className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-neutral-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-forest-600"></div>
</label>
</div>
</div>
<div className="p-6">
<div className="flex justify-between items-start mb-2">
<h4 className="font-display text-lg font-bold text-neutral-400">String of Pearls</h4>
<span className="material-symbols-outlined text-neutral-400">more_vert</span>
</div>
<p className="text-sm text-neutral-400 line-clamp-1 mb-4">Trailing 8-inch succulent vine.</p>
<div className="flex items-center justify-between pt-4 border-t border-neutral-100">
<div className="space-y-1">
<span className="text-[10px] uppercase font-bold text-neutral-400">Price</span>
<div className="flex items-center text-neutral-400">
<span className="text-sm font-bold mr-1">$</span>
<input className="w-16 h-8 p-0 border-0 bg-transparent font-bold text-lg focus:ring-0" disabled="" type="text" value="22.00"/>
</div>
</div>
<div className="flex space-x-2">
<button className="p-2 text-neutral-400 hover:bg-neutral-100 rounded-lg transition-colors">
<span className="material-symbols-outlined">edit</span>
</button>
<button className="p-2 text-clay-600 hover:bg-clay-100 rounded-lg transition-colors">
<span className="material-symbols-outlined">delete</span>
</button>
</div>
</div>
</div>
</div>
</div>
{/* Load More / Pagination */}
<div className="mt-12 flex justify-center">
<button className="flex items-center space-x-2 text-forest-800 font-bold hover:text-forest-600 transition-colors">
<span>Load 12 more plants</span>
<span className="material-symbols-outlined">expand_more</span>
</button>
</div>
</section>
</main>
</div>
{/* Footer */}
<footer className="bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 w-full py-16 px-6 lg:px-12">
<div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-[1300px] mx-auto">
<div className="space-y-6">
<div className="font-display text-[20px] font-bold text-forest-900 dark:text-forest-100">Botanic</div>
<p className="font-body text-xs text-neutral-500 max-w-xs leading-relaxed">Connecting passionate growers with nature enthusiasts. Elevate your living space with our premium, sustainably sourced greenery.</p>
<div className="flex space-x-4">
<a className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-forest-800 hover:text-white transition-all duration-300" href="#">
<span className="material-symbols-outlined text-sm">public</span>
</a>
<a className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-forest-800 hover:text-white transition-all duration-300" href="#">
<span className="material-symbols-outlined text-sm">mail</span>
</a>
</div>
</div>
<div>
<h4 className="font-display text-sm font-bold uppercase tracking-widest text-neutral-700 mb-6">Quick Links</h4>
<ul className="space-y-3 font-body text-xs text-neutral-500">
<li><a className="hover:text-forest-600 hover:translate-x-1 transition-transform inline-block" href="#">Sustainability</a></li>
<li><a className="hover:text-forest-600 hover:translate-x-1 transition-transform inline-block" href="#">Shipping Policy</a></li>
<li><a className="hover:text-forest-600 hover:translate-x-1 transition-transform inline-block" href="#">Privacy Policy</a></li>
<li><a className="hover:text-forest-600 hover:translate-x-1 transition-transform inline-block" href="#">Terms of Service</a></li>
</ul>
</div>
<div>
<h4 className="font-display text-sm font-bold uppercase tracking-widest text-neutral-700 mb-6">Newsletter</h4>
<p className="text-sm text-neutral-500 mb-4">Join our circular gardening community.</p>
<div className="flex">
<input className="flex-1 h-11 px-4 bg-white border-neutral-200 rounded-l-lg focus:ring-forest-600 focus:border-forest-600" placeholder="email@example.com" type="email"/>
<button className="bg-forest-800 text-white px-4 rounded-r-lg hover:bg-forest-700 transition-colors">Join</button>
</div>
</div>
</div>
<div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800 text-center text-[12px] text-neutral-400 font-body">
            © <span id="year"></span> Botanic Premium Greenery. All rights reserved.
        </div>
</footer>


    </>
  );
}
