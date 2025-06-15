import MotionWrapper from '@/app/components/MotionWrapper'
import { FEATURES } from '@/constants/features'

export function Features() {
    return (
        <section className="py-32 px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <MotionWrapper
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Built for developers
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Every feature designed with the modern developer workflow in mind
                    </p>
                </MotionWrapper>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FEATURES.map((feature, index) => (
                        <MotionWrapper
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </MotionWrapper>
                    ))}
                </div>
            </div>
        </section>
    )
}