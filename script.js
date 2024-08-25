function formatDateToUTC7(dateString) {
    const date = new Date(dateString);
    const utc7Date = new Date(date.getTime() + 7 * 60 * 60 * 1000);
    return utc7Date.toISOString().replace(/-|:|\.\d{3}/g, "");
}

function generateICS(events) {
    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nCALSCALE:GREGORIAN\n";
    events.forEach(event => {
        icsContent += `BEGIN:VEVENT\nSUMMARY:${event.title}\nDTSTART:${formatDateToUTC7(event.start)}\nDTEND:${formatDateToUTC7(event.end)}\nEND:VEVENT\n`;
    });
    icsContent += "END:VCALENDAR";
    return icsContent;
}

const events = $('#calendar').fullCalendar('clientEvents');
const icsData = generateICS(events);
const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
const link = document.createElement('a');
link.href = URL.createObjectURL(blob);
link.download = 'calendar.ics';
link.click();
