
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { DateType } from '@/types/date';

interface DateModalProps {
  date: DateType | null;
  isOpen: boolean;
  onClose: () => void;
  onChooseDate: () => void;
}

const DateModal: React.FC<DateModalProps> = ({ date, isOpen, onClose, onChooseDate }) => {
  if (!date) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-slate-800 text-white rounded-lg">
        <div className="h-[200px] overflow-hidden">
          <img 
            src={date.imageSrc} 
            alt={date.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="font-poppins text-2xl">{date.title}</DialogTitle>
          <DialogDescription className="text-slate-300 mt-2">
            {date.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-6 pt-0">
          <div className="mb-4">
            <h4 className="font-medium text-sm mb-2 text-slate-200">What you'll do:</h4>
            <ul className="space-y-1 text-sm">
              {date.activities.map((activity, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="bg-blue-500/20 rounded-full w-5 h-5 flex items-center justify-center text-xs text-blue-400">
                    {index + 1}
                  </span>
                  <span className="text-slate-300">{activity}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {date.mood && (
            <div className="mb-4">
              <h4 className="font-medium text-sm mb-1 text-slate-200">Mood:</h4>
              <p className="text-sm text-slate-300">{date.mood}</p>
            </div>
          )}
        </div>
        
        <DialogFooter className="p-6 pt-0 gap-4">
          <Button variant="outline" onClick={onClose} className="text-slate-300 border-slate-600 hover:bg-slate-700">
            Maybe Later
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white" 
            onClick={onChooseDate}
          >
            Choose This Date
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DateModal;
