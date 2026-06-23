import React from 'react';
import Link from 'next/link';

export default function ContactPage() {
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
<Link className="text-neutral-700 dark:text-neutral-300 hover:text-forest-600 transition-colors" href="/about">About</Link>
<Link className="text-forest-800 dark:text-forest-300 font-bold border-b-2 border-forest-800 pb-1" href="/contact">Contact</Link>
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
<Link href="/login" className="hidden md:block px-5 py-2 rounded-full border-1.5 border-forest-800 text-forest-800 font-semibold hover:bg-forest-800 hover:text-white transition-all text-sm flex items-center justify-center">Login</Link>
</div>
</header>
<main className="pt-[120px] pb-[120px] max-w-[1300px] mx-auto px-4 md:px-6">
{/* Section 1 (Hero/Header) */}
<section className="text-center mb-16 fade-in">
<h1 className="text-6xl font-extrabold font-headline text-forest-900 mb-4 relative inline-block">
                Get In Touch
                <span className="absolute -bottom-2 left-0 w-full h-[4px] bg-clay-500 rounded-full opacity-80"></span>
</h1>
<p className="text-lg text-neutral-700 max-w-2xl mx-auto mt-6">
                We would love to help you with any questions about our plants or orders.
            </p>
</section>
{/* Section 2 (Contact Info Top Row) */}
<section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 fade-in delay-100">
<div className="bg-forest-100 rounded-xl p-6 border border-forest-200 flex flex-col items-center text-center gap-4 hover:shadow-md transition-shadow duration-300 group">
<div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-forest-600">location_on</span>
</div>
<div>
<h3 className="text-lg font-semibold font-headline text-forest-900 mb-1">Our Address</h3>
<p className="text-sm text-neutral-700">123 Green Thumb Lane, Plantville PL 45678</p>
</div>
</div>
<a className="bg-forest-100 rounded-xl p-6 border border-forest-200 flex flex-col items-center text-center gap-4 hover:shadow-md transition-all duration-300 hover:border-forest-300 group" href="mailto:info@botanic.com">
<div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-forest-600">mail</span>
</div>
<div>
<h3 className="text-lg font-semibold font-headline text-forest-900 mb-1">Email Us</h3>
<p className="text-sm text-forest-700 group-hover:text-forest-800 font-medium">info@botanic.com</p>
</div>
</a>
<a className="bg-forest-100 rounded-xl p-6 border border-forest-200 flex flex-col items-center text-center gap-4 hover:shadow-md transition-all duration-300 hover:border-forest-300 group" href="tel:+1234567890">
<div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-forest-600">phone</span>
</div>
<div>
<h3 className="text-lg font-semibold font-headline text-forest-900 mb-1">Call Us</h3>
<p className="text-sm text-forest-700 group-hover:text-forest-800 font-medium">+1 234 567 890</p>
</div>
</a>
</section>

{/* Section 3 (Form and Map) */}
<section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-[120px]">
{/* Left Column (Contact Form) */}
<div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200 fade-in delay-200 flex flex-col">
<h2 className="text-2xl font-bold font-headline text-forest-900 mb-6">Send Us a Message</h2>
<form className="space-y-4 flex-grow flex flex-col" id="contactForm">
<div>
<label className="block text-sm font-semibold text-neutral-900 mb-1" htmlFor="fullName">Full Name</label>
<input className="w-full h-12 px-4 bg-neutral-100 border border-neutral-200 rounded-md text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-forest-600 focus:ring-0 focus:shadow-glow transition-shadow" id="fullName" name="fullName" placeholder="Jane Doe" required="" type="text"/>
</div>
<div>
<label className="block text-sm font-semibold text-neutral-900 mb-1" htmlFor="email">Email Address</label>
<input className="w-full h-12 px-4 bg-neutral-100 border border-neutral-200 rounded-md text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-forest-600 focus:ring-0 focus:shadow-glow transition-shadow" id="email" name="email" placeholder="jane@example.com" required="" type="email"/>
</div>
<div>
<label className="block text-sm font-semibold text-neutral-900 mb-1" htmlFor="subject">Subject</label>
<input className="w-full h-12 px-4 bg-neutral-100 border border-neutral-200 rounded-md text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-forest-600 focus:ring-0 focus:shadow-glow transition-shadow" id="subject" name="subject" placeholder="How can we help?" required="" type="text"/>
</div>
<div className="flex-grow">
<label className="block text-sm font-semibold text-neutral-900 mb-1" htmlFor="message">Message</label>
<textarea className="w-full h-full min-h-[120px] p-4 bg-neutral-100 border border-neutral-200 rounded-md text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-forest-600 focus:ring-0 focus:shadow-glow transition-shadow resize-y" id="message" minLength="10" name="message" placeholder="Type your message here..." required=""></textarea>
</div>
<button className="w-full h-12 mt-4 bg-forest-800 text-white rounded-md text-base font-semibold hover:bg-forest-700 hover:-translate-y-0.5 active:bg-forest-900 transition-all duration-200 flex items-center justify-center gap-2 group shrink-0" type="submit">
                        Submit Message
                        <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">send</span>
</button>
{/* Feedback Message Placeholder (Hidden by default) */}
<div className="hidden rounded-md p-4 flex items-start gap-3 mt-4 text-xs" id="formFeedback">
<span className="material-symbols-outlined shrink-0" id="feedbackIcon"></span>
<p id="feedbackText"></p>
</div>
</form>
</div>

{/* Right Column (Map) */}
<div className="w-full h-full min-h-[480px] rounded-2xl overflow-hidden shadow-sm border border-neutral-200 relative bg-neutral-100 group fade-in delay-300">
<h2 className="sr-only">Map showing Botanic store location in Jaipur</h2>
<img alt="A map showing the location of the Botanic store" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 absolute inset-0" data-alt="A stylized, light-mode digital map highlighting a specific location in Jaipur. The map features soft, muted tones of pale greens and warm neutrals, aligning with a premium, organic botanical brand identity. A distinctive forest green marker pinpoints the store's location amidst simplified, elegant street grids." data-location="Jaipur, India" src="/images/2413deb5b3d2e8b6e0c63d75bd0eebef.png"/>
{/* Map Overlay Overlay for UX */}
<div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-forest-900/40 to-transparent flex items-end p-8">
<div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20 pointer-events-auto w-full">
<h3 className="text-base font-semibold font-headline text-forest-900 flex items-center gap-2">
<span className="material-symbols-outlined text-forest-600 text-[18px]" data-weight="fill">storefront</span>
                             Jaipur Flagship Store
                         </h3>
<p className="text-xs text-neutral-600 mt-1">Open Mon-Sat, 10am - 7pm</p>
</div>
</div>
</div>
</section>
</main>
{/* Footer */}
<footer className="w-full bg-neutral-50 border-t border-neutral-200 pt-16 pb-8">
<div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6 max-w-[1300px] mx-auto mb-12">
<div>
<a className="text-xl font-headline font-bold text-forest-900 mb-4 inline-block flex items-center gap-2" href="#">
<span className="material-symbols-outlined text-forest-600" data-weight="fill">local_florist</span>
                    Botanic
                </a>
<p className="text-xs text-neutral-500 max-w-xs mt-4">
                    Cultivating tranquility and beauty in every space. Premium plants for the modern home.
                </p>
<div className="flex gap-4 mt-6">
<a aria-label="Instagram" className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-forest-800 hover:text-white transition-colors duration-300" href="#">
<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" fillRule="evenodd" /></svg>
</a>
</div>
</div>
<div>
<h4 className="text-xs font-bold font-label font-bold uppercase tracking-wider text-neutral-700 mb-6">Company</h4>
<ul className="space-y-4">
<li><Link className="text-xs text-neutral-500 hover:text-forest-600 hover:translate-x-1 transition-all inline-block" href="/about">About Us</Link></li>
<li><a className="text-xs text-neutral-500 hover:text-forest-600 hover:translate-x-1 transition-all inline-block" href="#">Sustainability</a></li>
<li><Link className="text-xs text-forest-800 font-bold" href="/contact">Contact</Link></li>
</ul>
</div>
<div>
<h4 className="text-xs font-bold font-label font-bold uppercase tracking-wider text-neutral-700 mb-6">Support</h4>
<ul className="space-y-4">
<li><a className="text-xs text-neutral-500 hover:text-forest-600 hover:translate-x-1 transition-all inline-block" href="#">Shipping Info</a></li>
<li><a className="text-xs text-neutral-500 hover:text-forest-600 hover:translate-x-1 transition-all inline-block" href="#">Privacy Policy</a></li>
<li><a className="text-xs text-neutral-500 hover:text-forest-600 hover:translate-x-1 transition-all inline-block" href="#">Terms of Service</a></li>
</ul>
</div>
</div>
<div className="px-6 max-w-[1300px] mx-auto pt-8 border-t border-neutral-200 text-center">
<p className="text-[11px] text-neutral-400">© <span id="currentYear"></span> Botanic Premium Plant Marketplace. All rights reserved.</p>
</div>
</footer>


    </>
  );
}
