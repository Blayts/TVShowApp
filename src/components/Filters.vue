<script lang="ts" setup>
import { ComputedRef, Ref, computed, defineEmits, defineProps, ref, unref, watch } from 'vue';
import { Input, Select, Row } from 'ant-design-vue';
import { IShow } from '../interfaces';

interface IOptionSelect {
  label: string,
  value: string
}

const emit = defineEmits(['update:filtered']);
const props = defineProps({
  genres: {
    type: Array,
    default: () => []
  },
  shows: {
    type: Array,
    default: () => []
  },
});

const genre: Ref<string> = ref(null);
const name: Ref<string> = ref('');

const options: ComputedRef<IOptionSelect> = computed(() =>
  props.genres.map((genre: string) => ({ label: genre, value: genre }))
);
const searchedShows: ComputedRef<IShow[]> = computed(() => {
  if(!unref(name).length) {
    return props.shows;
  }
  return props.shows.filter(
    (show: IShow) => show.name.toLowerCase().includes(unref(name).toLowerCase())
  );
});
const filteredShows: ComputedRef<IShow[]> = computed(() => {
    if(!unref(genre)) {
      return unref(searchedShows);
    }
    return unref(searchedShows).filter(
      (show: IShow) => show.genres.includes(unref(genre))
    );
  }
);

watch(filteredShows, (shows) => {
  emit('update:filtered', shows);
});

</script>

<template>
  <Row align="middle" justify="space-between">
    <Input placeholder="Поиск по имени..." v-model:value="name" />
    <Select placeholder="Выберите жанр" v-model:value="genre" :allow-clear="true" :options="options" />
  </Row>
</template>

<style lang="less" scoped>
  .ant {
    &-input,
    &-select {
      width: 200px;
    }
    &-row {
      height: 100%;
    }
  }
</style>
