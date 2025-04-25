
import React, { useEffect, useState } from 'react';
import { dateService, ConfirmedDate } from '@/services/dateService';
import { toast } from '@/components/ui/use-toast';

export default function ConfirmedDates() {
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
    <div className="mt-8 p-6 bg-slate-800 rounded-2xl border border-date-softPurple">
      <h3 className="font-playfair text-2xl text-white mb-4">Confirmed Dates</h3>
      <div className="space-y-4">
        {confirmedDates.map((date) => (
          <div key={date.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
            <div>
              <p className="text-white font-medium">{date.user_name}</p>
              <p className="text-slate-300">{date.date_title}</p>
            </div>
            <p className="text-slate-400 text-sm">
              {new Date(date.confirmed_at).toLocaleDateString()}
            </p>
          </div>
        ))}
        {confirmedDates.length === 0 && (
          <p className="text-slate-400 text-center">No confirmed dates yet</p>
        )}
      </div>
    </div>
  );
}
