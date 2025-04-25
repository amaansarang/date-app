
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
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white rounded-2xl">
        <div className="h-[200px] overflow-hidden">
          <img 
            src={date.imageSrc} 
            alt={date.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="font-playfair text-2xl">{date.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            {date.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-6 pt-0">
          <div className="mb-4">
            <h4 className="font-medium text-sm mb-2">What you'll do:</h4>
            <ul className="space-y-1 text-sm">
              {date.activities.map((activity, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="bg-date-softPurple rounded-full w-5 h-5 flex items-center justify-center text-xs text-date-purple">
                    {index + 1}
                  </span>
                  {activity}
                </li>
              ))}
            </ul>
          </div>
          
          {date.mood && (
            <div className="mb-4">
              <h4 className="font-medium text-sm mb-1">Mood:</h4>
              <p className="text-sm">{date.mood}</p>
            </div>
          )}
        </div>
        
        <DialogFooter className="p-6 pt-0">
          <Button variant="outline" onClick={onClose}>
            Maybe Later
          </Button>
          <Button className="bg-gradient-to-r from-date-purple to-date-pink text-white" onClick={onChooseDate}>
            Choose This Date
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DateModal;
