'use client';

import { useEffect, useRef, useState } from 'react';
import BannerCard from './BannerCard';
import apiClient from '@/src/lib/apiClient';

export default function Banner() {
    const [banners, setBanners] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
    const isPausedRef = useRef(false);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await apiClient.get('/banners/get');
                setBanners(response.data.banners || []);
            } catch (error) {
                console.error('Failed to fetch banners:', error);
            }
        };

        fetchBanners();
    }, []);

    const scrollToBanner = (index: number) => {
        if (!containerRef.current) return;

        const cardWidth = window.innerWidth * 0.6; // w-[60vw]
        const gap = 16; // gap-4

        containerRef.current.scrollTo({
            left: index * (cardWidth + gap),
            behavior: 'smooth',
        });
    };

    const handleScroll = () => {
        if (!containerRef.current) return;

        const cardWidth = window.innerWidth * 0.6;
        const gap = 16;

        const index = Math.round(
            containerRef.current.scrollLeft / (cardWidth + gap)
        );

        setCurrentIndex(index);

        // Pause auto-scroll while user is scrolling
        isPausedRef.current = true;

        if (pauseTimeoutRef.current) {
            clearTimeout(pauseTimeoutRef.current);
        }

        pauseTimeoutRef.current = setTimeout(() => {
            isPausedRef.current = false;
        }, 2000);
    };

    useEffect(() => {
        if (!banners.length) return;

        autoScrollRef.current = setInterval(() => {
            if (isPausedRef.current) return;

            const nextIndex = (currentIndex + 1) % banners.length;

            scrollToBanner(nextIndex);
            setCurrentIndex(nextIndex);
        }, 3000);

        return () => {
            if (autoScrollRef.current) {
                clearInterval(autoScrollRef.current);
            }
        };
    }, [currentIndex, banners.length]);

    return (
        <section
            ref={containerRef}
            onScroll={handleScroll}
            className="
                flex
                gap-4
                overflow-x-auto
                overflow-y-hidden
                px-4
                py-2
                scroll-smooth
                snap-x
                snap-mandatory
                scrollbar-hide
            "
        >
            {banners.map((banner) => (
                <BannerCard
                    key={banner._id}
                    src={banner.imageUrl}
                    link={banner.link}
                />
            ))}
        </section>
    );
}