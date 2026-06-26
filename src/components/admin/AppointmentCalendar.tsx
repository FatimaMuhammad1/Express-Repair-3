import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus, Clock, User, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { buildUrl, getStoredToken } from "@/lib/api";
import { toast } from "sonner";

interface Appointment {
  id: string;
  customer_name: string;
  customer_phone: string;
  device_model: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  notes?: string;
}

interface AppointmentCalendarProps {
  onNewAppointment?: () => void;
}

export default function AppointmentCalendar({ onNewAppointment }: AppointmentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, [currentDate]);

  const fetchAppointments = async () => {
    try {
      const token = getStoredToken();
      const res = await fetch(buildUrl("/bookings"), {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (data.success && data.bookings) {
        setAppointments(data.bookings);
      }
    } catch (e) {
      console.error("Failed to fetch appointments:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startDayOfWeek };
  };

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(apt => {
      const aptDate = new Date(apt.appointment_date).toISOString().split('T')[0];
      return aptDate === dateStr;
    });
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const { daysInMonth, startDayOfWeek } = getDaysInMonth(currentDate);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const renderCalendarGrid = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-[#0B0D17]"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayAppointments = getAppointmentsForDate(date);
      const isToday = new Date().toDateString() === date.toDateString();
      const isSelected = selectedDate?.toDateString() === date.toDateString();

      days.push(
        <motion.div
          key={day}
          whileHover={{ scale: 1.02 }}
          onClick={() => setSelectedDate(date)}
          className={`h-24 p-2 border border-[#1F2235] rounded-lg cursor-pointer transition-colors ${
            isToday ? 'bg-violet-900/20 border-violet-500' : 'bg-[#0B0D17]'
          } ${isSelected ? 'ring-2 ring-violet-500' : ''}`}
        >
          <div className={`text-sm font-medium ${isToday ? 'text-violet-400' : 'text-slate-300'}`}>
            {day}
          </div>
          {dayAppointments.length > 0 && (
            <div className="mt-1 space-y-1">
              {dayAppointments.slice(0, 2).map((apt, idx) => (
                <div
                  key={idx}
                  className="text-xs bg-violet-600/20 text-violet-300 px-1 py-0.5 rounded truncate"
                  title={`${apt.customer_name} - ${apt.appointment_time}`}
                >
                  {apt.customer_name}
                </div>
              ))}
              {dayAppointments.length > 2 && (
                <div className="text-xs text-slate-500">
                  +{dayAppointments.length - 2} more
                </div>
              )}
            </div>
          )}
        </motion.div>
      );
    }
    
    return days;
  };

  const renderSelectedDayAppointments = () => {
    if (!selectedDate) return null;
    
    const dayAppointments = getAppointmentsForDate(selectedDate);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 bg-[#0B0D17] rounded-xl p-4 border border-[#1F2235]"
      >
        <h3 className="text-lg font-semibold text-white mb-4">
          Appointments for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </h3>
        {dayAppointments.length === 0 ? (
          <p className="text-slate-500 text-sm">No appointments scheduled</p>
        ) : (
          <div className="space-y-3">
            {dayAppointments.map((apt) => (
              <div key={apt.id} className="bg-[#11131E] rounded-lg p-3 border border-[#1F2235]">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-white font-medium">
                      <User className="h-4 w-4 text-slate-400" />
                      {apt.customer_name}
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                      <Phone className="h-3 w-3" />
                      {apt.customer_phone}
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
                      <Clock className="h-3 w-3" />
                      {apt.appointment_time}
                    </div>
                    <div className="text-slate-500 text-sm mt-1">
                      Device: {apt.device_model}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    apt.status === 'confirmed' ? 'bg-emerald-900/30 text-emerald-400' :
                    apt.status === 'pending' ? 'bg-amber-900/30 text-amber-400' :
                    'bg-slate-800 text-slate-400'
                  }`}>
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="bg-[#11131E] rounded-xl p-6 border border-[#1F2235]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <CalendarIcon className="h-5 w-5 text-violet-400" />
          <h2 className="text-lg font-semibold text-white">Appointment Calendar</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-[#1F2235] rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-white font-medium min-w-[150px] text-center">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-[#1F2235] rounded-lg transition-colors text-slate-400 hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          {onNewAppointment && (
            <button
              onClick={onNewAppointment}
              className="ml-4 bg-violet-600 hover:bg-violet-700 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 transition-colors"
            >
              <Plus className="h-4 w-4" />
              New Appointment
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-slate-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {isLoading ? (
          <div className="col-span-7 text-center py-12 text-slate-500">Loading appointments...</div>
        ) : (
          renderCalendarGrid()
        )}
      </div>

      <AnimatePresence>
        {selectedDate && renderSelectedDayAppointments()}
      </AnimatePresence>
    </div>
  );
}
