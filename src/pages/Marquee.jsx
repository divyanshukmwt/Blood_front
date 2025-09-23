import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const images = [
    "https://img.freepik.com/premium-photo/smiling-young-woman-donating-blood-blood-drive-she-is-looking-blood-bag-smiling-nurse-is-taking-her-blood-pressure_1209158-36479.jpg",
    "https://media.istockphoto.com/id/1307735167/photo/young-male-donor-donating-blood.jpg?s=612x612&w=0&k=20&c=BMq1nFRuA8tgDTWA6xkVwUGavTdeejHxgcQxJekKTCo=",
    "https://media.istockphoto.com/id/2222001819/photo/young-adult-black-man-donating-blood-while-smiling-in-medical-facility.jpg?s=612x612&w=0&k=20&c=cbW2uFpKcXVP75Ex5rar7kWWyW7z5k8dOL--DDsH7MI=",
    "https://media.istockphoto.com/id/521848481/photo/nice-hospital-phlebotomist-taking-a-sample-from-a-patient.jpg?s=612x612&w=0&k=20&c=C2jaxeEqvTWmMAQ99T_a_k224wksTbbfCHuVW4HGQYE=",
    "https://nhsbtdbe.blob.core.windows.net/umbraco-assets-corp/27945/a-blood-donor-holding-her-donation.png",
    "https://www.shutterstock.com/image-photo/attractive-young-woman-lying-down-600nw-2330282875.jpg",
    "https://images.onlymyhealth.com/only-my-health-english/images/2025/07/02/article/image/mn-blood-donation-1751435577273.webp",
    "https://insights.ibx.com/wp-content/uploads/2021/06/donate-blood-masks.jpg",
    "https://static.timesnewsgroup.com.au/prod/uploads/sites/29/2025/01/RedCrossLifebloodpho_86187.jpg",
];

const Marquee = () => {
    const marqueeRef = useRef(null);

    useEffect(() => {
        const marquee = marqueeRef.current;
        const totalWidth = marquee.scrollWidth / 2;

        gsap.to(marquee, {
            x: `-=${totalWidth}`,
            ease: "linear",
            duration: 20, // adjust speed
            repeat: -1,
            modifiers: {
                x: (x) => {
                    return `${parseFloat(x) % totalWidth}px`;
                },
            },
        });
    }, []);

    return (
        <div className="w-full bg-gray-100 py-10 flex flex-col items-center">
            {/* Top Heading */}
            <h2 className="text-4xl font-bold font-[oswald] text-red-600 mb-8 text-center">
                Be the reason for smiles
            </h2>

            {/* Marquee Section */}
            <div className="overflow-hidden w-full">
                <div
                    ref={marqueeRef}
                    className="flex"
                    style={{ width: "max-content" }}
                >
                    {images.concat(images).map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`img-${idx}`}
                            className="h-60 w-80 object-cover mx-4 rounded-lg flex-shrink-0"
                        />
                    ))}
                </div>
            </div>

            {/* Bottom Subheading */}
            <p className="mt-8 text-2xl font-[inter] text-gray-600 text-center">
                Be a donor, be a life-saver, be a hero
            </p>
        </div>

    );
};

export default Marquee;
