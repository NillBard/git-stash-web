<template>
  <c-box
    as="n-link"
    :to="href"
    border-bottom="1px solid lightgrey"
    py="0.5rem"
    display="flex"
    justify-content="space-between"
    align-items="center"
  >
    <c-flex align-items="center" :w="['100%', 1 / 2]">
      <app-avatar :name="name" />
      <c-text px="0.5rem" :font-size="['lg']">{{
        `${username} / ${name}`
      }}</c-text>
      <c-box
        v-if="isPrivate"
        as="svg"
        style="width: 24px; height: 24px"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"
        />
      </c-box>
      <c-box
        v-else
        as="svg"
        style="width: 24px; height: 24px"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
        />
      </c-box>
    </c-flex>
    <c-text :font-size="['xs', 'md']">Создан {{ create_date }}</c-text>
  </c-box>
</template>

<script>
import { CBox, CFlex, CText, CBadge, CAvatar, CPseudoBox } from '@chakra-ui/vue'
import { timeParse } from '~/modules/timeParse'

export default {
  name: 'RepoItem',
  props: {
    name: { type: String, required: true },
    isPrivate: { type: Boolean, required: true },
    href: { type: String, required: true },
    username: { type: String, required: true },
    created_at: { type: String, required: true },
  },
  computed: {
    create_date() {
      return timeParse(this.created_at)
    },
  },
  component: { CBox, CFlex, CText, CBadge, CAvatar, CPseudoBox },
}
</script>
