
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HOLIDAYS: { [key: string]: { date: string; name: string; type?: string }[] } = {
  January: [
    { date: "26 January", name: "Republic Day", type: "National Holiday" },
  ],
  February: [],
  March: [],
  April: [
    { date: "14 April", name: "Ambedkar Jayanti" },
    { date: "17 April", name: "Ram Navami" },
  ],
  May: [
    { date: "1 May", name: "Maharashtra Day" },
  ],
  June: [],
  July: [],
  August: [
    { date: "15 August", name: "Independence Day", type: "National Holiday" },
    { date: "19 August", name: "Raksha Bandhan" },
  ],
  September: [],
  October: [
    { date: "2 October", name: "Gandhi Jayanti", type: "National Holiday" },
    { date: "12 October", name: "Dussehra" },
  ],
  November: [
    { date: "1 November", name: "Diwali (Deepavali)" },
    { date: "15 November", name: "Bhai Dooj" },
  ],
  December: [
    { date: "25 December", name: "Christmas Day" },
  ],
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function LeaveCalendarPage() {
  return (
    <div className="text-white p-4 sm:p-8 max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-2">Leave Calender</h2>
      <p className="mb-6 text-slate-300">
        Browse the list of holidays month-wise. National holidays are highlighted. Click each month to expand for holiday details.
      </p>
      <Accordion type="multiple" className="w-full">
        {MONTHS.map((month) => (
          <AccordionItem key={month} value={month} className="border-b border-slate-800">
            <AccordionTrigger className="bg-slate-900 text-primary px-4 py-3 rounded-t-lg text-lg font-medium hover:bg-slate-800 transition-colors">
              {month}
            </AccordionTrigger>
            <AccordionContent className="p-0">
              <Card className="bg-slate-950 rounded-b-lg border-0">
                <CardContent className="p-3 sm:p-6">
                  {HOLIDAYS[month] && HOLIDAYS[month].length > 0 ? (
                    <ul className="divide-y divide-slate-800">
                      {HOLIDAYS[month].map((holiday, idx) => (
                        <li key={idx} className="py-2 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          <span className={`font-medium ${holiday.type === "National Holiday" ? "text-green-400" : "text-slate-100"}`}>
                            {holiday.name}
                            {holiday.type === "National Holiday" && (
                              <span className="ml-2 inline-block bg-green-800 text-green-100 text-xs font-semibold px-2 py-0.5 rounded">
                                National Holiday
                              </span>
                            )}
                          </span>
                          <span className="text-slate-400 text-sm mt-1 sm:mt-0 sm:ml-2">{holiday.date}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-slate-500 text-sm py-4 text-center">No holidays this month.</div>
                  )}
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
