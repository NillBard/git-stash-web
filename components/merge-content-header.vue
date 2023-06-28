<template>
  <c-stack direction="row" px="1.5rem" py="1rem" align="center">
    <c-box as="svg" style="width: 24px; height: 24px" viewBox="0 0 24 24">
      <path :fill="iconBlock.color" :d="iconBlock.img" />
    </c-box>
    <c-box v-if="state === 'open'">
      <c-text v-if="mergeState === 'conflict'">
        Слияние заблокировано: конфликт слияния должен быть решён
      </c-text>
      <c-text v-else-if="mergeState === 'ready'"
        >{{
          role === 'owner' || role === 'maintainer'
            ? 'Готово к слиянию'
            : 'Доступно для слияния'
        }}
      </c-text>
    </c-box>
    <c-stack
      v-else-if="state === 'merged'"
      align="center"
      justify="center"
      direction="row"
    >
      <c-text>Объединил</c-text>
      <c-avatar :name="author" size="sm"></c-avatar>
      <c-box
        as="n-link"
        :to="`/${username}`"
        font-weight="bold"
        color="blue.500"
        >{{ author }}
      </c-box>
      <c-text as="span" font-size="sm" align="center" justify="center">
        {{ create_date }}
      </c-text>
    </c-stack>
    <c-stack v-else align="center" justify="center" direction="row">
      <c-text> Закрыл </c-text>
      <c-avatar :name="author" size="sm"></c-avatar>
      variant-color="gray"
      <c-box
        as="n-link"
        :to="`/${username}`"
        font-weight="bold"
        color="blue.500"
        >{{ author }}
      </c-box>
      <c-text as="span" font-size="sm"> {{ create_date }}</c-text>
    </c-stack>
  </c-stack>
</template>

<script>
import { CAvatar, CBox, CStack, CText } from '@chakra-ui/vue'
import { timeParse } from '~/modules/timeParse'

export default {
  name: 'MergeContentHeader',
  component: [CStack, CText, CAvatar, CBox],
  props: {
    state: { type: String, required: true },
    mergeState: { type: String, default: '' },
    author: { type: String, required: true },
    date: { type: String, required: true },
    role: { type: String, required: true },
  },
  computed: {
    create_date() {
      return timeParse(this.date)
    },
    username() {
      return this.$nuxt.$route.params.username
    },
    iconBlock() {
      if (this.state === 'open') {
        if (this.mergeState === 'ready') {
          return {
            img: 'M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z',
            color: 'green',
          }
        } else
          return {
            img: 'M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z',
            color: 'gray',
          }
      } else if (this.state === 'merged') {
        return {
          img: 'M7,3A3,3 0 0,1 10,6C10,7.29 9.19,8.39 8.04,8.81C8.58,13.81 13.08,14.77 15.19,14.96C15.61,13.81 16.71,13 18,13A3,3 0 0,1 21,16A3,3 0 0,1 18,19C16.69,19 15.57,18.16 15.16,17C10.91,16.8 9.44,15.19 8,13.39V15.17C9.17,15.58 10,16.69 10,18A3,3 0 0,1 7,21A3,3 0 0,1 4,18C4,16.69 4.83,15.58 6,15.17V8.83C4.83,8.42 4,7.31 4,6A3,3 0 0,1 7,3M7,5A1,1 0 0,0 6,6A1,1 0 0,0 7,7A1,1 0 0,0 8,6A1,1 0 0,0 7,5M7,17A1,1 0 0,0 6,18A1,1 0 0,0 7,19A1,1 0 0,0 8,18A1,1 0 0,0 7,17M18,15A1,1 0 0,0 17,16A1,1 0 0,0 18,17A1,1 0 0,0 19,16A1,1 0 0,0 18,15Z',
          color: 'blue',
        }
      } else
        return {
          img: 'M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z',
          color: 'red',
        }
    },
  },
}
</script>
