import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const marketingDates2025 = {
  "2025-01-01": { event: "Ano Novo", type: "holiday" },
  "2025-01-28": { event: "Data Mundial do Instagram Stories", type: "social" },
  "2025-02-04": { event: "Dia Mundial do Facebook", type: "social" },
  "2025-02-14": { event: "Dia dos Namorados", type: "marketing" },
  "2025-03-08": { event: "Dia Internacional da Mulher", type: "marketing" },
  "2025-03-21": { event: "Dia Mundial do Twitter", type: "social" },
  "2025-04-17": { event: "Dia Mundial do Marketing Digital", type: "marketing" },
  "2025-05-12": { event: "Dia das Mães", type: "marketing" },
  "2025-06-12": { event: "Dia dos Namorados (BR)", type: "marketing" },
  "2025-06-30": { event: "Dia Internacional das Redes Sociais", type: "social" },
  "2025-07-15": { event: "Dia Mundial do Instagram", type: "social" },
  "2025-08-09": { event: "Dia dos Pais", type: "marketing" },
  "2025-09-21": { event: "Dia Mundial do TikTok", type: "social" },
  "2025-10-12": { event: "Dia das Crianças", type: "marketing" },
  "2025-11-25": { event: "Black Friday", type: "marketing" },
  "2025-12-25": { event: "Natal", type: "holiday" },
};

const MarketingCalendar = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 shadow-xl rounded-xl">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Calendário de Marketing 2025
          </h2>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">Social</Badge>
            <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">Marketing</Badge>
            <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">Feriado</Badge>
          </div>
        </div>
        
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border-none"
          modifiers={{
            booked: (date) => {
              const dateStr = date.toISOString().split('T')[0];
              return dateStr in marketingDates2025;
            },
          }}
          modifiersStyles={{
            booked: {
              fontWeight: "bold",
              backgroundColor: "rgba(139, 92, 246, 0.1)",
              color: "#6d28d9",
            },
          }}
          components={{
            DayContent: ({ date }) => {
              const dateStr = date.toISOString().split('T')[0];
              const eventInfo = marketingDates2025[dateStr as keyof typeof marketingDates2025];

              return (
                <div className={cn(
                  "w-full h-full flex items-center justify-center relative",
                  eventInfo && "font-semibold"
                )}>
                  {date.getDate()}
                  {eventInfo && (
                    <span className={cn(
                      "absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-1 rounded-full",
                      eventInfo.type === "social" && "bg-blue-500",
                      eventInfo.type === "marketing" && "bg-green-500",
                      eventInfo.type === "holiday" && "bg-red-500"
                    )} />
                  )}
                </div>
              );
            },
          }}
        />

        {date && marketingDates2025[date.toISOString().split('T')[0] as keyof typeof marketingDates2025] && (
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="font-semibold text-lg">
              {marketingDates2025[date.toISOString().split('T')[0] as keyof typeof marketingDates2025].event}
            </h3>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MarketingCalendar;