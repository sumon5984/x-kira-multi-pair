'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Activity, AlertCircle } from 'lucide-react';

interface ServerInfo {
  id: number;
  name: string;
  userCount: number;   // will no longer be used
  available: boolean;
}

interface ServersResponse {
  servers: ServerInfo[];
}

export default function ServerButtons() {
  const [servers, setServers] = useState<ServerInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await fetch('/api/servers');
        if (!response.ok) throw new Error('Failed');
        const data: ServersResponse = await response.json();
        setServers(data.servers);
      } catch (err) {
        setError('Failed to load servers');
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
    const interval = setInterval(fetchServers, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto">
        {[1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-24 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0.3, 0.6, 0.3], y: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    );
  }

  if (error || servers.length === 0) {
    return (
      <motion.div 
        className="text-center text-muted-foreground py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <AlertCircle className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
        <p>No servers available at the moment. Please try again later.</p>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col gap-5 w-full max-w-2xl mx-auto">
      {servers.map((server, index) => (
        <Link
          key={server.id}
          href={server.id === 0 ? '/pair' : `/pair?server=${server.id}`}
          className={`group relative block ${!server.available ? 'pointer-events-none' : ''}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.div
              className="relative overflow-hidden rounded-2xl p-6 border transition-all duration-300 cursor-pointer"
              style={{
                background: server.available
                  ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2))'
                  : 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2))',
                borderColor: server.available ? 'rgba(99, 102, 241, 0.4)' : 'rgba(239, 68, 68, 0.4)',
              }}
              whileHover={server.available ? {
                scale: 1.02,
                borderColor: 'rgba(99, 102, 241, 0.7)',
                boxShadow: '0 15px 35px rgba(99, 102, 241, 0.25)',
              } : {}}
              whileTap={server.available ? { scale: 0.98 } : {}}
            >
              {/* Server Row */}
              <div className="relative flex items-center justify-between">
                
                {/* Icon + name */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center ${
                      server.available
                        ? 'border-indigo-400/40 bg-indigo-500/20'
                        : 'border-red-400/40 bg-red-500/20'
                    }`}
                  >
                    {server.available ? (
                      <Activity className="w-6 h-6 text-indigo-300" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-red-300" />
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {server.name}
                    </h3>

                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        server.available
                          ? 'bg-indigo-500/20 text-indigo-300'
                          : 'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {server.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>

                {/* Simple Arrow */}
                {server.available && (
                  <motion.div
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                )}
              </div>

            </motion.div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
