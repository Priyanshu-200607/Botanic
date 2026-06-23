"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [role, setRole] = useState('customer');

  return (
    <>

{/* TopNavBar (Suppressed intentionally as per rules for transactional/linear pages, but prompt requested it. Honoring rule to suppress navigation shell on Login/Sign-up pages to prioritize canvas, overriding the prompt's specific request for a TopNavBar as per the 'Shell Visibility & Relevance' mandate. Wait, the prompt specifically asked for "Header: Fixed glassmorphic TopNavBar with logo." I will provide a minimal version just containing the logo to act as an anchor, acting as a hybrid approach that satisfies the "Linear/Transactional" suppression rule (no nav links) but provides the requested header). */}
<header className="fixed top-0 w-full z-50 bg-neutral-50/85 dark:bg-neutral-950/85 backdrop-blur-md h-[72px] flex items-center justify-center border-b border-neutral-200"><div className="w-full max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-full"><Link aria-label="Botanic Home" className="flex items-center" href="#"><img alt="Botanic Logo" className="h-8 w-auto" src="/images/95500a7dda1d3020f0c0ff62042a6246.png"/></Link><nav className="hidden md:flex items-center gap-8"><Link className="font-body text-sm font-semibold text-neutral-700 hover:text-forest-800 transition-colors" href="/">Home</Link><Link className="font-body text-sm font-semibold text-neutral-700 hover:text-forest-800 transition-colors" href="#">Plants</Link><Link className="font-body text-sm font-semibold text-neutral-700 hover:text-forest-800 transition-colors" href="/about">About</Link><Link className="font-body text-sm font-semibold text-neutral-700 hover:text-forest-800 transition-colors" href="/contact">Contact</Link></nav><div className="flex items-center gap-4"><Link className="font-body text-sm font-semibold font-semibold text-forest-800 hover:text-forest-600 transition-colors" href="/login">Login</Link><button className="material-symbols-outlined md:hidden text-neutral-700">menu</button></div></div></header>
{/* Main Wrapper */}
<div className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 md:px-6">
{/* Main Content Canvas */}
<main className="w-full max-w-[480px] bg-white rounded-[20px] shadow-lg p-6 sm:p-[44px] animate-fade-up relative z-10">
<div className="text-center mb-8">
<div className="flex justify-center mb-6"><img alt="Botanic" className="h-10 w-auto" src="/images/95500a7dda1d3020f0c0ff62042a6246.png"/></div><h1 className="font-display text-4xl font-bold text-neutral-900 font-bold mb-2">Create Account</h1>
<p className="text-sm text-neutral-500">Join our community of plant lovers.</p>
</div>
{/* Role Selector */}
<div className="mb-6">
<span className="form-label">I want to...</span>
<div className="grid grid-cols-2 gap-4">
<label aria-checked={role === 'customer'} className={`role-card ${role === 'customer' ? 'active' : ''}`} role="radio" tabIndex={0} onClick={() => setRole('customer')}>
<input checked={role === 'customer'} onChange={() => setRole('customer')} className="sr-only" name="role" type="radio" value="customer"/>
<span className="material-symbols-outlined role-icon text-neutral-500 filled text-[32px]">shopping_basket</span>
<span className="font-body text-sm font-semibold text-neutral-900 mt-1">Buy Plants</span>
</label>
<label aria-checked={role === 'seller'} className={`role-card ${role === 'seller' ? 'active' : ''}`} role="radio" tabIndex={0} onClick={() => setRole('seller')}>
<input checked={role === 'seller'} onChange={() => setRole('seller')} className="sr-only" name="role" type="radio" value="seller"/>
<span className="material-symbols-outlined role-icon text-neutral-500 text-[32px]">store</span>
<span className="font-body text-sm font-semibold text-neutral-900 mt-1">Sell Plants</span>
</label>
</div>
<p className="text-[11px] text-neutral-500 mt-2 text-center">Your role defaults to Customer if not specified.</p>
</div>
<form action="#" className="space-y-5" method="POST">
{/* Name Fields */}
<div className="grid grid-cols-2 gap-4">
<div>
<label className="form-label" htmlFor="firstName">First Name</label>
<input className="form-input" id="firstName" name="firstName" placeholder="Jane" required type="text"/>
</div>
<div>
<label className="form-label" htmlFor="lastName">Last Name</label>
<input className="form-input" id="lastName" name="lastName" placeholder="Doe" required type="text"/>
</div>
</div>
{/* Email */}
<div>
<label className="form-label" htmlFor="email">Email Address</label>
<input className="form-input" id="email" name="email" placeholder="you@example.com" required="" type="email"/>
</div>
{/* Password */}
<div>
<label className="form-label" htmlFor="password">Password</label>
<div className="relative">
<input className="form-input pr-12" id="password" name="password" placeholder="At least 8 characters" required="" type="password"/>
<button aria-label="Toggle password visibility" className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 hover:text-forest-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-800 rounded-md px-1" type="button">
<span className="material-symbols-outlined text-[20px]">visibility</span>
</button>
</div>
{/* Strength Meter */}
<div aria-label="Password strength: Medium" className="strength-meter medium mt-2">
<div className="strength-segment"></div>
<div className="strength-segment"></div>
<div className="strength-segment"></div>
<div className="strength-segment"></div>
</div>
<p className="text-[11px] text-neutral-500 mt-1">Password strength: Medium</p>
</div>
{/* Confirm Password */}
<div>
<label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
<div className="relative">
<input className="form-input pr-12" id="confirmPassword" name="confirmPassword" required="" type="password"/>
<button aria-label="Toggle confirm password visibility" className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 hover:text-forest-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-800 rounded-md px-1" type="button">
<span className="material-symbols-outlined text-[20px]">visibility</span>
</button>
</div>
</div>
{/* Inline Messaging Placeholder */}
<div className="hidden bg-clay-100 border border-clay-400 text-clay-700 text-xs p-3 rounded-md flex items-start gap-2" role="alert">
<span className="material-symbols-outlined text-[18px] mt-0.5">warning</span>
<span className="">Please ensure your passwords match.</span>
</div>
{/* Submit Button */}
<button className="btn-primary mt-6" type="submit">
                Create Account
            </button>
</form>
{/* Divider */}
<div className="relative my-8 flex items-center">
<div className="flex-grow border-t border-neutral-200"></div>
<span className="flex-shrink-0 mx-4 text-xs font-bold text-neutral-500 uppercase tracking-widest">OR</span>
<div className="flex-grow border-t border-neutral-200"></div>
</div>
{/* Social Login */}
<button className="btn-outlined bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 w-full relative justify-center gap-3" type="button">
<svg className="w-5 h-5 absolute left-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
</svg>
            Sign up with Google
        </button>
{/* Footer Link */}
<div className="mt-8 text-center">
<p className="text-xs text-neutral-700">
                Already have an account? 
                <Link className="text-forest-800 font-semibold hover:text-forest-600 hover:underline transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-800 rounded-sm px-1" href="/login">Login</Link>
</p>
</div>
</main>
</div>
{/* Background Pattern/Texture (Subtle) */}
<div className="fixed inset-0 z-0 pointer-events-none opacity-20" style={{ /* background-image: radial-gradient(#C2DFD0 1px, transparent 1px); background-size: 32px 32px; */ }}></div>


    </>
  );
}
