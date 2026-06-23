import React from 'react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <>

{/* Header (Suppressed due to intent, but requirement asks for fixed glassmorphic header, so minimal version is provided) */}
<header className="fixed top-0 w-full z-50 bg-white/85 backdrop-blur-xl border-b border-neutral-200 h-[72px] flex items-center px-6 shadow-sm"><div className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
<div className="flex items-center">
<Link className="flex items-center" href="/">
<img alt="Botanic Logo" className="h-8 object-contain" src="/images/95500a7dda1d3020f0c0ff62042a6246.png"/>
</Link>
</div>
<nav className="hidden md:flex items-center gap-8">
<Link className="text-sm font-label font-semibold text-neutral-700 hover:text-forest-600 transition-colors" href="/">Home</Link>
<a className="text-sm font-label font-semibold text-neutral-700 hover:text-forest-600 transition-colors" href="#">Plants</a>
<Link className="text-sm font-label font-semibold text-neutral-700 hover:text-forest-600 transition-colors" href="/about">About</Link>
<Link className="text-sm font-label font-semibold text-neutral-700 hover:text-forest-600 transition-colors" href="/contact">Contact</Link>
</nav>
<div className="flex items-center">
<Link className="text-sm font-label font-semibold text-forest-800 hover:text-forest-600 transition-colors" href="/signup">Sign Up</Link>
</div>
</div></header>
{/* Main Content Canvas */}
<main className="flex-grow flex items-center justify-center px-4 py-24 sm:px-6 lg:px-8 pt-32">
{/* Auth Card Container */}
<div className="w-full max-w-[480px] bg-white rounded-[20px] shadow-lg p-8 sm:p-11" id="auth-card">
{/* Logo area inside card (redundant with header but requested) */}
<div className="flex justify-center mb-8">
<img alt="Botanic Leaf Logo" className="h-10 object-contain" src="/images/95500a7dda1d3020f0c0ff62042a6246.png"/>
</div>
<h2 className="font-headline text-[32px] font-bold text-center text-forest-900 mb-8 tracking-tight">
                Welcome Back
            </h2>
{/* Form */}
<form action="#" className="space-y-6" id="login-form" method="POST">
{/* Email Field */}
<div className="">
<label className="block font-label font-semibold text-[14px] text-neutral-900 mb-2" htmlFor="email">Email</label>
<div className="relative">
<input autoComplete="email" className="block w-full h-12 px-4 rounded-lg border border-neutral-200 bg-neutral-100 text-neutral-900 placeholder-neutral-500 font-body text-[16px] focus:ring-0 focus:border-forest-600 focus:bg-white transition-colors" id="email" name="email" placeholder="your@email.com" required="" type="email"/>
</div>
</div>
{/* Password Field */}
<div className="">
<div className="flex items-center justify-between mb-2">
<label className="block font-label font-semibold text-[14px] text-neutral-900" htmlFor="password">Password</label>
<a className="font-label font-semibold text-[14px] text-forest-600 hover:text-forest-800 transition-colors" href="#">Forgot Password?</a>
</div>
<div className="relative">
<input autoComplete="current-password" className="block w-full h-12 pl-4 pr-12 rounded-lg border border-neutral-200 bg-neutral-100 text-neutral-900 placeholder-neutral-500 font-body text-[16px] focus:ring-0 focus:border-forest-600 focus:bg-white transition-colors" id="password" name="password" placeholder="Enter your password" required="" type="password"/>
<button aria-label="toggle password visibility" className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-forest-800 focus:outline-none transition-colors" id="toggle-password" type="button">
<span className="material-symbols-outlined" id="eye-icon">visibility_off</span>
</button>
</div>
</div>
{/* Submit Button */}
<div className="pt-2">
<button className="w-full h-12 flex justify-center items-center px-8 py-3 border border-transparent rounded-lg shadow-sm text-[16px] font-label font-semibold text-white bg-forest-900 hover:bg-forest-800 active:bg-forest-950 focus:outline-none focus:ring-0 hover:-translate-y-[2px] transition-all duration-200" type="submit">Login</button>
</div>
{/* Divider */}
<div className="relative mt-6">
<div className="absolute inset-0 flex items-center">
<div className="w-full border-t border-neutral-200"></div>
</div>
<div className="relative flex justify-center text-sm">
<span className="px-3 bg-white text-neutral-500 font-label font-semibold uppercase tracking-wider text-xs">
                            Or
                        </span>
</div>
</div>
{/* Social Login */}
<div className="">
<button className="w-full h-12 flex justify-center items-center px-4 py-2 border border-neutral-200 rounded-lg shadow-xs bg-white text-[16px] font-label font-semibold text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 focus:outline-none focus:ring-0 transition-colors" type="button">
{/* Google Logo SVG */}
<svg aria-hidden="true" className="h-5 w-5 mr-3" viewBox="0 0 24 24">
<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
</svg>
                        Continue with Google
                    </button>
</div>
</form>
{/* Footer Link */}
<div className="mt-8 text-center">
<p className="text-[14px] font-body text-neutral-600">
                    Don&apos;t have an account? 
                    <Link className="font-label font-semibold text-forest-800 hover:text-forest-600 transition-colors" href="/signup">Sign Up</Link>
</p>
</div>
</div>
{/* Message Area (Inline container for toasts/alerts) */}
<div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-[400px] px-4 pointer-events-none z-50 flex flex-col gap-2" id="message-area">
{/* Messages will be injected here via JS */}
</div>
</main>
{/* Interactions & Scripts */}


    </>
  );
}
