import React from 'react';

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    description?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, title, value, description }) => {
    return (
        <div className="bg-slate-900/50 p-4 rounded-lg flex items-center gap-4 border border-slate-800">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-slate-800 rounded-lg text-indigo-400">
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
                 {description && <p className="text-xs text-gray-500">{description}</p>}
            </div>
        </div>
    );
};
