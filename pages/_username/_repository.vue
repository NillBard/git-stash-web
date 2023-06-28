<template>
  <c-box>
    <c-stack v-if="repository" max-width="1200px" mx="auto" spacing="1.5rem">
      <c-stack direction="row" align-items="center" justify="space-between">
        <c-flex :font-size="['2xl', '3xl']" color="black">
          <c-box as="n-link" :to="`/${params.username}`">
            {{ params.username }}
          </c-box>
          <c-box display="inline" color="black">/</c-box>
          <c-box as="n-link" :to="`/${params.username}/${params.repository}`">
            {{ params.repository }}
          </c-box>
        </c-flex>

        <app-button :display="['flex', 'none']" @click="isOpen = true">
          <c-box as="svg" style="width: 24px; height: 24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z"
            />
          </c-box>
        </app-button>

        <c-drawer
          :is-open="isOpen"
          placement="top"
          :on-close="close"
          :display="['flex', 'none']"
        >
          <c-drawer-overlay />
          <c-drawer-content mt="3rem">
            <c-drawer-close-button mt="3.4rem" mr="0.7rem" />
            <c-drawer-header font-size="2xl" px="1rem"
              >{{ `${params.username}/${params.repository}` }}
            </c-drawer-header>

            <c-drawer-body px="1rem">
              <c-box
                as="n-link"
                display="flex"
                transition="0.3s"
                p="0.5rem"
                mb="0.5rem"
                align="center"
                border-bottom-width="1px"
                border-color="transparent"
                :to="`/${params.username}/${params.repository}`"
                :class="{ activeM: isActive === 'Код' }"
              >
                <c-box
                  as="svg"
                  mr="0.5rem"
                  style="width: 24px; height: 24px"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z"
                  />
                </c-box>
                <c-box font-size="lg">Код</c-box>
              </c-box>
              <c-box
                as="n-link"
                display="flex"
                transition="0.3s"
                mb="0.5rem"
                p="0.5rem"
                align="center"
                border-bottom-width="1px"
                border-color="transparent"
                :to="`/${params.username}/${params.repository}/merge_request`"
                :class="{ activeM: isActive === 'Запросы на слияние' }"
              >
                <c-box
                  as="svg"
                  mr="0.5rem"
                  style="width: 24px; height: 24px"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M7,3A3,3 0 0,1 10,6C10,7.29 9.19,8.39 8.04,8.81C8.58,13.81 13.08,14.77 15.19,14.96C15.61,13.81 16.71,13 18,13A3,3 0 0,1 21,16A3,3 0 0,1 18,19C16.69,19 15.57,18.16 15.16,17C10.91,16.8 9.44,15.19 8,13.39V15.17C9.17,15.58 10,16.69 10,18A3,3 0 0,1 7,21A3,3 0 0,1 4,18C4,16.69 4.83,15.58 6,15.17V8.83C4.83,8.42 4,7.31 4,6A3,3 0 0,1 7,3M7,5A1,1 0 0,0 6,6A1,1 0 0,0 7,7A1,1 0 0,0 8,6A1,1 0 0,0 7,5M7,17A1,1 0 0,0 6,18A1,1 0 0,0 7,19A1,1 0 0,0 8,18A1,1 0 0,0 7,17M18,15A1,1 0 0,0 17,16A1,1 0 0,0 18,17A1,1 0 0,0 19,16A1,1 0 0,0 18,15Z"
                  />
                </c-box>
                <c-box font-size="lg">Запросы на слияние</c-box>
              </c-box>
              <c-box
                v-if="role === 'owner' || role === 'maintainer'"
                as="n-link"
                display="flex"
                transition="0.3s"
                mb="0.5rem"
                p="0.5rem"
                align="center"
                border-bottom-width="1px"
                border-color="transparent"
                :to="`/${params.username}/${params.repository}/settings`"
                :class="{ activeM: isActive === 'Настройки' }"
              >
                <c-box
                  as="svg"
                  mr="0.5rem"
                  style="width: 24px; height: 24px"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
                  />
                </c-box>
                <c-box font-size="lg">Настройки</c-box>
              </c-box>
            </c-drawer-body>
          </c-drawer-content>
        </c-drawer>

        <c-stack :display="['none', 'flex']" direction="row" font-size="lg">
          <c-box
            as="n-link"
            display="flex"
            transition="0.3s"
            align="center"
            border-bottom-width="1px"
            border-color="transparent"
            px="0.5rem"
            pb="0.5rem"
            :to="`/${params.username}/${params.repository}`"
            :_hover="{ borderColor: 'gray.300' }"
            :class="{ active: isActive === 'Код' }"
          >
            <c-box
              as="svg"
              mr="0.5rem"
              style="width: 24px; height: 24px"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z"
              />
            </c-box>
            <c-text>Код</c-text>
          </c-box>
          <c-box
            as="n-link"
            display="flex"
            transition="0.3s"
            align="center"
            border-bottom-width="1px"
            border-color="transparent"
            px="0.5rem"
            pb="0.5rem"
            :to="`/${params.username}/${params.repository}/merge_request`"
            :_hover="{ borderColor: 'gray.300' }"
            :class="{ active: isActive === 'Запросы на слияние' }"
          >
            <c-box
              as="svg"
              mr="0.5rem"
              style="width: 24px; height: 24px"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7,3A3,3 0 0,1 10,6C10,7.29 9.19,8.39 8.04,8.81C8.58,13.81 13.08,14.77 15.19,14.96C15.61,13.81 16.71,13 18,13A3,3 0 0,1 21,16A3,3 0 0,1 18,19C16.69,19 15.57,18.16 15.16,17C10.91,16.8 9.44,15.19 8,13.39V15.17C9.17,15.58 10,16.69 10,18A3,3 0 0,1 7,21A3,3 0 0,1 4,18C4,16.69 4.83,15.58 6,15.17V8.83C4.83,8.42 4,7.31 4,6A3,3 0 0,1 7,3M7,5A1,1 0 0,0 6,6A1,1 0 0,0 7,7A1,1 0 0,0 8,6A1,1 0 0,0 7,5M7,17A1,1 0 0,0 6,18A1,1 0 0,0 7,19A1,1 0 0,0 8,18A1,1 0 0,0 7,17M18,15A1,1 0 0,0 17,16A1,1 0 0,0 18,17A1,1 0 0,0 19,16A1,1 0 0,0 18,15Z"
              />
            </c-box>
            <c-text white-space="nowrap">Запросы на слияние</c-text>
          </c-box>
          <c-box
            v-if="role === 'owner' || role === 'maintainer'"
            as="n-link"
            display="flex"
            transition="0.3s"
            align="center"
            border-bottom-width="1px"
            border-color="transparent"
            px="0.5rem"
            pb="0.5rem"
            :to="`/${params.username}/${params.repository}/settings`"
            :_hover="{ borderColor: 'gray.300' }"
            :class="{ active: isActive === 'Настройки' }"
          >
            <c-box
              as="svg"
              mr="0.5rem"
              style="width: 24px; height: 24px"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
              />
            </c-box>
            <c-box>Настройки</c-box>
          </c-box>
        </c-stack>
      </c-stack>
      <nuxt-child />
    </c-stack>
  </c-box>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'RepositoryPage',

  middleware: ['optional-auth', 'repository-access', 'role'],

  data() {
    return {
      isOpen: false,
    }
  },

  computed: {
    ...mapState({
      user(state) {
        return state.auth.user
      },
      role(state) {
        return state.repositories.role
      },
      repository(state) {
        return state.repositories.repository
      },
    }),

    params() {
      return this.$route.params
    },

    isActive() {
      const params = this.$route.params
      const link = this.$route.fullPath
      if (link.includes(`/${params.username}/${params.repository}/settings`)) {
        return 'Настройки'
      } else if (
        link.includes(`/${params.username}/${params.repository}/merge_request`)
      ) {
        return 'Запросы на слияние'
      } else if (link.includes(`/${params.username}/${params.repository}`)) {
        return 'Код'
      }
      return ''
    },
  },

  methods: {
    ...mapActions({ fetchOne: 'repositories/fetchOne' }),
    close() {
      this.isOpen = false
    },
  },
}
</script>

<style scoped>
.active {
  border-bottom: '3px';
  border-color: var(--colors-black);
}
.activeM {
  background-color: #def0ff;
  border-radius: 5px;
}
</style>
