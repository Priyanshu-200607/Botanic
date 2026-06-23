import React from 'react';
import Link from 'next/link';

export default function CartPage() {
  return (
    <>

{/* TopNavBar (Shared Component) */}
<header className="fixed top-0 w-full z-50 bg-neutral-50/85 dark:bg-neutral-950/85 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-700 shadow-sm left-0">
<div className="flex items-center justify-between h-[72px] px-6 max-w-[1400px] mx-auto">
{/* Brand Logo */}
<Link aria-label="Botanic Home" className="flex items-center" href="/">
<img alt="Botanic Logo" className="h-[44px] object-contain" src="https://lh3.googleusercontent.com/aida/AP1WRLuar5hHQwPlDQHjE2W0cbGsP6K1Gn5FSB_7oDEyLV0cFaGKm2B0xudufLTkgoOBYJCto6-bkM-xHOHkaz3Q5J7VY89j8XOE9EB98Aw_YWKI_bcMdWNcAZ7iKw2CP5oFxh92VYkm3iTKBEXqngWZ8YMjCOjCEbAQlFu3XV7yeZkSzSBI1O4O07ylc3tqRte-ifZe70pYP3CgV4dfz5KDnh4TjV3CWAO5CA7xbpJ6Qrd4eKTExbzoN9NGvQo"/>
</Link>
{/* Search Bar (on_left as per JSON, but hiding on mobile) */}
<div className="hidden md:flex flex-1 max-w-[440px] mx-8">
<div className="relative w-full group">
<span className="absolute inset-y-0 left-0 flex items-center pl-3">
<span className="material-symbols-outlined text-neutral-500 group-focus-within:text-forest-600 transition-colors">search</span>
</span>
<input aria-label="Search" className="w-full h-[48px] bg-neutral-100 border border-neutral-200 rounded-full pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-500 focus:border-forest-600 focus:shadow-glow transition-all" placeholder="Search plants, pots, accessories..." type="text"/>
</div>
</div>
{/* Navigation Links */}
<nav className="hidden lg:flex items-center gap-2">
<a className="font-body text-base font-semibold font-semibold tracking-tight text-neutral-800 dark:text-neutral-200 hover:text-forest-600 transition-colors px-4 py-1.5 rounded-full hover:bg-forest-100 dark:hover:bg-forest-900/30 transition-all duration-300" href="#">Shop</a>
<a className="font-body text-base font-semibold font-semibold tracking-tight text-neutral-800 dark:text-neutral-200 hover:text-forest-600 transition-colors px-4 py-1.5 rounded-full hover:bg-forest-100 dark:hover:bg-forest-900/30 transition-all duration-300" href="#">Plant Care</a>
<Link className="font-body text-base font-semibold font-semibold tracking-tight text-neutral-800 dark:text-neutral-200 hover:text-forest-600 transition-colors px-4 py-1.5 rounded-full hover:bg-forest-100 dark:hover:bg-forest-900/30 transition-all duration-300" href="/about">About</Link>
<Link className="font-body text-base font-semibold font-semibold tracking-tight text-neutral-800 dark:text-neutral-200 hover:text-forest-600 transition-colors px-4 py-1.5 rounded-full hover:bg-forest-100 dark:hover:bg-forest-900/30 transition-all duration-300" href="/contact">Contact</Link>
</nav>
{/* Actions */}
<div className="flex items-center gap-4 ml-4">
<Link href="/login" className="hidden md:flex h-[48px] px-8 rounded-md border-[1.5px] border-forest-800 text-forest-800 font-body text-base font-semibold font-semibold items-center justify-center hover:bg-forest-100 transition-colors active:scale-95">Login</Link>
<a aria-current="page" className="font-body text-base font-semibold font-semibold tracking-tight text-forest-700 bg-forest-100 rounded-full px-4 py-1.5 flex items-center gap-2 active:scale-95 transition-transform" href="#">
<span className="material-symbols-outlined" data-weight="fill" style={{ /* font-variation-settings: 'FILL' 1; */ }}>shopping_cart</span>
<span className="hidden sm:inline">Cart</span>
<span className="bg-forest-800 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full ml-1">2</span>
</a>
</div>
</div>
</header>
{/* Main Content Container */}
<main className="w-full max-w-[960px] mx-auto animate-fade-in">
{/* Page Header */}
<div className="flex items-center mb-8">
<h1 className="font-display text-4xl font-bold text-neutral-900 mr-4">Your Cart</h1>
<div className="bg-forest-100 text-forest-800 text-sm font-semibold font-bold px-3 py-1 rounded-pill flex items-center justify-center">
                2 Items
            </div>
</div>
{/* Cart Layout: Main + Sidebar */}
<div className="flex flex-col lg:flex-row gap-8">
{/* Left: Cart Items List */}
<div className="flex-1 bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
{/* Items Container */}
<div className="p-6 flex flex-col gap-6" id="cart-items">
{/* Cart Item 1 */}
<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-neutral-200 last:border-b-0 last:pb-0" id="item-1">
{/* Product Image */}
<div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden flex-shrink-0 border border-neutral-200 bg-neutral-50 relative">
<img alt="Rare Medicinal Bonsai" className="w-full h-full object-cover mix-blend-multiply" data-alt="A meticulously curated rare medicinal bonsai tree in a hand-thrown terracotta pot, resting on a clean white marble surface. The lighting is bright, soft, and naturally diffused, creating a premium, modern light-mode aesthetic. Deep forest greens of the foliage contrast beautifully with the warm earthy tones of the pot. The background is a clean, minimal white space, emphasizing the organic elegance and luxury of the living plant." src="/images/96d060aa8c6e3a46f2cffe56bfdb50e4.png"/>
</div>
{/* Product Info */}
<div className="flex-1 min-w-0 flex flex-col justify-between h-full">
<div>
<h3 className="font-display text-lg font-semibold text-neutral-900 truncate">Rare Medicinal Bonsai</h3>
<p className="font-body text-xs text-neutral-500 mt-1">Sold by: <span className="font-medium text-forest-700">The Greenhouse Collective</span></p>
</div>
<div className="flex items-center justify-between mt-4 sm:mt-auto w-full">
{/* Price */}
<div className="font-body text-xl font-bold text-forest-800">$145.00</div>
{/* Actions: Stepper & Remove */}
<div className="flex items-center gap-4">
{/* Stepper */}
<div className="flex items-center border border-neutral-200 rounded-md h-[36px] bg-neutral-50 overflow-hidden">
<button aria-label="Decrease quantity" className="w-8 h-full flex items-center justify-center text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 transition-colors" onclick="updateQty('qty-1', -1)">
<span className="material-symbols-outlined text-[18px]">remove</span>
</button>
<input className="w-10 h-full text-center border-none bg-transparent p-0 font-body text-sm text-neutral-900 focus:ring-0 appearance-none m-0" id="qty-1" max="10" min="1" readOnly="" type="number" value="1"/>
<button aria-label="Increase quantity" className="w-8 h-full flex items-center justify-center text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 transition-colors" onclick="updateQty('qty-1', 1)">
<span className="material-symbols-outlined text-[18px]">add</span>
</button>
</div>
{/* Remove */}
<button aria-label="Remove item" className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-clay-700 hover:bg-clay-100 rounded-full transition-colors group" onclick="removeItem('item-1')">
<span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">delete</span>
</button>
</div>
</div>
</div>
</div>
{/* Cart Item 2 */}
<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-neutral-200 last:border-b-0 last:pb-0" id="item-2">
{/* Product Image */}
<div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden flex-shrink-0 border border-neutral-200 bg-neutral-50 relative">
<img alt="Monstera Deliciosa Large" className="w-full h-full object-cover mix-blend-multiply" data-alt="A lush, vibrant Monstera Deliciosa plant presented in a modern, matte-finish ceramic planter. The setting is a bright, airy indoor space bathed in soft, diffused morning sunlight. The deep, rich emerald greens of the large fenestrated leaves create a striking contrast against the clean, light-mode background. The aesthetic is premium, organic, and serene, perfectly suited for a luxury botanical marketplace." src="/images/87549535021d1e36c0d9acc270f6e8cc.png"/>
</div>
{/* Product Info */}
<div className="flex-1 min-w-0 flex flex-col justify-between h-full">
<div>
<h3 className="font-display text-lg font-semibold text-neutral-900 truncate">Monstera Deliciosa (Large)</h3>
<p className="font-body text-xs text-neutral-500 mt-1">Sold by: <span className="font-medium text-forest-700">Urban Jungle Botanicals</span></p>
</div>
<div className="flex items-center justify-between mt-4 sm:mt-auto w-full">
{/* Price */}
<div className="font-body text-xl font-bold text-forest-800">$85.00</div>
{/* Actions: Stepper & Remove */}
<div className="flex items-center gap-4">
{/* Stepper */}
<div className="flex items-center border border-neutral-200 rounded-md h-[36px] bg-neutral-50 overflow-hidden">
<button aria-label="Decrease quantity" className="w-8 h-full flex items-center justify-center text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 transition-colors" onclick="updateQty('qty-2', -1)">
<span className="material-symbols-outlined text-[18px]">remove</span>
</button>
<input className="w-10 h-full text-center border-none bg-transparent p-0 font-body text-sm text-neutral-900 focus:ring-0 appearance-none m-0" id="qty-2" max="10" min="1" readOnly="" type="number" value="1"/>
<button aria-label="Increase quantity" className="w-8 h-full flex items-center justify-center text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 transition-colors" onclick="updateQty('qty-2', 1)">
<span className="material-symbols-outlined text-[18px]">add</span>
</button>
</div>
{/* Remove */}
<button aria-label="Remove item" className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-clay-700 hover:bg-clay-100 rounded-full transition-colors group" onclick="removeItem('item-2')">
<span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">delete</span>
</button>
</div>
</div>
</div>
</div>
</div>
{/* Empty State (Hidden by default) */}
<div className="hidden flex-col items-center justify-center py-24 px-6 text-center" id="empty-state">
<div className="w-32 h-32 bg-forest-50 rounded-full flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-forest-300 text-[64px]" style={{ /* font-variation-settings: 'FILL' 0; */ }}>eco</span>
</div>
<h2 className="font-display text-3xl font-bold text-neutral-900 mb-2">Your cart is empty</h2>
<p className="font-body text-base text-neutral-500 mb-8 max-w-md">Looks like you haven&apos;t added any botanical companions to your cart yet.</p>
<a className="inline-flex h-[48px] px-8 rounded-md bg-forest-800 text-white font-body text-base font-semibold font-semibold items-center justify-center hover:bg-forest-700 hover:-translate-y-0.5 active:bg-forest-900 transition-all shadow-sm hover:shadow-md" href="#">
                        Browse Plants
                    </a>
</div>
</div>
{/* Right: Order Summary */}
<div className="w-full lg:w-[340px] flex-shrink-0" id="order-summary">
<div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 sticky top-[100px]">
<h2 className="font-display text-xl font-bold text-neutral-900 mb-6">Order Summary</h2>
<div className="space-y-sm mb-6">
<div className="flex justify-between items-center font-body text-sm text-neutral-700">
<span>Subtotal</span>
<span className="font-medium" id="summary-subtotal">$230.00</span>
</div>
<div className="flex justify-between items-center font-body text-sm text-neutral-700">
<span>Estimated Delivery</span>
<span className="font-medium text-forest-700">Free</span>
</div>
<div className="flex justify-between items-center font-body text-sm text-neutral-700">
<span>Estimated Tax</span>
<span className="font-medium">$18.40</span>
</div>
</div>
<div className="border-t border-neutral-200 pt-4 mb-8 flex justify-between items-end">
<span className="font-display text-lg font-semibold text-neutral-900">Total</span>
<span className="font-display text-3xl font-bold text-forest-900">$248.40</span>
</div>
{/* Checkout Button: Gold-500 (#C6902A) mapped from design system */}
<button className="w-full h-[48px] rounded-md bg-gold-500 text-white font-body text-base font-semibold font-bold items-center justify-center hover:bg-gold-700 hover:-translate-y-0.5 active:scale-[0.98] transition-all shadow-sm flex gap-2">
                        Proceed to Checkout
                    </button>
{/* Trust Signal */}
<div className="mt-4 flex items-center justify-center gap-2 text-neutral-500 font-body text-[11px]">
<span className="material-symbols-outlined text-[16px]">lock</span>
<span>Secure SSL Checkout</span>
</div>
</div>
{/* Ghost Link */}
<div className="mt-6 text-center">
<a className="font-body text-sm font-semibold text-forest-600 hover:text-forest-800 transition-colors inline-flex items-center gap-1 group" href="#">
<span className="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                        Continue Shopping
                    </a>
</div>
</div>
</div>
</main>
{/* Footer (Shared Component) */}
<footer className="w-full rounded-t-3xl border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 mt-20">
<div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-8 py-20 max-w-[1400px] mx-auto">
{/* Brand Column */}
<div className="flex flex-col gap-4">
<span className="font-display text-xl font-bold font-bold text-forest-900 dark:text-forest-50">Botanic®</span>
<p className="font-body text-xs text-neutral-500">Premium Plant Marketplace. Bringing nature and modern living together.</p>
</div>
{/* Links Columns */}
<div className="col-span-1 md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
<div className="flex flex-col gap-3">
<a className="font-body text-xs text-neutral-500 hover:text-forest-600 hover:translate-x-1 transition-all duration-400 ease-out" href="#">Sustainability</a>
<a className="font-body text-xs text-neutral-500 hover:text-forest-600 hover:translate-x-1 transition-all duration-400 ease-out" href="#">Shipping Policy</a>
</div>
<div className="flex flex-col gap-3">
<a className="font-body text-xs text-neutral-500 hover:text-forest-600 hover:translate-x-1 transition-all duration-400 ease-out" href="#">Gift Cards</a>
<a className="font-body text-xs text-neutral-500 hover:text-forest-600 hover:translate-x-1 transition-all duration-400 ease-out" href="#">Careers</a>
</div>
<div className="flex flex-col gap-3">
<a className="font-body text-xs text-neutral-500 hover:text-forest-600 hover:translate-x-1 transition-all duration-400 ease-out" href="#">Terms of Service</a>
<a className="font-body text-xs text-neutral-500 hover:text-forest-600 hover:translate-x-1 transition-all duration-400 ease-out" href="#">Privacy</a>
</div>
</div>
{/* Copyright */}
<div className="col-span-1 md:col-span-3 pt-8 border-t border-neutral-200 mt-4 text-center">
<p className="font-body text-[11px] text-neutral-400">© <span id="year">2024</span> Botanic® Premium Plant Marketplace. All rights reserved.</p>
</div>
</div>
</footer>
{/* Simple interactive script for micro-interactions */}


    </>
  );
}
