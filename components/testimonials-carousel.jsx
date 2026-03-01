"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";

const TestimonialsCarousel = ({ testimonials }) => {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [
        AutoScroll({
            playOnInit: true,
            stopOnInteraction: false,
            speed: 1, // continuous scroll speed
        }),
    ]);

    return (
        <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="flex">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={index}
                        className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-4"
                    >
                        <Card className="h-full">
                            <CardContent className="pt-6 pb-6 h-full flex flex-col">
                                <div className="flex items-center mb-4">
                                    <div className="relative h-10 w-10 mr-4">
                                        <Image
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            fill
                                            className="rounded-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-semibold">{testimonial.name}</div>
                                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic flex-grow">
                                    &quot;{testimonial.quote}&quot;
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestimonialsCarousel;
