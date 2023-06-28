<template>
  <c-stack spacing="1.5rem" align="center" mt="3rem">
    <c-box>
      <c-image
        size="200px"
        :src="require('@/static/assets/img/empty.png')"
      ></c-image>
    </c-box>
    <c-text font-size="3xl" font-weight="bold"> {{ title }} </c-text>
    <c-text v-if="mergeState === 'open'" font-size="xl"
      >Вы можете создать новый</c-text
    >

    <app-button
      v-if="mergeState === 'open'"
      as="n-link"
      :to="`${baseLink}/new`"
      size="sm"
    >
      Новый запрос на слияние
    </app-button>
  </c-stack>
</template>

<script>
export default {
  name: 'EmptyMerge',
  props: {
    mergeState: { type: String, required: true },
  },
  computed: {
    title() {
      switch (this.mergeState) {
        case 'open':
          return 'Сейчас у вас нет открытых запросов для слияния'
        case 'closed':
          return 'Сейчас у вас нет закрытых запросов для слияния'
        case 'merged':
          return 'Сейчас у вас нет слитых запросов'
        case 'all':
          return 'Сейчас у вас нет запросов для слияния'
        default:
          return 'Сейчас у вас нет открытых запросов для слияния'
      }
    },
    baseLink() {
      const username = this.$route.params.username
      const repository = this.$route.params.repository
      return `/${username}/${repository}/merge_request`
    },
  },
}
</script>
