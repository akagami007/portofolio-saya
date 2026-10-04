"use client";

import { useEffect, useState } from "react";
import { Activity, GitBranch, Code2, Eye, Server, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Metrics = {
  github: {
    commits: number;
    repos: number;
    stars: number;
    topLanguage: string;
  };
  wakatime: {
    hoursThisWeek: number;
    languages: { name: string; percent: number }[];
  };
  pageViews: number;
};

export default function LiveDashboard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    fetch("/api/metrics")
      .then((res) => res.json())
      .then((data) => {
        setMetrics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load metrics:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full mt-12 bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden group">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000 -z-10"></div>
      
      <div className="flex items-center gap-3 mb-8">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
          <Server className="w-5 h-5 text-blue-500" />
          Live System Metrics
        </h3>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
      ) : metrics ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-5 hover:bg-white/60 dark:hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-4 text-gray-700 dark:text-gray-300">
              <GitBranch className="w-5 h-5" />
              <h4 className="font-semibold text-sm uppercase tracking-wider">GitHub</h4>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-gray-400 text-sm">Commits (2024)</span>
                <span className="font-bold text-gray-900 dark:text-white">{metrics.github.commits.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-gray-400 text-sm">Repositories</span>
                <span className="font-bold text-gray-900 dark:text-white">{metrics.github.repos}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-gray-400 text-sm">Top Language</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{metrics.github.topLanguage}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-5 hover:bg-white/60 dark:hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-4 text-gray-700 dark:text-gray-300">
              <Code2 className="w-5 h-5" />
              <h4 className="font-semibold text-sm uppercase tracking-wider">WakaTime</h4>
            </div>
            <div className="mb-4 flex justify-between items-end">
              <span className="text-gray-500 dark:text-gray-400 text-sm">Hours (This Week)</span>
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">{metrics.wakatime.hoursThisWeek}h</span>
            </div>
            <div className="space-y-2">
              {metrics.wakatime.languages.map((lang) => (
                <div key={lang.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 dark:text-gray-400">{lang.name}</span>
                    <span className="text-gray-800 dark:text-gray-200 font-medium">{lang.percent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5">
                    <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${lang.percent}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-5 hover:bg-white/60 dark:hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3 mb-4 text-gray-700 dark:text-gray-300">
              <Activity className="w-5 h-5" />
              <h4 className="font-semibold text-sm uppercase tracking-wider">System Status</h4>
            </div>
            <div className="flex flex-col h-full justify-between pb-4">
              <div className="flex justify-between items-center bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 p-3 rounded-lg mb-4">
                <span className="text-green-700 dark:text-green-400 text-sm font-medium">Database</span>
                <span className="text-green-600 dark:text-green-300 text-xs font-bold px-2 py-1 bg-green-100 dark:bg-green-500/20 rounded-full">CONNECTED</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-500 dark:text-gray-400 text-sm">Total Views</span>
                </div>
                <span className="font-bold text-gray-900 dark:text-white text-xl">{metrics.pageViews.toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">Failed to load metrics</div>
      )}
    </div>
  );
}
