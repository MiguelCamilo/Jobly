import Image from "next/image";

import { CheckIcon } from "lucide-react";

import placeholder from "../../../assets/placeholder.svg";

const About = () => {
  const ourValuesArray = [
    "Empowerment",
    "Inclusivity",
    "Innovation",
    "Integrity",
  ];
  return (
    <>
      <div className="bg-gray-50 py-6 lg:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-2 xl:gap-10">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Careers start here. Connections made daily.
              </h1>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We believe in the power of meaningful work. Our platform
                connects job seekers with opportunities and employers with
                talent. We are dedicated to making the job search process
                simple, transparent, and successful for everyone.
              </p>
            </div>
            <Image
              alt="Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              height="335"
              src={placeholder}
              width="600"
            />
          </div>
        </div>
      </div>
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-[1fr_600px] xl:gap-10">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="hidden rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800 lg:inline-block">
                  Our Mission
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Connecting people with opportunities.
                </h2>
                <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We are on a mission to make the job search process more
                  accessible, efficient, and human. Our platform is designed to
                  empower individuals to find the right opportunities and help
                  companies discover the perfect match.
                </p>
              </div>
            </div>
            <div className="grid gap-4 md:gap-8 lg:order-first lg:grid-cols-2 lg:items-start lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Our Vision
                </div>
                <p className="max-w-prose text-gray-500 dark:text-gray-400 md:text-xl/relaxed xl:text-base/relaxed">
                  We envision a world where every person can pursue their
                  passion, and every organization can find the talent they need
                  to thrive. By leveraging the latest technology and the power
                  of community, we aim to create a seamless connection between
                  talent and opportunity.
                </p>
              </div>
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Our Values
                </div>
                <ul className="grid gap-2">
                  {ourValuesArray.map((value) => (
                    <li key={value}>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-600" />
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-b border-t border-gray-200 bg-gray-50 dark:border-gray-800" />
    </>
  );
};

export default About;
