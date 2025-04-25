
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ConfirmedDate {
  id: number;
  user_name: string;
  date_title: string;
  date_id: string;
  confirmed_at: string;
}

export default function ConfirmedDates() {
  const [confirmedDates, setConfirmedDates] = useState<ConfirmedDate[]>([]);

  useEffect(() => {
    const fetchConfirmedDates = async () => {
      const { data, error } = await supabase
        .from('confirmed_dates')
        .select('*')
        .order('confirmed_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching confirmed dates:', error);
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
