    // Loader2.jsx
    import { useEffect, useRef } from "react";
    import { gsap } from "gsap";

    export default function Loader2({ onComplete }) {
    const circleRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const circle = circleRef.current;
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;

        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;

        // Use a GSAP timeline to update circle and text together
        const tl = gsap.timeline({
        onComplete: () => {
            // Wait 800ms before finishing
            setTimeout(() => {
            if (onComplete) onComplete();
            }, 800);
        },
        });

        tl.to(circle, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.out",
        onUpdate: function () {
            // progress goes 0 → 1
            const progress = this.progress();

            // Animate text opacity and scale gradually with circle
            textRef.current.style.opacity = progress;
            textRef.current.style.transform = `scale(${0.8 + progress * 0.2})`;
        },
        });
    }, [onComplete]);

    return (
        <div className="flex items-center justify-center h-screen bg-white">
        <div className="relative w-40 h-40">
            <svg className="w-full h-full">
            <circle
                ref={circleRef}
                cx="80"
                cy="80"
                r="70"
                stroke="red"
                strokeWidth="7"
                fill="none"
                strokeLinecap="round"
                className="transform -rotate-90 origin-center"
            />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
            <span
                ref={textRef}
                className="text-red-600 text-2xl font-bold font-[oswald]"
                style={{ opacity: 0, transform: "scale(0.8)" }}
            >
                Red Hope
            </span>
            </div>
        </div>
        </div>
    );
    }
