import React from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <>

{/* TopNavBar Component */}
<nav className="fixed top-0 w-full z-50 bg-neutral-50/85 backdrop-blur-md shadow-sm border-b border-neutral-200">
<div className="flex justify-between items-center h-[72px] px-6 lg:px-12 max-w-[1400px] mx-auto">
{/* Brand */}
<a className="font-display text-[24px] font-extrabold text-forest-900 tracking-tight" href="#">Botanic</a>
{/* Desktop Nav */}
<div className="hidden md:flex items-center gap-2">
<a className="text-neutral-700 hover:text-forest-600 transition-colors font-body text-[16px] font-semibold px-4 py-1.5 rounded-full hover:bg-forest-100/50" href="#">Shop</a>
<a className="text-neutral-700 hover:text-forest-600 transition-colors font-body text-[16px] font-semibold px-4 py-1.5 rounded-full hover:bg-forest-100/50" href="#">Plant Care</a>
<Link className="text-neutral-700 hover:text-forest-600 transition-colors font-body text-[16px] font-semibold px-4 py-1.5 rounded-full hover:bg-forest-100/50" href="/about">About</Link>
<Link className="text-neutral-700 hover:text-forest-600 transition-colors font-body text-[16px] font-semibold px-4 py-1.5 rounded-full hover:bg-forest-100/50" href="/contact">Contact</Link>
</div>
{/* Actions */}
<div className="flex items-center gap-4 text-forest-800">
{/* Search on Right (Implicit via layout) */}
<button aria-label="Search" className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-forest-100/50 transition-colors">
<span className="material-symbols-outlined">search</span>
</button>
<button aria-label="shopping_cart" className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-forest-100/50 transition-colors">
<span className="material-symbols-outlined" data-icon="shopping_cart">shopping_cart</span>
</button>
{/* Active State Example for Profile */}
<button aria-label="account_circle" className="flex items-center justify-center w-10 h-10 rounded-full bg-forest-100 text-forest-700 scale-95 transition-transform duration-200">
<span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
</button>
</div>
</div>
</nav>
{/* Main Content */}
<main className="flex-grow w-full max-w-[1000px] mx-auto px-6 lg:px-12 py-12 md:py-20">
{/* Page Header */}
<div className="mb-12">
<h1 className="font-display text-[36px] md:text-[48px] font-bold text-forest-900 tracking-tight mb-2">Profile Settings</h1>
<p className="text-[16px] text-neutral-500">Manage your personal information and shipping details.</p>
</div>
{/* Profile Layout Grid */}
<div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 items-start">
{/* Left Sidebar / Avatar Section */}
<div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 flex flex-col items-center text-center">
<div className="relative mb-6 group cursor-pointer">
<img className="w-32 h-32 rounded-full object-cover border-4 border-forest-50 shadow-sm transition-transform duration-300 group-hover:scale-105" data-alt="A close up shot of a serene, elegantly styled user avatar placeholder. The image features a minimalist, soft green and warm terracotta background with subtle, organic leafy shadows cast across it. In the center is a pristine, smooth circular motif representing an empty profile picture slot, exuding a premium, modern light-mode aesthetic." src="/images/1065d90f7fd03916d0febd416b509101.png"/>
<button aria-label="Edit photo" className="absolute bottom-0 right-0 w-10 h-10 bg-white border border-neutral-200 rounded-full flex items-center justify-center shadow-sm text-forest-600 hover:bg-forest-50 transition-colors">
<span className="material-symbols-outlined text-[20px]">edit</span>
</button>
</div>
<h2 className="font-display text-[24px] font-bold text-neutral-900 mb-1">Eleanor Vance</h2>
<p className="text-[14px] text-neutral-500 mb-6 flex items-center gap-1 justify-center">
<span className="material-symbols-outlined text-[16px]">calendar_today</span>
                    Member since Oct 2023
                </p>
<div className="w-full h-px bg-neutral-200 mb-6"></div>
<nav className="w-full flex flex-col gap-2"><a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-forest-50 text-forest-800 font-semibold transition-colors" href="#">
<span className="material-symbols-outlined">person</span>
                        Profile Info
                    </a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors" href="#">
<span className="material-symbols-outlined">local_shipping</span>
                        Orders (Current &amp; Past)
                    </a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors" href="#">
<span className="material-symbols-outlined">favorite</span>
                        Wishlist
                    </a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors" href="#">
<span className="material-symbols-outlined">potted_plant</span>
                        Saved Plants
                    </a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-clay-600 hover:bg-clay-100 hover:text-clay-700 transition-colors mt-auto" href="#">
<span className="material-symbols-outlined">logout</span>
                        Sign Out
                    </a></nav>
</div>
{/* Form Section */}
<div className="space-y-8">
<form className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8 lg:p-10">
{/* Section 1: Personal Details */}
<div className="mb-10">
<h3 className="font-display text-[20px] font-bold text-neutral-900 mb-6 flex items-center gap-2 border-b border-neutral-200 pb-4">
<span className="material-symbols-outlined text-forest-600">badge</span>
                            Personal Details
                        </h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div>
