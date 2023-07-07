<template>
    <div>
        <FullCalendar
            ref="fullCalendar"
            defaultView="dayGridMonth"
            :options="calendarOptions"
            :events="events"
            :plugins="plugins"
            @eventRender="eventRender"
        />
    </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue3";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import axios from "axios";

export default {
    components: {
        FullCalendar, // make the <FullCalendar> tag available
    },
    data() {
        return {
            calendarOptions: {
                plugins: [
                    dayGridPlugin,
                    interactionPlugin,
                    timeGridPlugin,
                    listPlugin,
                ],
                initialView: "dayGridMonth",
                locale: "ja",
                height: "auto",
                views: {
                    dayGridTwoWeek: {
                        type: "dayGrid",
                        buttonText: "2週間",
                        duration: { weeks: 2 },
                    },
                },
                headerToolbar: {
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,dayGridTwoWeek,timeGridWeek,listMonth",
                },
                buttonText: {
                    today: "今日",
                    week: "週",
                    month: "月",
                    list: "一覧",
                },

                noEventsContent: "スケジュールはありません",

                events: function (selectInfo, successCallback) {
                    console.log(selectInfo);
                    let start_date = selectInfo.startStr.valueOf();
                    console.log(start_date);
                    // Laravelのイベント取得処理の呼び出し
                    axios
                        .post("api/event/event-get", {
                            start_date: selectInfo.startStr.valueOf(),
                            end_date: selectInfo.endStr.valueOf(),
                        })
                        .then((response) => {
                            // カレンダーに読み込み
                            successCallback(response.data);
                        })
                        .catch(() => {
                            // バリデーションエラーなど
                            alert("登録に失敗しました");
                        });
                },

                dateClick: function (selectInfo) {
                    console.log(selectInfo);
                    let date = selectInfo.dateStr;
                    let title = prompt("イベントを入力してください");

                    if (title) {
                        axios
                            .post("/api/event", {
                                event_name: title,
                                start_date: date,
                                end_date: date,
                            })
                            .then(() => {
                                this.refetchEvents();
                            })
                            .catch(() => {
                                console.log("エラーです");
                            });
                    }
                },
                eventClick: function (selectInfo, event, jsEvent) {
                    let selectId = selectInfo.event.id;
                    let start = selectInfo.event.startStr;
                    let end = selectInfo.event.startStr;

                    let title = prompt(
                        "予定を更新してください:" + selectInfo.event.title
                    );
                    if (title && title != "") {
                        console.log(selectId);
                        axios
                            .put("/api/event/" + selectId, {
                                id: selectId,
                                start_date: start,
                                end_date: end,
                                event_name: title,
                            })
                            .then(() => {
                                this.refetchEvents();
                            })
                            .catch((response) => {
                                console.log(response);
                                alert("編集に失敗しました");
                            });
                    }
                },

                editable: true,
                eventDrop: function (selectInfo) {
                    axios
                        .put("/api/event/" + selectId, {
                            id: selectInfo.event.id,
                            start_date: selectInfo.event.startStr,
                            end_date: selectInfo.event.endStr,
                            event_name: selectInfo.event.title,
                        })
                        .then(() => {
                            this.refetchEvents();
                        })
                        .catch(() => {
                            alert("失敗しました");
                        });
                },
                eventResize: function (selectInfo) {
                    console.log(selectInfo);

                    let selectId = selectInfo.event.id;
                    let start = selectInfo.event.startStr;
                    let end = selectInfo.event.endStr;
                    let title = selectInfo.event.title;

                    console.log(end);
                    axios
                        .put("/api/event/" + selectId, {
                            id: selectId,
                            start_date: start,
                            end_date: end,
                            event_name: title,
                        })
                        .then(() => {
                            this.refetchEvents();
                        })
                        .catch(() => {
                            alert("失敗しました");
                        });
                },
            },
        };
    },
    methods: {
        //FullCalendar Render event
        eventRender(selectInfo) {
            //create our component instance
            const event = new EventClass({
                propsData: {
                    event: selectInfo.event,
                },
            });

            event.$mount();

            //assign created component to our eventObj with uuid as key (to destroy in future)
            this.eventsObj[event._uid] = event;

            //set data-vue="{id}"
            //append our compiled component to .fc-event
            selectInfo.el.setAttribute("data-vue-id", event._uid);
            selectInfo.el.appendChild(event.$el);
        },
    },
};
</script>
