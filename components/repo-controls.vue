<template>
  <c-flex align="center" justify="space-between">
    <c-menu>
      <c-menu-button right-icon="chevron-down">
        {{ currentBranch }}
      </c-menu-button>
      <c-menu-list>
        <c-menu-item
          v-for="branch in branches"
          :key="branch.name"
          as="n-link"
          :to="branch.link"
        >
          {{ branch.name }}
        </c-menu-item>
      </c-menu-list>
    </c-menu>
    <c-popover placement="bottom">
      <c-popover-trigger @click="resetCopiedState">
        <c-button
          font-weight="bold"
          color="white"
          bg="black"
          text-transform="uppercase"
          >Клонировать</c-button
        >
      </c-popover-trigger>
      <c-popover-content z-index="5">
        <c-popover-header font-weight="bold">
          Клонировать через SSH
        </c-popover-header>
        <c-popover-close-button />
        <c-popover-body>
          <c-flex border-width="1px" rounded="md" border-color="gray.200">
            <c-box
              as="input"
              px="1rem"
              py="0.5rem"
              font-weight="500"
              width="300px"
              overflow-x="scroll"
              outline="none"
              font-family="monospace"
              :value="sshUrl"
              disabled
            />
            <c-flex
              flex="1"
              as="button"
              border-color="gray.200"
              border-left-width="1px"
              align="center"
              justify="center"
              px="0.5rem"
              @click="copyCloneLink"
            >
              <c-box
                v-if="!isCopied"
                as="svg"
                style="width: 24px; height: 24px"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"
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
                  d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
                />
              </c-box>
            </c-flex>
          </c-flex>
        </c-popover-body>
      </c-popover-content>
    </c-popover>
  </c-flex>
</template>

<script>
export default {
  name: 'RepoControls',
  props: {
    currentBranch: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    repoName: {
      type: String,
      required: true,
    },
    sshUrl: {
      type: String,
      required: true,
    },
    branches: {
      type: Array,
      required: true,
    },
  },
  data() {
    return { isCopied: false }
  },

  methods: {
    resetCopiedState() {
      this.isCopied = false
    },

    async copyCloneLink() {
      await navigator.clipboard.writeText(this.sshUrl)
      this.isCopied = true
    },
  },
}
</script>
