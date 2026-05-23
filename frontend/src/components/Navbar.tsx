'use client'

import React, { useState, useEffect } from 'react'
import { Heart, ShoppingCart, Menu, X } from "lucide-react"

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    // Scroll Shadow
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false)
            }
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <>
            {/* Navbar */}
            <nav
                className={`
                fixed top-0 left-0 w-full z-50
                h-20
                flex items-center justify-between
                px-5 sm:px-8 lg:px-14
                bg-[var(--bg)]/90 backdrop-blur-md
                border-b border-[var(--secondary-bg)]
                transition-all duration-300
                ${isScrolled ? 'shadow-md shadow-black/5' : ''}
                `}
            >

                {/* LEFT */}
                <div className="flex items-center gap-6 lg:gap-14">

                    {/* Logo */}
                    <div className="shrink-0">
                        <img
                            src="/ZetozzLogo.png"
                            alt="Zetozz Logo"
                            className="h-11 lg:h-12 w-auto object-contain"
                        />
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8 xl:gap-10">

                        <a
                            href="#"
                            className="relative text-[var(--text)] font-medium hover:text-[var(--primary)] transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[var(--primary)] after:transition-all after:duration-300 hover:after:w-full"
                        >
                            Home
                        </a>

                        <a
                            href="#"
                            className="relative text-[var(--text)] font-medium hover:text-[var(--primary)] transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[var(--primary)] after:transition-all after:duration-300 hover:after:w-full"
                        >
                            Products
                        </a>

                        <a
                            href="#"
                            className="relative text-[var(--text)] font-medium hover:text-[var(--primary)] transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[var(--primary)] after:transition-all after:duration-300 hover:after:w-full"
                        >
                            Contact
                        </a>

                    </div>
                </div>

                {/* CENTER TEXT */}
                <div className="hidden xl:flex absolute left-1/2 -translate-x-1/2">
                    <p className="text-xs tracking-[6px] uppercase text-[var(--accent)] italic whitespace-nowrap">
                        Your Best Friend
                    </p>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3 sm:gap-5">

                    {/* Desktop Icons */}
                    <div className="hidden md:flex items-center gap-2">

                        <button className="p-2 rounded-full hover:bg-[var(--secondary-bg)] transition duration-300 group">
                            <Heart
                                size={20}
                                className="text-[var(--text)] group-hover:text-[var(--primary)] transition duration-300"
                            />
                        </button>

                        <button className="p-2 rounded-full hover:bg-[var(--secondary-bg)] transition duration-300 group">
                            <ShoppingCart
                                size={20}
                                className="text-[var(--text)] group-hover:text-[var(--primary)] transition duration-300"
                            />
                        </button>

                    </div>

                    {/* Divider */}
                    <div className="hidden md:block h-7 w-px bg-[var(--secondary-bg)]"></div>

                    {/* Desktop Buttons */}
                    <div className="hidden sm:flex items-center gap-3">

                        <button className="px-5 py-2 rounded-full border border-[var(--primary)] text-[var(--primary)] font-medium hover:bg-[var(--primary)] hover:text-white transition duration-300">
                            Login
                        </button>

                        <button className="px-5 py-2 rounded-full bg-[var(--primary)] text-white font-medium hover:bg-[#b87439] transition duration-300 shadow-sm">
                            Sign Up
                        </button>

                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 rounded-full hover:bg-[var(--secondary-bg)] transition"
                    >
                        {
                            isMobileMenuOpen
                                ? <X size={24} className="text-[var(--text)]" />
                                : <Menu size={24} className="text-[var(--text)]" />
                        }
                    </button>

                </div>

            </nav>

            {/* Mobile Menu */}
            <div
                className={`
                lg:hidden fixed top-20 left-0 w-full z-40
                bg-[var(--bg)]/95 backdrop-blur-xl
                border-b border-[var(--secondary-bg)]
                overflow-hidden
                transition-all duration-300 ease-in-out
                ${isMobileMenuOpen
                        ? 'max-h-[500px] opacity-100'
                        : 'max-h-0 opacity-0'
                    }
                `}
            >

                <div className="px-6 py-6 flex flex-col gap-5">

                    {/* Mobile Links */}
                    <div className="flex flex-col gap-5">

                        <a
                            href="#"
                            className="text-[var(--text)] hover:text-[var(--primary)] transition"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Home
                        </a>

                        <a
                            href="#"
                            className="text-[var(--text)] hover:text-[var(--primary)] transition"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Products
                        </a>

                        <a
                            href="#"
                            className="text-[var(--text)] hover:text-[var(--primary)] transition"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Contact
                        </a>

                    </div>

                    {/* Mobile Center Text */}
                    <div className="pt-2">
                        <p className="text-center text-xs tracking-[5px] uppercase text-[var(--accent)] italic">
                            Your Best Friend
                        </p>
                    </div>

                    {/* Mobile Icons */}
                    <div className="flex items-center justify-center gap-10 pt-2">

                        <button className="flex flex-col items-center gap-1 text-[var(--text)] hover:text-[var(--primary)] transition">
                            <Heart size={22} />
                            <span className="text-xs">Wishlist</span>
                        </button>

                        <button className="flex flex-col items-center gap-1 text-[var(--text)] hover:text-[var(--primary)] transition">
                            <ShoppingCart size={22} />
                            <span className="text-xs">Cart</span>
                        </button>

                    </div>

                    {/* Mobile Buttons */}
                    <div className="flex flex-col gap-3 pt-4">

                        <button className="w-full py-2.5 rounded-full border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition duration-300">
                            Login
                        </button>

                        <button className="w-full py-2.5 rounded-full bg-[var(--primary)] text-white hover:bg-[#b87439] transition duration-300">
                            Sign Up
                        </button>

                    </div>

                </div>

            </div>
        </>
    )
}