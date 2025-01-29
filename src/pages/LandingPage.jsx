import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import React from "react";
import { Link } from "react-router-dom";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, useMotionValue, useTransform } from "framer-motion";
// import {gatewa} "../assets/images";
// import gateway_of_india from "../assets/images";

const locations = [
    {
        name: "Mumbai",
        description: "The city that never sleeps, home to Bollywood and historic landmarks.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg",
    },
    {
        name: "Delhi",
        description: "The capital city of India, rich in culture and history.",
        imageUrl: "https://cdn.britannica.com/20/189820-050-D650A54D/Red-Fort-Old-Delhi-India.jpg",
    },
    {
        name: "Jaipur",
        description: "The Pink City, known for its royal heritage and vibrant architecture.",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuDD8CIjBDuVukV24jBDSDnW6-DUu3qrzpeQ&s",
    },
    {
        name: "Kolkata",
        description: "The cultural hub of India, home to colonial architecture and literature.",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZeIEx5VaLJu0eHEilcRw15LKjYnrKsmI2Iw&s",
    },
    {
        name: "Shimla",
        description: "The Queen of Hills, offering breathtaking mountain views.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Mall_Road%2C_Manali.jpg/1200px-Mall_Road%2C_Manali.jpg",
    },
];

const LandingPage = () => {
    // Motion values for 3D scrolling
    const x = useMotionValue(0);
    const rotateY = useTransform(x, [-200, 200], [-15, 15]);

    return (
        <main className="flex flex-col gap-10 sm:gap-20">
            {/* Hero Section */}
            <motion.section
                className="relative text-center h-screen bg-cover bg-center flex flex-col justify-center items-center overflow-hidden"
                style={{
                    backgroundImage: "url('https://andtour-react.netlify.app/static/media/bg.70c7fc62f19b1932f5eb.png')",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ duration: 1 }}
                ></motion.div>
                <motion.div
                    className="relative z-10"
                    style={{ rotateY }}
                    drag="x"
                    dragConstraints={{ left: -200, right: 200 }}
                    dragElastic={0.2}
                    onDrag={(event, info) => x.set(info.offset.x)}
                >
                    <motion.h1
						className="text-white text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter"
						initial={{ y: -50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 1 }}
					>
						Your SmartStay Experience Awaits!
					</motion.h1>
					<motion.p
						className="text-gray-200 mt-4 text-lg sm:text-xl max-w-2xl mx-auto"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5, duration: 1 }}
					>
						✨ Effortless hotel bookings, curated itineraries, and AI-driven travel insights - all at your fingertips.  
					</motion.p>
					<motion.p
						className="text-gray-300 text-md sm:text-lg italic max-w-xl mx-auto mt-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1, duration: 1 }}
					>
						"Because every journey should be seamless, secure, and extraordinary!" 🚀
					</motion.p>
                    <motion.div
                        className="mt-6 flex gap-4 justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                    >
                        {/* <Link to="/login">
                            <Button variant="blue" size="lg">
                                Login
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button variant="destructive" size="lg">
                                Sign Up
                            </Button>
                        </Link> */}
                    </motion.div>
                </motion.div>
            </motion.section>

			{/* <section className="bg-gray-900 py-10 text-white">
				<h2 className="text-center text-3xl font-bold mb-6">What Our Customers Say</h2>
				<Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full max-w-lg mx-auto">
					<CarouselContent>
						{reviews.map(({ name, review, rating }, index) => (
							<CarouselItem key={index}>
								<div className="p-1">
									<Card>
										<CardHeader>
											<CardTitle className="text-lg">{name} {rating}</CardTitle>
										</CardHeader>
										<CardContent className="flex aspect-square items-center justify-center p-6 text-center">
											<p className="text-gray-800">{review}</p>
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</section> */}

			<section className="bg-gray-900 py-10 text-white">
				<h2 className="text-center text-3xl font-bold mb-6">Explore Famous Destinations in India</h2>

				<Carousel plugins={[Autoplay({ delay: 2000 })]}  className="w-full max-w-3xl mx-auto">
					<CarouselContent>
						{locations.map((location, index) => (
							<CarouselItem key={index} className="p-2">
								<Card className="bg-gray-800 text-white shadow-lg rounded-lg">
									<CardHeader>
										<CardTitle className="text-2xl font-bold text-center">{location.name}</CardTitle>
										<p className="text-gray-300 text-center">{location.description}</p>
									</CardHeader>
									<CardContent className="flex flex-col items-center">
										<img
											src={location.imageUrl}
											alt={location.name}
											className="rounded-lg object-cover w-full h-64"
										/>
									</CardContent>
								</Card>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</section>


            <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full py-10">
                <CarouselContent className="flex gap-5 sm:gap-20 items-center">
                    {companies.map(({ name, id, path }) => (
                        <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                            <img src={path} alt={name} className="h-9 sm:h-14 object-contain" />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            {/* Features Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-bold">Hotel Booking</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Book the perfect room with ease and manage your reservations seamlessly.
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-bold">Itinerary Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                        Plan your trips efficiently with our smart itinerary tools.
                    </CardContent>
                </Card>
            </section>

            {/* FAQ Section */}
            <Accordion type="single" collapsible className="px-4">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index + 1}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </main>
    );
};

export default LandingPage;


