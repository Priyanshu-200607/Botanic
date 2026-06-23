import React from "react";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <>
      {/* TopNavBar (Shared Component) */}
      {/* Suppression Logic: Rendered because Checkout is a transactional flow, BUT the prompt explicitly requests "Fixed glassmorphic header (TopNavBar)". Following prompt instructions to include it, though technically it might be suppressed in a pure strict reading of the rules. We will render a simplified version for checkout. */}
      <header className="fixed top-0 w-full z-50 border-b border-neutral-200/50 shadow-sm bg-neutral-50/85 backdrop-blur-xl h-[72px]">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center h-full px-6 md:px-12">
          {/* Brand Logo */}
          <Link
            aria-label="Botanic Home"
            className="text-2xl font-extrabold tracking-tight text-forest-900 font-display flex items-center gap-2 group transition-transform duration-300 hover:scale-105"
            href="#"
          >
            <span
              className="material-symbols-outlined text-forest-600"
              data-weight="fill"
              style={
                {
                  /* font-variation-settings: 'FILL' 1; */
                }
              }
            >
              eco
            </span>
            Botanic
          </Link>
          {/* Secure Checkout Badge (Replaces navigation for focus) */}
          <div className="flex items-center gap-2 text-forest-800 bg-forest-100 rounded-full px-4 py-1.5 font-semibold text-[14px]">
            <span className="material-symbols-outlined text-[18px]">lock</span>
            <span>Secure Checkout</span>
          </div>
          {/* Close/Back Action (Since it&apos;s a checkout flow) */}
          <Link
            aria-label="Return to Cart"
            className="text-neutral-500 hover:text-forest-700 hover:bg-forest-100/50 rounded-full p-2 transition-all"
            href="#"
          >
            <span className="material-symbols-outlined">close</span>
          </Link>
        </div>
      </header>
      <main className="flex-grow">
        <div className="max-w-[1300px] mx-auto px-6 py-12 md:py-20 lg:py-24">
          {/* Progress Indicator */}
          <div className="mb-12 flex items-center justify-center">
            <div className="flex items-center space-x-2 md:space-x-4 text-[14px] font-semibold font-body">
              <span className="text-forest-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">
                  check_circle
                </span>
                Cart
              </span>
              <span className="w-8 md:w-12 h-px bg-forest-300"></span>
              <span className="text-forest-800 bg-forest-100 px-3 py-1 rounded-full flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-forest-600"></span>
                Checkout
              </span>
              <span className="w-8 md:w-12 h-px bg-neutral-200"></span>
              <span className="text-neutral-400">Confirmation</span>
            </div>
          </div>
          {/* Page Title */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="font-display text-[36px] md:text-[48px] font-bold text-forest-900 tracking-tight">
              Complete your order
            </h1>
            <p className="text-neutral-500 text-[16px] mt-2">
              You&apos;re just a few steps away from bringing nature home.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
            {/* Left Column (Form) */}
            <div className="w-full lg:w-3/5 space-y-12">
              {/* Contact Information */}
              <section className="bg-white p-6 md:p-8 rounded-xl border border-neutral-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-forest-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h2 className="font-display text-[24px] font-bold text-forest-900 mb-6 flex items-center gap-2">
                  <span className="bg-forest-100 text-forest-800 w-8 h-8 rounded-full flex items-center justify-center text-[14px]">
                    1
                  </span>
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email">Email address</label>
                    <input
                      id="email"
                      placeholder="hello@example.com"
                      required
                      type="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">Phone number</label>
                    <input
                      id="phone"
                      placeholder="+1 (555) 000-0000"
                      required
                      type="tel"
                    />
                  </div>
                </div>
              </section>
              {/* Shipping Address */}
              <section className="bg-white p-6 md:p-8 rounded-xl border border-neutral-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-forest-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h2 className="font-display text-[24px] font-bold text-forest-900 mb-6 flex items-center gap-2">
                  <span className="bg-forest-100 text-forest-800 w-8 h-8 rounded-full flex items-center justify-center text-[14px]">
                    2
                  </span>
                  Shipping Address
                </h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="fullName">Full name</label>
                    <input
                      id="fullName"
                      placeholder="Jane Doe"
                      required
                      type="text"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label htmlFor="address1">Address Line 1</label>
                      <input
                        id="address1"
                        placeholder="123 Garden Lane"
                        required
                        type="text"
                      />
                    </div>
                    <div>
                      <label htmlFor="address2">
                        Address Line 2 (Optional)
                      </label>
                      <input
                        id="address2"
                        placeholder="Apartment, suite, etc."
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="city">City</label>
                      <input
                        id="city"
                        placeholder="Portland"
                        required
                        type="text"
                      />
                    </div>
                    <div>
                      <label htmlFor="state">State / Province</label>
                      <input
                        id="state"
                        placeholder="Oregon"
                        required
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="zip">Postal Code</label>
                      <input
                        id="zip"
                        placeholder="97204"
                        required
                        type="text"
                      />
                    </div>
                    <div>
                      <label htmlFor="country">Country</label>
                      <div className="relative">
                        <select
                          className="appearance-none pr-10 cursor-pointer"
                          id="country"
                        >
                          <option value="us">United States</option>
                          <option value="ca">Canada</option>
                          <option value="uk">United Kingdom</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
                          expand_more
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* Delivery Method */}
              <section className="bg-white p-6 md:p-8 rounded-xl border border-neutral-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-forest-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h2 className="font-display text-[24px] font-bold text-forest-900 mb-6 flex items-center gap-2">
                  <span className="bg-forest-100 text-forest-800 w-8 h-8 rounded-full flex items-center justify-center text-[14px]">
                    3
                  </span>
                  Delivery Method
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Standard Delivery */}
                  <div className="relative">
                    <input
                      defaultChecked
                      className="radio-card-input sr-only"
                      id="delivery_standard"
                      name="delivery"
                      type="radio"
                    />
                    <label
                      className="radio-card-label block border border-neutral-200 rounded-xl p-5 cursor-pointer transition-all duration-300 hover:border-forest-300 h-full"
                      htmlFor="delivery_standard"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-forest-900 text-[16px]">
                          Standard Delivery
                        </span>
                        <span className="material-symbols-outlined text-neutral-300 radio-icon text-[24px]">
                          local_shipping
                        </span>
                      </div>
                      <p className="text-neutral-500 text-[14px] mb-4">
                        5-7 business days
                      </p>
                      <span className="inline-block bg-forest-100 text-forest-800 text-[12px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm">
                        Free
                      </span>
                    </label>
                  </div>
                  {/* Express Delivery */}
                  <div className="relative">
                    <input
                      className="radio-card-input sr-only"
                      id="delivery_express"
                      name="delivery"
                      type="radio"
                    />
                    <label
                      className="radio-card-label block border border-neutral-200 rounded-xl p-5 cursor-pointer transition-all duration-300 hover:border-forest-300 h-full"
                      htmlFor="delivery_express"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-forest-900 text-[16px]">
                          Express Delivery
                        </span>
                        <span className="material-symbols-outlined text-neutral-300 radio-icon text-[24px]">
                          rocket_launch
                        </span>
                      </div>
                      <p className="text-neutral-500 text-[14px] mb-4">
                        2-3 business days
                      </p>
                      <span className="inline-block bg-neutral-100 text-neutral-900 text-[14px] font-bold px-2 py-1 rounded-sm">
                        $9.99
                      </span>
                    </label>
                  </div>
                </div>
              </section>
              {/* Payment */}
              <section className="bg-white p-6 md:p-8 rounded-xl border border-neutral-200 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-forest-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                  <h2 className="font-display text-[24px] font-bold text-forest-900 flex items-center gap-2">
                    <span className="bg-forest-100 text-forest-800 w-8 h-8 rounded-full flex items-center justify-center text-[14px]">
                      4
                    </span>
                    Payment
                  </h2>
                  <div className="flex items-center gap-1 text-forest-600 bg-forest-50 px-3 py-1.5 rounded-full text-[12px] font-semibold">
                    <span className="material-symbols-outlined text-[16px]">
                      lock
                    </span>
                    Secure SSL
                  </div>
                </div>
                <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200 mb-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <label className="mb-0" htmlFor="cardNumber">
                          Card number
                        </label>
                        <div className="flex gap-2 text-neutral-400">
                          <span className="material-symbols-outlined text-[24px]">
                            credit_card
                          </span>
                        </div>
                      </div>
                      <div className="relative">
                        <input
                          className="pl-12"
                          id="cardNumber"
                          placeholder="0000 0000 0000 0000"
                          required
                          type="text"
                        />
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                          credit_card
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="expiry">Expiry date</label>
                        <input
                          id="expiry"
                          placeholder="MM/YY"
                          required
                          type="text"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvc">CVC</label>
                        <div className="relative">
                          <input
                            id="cvc"
                            placeholder="123"
                            required
                            type="text"
                          />
                          <span
                            className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 text-[18px] cursor-help"
                            title="3 digits on back of card"
                          >
                            info
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="nameOnCard">Name on card</label>
                      <input
                        id="nameOnCard"
                        placeholder="Jane Doe"
                        required
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
            {/* Right Column (Order Summary Sticky) */}
            <div className="w-full lg:w-2/5">
              <div className="sticky top-[100px]">
                <div className="bg-white border border-neutral-200 rounded-2xl shadow-lg p-6 md:p-8">
                  <h3 className="font-display text-[24px] font-bold text-forest-900 mb-6">
                    Order Summary
                  </h3>
                  {/* Items */}
                  <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                    {/* Item 1 */}
                    <div className="flex gap-4 group">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 border border-neutral-200">
                        <img
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          src="https://lh3.googleusercontent.com/aida/AP1WRLtDAWH600mJFMPpynms6aeKewy9ZC064PurHLSBcXmDVJ7XDGef-5Kd6gP_AK_0rj7CL75Ep_aMv0z7vUfMCxZ9NORVcshJi_JNXVDui39kkvmKzyN5ytml8VWTStDYERVVVxm8XihXg_bUVcN6b-dij2buS7BzeTy7xH9WZAy-k_Ea4T6WRd4brmEzPiboOEOs4L2LYRmD5BMHUDqDqn8gzBtEy_a_2myO5NzmgJXrxfzK8-dY"
                        />
                      </div>
                      <div className="flex-grow flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-neutral-900 text-[16px] leading-tight">
                              Rare Medicinal Bonsai
                            </h4>
                            <p className="text-neutral-500 text-[14px] mt-1">
                              Hand-crafted ceramic pot
                            </p>
                          </div>
                          <span className="font-bold text-forest-900 text-[16px]">
                            $425.00
                          </span>
                        </div>
                        <div className="text-neutral-500 text-[14px]">
                          Qty: 1
                        </div>
                      </div>
                    </div>
                    {/* Item 2 */}
                    <div className="flex gap-4 group">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 border border-neutral-200">
                        <img
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          src="https://lh3.googleusercontent.com/aida/AP1WRLtWsRhIn6jpQWisyX2PBLJNvNVG3QUv_ASHTf0F4OSwUVcEAxx51g35kT54Qdgy0pORuqi2yBo3NJ_n9Y49xwvvXsf3-K0NmAx1rvnj5QnAMQ7u6wMXhI9JBrpr4Mvq8k8AQ5Jxt5oBlLaKATPsAhi7ZZHbYoPgBbrq7Bo4aJ-WXORNm1L_sH_A-QjHoy7eOqjv8Gc-8qnUwOVQDenFthb24GRzsTcbCpsia1k5NRQhoBxCZF9hnZSFHweD"
                        />
                      </div>
                      <div className="flex-grow flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-neutral-900 text-[16px] leading-tight">
                              Monstera Deliciosa
                            </h4>
                            <p className="text-neutral-500 text-[14px] mt-1">
                              Large indoor plant
                            </p>
                          </div>
                          <span className="font-bold text-forest-900 text-[16px]">
                            $85.00
                          </span>
                        </div>
                        <div className="text-neutral-500 text-[14px]">
                          Qty: 1
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="border-neutral-200 mb-6" />
                  {/* Totals */}
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-neutral-700 text-[16px]">
                      <span>Subtotal</span>
                      <span className="font-semibold">$510.00</span>
                    </div>
                    <div className="flex justify-between text-neutral-700 text-[16px]">
                      <span>Delivery</span>
                      <span className="font-semibold text-forest-600">
                        Free
                      </span>
                    </div>
                    <div className="flex justify-between text-neutral-700 text-[16px]">
                      <span>Tax</span>
                      <span className="font-semibold">$18.40</span>
                    </div>
                    <div className="pt-4 border-t border-neutral-200 flex justify-between items-end mt-4">
                      <span className="font-display text-[20px] font-bold text-forest-900">
                        Grand Total
                      </span>
                      <span className="font-display text-[32px] font-extrabold text-forest-900">
                        $528.40
                      </span>
                    </div>
                  </div>
                  {/* Place Order Action */}
                  <button className="btn-checkout group mb-6">
                    Place Order • $528.40
                    <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                  {/* Trust Badges */}
                  <div className="grid grid-cols-3 gap-2 border-t border-neutral-200 pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-full bg-forest-50 text-forest-600 flex items-center justify-center mb-2">
                        <span className="material-symbols-outlined text-[20px]">
                          verified_user
                        </span>
                      </div>
                      <span className="text-[12px] font-semibold text-neutral-700">
                        SSL Secure
                      </span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-full bg-forest-50 text-forest-600 flex items-center justify-center mb-2">
                        <span className="material-symbols-outlined text-[20px]">
                          assignment_return
                        </span>
                      </div>
                      <span className="text-[12px] font-semibold text-neutral-700">
                        Free Returns
                      </span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-full bg-forest-50 text-forest-600 flex items-center justify-center mb-2">
                        <span className="material-symbols-outlined text-[20px]">
                          spa
                        </span>
                      </div>
                      <span className="text-[12px] font-semibold text-neutral-700">
                        Certified Plants
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer (Minimal for checkout flow to prevent distraction) */}
      <footer className="bg-neutral-50 border-t border-neutral-200 py-8 mt-auto w-full">
        <div className="max-w-[1300px] mx-auto px-6 text-center">
          <p className="text-neutral-500 text-[12px]">
            © Botanic® Premium Greenery. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
