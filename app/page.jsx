import HeroSection from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { featuresData, howItWorksData, statsData, testimonialsData } from "@/data/landing";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (<div className="mt-40">
    <HeroSection />
    <section className="py-20 bg-gradient-to-br from-[#CBA135] to-[#F6E27F]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {statsData.map((statsData, index) => (
            <div key={index}>
              <div className="text-3xl font-bold text-white mb-2">{statsData.value}</div>
              <div className="text-gray-200">{statsData.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center gradient-title">Everything You Need to Manage Your Finances</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <Card key={index} className="p-6">

              <CardContent className="space-y-4 pt-4">
                {feature.icon}
                <h3 className="text-xl font-semibold gradient-title">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>

            </Card>           
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-gradient-to-br from-[#CBA135] to-[#F6E27F]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-white">
          How it Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {howItWorksData.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">{step.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-gray-200">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>   

    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center gradient-title">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <Card key={index} className="p-6">

              <CardContent className=" pt-4">
                <div className="flex items-center mb-4">
                  <Image src={testimonial.image} alt={testimonial.name} width={40} height={40} className="rounded-full" />
                  <div className="ml-4">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.quote}</p>

              </CardContent>

            </Card>
          ))}
        </div>
      </div>
    </section>     

    <section className="py-20 bg-gradient-to-br from-[#CBA135] to-[#F6E27F]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-center text-white">
          Ready to Take Control of Your Finances?
        </h2>
        <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already managing their finances effortlessly with our AI-powered app.
        </p>
        <Link href="/dashboard">
          <Button size="lg" className="px-8 btn-gold-outline animate-bounce">
            Get Started
          </Button>
        </Link>
      </div>
    </section>

  </div>
  );
}
