
import React, { useEffect, useState } from 'react';
import { dateService, ConfirmedDate } from '@/services/dateService';
import { toast } from '@/components/ui/sonner';
import { dateOptions } from '@/data/dateOptions';

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

  const getDateDetails = (dateId: string) => {
    return dateOptions.find(date => date.id === dateId);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl text-white mb-4">Confirmed Dates</h2>
          <div className="space-y-6">
            {confirmedDates.map((date) => {
              const dateDetails = getDateDetails(date.date_id);
              return (
                <div key={date.id} className="bg-slate-700 p-6 rounded-lg">
                  <div className="flex flex-col md:flex-row gap-6">
                    {dateDetails && (
                      <div className="w-full md:w-1/3">
                        <img 
                          src={dateDetails.imageSrc} 
                          alt={dateDetails.title} 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-white text-xl font-medium">{date.user_name}</p>
                          <p className="text-slate-300 text-lg">{date.date_title}</p>
                        </div>
                        <p className="text-slate-400 text-sm">
                          {new Date(date.confirmed_at).toLocaleString()}
                        </p>
                      </div>
                      {dateDetails && (
                        <div className="space-y-3">
                          <p className="text-slate-300">{dateDetails.description}</p>
                          <div>
                            <h4 className="text-slate-200 font-medium mb-2">Activities:</h4>
                            <ul className="list-disc list-inside text-slate-300">
                              {dateDetails.activities.map((activity, index) => (
                                <li key={index}>{activity}</li>
                              ))}
                            </ul>
                          </div>
                          {dateDetails.mood && (
                            <p className="text-slate-300">
                              <span className="text-slate-200 font-medium">Mood: </span>
                              {dateDetails.mood}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {confirmedDates.length === 0 && (
              <p className="text-slate-400 text-center py-4">No confirmed dates yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
