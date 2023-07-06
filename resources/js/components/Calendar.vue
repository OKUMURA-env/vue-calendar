<script>
import FullCalendar from '@fullcalendar/vue3'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
        initialView: 'dayGridMonth',
        locale: "ja",
        height: "auto",
        views: {
            dayGridTwoWeek: {
              type: 'dayGrid',
              buttonText: '2週間',
              duration: { weeks: 2 }
            }
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
      }
    }
  }
}
</script>
<template>
  <FullCalendar :options="calendarOptions" />
</template>