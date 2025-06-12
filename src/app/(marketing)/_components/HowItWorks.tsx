// app/_components/HowItWorksSection.tsx

import MotionWrapper from "@/components/MotionWrapper"
import { steps } from "@/constants/steps"

export function HowItWorks() {
    return (
        <section className="py-32 px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <MotionWrapper
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        How it works
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Three simple steps to share your code with the world
                    </p>
                </MotionWrapper>

                <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
                    {steps.map((item, index) => (
                        <MotionWrapper
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-8 mx-auto">
                                {item.icon}
                            </div>
                            <div className="text-sm font-semibold text-gray-500 mb-4 tracking-wider">
                                STEP {item.step}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {item.description}
                            </p>
                        </MotionWrapper>
                    ))}
                </div>
            </div>
        </section>
    )
}
