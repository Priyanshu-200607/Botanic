import React from "react";
import Link from "next/link";

export default function AdminPage() {
  return (
    <>
    <div className="bg-neutral-50 min-h-screen text-body-md font-body antialiased flex overflow-hidden h-screen w-full">
{/* Sidebar Navigation */}
<aside className="w-72 bg-white border-r border-neutral-200 hidden md:flex flex-col sticky top-0 h-screen z-50">
<div className="p-8 border-b border-neutral-100 flex items-center justify-center">
<img alt="Botanic Logo" className="h-10 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNEvmkhi7unLEoFfnl3fU54infwe30QkcWdvwubhHXY34J3HLI0L0KVpO4oEzxutf8v2R8HJQa_1SOygObu9VoPjNNzjSCPlUuuk0DHkGiaRplll17AlbVczn9L7MI8xF5Df69C0QX63C-lXCeAPySXtOT9JvTnOrzi133p5gY5cFfYvy1Uq_inyR5mOdyx77P1edczgLCUj9ZJLeptaUvXb2uJqLd-Vikfel3EGrLVMY3JnbUwiNCwITJOI5GtA6tawT7FXz6gh5k"/>
</div>
<nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
<div className="px-4 mb-4 text-[11px] font-bold uppercase tracking-widest text-neutral-500">Navigation</div>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-forest-800 active-nav transition-all duration-200 group" href="#">
<span className="material-symbols-outlined text-xl">dashboard</span>
<span className="text-sm">Dashboard Overview</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-500 hover:bg-forest-50 hover:text-forest-700 transition-all duration-200 group" href="#">
<span className="material-symbols-outlined text-xl">person_add</span>
<span className="text-sm">Seller Requests</span>
<span className="ml-auto bg-clay-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">12</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-500 hover:bg-forest-50 hover:text-forest-700 transition-all duration-200 group" href="#">
<span className="material-symbols-outlined text-xl">storefront</span>
<span className="text-sm">Manage Stores</span>
</a>
<div className="px-4 mt-8 mb-4 text-[11px] font-bold uppercase tracking-widest text-neutral-500">Administration</div>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-500 hover:bg-forest-50 hover:text-forest-700 transition-all duration-200 group" href="#">
<span className="material-symbols-outlined text-xl">payments</span>
<span className="text-sm">Financials</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-500 hover:bg-forest-50 hover:text-forest-700 transition-all duration-200 group" href="#">
<span className="material-symbols-outlined text-xl">settings</span>
<span className="text-sm">System Settings</span>
</a>
</nav>
<div className="p-6 border-t border-neutral-100 bg-neutral-50/50">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-forest-800 flex items-center justify-center text-white font-bold overflow-hidden border-2 border-forest-100">
<img className="w-full h-full object-cover" data-alt="A professional headshot of a middle-aged woman with dark hair and glasses, wearing a sleek business-casual forest green blazer. The background is a brightly lit, high-end botanical conservatory with blurred foliage, matching the Botanic marketplace's premium organic luxury aesthetic. High-quality portrait photography with soft rim lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyfH6tspgrOYzsXSCEjazLsuYJZwPz3z2Tq3Hfp_WOTI4NSKqFsLIvDmX65MHgKnlfMTiKYUdUYyNGzkzrZyFB6KLnPq0sXX8TOU7wX9uQMsOzMQVmwrai536UTDDw-Js5_BoXjuq3uRUciBAP5Da65_HIyfT7OEx_S_CsrfnufddQnkwCUJ9agUft2YmcJma2VEsv5huSphhDus0u77NkoJKgcxrT30BlIAhkBsQ-V_hwiBMNLVHCjJ8gvangDolkf9c0svEW6Uct"/>
</div>
<div className="overflow-hidden">
<p className="text-xs font-bold text-neutral-900 truncate">Admin Elizabeth</p>
<p className="text-[10px] text-neutral-500 truncate">Platform Supervisor</p>
</div>
<button className="ml-auto text-neutral-400 hover:text-clay-600 transition-colors">
<span className="material-symbols-outlined text-lg">logout</span>
</button>
</div>
</div>
</aside>
{/* Main Content Area */}
<main className="flex-1 flex flex-col min-w-0 bg-neutral-50 overflow-y-auto">
{/* Top Bar */}
<header className="h-20 bg-white/80 backdrop-blur-md border-b border-neutral-200 flex items-center justify-between px-8 sticky top-0 z-40">
<div className="flex items-center gap-4">
<button className="md:hidden p-2 text-neutral-600">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="text-xl font-display font-bold text-neutral-900">Marketplace Control Center</h1>
</div>
<div className="flex items-center gap-6">
<div className="relative hidden lg:block">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">search</span>
<input className="bg-neutral-100 border-none rounded-full pl-10 pr-6 py-2 text-sm w-80 focus:ring-2 focus:ring-forest-500 transition-all" placeholder="Search stores, sellers, orders..." type="text"/>
</div>
<div className="flex items-center gap-2">
<button className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-600 hover:bg-forest-50 hover:text-forest-800 transition-all">
<span className="material-symbols-outlined">notifications</span>
</button>
<button className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-600 hover:bg-forest-50 hover:text-forest-800 transition-all">
<span className="material-symbols-outlined">help_outline</span>
</button>
</div>
</div>
</header>
<div className="p-8 max-w-7xl mx-auto w-full space-y-10">
{/* Analytics Overview */}
<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
{/* Stat Card 1 */}
<div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow group">
<div className="flex justify-between items-start mb-4">
<div className="w-12 h-12 rounded-lg bg-forest-100 flex items-center justify-center text-forest-700">
<span className="material-symbols-outlined text-2xl">eco</span>
</div>
<span className="text-xs font-bold text-forest-600 bg-forest-50 px-2 py-1 rounded-pill">+4.2%</span>
</div>
<p className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 mb-1">Total Active Stores</p>
<h3 className="text-3xl font-display font-extrabold text-neutral-900">1,284</h3>
</div>
{/* Stat Card 2 */}
<div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
<div className="flex justify-between items-start mb-4">
<div className="w-12 h-12 rounded-lg bg-gold-100 flex items-center justify-center text-gold-700">
<span className="material-symbols-outlined text-2xl">hourglass_empty</span>
</div>
<span className="text-xs font-bold text-gold-600 bg-gold-50 px-2 py-1 rounded-pill">Urgent</span>
</div>
<p className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 mb-1">Pending Requests</p>
<h3 className="text-3xl font-display font-extrabold text-neutral-900">12</h3>
</div>
{/* Stat Card 3 */}
<div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
<div className="flex justify-between items-start mb-4">
<div className="w-12 h-12 rounded-lg bg-forest-800 flex items-center justify-center text-white">
<span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
</div>
<span className="text-xs font-bold text-forest-600 bg-forest-50 px-2 py-1 rounded-pill">+12.5%</span>
</div>
<p className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 mb-1">Platform Revenue</p>
<h3 className="text-3xl font-display font-extrabold text-neutral-900">$42,900</h3>
</div>
{/* Stat Card 4 */}
<div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
<div className="flex justify-between items-start mb-4">
<div className="w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700">
<span className="material-symbols-outlined text-2xl">inventory_2</span>
</div>
<span className="text-xs font-bold text-neutral-400 bg-neutral-50 px-2 py-1 rounded-pill">Updated Now</span>
</div>
<p className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 mb-1">Total Inventory</p>
<h3 className="text-3xl font-display font-extrabold text-neutral-900">84.2k</h3>
</div>
</section>
{/* Seller Approval Queue */}
<section className="space-y-6">
<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<span className="w-2 h-8 bg-forest-800 rounded-full"></span>
<h2 className="text-xl font-display font-bold text-neutral-900">Seller Approval Queue</h2>
</div>
<a className="text-sm font-bold text-forest-700 hover:underline" href="#">View History</a>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{/* Request Card 1 */}
<div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 space-y-4 hover:border-forest-200 transition-colors">
<div className="flex items-start justify-between">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-lg bg-forest-50 flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover" data-alt="A macro studio shot of a vibrant pink variegated Monstera leaf with clean artistic studio lighting. The aesthetic is ultra-premium botanical photography against a clean soft-beige background, reflecting the organic luxury of a high-end plant boutique brand on the Botanic platform." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXCzF5LtYQJdFC4cyqUmp5FUzLNIRJTT8J_9S8tdz2ViiEukwCTeTelBccwI30HAJH_w4s4hOL41AvbuRQVp7c9qlsNBF0Vy-7wf9gRtRn4ufATCsOd7TUdcUW0zoAKNLZzBPpGj0mmpl9ASnz4dmTZEPPtHC65HTvyAGfEYYpZp8hGkQ3o_9l8tVR4ZpE66PU7ygLSeoUzkCF9m5r2Vf4zAQM2rfwYd6DqPPwbBJcCCmgrhmeIcmQe-Ys9UVyTvoQkB0Io6xyUypj"/>
</div>
<div>
<h4 className="font-bold text-neutral-900 text-sm">Verdant Visions</h4>
<p className="text-xs text-neutral-500">Julian Moss</p>
</div>
</div>
<span className="text-[10px] font-bold uppercase text-forest-600 bg-forest-50 px-2 py-1 rounded">Applied 2h ago</span>
</div>
<div className="grid grid-cols-2 gap-4 py-3 border-y border-neutral-100">
<div>
<p className="text-[10px] text-neutral-400 uppercase font-bold tracking-tighter">Inventory Size</p>
<p className="text-xs font-semibold text-neutral-800">45 Species</p>
</div>
<div>
<p className="text-[10px] text-neutral-400 uppercase font-bold tracking-tighter">Payment Status</p>
<p className="text-xs font-semibold text-forest-700 flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">check_circle</span> Verified
                                </p>
</div>
</div>
<div className="flex gap-3 pt-2">
<button className="flex-1 py-2 rounded-lg border-2 border-forest-800 text-forest-800 text-xs font-bold hover:bg-forest-800 hover:text-white transition-all active:scale-95">Accept</button>
<button className="flex-1 py-2 rounded-lg border border-neutral-200 text-clay-700 text-xs font-bold hover:bg-clay-50 transition-all active:scale-95">Reject</button>
</div>
</div>
{/* Request Card 2 */}
<div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 space-y-4 hover:border-forest-200 transition-colors">
<div className="flex items-start justify-between">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-lg bg-forest-50 flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover" data-alt="A modern minimalist terracotta plant pot with a sculptural Pilea plant inside. The lighting is warm morning sunlight with soft shadows against a concrete wall. The image represents a modern urban garden shop seeking to join the Botanic premium marketplace." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXCPFIhjKJ1dPuwTCxS__W4PtHf_I05jsqxeJ6Cu9QtZOrM5M_k9Rt3UZSZz2JyNwsNjcIq-Gsq-NNTI2svHuehf9sdYqqDgwbI6yU_5eTFrNceYwQ9ozX0w04cpGUnyXhQ9OF0kIUSvf7o2vSz2hUyRp3C0uDybKs6egYAQ65chJx9BmU80UlWXwboSbYgkTmJ10vQZ0zc3uQdwWMYt5g8cB4bqIxkG7_QWngRdc3kGFw-vVckmzEDjiN5vdAtGh8kwwGMsuiiUJC"/>
</div>
<div>
<h4 className="font-bold text-neutral-900 text-sm">Terracotta Tales</h4>
<p className="text-xs text-neutral-500">Elena Thorne</p>
</div>
</div>
<span className="text-[10px] font-bold uppercase text-neutral-500 bg-neutral-100 px-2 py-1 rounded">Applied 5h ago</span>
</div>
<div className="grid grid-cols-2 gap-4 py-3 border-y border-neutral-100">
<div>
<p className="text-[10px] text-neutral-400 uppercase font-bold tracking-tighter">Inventory Size</p>
<p className="text-xs font-semibold text-neutral-800">12 Species</p>
</div>
<div>
<p className="text-[10px] text-neutral-400 uppercase font-bold tracking-tighter">Payment Status</p>
<p className="text-xs font-semibold text-gold-600 flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">info</span> Pending
                                </p>
</div>
</div>
<div className="flex gap-3 pt-2">
<button className="flex-1 py-2 rounded-lg border-2 border-forest-800 text-forest-800 text-xs font-bold hover:bg-forest-800 hover:text-white transition-all active:scale-95">Accept</button>
<button className="flex-1 py-2 rounded-lg border border-neutral-200 text-clay-700 text-xs font-bold hover:bg-clay-50 transition-all active:scale-95">Reject</button>
</div>
</div>
{/* Request Card 3 */}
<div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 space-y-4 hover:border-forest-200 transition-colors">
<div className="flex items-start justify-between">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-lg bg-forest-50 flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover" data-alt="A dense collection of lush green ferns and mosses in a dark wood planter. Moody canopy lighting filters through the fronds. Representing a high-end exotic greenhouse specialized in rare forest floor plants applying for store status." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4AroF8y_TzX3lVlLiTzO6PGg9RMyVgHKLUaOMr3CSYnFLZ29xkmPMXV6uOHA8zbb2PrThkUOqqRUOPW93oV948A9RDaUq05iVObaFKTUKr5Xz4iH0z5MsMONw1wo7wBvn6AvNLFjShGZiAsF6EYpfuppEa-Xv1k49o_pWv3TxpMRDi9cMW0WGXTsrHNKUiK9PQ-DnfSzR_Wxb8p8BHE2wXCN__pT6O3gOg9MHCtIQARfB8JhXgT7179cP0xqbyVFOloXTLOUMY0Wb"/>
</div>
<div>
<h4 className="font-bold text-neutral-900 text-sm">Moss &amp; Majesty</h4>
<p className="text-xs text-neutral-500">Silas Fern</p>
</div>
</div>
<span className="text-[10px] font-bold uppercase text-neutral-500 bg-neutral-100 px-2 py-1 rounded">Applied yesterday</span>
</div>
<div className="grid grid-cols-2 gap-4 py-3 border-y border-neutral-100">
<div>
<p className="text-[10px] text-neutral-400 uppercase font-bold tracking-tighter">Inventory Size</p>
<p className="text-xs font-semibold text-neutral-800">82 Species</p>
</div>
<div>
<p className="text-[10px] text-neutral-400 uppercase font-bold tracking-tighter">Payment Status</p>
<p className="text-xs font-semibold text-forest-700 flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">check_circle</span> Verified
                                </p>
</div>
</div>
<div className="flex gap-3 pt-2">
<button className="flex-1 py-2 rounded-lg border-2 border-forest-800 text-forest-800 text-xs font-bold hover:bg-forest-800 hover:text-white transition-all active:scale-95">Accept</button>
<button className="flex-1 py-2 rounded-lg border border-neutral-200 text-clay-700 text-xs font-bold hover:bg-clay-50 transition-all active:scale-95">Reject</button>
</div>
</div>
</div>
</section>
{/* Store Management Table */}
<section className="space-y-6">
<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<span className="w-2 h-8 bg-forest-800 rounded-full"></span>
<h2 className="text-xl font-display font-bold text-neutral-900">Active Store Management</h2>
</div>
<div className="flex gap-2">
<button className="bg-white border border-neutral-200 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-neutral-50 transition-colors">
<span className="material-symbols-outlined text-sm">filter_list</span> Filter
                        </button>
<button className="bg-white border border-neutral-200 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-neutral-50 transition-colors">
<span className="material-symbols-outlined text-sm">download</span> Export CSV
                        </button>
</div>
</div>
<div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-neutral-50/50 border-b border-neutral-100">
<th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-neutral-500">Store Name</th>
<th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-neutral-500">Plant Listings</th>
<th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-neutral-500">Monthly Sales</th>
<th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-neutral-500">Payment Status</th>
<th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-neutral-500">Growth</th>
<th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-neutral-500 text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-neutral-100">
{/* Row 1 */}
<tr className="hover:bg-forest-50/30 transition-colors group">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-forest-100 flex items-center justify-center text-forest-800 text-[10px] font-bold">BN</div>
<div>
<p className="text-sm font-bold text-neutral-900">Botanical Nirvana</p>
<p className="text-[11px] text-neutral-500">Owner: Sarah Green</p>
</div>
</div>
</td>
<td className="px-6 py-4 text-sm text-neutral-700">412</td>
<td className="px-6 py-4 text-sm font-bold text-neutral-900">$12,450</td>
<td className="px-6 py-4">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-forest-100 text-forest-800">
                                            Current
                                        </span>
</td>
<td className="px-6 py-4">
<div className="w-24 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
<div className="h-full bg-forest-600 rounded-full" style={{ /* width: 75% */ }}></div>
</div>
</td>
<td className="px-6 py-4 text-right">
<div className="flex justify-end gap-2">
<button className="p-2 text-neutral-400 hover:text-gold-600 transition-colors" title="Suspend">
<span className="material-symbols-outlined text-lg">pause_circle</span>
</button>
<button className="p-2 text-neutral-400 hover:text-clay-700 transition-colors" title="Terminate">
<span className="material-symbols-outlined text-lg">cancel</span>
</button>
<button className="p-2 text-neutral-400 hover:text-forest-800 transition-colors">
<span className="material-symbols-outlined text-lg">more_vert</span>
</button>
</div>
</td>
</tr>
{/* Row 2 */}
<tr className="hover:bg-forest-50/30 transition-colors group">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-gold-100 flex items-center justify-center text-gold-800 text-[10px] font-bold">OP</div>
<div>
<p className="text-sm font-bold text-neutral-900">Organic Palms</p>
<p className="text-[11px] text-neutral-500">Owner: David Root</p>
</div>
</div>
</td>
<td className="px-6 py-4 text-sm text-neutral-700">182</td>
<td className="px-6 py-4 text-sm font-bold text-neutral-900">$5,200</td>
<td className="px-6 py-4">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-forest-100 text-forest-800">
                                            Current
                                        </span>
</td>
<td className="px-6 py-4">
<div className="w-24 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
<div className="h-full bg-forest-600 rounded-full" style={{ /* width: 45% */ }}></div>
</div>
</td>
<td className="px-6 py-4 text-right">
<div className="flex justify-end gap-2">
<button className="p-2 text-neutral-400 hover:text-gold-600 transition-colors" title="Suspend">
<span className="material-symbols-outlined text-lg">pause_circle</span>
</button>
<button className="p-2 text-neutral-400 hover:text-clay-700 transition-colors" title="Terminate">
<span className="material-symbols-outlined text-lg">cancel</span>
</button>
<button className="p-2 text-neutral-400 hover:text-forest-800 transition-colors">
<span className="material-symbols-outlined text-lg">more_vert</span>
</button>
</div>
</td>
</tr>
{/* Row 3 */}
<tr className="hover:bg-forest-50/30 transition-colors group">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-neutral-100 flex items-center justify-center text-neutral-800 text-[10px] font-bold">LG</div>
<div>
<p className="text-sm font-bold text-neutral-900">Leafy Loft</p>
<p className="text-[11px] text-neutral-500">Owner: Mia Sprout</p>
</div>
</div>
</td>
<td className="px-6 py-4 text-sm text-neutral-700">94</td>
<td className="px-6 py-4 text-sm font-bold text-neutral-900">$2,100</td>
<td className="px-6 py-4">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold-100 text-gold-800">
                                            Late Payment
                                        </span>
</td>
<td className="px-6 py-4">
<div className="w-24 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
<div className="h-full bg-clay-500 rounded-full" style={{ /* width: 12% */ }}></div>
</div>
</td>
<td className="px-6 py-4 text-right">
<div className="flex justify-end gap-2">
<button className="p-2 text-neutral-400 hover:text-gold-600 transition-colors" title="Suspend">
<span className="material-symbols-outlined text-lg">pause_circle</span>
</button>
<button className="p-2 text-neutral-400 hover:text-clay-700 transition-colors" title="Terminate">
<span className="material-symbols-outlined text-lg">cancel</span>
</button>
<button className="p-2 text-neutral-400 hover:text-forest-800 transition-colors">
<span className="material-symbols-outlined text-lg">more_vert</span>
</button>
</div>
</td>
</tr>
{/* Row 4 */}
<tr className="hover:bg-forest-50/30 transition-colors group">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-forest-800 flex items-center justify-center text-white text-[10px] font-bold">EG</div>
<div>
<p className="text-sm font-bold text-neutral-900">Evergreen Emporium</p>
<p className="text-[11px] text-neutral-500">Owner: Thomas Pine</p>
</div>
</div>
</td>
<td className="px-6 py-4 text-sm text-neutral-700">1,204</td>
<td className="px-6 py-4 text-sm font-bold text-neutral-900">$28,940</td>
<td className="px-6 py-4">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-forest-100 text-forest-800">
                                            Premium
                                        </span>
</td>
<td className="px-6 py-4">
<div className="w-24 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
<div className="h-full bg-forest-600 rounded-full" style={{ /* width: 95% */ }}></div>
</div>
</td>
<td className="px-6 py-4 text-right">
<div className="flex justify-end gap-2">
<button className="p-2 text-neutral-400 hover:text-gold-600 transition-colors" title="Suspend">
<span className="material-symbols-outlined text-lg">pause_circle</span>
</button>
<button className="p-2 text-neutral-400 hover:text-clay-700 transition-colors" title="Terminate">
<span className="material-symbols-outlined text-lg">cancel</span>
</button>
<button className="p-2 text-neutral-400 hover:text-forest-800 transition-colors">
<span className="material-symbols-outlined text-lg">more_vert</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
<div className="p-4 bg-neutral-50/80 border-t border-neutral-100 flex items-center justify-between">
<p className="text-xs text-neutral-500 font-medium">Showing 4 of 1,284 active stores</p>
<div className="flex gap-2">
<button className="p-2 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors">
<span className="material-symbols-outlined text-sm">chevron_left</span>
</button>
<button className="p-2 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors">
<span className="material-symbols-outlined text-sm">chevron_right</span>
</button>
</div>
</div>
</div>
</section>
{/* System Status Footer */}
<footer className="pt-10 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-6">
<div className="flex items-center gap-6 text-xs font-bold text-neutral-500 uppercase tracking-widest">
<span className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-forest-600 animate-pulse"></span>
                        Platform Stable
                    </span>
<span className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-forest-600"></span>
                        Stripe API: Connected
                    </span>
<span className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-forest-600"></span>
                        CDN Status: Optimal
                    </span>
</div>
<p className="text-xs text-neutral-400 font-medium italic">
                    Last sync: <span id="timestamp">Just now</span>
</p>
</footer>
</div>
</main>
{/* Floating Action for Quick Add (Only on relevant screens) */}
<button className="fixed bottom-8 right-8 w-14 h-14 bg-forest-800 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-90 transition-all duration-300 z-50 group">
<span className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform duration-500">add</span>
<div className="absolute right-full mr-4 bg-forest-950 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity translate-x-4 group-hover:translate-x-0">
            Quick Platform Action
        </div>
</button>


    </div>
    </>
  );
}