<label className="label-premium" htmlFor="firstName">First Name</label>
<input className="input-premium" id="firstName" placeholder="e.g. Jane" type="text" value="Eleanor"/>
</div>
<div>
<label className="label-premium" htmlFor="lastName">Last Name</label>
<input className="input-premium" id="lastName" placeholder="e.g. Doe" type="text" value="Vance"/>
</div>
<div className="md:col-span-2">
<label className="label-premium" htmlFor="email">Email Address</label>
<input className="input-premium bg-neutral-50 text-neutral-500 cursor-not-allowed" disabled="" id="email" type="email" value="eleanor.vance@example.com"/>
<p className="text-[12px] text-neutral-500 mt-2">Email address cannot be changed. Contact support if needed.</p>
</div>
<div>
<label className="label-premium" htmlFor="phone">Phone Number</label>
<input className="input-premium" id="phone" placeholder="+1 (555) 000-0000" type="tel" value="+1 (555) 123-4567"/>
</div>
</div>
</div>
{/* Section 2: Shipping Address */}
<div>
<h3 className="font-display text-[20px] font-bold text-neutral-900 mb-6 flex items-center gap-2 border-b border-neutral-200 pb-4">
<span className="material-symbols-outlined text-forest-600">home_pin</span>
                            Default Shipping Address
                        </h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="md:col-span-2">
<label className="label-premium" htmlFor="address1">Address Line 1</label>
<input className="input-premium" id="address1" placeholder="Street address, P.O. box, etc." type="text" value="123 Botanica Way, Apt 4B"/>
</div>
<div className="md:col-span-2">
<label className="label-premium" htmlFor="address2">Address Line 2 (Optional)</label>
<input className="input-premium" id="address2" placeholder="Apartment, suite, unit, building, floor, etc." type="text"/>
</div>
<div>
<label className="label-premium" htmlFor="city">City</label>
<input className="input-premium" id="city" placeholder="e.g. Seattle" type="text" value="Portland"/>
</div>
<div>
<label className="label-premium" htmlFor="state">State / Province</label>
<div className="relative">
<select className="input-premium appearance-none pr-10" id="state">
<option value="">Select State</option>
<option selected="" value="OR">Oregon</option>
<option value="WA">Washington</option>
<option value="CA">California</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">expand_more</span>
</div>
</div>
<div>
<label className="label-premium" htmlFor="pincode">ZIP / Postal Code</label>
<input className="input-premium" id="pincode" placeholder="e.g. 90210" type="text" value="97204"/>
</div>
</div>
</div>
{/* Action */}
<div className="mt-10 pt-6 border-t border-neutral-200 flex justify-end">
<button className="bg-forest-800 text-white font-body text-[16px] font-semibold py-[14px] px-[32px] rounded-lg hover:bg-forest-700 hover:-translate-y-[2px] transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-4 focus:ring-forest-800/12" type="button">
                            Save Profile Information
                        </button>
</div>
</form>
</div>
</div>
</main>
{/* Footer Component */}
<footer className="w-full py-16 px-6 lg:px-12 bg-neutral-50 border-t border-neutral-200 mt-auto">
<div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-[1300px] mx-auto">
{/* Brand & Tagline */}
<div className="flex flex-col gap-4">
<span className="font-display text-[20px] font-bold text-forest-900">Botanic</span>
<p className="font-body text-[14px] text-neutral-500 max-w-sm">
                    Bringing the quiet luxury of nature into your home with premium, sustainably sourced greenery.
                </p>
<div className="flex gap-4 mt-2">
{/* Social Placeholders */}
<a className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-forest-800 hover:text-white transition-colors" href="#">
<span className="material-symbols-outlined text-[20px]">public</span>
</a>
</div>
</div>
{/* Links Column 1 */}
<div className="flex flex-col gap-3">
<h4 className="font-body text-[12px] font-bold text-neutral-700 uppercase tracking-wider mb-2">Explore</h4>
<a className="font-body text-[14px] text-neutral-500 hover:text-forest-600 transition-colors" href="#">Sustainability</a>
<a className="font-body text-[14px] text-neutral-500 hover:text-forest-600 transition-colors" href="#">FAQ</a>
</div>
{/* Links Column 2 */}
<div className="flex flex-col gap-3">
<h4 className="font-body text-[12px] font-bold text-neutral-700 uppercase tracking-wider mb-2">Legal</h4>
<a className="font-body text-[14px] text-neutral-500 hover:text-forest-600 transition-colors" href="#">Shipping Policy</a>
<a className="font-body text-[14px] text-neutral-500 hover:text-forest-600 transition-colors" href="#">Privacy Policy</a>
<a className="font-body text-[14px] text-neutral-500 hover:text-forest-600 transition-colors" href="#">Terms of Service</a>
</div>
</div>
{/* Bottom Bar */}
<div className="max-w-[1300px] mx-auto mt-16 pt-8 border-t border-neutral-200 flex justify-center">
<p className="font-body text-[12px] text-neutral-400">© 2024 Botanic Premium Greenery. All rights reserved.</p>
</div>
</footer>

    </>
  );
}
