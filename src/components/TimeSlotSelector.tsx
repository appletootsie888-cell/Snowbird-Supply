import React from 'react';
import { TimeSlot } from '../types';

interface TimeSlotSelectorProps {
  timeSlots: TimeSlot[];
  selectedSlot: TimeSlot | null;
  onSlotSelect: (slot: TimeSlot) => void;
  deliveryMethod: 'pickup' | 'delivery';
}

const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  timeSlots,
  selectedSlot,
  onSlotSelect,
  deliveryMethod
}) => {
  const groupedSlots = timeSlots.reduce((groups, slot) => {
    if (!groups[slot.date]) {
      groups[slot.date] = [];
    }
    groups[slot.date].push(slot);
    return groups;
  }, {} as Record<string, TimeSlot[]>);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Select your {deliveryMethod} time
        </h3>
        <p className="text-gray-600">
          {deliveryMethod === 'pickup' 
            ? 'Choose when you\'d like to pick up your order at the store'
            : 'Choose when you\'d like your order delivered to your address'
          }
        </p>
      </div>

      {Object.entries(groupedSlots).map(([date, slots]) => (
        <div key={date} className="space-y-3">
          <h4 className="font-medium text-gray-900 border-b border-gray-200 pb-2">
            {formatDate(date)}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {slots.map(slot => (
              <button
                key={slot.id}
                onClick={() => slot.available && onSlotSelect(slot)}
                disabled={!slot.available}
                className={`p-3 rounded-lg text-sm font-medium transition-all ${
                  selectedSlot?.id === slot.id
                    ? 'bg-blue-600 text-white ring-2 ring-blue-600'
                    : slot.available
                    ? 'bg-white border border-gray-300 text-gray-900 hover:border-blue-500 hover:bg-blue-50'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {slot.time}
                {!slot.available && (
                  <div className="text-xs mt-1">Unavailable</div>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimeSlotSelector;