
import React, { useEffect, useState } from 'react';
import { dateService, ConfirmedDate } from '@/services/dateService';
import { toast } from '@/components/ui/sonner';

export default function Admin() {
  const [confirmedDates, setConfirmedDates] = useState<ConfirmedDate[]>([]);

  useEffect(() => {
    const fetchConfirmedDates = async () => {
      const { data, error } = await dateService.getConfirmedDates();
      
      if (error) {
        console.error('Error fetching confirmed dates:', error);
        toast({
          variant: "destructive",
          title: "Error fetching dates",
          description: "Please try again later"
        });
        return;
      }
      
      setConfirmedDates(data || []);
    };

    fetchConfirmedDates();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl text-white mb-4">Confirmed Dates</h2>
          <div className="space-y-4">
            {confirmedDates.map((date) => (
              <div key={date.id} className="bg-slate-700 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white font-medium">{date.user_name}</p>
                    <p className="text-slate-300">{date.date_title}</p>
                  </div>
                  <p className="text-slate-400 text-sm">
                    {new Date(date.confirmed_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
            {confirmedDates.length === 0 && (
              <p className="text-slate-400 text-center py-4">No confirmed dates yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
