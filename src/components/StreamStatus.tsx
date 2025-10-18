import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Wifi, WifiOff, Loader2, AlertCircle } from 'lucide-react';

interface StreamStatusProps {
  status: 'online' | 'offline' | 'connecting' | 'error';
  listeners?: number;
  uptime?: string;
  className?: string;
}

const StreamStatus: React.FC<StreamStatusProps> = ({ 
  status, 
  listeners, 
  uptime, 
  className = "" 
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'online':
        return {
          icon: Wifi,
          text: 'LIVE',
          bgColor: 'bg-green-500',
          textColor: 'text-green-100',
          borderColor: 'border-green-400',
          iconColor: 'text-green-100'
        };
      case 'connecting':
        return {
          icon: Loader2,
          text: 'CONNECTING',
          bgColor: 'bg-yellow-500',
          textColor: 'text-yellow-100',
          borderColor: 'border-yellow-400',
          iconColor: 'text-yellow-100'
        };
      case 'error':
        return {
          icon: AlertCircle,
          text: 'ERROR',
          bgColor: 'bg-red-500',
          textColor: 'text-red-100',
          borderColor: 'border-red-400',
          iconColor: 'text-red-100'
        };
      default:
        return {
          icon: WifiOff,
          text: 'OFFLINE',
          bgColor: 'bg-gray-500',
          textColor: 'text-gray-100',
          borderColor: 'border-gray-400',
          iconColor: 'text-gray-100'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Status Indicator */}
      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${config.bgColor} ${config.borderColor} border`}>
        <Icon 
          className={`w-4 h-4 ${config.iconColor} ${status === 'connecting' ? 'animate-spin' : ''}`} 
        />
        <span className={`text-xs font-semibold ${config.textColor}`}>
          {config.text}
        </span>
      </div>

      {/* Additional Info */}
      {status === 'online' && listeners !== undefined && (
        <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>{listeners} listeners</span>
        </div>
      )}

      {uptime && status === 'online' && (
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Uptime: {uptime}
        </div>
      )}
    </div>
  );
};

export default StreamStatus;

