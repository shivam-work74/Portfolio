import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certificationsData } from '../constants/data';
import { FaAws, FaReact, FaGoogle, FaDocker, FaCertificate, FaCheckCircle, FaAward, FaTimes, FaDownload, FaExternalLinkAlt, FaSignature } from 'react-icons/fa';

const IssuerIcon = ({ icon, color, size = 40 }) => {
    const IconComponent = {
        FaAws: FaAws,
        FaReact: FaReact,
        FaGoogle: FaGoogle,
        FaDocker: FaDocker
    }[icon] || FaCertificate;

    return <IconComponent size={size} color={color} />;
};

const CertificateModal = ({ cert, onClose }) => {
    if (!cert) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                onClick={onClose}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative z-50 w-full max-w-4xl bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full hover:bg-white/10 transition-colors text-white"
                >
                    <FaTimes />
                </button>

                {/* Left Side: Visual Representation */}
                <div className="w-full md:w-2/5 bg-gradient-to-br from-black to-[#111] p-8 flex items-center justify-center relative overflow-hidden border-r border-white/5">
                    <div
                        className="absolute inset-0 opacity-20 blur-[100px]"
                        style={{ backgroundColor: cert.color }}
                    />
                    <div className="relative z-10 text-center">
                        <div className="w-32 h-32 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                            <IssuerIcon icon={cert.icon} color={cert.color} size={64} />
                        </div>
                        <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-2">
                            Verified Credential
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                            {cert.issuer}
                        </div>
                    </div>
                </div>

                {/* Right Side: Certificate Details */}
                <div className="w-full md:w-3/5 p-8 md:p-12 bg-[#0f0f0f] relative">
                    {/* Watermark */}
                    <FaAward className="absolute -bottom-10 -right-10 text-[200px] text-white/5 rotate-12 pointer-events-none" />

                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="font-mono text-xs text-green-500 uppercase tracking-widest">
                                    Active Status
                                </span>
                            </div>

                            <h2 className="font-display text-4xl font-bold text-white mb-4 leading-tight">
                                {cert.title}
                            </h2>

                            <p className="font-sans text-gray-400 leading-relaxed mb-8">
                                This certifies that <strong className="text-white">SHIVAM KUMAR</strong> has successfully completed the requirements to be recognized as a {cert.title}.
                            </p>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div>
                                    <div className="font-mono text-[10px] text-gray-600 uppercase tracking-widest mb-1">Issue Date</div>
                                    <div className="text-white font-mono">{cert.date}</div>
                                </div>
                                <div>
                                    <div className="font-mono text-[10px] text-gray-600 uppercase tracking-widest mb-1">Credential ID</div>
                                    <div className="text-white font-mono">{cert.credentialId}</div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <a
                                    href={cert.pdf}
                                    download={`${cert.title.replace(/\s+/g, '_')}.pdf`}
                                    className="flex-1 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-international-orange hover:text-white transition-all duration-300 flex items-center justify-center gap-2 text-center"
                                >
                                    <FaDownload /> Download PDF
                                </a>
                                <button className="flex-1 py-3 border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:border-international-orange hover:text-international-orange transition-all duration-300 flex items-center justify-center gap-2">
                                    <FaExternalLinkAlt /> Verify
                                </button>
                            </div>
                            <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                                <div className="font-handwriting text-2xl text-gray-500 italic">
                                    Digital Signature
                                </div>
                                <FaSignature className="text-4xl text-white/20" />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const CertificateCard = ({ cert, index, onClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            onClick={onClick}
            className="group relative h-[300px] w-full bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden rounded-xl hover:border-white/30 transition-all duration-500 perspective-1000 cursor-pointer"
        >
            {/* Ambient Glow */}
            <div
                className="absolute -top-[100px] -right-[100px] w-[200px] h-[200px] rounded-full opacity-20 blur-[80px] group-hover:opacity-40 transition-opacity duration-500"
                style={{ backgroundColor: cert.color }}
            />

            {/* Content */}
            <div className="relative z-10 p-8 flex flex-col h-full justify-between pointer-events-none">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                        <IssuerIcon icon={cert.icon} color={cert.color} />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30">
                        <FaCheckCircle className="text-green-500 text-xs" />
                        <span className="font-mono text-[10px] text-green-500 uppercase tracking-widest">Verified</span>
                    </div>
                </div>

                {/* Info */}
                <div>
                    <h3 className="font-display text-2xl font-bold text-white mb-2 leading-tight group-hover:text-international-orange transition-colors duration-300">
                        {cert.title}
                    </h3>
                    <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-1">
                        Issued by: {cert.issuer}
                    </p>
                    <p className="font-mono text-[10px] text-gray-600">
                        Tap to View Credentials
                    </p>
                </div>

                {/* Footer Decor */}
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-4">
                    <div
                        className="h-full w-0 group-hover:w-full transition-all duration-1000 ease-out"
                        style={{ backgroundColor: cert.color }}
                    />
                </div>
            </div>

            {/* Holographic Overlay Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        </motion.div>
    );
};

const Certifications = () => {
    const [selectedCert, setSelectedCert] = useState(null);

    return (
        <section id="certifications" className="relative bg-transparent py-24">
            <div className="container mx-auto px-6 mb-16">
                <div className="flex items-center gap-4 mb-4">
                    <FaAward className="text-international-orange text-2xl" />
                    <h2 className="text-sm font-mono text-international-orange tracking-widest uppercase">
                        Credentials
                    </h2>
                </div>
                <h1 className="text-5xl md:text-7xl font-display font-bold text-white">
                    LICENSES &<br />CERTIFICATIONS
                </h1>
            </div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {certificationsData.map((cert, i) => (
                        <CertificateCard
                            key={cert.id}
                            cert={cert}
                            index={i}
                            onClick={() => setSelectedCert(cert)}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedCert && (
                    <CertificateModal
                        cert={selectedCert}
                        onClose={() => setSelectedCert(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Certifications;
