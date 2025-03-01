"use client";
import { Download } from 'lucide-react';
import { useEffect, useState } from 'react';

if (typeof window !== 'undefined') {
    window.html2pdf = window.html2pdf || {};
}

export default function CV() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        document.body.appendChild(script);
    }, []);

    const handleDownload = async () => {
        setIsLoading(true);
        const element = document.getElementById('cv-content');

        const opt = {
            margin: [0.5, 0.5, 0.5, 0.5],
            filename: 'Sakshat_Adhikari_CV.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'a2', orientation: 'portrait' }
        };

        try {
            await window.html2pdf().set(opt).from(element).save();
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#18181B] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto mb-4 flex justify-end">
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-black rounded-lg transition-colors duration-200 shadow-lg shadow-green-500/20"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <svg
                            className="animate-spin h-5 w-5 text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    ) : (
                        <>
                            <Download size={20} />
                            Download CV
                        </>
                    )}
                </button>
            </div>

            <div id="cv-content" className="max-w-4xl mx-auto bg-zinc-900 shadow-2xl shadow-green-500/20 rounded-lg overflow-hidden border border-green-500/20 p-8 text-gray-300">
                <div className="bg-gradient-to-r from-green-900 to-green-950 px-8 py-12 text-green-300 border-b border-green-800/30">
                    <h1 className="text-4xl font-bold text-center mb-4 text-green-300">Sakshat Adhikari</h1>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                            <span>📍</span> Brussels, Belgium
                        </span>
                        <span className="flex items-center gap-1">
                            <span>📱</span> 0488828678
                        </span>
                        <span className="flex items-center gap-1">
                            <span>📧</span> asakshat453@gmail.com
                        </span>
                    </div>
                    <blockquote className="mt-6 text-center italic text-green-200">
                        &quot;A Full Stack Developer who spends unfathomable amount of time configuring linux dotfiles.&quot;
                    </blockquote>
                </div>

                <div className="p-8 text-gray-300">
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-green-400 flex items-center gap-2 mb-4">
                            <span>🚀</span> PROFESSIONAL EXPERIENCE
                        </h2>

                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-green-300">Full Stack Developer (Internship) | SIRIUS Insight</h3>
                            <p className="text-gray-400 mb-2">Sept 2024 - Nov 2024 | Ottignies-Louvain-la-Neuve, Belgium</p>
                            <div className="bg-zinc-800/50 p-3 rounded mb-3 border border-green-900/30">
                                Developing custom API management and a centralized 2FA for different services.
                            </div>
                            <ul className="list-disc list-inside text-gray-400">
                                <li>Developed a custom API management app that tracks usage, logs and determines cost of different routes.</li>
                                <li>Developed a centralized Authentication app for different web services.(Session IDs, JWT cookie based and user management)</li>
                                <li>Deployed using NGINX reverse proxy with let&apos;s encrypt SSL certificates.</li>
                            </ul>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-green-300">Junior Full Stack Developer | BeCode </h3>
                            <p className="text-gray-400 mb-2">Jan 2024 - July 2024 | BeCentral, Brussels</p>
                            <div className="bg-zinc-800/50 p-3 rounded mb-3 border border-green-900/30">
                                Developing full stack app with Golang and NextJS.
                            </div>
                            <ul className="list-disc list-inside text-gray-400">
                                <li>Collaborated in a team to complete different projects.</li>
                                <li>Cloned a few popular websites. (Streaming site and a messaging app)</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-green-400 flex items-center gap-2 mb-4">
                            <span>🎓</span> EDUCATION
                        </h2>
                        <h3 className="text-xl font-semibold text-green-300">Karel de Grote Hogeschool</h3>
                        <p className="text-lg font-medium text-gray-300">Bachelors: Applied Computer Science</p>
                        <p className="text-gray-400">📅 2021 - 2023</p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-green-400 flex items-center gap-2 mb-4">
                            <span>💻</span> CORE COMPETENCIES
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-zinc-800/50 p-4 rounded-lg border border-green-900/30">
                                <h3 className="font-semibold mb-2 text-green-300">Technical</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Typescript', 'Nodejs', 'Golang', 'NextJS', 'SQL', 'Docker', 'Linux', 'NGINX'].map((skill) => (
                                        <span key={skill} className="bg-green-950 text-green-300 px-3 py-1 rounded-full text-sm border border-green-800/30">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-zinc-800/50 p-4 rounded-lg border border-green-900/30">
                                <h3 className="font-semibold mb-2 text-green-300">Soft Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Communication', 'Problem Solving', 'Strategic Thinking'].map((skill) => (
                                        <span key={skill} className="bg-green-950 text-green-300 px-3 py-1 rounded-full text-sm border border-green-800/30">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-green-400 flex items-center gap-2 mb-4">
                            <span>🛠️</span> NOTABLE PROJECTS
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-zinc-800/50 p-4 rounded-lg border border-green-900/30">
                                <h3 className="text-xl font-semibold text-green-300">Custom API management App and Authentication app</h3>
                                <p className="text-gray-300 font-medium mb-2">Tech Stack: NextJS, ExpressJS, POSTGRESQL & Docker</p>
                                <ul className="list-disc list-inside text-gray-400">
                                    <li>CRUD operations for creating clients, app services, routes, token credits, etc</li>
                                    <li>Custom 2FA functions.</li>
                                    <li>Manages License and credit based operations.</li>
                                </ul>
                            </div>
                            <div className="bg-zinc-800/50 p-4 rounded-lg border border-green-900/30">
                                <h3 className="text-xl font-semibold text-green-300">Event Booking App</h3>
                                <p className="text-gray-300 font-medium mb-2">Tech Stack: Golang, POSTGRESQL, NEXTJS</p>
                                <ul className="list-disc list-inside text-gray-400">
                                    <li>App includes custom authentication for private routes.</li>
                                    <li>Custom SMTP server to send ticket, change password and verification through email.</li>
                                    <li>Light mobile app on REACT Native to scan the QR code for ticket verification.</li>
                                    <li>CRUD operations for all event details and user details.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-green-400 flex items-center gap-2 mb-4">
                            <span>🌐</span> LANGUAGES
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { lang: 'Nepali', level: 'Native' },
                                { lang: 'English', level: 'Fluent' },
                                { lang: 'Dutch', level: 'Moderate' },
                                { lang: 'Hindi', level: 'Moderate' }
                            ].map((item) => (
                                <div key={item.lang} className="bg-zinc-800/50 p-3 rounded-lg text-center border border-green-900/30">
                                    <p className="font-medium text-green-300">{item.lang}</p>
                                    <p className="text-gray-400">{item.level}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}