<template>
  <c-box>
    <c-stack spacing="1rem" px="1rem">
      <c-flex justify-content="space-between" align-content="center">
        <c-box>
          <c-heading as="h3" size="lg">Участники</c-heading>
          <c-text
            >Вы можете пригласить новых учатсников в
            <strong>{{ repository.name }}</strong></c-text
          >
        </c-box>

        <app-button size="sm" @click="open"
          ><c-box
            :display="['flex', 'none']"
            mx="auto"
            color="white"
            as="svg"
            style="width: 24px; height: 24px"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z"
            />
          </c-box>
          <c-text :display="['none', 'flex']"
            >Добавить участников</c-text
          ></app-button
        >
      </c-flex>
      <hr />
      <c-stack spacing="0.7rem" :display="['none', 'flex']">
        <c-box border-width="1px" rounded="lg" px="1rem" py="0.5rem">
          <c-grid
            template-columns="1fr 1fr 150px"
            gap="2"
            font-weight="800"
            align-items="center"
          >
            <c-box w="100%" h="8">
              <c-text>Пользователь</c-text>
            </c-box>
            <c-box w="100%" h="8">
              <c-text>Роль</c-text>
            </c-box>
          </c-grid>
          <hr />
          <c-grid
            template-columns="1fr 1fr 150px"
            gap="2"
            py="1rem"
            align-items="center"
          >
            <c-box w="100%">
              <c-flex>
                <app-avatar :name="user.name" rounded="25px" />
                <c-stack px="1rem" spacing="0">
                  <c-text font-weight="600"> {{ user.name }}</c-text>
                  <c-text font-size="sm">{{ user.email }}</c-text>
                </c-stack>
              </c-flex>
            </c-box>
            <c-box w="100%">
              <c-tag>Владелец</c-tag>
            </c-box>
          </c-grid>
          <c-box v-for="participant in part" :key="participant.id">
            <hr />
            <c-grid
              template-columns="1fr 1fr 150px"
              gap="2"
              py="1rem"
              align-items="center"
            >
              <c-box w="100%">
                <c-flex>
                  <app-avatar :name="participant.name" rounded="25px" />
                  <c-stack px="1rem" spacing="0">
                    <c-text font-weight="600"> {{ participant.name }}</c-text>
                    <c-text font-size="sm">{{ participant.email }}</c-text>
                  </c-stack>
                </c-flex>
              </c-box>
              <c-box w="100%">
                <c-tag>{{ participant.role }}</c-tag>
              </c-box>
              <app-button
                :is_loading="loading"
                variant-color="red"
                size="sm"
                @click="delPart(participant.username)"
                >Исключить</app-button
              >
            </c-grid>
          </c-box>
        </c-box>
      </c-stack>
      <c-stack :display="['block', 'none']" font-size="sm">
        <c-grid
          template-rows="1fr 1fr"
          gap="2"
          border="1px solid lightgrey"
          rouned="md"
        >
          <c-flex px="0.25rem" py="0.5rem" border-bottom="1px solid lightgrey"
            ><c-text w="50%" font-weight="800">Пользователь</c-text>
            <c-flex
              ><app-avatar :name="user.name" rounded="25px" />
              <c-stack px="1rem" spacing="0">
                <c-text font-weight="600"> {{ user.name }}</c-text>
                <c-text font-size="sm">{{ user.username }}</c-text>
              </c-stack>
            </c-flex>
          </c-flex>
          <c-flex px="0.25rem" py="0.5rem">
            <c-text w="50%" font-weight="800">Роль</c-text>
            <c-box> <c-tag>Владелец</c-tag> </c-box>
          </c-flex>
        </c-grid>

        <c-box v-for="participant in part" :key="participant.id">
          <c-grid
            template-rows="1fr 1fr"
            gap="2"
            border="1px solid lightgrey"
            rouned="md"
          >
            <c-flex px="0.25rem" py="0.5rem" border-bottom="1px solid lightgrey"
              ><c-text w="50%" font-weight="800">Пользователь</c-text>
              <c-flex>
                <app-avatar :name="participant.name" rounded="25px" />
                <c-stack px="1rem" spacing="0">
                  <c-text font-weight="600"> {{ participant.name }}</c-text>
                  <c-text font-size="sm">{{ participant.username }}</c-text>
                </c-stack>
              </c-flex>
            </c-flex>
            <c-flex
              px="0.25rem"
              py="0.5rem"
              border-bottom="1px solid lightgrey"
            >
              <c-text w="50%" font-weight="800">Роль</c-text>
              <c-box>
                <c-tag>{{ participant.role }}</c-tag>
              </c-box>
            </c-flex>
            <c-flex px="0.25rem" py="0.5rem">
              <c-text w="50%" font-weight="800">Действия</c-text>
              <app-button
                :is_loading="loading"
                variant-color="red"
                size="sm"
                @click="delPart(participant.username)"
                >Исключить</app-button
              >
            </c-flex>
          </c-grid>
        </c-box>
      </c-stack>
    </c-stack>

    <c-modal :is-open="isOpen" :on-close="close" is-centered>
      <c-modal-content ref="content">
        <c-modal-header align="center">Добавление участников</c-modal-header>
        <c-modal-close-button />
        <c-modal-body px="1rem" py="0.5rem">
          <c-stack>
            <c-text font-weight="600">Пользователь или email</c-text>

            <c-input
              v-model="searchQuerry"
              @focus="focused = true"
              @blur="setFocus()"
            ></c-input>

            <c-stack v-if="focused" position="relative">
              <c-stack
                position="absolute"
                border="1px solid lightgrey"
                top="-10px"
                z-index="1700"
                bg="white"
                w="100%"
              >
                <c-stack v-if="bounce" direction="row" p="0.5rem">
                  <c-spinner size="lg" color="blue" mx="auto"></c-spinner>
                </c-stack>
                <c-stack
                  v-for="user in searchSuggestion"
                  v-else
                  :key="user.id"
                  direction="row"
                  p="0.5rem"
                  @click="selectParticipant(user.username)"
                >
                  <app-avatar :name="user.name" rounded="25px" />
                  <c-stack spacing="0">
                    <c-text font-size="sm" font-weight="700">{{
                      user.name
                    }}</c-text>
                    <c-text font-size="sm">{{ user.username }}</c-text>
                  </c-stack>
                  <hr />
                </c-stack>
              </c-stack>
            </c-stack>
          </c-stack>
          <c-stack>
            <c-text font-weight="600">Выберите роль</c-text>
            <c-select v-model="role" width="50">
              <option value="guest">Гость</option>
              <option value="developer">Разработчик</option>
              <option value="maintainer">Руководитель</option>
            </c-select>
          </c-stack>
        </c-modal-body>
        <c-modal-footer>
          <c-flex>
            <app-button variant="outline" mr="1rem" @click="close"
              >Отмена</app-button
            >
            <app-button :is_loading="loading" @click="submit"
              >Пригласить</app-button
            >
          </c-flex>
        </c-modal-footer>
      </c-modal-content>
      <c-modal-overlay />
    </c-modal>
  </c-box>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'RepositoryParticipantsSettings',
  data() {
    return {
      role: 'guest',
      isOpen: false,
      searchQuerry: '',
      focused: false,
      searchSuggestion: '',
      bounce: false,
    }
  },

  async fetch() {
    await this.fetchParticipants(this.params)
  },

  computed: {
    ...mapState({
      user(state) {
        return state.auth.user
      },
      repository(state) {
        return state.repositories.repository
      },
      participants(state) {
        return state.repositories.participants
      },
      loading: (state) => state.repositories.loading,
    }),
    params() {
      return this.$route.params
    },
    part() {
      return this.participants.map((p) => {
        if (p.role === 'guest') {
          return { ...p, role: 'Гость' }
        }
        if (p.role === 'developer') {
          return { ...p, role: 'Разработчик' }
        }
        if (p.role === 'maintainer') {
          return { ...p, role: 'Руководитель' }
        }
        return p
      })
    },
  },

  watch: {
    searchQuerry() {
      if (this.bounce) {
        clearTimeout(this.bounce)
      }
      this.bounce = setTimeout(async () => {
        this.searchSuggestion = await this.searchUsers(this.searchQuerry)
        this.bounce = false
      }, 800)
    },
  },
  methods: {
    ...mapActions({
      addParticipant: 'repositories/addParticipants',
      deleteParticipants: 'repositories/deleteParticipants',
      fetchParticipants: 'repositories/fetchParticipants',
    }),
    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    },
    async submit() {
      await this.addParticipant({
        username: this.repository.owner,
        repoName: this.repository.name,
        user: {
          role: this.role,
          username: this.searchQuerry,
        },
      })
      this.close()
      this.$router.go()
    },
    async searchUsers(querry) {
      const data = await this.$axios.$get(`/v1/users?page=1&search=${querry}`)
      return data
    },
    setFocus() {
      setTimeout(() => (this.focused = false), 200)
    },
    selectParticipant(selected) {
      this.searchQuerry = selected
    },
    delPart(username) {
      this.deleteParticipants({
        username: this.user.username,
        repoName: this.repository.name,
        user: username,
      })
      this.$router.go()
    },
  },
}
</script>

<style scoped>
.active {
  display: block;
}
</style>
