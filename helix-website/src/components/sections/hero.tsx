"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Github, MoveRight, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/amplify-functions";
import { AuthModal } from "@/components/ui/auth-modal";
import { motion } from "framer-motion";
import { HeroPill } from "../ui/hero-pill";
import { SocialLinks } from "../ui/social-links";
import styles from './hero.module.css';
import { FaRust } from "react-icons/fa";

const codeExamples = [
    `// Define your schema
V::User {
  Name: String,
  Age: Integer
}
`,

    `// Create a new user and add followers
QUERY addUser() =>
  alice <- AddV<User>({Name: "Alice", Age: 25})
  bob <- AddV<User>({Name: "Bob", Age: 30})
  AddE<Follows>()::From(bob)::To(alice)::Props({Since: 1.5})
  RETURN alice`,

    `// Find users over 25 and their followers
QUERY findActiveUsers() =>
  users <- V<User>()::WHERE(_::Props(Age)::GT(25))
  followers <- users::In<Follows>()::WHERE(_::Props(Since)::GT(1.0))
  RETURN followers`
];

const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.7
        }
    }
};


const codeBlockVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.4
        }
    }
};

const buttonGroupVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.6
        }
    }
};

const dotVariants = {
    hidden: { scale: 0 },
    visible: (delay: number) => ({
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay
        }
    })
};

interface HeroSectionProps {
    githubStats?: {
        stars: number;
        forks: number;
        lastCommit: string;
    } | null;
}

export function HeroSection({ githubStats }: HeroSectionProps) {
    const { theme, systemTheme } = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;
    const router = useRouter();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [starCount, setStarCount] = useState<number | null>(null);

    useEffect(() => {
        checkAuthStatus();
        // Fetch GitHub stars count
        fetch('https://api.github.com/repos/HelixDB/helix-db')
            .then(res => res.json())
            .then(data => setStarCount(data.stargazers_count))
            .catch(console.error);
    }, []);

    const checkAuthStatus = async () => {
        try {
            const user = await getCurrentUser();
            setIsAuthenticated(!!user);
        } catch (err) {
            setIsAuthenticated(false);
        }
    };

    const handleGetStarted = () => {
        window.open('https://calendly.com/helix-db/new-meeting', '_blank');
    };

    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center py-8 md:py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8 md:mb-16 space-y-8">
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex justify-center gap-4 flex-wrap">
                            <HeroPill
                                className="w-min"
                                href="https://github.com/HelixDB/helix-db"
                                label="Vector types available!"
                                announcement="🎉 New"
                                isExternal
                            />

                        </div>
                    </div>

                    <motion.div
                        variants={titleVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.8 }}
                        className="relative"
                    >
                        <h1 className={`${styles.mainTitle} font-bold mb-4 md:mb-6 mx-auto bg-clip-text text-transparent [text-wrap:balance] bg-gradient-to-br from-foreground via-foreground/90 to-primary/80`}>
                            Build <span className="italic">10x Faster</span> with <br /> Graph-Vector Databases
                        </h1>
                    </motion.div>
                    <motion.div
                        variants={titleVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.8 }}
                        className="relative"
                    >
                        <p className={`${styles.description} text-muted max-w-2xl mb-4 md:mb-6 mx-auto`}>
                            We combine the power of graph and vector types natively (with <FaRust className="h-5 w-5 mb-1 inline-block" /> Rust), to build RAG and AI applications easily.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    variants={buttonGroupVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.8 }}
                    className="text-center mt-4 md:mt-8"
                >
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <motion.div
                            whileTap={{ scale: 0.95 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 17
                            }}
                            className="w-full sm:w-auto "
                        >
                            <Button
                                size="lg"
                                className={`${styles.buttonText} w-full sm:w-auto px-6 py-4 min-w-[160px]`}
                                onClick={handleGetStarted}
                                variant="outline"
                            >
                                Book Demo
                            </Button>
                        </motion.div>
                        <motion.div
                            whileTap={{ scale: 0.95 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 17
                            }}
                            className="w-full sm:w-auto"
                        >
                            <Button
                                size="lg"
                                className={`${styles.buttonText} px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20 w-full sm:w-auto`}
                                asChild
                            >
                                <a
                                    href="https://github.com/HelixDB/helix-db"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-3 min-w-[200px]"
                                >
                                    <Github className="w-5 h-5" />
                                    <span className="font-medium">Star on GitHub</span>
                                </a>
                            </Button>
                            <p className={`${styles.smallText} text-muted-foreground mt-2 italic`}>Takes 3 seconds 🙏🏻</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
            <AuthModal
                isOpen={showAuthModal}
                onClose={() => {
                    setShowAuthModal(false);
                    checkAuthStatus();
                }}
            />
        </section>
    );
}


/* <motion.div
                    variants={codeBlockVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.8 }}
                    className="max-w-xl mx-auto shadow-lg overflow-hidden rounded-lg mb-4 hidden [@media(min-height:600px)]:block"
                >
                    <div
                        className="rounded-lg overflow-hidden"
                        style={{
                            background:
                                currentTheme === "dark"
                                    ? "rgba(255,255,255,0.1)"
                                    : "rgba(255,255,255,0.5)",
                        }}
                    >
                        <div
                            className="px-3 py-1.5 bg-muted/50 flex items-center"
                        >
                            <div className="flex space-x-1.5">
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        custom={0.7 + i * 0.1}
                                        variants={dotVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className={`w-2 h-2 rounded-full ${i === 0 ? "bg-red-500" : i === 1 ? "bg-yellow-500" : "bg-green-500"
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="ml-3 text-xs font-medium">example.hx</span>
                        </div>
                        <div className="p-3 h-[120px] sm:h-[140px] md:h-[160px] overflow-hidden">
                            <TypingAnimation
                                texts={codeExamples}
                                typingSpeed={30}
                                deletingSpeed={10}
                                delayBetween={3000}
                            />
                        </div>
                    </div>
                </motion.div> */
