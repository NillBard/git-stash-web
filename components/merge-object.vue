<template>
  <c-stack
    direction="row"
    justify="space-between"
    :bg="color"
    py="0.5rem"
    px="1rem"
    :border-color="borderColor"
    border-width="2px"
    border-radius="lg"
  >
    <c-stack
      ><c-text font-weight="bold">
        {{ name }}
      </c-text>
      <c-text color="gray.500"
        >!{{ idReq }} created by
        <c-text as="span" color="black">{{ username }}</c-text>
      </c-text>
    </c-stack>
    <c-stack>
      <c-stack justify="right" direction="row">
        <c-box
          v-if="state !== 'open'"
          as="svg"
          style="width: 24px; height: 24px"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            :d="state === 'closed' ? img.closed : img.merged"
          />
        </c-box>

        <c-text text-transform="uppercase">
          {{ state }}
        </c-text>
      </c-stack>
      <c-text font-size="sm">Обновлён {{ create_date }}</c-text>
    </c-stack>
  </c-stack>
</template>

<script>
import { timeParse } from '~/modules/timeParse'

export default {
  name: 'MergeObject',
  props: {
    name: { type: String, required: true },
    idReq: { type: Number, required: true },
    username: { type: String, required: true },
    state: { type: String, required: true },
    date: { type: String, required: true },
  },
  computed: {
    borderColor() {
      if (this.state === 'closed') {
        return 'red.200'
      } else if (this.state === 'merged') return 'green.200'
      return 'gray.200'
    },
    create_date() {
      return timeParse(this.date)
    },
    color() {
      if (this.state === 'closed') {
        return 'red.50'
      } else if (this.state === 'merged') return 'green.50'
      return 'gray.50'
    },
    img() {
      return {
        closed:
          'M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z',
        merged:
          'M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41 4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12 20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z',
      }
    },
  },
}
</script>
