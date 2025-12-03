
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Users, Activity, CheckCircle2, AlertCircle } from 'lucide-react';

interface ServerInfo {
  id: number;
  name: string;
  userCount: number;
  available: boolean;
}

interface ServersResponse {
  servers: ServerInfo[];
  totalServers: number;
  timestamp: string;
}

function getUserCountColor(count: number, available: boolean): string {
  if (!available) return 'text-red-300';
  if (count <= 20) return 'text-emerald-400';
  if (count <= 30) return 'text-sky-400';
  if (count <= 50) return 'text-yellow-400';
  return 'text-red-400';
}

function getStatusColor(count: number, available: boolean): string {
  if (!available) return 'bg-red-500';
  if (count <= 20) return 'bg-emerald-500';
  if (count <= 30) return 'bg-sky-500';
  if (count <= 50) return 'bg-yellow-500';
  return 'bg-red-500';
}

function getStatusLabel(count: number, available: boolean): string {
  if (!available) return 'Unavailable';
  if (count <= 20) return 'Excellent';
  if (count <= 30) return 'Good';
  if (count <= 50) return 'Busy';
  return 'Full';
}

export default function ServerButtons() {
  const [servers, setServers] = useState<ServerInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await fetch('/api/servers');
        if (!response.ok) {
          throw new Error('Failed to fetch servers');
        }
        const data: ServersResponse = await response.json();
        setServers(data.servers);
      } catch (err) {
        console.error('Error fetching servers:', err);
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
        <motion.div
          key={server.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link
            href={server.id === 0 ? '/pair' : `/pair?server=${server.id}`}
            className={`group relative block ${!server.available ? 'pointer-events-none' : ''}`}
          >
            <motion.div
              className="relative overflow-hidden rounded-2xl p-6 border transition-all duration-300"
              style={{
                background: server.available 
                  ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)'
                  : 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)',
                borderColor: server.available ? 'rgba(99, 102, 241, 0.3)' : 'rgba(239, 68, 68, 0.3)',
              }}
              whileHover={server.available ? { 
                scale: 1.02,
                borderColor: 'rgba(99, 102, 241, 0.5)',
                boxShadow: '0 20px 40px rgba(99, 102, 241, 0.2)'
              } : {}}
              whileTap={server.available ? { scale: 0.98 } : {}}
            >
              {/* Animated gradient overlay */}
              {server.available && (
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)',
                  }}
                />
              )}

              <div className="relative flex items-center justify-between">
                {/* Server Info */}
                <div className="flex items-center gap-4">
                  {/* Status Indicator */}
                  <div className="relative">
                    <motion.div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        server.available 
                          ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/30' 
                          : 'bg-red-500/20 border border-red-400/30'
                      }`}
                      animate={server.available && server.userCount <= 30 ? {
                        scale: [1, 1.05, 1],
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {server.available ? (
                        <Activity className="w-6 h-6 text-indigo-400" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-red-400" />
                      )}
                    </motion.div>
                    <motion.span
                      className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(server.userCount, server.available)}`}
                      animate={server.available ? { scale: [1, 1.2, 1], opacity: [1, 0.5, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  {/* Server Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{server.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        server.available 
                          ? 'bg-emerald-500/20 text-emerald-300' 
                          : 'bg-red-500/20 text-red-300'
                      }`}>
                        {getStatusLabel(server.userCount, server.available)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* User Count or Status */}
                {server.available ? (
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getUserCountColor(server.userCount, server.available)}`}>
                        {server.userCount}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        Active Users
                      </div>
                    </div>
                    <motion.div
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(99, 102, 241, 0.2)' }}
                    >
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 border border-red-400/30">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-sm font-semibold text-red-300">Server Busy</span>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              {server.available && (
                <div className="mt-4">
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        server.userCount <= 20 ? 'bg-emerald-500' :
                        server.userCount <= 30 ? 'bg-sky-500' :
                        server.userCount <= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((server.userCount / 60) * 100, 100)}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>Load: {Math.min((server.userCount / 60) * 100, 100).toFixed(0)}%</span>
                    <span>Capacity: 60</span>
                  </div>
                </div>
              )}
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
