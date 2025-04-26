
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

export const NameInputDialog = ({ 
  isOpen, 
  onClose, 
  onSubmit,
  userName,
  setUserName,
  secretMessage,
  setSecretMessage 
}: { 
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  userName: string;
  setUserName: (name: string) => void;
  secretMessage: string;
  setSecretMessage: (msg: string) => void;
}) => {
  const handleClose = () => {
    setUserName("");
    setSecretMessage("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[500px] bg-slate-800 text-white">
        <DialogHeader>
          <DialogTitle>Enter Your Name</DialogTitle>
          <DialogDescription className="text-slate-300">
            Please enter your name to confirm the date.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <input
            autoFocus
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-2 rounded-md bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-blue-500"
          />
          <textarea
            placeholder="Secret message (optional)"
            className="w-full p-2 rounded-md bg-slate-700 text-white border border-slate-600 focus:outline-none focus:border-blue-500 resize-none h-20"
            onChange={(e) => setSecretMessage(e.target.value)}
            value={secretMessage}
          />
        </div>
        <DialogFooter className="space-x-2">
          <Button onClick={onClose} variant="outline" className="text-slate-300">
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={!userName.trim()}>
            Confirm Date
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DateModal;
