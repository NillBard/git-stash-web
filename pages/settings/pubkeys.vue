<template>
  <c-stack>
    <c-heading as="h1" :font-size="['2xl', '3xl']">SSH ключи</c-heading>
    <c-text font-size="sm">
      SSH ключи это надежный способ установить соединение с GitStash
    </c-text>
    <hr />
    <c-box :display="['block', 'flex']">
      <c-stack
        :border-right="['none', '1px solid lightgray']"
        spacing="1rem"
        width="100%"
        :pr="['0', '2rem']"
        as="form"
        @submit.prevent="submit"
      >
        <c-text font-size="md" font-weight="800">
          Добавление нового ключа
        </c-text>

        <app-input
          id="name"
          v-model.trim="name"
          label="Название"
          :error="errors.name"
          required
        />

        <c-form-control>
          <c-form-label for="sshKey">SSH ключ</c-form-label>
          <c-textarea
            id="sshKey"
            v-model.trim="value"
            border-color="gray.400"
            placeholder="Ключ должен быть зашифрован алгоритмом id_ed25519"
            resize="none"
            required
            height="130px"
          />
          <c-form-helper-text v-if="errors.value" color="red">
            {{ errors.value }}
          </c-form-helper-text>
        </c-form-control>

        <c-stack direction="row">
          <app-button :is-loading="loading" type="submit">
            Добавить
          </app-button>
        </c-stack>
      </c-stack>
      <c-stack
        spacing="1rem"
        width="100%"
        :pl="['0', '2rem']"
        :py="['1rem', '0']"
      >
        <c-text font-size="md" font-weight="800">Ваши SSH ключи</c-text>
        <c-stack
          v-if="pubkeys.length === 0"
          border="1px solid lightgray"
          rounded="lg"
          spacing="1rem"
          p="1rem"
        >
          <c-text align="center">Сейчас у вас нет действующих ключей</c-text>
          <c-box
            as="svg"
            mx="auto"
            color="black"
            style="width: 80px; height: 80px"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M7.5 3C9.5 3 11.1 4.2 11.7 6H21V9H18V12H15V9H11.7C11.1 10.8 9.4 12 7.5 12C5 12 3 10 3 7.5S5 3 7.5 3M7.5 6C6.7 6 6 6.7 6 7.5S6.7 9 7.5 9 9 8.3 9 7.5 8.3 6 7.5 6M8 17H11V14H13V17H16V19H13V22H11V19H8V17Z"
            />
          </c-box>
        </c-stack>
        <c-flex
          v-for="key in pubkeys"
          :key="key.id"
          border="1px solid gray"
          px="1rem"
          py="0.25rem"
          rounded="lg"
          justify="space-between"
          align-items=" center"
        >
          <c-flex align-items=" center">
            <c-box
              as="svg"
              style="width: 30px; height: 30px"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M22,18V22H18V19H15V16H12L9.74,13.74C9.19,13.91 8.61,14 8,14A6,6 0 0,1 2,8A6,6 0 0,1 8,2A6,6 0 0,1 14,8C14,8.61 13.91,9.19 13.74,9.74L22,18M7,5A2,2 0 0,0 5,7A2,2 0 0,0 7,9A2,2 0 0,0 9,7A2,2 0 0,0 7,5Z"
              />
            </c-box>
            <c-box px="1rem">
              <c-text font-size="lg" font-weight="600">{{ key.name }}</c-text>
              <c-text font-size="sm">
                Создан: {{ `${doTime(key.created_at)}` }}
              </c-text>
            </c-box>
          </c-flex>
          <button type="button" @click="deletePubkey(key.id)">
            <c-box
              color="red"
              border="1px solid red"
              rounded="md"
              as="svg"
              style="width: 24px; height: 24px"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
              />
            </c-box>
          </button>
        </c-flex>
      </c-stack>
    </c-box>
  </c-stack>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { timeSimple } from '~/modules/timeParse'

export default {
  name: 'PubkeysSettingsPage',

  layout: 'settings',

  data() {
    return {
      name: '',
      value: '',
    }
  },

  computed: {
    ...mapState({
      pubkeys(state) {
        return state.pubkeys.pubkeys
      },

      loading(state) {
        return state.pubkeys.loading
      },

      errors(state) {
        return state.pubkeys.errors
      },

      validation_errors(state) {
        return state.pubkeys.validation_errors
      },
    }),
  },

  watch: {
    errors(value) {
      if (value) {
        this.$toast({
          status: 'error',
          title: 'Ошибка',
          description: value,
          duration: 3000,
          position: 'bottom-right',
        })
      }
    },
  },

  mounted() {
    this.fetch()
  },

  methods: {
    ...mapActions({
      create: 'pubkeys/create',
      fetch: 'pubkeys/fetch',
      deletePubkey: 'pubkeys/delete',
    }),

    submit() {
      this.create(this.$data)
    },

    doTime(time) {
      return timeSimple(time)
    },
  },
}
</script>
