'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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
  if (!available) return 'text-white';
  if (count <= 20) {
    return 'text-sky-400';
  } else if (count <= 30) {
    return 'text-green-400';
  } else if (count <= 50) {
    return 'text-yellow-400';
  } else {
    return 'text-red-500';
  }
}

function getStatusDotColor(count: number, available: boolean): string {
  if (!available) return 'bg-red-500';
  if (count <= 20) {
    return 'bg-sky-400';
  } else if (count <= 30) {
    return 'bg-green-500';
  } else if (count <= 50) {
    return 'bg-red-500';
  } else {
    return 'bg-red-500';
  }
}

function getButtonStyle(available: boolean): React.CSSProperties {
  if (!available) {
    return {
      background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.8) 0%, rgba(185, 28, 28, 0.9) 50%, rgba(153, 27, 27, 0.8) 100%)',
      border: '1px solid rgba(248, 113, 113, 0.4)',
      backdropFilter: 'blur(10px)',
    };
  }
  return {
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(59, 130, 246, 0.2) 100%)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
  };
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
      <div className="flex flex-col gap-4 w-full max-w-xl mx-auto">
        <div className="animate-pulse h-16 bg-gradient-to-r from-blue-500/20 to-white/10 rounded-xl"></div>
        <div className="animate-pulse h-16 bg-gradient-to-r from-blue-500/20 to-white/10 rounded-xl"></div>
      </div>
    );
  }

  if (error || servers.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        <p>No servers available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-xl mx-auto">
      {servers.map((server) => (
        <Link
          key={server.id}
          href={server.id === 0 ? '/pair' : `/pair?server=${server.id}`}
          className={`group relative w-full rounded-xl font-semibold transition-all duration-300 overflow-hidden ${
            !server.available ? 'pointer-events-none' : 'hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20'
          }`}
          style={getButtonStyle(server.available)}
        >
          <div className="flex items-center justify-between px-8 py-5">
            <div className="flex items-center gap-4">
              <span className={`w-3 h-3 rounded-full ${getStatusDotColor(server.userCount, server.available)} ${server.available && server.userCount <= 30 ? 'animate-pulse' : ''}`}></span>
              <span className="text-lg text-white font-medium">{server.name}</span>
            </div>
            {server.available ? (
              <div className={`flex items-center gap-2 ${getUserCountColor(server.userCount, server.available)}`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                <span className="text-lg font-bold">{server.userCount}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="text-lg font-bold">Server Busy</span>
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
