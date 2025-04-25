
import { supabase } from '@/integrations/supabase/client';

export interface ConfirmedDate {
  id: number;
  user_name: string;
  date_title: string;
  date_id: string;
  confirmed_at: string;
}

export const dateService = {
  async confirmDate(userName: string, dateTitle: string, dateId: string): Promise<{ data: ConfirmedDate | null; error: any }> {
    const { data, error } = await supabase
      .from('confirmed_dates')
      .insert([
        { user_name: userName, date_title: dateTitle, date_id: dateId }
      ])
      .select()
      .single();
    
    return { data, error };
  },

  async getConfirmedDates(): Promise<{ data: ConfirmedDate[] | null; error: any }> {
    const { data, error } = await supabase
      .from('confirmed_dates')
      .select('*')
      .order('confirmed_at', { ascending: false });
    
    return { data, error };
  }
};
