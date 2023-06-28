<template>
  <c-stack spacing="1.5rem">
    <c-stack direction="row">
      <c-heading as="h3" size="lg">{{ name }}</c-heading>
    </c-stack>
    <c-stack direction="row" align="center">
      <c-badge
        d="flex"
        mx="2"
        px="0.5rem"
        py="0.2rem"
        direction="row"
        :bg="badage.bg"
        rounded="15"
      >
        <c-stack direction="row" align="center">
          <c-box as="svg" style="width: 24px; height: 24px" viewBox="0 0 24 24">
            <path :fill="badage.color" :d="badage.img" />
          </c-box>
          <c-text font-weight="100" :color="badage.text">{{ state }}</c-text>
        </c-stack>
      </c-badge>
      <c-text>
        <c-text as="span" font-weight="bold">{{ author }} </c-text>
        запросил слияние изменений из
        <c-box
          as="n-link"
          align="center"
          to="#"
          bg="gray.600"
          color="white"
          px="0.3rem"
          py="0.2rem"
          rounded="md"
        >
          {{ source }}</c-box
        >

        в

        <c-box
          as="n-link"
          to="#"
          align="center"
          bg="gray.600"
          color="white"
          px="0.3rem"
          py="0.2rem"
          rounded="md"
        >
          {{ destination }}</c-box
        >
      </c-text>
    </c-stack>
  </c-stack>
</template>

<script>
export default {
  name: 'MergeHeader',
  props: {
    destination: { type: String, required: true },
    source: { type: String, required: true },
    name: { type: String, required: true },
    state: { type: String, required: true },
    author: { type: String, required: true },
  },
  computed: {
    badage() {
      if (this.state === 'open') {
        return {
          bg: 'gray.100',
          color: 'gray',
          text: 'gray.600',
          img: 'M6,2H18V8H18V8L14,12L18,16V16H18V22H6V16H6V16L10,12L6,8V8H6V2M16,16.5L12,12.5L8,16.5V20H16V16.5M12,11.5L16,7.5V4H8V7.5L12,11.5M10,6H14V6.75L12,8.75L10,6.75V6Z',
        }
      } else if (this.state === 'merged') {
        return {
          bg: 'green.100',
          color: 'green',
          text: 'green.600',
          img: 'M7,3A3,3 0 0,1 10,6C10,7.29 9.19,8.39 8.04,8.81C8.58,13.81 13.08,14.77 15.19,14.96C15.61,13.81 16.71,13 18,13A3,3 0 0,1 21,16A3,3 0 0,1 18,19C16.69,19 15.57,18.16 15.16,17C10.91,16.8 9.44,15.19 8,13.39V15.17C9.17,15.58 10,16.69 10,18A3,3 0 0,1 7,21A3,3 0 0,1 4,18C4,16.69 4.83,15.58 6,15.17V8.83C4.83,8.42 4,7.31 4,6A3,3 0 0,1 7,3M7,5A1,1 0 0,0 6,6A1,1 0 0,0 7,7A1,1 0 0,0 8,6A1,1 0 0,0 7,5M7,17A1,1 0 0,0 6,18A1,1 0 0,0 7,19A1,1 0 0,0 8,18A1,1 0 0,0 7,17M18,15A1,1 0 0,0 17,16A1,1 0 0,0 18,17A1,1 0 0,0 19,16A1,1 0 0,0 18,15Z',
        }
      } else
        return {
          bg: 'red.100',
          color: 'red',
          text: 'red.600',
          img: 'M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z',
        }
    },
  },
}
</script>
