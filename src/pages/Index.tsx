import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/components/ui/sonner';
import { Heart } from 'lucide-react';
import DateCard from '@/components/DateCard';
import DateModal, { NameInputDialog } from '@/components/DateModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConfirmedDates from '@/components/ConfirmedDates';
import { dateOptions } from '@/data/dateOptions';
import { DateType } from '@/types/date';
import { dateService } from '@/services/dateService'; // Assuming this import is correct

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<DateType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chosenDate, setChosenDate] = useState<DateType | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [secretMessage, setSecretMessage] = useState<string>("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const handleDateClick = (date: DateType) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleChooseDate = () => {
    if (selectedDate) {
      setChosenDate(selectedDate);
      setIsModalOpen(false);
      toast.success(`You've chosen the ${selectedDate.title}!`, {
        description: "Can't wait to see you there!"
      });
    }
  };
  const filteredDates = filter ? dateOptions.filter(date => date.category === filter) : dateOptions;
  return <div className="min-h-screen flex flex-col bg-gradient-custom">
      <Header />

      <main className="flex-grow container max-w-5xl px-4 md:px-6 pt-8 pb-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="gradient-text font-extrabold">Date With Me</span>
          </h2>
          <p className="text-lg text-muted-foreground">Hey Babygirl, Welcome to my App. Each card holds a new adventure so lets get going BABYYYY.  Tap on the cards for more info.</p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex gap-2 flex-wrap justify-center">
            <Button variant={filter === null ? "default" : "outline"} onClick={() => setFilter(null)} className="rounded-full font-semibold">
              All Dates
            </Button>
            <Button variant={filter === "indoor" ? "default" : "outline"} onClick={() => setFilter("indoor")} className="rounded-full">
              Indoor
            </Button>
            <Button variant={filter === "outdoor" ? "default" : "outline"} onClick={() => setFilter("outdoor")} className="rounded-full">
              Outdoor
            </Button>
          </div>
        </div>

        {chosenDate && <div className="mb-10 bg-slate-800 rounded-2xl p-6 shadow-lg border border-date-softPurple animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="text-date-pink h-5 w-5 fill-date-pink animate-pulse-soft" />
              <h3 className="font-playfair text-xl font-medium">Your Chosen Date</h3>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <img src={chosenDate.imageSrc} alt={chosenDate.title} className="w-full md:w-1/3 h-48 object-cover rounded-lg" />
              <div className="flex-1">
                <h4 className="font-playfair text-xl font-bold mb-2 text-white">{chosenDate.title}</h4>
                <p className="text-slate-300 mb-4">{chosenDate.description}</p>
                {!isConfirmed ? (
                  <Button 
                    onClick={async () => {
                      try {
                        const { error } = await dateService.confirmDate(
                          userName,
                          chosenDate.title,
                          chosenDate.id,
                          secretMessage
                        );

                        if (error) throw error;
                        setIsConfirmed(true);
                        toast.success('Date confirmed successfully!');
                      } catch (error) {
                        console.error('Error confirming date:', error);
                        toast.error('Failed to confirm date. Please try again.');
                      }
                    }} 
                    className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={!userName.trim()}
                  >
                    Confirm Date
                  </Button>
                ) : null}
                <Button variant="outline" onClick={() => {
                  setChosenDate(null);
                  setUserName("");
                  setIsConfirmed(false);
                }} className="text-sm text-slate-300 hover:text-white">
                  Choose Another Date
                </Button>
              </div>
            </div>
          </div>}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredDates.map(date => <DateCard key={date.id} title={date.title} description={date.description} imageSrc={date.imageSrc} onClick={() => handleDateClick(date)} className={chosenDate?.id === date.id ? "ring-2 ring-date-purple" : ""} />)}
        </div>
      </main>

      <Footer />

      {selectedDate && <DateModal date={selectedDate} isOpen={isModalOpen} onClose={handleCloseModal} onChooseDate={handleChooseDate} />}
      <Dialog open={isConfirmed} onOpenChange={(open) => {
        if (!open) {
          setIsConfirmed(false);
          setChosenDate(null);
          setUserName("");
          setSecretMessage("");
        }
      }}>
        <DialogContent className="sm:max-w-[500px] bg-slate-800 text-white">
          <DialogHeader>
            <DialogTitle>Date Confirmed! ❤️</DialogTitle>
            <DialogDescription className="text-slate-300">
              Your date has been successfully confirmed. Can't wait to see you there!
            </DialogDescription>
          </DialogHeader>
          {chosenDate && (
            <div className="p-4">
              <div className="rounded-lg overflow-hidden mb-4">
                <img src={chosenDate.imageSrc} alt={chosenDate.title} className="w-full h-48 object-cover"/>
              </div>
              <h3 className="text-lg font-semibold mb-2">{chosenDate.title}</h3>
              <p className="text-slate-300 mb-3">{chosenDate.description}</p>
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-slate-200">What you'll do:</h4>
                <ul className="space-y-1">
                  {chosenDate.activities.map((activity, index) => (
                    <li key={index} className="text-sm text-slate-300 flex gap-2">
                      <span className="text-blue-400">•</span>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => {
              setChosenDate(null);
              setUserName("");
              setIsConfirmed(false);
            }}>
              Choose Another Date
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <NameInputDialog 
        isOpen={!!chosenDate && !isConfirmed} 
        onClose={() => setChosenDate(null)}
        onSubmit={async () => {
          try {
            const { error } = await dateService.confirmDate(
              userName,
              chosenDate!.title,
              chosenDate!.id,
              secretMessage
            );
            if (error) throw error;
            setIsConfirmed(true);
            toast.success('Date confirmed successfully!');
          } catch (error) {
            console.error('Error confirming date:', error);
            toast.error('Failed to confirm date. Please try again.');
          }
        }}
        userName={userName}
        setUserName={setUserName}
        secretMessage={secretMessage}
        setSecretMessage={setSecretMessage}
      />
    </div>;
};
export default Index;