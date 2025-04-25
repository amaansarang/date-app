
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Heart } from 'lucide-react';
import DateCard from '@/components/DateCard';
import DateModal from '@/components/DateModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { dateOptions } from '@/data/dateOptions';
import { DateType } from '@/types/date';

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<DateType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chosenDate, setChosenDate] = useState<DateType | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

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
        description: "Can't wait to see you there!",
      });
    }
  };

  const filteredDates = filter 
    ? dateOptions.filter(date => date.category === filter) 
    : dateOptions;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-custom">
      <Header />
      
      <main className="flex-grow container max-w-5xl px-4 md:px-6 pt-8 pb-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="gradient-text">Perfect Date</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore unique date experiences tailored just for you. Each card holds a new adventure waiting to happen.
          </p>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 flex-wrap justify-center">
            <Button 
              variant={filter === null ? "default" : "outline"}
              onClick={() => setFilter(null)}
              className="rounded-full"
            >
              All Dates
            </Button>
            <Button 
              variant={filter === "indoor" ? "default" : "outline"}
              onClick={() => setFilter("indoor")}
              className="rounded-full"
            >
              Indoor
            </Button>
            <Button 
              variant={filter === "outdoor" ? "default" : "outline"}
              onClick={() => setFilter("outdoor")}
              className="rounded-full"
            >
              Outdoor
            </Button>
          </div>
        </div>

        {chosenDate && (
          <div className="mb-10 bg-white rounded-2xl p-6 shadow-lg border border-date-softPurple animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="text-date-pink h-5 w-5 fill-date-pink animate-pulse-soft" />
              <h3 className="font-playfair text-xl font-medium">Your Chosen Date</h3>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <img 
                src={chosenDate.imageSrc} 
                alt={chosenDate.title} 
                className="w-full md:w-1/3 h-48 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-playfair text-xl font-bold mb-2">{chosenDate.title}</h4>
                <p className="text-muted-foreground mb-4">{chosenDate.description}</p>
                <Button 
                  variant="outline" 
                  onClick={() => setChosenDate(null)}
                  className="text-sm"
                >
                  Choose Another Date
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredDates.map((date) => (
            <DateCard
              key={date.id}
              title={date.title}
              description={date.description}
              imageSrc={date.imageSrc}
              onClick={() => handleDateClick(date)}
              className={chosenDate?.id === date.id ? "ring-2 ring-date-purple" : ""}
            />
          ))}
        </div>
      </main>
      
      <Footer />
      
      {selectedDate && (
        <DateModal
          date={selectedDate}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onChooseDate={handleChooseDate}
        />
      )}
    </div>
  );
};

export default Index;
