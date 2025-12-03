"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedBackground from "./components/AnimatedBackground";
import CustomCursor from "./components/CustomCursor";
import SmoothScroll from "./components/SmoothScroll";
import RealTimeStats from "./components/RealTimeStats";
import ServerButtons from "./components/ServerButtons";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <>
      <SmoothScroll />
      <AnimatedBackground />
      <CustomCursor />

      <div ref={containerRef} className="min-h-screen bg-background relative z-10">
        <header className="sticky top-0 z-50 bg-background/60 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold">X</span>
              </div>
              <div>
                <div className="font-semibold">x-kira</div>
                <div className="text-xs text-muted-foreground">Free WhatsApp Bot</div>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm hover:text-indigo-400 transition-colors">Features</a>
              <a href="#getting-started" className="text-sm hover:text-indigo-400 transition-colors">Get Started</a>
              <a href="#servers" className="ml-2 glow-button px-4 py-2 rounded-lg text-sm font-semibold">Pair Now</a>
            </nav>
          </div>
        </header>

        <main>
          <section className="relative py-20 lg:py-28">
            <motion.div 
              className="container mx-auto px-6 relative z-10"
              style={{ opacity, scale }}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <motion.div 
                    className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <span className="text-sm text-indigo-300 uppercase font-medium">Free WhatsApp Bot</span>
                  </motion.div>

                  <motion.h1 
                    className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    Pair Your WhatsApp Bot —
                    <span className="block text-gradient">100% Free & Easy</span>
                  </motion.h1>

                  <motion.p 
                    className="text-lg text-muted-foreground mb-8 max-w-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    x-kira Bot is a free WhatsApp bot that you can pair to your WhatsApp account in seconds. Get your pairing code, link it using WhatsApp's "Link a Device" feature, and start using powerful bot commands instantly.
                  </motion.p>

                  <motion.div 
                    className="flex flex-wrap gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    <a href="#servers" className="glow-button px-6 py-3 rounded-lg font-semibold">Get Pair Code</a>
                    <a href="#getting-started" className="secondary-button px-5 py-3 rounded-lg">How It Works</a>
                  </motion.div>

                  <motion.div 
                    className="flex gap-6 mt-8 text-sm text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />
                      <span>Active Users Online</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block" />
                      <span>100% Free Forever</span>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div 
                  className="order-first lg:order-last"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                >
                  <div className="bg-gradient-to-br from-indigo-900/40 to-transparent border border-border rounded-2xl p-8 backdrop-blur-sm hover:border-indigo-500/30 transition-all duration-300">
                    <h3 className="text-lg font-semibold mb-4">How to Pair x-kira Bot</h3>
                    <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                      <li>Click "Get Pair Code" and enter your WhatsApp number (with country code, e.g., 917074029156)</li>
                      <li>Open WhatsApp → Three dots menu → Linked Devices → Link a Device</li>
                      <li>Enter the 8-digit pairing code you received</li>
                      <li>Your bot is now paired! Send <code className="px-2 py-1 bg-muted/50 rounded font-mono">.menu</code> to see all commands</li>
                    </ol>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </section>

          <motion.section 
            id="servers" 
            className="py-16 bg-gradient-to-b from-transparent to-indigo-900/10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="container mx-auto px-6">
              <motion.div 
                className="text-center mb-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-4">Choose a Pairing Server</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Select any available server to generate your pairing code. Each server shows how many users are currently connected to x-kira Bot.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <ServerButtons />
              </motion.div>
            </div>
          </motion.section>

          <motion.section 
            id="features" 
            className="py-20 bg-background/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="container mx-auto px-6">
              <motion.h2 
                className="text-3xl font-bold mb-6"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Why Use x-kira Bot?
              </motion.h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "100% Free", desc: "No subscriptions, no hidden fees. Completely free WhatsApp bot for everyone.", delay: 0.1 },
                  { title: "Easy Pairing", desc: "Get your pairing code in seconds and link to WhatsApp using the built-in \"Link a Device\" feature.", delay: 0.2 },
                  { title: "Powerful Commands", desc: "Access hundreds of bot commands for downloads, AI chat, group management, and more.", delay: 0.3 }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="p-6 rounded-xl border border-border bg-muted/5 hover:bg-muted/10 hover:border-indigo-500/30 transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: feature.delay }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <h4 className="font-semibold mb-2">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section 
            id="getting-started" 
            className="py-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="container mx-auto px-6">
              <motion.h2 
                className="text-2xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Pair x-kira Bot in 3 Simple Steps
              </motion.h2>
              <motion.p 
                className="text-muted-foreground mb-6 max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Follow these simple steps to pair x-kira Bot to your WhatsApp account. The entire process takes less than a minute!
              </motion.p>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { num: "1", title: "Get Your Pairing Code", desc: "Choose a server and enter your WhatsApp number with country code to receive an 8-digit pairing code.", delay: 0.2 },
                  { num: "2", title: "Link Your Device", desc: "Open WhatsApp, go to Linked Devices, tap \"Link a Device\", and enter the pairing code.", delay: 0.3 },
                  { num: "3", title: "Start Using the Bot", desc: "Send .menu to see all available commands and start enjoying your free WhatsApp bot!", delay: 0.4 }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    className="p-6 border border-border rounded-xl hover:border-indigo-500/30 hover:bg-muted/5 transition-all duration-300"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: step.delay }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="text-3xl font-bold text-indigo-400">{step.num}</div>
                    <h4 className="font-semibold mt-2 mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section 
            className="py-12 border-t border-border"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="container mx-auto px-6">
              <RealTimeStats />
            </div>
          </motion.section>
        </main>

        <footer className="border-t border-border py-10">
          <div className="container mx-auto px-6 text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold">X</span>
              </div>
              <div>
                <div className="font-semibold">x-kira Bot</div>
                <div className="text-xs">&copy; 2025 Free WhatsApp Bot</div>
              </div>
            </div>

            <div className="flex gap-6">
              <a href="#features" className="hover:text-indigo-400">Features</a>
              <a href="https://github.com/sumon9836" className="hover:text-indigo-400">GitHub</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
