import MotionLayout, { motion } from './MotionLayout.jsx'
import { childVariants } from '../animations/variants'
import { useState } from 'react'
import { useLanguage } from '../hooks/useLanguage.jsx'

export default function SetupGuide() {
	const [activeStep, setActiveStep] = useState(1)
	const { t } = useLanguage()

	const setupSteps = [
		{
			id: 1,
			icon: '📥',
			title: t('setup.step1.title'),
			description: t('setup.step1.description'),
			code: `git clone https://github.com/Areasettantotto/youtube-chat-bot
cd youtube-chat-bot
npm install`,
		},
		{
			id: 2,
			icon: '🔑',
			title: t('setup.step2.title'),
			description: t('setup.step2.description'),
			steps: [
				t('setup.step2.step1'),
				t('setup.step2.step2'),
				t('setup.step2.step3'),
				t('setup.step2.step4'),
				t('setup.step2.step5'),
			],
		},
		{
			id: 3,
			icon: '⚙️',
			title: t('setup.step3.title'),
			description: t('setup.step3.description'),
			code: `# Copy the example file
cp .env.example .env

# Edit with your settings
nano .env`,
		},
		{
			id: 4,
			icon: '🚀',
			title: t('setup.step4.title'),
			description: t('setup.step4.description'),
			code: `node index.js`,
		},
	]

	return (
		<MotionLayout id="setup" className="bg-gray-50 dark:bg-gray-900 pb-20">
			<div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div className="text-center mb-8 sm:mb-12" variants={childVariants}>
					<h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white overflow-safe">
						{t('setup.title')}
					</h2>
					<p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2 overflow-safe">
						{t('setup.subtitle')}
					</p>
				</motion.div>

				<motion.div
					className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
					variants={childVariants}
				>
					{/* Step Navigator */}
					<div className="space-y-3 sm:space-y-4">
						{setupSteps.map((step) => (
							<motion.div
								key={step.id}
								className={`p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 overflow-hidden ${
									activeStep === step.id
										? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
										: 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
								}`}
								onClick={() => setActiveStep(step.id)}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<div className="flex items-center space-x-3">
									<span className="text-lg sm:text-xl flex-shrink-0">{step.icon}</span>
									<div className="min-w-0 flex-1">
										<h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base overflow-safe">
											{step.title}
										</h3>
										<p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 overflow-safe">
											{step.description}
										</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>

					{/* Step Content */}
					<motion.div
						key={activeStep}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 sm:p-6 overflow-hidden"
					>
						{setupSteps.find((step) => step.id === activeStep) && (
							<div>
								<div className="flex items-center space-x-3 mb-4">
									<span className="text-xl sm:text-2xl flex-shrink-0">
										{
											setupSteps.find((step) => step.id === activeStep)
												.icon
										}
									</span>
									<h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white overflow-safe">
										{
											setupSteps.find((step) => step.id === activeStep)
												.title
										}
									</h3>
								</div>

								{setupSteps.find((step) => step.id === activeStep).code && (
									<div className="bg-gray-900 rounded-lg p-3 sm:p-4 mb-4 overflow-x-auto">
										<pre className="text-green-400 text-xs sm:text-sm leading-relaxed">
											<code className="overflow-safe">
												{
													setupSteps.find(
														(step) => step.id === activeStep
													).code
												}
											</code>
										</pre>
									</div>
								)}

								{setupSteps.find((step) => step.id === activeStep).steps && (
									<ol className="space-y-2">
										{setupSteps
											.find((step) => step.id === activeStep)
											.steps.map((stepItem, idx) => (
												<li
													key={idx}
													className="flex items-start space-x-2 text-gray-700 dark:text-gray-300 text-sm"
												>
													<span className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
														{idx + 1}
													</span>
													<span className="overflow-safe flex-1">{stepItem}</span>
												</li>
											))}
									</ol>
								)}
							</div>
						)}
					</motion.div>
				</motion.div>
			</div>
		</MotionLayout>
	)
}
