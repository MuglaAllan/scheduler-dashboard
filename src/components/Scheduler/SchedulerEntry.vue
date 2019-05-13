<template>
  <div :class="classes">
    <div @click="alert(duration)" class="schedule-entry">It works</div>
  </div>
</template>

<script>
export default {
  name: 'SchedulerEntry',
  props: [
    'classes',
    'duration'
  ]
}
</script>
