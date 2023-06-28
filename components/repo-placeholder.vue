<template>
  <c-stack
    px="1rem"
    py="0.5rem"
    spacing="1rem"
    border-width="1px"
    border-color="gray.200"
    rounded="md"
  >
    <c-stack spacing="0.5rem">
      <c-text font-size="xl">Быстрая настройка</c-text>
      <c-flex border-width="1px" rounded="md" border-color="gray.200">
        <c-box
          as="input"
          px="1rem"
          py="0.5rem"
          font-weight="500"
          width="100%"
          overflow-x="scroll"
          outline="none"
          font-family="monospace"
          :value="sshUrl"
          disabled
        />
        <c-button
          bg="transparent"
          rounded="none"
          border-color="gray.200"
          border-left-width="1px"
          display="flex"
          align="center"
          justify="center"
          px="0.5rem"
          :_focus="{ outline: 'none' }"
          :_active="{ background: 'gray.300' }"
          @click="copyCloneLink"
        >
          <c-box as="svg" style="width: 24px; height: 24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"
            />
          </c-box>
        </c-button>
      </c-flex>
    </c-stack>
    <c-stack spacing="0.5rem">
      <c-text font-size="xl">
        Вы можете создать новый репозиторий в терминале
      </c-text>
      <c-box
        px="1rem"
        py="0.5rem"
        bg="#1e1e1e"
        color="white"
        font-family="monospace"
        rounded="md"
      >
        <c-box>git clone {{ sshUrl }}</c-box>
        <c-box>cd {{ name }}</c-box>
        <c-box>git switch -c main</c-box>
        <c-box>touch README.md</c-box>
        <c-box>git add README.md</c-box>
        <c-box>git commit -m "add README"</c-box>
        <c-box>git push -u origin main</c-box>
      </c-box>
    </c-stack>
    <c-stack spacing="0.5rem">
      <c-text font-size="xl">Или загрузить существующий проект</c-text>
      <c-stack
        px="1rem"
        py="0.5rem"
        bg="#1e1e1e"
        color="white"
        font-family="monospace"
        rounded="md"
        spacing="0"
      >
        <c-box>cd existing_folder</c-box>
        <c-box>git init --initial-branch=main</c-box>
        <c-box>git remote add origin {{ sshUrl }}</c-box>
        <c-box>git add .</c-box>
        <c-box>git commit -m "Initial commit"</c-box>
        <c-box>git push -u origin main</c-box>
      </c-stack>
    </c-stack>
  </c-stack>
</template>

<script>
export default {
  name: 'RepoPlaceholder',

  props: {
    name: {
      type: String,
      required: true,
    },

    sshUrl: {
      type: String,
      required: true,
    },
  },
  methods: {
    async copyCloneLink() {
      await navigator.clipboard.writeText(this.sshUrl)
    },
  },
}
</script>
