export default function ScheduleBoard({ schedule }) {
    return (
        <div className="w-full h-full flex justify-between">
            {schedule.map(({ date, events }, index) => 
                <ScheduleColumn key={index} date={date} events={events} index={index} />
            )}
        </div>
    )
}

function ScheduleColumn({ date, events, index }) {
    const getDayName = (dateStr) => {
        const [day, month] = dateStr.split('/').map(Number)
        const year = new Date().getFullYear()
        return new Date(year, month-1, day)
                .toLocaleDateString('pt-br', {weekday: 'long'})
                .toUpperCase()
    }

    const weekday = getDayName(date)

    return (
        <div 
            style={{fontFamily: '"all-round-gothic", sans-serif', borderLeft: index==0 ? 'none' : '1px solid rgba(250, 249, 246, 1)'}}
            className="px-4 flex-1"
        >
            <div
                className="text-[18px] font-bold pb-3"
            >
                <p>{ date }</p>
                <p>{ weekday }</p>
            </div>
            <div>
                {events.map(({ time, title, local }, index) => 
                    <ScheduleItem key={index} time={time} title={title} local={local} />
                )}
            </div>
        </div>
    )
}

function ScheduleItem({ time, title, local }) {
    return (
        <div className="text-[16px] flex flex-col">
            <div className="flex flex-row justify-between">
                <p className="font-bold">{ time }</p>
                <p className="font-medium">{ title }</p>
            </div>
            <p className="font-light self-end pr-2">&#128205; { local }</p>
        </div>
    )
}