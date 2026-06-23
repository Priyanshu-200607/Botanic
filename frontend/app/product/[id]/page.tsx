import React from 'react';
import Link from 'next/link';

export default function DetailPage() {
  return (
    <>

{/* TopNavBar */}
<nav className="fixed top-0 w-full z-50 bg-[#F7FAF8]/85 backdrop-blur-xl border-b border-[#D8E2DC] shadow-sm transition-all duration-300">
<div className="flex items-center justify-between h-[72px] px-6 max-w-[1400px] mx-auto">
<div className="flex items-center space-x-8">
<a className="font-display text-[24px] font-extrabold text-[#132A1A] tracking-tight" href="#">Botanic®</a>
<div className="hidden md:flex items-center space-x-2">
<a className="font-body text-[16px] font-semibold tracking-tight text-[#256038] bg-[#E6F4EC] rounded-full px-4 py-1.5 active:scale-95 transition-transform" href="#">Shop</a>
<a className="font-body text-[16px] font-semibold tracking-tight text-[#1A261D] nav-link rounded-full px-4 py-1.5 active:scale-95 transition-transform" href="#">Plant Care</a>
<Link className="font-body text-[16px] font-semibold tracking-tight text-[#1A261D] nav-link rounded-full px-4 py-1.5 active:scale-95 transition-transform" href="/about">About</Link>
<Link className="font-body text-[16px] font-semibold tracking-tight text-[#1A261D] nav-link rounded-full px-4 py-1.5 active:scale-95 transition-transform" href="/contact">Contact</Link>
</div>
</div>
<div className="flex items-center space-x-4">
<div className="hidden lg:flex items-center bg-[#EEF3F0] rounded-full px-4 py-2 w-64 border border-transparent focus-within:border-[#2D7545] focus-within:shadow-glow transition-all">
<span className="material-symbols-outlined text-[#6B7F6F] mr-2">search</span>
<input className="bg-transparent border-none focus:ring-0 text-[14px] w-full text-[#1A261D] placeholder-[#6B7F6F]" placeholder="Search plants..." type="text"/>
</div>
<Link href="/login" className="font-body text-[16px] font-semibold text-[#1E4D30] border-2 border-[#1E4D30] rounded-full px-4 py-1.5 hover:bg-[#E6F4EC] transition-all active:scale-95">Login</Link>
<button className="flex items-center font-body text-[16px] font-semibold text-[#1E4D30] border-2 border-[#1E4D30] rounded-full px-4 py-1.5 hover:bg-[#E6F4EC] transition-all active:scale-95">
<span className="material-symbols-outlined mr-2">shopping_cart</span>
                    Cart
                </button>
<button className="md:hidden text-[#1A261D]">
<span className="material-symbols-outlined">menu</span>
</button>
</div>
</div>
</nav>
{/* Main Content */}
<main className="flex-grow max-w-[1400px] mx-auto px-6 py-12 w-full">
{/* Breadcrumb */}
<div className="flex items-center text-[14px] text-[#6B7F6F] mb-8 font-medium">
<Link className="hover:text-[#1E4D30] transition-colors" href="/">Home</Link>
<span className="material-symbols-outlined mx-2 text-[16px]">chevron_right</span>
<a className="hover:text-[#1E4D30] transition-colors" href="#">Plants</a>
<span className="material-symbols-outlined mx-2 text-[16px]">chevron_right</span>
<span className="text-[#1A261D]">Medicinal Bonsai</span>
</div>
{/* Product Hero Section */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
{/* Left Column: Imagery */}
<div className="flex flex-col gap-6">
<div className="w-full bg-white radius-xl shadow-sm overflow-hidden aspect-[0.8] relative group cursor-zoom-in">
<img alt="Rare Medicinal Bonsai" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="/images/08cc5af4d6499d8f956f6fcc562369b8.png"/>
</div>
{/* Thumbnails */}
<div className="grid grid-cols-3 gap-4">
<button className="bg-white radius-md overflow-hidden aspect-square border-2 border-[#1E4D30] relative">
<div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/images/08cc5af4d6499d8f956f6fcc562369b8.png')` }}></div>
</button>
<button className="bg-white radius-md overflow-hidden aspect-square border border-[#D8E2DC] hover:border-[#8FC4A1] transition-colors relative opacity-70 hover:opacity-100">
<div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/images/08cc5af4d6499d8f956f6fcc562369b8.png')` }}></div>
</button>
<button className="bg-white radius-md overflow-hidden aspect-square border border-[#D8E2DC] hover:border-[#8FC4A1] transition-colors relative opacity-70 hover:opacity-100">
<div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/images/08cc5af4d6499d8f956f6fcc562369b8.png')` }}></div>
</button>
</div>
</div>
{/* Right Column: Details */}
<div className="flex flex-col justify-start">
<div className="flex items-center gap-3 mb-4">
<span className="bg-[#E6F4EC] text-[#256038] text-[12px] font-bold uppercase tracking-wider px-3 py-1 radius-full">Rare Specimen</span>
</div>
<h1 className="font-display text-[36px] md:text-[48px] font-bold text-[#1A261D] leading-tight mb-2">Rare Medicinal Bonsai</h1>
<div className="flex items-center justify-between mb-6">
<div className="flex items-center gap-2">
<span className="text-[14px] text-[#3D5242]">By <strong className="text-[#1A261D]">The Greenhouse Collective</strong></span>
<span className="material-symbols-outlined text-[16px] text-[#2D7545] fill" title="Verified Seller">verified</span>
</div>
<div className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
<div className="flex text-[#C6902A]">
<span className="material-symbols-outlined fill text-[18px]">star</span>
<span className="material-symbols-outlined fill text-[18px]">star</span>
<span className="material-symbols-outlined fill text-[18px]">star</span>
<span className="material-symbols-outlined fill text-[18px]">star</span>
<span className="material-symbols-outlined text-[18px]">star_half</span>
</div>
<span className="text-[14px] text-[#6B7F6F] ml-1">4.9 (128)</span>
</div>
</div>
<div className="flex items-baseline gap-4 mb-8">
<span className="font-display text-[28px] font-bold text-[#1E4D30]">$425.00</span>
<span className="font-body text-[18px] text-[#6B7F6F] line-through">$550.00</span>
</div>
<p className="text-[16px] text-[#3D5242] leading-relaxed mb-10">
                    A masterfully cultivated specimen known for its serene presence and remarkable air-purifying qualities. This ancient medicinal bonsai brings a piece of tranquil forest history directly into your premium living space. Hand-potted in a custom ceramic vessel.
                </p>
{/* Care Icons */}
<div className="flex justify-between items-center bg-[#F7FAF8] border border-[#D8E2DC] radius-lg p-6 mb-10 shadow-sm">
<div className="flex flex-col items-center gap-2 text-center">
<div className="w-12 h-12 rounded-full bg-[#E6F4EC] flex items-center justify-center text-[#2D7545]">
<span className="material-symbols-outlined">water_drop</span>
</div>
<span className="text-[12px] font-bold uppercase text-[#3D5242] tracking-wide">Water</span>
<span className="text-[14px] text-[#6B7F6F]">Weekly</span>
</div>
<div className="w-px h-12 bg-[#D8E2DC]"></div>
<div className="flex flex-col items-center gap-2 text-center">
<div className="w-12 h-12 rounded-full bg-[#E6F4EC] flex items-center justify-center text-[#2D7545]">
<span className="material-symbols-outlined">light_mode</span>
</div>
<span className="text-[12px] font-bold uppercase text-[#3D5242] tracking-wide">Sun</span>
<span className="text-[14px] text-[#6B7F6F]">Bright Indirect</span>
</div>
<div className="w-px h-12 bg-[#D8E2DC]"></div>
<div className="flex flex-col items-center gap-2 text-center">
<div className="w-12 h-12 rounded-full bg-[#E6F4EC] flex items-center justify-center text-[#2D7545]">
<span className="material-symbols-outlined">thermostat</span>
</div>
<span className="text-[12px] font-bold uppercase text-[#3D5242] tracking-wide">Temp</span>
<span className="text-[14px] text-[#6B7F6F]">18-24°C</span>
</div>
</div>
{/* Controls */}
<div className="flex flex-col gap-4">
<div className="flex items-center gap-4">
{/* Stepper */}
<div className="flex items-center border border-[#D8E2DC] radius-md h-[48px] bg-white w-32">
<button className="w-10 h-full flex items-center justify-center text-[#3D5242] hover:text-[#1E4D30] transition-colors"><span className="material-symbols-outlined">remove</span></button>
<input className="w-full text-center border-none p-0 focus:ring-0 text-[16px] font-medium text-[#1A261D]" min="1" readOnly="" type="number" value="1"/>
<button className="w-10 h-full flex items-center justify-center text-[#3D5242] hover:text-[#1E4D30] transition-colors"><span className="material-symbols-outlined">add</span></button>
</div>
{/* Add to Cart */}
<button className="flex-grow bg-[#1E4D30] text-white h-[48px] radius-md font-semibold text-[16px] flex items-center justify-center gap-2 hover:bg-[#256038] hover:-translate-y-0.5 transition-all shadow-md">
                            Add to Cart
                        </button>
</div>
<button className="w-full h-[48px] radius-md text-[#2D7545] font-semibold text-[16px] flex items-center justify-center gap-2 hover:bg-[#E6F4EC] transition-colors border border-transparent">
<span className="material-symbols-outlined">favorite</span>
                        Add to Wishlist
                    </button>
</div>
<div className="mt-8 pt-6 border-t border-[#D8E2DC] flex items-center gap-4 text-[#6B7F6F] text-[14px]">
<div className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">local_shipping</span> Free Premium Shipping</div>
<div className="w-1 h-1 rounded-full bg-[#D8E2DC]"></div>
<div className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">shield</span> 30-Day Guarantee</div>
</div>
</div>
</div>
</main>
{/* Footer */}
<footer className="w-full rounded-t-3xl border-t border-[#D8E2DC] bg-[#F7FAF8]">
<div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-8 py-20 max-w-[1400px] mx-auto">
<div className="flex flex-col">
<span className="font-display text-[20px] font-bold text-[#132A1A] mb-4">Botanic®</span>
<p className="font-body text-[14px] text-[#6B7F6F] mb-6">Premium plant marketplace bridging nature and modern e-commerce. Curated specimens for thoughtful spaces.</p>
<div className="flex items-center gap-4 text-[#6B7F6F]">
<a className="hover:text-[#2D7545] transition-colors" href="#"><span className="material-symbols-outlined">public</span></a>
</div>
</div>
<div className="flex flex-col">
<span className="text-[12px] font-bold uppercase text-[#3D5242] tracking-wide mb-4">Shop &amp; Policies</span>
<div className="flex flex-col gap-3">
<a className="font-body text-[14px] text-[#6B7F6F] hover:text-[#2D7545] hover:translate-x-1 transition-all duration-400 ease-out" href="#">Sustainability</a>
<a className="font-body text-[14px] text-[#6B7F6F] hover:text-[#2D7545] hover:translate-x-1 transition-all duration-400 ease-out" href="#">Shipping Policy</a>
<a className="font-body text-[14px] text-[#6B7F6F] hover:text-[#2D7545] hover:translate-x-1 transition-all duration-400 ease-out" href="#">Gift Cards</a>
</div>
</div>
<div className="flex flex-col">
<span className="text-[12px] font-bold uppercase text-[#3D5242] tracking-wide mb-4">Company</span>
<div className="flex flex-col gap-3">
<a className="font-body text-[14px] text-[#6B7F6F] hover:text-[#2D7545] hover:translate-x-1 transition-all duration-400 ease-out" href="#">Careers</a>
<a className="font-body text-[14px] text-[#6B7F6F] hover:text-[#2D7545] hover:translate-x-1 transition-all duration-400 ease-out" href="#">Terms of Service</a>
<a className="font-body text-[14px] text-[#6B7F6F] hover:text-[#2D7545] hover:translate-x-1 transition-all duration-400 ease-out" href="#">Privacy</a>
</div>
</div>
</div>
<div className="border-t border-[#D8E2DC] py-6 text-center">
<p className="font-body text-[12px] text-[#B0BFBC]">© 2024 Botanic® Premium Plant Marketplace. All rights reserved.</p>
</div>
</footer>


    </>
  );
}
